/* ────────────────────────────────────────────────────────────
   Sections: Hero, Nav, CaseStudies, SystemMap, ChemicalSpine,
   UnitOps, Readiness, Pathways, Evidence, AuthorNote, Footer
   ──────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef, useMemo } = React;

/* ── Definitions used in tooltips + field guide ───────────── */
const DEFS = {
  pfd:           ["Process Flow Diagram",        "A schematic of how matter and energy move through a process — inputs in, transformations across, outputs out."],
  trl:           ["Technology Readiness Level",  "NASA scale 1–9. 1 = idea on paper. 9 = full system, operating in its real environment. Asks: does it work?"],
  mrl:           ["Manufacturing Readiness Level","Scale 1–9. Asks: can we make it repeatedly at the right yield, quality, cost, and throughput?"],
  irl:           ["Infrastructure Readiness Level","Scale 1–9. Asks: can it integrate? Do utilities, logistics, standards, maintenance, and users support it?"],
  "unit-op":     ["Unit operation",              "A single discrete physical step in a process — distillation, electrolysis, filtration, deposition, heat exchange, etc."],
  bottleneck:    ["Bottleneck",                  "The constraint most likely to block scale-up — energy intensity, dilute separations, supply chain, reliability, cost."],
  spine:         ["Chemical spine",              "The handful of molecules (H₂, CO₂, NH₃, Si, Li, H₂O…) that recur across many futures. Master them and many sectors come along."],
  evidence:      ["Evidence posture",            "Direct = peer-reviewed pilots or operating systems. Roadmap = program targets or lab demos. Analogue = sourced from adjacent industries."],
  "scale-trigger":["Scale trigger",              "The specific change (cost target, catalyst, secured supply, standard) that flips a technology from 'pilot' to 'deployable'."],
  foak:          ["First-of-a-Kind",             "The first full-scale plant. Often where promising technologies die: pilot worked, but capital risk and integration kill it."],
  sector:        ["Sector",                      "One of seven domains in the atlas: Energy, Carbon, Water, Materials, Manufacturing, Cities, Space."],
};

function DefineTerm({ term, children }) {
  const d = DEFS[term];
  return (
    <span className="define" tabIndex={0}>
      <span className="define-text">{children}</span>
      <span className="define-marker" aria-hidden>ⓘ</span>
      {d && (
        <span className="define-tip" role="tooltip">
          <span className="dt-head">{d[0]}</span>
          <span className="dt-body">{d[1]}</span>
        </span>
      )}
    </span>
  );
}

