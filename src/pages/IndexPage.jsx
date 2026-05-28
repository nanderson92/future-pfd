import { useEffect, useMemo, useState } from "react";
import { BOTTLENECKS, CHEMICALS, ENTRIES, SECTORS, UNIT_OPS } from "../data/atlasData.js";
import { bottleneckById, chemicalBySym, labelForReadinessBand, matchesEntry, readinessBand, sectorById, unitOpById } from "../data/atlasHelpers.js";
import ReadinessMeter from "../components/ReadinessMeter.jsx";
import TechnologyModal from "../map/TechnologyModal.jsx";

export default function IndexPage({ initialTech, initialQuery, initialSector }) {
  const [query, setQuery] = useState(initialQuery || "");
  const [sector, setSector] = useState(initialSector || "");
  const [chemical, setChemical] = useState("");
  const [unitOp, setUnitOp] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [evidence, setEvidence] = useState("");
  const [readiness, setReadiness] = useState("");
  const [view, setView] = useState("cards");
  const [openEntry, setOpenEntry] = useState(null);

  useEffect(() => {
    const entry = ENTRIES.find((item) => item.pid === initialTech);
    if (entry) setOpenEntry(entry);
  }, [initialTech]);

  useEffect(() => {
    if (initialSector) setSector(initialSector);
  }, [initialSector]);

  const filtered = useMemo(() => ENTRIES.filter((entry) => {
    if (sector && entry.sector !== sector) return false;
    if (chemical && entry.chemical !== chemical) return false;
    if (unitOp && entry.unitOp !== unitOp) return false;
    if (bottleneck && entry.bottleneck !== bottleneck) return false;
    if (evidence && entry.evidence !== evidence) return false;
    if (readiness && readinessBand(entry) !== readiness) return false;
    return matchesEntry(entry, query);
  }), [bottleneck, chemical, evidence, query, readiness, sector, unitOp]);

  const reset = () => {
    setQuery("");
    setSector("");
    setChemical("");
    setUnitOp("");
    setBottleneck("");
    setEvidence("");
    setReadiness("");
  };

  return (
    <section className="page-shell index-page" aria-labelledby="index-title">
      <div className="page-head">
        <p className="eyebrow">Faceted process-card index</p>
        <h1 id="index-title">Atlas Index</h1>
        <p>Search and filter the 115-card database beneath the map.</p>
      </div>

      <div className="index-controls">
        <label className="search-field">
          <span>Search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="fusion, DAC, lithium, water" />
        </label>
        <div className="view-toggle" aria-label="Result view">
          <button type="button" className={view === "cards" ? "active" : ""} onClick={() => setView("cards")}>Cards</button>
          <button type="button" className={view === "table" ? "active" : ""} onClick={() => setView("table")}>Table</button>
        </div>
      </div>

      <div className="filter-grid">
        <select value={sector} onChange={(event) => setSector(event.target.value)} aria-label="Sector filter">
          <option value="">All sectors</option>
          {SECTORS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
        <select value={chemical} onChange={(event) => setChemical(event.target.value)} aria-label="Chemical or material filter">
          <option value="">All chemicals/materials</option>
          {CHEMICALS.map((item) => <option key={item.sym} value={item.sym}>{item.sym} / {item.name}</option>)}
        </select>
        <select value={unitOp} onChange={(event) => setUnitOp(event.target.value)} aria-label="Unit operation filter">
          <option value="">All unit operations</option>
          {UNIT_OPS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
        <select value={bottleneck} onChange={(event) => setBottleneck(event.target.value)} aria-label="Bottleneck filter">
          <option value="">All bottlenecks</option>
          {BOTTLENECKS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
        <select value={evidence} onChange={(event) => setEvidence(event.target.value)} aria-label="Evidence filter">
          <option value="">All evidence</option>
          <option value="direct">Direct</option>
          <option value="roadmap">Roadmap</option>
          <option value="analogue">Analogue</option>
        </select>
        <select value={readiness} onChange={(event) => setReadiness(event.target.value)} aria-label="Readiness filter">
          <option value="">All readiness bands</option>
          {["concept", "development", "pilot", "deployable"].map((band) => (
            <option key={band} value={band}>{labelForReadinessBand(band)}</option>
          ))}
        </select>
      </div>

      <div className="results-bar">
        <span>{filtered.length} / {ENTRIES.length} results</span>
        <button type="button" onClick={reset}>Clear filters</button>
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h2>No matching technology cards.</h2>
          <p>Try clearing a filter or searching by sector, chemical spine, unit operation, or bottleneck.</p>
        </div>
      )}

      {view === "cards" && filtered.length > 0 && (
        <div className="index-card-grid">
          {filtered.map((entry) => (
            <button className="tech-index-card" data-sector={entry.sector} key={entry.pid} type="button" onClick={() => setOpenEntry(entry)}>
              <span className="eyebrow">{entry.pid} / {sectorById[entry.sector]?.label}</span>
              <strong>{entry.name}</strong>
              <p>{entry.description}</p>
              <span>{entry.chemical} / {unitOpById[entry.unitOp]?.label}</span>
              <span>{bottleneckById[entry.bottleneck]?.label}</span>
            </button>
          ))}
        </div>
      )}

      {view === "table" && filtered.length > 0 && (
        <div className="index-table" role="table" aria-label="Atlas technology table">
          <div className="table-row head" role="row">
            <span>PFD</span><span>Name</span><span>Sector</span><span>Spine</span><span>Operation</span><span>Bottleneck</span><span>Evidence</span><span>Readiness</span>
          </div>
          {filtered.map((entry) => (
            <button className="table-row" role="row" key={entry.pid} type="button" onClick={() => setOpenEntry(entry)}>
              <span>{entry.pid}</span>
              <span>{entry.name}</span>
              <span>{sectorById[entry.sector]?.label}</span>
              <span>{entry.chemical}</span>
              <span>{unitOpById[entry.unitOp]?.label}</span>
              <span>{bottleneckById[entry.bottleneck]?.label}</span>
              <span>{entry.evidence}</span>
              <span><ReadinessMeter entry={entry} compact /></span>
            </button>
          ))}
        </div>
      )}

      {openEntry && <TechnologyModal entry={openEntry} onClose={() => setOpenEntry(null)} />}
    </section>
  );
}
