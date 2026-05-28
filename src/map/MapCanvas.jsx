import { useEffect, useMemo, useRef } from "react";
import { colorForEntry, colorForSector, moonPosition, screenToWorld } from "./mapGeometry.js";
import { hitTest } from "./hitTesting.js";

export default function MapCanvas({
  geometry,
  camera,
  lens,
  focused,
  searchTerm,
  matchingIds,
  hoverTarget,
  onHover,
  onPlanetClick,
  onMoonClick,
  onPan,
  onZoom,
  onSize
}) {
  const canvasRef = useRef(null);
  const hoverRef = useRef("");
  const dragRef = useRef(null);
  const rafRef = useRef(0);
  const loopRef = useRef(0);
  const phaseRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const drawStateRef = useRef(null);
  const hasSearch = searchTerm.trim().length > 0;
  const stars = useMemo(() => makeStars(150), []);

  drawStateRef.current = {
    geometry,
    camera,
    lens,
    focused,
    hasSearch,
    matchingIds,
    hoverTarget,
    stars
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const resize = (notify = true) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const next = { width: rect.width, height: rect.height, dpr };
      const pixelWidth = Math.max(1, Math.round(rect.width * dpr));
      const pixelHeight = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      const prev = sizeRef.current;
      if (notify && (Math.abs(prev.width - next.width) > 0.5 || Math.abs(prev.height - next.height) > 0.5 || prev.dpr !== next.dpr)) {
        sizeRef.current = next;
        onSize(next);
      }
      return rect;
    };

    const drawFrame = (time) => {
      const rect = resize();
      const state = drawStateRef.current;
      if (state && rect.width > 0 && rect.height > 0) {
        const ctx = canvas.getContext("2d");
        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        const phase = reduceMotion ? 0 : time / 1000;
        phaseRef.current = phase;
        drawAtlas(ctx, rect, { ...state, phase });
      }
      loopRef.current = requestAnimationFrame(drawFrame);
    };

    requestAnimationFrame(() => resize());
    loopRef.current = requestAnimationFrame(drawFrame);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(loopRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onSize]);

  const locate = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const screen = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    return { screen, world: screenToWorld(screen, camera) };
  };

  const updateHover = (event) => {
    if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const { world } = locate(event);
      const hit = hitTest(world, geometry, { focused, matchingIds, hasSearch, phase: phaseRef.current, zoom: camera.zoom });
      const nextId = hit.type ? `${hit.type}:${hit.id}` : "";
      if (nextId !== hoverRef.current) {
        hoverRef.current = nextId;
        canvasRef.current.style.cursor = hit.type ? "pointer" : dragRef.current ? "grabbing" : "grab";
        onHover(hit.type ? hit : null);
      }
    });
  };

  const onPointerDown = (event) => {
    const { screen } = locate(event);
    dragRef.current = { x: screen.x, y: screen.y, moved: 0 };
    canvasRef.current.setPointerCapture?.(event.pointerId);
    canvasRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (event) => {
    if (dragRef.current) {
      const { screen } = locate(event);
      const dx = screen.x - dragRef.current.x;
      const dy = screen.y - dragRef.current.y;
      dragRef.current.x = screen.x;
      dragRef.current.y = screen.y;
      dragRef.current.moved += Math.abs(dx) + Math.abs(dy);
      onPan(dx, dy);
      return;
    }
    updateHover(event);
  };

  const onPointerUp = (event) => {
    const drag = dragRef.current;
    dragRef.current = null;
    canvasRef.current.releasePointerCapture?.(event.pointerId);
    canvasRef.current.style.cursor = hoverRef.current ? "pointer" : "grab";
    if (drag && drag.moved > 8) return;
    const { world } = locate(event);
    const hit = hitTest(world, geometry, { focused, matchingIds, hasSearch, phase: phaseRef.current, zoom: camera.zoom });
    if (hit.type === "moon") onMoonClick(hit.entry);
    if (hit.type === "planet") onPlanetClick(hit.planet.id);
  };

  const onWheel = (event) => {
    event.preventDefault();
    const { screen } = locate(event);
    onZoom(event.deltaY < 0 ? 1.08 : 0.92, screen);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowUp") onPan(0, 70);
    if (event.key === "ArrowDown") onPan(0, -70);
    if (event.key === "ArrowLeft") onPan(70, 0);
    if (event.key === "ArrowRight") onPan(-70, 0);
    if (event.key === "+" || event.key === "=") onZoom(1.12);
    if (event.key === "-") onZoom(0.88);
  };

  return (
    <canvas
      ref={canvasRef}
      className="atlas-canvas"
      role="application"
      tabIndex={0}
      aria-label="Interactive process atlas map. Click sector planets to focus and technology moons to open process cards. Arrow keys pan and plus or minus zoom."
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={() => {
        hoverRef.current = "";
        onHover(null);
      }}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
    />
  );
}