/* ── Field Guide — strip of definitions for non-specialists ─ */
function FieldGuide() {
  const items = [
    { term: "pfd",        glyph: "▦", lead: "PFD", body: "Process flow diagram — a map of how matter and energy move through a process. Inputs come in, operations transform them, outputs come out. An engineer's recipe." },
    { term: "unit-op",    glyph: "◍", lead: "Unit op", body: "One discrete physical step — distilling, electrolyzing, filtering, coating. Every process is a chain of unit ops, like Lego bricks of chemical engineering." },
    { term: "spine",      glyph: "⬡", lead: "Spine", body: "The handful of molecules every future depends on: H₂, CO₂, NH₃, Si, Li, H₂O. Master these and many seemingly distant fields unlock at once." },
    { term: "trl",        glyph: "T",  lead: "TRL · 1–9", body: "Technology Readiness Level. NASA's 1–9 scale: 1 = sketch on paper, 9 = working in the real world. Asks: does the underlying mechanism work yet?" },
    { term: "mrl",        glyph: "M",  lead: "MRL · 1–9", body: "Manufacturing Readiness Level. Asks whether we can make the thing not once in a lab but a million times — at the right yield, quality, cost, and pace." },
    { term: "irl",        glyph: "I",  lead: "IRL · 1–9", body: "Infrastructure Readiness Level. Asks whether the world around the tech is ready: supply chains, utilities, standards, regulators, technicians, and users." },
    { term: "bottleneck", glyph: "◐", lead: "Bottleneck", body: "What actually blocks scale-up. Usually not the core invention but adjacent constraints — energy supply, separations, raw materials, capital, permitting." },
    { term: "evidence",   glyph: "✓",  lead: "Evidence", body: "How we know what we claim. Direct = demonstrated already. Roadmap = a credible plan exists. Analogue = inferred from a related working system." },
  ];
  return (
    <section id="guide" className="section section-guide">
      <div className="frame">
        <SectionHead
          code="FSA · field guide"
          kicker="Read this first"
          title="How to read the atlas."
          lede="A small glossary. Every card in the galaxy gets decomposed using these terms; hover any term elsewhere on the page for a definition."
        />
        <div className="guide">
          <div className="guide-grid">
            {items.map(it => (
              <div key={it.term} className="guide-card">
                <div className="guide-glyph">{it.glyph}</div>
                <div className="guide-lead">{it.lead}</div>
                <div className="guide-body">{it.body}</div>
              </div>
            ))}
          </div>
          <div className="guide-foot">
            <span className="meta">▼ Reader protocol</span>
            <ol className="guide-protocol">
              <li>Start with the imagined capability.</li>
              <li>Identify the material and energy inputs.</li>
              <li>Map the unit operations that turn inputs into outputs.</li>
              <li>Locate the bottleneck: energy, separations, yield, reliability, or infrastructure.</li>
              <li>Ask what must become repeatable, measurable, and economical.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Nav ──────────────────────────────────────────────────── */
function Nav() {
  const [coord, setCoord] = useState("47.6N 122.3W");
  useEffect(() => {
    let i = 0;
    const tick = () => {
      i++;
      const lat = (47 + Math.sin(i / 30) * 0.4).toFixed(2);
      const lon = (122 + Math.cos(i / 25) * 0.3).toFixed(2);
      setCoord(`${lat}°N  ${lon}°W`);
    };
    const id = setInterval(tick, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-brand" href="#top">
          <span className="mark">FS</span>
          <span className="nav-brand-label">
            <span className="l1">Future Systems Atlas</span>
            <span className="l2">FSA-001 · interactive process map</span>
          </span>
        </a>
        <div className="nav-links command-links">
          {[
            ["#top",       "Map"],
            ["#guide",     "Guide"],
            ["#cases",     "Cases"],
            ["#atlas",     "Index"],
            ["#sources",   "Sources"],
          ].map(([href, label], i) => (
            <React.Fragment key={href}>
              {i > 0 && <span className="nav-sep" aria-hidden="true">·</span>}
              <a href={href}>
                <span className="nav-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="nav-label">{label}</span>
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <header id="top" className="hero">
      <div className="frame">
        <div className="hero-meta">
          <span>FSA · 001</span>
          <span className="sep">▣</span>
          <span>Rev 2026.05</span>
          <span className="sep">▣</span>
          <span>Sheet 01 / 12</span>
          <span className="sep">▣</span>
          <span>Scale 1 : 1</span>
          <span className="sep">▣</span>
          <span>N. Anderson · ChBE</span>
        </div>
        <div className="hero-kicker">Future Systems Atlas</div>
        <h1>
          A process-flow map of the technologies<br />
          people call <span className="glyph">&ldquo;the future.&rdquo;</span>
        </h1>
        <p className="lede">
          Flying cars, fusion plants, smart buildings, vertical farms, artificial organs,
          and space habitats only become real when materials, energy, manufacturing,
          quality control, infrastructure, and supply chains can support them.
        </p>
        <p className="hero-byline">
          I built this atlas to translate futuristic technologies into the processes
          and systems that would have to exist underneath them.
        </p>

        <div className="hero-actions">
          <a className="btn primary" href="#atlas">Browse the atlas <span className="arrow">→</span></a>
          <a className="btn" href="#cases">View cases <span className="arrow">→</span></a>
          <a className="btn" href="#sources">Evidence layer <span className="arrow">→</span></a>
        </div>
      </div>
    </header>
  );
}

/* ── Section header (left rail) ───────────────────────────── */
function SectionHead({ code, kicker, title, lede }) {
  return (
    <aside className="section-stamp">
      <div className="code">{code}</div>
      {kicker && <div className="kicker">{kicker}</div>}
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </aside>
  );
}

/* ── Featured case studies (PFD cards) ────────────────────── */
function CaseStudies() {
  const cases = window.FSA.FEATURED;
  const [active, setActive] = useState(0);
  const cur = cases[active];
  return (
    <section id="cases" className="section">
      <div className="frame">
        <SectionHead
          code="FSA-002 · Start here"
          kicker="Featured PFDs"
          title="Three case studies in process architecture."
          lede="Each visible product is rendered as a process-flow diagram: feedstocks in, unit operations across, the bottleneck called out, and the trigger that unlocks scale."
        />
        <div className="cases-stage">
          <div className="cases-tabs">
            {cases.map((c, i) => (
              <button
                key={c.pid}
                className={`cases-tab ${i === active ? "active" : ""}`}
                onClick={() => setActive(i)}
                data-sector={c.sector}
              >
                <span className="t-pid">{c.pid}</span>
                <span className="t-name">{c.name}</span>
                <span className="t-sector">{c.sector}</span>
              </button>
            ))}
          </div>
          <CasePFD cse={cur} />
        </div>
      </div>
    </section>
  );
}

function CasePFD({ cse }) {
  return (
    <div className="pfd case-pfd" data-sector={cse.sector}>
      <div className="pfd-head">
        <div>
          <div className="pid">{cse.pid}</div>
          <div className="pfd-title">{cse.name}</div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <span className="chip" data-sector={cse.sector}><span className="dot" />{cse.sector}</span>
          <span className="chip">Process · sheet 01</span>
        </div>
      </div>

      <div className="pfd-flow">
        <div className="pfd-rail in">
          <div className="rail-label">Inputs</div>
          {cse.inputs.map((inp, i) => (
            <div key={i} className="rail-node">
              <span className="rn-tag">{inp.split("  ")[0]}</span>
              <span className="rn-name">{inp.split("  ")[1]}</span>
            </div>
          ))}
        </div>

        <div className="pfd-blocks">
          {cse.steps.map(([code, name], i) => (
            <div key={code} className="pfd-block" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="pfd-block-code">{code}</span>
              <span className="pfd-block-name">{name}</span>
              {i < cse.steps.length - 1 && <span className="pfd-arrow" />}
            </div>
          ))}
        </div>

        <div className="pfd-rail out">
          <div className="rail-label">Output</div>
          <div className="rail-node">
            <span className="rn-tag">{cse.output.split("  ")[0]}</span>
            <span className="rn-name">{cse.output.split("  ")[1]}</span>
          </div>
        </div>
      </div>

      <div className="pfd-foot">
        <div className="pfd-foot-cell">
          <div className="meta">Bottleneck</div>
          <div className="pfd-foot-val" style={{ color: `var(--c-${cse.sector})` }}>{cse.bottleneck}</div>
        </div>
        <div className="pfd-foot-cell">
          <div className="meta">Scale trigger</div>
          <div className="pfd-foot-val">{cse.trigger}</div>
        </div>
        <div className="pfd-foot-cell">
          <div className="meta">Readiness gap</div>
          <div className="pfd-foot-val">{cse.readiness}</div>
        </div>
      </div>
    </div>
  );
}

/* ── System Map (deployment stack) ────────────────────────── */
function SystemMap() {
  const stack = window.FSA.STACK;
  const [layer, setLayer] = useState(2); // default Unit ops
  const cur = stack[layer];
  return (
    <section id="system" className="section">
      <div className="frame">
        <SectionHead
          code="FSA-005 · Master system diagram"
          kicker="Deployment stack"
          title="Six layers separate the visible product from what must be built."
          lede="Click a layer to see the feedstocks, transformations, and infrastructure that must compose at each tier before the deployable system can leave the slide deck."
        />
        <div className="stack">
          <div className="stack-rows">
            {stack.map((s, i) => (
              <button
                key={s.id}
                className={`stack-row ${i === layer ? "active" : ""}`}
                onClick={() => setLayer(i)}
              >
                <div className="stack-row-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="stack-row-body">
                  <div className="stack-row-title">{s.label}</div>
                  <div className="stack-row-sub">{s.sub}</div>
                </div>
                <div className="stack-row-tick">{i === layer ? "◉" : "○"}</div>
              </button>
            ))}
            <div className="stack-flow-arrow" aria-hidden>
              <div className="stack-flow-line" />
              <div className="stack-flow-tip">▼</div>
            </div>
          </div>

          <div className="stack-detail">
            <div className="stack-detail-head">
              <div className="meta">Layer {String(layer + 1).padStart(2, "0")} / 06</div>
              <div className="stack-detail-title">{cur.label}</div>
              <div className="stack-detail-sub">{cur.sub}</div>
            </div>
            <div className="stack-detail-grid">
              {cur.nodes.map((n, i) => (
                <div key={n} className="stack-node" style={{ animationDelay: `${i * 0.05}s` }}>
                  <span className="node-bullet" />
                  <span>{n}</span>
                </div>
              ))}
            </div>
            <div className="stack-detail-foot">
              <div className="meta">Every card in the atlas crosses all six layers.</div>
              <div className="stack-rules">
                <span>VISIBLE PRODUCT</span>
                <span className="arrow-glyph">→</span>
                <span className="strong">HIDDEN PROCESS SYSTEM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Chemical Spine (periodic-grade tiles) ────────────────── */
function ChemicalSpine() {
  const chems = window.FSA.CHEMICALS;
  const [hover, setHover] = useState(null);
  const cur = hover != null ? chems[hover] : null;
  const goToGalaxy = (sym) => {
    window.dispatchEvent(new CustomEvent("fsa:focus-chemical", { detail: sym }));
  };
  return (
    <section id="chemicals" className="section">
      <div className="frame">
        <SectionHead
          code="FSA-006 · Chemical spine"
          kicker="Recurring molecules"
          title="The atoms and molecules every future depends on."
          lede={<>Most technologies reduce to recurring chemical-engineering constraints — hydrogen handling, CO₂ conversion, lithium supply, water purification. <strong>Click a tile to trace it across the galaxy.</strong></>}
        />
        <div className="spine-stage">
          <div className="spine-grid">
            {chems.map((c, i) => (
              <button
                key={c.sym}
                className="spine-tile"
                data-color={c.color}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => goToGalaxy(c.sym)}
              >
                <div className="spine-num">{c.num}</div>
                <div className="spine-sym">{c.sym}</div>
                <div className="spine-name">{c.name}</div>
                <div className="spine-group">{c.group}</div>
                <span className="spine-action">trace in map →</span>
              </button>
            ))}
          </div>
          <div className="spine-readout">
            <div className="meta">Hover to read · click to highlight on the galaxy map.</div>
            {cur ? (
              <div className="spine-card" data-color={cur.color}>
                <div className="spine-card-num">{cur.num}</div>
                <div className="spine-card-sym">{cur.sym}</div>
                <div className="spine-card-name">{cur.name}</div>
                <div className="spine-card-group">{cur.group}</div>
                <ul className="spine-card-uses">
                  {cur.uses.map(u => <li key={u}>{u}</li>)}
                </ul>
                <button className="spine-card-action" onClick={() => goToGalaxy(cur.sym)}>
                  Trace {cur.sym} across sectors →
                </button>
              </div>
            ) : (
              <div className="spine-default">
                <div className="meta" style={{ marginBottom: 12 }}>Spine summary</div>
                <p>Hydrogen, CO₂, ammonia, silicon, lithium, copper, water, membranes, catalysts, polymers. The same constraints reappear across sectors — corrosion, purity, separations, energy.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Unit Ops · Cross-sector matrix ───────────────────────── */
function UnitOps() {
  const ops = window.FSA.UNIT_OPS;
  const sectors = window.FSA.SECTORS;
  const entries = window.FSA.ENTRIES;
  const [hoverCell, setHoverCell] = useState(null);
  const [hoverRow, setHoverRow] = useState(null);

  // Compute matrix
  const matrix = ops.map(op => {
    const cells = sectors.map(s => {
      const ents = entries.filter(e => e.unitOp === op.id && e.sector === s.id);
      return { sector: s, count: ents.length, entries: ents };
    });
    const total = cells.reduce((a, c) => a + c.count, 0);
    return { ...op, cells, total };
  });
  const maxCell = Math.max(...matrix.flatMap(r => r.cells.map(c => c.count)));

  const openSector = (sid) => {
    window.dispatchEvent(new CustomEvent("fsa:focus-sector", { detail: sid }));
  };
  const openCard = (pid) => {
    window.dispatchEvent(new CustomEvent("fsa:open-tech", { detail: pid }));
  };

  return (
    <section id="unitops" className="section">
      <div className="frame">
        <SectionHead
          code="FSA-007 · Unit operation library"
          kicker="Cross-sector lookup"
          title="Six unit operations recur across all seven sectors."
          lede={<>Every card in the atlas decomposes into a primary <DefineTerm term="unit-op">unit operation</DefineTerm>. The matrix shows where they overlap — and why fixing one operation once pays dividends across many futures. Hover a cell to see which cards live at that intersection.</>}
        />
        <div className="matrix-wrap">
          <div className="matrix" style={{ "--cols": sectors.length }}>
            {/* Header row */}
            <div className="m-corner">
              <span className="meta">unit op</span>
              <span className="m-corner-glyph">×</span>
              <span className="meta">sector</span>
            </div>
            {sectors.map(s => (
              <button key={s.id} className="m-col-head" data-sector={s.id} onClick={() => openSector(s.id)} title={`Focus ${s.label} in the galaxy`}>
                <span className="m-col-dot" />
                <span className="m-col-name">{s.label}</span>
                <span className="m-col-count">{s.count}</span>
              </button>
            ))}
            <div className="m-row-total m-head">Σ</div>

            {/* Data rows */}
            {matrix.map(row => {
              const isHoverRow = hoverRow === row.id;
              return (
                <React.Fragment key={row.id}>
                  <div className={`m-row-head ${isHoverRow ? "on" : ""}`}
                       onMouseEnter={() => setHoverRow(row.id)}
                       onMouseLeave={() => setHoverRow(null)}>
                    <div className="m-row-title">{row.label}</div>
                    <div className="m-row-fam meta">{row.family}</div>
                    <div className="m-row-ex">{row.examples}</div>
                  </div>
                  {row.cells.map(c => {
                    const isHover = hoverCell && hoverCell.op === row.id && hoverCell.sector === c.sector.id;
                    const intensity = maxCell ? c.count / maxCell : 0;
                    const size = c.count > 0 ? 22 + intensity * 26 : 4;
                    return (
                      <button
                        key={c.sector.id}
                        className={`m-cell ${isHover ? "on" : ""} ${c.count === 0 ? "zero" : ""}`}
                        data-sector={c.sector.id}
                        onMouseEnter={() => setHoverCell({ op: row.id, sector: c.sector.id })}
                        onMouseLeave={() => setHoverCell(null)}
                        onClick={() => c.count > 0 && openSector(c.sector.id)}
                        disabled={c.count === 0}>
                        <span className="m-cell-dot" style={{
                          width: `${size}px`, height: `${size}px`,
                          background: `var(--c-${c.sector.id})`,
                          opacity: c.count > 0 ? 0.18 + intensity * 0.55 : 0.18,
                        }} />
                        {c.count > 0 && <span className="m-cell-n">{c.count}</span>}
                      </button>
                    );
                  })}
                  <div className="m-row-total">{row.total}</div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Readout */}
          <div className="matrix-readout">
            <MatrixReadout
              hoverCell={hoverCell}
              hoverRow={hoverRow}
              matrix={matrix}
              sectors={sectors}
              entries={entries}
              ops={ops}
              onOpenCard={openCard}
              onOpenSector={openSector}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MatrixReadout({ hoverCell, hoverRow, matrix, sectors, entries, ops, onOpenCard, onOpenSector }) {
  // Cell-level readout
  if (hoverCell) {
    const row = matrix.find(r => r.id === hoverCell.op);
    const cell = row.cells.find(c => c.sector.id === hoverCell.sector);
    return (
      <div className="mr">
        <div className="meta">▼ intersection</div>
        <div className="mr-title">
          <span style={{ color: "var(--fg)" }}>{row.label}</span>
          <span className="mr-x">×</span>
          <span style={{ color: `var(--c-${cell.sector.id})` }}>{cell.sector.label}</span>
        </div>
        <div className="meta">{cell.count} cards · {((cell.count / row.total) * 100 || 0).toFixed(0)}% of {row.label.toLowerCase()} cards live in {cell.sector.label.toLowerCase()}</div>
        {cell.count > 0 ? (
          <ul className="mr-list">
            {cell.entries.map(e => (
              <li key={e.pid}>
                <button onClick={() => onOpenCard(e.pid)} className="mr-item">
                  <span className="mr-pid">{e.pid}</span>
                  <span className="mr-name">{e.name}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mr-empty">No atlas cards live at this intersection — the unit op is rarely primary in this sector.</p>
        )}
      </div>
    );
  }

  // Row-level readout
  if (hoverRow) {
    const row = matrix.find(r => r.id === hoverRow);
    const topSector = [...row.cells].sort((a, b) => b.count - a.count)[0];
    return (
      <div className="mr">
        <div className="meta">▼ unit operation</div>
        <div className="mr-title" style={{ color: "var(--fg)" }}>{row.label}</div>
        <div className="meta">{row.family} · {row.total} cards across {row.cells.filter(c => c.count > 0).length} sectors</div>
        <p className="mr-desc">{row.examples}</p>
        <div className="mr-section">
          <div className="meta">Most concentrated in</div>
          <button className="mr-top-sector" style={{ borderColor: `var(--c-${topSector.sector.id})`, color: `var(--c-${topSector.sector.id})` }} onClick={() => onOpenSector(topSector.sector.id)}>
            <span>{topSector.sector.label}</span>
            <span className="mr-top-n">{topSector.count} cards</span>
          </button>
        </div>
      </div>
    );
  }

  // Default — overview
  const topOp = [...matrix].sort((a, b) => b.total - a.total)[0];
  return (
    <div className="mr">
      <div className="meta">▼ field overview</div>
      <div className="mr-title" style={{ color: "var(--fg)" }}>Why this matters.</div>
      <p className="mr-desc">A solid-oxide fuel cell and a perovskite solar cell aren't obviously similar — but both run on deposition. Solving deposition tolerances pays out across both. The matrix names those shared steps. Bigger dot = more atlas cards at that intersection.</p>
      <div className="mr-section">
        <div className="meta">Most common unit op</div>
        <div className="mr-top-row">
          <span className="mr-top-name">{topOp.label}</span>
          <span className="mr-top-n">{topOp.total} cards</span>
        </div>
      </div>
      <div className="mr-section">
        <div className="meta">Tip</div>
        <p className="mr-tip">Hover a row label for the unit op definition · hover a cell for the cards · click a sector or cell to focus that planet on the galaxy map.</p>
      </div>
    </div>
  );
}

/* ── Readiness (TRL / MRL / IRL / $) ──────────────────────── */
function Readiness() {
  const levels = [
    { code: "TRL", label: "Does it work?",        desc: "Technology readiness asks whether the core mechanism or device has been demonstrated.",            tone: "energy"        },
    { code: "MRL", label: "Can we make it?",       desc: "Manufacturing readiness asks whether the process can meet yield, quality, cost, and throughput.",   tone: "manufacturing" },
    { code: "IRL", label: "Can it integrate?",     desc: "Infrastructure readiness asks whether utilities, logistics, standards, maintenance, and users align.", tone: "cities"      },
    { code: "$",   label: "Do the economics hold?", desc: "Economics asks whether the full system competes when capital, energy, labor, reliability, and utilization are counted.", tone: "materials" },
  ];

  // Compute average TRL/MRL/IRL across atlas entries
  const stats = useMemo(() => {
    const e = window.FSA.ENTRIES;
    const avg = (k) => (e.reduce((a, x) => a + x[k], 0) / e.length).toFixed(1);
    return { trl: avg("trl"), mrl: avg("mrl"), irl: avg("irl") };
  }, []);

  return (
    <section id="readiness" className="section">
      <div className="frame">
        <SectionHead
          code="FSA-008 · Readiness gates"
          kicker="Bottleneck taxonomy"
          title="Most future systems are blocked by MRL, IRL, and process economics — not TRL."
          lede="The atlas separates 'does it work' from 'can we make it repeatedly' and 'can it integrate' — three distinct mountains, almost always climbed in that order."
        />
        <div className="ready">
          <div className="ready-grid">
            {levels.map((l, i) => (
              <div key={l.code} className="ready-card" data-tone={l.tone}>
                <div className="ready-code">{l.code}</div>
                <div className="ready-q">{l.label}</div>
                <div className="ready-desc">{l.desc}</div>
                <div className="ready-bar">
                  <div className="ready-bar-track">
                    {[...Array(10)].map((_, k) => (
                      <span key={k} className={`tick ${k < (i === 0 ? 7 : i === 1 ? 4 : i === 2 ? 3 : 2) ? "on" : ""}`} />
                    ))}
                  </div>
                  <div className="ready-bar-label">
                    {i === 0 && `Atlas avg ${stats.trl} / 9`}
                    {i === 1 && `Atlas avg ${stats.mrl} / 9`}
                    {i === 2 && `Atlas avg ${stats.irl} / 9`}
                    {i === 3 && `Pilot → commercial`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="ready-bottlenecks">
            <div className="meta" style={{ marginBottom: 14 }}>Bottleneck taxonomy</div>
            <div className="bn-grid">
              {window.FSA.BOTTLENECKS.map(b => (
                <div key={b.id} className="bn-tile">
                  <span className="bn-fam">{b.family}</span>
                  <span className="bn-label">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Scale-up Corridor (replaces the 11-bars list) ────────── */
function Pathways() {
  const STAGES = [
    {
      id: "concept", label: "Concept",
      gates: ["TRL 1–3"], dip: 0.15,
      ask: "Does the physics work?",
      desc: "Mechanism on paper, simulated, or shown in a lab notebook.",
      kills: "Hand-wavy thermodynamics. Wrong physics.",
      moves: ["Increase yield per pass", "Tighten process windows"],
    },
    {
      id: "lab", label: "Lab demo",
      gates: ["TRL 4–5"], dip: 0.30,
      ask: "Does the device work?",
      desc: "Bench unit produces the intended output, controlled environment.",
      kills: "Selectivity, yield, side-reactions.",
      moves: ["Improve reliability cycling", "Substitute supply-constrained inputs"],
    },
    {
      id: "pilot", label: "Pilot",
      gates: ["TRL 6", "MRL 3–4"], dip: 0.45,
      ask: "Can it run for hours?",
      desc: "Continuous operation at a meaningful fraction of full scale.",
      kills: "Fouling. Heat integration. Operator hours.",
      moves: ["Close recycle loops", "Standardize interfaces"],
    },
    {
      id: "foak", label: "First-of-a-Kind",
      gates: ["TRL 7–8", "MRL 5–6", "IRL 4–5"], dip: 0.85, valley: true,
      ask: "Can it be built once at full scale?",
      desc: "One commercial-scale plant. Capital risk peaks. Permitting starts.",
      kills: "FOAK capex. Permits. Construction overruns. Customer terms.",
      moves: ["Cut capital intensity", "Modularize for replication"],
    },
    {
      id: "commercial", label: "Commercial",
      gates: ["TRL 9", "MRL 7–8", "IRL 6–7"], dip: 0.55,
      ask: "Is unit cost competitive?",
      desc: "Replicated builds, learning rates kicking in, financeable.",
      kills: "Energy cost. Reliability across the fleet.",
      moves: ["Reduce energy intensity", "Drive cost-of-quality down"],
    },
    {
      id: "atscale", label: "At scale",
      gates: ["MRL 9", "IRL 8–9"], dip: 0.25,
      ask: "Can the world support thousands?",
      desc: "Industry standard. Supply chains, codes, workforce all aligned.",
      kills: "Inputs become the new bottleneck.",
      moves: ["Co-locate utilities & feedstocks"],
    },
  ];

  const [active, setActive] = useState("foak");
  const cur = STAGES.find(s => s.id === active);

  // SVG layout for the curve
  const W = 1200, H = 220;
  const PAD = 40;
  const innerW = W - PAD * 2;
  const xAt = (i) => PAD + (i / (STAGES.length - 1)) * innerW;
  const yAt = (dip) => 30 + dip * (H - 60);

  const pathD = STAGES.map((s, i) => {
    const x = xAt(i);
    const y = yAt(s.dip);
    if (i === 0) return `M ${x} ${y}`;
    const prev = STAGES[i - 1];
    const px = xAt(i - 1);
    const py = yAt(prev.dip);
    const cx1 = px + (x - px) * 0.5;
    const cx2 = px + (x - px) * 0.5;
    return ` C ${cx1} ${py}, ${cx2} ${y}, ${x} ${y}`;
  }).join("");

  return (
    <section id="pathways" className="section">
      <div className="frame">
        <SectionHead
          code="FSA-009 · Scale-up corridor"
          kicker="The six gates"
          title="The corridor between a working prototype and a deployed system."
          lede="Most frontier technologies die between Pilot and First-of-a-Kind — the famous Valley of Death. The corridor traces the risk profile and names the engineering move that gets you across each gate."
        />
        <div className="corridor">
          <div className="corridor-curve">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="curve-svg">
              <defs>
                <linearGradient id="curveGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%"   stopColor="var(--c-manufacturing)" />
                  <stop offset="55%"  stopColor="var(--c-cities)" />
                  <stop offset="100%" stopColor="var(--c-water)" />
                </linearGradient>
                <linearGradient id="curveFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%"   stopColor="var(--c-cities)" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="var(--c-cities)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0.2, 0.5, 0.8].map(g => (
                <line key={g} x1={PAD} x2={W - PAD} y1={30 + g * (H - 60)} y2={30 + g * (H - 60)}
                  stroke="var(--rule-faint)" strokeDasharray="2 4" />
              ))}
              {/* Axis labels */}
              <text x={PAD - 6} y={36} textAnchor="end" className="curve-axis">low risk</text>
              <text x={PAD - 6} y={H - 24} textAnchor="end" className="curve-axis">high risk</text>
              {/* Filled curve */}
              <path d={`${pathD} L ${xAt(STAGES.length - 1)} ${H - 20} L ${PAD} ${H - 20} Z`} fill="url(#curveFill)" />
              <path d={pathD} fill="none" stroke="url(#curveGrad)" strokeWidth="2" />
              {/* Valley of Death band */}
              {STAGES.map((s, i) => {
                if (!s.valley) return null;
                const x = xAt(i);
                return (
                  <g key={s.id}>
                    <rect x={x - 36} y={20} width={72} height={H - 40}
                      fill="var(--c-cities)" fillOpacity="0.08" />
                    <text x={x} y={20} textAnchor="middle" className="valley-label">VALLEY OF DEATH</text>
                  </g>
                );
              })}
              {/* Station markers */}
              {STAGES.map((s, i) => {
                const x = xAt(i);
                const y = yAt(s.dip);
                const isActive = s.id === active;
                return (
                  <g key={s.id}
                    onClick={() => setActive(s.id)}
                    onMouseEnter={() => setActive(s.id)}
                    style={{ cursor: "pointer" }}>
                    <line x1={x} y1={y} x2={x} y2={H - 20} stroke={isActive ? "var(--fg)" : "var(--rule)"} strokeWidth={isActive ? 1 : 0.7} />
                    <circle cx={x} cy={y} r={isActive ? 8 : 5}
                      fill="var(--bg)" stroke={isActive ? "var(--fg)" : "var(--fg-muted)"} strokeWidth="1.5" />
                    {isActive && <circle cx={x} cy={y} r="2.5" fill="var(--fg)" />}
                    <text x={x} y={H - 6} textAnchor="middle" className={`curve-stage ${isActive ? "on" : ""}`}>
                      {String(i + 1).padStart(2, "0")} · {s.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="corridor-stages">
            {STAGES.map((s, i) => (
              <button
                key={s.id}
                className={`corridor-stage ${active === s.id ? "active" : ""} ${s.valley ? "valley" : ""}`}
                onClick={() => setActive(s.id)}
                onMouseEnter={() => setActive(s.id)}>
                <div className="cs-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="cs-label">{s.label}</div>
                <div className="cs-gates">{s.gates.join(" · ")}</div>
              </button>
            ))}
          </div>

          <div className="corridor-detail">
            <div className="cd-head">
              <div className="meta">▼ Gate {String(STAGES.findIndex(s => s.id === cur.id) + 1).padStart(2, "0")} · {cur.label}</div>
              <div className="cd-ask">{cur.ask}</div>
            </div>
            <div className="cd-grid">
              <div className="cd-cell">
                <div className="meta">Readiness window</div>
                <div className="cd-gates">{cur.gates.map(g => <span key={g} className="chip">{g}</span>)}</div>
              </div>
              <div className="cd-cell">
                <div className="meta">What this stage is</div>
                <p>{cur.desc}</p>
              </div>
              <div className="cd-cell">
                <div className="meta">What kills tech here</div>
                <p style={{ color: "var(--c-cities)" }}>{cur.kills}</p>
              </div>
              <div className="cd-cell">
                <div className="meta">Engineering move to advance</div>
                <ul className="cd-moves">
                  {cur.moves.map(m => <li key={m}>{m}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Full pathway list preserved */}
          <div className="corridor-allmoves">
            <div className="meta" style={{ marginBottom: 10 }}>Eleven scale-up moves, sequenced and interdependent</div>
            <div className="allmoves-grid">
              {window.FSA.PATHWAYS.map((m, i) => (
                <div key={m} className="am-pill">
                  <span className="am-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="am-label">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Evidence ─────────────────────────────────────────────── */
function Evidence() {
  const postures = [
    { id: "direct",   label: "Direct",   desc: "Cards backed by demonstrated mechanisms, peer-reviewed measurements, or operating pilots.",        ex: "Operating pilots, peer-reviewed performance data, primary engineering datasheets." },
    { id: "roadmap",  label: "Roadmap",  desc: "Cards supported by program roadmaps, public targets, or early-stage demonstrations.",                ex: "Agency roadmaps, target performance specs, lab-scale demos at the right physics." },
    { id: "analogue", label: "Analogue", desc: "Cards sourced from adjacent industries or first-principles arguments — clearly marked speculative.", ex: "Analogues from petrochemicals, aerospace, marine, or older programs in similar physics." },
  ];
  return (
    <section id="sources" className="section">
      <div className="frame">
        <SectionHead
          code="FSA-012 · Evidence layer"
          kicker="Three postures · 46 sources"
          title="Every claim is tagged so speculative concepts do not read like deployed systems."
          lede="The atlas separates broad engineering reasoning from card-specific source support. Cost, timeline, and deployment claims still need primary or project-specific evidence."
        />
        <div className="evidence-stack">
          <div className="evidence-grid">
            {postures.map(p => (
              <div key={p.id} className="evidence-card" data-tone={p.id}>
                <div className="ev-head">
                  <span className="chip" data-evidence={p.id}><span className="dot" />{p.label}</span>
                  <span className="meta">{
                    p.id === "direct" ? (window.FSA.ENTRIES.filter(e => e.evidence === "direct").length + " cards") :
                    p.id === "roadmap" ? (window.FSA.ENTRIES.filter(e => e.evidence === "roadmap").length + " cards") :
                    (window.FSA.ENTRIES.filter(e => e.evidence === "analogue").length + " cards")
                  }</span>
                </div>
                <div className="ev-desc">{p.desc}</div>
                <div className="ev-ex">{p.ex}</div>
              </div>
            ))}
          </div>
          <div className="evidence-note">
            <span className="meta">Caution map</span>
            <p>Broad sources support the engineering lens; direct card sources support specific mechanisms or bottlenecks. Cost, timeline, deployment, and performance claims still need primary or current project-specific evidence. Speculative cards are intentionally marked analogue.</p>
          </div>
          <SourcesList />
        </div>
      </div>
    </section>
  );
}

/* ── Source bank list ─────────────────────────────────────── */
function SourcesList() {
  const sources = window.FSA.SOURCES;
  const sectors = window.FSA.SECTORS;
  const [q, setQ] = useState("");
  const [evFilter, setEvFilter] = useState(null);
  const [sectorFilter, setSectorFilter] = useState(null);

  const filtered = sources.filter(s => {
    if (evFilter && s.ev !== evFilter) return false;
    if (sectorFilter && s.sector !== sectorFilter) return false;
    if (q) {
      const t = q.toLowerCase();
      if (!s.title.toLowerCase().includes(t) && !s.org.toLowerCase().includes(t)) return false;
    }
    return true;
  });

  return (
    <div className="sources">
      <div className="sources-head">
        <div className="sources-title">Source bank · {sources.length} records</div>
        <div className="sources-filters">
          <div className="src-filter-group" role="group" aria-label="Filter by evidence posture">
            <span className="src-filter-label">Posture</span>
            <button className={`src-filter src-filter-ev ${!evFilter ? "on" : ""}`}
              onClick={() => setEvFilter(null)}>All</button>
            {["direct", "roadmap", "analogue"].map(ev => (
              <button key={ev} className={`src-filter src-filter-ev ${evFilter === ev ? "on" : ""}`}
                onClick={() => setEvFilter(evFilter === ev ? null : ev)} data-ev={ev}>{ev}</button>
            ))}
          </div>
          <div className="src-filter-divider" aria-hidden="true"></div>
          <div className="src-filter-group" role="group" aria-label="Filter by sector">
            <span className="src-filter-label">Sector</span>
            <button className={`src-filter src-filter-sector ${!sectorFilter ? "on" : ""}`}
              onClick={() => setSectorFilter(null)}>All</button>
            {sectors.map(s => (
              <button key={s.id} className={`src-filter src-filter-sector ${sectorFilter === s.id ? "on" : ""}`}
                onClick={() => setSectorFilter(sectorFilter === s.id ? null : s.id)}>{s.label}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="atlas-search" style={{ marginBottom: 12 }}>
        <span className="atlas-search-icon">⌕</span>
        <input type="text" placeholder="Search the source bank…"
          value={q} onChange={e => setQ(e.target.value)} />
        {q && <button className="atlas-search-clear" onClick={() => setQ("")}>×</button>}
      </div>
      <div className="sources-list">
        {filtered.map(s => (
          <div key={s.id} className="source-row">
            <span className="source-year">{s.id} · {s.year}</span>
            <span className="source-title">{s.title}</span>
            <span className="source-org">{s.org}</span>
            <span className="source-tags">
              <span className="chip" data-sector={s.sector}><span className="dot" />{s.sector}</span>
            </span>
            <span className="source-posture" data-ev={s.ev}>{s.ev}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="atlas-empty">No sources match this filter.</div>
        )}
      </div>
      <div className="sources-count">
        Showing {filtered.length} / {sources.length} records · evidence tag indicates how strongly each citation supports its claims.
      </div>
    </div>
  );
}

/* ── Author note ──────────────────────────────────────────── */
function AuthorNote() {
  return (
    <section id="author" className="section section-author">
      <div className="frame">
        <SectionHead
          code="FSA-011 · Author note"
          kicker="Process-engineering lens"
          title="Built to show how I decompose frontier technologies into process systems."
        />
        <div className="author-body">
          <p>
            I built Future Systems Atlas as a Chemical & Biomolecular Engineering
            student interested in the gap between frontier invention and real-world
            deployment.
          </p>
          <p>
            The project reflects the way I want to think as a process engineer: not
            just asking whether a technology is possible, but what has to become
            <em> repeatable, manufacturable, safe, affordable, and integrated</em>
            before it can change the built world.
          </p>
          <div className="author-sign">
            <div className="author-rule" />
            <div>
              <div className="author-name">N. Anderson</div>
              <div className="meta">Chemical &amp; Biomolecular Engineering</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h3>Future Systems Atlas</h3>
          <p className="desc">A process-engineering atlas for frontier technologies, manufacturability constraints, and deployment pathways.</p>
          <p className="footer-meta" style={{ marginTop: 24 }}>The future is not just invented. It is scaled.</p>
        </div>
        <div className="footer-links">
          <div className="meta" style={{ marginBottom: 4 }}>Navigation</div>
          <a href="#system">System map</a>
          <a href="#chemicals">Chemicals</a>
          <a href="#unitops">Unit ops</a>
          <a href="#readiness">Readiness</a>
          <a href="#atlas">Atlas index</a>
          <a href="#sources">Sources</a>
        </div>
        <div className="footer-links">
          <div className="meta" style={{ marginBottom: 4 }}>Sheet</div>
          <a>FSA-012 · Rev 2026.05</a>
          <a>Last updated · May 2026</a>
          <a>Built by Nathan Anderson</a>
          <a>Independent engineering artifact</a>
        </div>
      </div>
      <div className="footer-stamp">
        <span>Sheet stamp · FSA-012</span>
        <span>115 cards · 201 sources · 37 ops · 32 chem · 24 bottlenecks · 3 postures</span>
        <span>© N. Anderson 2026</span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, SectionHead, CaseStudies, CasePFD,
  SystemMap, ChemicalSpine, UnitOps, Readiness,
  Pathways, Evidence, AuthorNote, Footer,
  FieldGuide, DefineTerm, DEFS
});
