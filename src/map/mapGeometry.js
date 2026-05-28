import { bottleneckColors, evidenceColors, sectorColors, unitOpColors } from "../data/atlasHelpers.js";

export const WORLD = { width: 1800, height: 1120, cx: 900, cy: 560 };

const PLANET_LAYOUT = [
  ["energy", -92, 550, 56],
  ["carbon", -38, 590, 52],
  ["water", 16, 610, 50],
  ["materials", 70, 575, 54],
  ["manufacturing", 124, 585, 54],
  ["cities", 178, 610, 52],
  ["space", 232, 585, 56]
];

const CHEMICAL_PALETTE = [
  "#f5c542", "#5ee0a1", "#56c7ff", "#c5a6ff", "#ff8b63", "#78f0d6",
  "#9eb5ff", "#e6f2ff", "#ff6f91", "#d9e175", "#8ce6ff", "#ffb86b"
];

export function createMapGeometry(entries, sectors) {
  const entriesBySector = Object.fromEntries(sectors.map((sector) => [sector.id, []]));
  entries.forEach((entry) => entriesBySector[entry.sector]?.push(entry));

  const planets = sectors.map((sector) => {
    const layout = PLANET_LAYOUT.find(([id]) => id === sector.id);
    const [, angleDeg, orbit, radius] = layout;
    const angle = (angleDeg * Math.PI) / 180;
    const x = WORLD.cx + Math.cos(angle) * orbit;
    const y = WORLD.cy + Math.sin(angle) * orbit * 0.62;
    const techs = entriesBySector[sector.id] || [];
    const moons = techs.map((entry, index) => {
      const ring = index % 3 === 0 && techs.length > 13 ? 2 : 1;
      const spread = (Math.PI * 2) / techs.length;
      const moonAngle = spread * index - Math.PI / 2 + (ring - 1) * 0.24;
      const moonOrbit = radius + 72 + ring * 34 + (index % 2) * 10;
      return {
        id: entry.pid,
        entry,
        planetId: sector.id,
        radius: ring === 2 ? 7 : 8,
        orbit: moonOrbit,
        angle: moonAngle,
        x: x + Math.cos(moonAngle) * moonOrbit,
        y: y + Math.sin(moonAngle) * moonOrbit
      };
    });

    return {
      ...sector,
      x,
      y,
      radius,
      moons,
      bounds: boundsForPoints([
        { x, y, radius },
        ...moons.map((moon) => ({ x: moon.x, y: moon.y, radius: 22 }))
      ], 80)
    };
  });

  const moonById = new Map();
  const planetById = new Map();
  planets.forEach((planet) => {
    planetById.set(planet.id, planet);
    planet.moons.forEach((moon) => moonById.set(moon.id, moon));
  });

  return {
    planets,
    planetById,
    moonById,
    allMoons: planets.flatMap((planet) => planet.moons),
    fullBounds: boundsForPoints(planets.flatMap((planet) => [
      { x: planet.x, y: planet.y, radius: planet.radius + 90 },
      ...planet.moons.map((moon) => ({ x: moon.x, y: moon.y, radius: 20 }))
    ]), 90)
  };
}

export function boundsForPoints(points, margin = 0) {
  const xs = points.flatMap((point) => [point.x - (point.radius || 0), point.x + (point.radius || 0)]);
  const ys = points.flatMap((point) => [point.y - (point.radius || 0), point.y + (point.radius || 0)]);
  const minX = Math.min(...xs) - margin;
  const maxX = Math.max(...xs) + margin;
  const minY = Math.min(...ys) - margin;
  const maxY = Math.max(...ys) + margin;
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}

export function safeAreaForViewport(viewport) {
  if (viewport.width < 760) {
    return { top: 18, right: 18, bottom: 230, left: 18 };
  }
  return { top: 28, right: 28, bottom: 28, left: 28 };
}

export function fitBounds(bounds, safeArea, viewport, options = {}) {
  const padding = options.padding ?? 0.92;
  const minZoom = options.minZoom ?? 0.28;
  const maxZoom = options.maxZoom ?? 2.2;
  const width = Math.max(1, viewport.width - safeArea.left - safeArea.right);
  const height = Math.max(1, viewport.height - safeArea.top - safeArea.bottom);
  const zoom = clamp(Math.min(width / bounds.width, height / bounds.height) * padding, minZoom, maxZoom);
  const cx = bounds.minX + bounds.width / 2;
  const cy = bounds.minY + bounds.height / 2;
  return {
    zoom,
    tx: safeArea.left + width / 2 - cx * zoom,
    ty: safeArea.top + height / 2 - cy * zoom
  };
}

export function worldToScreen(point, camera) {
  return {
    x: point.x * camera.zoom + camera.tx,
    y: point.y * camera.zoom + camera.ty
  };
}

export function screenToWorld(point, camera) {
  return {
    x: (point.x - camera.tx) / camera.zoom,
    y: (point.y - camera.ty) / camera.zoom
  };
}

export function colorForEntry(entry, lens) {
  if (lens === "chemicals") {
    const key = hashString(entry.chemical) % CHEMICAL_PALETTE.length;
    return CHEMICAL_PALETTE[key];
  }
  if (lens === "unitops") return unitOpColors[entry.unitOp] || "#e6f2ff";
  if (lens === "bottlenecks") return bottleneckColors[entry.bottleneck] || "#e6f2ff";
  if (lens === "readiness") {
    const avg = (entry.trl + entry.mrl + entry.irl) / 3;
    if (avg >= 7) return "#65e59d";
    if (avg >= 5) return "#f5c542";
    if (avg >= 3) return "#ff8b63";
    return "#ff6f91";
  }
  if (lens === "evidence") return evidenceColors[entry.evidence] || "#e6f2ff";
  return sectorColors[entry.sector] || "#e6f2ff";
}

export function colorForSector(sectorId) {
  return sectorColors[sectorId] || "#e6f2ff";
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}
