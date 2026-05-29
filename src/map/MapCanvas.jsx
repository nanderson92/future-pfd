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
  const introStartRef = useRef(0);
  const phaseRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const drawStateRef = useRef(null);
  const dirtyRef = useRef(true);
  const hasSearch = searchTerm.trim().length > 0;
  const stars = useMemo(() => makeStars(260), []);

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

    let lastDraw = 0;
    const frameBudget = 30;
    const drawFrame = (time) => {
      loopRef.current = requestAnimationFrame(drawFrame);
      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      if (reduceMotion) {
        if (!dirtyRef.current) return;
        dirtyRef.current = false;
      } else if (time - lastDraw < frameBudget) {
        return;
      }
      lastDraw = time;
      const rect = resize();
      const state = drawStateRef.current;
      if (state && rect.width > 0 && rect.height > 0) {
        const ctx = canvas.getContext("2d");
        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const phase = reduceMotion ? 0 : time / 1000;
        if (!introStartRef.current) introStartRef.current = time;
        const intro = reduceMotion ? 1 : Math.min(1, Math.max(0, (time - introStartRef.current) / 1200));
        phaseRef.current = phase;
        drawAtlas(ctx, rect, { ...state, phase, intro });
      }
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

  useEffect(() => {
    dirtyRef.current = true;
  }, [geometry, camera, lens, focused, hasSearch, matchingIds, hoverTarget]);

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
  const { geometry, camera, lens, focused, hasSearch, matchingIds, hoverTarget, stars, phase, intro } = state;
  ctx.clearRect(0, 0, rect.width, rect.height);
  drawBackground(ctx, rect, stars, camera, phase, intro);

  ctx.save();
  ctx.translate(camera.tx, camera.ty);
  ctx.scale(camera.zoom, camera.zoom);

  drawCentralField(ctx, phase, intro);
  drawShippingLanes(ctx, geometry, phase, intro);

  for (const planet of geometry.planets) {
    const color = colorForSector(planet.id);
    const isFocused = focused === planet.id;
    const dim = focused && !isFocused;
    ctx.globalAlpha = dim ? 0.24 : 1;
    drawOrbit(ctx, planet, color, isFocused, intro);
    drawPlanetConnective(ctx, planet, color, dim, intro);
  }

  for (const planet of geometry.planets) {
    for (const moon of planet.moons) {
      const isSectorFocused = focused === planet.id;
      const isSearchMatch = !hasSearch || matchingIds.has(moon.id);
      const isHover = hoverTarget?.id === moon.id;
      const dim = (focused && !isSectorFocused && !isSearchMatch) || (hasSearch && !isSearchMatch);
      const position = moonPosition(moon, focused, phase);
      const planetIntro = planetIntroValue(geometry.planets.indexOf(planet), intro);
      drawMoon(ctx, { ...moon, ...position }, colorForEntry(moon.entry, lens), { dim, active: isHover || (hasSearch && isSearchMatch), focused: isSectorFocused, intro: planetIntro });
    }
  }

  for (const planet of geometry.planets) {
    const isFocused = focused === planet.id;
    const dim = focused && !isFocused;
    drawPlanet(ctx, planet, colorForSector(planet.id), { dim, focused: isFocused, hover: hoverTarget?.id === planet.id, intro: planetIntroValue(geometry.planets.indexOf(planet), intro), phase });
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

function drawBackground(ctx, rect, stars, camera, phase, intro) {
  const layer = getStaticLayer(rect.width, rect.height);
  ctx.globalAlpha = intro;
  ctx.drawImage(layer, 0, 0, rect.width, rect.height);
  ctx.globalAlpha = 1;
}

function drawNebula(ctx, rect, camera, phase, intro) {
  const clouds = [
    [0.22, 0.36, 360, "rgba(94,224,192,0.07)", 0.012],
    [0.78, 0.28, 420, "rgba(158,181,255,0.06)", 0.018],
    [0.54, 0.78, 340, "rgba(245,197,66,0.045)", 0.009]
  ];
  ctx.save();
  for (const [x0, y0, radius, color, parallax] of clouds) {
    const x = x0 * rect.width - camera.tx * parallax + Math.sin(phase * 0.08 + x0) * 8;
    const y = y0 * rect.height - camera.ty * parallax + Math.cos(phase * 0.06 + y0) * 8;
    const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(5,7,13,0)");
    ctx.globalAlpha = intro;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, rect.height);
  }
  ctx.restore();
}

function drawCentralField(ctx, phase, intro) {
  ctx.save();
  ctx.globalAlpha = intro;
  const pulse = 1 + Math.sin(phase * 1.4) * 0.05;
  const core = ctx.createRadialGradient(900, 560, 0, 900, 560, 90 * pulse);
  core.addColorStop(0, "rgba(232,238,246,0.95)");
  core.addColorStop(0.16, "rgba(94,224,192,0.52)");
  core.addColorStop(1, "rgba(94,224,192,0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(900, 560, 90 * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(159,176,195,0.18)";
  ctx.lineWidth = 1.2;
  ctx.setLineDash([10, 12]);
  ctx.beginPath();
  ctx.ellipse(900, 560, 690, 430, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(900, 560, 460, 285, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 0.9 * intro;
  ctx.fillStyle = "rgba(230,242,255,0.82)";
  ctx.textAlign = "center";
  ctx.font = "700 14px JetBrains Mono, IBM Plex Mono, Consolas, monospace";
  ctx.fillText("PROCESS FLOW", 900, 553);
  ctx.font = "600 10px JetBrains Mono, IBM Plex Mono, Consolas, monospace";
  ctx.fillStyle = "rgba(199,211,223,0.62)";
  ctx.fillText("CHEM / UNIT OPS / BOTTLENECKS / READINESS", 900, 574);
  ctx.restore();
}

function drawShippingLanes(ctx, geometry, phase, intro) {
  const lanes = [
    ["energy", "carbon"],
    ["carbon", "materials"],
    ["materials", "manufacturing"],
    ["manufacturing", "cities"],
    ["energy", "space"],
    ["water", "cities"]
  ];
  ctx.save();
  ctx.globalAlpha = intro;
  for (const [fromId, toId] of lanes) {
    const from = geometry.planetById.get(fromId);
    const to = geometry.planetById.get(toId);
    if (!from || !to) continue;
    const color = colorForSector(toId);
    drawLane(ctx, from, to, color, phase);
  }
  ctx.restore();
}

function drawLane(ctx, from, to, color, phase) {
  const cx = (from.x + to.x) / 2 + (to.y - from.y) * 0.18;
  const cy = (from.y + to.y) / 2 - (to.x - from.x) * 0.12;
  ctx.save();
  ctx.strokeStyle = toRgba(color, 0.18);
  ctx.lineWidth = 1.2;
  ctx.setLineDash([12, 14]);
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.quadraticCurveTo(cx, cy, to.x, to.y);
  ctx.stroke();
  ctx.setLineDash([]);

  const t = (phase * 0.08 + (from.x + to.y) * 0.001) % 1;
  const x = quadratic(from.x, cx, to.x, t);
  const y = quadratic(from.y, cy, to.y, t);
  ctx.fillStyle = toRgba(color, 0.72);
  ctx.beginPath();
  ctx.arc(x, y, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawOrbit(ctx, planet, color, focused, intro) {
  ctx.save();
  ctx.globalAlpha = intro;
  ctx.strokeStyle = toRgba(color, focused ? 0.38 : 0.18);
  ctx.lineWidth = focused ? 2 : 1;
  ctx.setLineDash(focused ? [14, 8] : [6, 12]);
  const rings = [...new Set(planet.moons.map((moon) => moon.ring))].sort((a, b) => a - b);
  for (const ring of rings) {
    const moon = planet.moons.find((item) => item.ring === ring);
    if (!moon) continue;
    ctx.beginPath();
    ctx.ellipse(planet.x, planet.y, moon.orbitX, moon.orbitY, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPlanetConnective(ctx, planet, color, dim, intro) {
  ctx.save();
  ctx.globalAlpha = (dim ? 0.1 : 0.26) * intro;
  ctx.strokeStyle = toRgba(color, 0.4);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(900, 560);
  ctx.lineTo(planet.x, planet.y);
  ctx.stroke();
  ctx.restore();
}

function drawMoon(ctx, moon, color, options) {
  const intro = options.intro ?? 1;
  if (intro <= 0) return;
  const baseRadius = options.focused ? moon.radius + 1.5 : moon.radius;

  if (options.active) {
    ctx.save();
    ctx.globalAlpha = intro;
    const radius = baseRadius * 1.3;
    ctx.fillStyle = color;
    ctx.strokeStyle = "#f7fbff";
    ctx.lineWidth = 2;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(moon.x, moon.y, radius + 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.22;
    ctx.beginPath();
    ctx.arc(moon.x, moon.y, radius + 13, 0, Math.PI * 2);
    ctx.stroke();
    drawTargetReticle(ctx, moon.x, moon.y, radius + 18, color);
    ctx.restore();
    return;
  }

  const sprite = getMoonSprite(color, baseRadius);
  ctx.globalAlpha = (options.dim ? 0.17 : 0.95) * intro;
  ctx.drawImage(sprite.canvas, moon.x - sprite.half, moon.y - sprite.half);
  ctx.globalAlpha = 1;
}

function drawPlanet(ctx, planet, color, options) {
  const introScale = easeOutBack(options.intro ?? 1);
  if (introScale <= 0) return;
  const sprite = getPlanetSprite(planet, color, options.focused);
  const drawR = sprite.baseR * introScale;
  const w = sprite.size * introScale;
  ctx.save();
  ctx.globalAlpha = options.dim ? 0.34 : 1;
  ctx.drawImage(sprite.canvas, planet.x - w / 2, planet.y - w / 2, w, w);
  ctx.strokeStyle = options.hover || options.focused ? "#f7fbff" : toRgba(color, 0.72);
  ctx.lineWidth = options.hover || options.focused ? 3 : 1.4;
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, drawR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPlanetSphere(ctx, planet, color, radius) {
  if (radius < 3) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.globalCompositeOperation = "source-atop";
  const terminator = ctx.createLinearGradient(planet.x - radius, planet.y, planet.x + radius, planet.y);
  terminator.addColorStop(0, "rgba(0,0,0,0)");
  terminator.addColorStop(0.62, "rgba(0,0,0,0.18)");
  terminator.addColorStop(1, "rgba(0,0,0,0.72)");
  ctx.fillStyle = terminator;
  ctx.fillRect(planet.x - radius, planet.y - radius, radius * 2, radius * 2);
  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = toRgba(color, 0.78);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, radius - 1.5, -0.95, 0.55);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = toRgba(color, 0.34);
  ctx.lineWidth = 4;
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, radius + 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPlanetPattern(ctx, planet, color, radius) {
  if (radius < 3) return;
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
  const label = planet.label.toUpperCase();
  const labelWidth = Math.max(92, label.length * 12);
  ctx.fillStyle = "rgba(5, 7, 13, 0.72)";
  roundRect(ctx, planet.x - labelWidth / 2, planet.y + planet.radius + 19, labelWidth, 28, 6);
  ctx.fill();
  ctx.strokeStyle = toRgba(color, 0.32);
  ctx.stroke();
  ctx.fillStyle = "#f7fbff";
  ctx.font = "800 15px JetBrains Mono, IBM Plex Mono, Consolas, monospace";
  ctx.textAlign = "center";
  ctx.fillText(label, planet.x, planet.y + planet.radius + 38);
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
  ctx.font = "700 12px JetBrains Mono, IBM Plex Mono, Consolas, monospace";
  ctx.textAlign = "left";
  ctx.fillText(label.length > 42 ? `${label.slice(0, 40)}…` : label, x + 8, y - 2);
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
    s: rand() > 0.92 ? 1.9 : rand() > 0.7 ? 1.2 : 0.75,
    a: 0.12 + rand() * 0.62,
    c: rand() > 0.7 ? "#9eb5ff" : "#e6f2ff",
    depth: 0.5 + rand() * 1.4,
    parallax: 0.006 + rand() * 0.036,
    twinkle: 0.8 + rand() * 1.8,
    seed: rand() * Math.PI * 2
  }));
}

function drawTargetReticle(ctx, x, y, radius, color) {
  ctx.save();
  ctx.globalAlpha = 0.68;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.setLineDash([4, 5]);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  for (let i = 0; i < 4; i += 1) {
    const angle = (i / 4) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(angle) * (radius - 5), y + Math.sin(angle) * (radius - 5));
    ctx.lineTo(x + Math.cos(angle) * (radius + 7), y + Math.sin(angle) * (radius + 7));
    ctx.stroke();
  }
  ctx.restore();
}

function quadratic(a, b, c, t) {
  return (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;
}

function easeOutBack(value) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
}

function planetIntroValue(index, intro) {
  return Math.min(1, Math.max(0, (intro - index * 0.07) / 0.58));
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
  const width = Math.max(96, Math.min(320, label.length * 7.3 + 20));
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

/* ---- Phase 1 performance: cached sprites + static layers ---- */
const __planetSprites = new Map();
const __staticLayers = new Map();

function getPlanetSprite(planet, color, focused) {
  const key = `${planet.id}|${focused ? 1 : 0}`;
  const cached = __planetSprites.get(key);
  if (cached) return cached;
  const baseR = planet.radius * (focused ? 1.12 : 1);
  const pad = 46 + baseR * 0.55;
  const size = Math.ceil((baseR + pad) * 2);
  const cv = document.createElement("canvas");
  cv.width = size;
  cv.height = size;
  const c = cv.getContext("2d");
  c.translate(size / 2 - planet.x, size / 2 - planet.y);
  renderPlanetBody(c, planet, color, baseR);
  const sprite = { canvas: cv, baseR, size };
  __planetSprites.set(key, sprite);
  return sprite;
}

function renderPlanetBody(ctx, planet, color, radius) {
  ctx.save();
  ctx.shadowColor = toRgba(color, 0.3);
  ctx.shadowBlur = 22;
  const gradient = ctx.createRadialGradient(planet.x - radius * 0.35, planet.y - radius * 0.35, 4, planet.x, planet.y, radius);
  gradient.addColorStop(0, "#f7fbff");
  gradient.addColorStop(0.15, toRgba(color, 0.95));
  gradient.addColorStop(1, "#11151c");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  drawPlanetSphere(ctx, planet, color, radius);
  drawPlanetPattern(ctx, planet, color, radius);
}

function getStaticLayer(width, height) {
  const key = `${Math.round(width)}x${Math.round(height)}`;
  const cached = __staticLayers.get(key);
  if (cached) return cached;
  __staticLayers.clear();
  const cv = document.createElement("canvas");
  cv.width = Math.max(1, Math.round(width));
  cv.height = Math.max(1, Math.round(height));
  const c = cv.getContext("2d");
  const gradient = c.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#05070d");
  gradient.addColorStop(0.42, "#0b1018");
  gradient.addColorStop(1, "#12131b");
  c.fillStyle = gradient;
  c.fillRect(0, 0, width, height);
  const clouds = [
    [0.22, 0.36, 360, "rgba(94,224,192,0.07)"],
    [0.78, 0.28, 420, "rgba(158,181,255,0.06)"],
    [0.54, 0.78, 340, "rgba(245,197,66,0.045)"]
  ];
  for (const [x0, y0, r, col] of clouds) {
    const x = x0 * width;
    const y = y0 * height;
    const g = c.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, col);
    g.addColorStop(1, "rgba(5,7,13,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, width, height);
  }
  let seed = 17;
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (let i = 0; i < 150; i += 1) {
    const sx = rand() * width;
    const sy = rand() * height;
    const ss = rand() > 0.9 ? 1.8 : rand() > 0.7 ? 1.2 : 0.75;
    c.globalAlpha = 0.14 + rand() * 0.52;
    c.fillStyle = rand() > 0.7 ? "#9eb5ff" : "#e6f2ff";
    c.beginPath();
    c.arc(sx, sy, ss, 0, Math.PI * 2);
    c.fill();
  }
  c.globalAlpha = 1;
  __staticLayers.set(key, cv);
  return cv;
}

/* ---- Phase 1.5: cached moon sprites (replaces ~690 path ops/frame) ---- */
const __moonSprites = new Map();

function getMoonSprite(color, radius) {
  const key = `${color}|${radius.toFixed(1)}`;
  const cached = __moonSprites.get(key);
  if (cached) return cached;
  const pad = Math.ceil(radius * 1.8) + 3;
  const half = Math.ceil(radius) + pad;
  const size = half * 2;
  const cv = document.createElement("canvas");
  cv.width = size;
  cv.height = size;
  const c = cv.getContext("2d");
  c.translate(half, half);
  c.shadowColor = color;
  c.shadowBlur = radius * 1.6;
  c.fillStyle = color;
  c.strokeStyle = toRgba(color, 0.55);
  c.lineWidth = 1;
  c.beginPath();
  c.arc(0, 0, radius, 0, Math.PI * 2);
  c.fill();
  c.stroke();
  const sprite = { canvas: cv, half };
  __moonSprites.set(key, sprite);
  return sprite;
}