function drawAtlas(ctx, rect, state) {
  const { geometry, camera, lens, focused, hasSearch, matchingIds, hoverTarget, stars, phase } = state;
  ctx.clearRect(0, 0, rect.width, rect.height);
  drawBackground(ctx, rect, stars, camera, phase);

  ctx.save();
  ctx.translate(camera.tx, camera.ty);
  ctx.scale(camera.zoom, camera.zoom);

  drawCentralField(ctx);

  for (const planet of geometry.planets) {
    const color = colorForSector(planet.id);
    const isFocused = focused === planet.id;
    const dim = focused && !isFocused;
    ctx.globalAlpha = dim ? 0.24 : 1;
    drawOrbit(ctx, planet, color, isFocused);
    drawPlanetConnective(ctx, planet, color, dim);
  }

  for (const planet of geometry.planets) {
    for (const moon of planet.moons) {
      const isSectorFocused = focused === planet.id;
      const isSearchMatch = !hasSearch || matchingIds.has(moon.id);
      const isHover = hoverTarget?.id === moon.id;
      const dim = (focused && !isSectorFocused && !isSearchMatch) || (hasSearch && !isSearchMatch);
      const position = moonPosition(moon, focused, phase);
      drawMoon(ctx, { ...moon, ...position }, colorForEntry(moon.entry, lens), { dim, active: isHover || isSearchMatch, focused: isSectorFocused });
    }
  }

  for (const planet of geometry.planets) {
    const isFocused = focused === planet.id;
    const dim = focused && !isFocused;
    drawPlanet(ctx, planet, colorForSector(planet.id), { dim, focused: isFocused, hover: hoverTarget?.id === planet.id });
  }

  for (const planet of geometry.planets) {
    drawPlanetLabel(ctx, planet, colorForSector(planet.id), focused && focused !== planet.id);
  }

  const placedLabels = [];
  for (const candidate of labelCandidates(geometry, { focused, hasSearch, matchingIds, hoverTarget, lens, phase })) {
    const baseBox = labelBox(candidate.moon, candidate.position, 0);
    const box = intersectsAny(baseBox, placedLabels) ? labelBox(candidate.moon, candidate.position, 28) : baseBox;
    if (intersectsAny(box, placedLabels)) continue;
    placedLabels.push(box);
    drawMoonLabel(ctx, candidate.moon, candidate.position, candidate.color, candidate.prominent, box);
  }

  ctx.restore();
}

function drawBackground(ctx, rect, stars, camera, phase) {
  const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
  gradient.addColorStop(0, "#07110f");
  gradient.addColorStop(0.42, "#0b1118");
  gradient.addColorStop(1, "#101014");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);

  ctx.save();
  for (const star of stars) {
    const twinkle = 0.72 + Math.sin(phase * star.twinkle + star.seed) * 0.28;
    ctx.globalAlpha = star.a * twinkle;
    ctx.fillStyle = star.c;
    const parallaxX = -camera.tx * 0.018 * star.depth;
    const parallaxY = -camera.ty * 0.012 * star.depth;
    const x = wrap(star.x * rect.width + parallaxX, rect.width);
    const y = wrap(star.y * rect.height + parallaxY, rect.height);
    ctx.fillRect(x, y, star.s, star.s);
  }
  ctx.restore();
}

function drawCentralField(ctx) {
  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = "rgba(230,242,255,0.18)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.ellipse(900, 560, 690, 430, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(900, 560, 460, 285, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = "rgba(230,242,255,0.82)";
  ctx.font = "500 14px Inter, system-ui";
  ctx.fillText("PROCESS FLOW", 850, 552);
  ctx.font = "500 10px Inter, system-ui";
  ctx.fillStyle = "rgba(230,242,255,0.46)";
  ctx.fillText("chemicals / unit ops / bottlenecks / readiness", 790, 574);
  ctx.restore();
}

