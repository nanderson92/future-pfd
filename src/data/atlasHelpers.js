import { BOTTLENECKS, CHEMICALS, SECTORS, UNIT_OPS } from "./atlasData.js";

export const sectorById = Object.fromEntries(SECTORS.map((sector) => [sector.id, sector]));
export const chemicalBySym = Object.fromEntries(CHEMICALS.map((chemical) => [chemical.sym, chemical]));
export const unitOpById = Object.fromEntries(UNIT_OPS.map((op) => [op.id, op]));
export const bottleneckById = Object.fromEntries(BOTTLENECKS.map((bottleneck) => [bottleneck.id, bottleneck]));

export const sectorColors = {
  energy: "#f5c542",
  carbon: "#5ee0a1",
  water: "#56c7ff",
  materials: "#c5a6ff",
  manufacturing: "#ff8b63",
  cities: "#78f0d6",
  space: "#9eb5ff"
};

export const evidenceColors = {
  direct: "#65e59d",
  roadmap: "#ffd166",
  analogue: "#caa8ff"
};

export const unitOpColors = {
  separation: "#56c7ff",
  reaction: "#ff8b63",
  heat: "#f5c542",
  deposition: "#c5a6ff",
  fabrication: "#78f0d6",
  qa: "#9eb5ff"
};

export const bottleneckColors = {
  "energy-intensity": "#f5c542",
  separations: "#56c7ff",
  yield: "#ff8b63",
  reliability: "#78f0d6",
  supply: "#c5a6ff",
  infrastructure: "#9eb5ff",
  cost: "#ffb86b",
  safety: "#ff6f91",
  "scale-up": "#65e59d",
  integration: "#8ce6ff",
  regulation: "#d9e175",
  purity: "#e6f2ff"
};

export function readinessAverage(entry) {
  return Math.round(((entry.trl + entry.mrl + entry.irl) / 3) * 10) / 10;
}

export function readinessBand(entry) {
  const avg = readinessAverage(entry);
  if (avg >= 7) return "deployable";
  if (avg >= 5) return "pilot";
  if (avg >= 3) return "development";
  return "concept";
}

export function entrySearchText(entry) {
  const chemical = chemicalBySym[entry.chemical];
  const op = unitOpById[entry.unitOp];
  const bottleneck = bottleneckById[entry.bottleneck];
  return [
    entry.pid,
    entry.name,
    entry.sector,
    entry.chemical,
    chemical?.name,
    op?.label,
    bottleneck?.label,
    entry.evidence,
    entry.description,
    ...(entry.flow || []).flat()
  ].filter(Boolean).join(" ").toLowerCase();
}

export function matchesEntry(entry, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return entrySearchText(entry).includes(q);
}

export function labelForReadinessBand(band) {
  return {
    concept: "Concept / lab",
    development: "Development",
    pilot: "Pilot / FOAK",
    deployable: "Deployment ready"
  }[band] || "Readiness";
}
