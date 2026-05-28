import { useMemo, useState } from "react";
import { SECTORS, SOURCES } from "../data/atlasData.js";
import { EVIDENCE_POSTURES, SOURCE_TOTAL, sourceStats } from "../data/sourcesData.js";
import { sectorById } from "../data/atlasHelpers.js";

export default function SourcesPage() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("");
  const [evidence, setEvidence] = useState("");

  const stats = useMemo(() => sourceStats(), []);
  const filtered = useMemo(() => SOURCES.filter((source) => {
    if (sector && source.sector !== sector) return false;
    if (evidence && source.ev !== evidence) return false;
    const text = [source.id, source.title, source.org, source.sector, source.ev, source.year].join(" ").toLowerCase();
    return text.includes(query.trim().toLowerCase());
  }), [evidence, query, sector]);

  return (
    <section className="page-shell sources-page" aria-labelledby="sources-title">
      <div className="page-head">
        <p className="eyebrow">Evidence layer / {SOURCE_TOTAL} sources</p>
        <h1 id="sources-title">Source Bank</h1>
        <p>
          The atlas separates broad engineering reasoning from card-specific support.
          Cost, timeline, and deployment claims still need primary, current evidence.
        </p>
      </div>

      <div className="posture-grid">
        {EVIDENCE_POSTURES.map((posture) => {
          const stat = stats.find((item) => item.id === posture.id);
          return (
            <article className="posture-card" data-evidence={posture.id} key={posture.id}>
              <h2>{posture.label}</h2>
              <p>{posture.description}</p>
              <span>{stat?.count || 0} records</span>
            </article>
          );
        })}
      </div>

      <div className="source-controls">
        <label className="search-field">
          <span>Search sources</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="IEA, NASA, perovskite, DAC" />
        </label>
        <select value={sector} onChange={(event) => setSector(event.target.value)} aria-label="Source sector filter">
          <option value="">All sectors</option>
          {SECTORS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
        <select value={evidence} onChange={(event) => setEvidence(event.target.value)} aria-label="Source evidence filter">
          <option value="">All evidence</option>
          <option value="direct">Direct</option>
          <option value="roadmap">Roadmap</option>
          <option value="analogue">Analogue</option>
        </select>
      </div>

      <div className="results-bar">
        <span>Showing {filtered.length} / {SOURCE_TOTAL} source records</span>
      </div>

      <div className="source-list">
        {filtered.map((source) => (
          <article className="source-row" data-evidence={source.ev} key={source.id}>
            <span>{source.id} / {source.year || "n.d."}</span>
            <strong>{source.title}</strong>
            <em>{source.org}</em>
            <span>{sectorById[source.sector]?.label} / {source.ev}</span>
          </article>
        ))}
        {filtered.length === 0 && <div className="empty-state"><h2>No sources match this filter.</h2></div>}
      </div>
    </section>
  );
}