function drawOrbit(ctx, planet, color, focused) {
  ctx.save();
  ctx.strokeStyle = toRgba(color, focused ? 0.34 : 0.16);
  ctx.lineWidth = focused ? 2 : 1;
  ctx.setLineDash(focused ? [12, 8] : [6, 10]);
  ctx.shadowColor = toRgba(color, focused ? 0.3 : 0.1);
  ctx.shadowBlur = focused ? 12 : 4;
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, planet.radius + 108, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, planet.radius + 154, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPlanetConnective(ctx, planet, color, dim) {
  ctx.save();
  ctx.globalAlpha = dim ? 0.16 : 0.35;
  ctx.strokeStyle = toRgba(color, 0.4);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(900, 560);
  ctx.lineTo(planet.x, planet.y);
  ctx.stroke();
  ctx.restore();
}

function drawMoon(ctx, moon, color, options) {
  ctx.save();
  ctx.globalAlpha = options.dim ? 0.17 : 0.95;
  const radius = (options.focused ? 10 : 7) * (options.active ? 1.22 : 1);
  ctx.fillStyle = color;
  ctx.strokeStyle = options.active ? "#f7fbff" : toRgba(color, 0.55);
  ctx.lineWidth = options.active ? 2 : 1;
  ctx.shadowColor = options.active ? color : "transparent";
  ctx.shadowBlur = options.active ? 15 : 0;
  ctx.beginPath();
  ctx.arc(moon.x, moon.y, options.active ? radius + 3 : radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  if (options.active) {
    ctx.globalAlpha = 0.22;
    ctx.beginPath();
    ctx.arc(moon.x, moon.y, radius + 13, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPlanet(ctx, planet, color, options) {
  ctx.save();
  ctx.globalAlpha = options.dim ? 0.34 : 1;
  const radius = options.focused ? planet.radius * 1.12 : planet.radius;
  const pulse = 1 + Math.sin(performance.now() / 1200 + planet.x) * 0.05;
  ctx.shadowColor = toRgba(color, options.focused ? 0.42 : 0.2);
  ctx.shadowBlur = options.focused ? 28 * pulse : 12;
  const gradient = ctx.createRadialGradient(planet.x - radius * 0.35, planet.y - radius * 0.35, 4, planet.x, planet.y, radius);
  gradient.addColorStop(0, "#f7fbff");
  gradient.addColorStop(0.15, toRgba(color, 0.95));
  gradient.addColorStop(1, "#11151c");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = options.hover || options.focused ? "#f7fbff" : toRgba(color, 0.72);
  ctx.lineWidth = options.hover || options.focused ? 3 : 1.4;
  ctx.stroke();
  drawPlanetPattern(ctx, planet, color, radius);
  ctx.restore();
}

function drawPlanetPattern(ctx, planet, color, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, radius - 1, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = toRgba(color, 0.48);
  ctx.lineWidth = 1.2;

  if (planet.id === "energy") {
    for (let i = 0; i < 12; i += 1) {
      const a = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(planet.x, planet.y);
      ctx.lineTo(planet.x + Math.cos(a) * radius, planet.y + Math.sin(a) * radius);
      ctx.stroke();
    }
  } else if (planet.id === "carbon") {
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.arc(planet.x + i * 12 - 18, planet.y + Math.sin(i) * 10, 10, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (planet.id === "water") {
    for (let i = -2; i <= 2; i += 1) {
      ctx.beginPath();
      ctx.ellipse(planet.x, planet.y + i * 15, radius * 0.9, 7, -0.2, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (planet.id === "materials") {
    for (let i = 0; i < 6; i += 1) {
      ctx.beginPath();
      ctx.moveTo(planet.x, planet.y);
      ctx.lineTo(planet.x + Math.cos(i) * radius, planet.y + Math.sin(i * 1.7) * radius);
      ctx.stroke();
    }
  } else if (planet.id === "manufacturing") {
    for (let x = planet.x - radius; x < planet.x + radius; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, planet.y - radius);
      ctx.lineTo(x + 20, planet.y + radius);
      ctx.stroke();
    }
  } else if (planet.id === "cities") {
    ctx.fillStyle = toRgba(color, 0.48);
    for (let i = 0; i < 18; i += 1) {
      const x = planet.x - radius + 10 + (i % 6) * 18;
      const y = planet.y - radius + 14 + Math.floor(i / 6) * 22;
      ctx.fillRect(x, y, 4, 8);
    }
  } else if (planet.id === "space") {
    ctx.beginPath();
    ctx.ellipse(planet.x, planet.y, radius * 1.35, radius * 0.36, -0.25, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPlanetLabel(ctx, planet, color, dim) {
  ctx.save();
  ctx.globalAlpha = dim ? 0.34 : 0.95;
  ctx.fillStyle = "#f7fbff";
  ctx.font = "700 20px Inter, system-ui";
  ctx.textAlign = "center";
  ctx.fillText(planet.label, planet.x, planet.y + planet.radius + 36);
  ctx.font = "600 11px Inter, system-ui";
  ctx.fillStyle = toRgba(color, 0.9);
  ctx.fillText(`${planet.moons.length} process moons`, planet.x, planet.y + planet.radius + 54);
  ctx.restore();
}

function drawMoonLabel(ctx, moon, position, color, prominent, box) {
  ctx.save();
  const label = moon.entry.name;
  const x = box.x;
  const y = box.y + 18;
  ctx.globalAlpha = prominent ? 0.95 : 0.82;
  ctx.fillStyle = "rgba(7, 14, 18, 0.86)";
  roundRect(ctx, box.x, box.y, box.width, box.height, 6);
  ctx.fill();
  ctx.strokeStyle = toRgba(color, 0.55);
  ctx.stroke();
  ctx.strokeStyle = toRgba(color, prominent ? 0.42 : 0.2);
  ctx.beginPath();
  ctx.moveTo(position.x, position.y);
  ctx.lineTo(box.x + (box.x > position.x ? 0 : box.width), box.y + box.height / 2);
  ctx.stroke();
  ctx.fillStyle = "#f7fbff";
  ctx.font = "600 12px Inter, system-ui";
  ctx.textAlign = "left";
  ctx.fillText(label.length > 30 ? `${label.slice(0, 28)}...` : label, x + 8, y - 2);
  ctx.restore();
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function toRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function makeStars(count) {
  let seed = 17;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, () => ({
    x: rand(),
    y: rand(),
    s: rand() > 0.88 ? 2 : 1,
    a: 0.18 + rand() * 0.56,
    c: rand() > 0.7 ? "#9eb5ff" : "#e6f2ff",
    depth: 0.5 + rand() * 1.4,
    twinkle: 0.8 + rand() * 1.8,
    seed: rand() * Math.PI * 2
  }));
}

function labelCandidates(geometry, options) {
  const { focused, hasSearch, matchingIds, hoverTarget, lens, phase } = options;
  const candidates = [];

  for (const planet of geometry.planets) {
    const focusedMoons = focused === planet.id && !hasSearch
      ? [...planet.moons]
        .sort((a, b) => (b.entry.trl + b.entry.mrl + b.entry.irl) - (a.entry.trl + a.entry.mrl + a.entry.irl))
        .slice(0, 4)
      : [];

    for (const moon of planet.moons) {
      const isHover = hoverTarget?.id === moon.id;
      const isSearchMatch = hasSearch && matchingIds.has(moon.id);
      const isFocusPick = focusedMoons.includes(moon);
      if (!isHover && !isSearchMatch && !isFocusPick) continue;
      candidates.push({
        moon,
        position: moonPosition(moon, focused, phase),
        color: colorForEntry(moon.entry, lens),
        prominent: isHover || isSearchMatch,
        priority: isHover ? 100 : isSearchMatch ? 80 : 40
      });
    }
  }

  return candidates.sort((a, b) => b.priority - a.priority);
}

function labelBox(moon, position, radialOffset) {
  const label = moon.entry.name;
  const width = Math.min(210, Math.max(84, label.length * 6.4));
  const height = 24;
  const outward = position.angle ?? moon.angle;
  const side = Math.cos(outward) >= 0 ? 1 : -1;
  const anchorX = position.x + Math.cos(outward) * radialOffset;
  const anchorY = position.y + Math.sin(outward) * radialOffset;
  return {
    x: side > 0 ? anchorX + 14 : anchorX - width - 14,
    y: anchorY - 24,
    width,
    height
  };
}

function intersectsAny(box, placed) {
  return placed.some((other) => intersects(box, other));
}

function intersects(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function wrap(value, max) {
  return ((value % max) + max) % max;
}
