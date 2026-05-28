import { useEffect, useMemo, useRef } from "react";
import { colorForEntry, colorForSector, screenToWorld } from "./mapGeometry.js";
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
  const hasSearch = searchTerm.trim().length > 0;
  const stars = useMemo(() => makeStars(150), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      onSize({ width: rect.width, height: rect.height, dpr });
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [onSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawAtlas(ctx, rect, {
      geometry,
      camera,
      lens,
      focused,
      hasSearch,
      matchingIds,
      hoverTarget,
      stars
    });
  }, [camera, focused, geometry, hasSearch, hoverTarget, lens, matchingIds, stars]);

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
      const hit = hitTest(world, geometry, { focused, matchingIds, hasSearch });
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
    const hit = hitTest(world, geometry, { focused, matchingIds, hasSearch });
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
  const { geometry, camera, lens, focused, hasSearch, matchingIds, hoverTarget, stars } = state;
  ctx.clearRect(0, 0, rect.width, rect.height);
  drawBackground(ctx, rect, stars);

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
      drawMoon(ctx, moon, colorForEntry(moon.entry, lens), { dim, active: isHover || isSearchMatch, focused: isSectorFocused });
    }
  }

  for (const planet of geometry.planets) {
    const isFocused = focused === planet.id;
    const dim = focused && !isFocused;
    drawPlanet(ctx, planet, colorForSector(planet.id), { dim, focused: isFocused, hover: hoverTarget?.id === planet.id });
  }

  for (const planet of geometry.planets) {
    drawPlanetLabel(ctx, planet, colorForSector(planet.id), focused && focused !== planet.id);
    for (const moon of planet.moons) {
      const label = focused === planet.id || hoverTarget?.id === moon.id || (hasSearch && matchingIds.has(moon.id));
      if (label) drawMoonLabel(ctx, moon, colorForEntry(moon.entry, lens), focused === planet.id || hoverTarget?.id === moon.id);
    }
  }

  ctx.restore();
}

function drawBackground(ctx, rect, stars) {
  const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
  gradient.addColorStop(0, "#07110f");
  gradient.addColorStop(0.42, "#0b1118");
  gradient.addColorStop(1, "#101014");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);

  ctx.save();
  for (const star of stars) {
    ctx.globalAlpha = star.a;
    ctx.fillStyle = star.c;
    ctx.fillRect((star.x * rect.width) % rect.width, (star.y * rect.height) % rect.height, star.s, star.s);
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
  const radius = options.focused ? 10 : 7;
  ctx.fillStyle = color;
  ctx.strokeStyle = options.active ? "#f7fbff" : toRgba(color, 0.55);
  ctx.lineWidth = options.active ? 2 : 1;
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

function drawMoonLabel(ctx, moon, color, prominent) {
  ctx.save();
  const label = moon.entry.name;
  const width = Math.min(210, Math.max(72, label.length * 6.4));
  const x = moon.x + 13;
  const y = moon.y - 13;
  ctx.globalAlpha = prominent ? 0.95 : 0.82;
  ctx.fillStyle = "rgba(7, 14, 18, 0.86)";
  roundRect(ctx, x, y - 18, width, 24, 6);
  ctx.fill();
  ctx.strokeStyle = toRgba(color, 0.55);
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
    c: rand() > 0.7 ? "#9eb5ff" : "#e6f2ff"
  }));
}
