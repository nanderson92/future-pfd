import { BOTTLENECKS, CHEMICALS, ENTRIES, UNIT_OPS } from "../data/atlasData.js";
import { bottleneckById, chemicalBySym, evidenceColors, readinessAverage, sectorById, unitOpById } from "../data/atlasHelpers.js";
import { colorForChemical, colorForSector } from "./mapGeometry.js";

export default function SectorPanel({ focusedPlanet, hoverTarget, lens, onOpenEntry, onOpenIndex }) {
  const hoverEntry = hoverTarget?.type === "moon" ? hoverTarget.entry : null;
  const hoverPlanet = hoverTarget?.type === "planet" ? hoverTarget.planet : null;
  const planet = focusedPlanet || hoverPlanet;

  if (hoverEntry) {
    return (
      <aside className="sector-panel" data-sector={hoverEntry.sector}>
        <p className="eyebrow">{hoverEntry.pid} / {sectorById[hoverEntry.sector]?.label}</p>
        <h2>{hoverEntry.name}</h2>
        <p>{hoverEntry.description}</p>
        <dl>
          <div><dt>Spine</dt><dd>{hoverEntry.chemical} / {chemicalBySym[hoverEntry.chemical]?.name}</dd></div>
          <div><dt>Unit op</dt><dd>{unitOpById[hoverEntry.unitOp]?.label}</dd></div>
          <div><dt>Bottleneck</dt><dd>{bottleneckById[hoverEntry.bottleneck]?.label}</dd></div>
          <div><dt>Evidence</dt><dd>{hoverEntry.evidence}</dd></div>
        </dl>
        <LensLegend lens={lens} />
        <button type="button" onClick={() => onOpenEntry(hoverEntry)}>Open process card</button>
      </aside>
    );
  }

  if (planet) {
    const avg = planet.moons.reduce((sum, moon) => sum + readinessAverage(moon.entry), 0) / Math.max(1, planet.moons.length);
    return (
      <aside className="sector-panel" data-sector={planet.id}>
        <p className="eyebrow">Sector focus / {lens}</p>
        <h2>{planet.label}</h2>
        <p>{descriptionForSector(planet.id)}</p>
        <dl>
          <div><dt>Process moons</dt><dd>{planet.moons.length}</dd></div>
          <div><dt>Avg readiness</dt><dd>{avg.toFixed(1)} / 9</dd></div>
          <div><dt>Mode</dt><dd>{focusedPlanet ? "Focused sector" : "Hover preview"}</dd></div>
        </dl>
        <LensLegend lens={lens} sectorId={planet.id} />
        <button type="button" onClick={() => onOpenIndex(planet.id)}>Open filtered index</button>
      </aside>
    );
  }

  return (
    <aside className="sector-panel">
      <p className="eyebrow">Readout</p>
      <h2>Full Orbit</h2>
      <p>
        Pick a sector planet to focus its moon system. Search highlights matching technologies
        without moving the camera or making targets fight you.
      </p>
      <dl>
        <div><dt>Map mode</dt><dd>Canvas planets and process moons</dd></div>
        <div><dt>Lens</dt><dd>{lens}</dd></div>
      </dl>
      <LensLegend lens={lens} />
    </aside>
  );
}

function LensLegend({ lens, sectorId }) {
  const items = legendItems(lens, sectorId);
  return (
    <section className="lens-legend" aria-label={`${lens} legend`}>
      <h3>{legendTitle(lens)}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span className="legend-swatch" style={{ background: item.color }} />
            <span>{item.label}</span>
            {item.count != null && <b>{item.count}</b>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function legendItems(lens, sectorId) {
  const entries = sectorId ? ENTRIES.filter((entry) => entry.sector === sectorId) : ENTRIES;
  if (lens === "chemicals") {
    return CHEMICALS
      .map((chemical) => ({
        id: chemical.sym,
        label: `${chemical.sym} / ${chemical.name}`,
        color: colorForChemical(chemical.sym),
        count: entries.filter((entry) => entry.chemical === chemical.sym).length
      }))
      .filter((item) => item.count > 0)
      .slice(0, 9);
  }
  if (lens === "unitops") {
    return UNIT_OPS.map((op) => ({
      id: op.id,
      label: op.label,
      color: unitOpLegendColor(op.id),
      count: entries.filter((entry) => entry.unitOp === op.id).length
    })).filter((item) => item.count > 0);
  }
  if (lens === "bottlenecks") {
    return BOTTLENECKS.map((bottleneck) => ({
      id: bottleneck.id,
      label: bottleneck.label,
      color: bottleneckLegendColor(bottleneck.id),
      count: entries.filter((entry) => entry.bottleneck === bottleneck.id).length
    })).filter((item) => item.count > 0).slice(0, 8);
  }
  if (lens === "readiness") {
    return [
      { id: "concept", label: "Concept / lab", color: "#ff6f91" },
      { id: "development", label: "Development", color: "#ff8b63" },
      { id: "pilot", label: "Pilot / FOAK", color: "#f5c542" },
      { id: "deployable", label: "Deployment ready", color: "#65e59d" }
    ];
  }
  if (lens === "evidence") {
    return [
      { id: "direct", label: "Direct evidence", color: evidenceColors.direct, count: entries.filter((entry) => entry.evidence === "direct").length },
      { id: "roadmap", label: "Roadmap target", color: evidenceColors.roadmap, count: entries.filter((entry) => entry.evidence === "roadmap").length },
      { id: "analogue", label: "Analogue inference", color: evidenceColors.analogue, count: entries.filter((entry) => entry.evidence === "analogue").length }
    ];
  }
  return Object.entries(
    entries.reduce((acc, entry) => {
      acc[entry.sector] = (acc[entry.sector] || 0) + 1;
      return acc;
    }, {})
  ).map(([id, count]) => ({
    id,
    label: sectorById[id]?.label || id,
    color: colorForSector(id),
    count
  }));
}

function legendTitle(lens) {
  return {
    sectors: "Sector colors",
    chemicals: "Chemical spine",
    unitops: "Unit operations",
    bottlenecks: "Bottlenecks",
    readiness: "Readiness ramp",
    evidence: "Evidence posture"
  }[lens] || "Map legend";
}

function unitOpLegendColor(id) {
  return {
    separation: "#56c7ff",
    reaction: "#ff8b63",
    heat: "#f5c542",
    deposition: "#c5a6ff",
    fabrication: "#78f0d6",
    qa: "#9eb5ff"
  }[id] || "#e6f2ff";
}

function bottleneckLegendColor(id) {
  return {
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
  }[id] || "#e6f2ff";
}

function descriptionForSector(sectorId) {
  return {
    energy: "Energy systems connect device physics to durable balance-of-plant hardware, power conversion, and infrastructure.",
    carbon: "Carbon systems turn capture, conversion, transport, storage, and verification into one process problem.",
    water: "Water systems are separations and quality-control systems shaped by climate, fouling, and energy cost.",
    materials: "Materials scale when useful properties can be made repeatably across area, volume, interfaces, and service life.",
    manufacturing: "Manufacturing futures are process-window, metrology, throughput, and cost-of-quality problems.",
    cities: "Urban technologies must survive buildings, fleets, utilities, regulations, maintenance, and users.",
    space: "Space systems close mass, energy, thermal, reliability, and maintenance loops under launch constraints."
  }[sectorId] || "A process sector in the atlas.";
}
