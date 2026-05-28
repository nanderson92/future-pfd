/* ────────────────────────────────────────────────────────────
   Atlas Index — 115-card filterable browser.
   ──────────────────────────────────────────────────────────── */

function Atlas() {
  const entries = window.FSA.ENTRIES;
  const sectors = window.FSA.SECTORS;
  const bottlenecks = window.FSA.BOTTLENECKS;
  const chems = window.FSA.CHEMICALS;
  const ops = window.FSA.UNIT_OPS;

  const [q, setQ] = React.useState("");
  const [sector, setSector] = React.useState(null);
  const [bn, setBn] = React.useState(null);
  const [ev, setEv] = React.useState(null);
  const [chem, setChem] = React.useState(null);
  const [op, setOp] = React.useState(null);
  const [view, setView] = React.useState("cards"); // cards | compact
  const [open, setOpen] = React.useState(null);

  React.useEffect(() => {
    const applyFilter = (detail = {}) => {
      setSector(detail.sector || null);
      setBn(detail.bn || null);
      setEv(detail.ev || null);
      setChem(detail.chem || null);
      setOp(detail.op || null);
      setQ(detail.q || "");
      setView("cards");
    };
    const onSector = (e) => applyFilter({ sector: e.detail });
    const onFilter = (e) => applyFilter(e.detail || {});
    window.addEventListener("fsa:atlas-sector", onSector);
    window.addEventListener("fsa:atlas-filter", onFilter);
    if (window.FSA_PENDING_ATLAS_FILTER) {
      applyFilter(window.FSA_PENDING_ATLAS_FILTER);
      window.FSA_PENDING_ATLAS_FILTER = null;
    }
    return () => {
      window.removeEventListener("fsa:atlas-sector", onSector);
      window.removeEventListener("fsa:atlas-filter", onFilter);
    };
  }, []);

  const filtered = React.useMemo(() => {
    return entries.filter(e => {
      if (sector && e.sector !== sector) return false;
      if (bn && e.bottleneck !== bn) return false;
      if (ev && e.evidence !== ev) return false;
      if (chem && e.chemical !== chem) return false;
      if (op && e.unitOp !== op) return false;
      if (q) {
        const s = q.toLowerCase();
        if (!e.name.toLowerCase().includes(s) && !e.pid.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [entries, sector, bn, ev, chem, op, q]);

  const reset = () => { setQ(""); setSector(null); setBn(null); setEv(null); setChem(null); setOp(null); };
  const hasFilter = sector || bn || ev || chem || op || q;

  return (
    <section id="atlas" className="section section-atlas">
      <div className="frame">
        <SectionHead
          code="FSA-010 · Atlas index"
          kicker="115 cards"
          title="Process Architecture Index."
          lede="Filter by sector, bottleneck, evidence posture, chemical spine, or unit operation. The curated sections above explain the system; this index preserves the full terrain."
        />
        <div className="atlas">
          {/* Controls bar */}
          <div className="atlas-controls">
            <div className="atlas-search">
              <span className="atlas-search-icon">⌕</span>
              <input
                type="text"
                placeholder="Search the atlas — try 'fusion', 'DAC', 'membrane'…"
                value={q}
                onChange={e => setQ(e.target.value)}
              />
              {q && <button className="atlas-search-clear" onClick={() => setQ("")}>×</button>}
            </div>
            <div className="atlas-view">
              <button className={view === "cards" ? "on" : ""} onClick={() => setView("cards")}>⊞ Cards</button>
              <button className={view === "compact" ? "on" : ""} onClick={() => setView("compact")}>☰ Compact</button>
            </div>
          </div>

          {/* Filter row: sectors */}
          <div className="atlas-filters">
            <div className="filter-group">
              <div className="filter-label">Sector</div>
              <div className="filter-pills">
                {sectors.map(s => (
                  <button
                    key={s.id}
                    className={`pill ${sector === s.id ? "active" : ""}`}
                    data-sector={s.id}
                    onClick={() => setSector(sector === s.id ? null : s.id)}
                  >
                    <span className="pill-dot" />
                    {s.label}
                    <span className="pill-count">{s.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-label">Bottleneck</div>
              <div className="filter-pills">
                {bottlenecks.slice(0, 8).map(b => (
                  <button
                    key={b.id}
                    className={`pill ${bn === b.id ? "active" : ""}`}
                    onClick={() => setBn(bn === b.id ? null : b.id)}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-label">Evidence</div>
              <div className="filter-pills">
                {["direct", "roadmap", "analogue"].map(e => (
                  <button
                    key={e}
                    className={`pill ${ev === e ? "active" : ""}`}
                    data-evidence={e}
                    onClick={() => setEv(ev === e ? null : e)}
                  >
                    <span className="pill-dot" />
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group filter-group-2col">
              <div>
                <div className="filter-label">Chemical / material</div>
                <select value={chem || ""} onChange={e => setChem(e.target.value || null)} className="atlas-select">
                  <option value="">All chemicals</option>
                  {chems.map(c => <option key={c.sym} value={c.sym}>{c.sym} — {c.name}</option>)}
                </select>
              </div>
              <div>
                <div className="filter-label">Unit operation</div>
                <select value={op || ""} onChange={e => setOp(e.target.value || null)} className="atlas-select">
                  <option value="">All unit ops</option>
                  {ops.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Result meta */}
          <div className="atlas-meta">
            <div className="meta">
              Showing <span style={{ color: "var(--fg)" }}>{filtered.length}</span> / {entries.length} cards
            </div>
            {hasFilter && (
              <button className="atlas-reset" onClick={reset}>Reset filters ×</button>
            )}
          </div>

          {/* Results */}
          {view === "cards" ? (
            <div className="atlas-grid">
              {filtered.map(e => <AtlasCard key={e.pid} entry={e} onClick={() => setOpen(e)} />)}
              {filtered.length === 0 && <div className="atlas-empty">No cards match this filter.</div>}
            </div>
          ) : (
            <div className="atlas-table">
              <div className="atlas-row atlas-row-head">
                <span>PFD</span>
                <span>Name</span>
                <span>Sector</span>
                <span>Chem</span>
                <span>Op</span>
                <span>Bottleneck</span>
                <span>Evidence</span>
                <span>Readiness</span>
              </div>
              {filtered.map(e => (
                <div key={e.pid} className="atlas-row" onClick={() => setOpen(e)}>
                  <span className="meta">{e.pid}</span>
                  <span className="row-name">{e.name}</span>
                  <span className="chip" data-sector={e.sector}><span className="dot" />{e.sector}</span>
                  <span className="meta">{e.chemical}</span>
                  <span className="meta">{ops.find(o => o.id === e.unitOp)?.label}</span>
                  <span className="meta">{bottlenecks.find(b => b.id === e.bottleneck)?.label}</span>
                  <span className="chip" data-evidence={e.evidence}><span className="dot" />{e.evidence}</span>
                  <ReadinessMini trl={e.trl} mrl={e.mrl} irl={e.irl} tone={e.sector} />
                </div>
              ))}
              {filtered.length === 0 && <div className="atlas-empty">No cards match this filter.</div>}
            </div>
          )}
        </div>
      </div>

      {open && <AtlasModal entry={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function AtlasCard({ entry, onClick }) {
  const { pid, name, sector, chemical, bottleneck, evidence, trl, mrl, irl } = entry;
  const bnLabel = window.FSA.BOTTLENECKS.find(b => b.id === bottleneck)?.label;
  const chem = window.FSA.CHEMICALS.find(c => c.sym === chemical);
  return (
    <button className="atlas-card" data-sector={sector} onClick={onClick}>
      <div className="ac-head">
        <span className="meta">{pid}</span>
        <span className="chip" data-evidence={evidence}><span className="dot" />{evidence}</span>
      </div>
      <div className="ac-name">{name}</div>

      <div className="ac-spine">
        <div className="ac-spine-glyph" style={{ borderColor: `var(--c-${sector})`, color: `var(--c-${sector})` }}>
          <span className="ac-spine-sym">{chemical}</span>
        </div>
        <div className="ac-spine-meta">
          <div className="meta">spine</div>
          <div className="ac-spine-name">{chem?.name || chemical}</div>
        </div>
      </div>

      <div className="ac-ladder">
        <ReadinessRow label="TRL" value={trl} max={9}  tone={sector} />
        <ReadinessRow label="MRL" value={mrl} max={9} tone={sector} />
        <ReadinessRow label="IRL" value={irl} max={9}  tone={sector} />
      </div>

      <div className="ac-foot">
        <div className="meta">Bottleneck</div>
        <div className="ac-foot-val">{bnLabel}</div>
      </div>

      <span className="ac-sector-bar" style={{ background: `var(--c-${sector})` }} />
    </button>
  );
}

function ReadinessRow({ label, value, max, tone }) {
  return (
    <div className="rl-row">
      <span className="rl-label">{label}</span>
      <span className="rl-bar">
        {[...Array(max)].map((_, i) => (
          <span key={i} className={`rl-tick ${i < value ? "on" : ""}`}
            style={i < value ? { background: `var(--c-${tone})` } : null} />
        ))}
      </span>
      <span className="rl-val tnum">{value}/{max}</span>
    </div>
  );
}

function ReadinessMini({ trl, mrl, irl, tone }) {
  const rows = [
    { label: "T", v: trl, max: 9 },
    { label: "M", v: mrl, max: 9 },
    { label: "I", v: irl, max: 9 },
  ];
  return (
    <span className="rmini" title={`TRL ${trl}/9 · MRL ${mrl}/9 · IRL ${irl}/9`}>
      {rows.map(r => (
        <span key={r.label} className="rmini-row">
          <span className="rmini-lab">{r.label}</span>
          <span className="rmini-bar">
            <span className="rmini-fill" style={{ width: `${(r.v / r.max) * 100}%`, background: `var(--c-${tone})` }} />
          </span>
        </span>
      ))}
    </span>
  );
}

function AtlasModal({ entry, onClose }) {
  React.useEffect(() => {
    const k = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  const bnLabel = window.FSA.BOTTLENECKS.find(b => b.id === entry.bottleneck)?.label;
  const opLabel = window.FSA.UNIT_OPS.find(o => o.id === entry.unitOp)?.label;
  const chem = window.FSA.CHEMICALS.find(c => c.sym === entry.chemical);

  // Synthesize a plausible mini-PFD
  const steps = [
    ["B-101", "Feedstock prep"],
    ["A-201", opLabel || "Unit op"],
    ["R-301", "Transformation"],
    ["S-401", "Separation"],
    ["F-501", "Polishing"],
    ["T-601", "Output"],
  ];

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} data-sector={entry.sector}>
        <div className="modal-head">
          <div>
            <div className="meta">{entry.pid} · {entry.sector}</div>
            <div className="modal-title">{entry.name}</div>
          </div>
          <button className="modal-close" onClick={onClose}>Close ×</button>
        </div>

        <div className="modal-body">
          <div className="modal-flow">
            <div className="meta">Process flow</div>
            <div className="pfd-blocks" style={{ marginTop: 12 }}>
              {steps.map(([code, name], i) => (
                <div key={i} className="pfd-block">
                  <span className="pfd-block-code">{code}</span>
                  <span className="pfd-block-name">{name}</span>
                  {i < steps.length - 1 && <span className="pfd-arrow" />}
                </div>
              ))}
            </div>
          </div>

          <div className="modal-meta">
            <div className="mm-row">
              <span className="meta">Sector</span>
              <span className="chip" data-sector={entry.sector}><span className="dot" />{entry.sector}</span>
            </div>
            <div className="mm-row">
              <span className="meta">Chemical spine</span>
              <span><strong>{entry.chemical}</strong> · {chem?.name}</span>
            </div>
            <div className="mm-row">
              <span className="meta">Primary unit op</span>
              <span>{opLabel}</span>
            </div>
            <div className="mm-row">
              <span className="meta">Bottleneck</span>
              <span style={{ color: `var(--c-${entry.sector})` }}>{bnLabel}</span>
            </div>
            <div className="mm-row">
              <span className="meta">Scale trigger</span>
              <span>{entry.scaleTrigger}</span>
            </div>
            <div className="mm-row">
              <span className="meta">Evidence posture</span>
              <span className="chip" data-evidence={entry.evidence}><span className="dot" />{entry.evidence}</span>
            </div>
            <div className="mm-readiness-block">
              <div className="meta" style={{ marginBottom: 10 }}>Readiness</div>
              <div className="ac-ladder">
                <ReadinessRow label="TRL" value={entry.trl} max={9}  tone={entry.sector} />
                <ReadinessRow label="MRL" value={entry.mrl} max={9}  tone={entry.sector} />
                <ReadinessRow label="IRL" value={entry.irl} max={9}  tone={entry.sector} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Atlas, AtlasCard, AtlasModal, ReadinessRow, ReadinessMini });
