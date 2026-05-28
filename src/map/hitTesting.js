import { moonPosition } from "./mapGeometry.js";

export function hitTest(worldPoint, geometry, options = {}) {
  const focused = options.focused || "";
  const matchingIds = options.matchingIds || new Set();
  const hasSearch = options.hasSearch || false;
  const phase = options.phase || 0;

  let bestMoon = null;
  let bestMoonDistance = Infinity;
  for (const moon of geometry.allMoons) {
    const isFocused = !focused || moon.planetId === focused;
    const isMatch = !hasSearch || matchingIds.has(moon.id);
    const position = moonPosition(moon, focused, phase);
    const radius = Math.max(24 / (options.zoom || 1), (focused === moon.planetId ? 22 : 16) + (isMatch ? 8 : 0));
    const distance = distanceTo(worldPoint, position);
    if ((isFocused || isMatch) && distance <= radius && distance < bestMoonDistance) {
      bestMoon = { ...moon, x: position.x, y: position.y };
      bestMoonDistance = distance;
    }
  }
  if (bestMoon) return { type: "moon", id: bestMoon.id, moon: bestMoon, entry: bestMoon.entry };

  let bestPlanet = null;
  let bestPlanetDistance = Infinity;
  for (const planet of geometry.planets) {
    const distance = distanceTo(worldPoint, planet);
    if (distance <= planet.radius + 18 && distance < bestPlanetDistance) {
      bestPlanet = planet;
      bestPlanetDistance = distance;
    }
  }
  if (bestPlanet) return { type: "planet", id: bestPlanet.id, planet: bestPlanet };

  return { type: "", id: "" };
}

function distanceTo(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
