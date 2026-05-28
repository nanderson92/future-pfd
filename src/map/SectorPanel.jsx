import { bottleneckById, chemicalBySym, readinessAverage, sectorById, unitOpById } from "../data/atlasHelpers.js";

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
    </aside>
  );
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
