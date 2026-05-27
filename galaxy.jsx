/* ────────────────────────────────────────────────────────────
   Galaxy Map — the 115 cards as a navigable star chart.

   Now with:
   - Orbiting moons (CSS rotate animation, paused on hover/focus)
   - Pulsing hub (SMIL animate)
   - Ambient twinkling field
   - Readiness threshold slider
   - Evidence-posture filter chips
   - Side-panel preview on moon hover
   ──────────────────────────────────────────────────────────── */

const SECTOR_DESC = {
  energy:        "Power generation, conversion, and storage — fusion, fission, batteries, geothermal, hydrogen, wind, solar.",
  carbon:        "Removing CO₂ from the air and turning it into fuels, materials, and stable storage. The carbon spine of decarbonization.",
  water:         "Producing, purifying, and reclaiming water — desalination, atmospheric harvesting, PFAS destruction, lithium-from-brine.",
  materials:     "Engineered substrates, films, and structural matter — composites, perovskites, MOFs, graphene, solid electrolytes.",
  manufacturing: "Repeatable production of frontier hardware — additive, roll-to-roll, biofermentation, modular factories, recycling.",
  cities:        "The built environment, mobility, and urban energy — vertical farms, eVTOLs, district heat, microgrids, retrofits.",
  space:         "Launch, propulsion, ISRU, on-orbit manufacturing, habitats — the hardware of getting off-planet and staying.",
};

function GalaxyMap() {
  const sectors = window.FSA.SECTORS;
  const entries = window.FSA.ENTRIES;
  const chems = window.FSA.CHEMICALS;
  const bottlenecks = window.FSA.BOTTLENECKS;

  const [focused, setFocused] = React.useState(null);
  const [hoverTech, setHoverTech] = React.useState(null);
  const [hoverPlanet, setHoverPlanet] = React.useState(null);
  const [highlightChem, setHighlightChem] = React.useState(null);
  const [evidenceFilter, setEvidenceFilter] = React.useState(null);
  const [readinessMin, setReadinessMin] = React.useState(1);
  const [openTech, setOpenTech] = React.useState(null);

  // Listen for cross-section navigation events
  React.useEffect(() => {
    const onChem = (e) => {
      setHighlightChem(e.detail);
      setFocused(null);
      const el = document.getElementById("galaxy");
      if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
    };
    const onSector = (e) => {
      setFocused(e.detail);
      const el = document.getElementById("galaxy");
      if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
    };
    const onTech = (e) => {
      const entry = window.FSA.ENTRIES.find(x => x.pid === e.detail);
      if (entry) setOpenTech(entry);
    };
    window.addEventListener("fsa:focus-chemical", onChem);
    window.addEventListener("fsa:focus-sector", onSector);
    window.addEventListener("fsa:open-tech", onTech);
    return () => {
      window.removeEventListener("fsa:focus-chemical", onChem);
      window.removeEventListener("fsa:focus-sector", onSector);
      window.removeEventListener("fsa:open-tech", onTech);
    };
  }, []);

  // Layout space
  const W = 1400, H = 820;
  const CX = W / 2, CY = H / 2;
  const R = 280;

  const planets = React.useMemo(() => {
    return sectors.map((s, i) => {
      const angle = -Math.PI / 2 + (i / sectors.length) * Math.PI * 2;
      const x = CX + Math.cos(angle) * R;
      const y = CY + Math.sin(angle) * R * 0.86;
      const techs = entries.filter(e => e.sector === s.id);
      const radius = 30 + Math.sqrt(techs.length) * 3.4;
      const avgR = techs.reduce((a, t) => a + (t.trl + t.mrl + t.irl) / 3, 0) / techs.length;
      const innerMoons = [], outerMoons = [];

      const techsPositioned = techs.map((t, ti) => {
        // Pre-split moons by ring, so each ring has even spacing
        return t;
      });

      // First pass: bucket by ring
      const innerList = techs.filter(t => (t.trl + t.mrl + t.irl) / 3 >= 4.5);
      const outerList = techs.filter(t => (t.trl + t.mrl + t.irl) / 3 <  4.5);

      const place = (list, ring, basePhase) => list.map((t, ti) => {
        const ta = (ti / Math.max(list.length, 1)) * Math.PI * 2 + basePhase;
        const tr = radius + (ring === "inner" ? 22 : 46);
        return {
          ...t,
          lx: Math.cos(ta) * tr,
          ly: Math.sin(ta) * tr,
          tangle: ta,
          ringInner: ring === "inner",
          ready: (t.trl + t.mrl + t.irl) / 3,
        };
      });

      const phase = i * 0.62 + 0.2;
      const innerPlaced = place(innerList, "inner", phase);
      const outerPlaced = place(outerList, "outer", phase + 0.4);

      return { ...s, angle, x, y, radius, avgR, innerMoons: innerPlaced, outerMoons: outerPlaced, allTechs: [...innerPlaced, ...outerPlaced] };
    });
  }, [sectors, entries]);

  const focusedPlanet = focused ? planets.find(p => p.id === focused) : null;

  // Build chemical spine links
  const chemLinks = React.useMemo(() => {
    if (!highlightChem) return [];
    const sectorsWithChem = new Set(
      entries.filter(e => e.chemical === highlightChem).map(e => e.sector)
    );
    const ids = [...sectorsWithChem];
    const links = [];
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        links.push([ids[i], ids[j]]);
      }
    }
    return links;
  }, [highlightChem, entries]);

  const planetById = id => planets.find(p => p.id === id);

  // Twinkle field — deterministic positions
  const twinkles = React.useMemo(() => {
    const seeded = (n) => {
      const x = Math.sin(n * 9301 + 49297) * 233280;
      return x - Math.floor(x);
    };
    return Array.from({ length: 80 }, (_, i) => ({
      x: seeded(i + 1) * W,
      y: seeded(i + 200) * H,
      r: seeded(i + 400) * 0.9 + 0.3,
      dur: 2 + seeded(i + 600) * 4,
      delay: seeded(i + 800) * 4,
    }));
  }, []);

  // Filter logic for moon visibility
  const isMoonVisible = (t) => {
    if (t.ready < readinessMin) return false;
    if (evidenceFilter && t.evidence !== evidenceFilter) return false;
    if (highlightChem && t.chemical !== highlightChem) return false;
    return true;
  };

  return (
    <section id="galaxy" className="section section-galaxy section-feature">
      <div className="atlas-banner">
        <div className="atlas-banner-meta">
          <span className="atlas-banner-code">FSA-010</span>
          <span className="sep">▣</span>
          <span>Interactive map</span>
          <span className="sep">▣</span>
          <span>115 cards · 7 sectors</span>
        </div>
        <h2 className="atlas-banner-title">
          The <span className="glyph">Atlas</span>.
        </h2>
        <p className="atlas-banner-lede">
          Every technology has a planet (its sector), a position (its readiness),
          and a chemical signature. Hover, focus, and trace the spine of molecules
          that connects them.
        </p>
      </div>
      <div className="frame frame-flat">

        {/* Top filter strip */}
        <div className="galaxy-filters">
          <div className="gf-group">
            <span className="meta gf-label">Readiness floor</span>
            <input type="range" min="1" max="9" value={readinessMin}
                   onChange={e => setReadinessMin(Number(e.target.value))}
                   className="gf-slider" />
            <span className="gf-readout meta">show TRL ≥ <strong>{readinessMin}</strong></span>
          </div>
          <div className="gf-group">
            <span className="meta gf-label">Evidence posture</span>
            <div className="gf-chips">
              {["direct", "roadmap", "analogue"].map(ev => (
                <button key={ev}
                  className={`gf-chip ${evidenceFilter === ev ? "on" : ""}`}
                  data-evidence={ev}
                  onClick={() => setEvidenceFilter(evidenceFilter === ev ? null : ev)}>
                  <span className="gf-chip-dot" />
                  {ev}
                </button>
              ))}
            </div>
          </div>
          {(readinessMin > 1 || evidenceFilter || highlightChem || focused) && (
            <button className="gf-reset" onClick={() => {
              setReadinessMin(1); setEvidenceFilter(null); setHighlightChem(null); setFocused(null);
            }}>Reset all ×</button>
          )}
        </div>

        <div className="galaxy">
          <div className="galaxy-stage" data-focused={focused ? "true" : "false"}>
            <GalaxyChrome focused={focusedPlanet} />
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="galaxy-svg">
              <defs>
                {sectors.map(s => (
                  <pattern key={s.id} id={`hatch-${s.id}`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke={`var(--c-${s.id})`} strokeOpacity="0.4" strokeWidth="1"/>
                  </pattern>
                ))}
                <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"  stopColor="var(--fg)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--fg)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Twinkle starfield */}
              <g className="twinkles" aria-hidden>
                {twinkles.map((t, i) => (
                  <circle key={i} cx={t.x} cy={t.y} r={t.r} fill="var(--fg-faint)" opacity="0.3">
                    <animate attributeName="opacity"
                      values="0.08;0.45;0.08"
                      dur={`${t.dur}s`} begin={`${t.delay}s`}
                      repeatCount="indefinite" />
                  </circle>
                ))}
              </g>

              {/* Background grid rings */}
              <g className="grid-rings">
                {[120, 200, 280, 360].map(rr => (
                  <ellipse key={rr} cx={CX} cy={CY} rx={rr} ry={rr * 0.86} fill="none"
                    stroke="var(--grid-line)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.35" />
                ))}
              </g>

              {/* Chemical-spine connections */}
              {chemLinks.length > 0 && (
                <g className="chem-links">
                  {chemLinks.map(([a, b], i) => {
                    const pa = planetById(a);
                    const pb = planetById(b);
                    if (!pa || !pb) return null;
                    return (
                      <line key={i}
                        x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                        stroke="var(--c-energy)" strokeOpacity="0.45"
                        strokeWidth="1.2" strokeDasharray="3 3">
                        <animate attributeName="stroke-dashoffset"
                          from="0" to="-12" dur="1.2s" repeatCount="indefinite" />
                      </line>
                    );
                  })}
                </g>
              )}

              {/* Central hub */}
              <g className="hub"
                 onClick={() => { setFocused(null); setHighlightChem(null); }}
                 style={{ cursor: "pointer" }}>
                <circle cx={CX} cy={CY} r="80" fill="url(#hub-glow)" opacity="0.45" />
                <circle cx={CX} cy={CY} r="56" fill="none" stroke="var(--fg-faint)" strokeOpacity="0.3" strokeWidth="0.6" />
                <circle cx={CX} cy={CY} r="42" fill="none" stroke="var(--fg-faint)" strokeOpacity="0.5" strokeWidth="0.6" />
                {/* Pulsing rings */}
                <circle cx={CX} cy={CY} r="4" fill="none" stroke="var(--fg)" strokeOpacity="0.5">
                  <animate attributeName="r" values="4;38" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.55;0" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle cx={CX} cy={CY} r="4" fill="none" stroke="var(--fg)" strokeOpacity="0.4">
                  <animate attributeName="r" values="4;38" dur="3.5s" begin="1.7s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.4;0" dur="3.5s" begin="1.7s" repeatCount="indefinite" />
                </circle>
                <circle cx={CX} cy={CY} r="3.5" fill="var(--fg)" />
                <line x1={CX - 70} y1={CY} x2={CX - 56} y2={CY} stroke="var(--fg-faint)" strokeWidth="0.6" />
                <line x1={CX + 56} y1={CY} x2={CX + 70} y2={CY} stroke="var(--fg-faint)" strokeWidth="0.6" />
                <line x1={CX} y1={CY - 56} x2={CX} y2={CY - 70} stroke="var(--fg-faint)" strokeWidth="0.6" />
                <line x1={CX} y1={CY + 56} x2={CX} y2={CY + 70} stroke="var(--fg-faint)" strokeWidth="0.6" />
                <text x={CX} y={CY + 92} textAnchor="middle" className="hub-label">PROCESS · ENGINEERING · LENS</text>
                <text x={CX} y={CY + 106} textAnchor="middle" className="hub-sublabel">click to reset · 115 cards in scope</text>
              </g>

              {/* Planets */}
              {planets.map((p, i) => {
                const isFocused = focused === p.id;
                const isHover = hoverPlanet === p.id;
                const isDimmed = focused && !isFocused;
                const techHasHighlight = highlightChem ? p.allTechs.some(t => t.chemical === highlightChem) : true;
                const planetOpacity = isDimmed ? 0.22 : (techHasHighlight ? 1 : 0.4);

                return (
                  <g key={p.id}
                     className={`planet planet-${p.id}${isFocused ? " is-focused" : ""}${isHover ? " is-hovered" : ""}`}
                     style={{ opacity: planetOpacity, transition: "opacity 0.35s ease" }}
                     transform={`translate(${p.x} ${p.y})`}>

                    {/* Orbit rings (static, around 0,0) */}
                    <circle cx="0" cy="0" r={p.radius + 22} fill="none"
                      stroke={`var(--c-${p.id})`} strokeOpacity={isFocused ? 0.5 : 0.2}
                      strokeWidth="0.7" strokeDasharray="1.5 4" />
                    <circle cx="0" cy="0" r={p.radius + 46} fill="none"
                      stroke={`var(--c-${p.id})`} strokeOpacity={isFocused ? 0.4 : 0.14}
                      strokeWidth="0.7" strokeDasharray="1.5 4" />

                    {/* Planet body (clickable) */}
                    <g onClick={() => setFocused(isFocused ? null : p.id)}
                       onMouseEnter={() => setHoverPlanet(p.id)}
                       onMouseLeave={() => setHoverPlanet(null)}
                       style={{ cursor: "pointer" }}>
                      {/* Hover halo */}
                      <circle cx="0" cy="0" r={p.radius + 12}
                        fill={`var(--c-${p.id})`}
                        fillOpacity={isHover || isFocused ? 0.08 : 0} />
                      <circle cx="0" cy="0" r={p.radius + 8}
                        fill="var(--bg)" stroke={`var(--c-${p.id})`}
                        strokeOpacity={isFocused || isHover ? 0.55 : 0}
                        strokeWidth="0.6" strokeDasharray="2 3" />
                      <circle cx="0" cy="0" r={p.radius}
                        fill={`url(#hatch-${p.id})`} />
                      <circle cx="0" cy="0" r={p.radius} fill="none"
                        stroke={`var(--c-${p.id})`} strokeWidth={isFocused ? 1.8 : 1.2} />
                      <ellipse cx="0" cy="0" rx={p.radius * 0.92} ry={p.radius * 0.28}
                        fill="none" stroke={`var(--c-${p.id})`} strokeOpacity="0.45" strokeWidth="0.6" />
                      {/* Sweep arc — gives subtle motion when hovered */}
                      {(isFocused || isHover) && (
                        <circle cx="0" cy="0" r={p.radius + 4} fill="none"
                          stroke={`var(--c-${p.id})`} strokeWidth="1"
                          strokeDasharray={`${p.radius * 0.6} ${p.radius * 6}`}>
                          <animateTransform attributeName="transform" type="rotate"
                            from="0" to="360" dur="6s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {/* Reticle */}
                      {(isFocused || isHover) && (
                        <g className="planet-reticle">
                          <line x1={-p.radius - 14} y1="0" x2={-p.radius - 6} y2="0" stroke={`var(--c-${p.id})`} strokeWidth="1" />
                          <line x1={p.radius + 6} y1="0" x2={p.radius + 14} y2="0" stroke={`var(--c-${p.id})`} strokeWidth="1" />
                          <line x1="0" y1={-p.radius - 14} x2="0" y2={-p.radius - 6} stroke={`var(--c-${p.id})`} strokeWidth="1" />
                          <line x1="0" y1={p.radius + 6} x2="0" y2={p.radius + 14} stroke={`var(--c-${p.id})`} strokeWidth="1" />
                        </g>
                      )}
                    </g>

                    {/* Inner orbit group — rotates clockwise */}
                    <g className="moon-orbit moon-orbit-cw" style={{ "--dur": `${85 + i * 7}s` }}>
                      {p.innerMoons.map(t => (
                        <Moon key={t.pid} t={t} planet={p} visible={isMoonVisible(t)}
                              onHover={setHoverTech} onOpen={setOpenTech} />
                      ))}
                    </g>

                    {/* Outer orbit group — rotates counter-clockwise */}
                    <g className="moon-orbit moon-orbit-ccw" style={{ "--dur": `${115 + i * 9}s` }}>
                      {p.outerMoons.map(t => (
                        <Moon key={t.pid} t={t} planet={p} visible={isMoonVisible(t)}
                              onHover={setHoverTech} onOpen={setOpenTech} />
                      ))}
                    </g>

                    {/* Planet label (static — outside rotating groups, relative coords) */}
                    <PlanetLabel planet={p} focused={isFocused || isHover} CX={CX} CY={CY} />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Side panel */}
          <aside className="galaxy-panel">
            {focusedPlanet ? (
              <FocusReadout planet={focusedPlanet}
                            onClose={() => setFocused(null)}
                            onOpenTech={setOpenTech}
                            bottlenecks={bottlenecks} />
            ) : (
              <DefaultReadout planets={planets}
                              hoverPlanet={hoverPlanet}
                              hoverTech={hoverTech}
                              setFocused={setFocused}
                              onOpenTech={setOpenTech} />
            )}
          </aside>
        </div>

        {/* Chemical spine row */}
        <div className="galaxy-chems">
          <div className="meta gc-label">
            Chemical spine — trace a molecule across planets
          </div>
          <div className="gc-pills">
            {chems.slice(0, 10).map(c => (
              <button key={c.sym}
                className={`gc-pill ${highlightChem === c.sym ? "active" : ""}`}
                onClick={() => setHighlightChem(highlightChem === c.sym ? null : c.sym)}>
                <span className="gc-pill-sym">{c.sym}</span>
                <span className="gc-pill-name">{c.name}</span>
              </button>
            ))}
            {highlightChem && (
              <button className="gc-pill gc-reset" onClick={() => setHighlightChem(null)}>Clear ×</button>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="galaxy-legend">
          <div className="legend-group">
            <div className="meta">Moon = technology</div>
            <div className="legend-rows">
              <div className="legend-row"><span className="lg-dot lg-direct" /> Direct — peer-reviewed pilots</div>
              <div className="legend-row"><span className="lg-dot lg-roadmap" /> Roadmap — program targets</div>
              <div className="legend-row"><span className="lg-dot lg-analogue" /> Analogue — adjacent industry</div>
            </div>
          </div>
          <div className="legend-group">
            <div className="meta">Orbit = readiness</div>
            <div className="legend-rows">
              <div className="legend-row"><span className="lg-ring-inner" /> Inner — higher readiness (TRL+MRL+IRL avg ≥ 4.5)</div>
              <div className="legend-row"><span className="lg-ring-outer" /> Outer — lower readiness</div>
            </div>
          </div>
          <div className="legend-group">
            <div className="meta">How to navigate</div>
            <div className="legend-rows">
              <div className="legend-row">Click a planet → focus that sector.</div>
              <div className="legend-row">Click a moon → open the full card.</div>
              <div className="legend-row">Click the hub center → reset everything.</div>
            </div>
          </div>
        </div>
      </div>

      {openTech && <AtlasModal entry={openTech} onClose={() => setOpenTech(null)} />}
    </section>
  );
}

/* ── A single moon (rendered inside a rotating <g>) ─────── */
function Moon({ t, planet, visible, onHover, onOpen }) {
  const ev = t.evidence;
  const baseR = 3.6;
  return (
    <g className="moon"
       onMouseEnter={() => onHover(t)}
       onMouseLeave={() => onHover(null)}
       onClick={(e) => { e.stopPropagation(); onOpen(t); }}
       style={{ cursor: "pointer", opacity: visible ? 1 : 0.12, transition: "opacity 0.25s" }}>
      <line x1="0" y1="0" x2={t.lx} y2={t.ly}
        stroke={`var(--c-${planet.id})`} strokeOpacity="0.1" strokeWidth="0.5" />
      <circle cx={t.lx} cy={t.ly} r={baseR + 5} fill={`var(--c-${planet.id})`} opacity="0" className="moon-halo" />
      <circle cx={t.lx} cy={t.ly} r={baseR}
        fill={ev === "direct" ? `var(--c-${planet.id})` : "var(--bg)"}
        stroke={`var(--c-${planet.id})`}
        strokeWidth={ev === "analogue" ? 0.8 : 1.2}
        strokeDasharray={ev === "analogue" ? "1.5 1.5" : null} />
    </g>
  );
}

function PlanetLabel({ planet, focused, CX, CY }) {
  // Compute outward direction in absolute coords, then offset locally
  const dx = planet.x - CX;
  const dy = planet.y - CY;
  const len = Math.hypot(dx, dy);
  const ux = dx / len, uy = dy / len;
  const lx = ux * (planet.radius + 30);
  const ly = uy * (planet.radius + 30);
  const anchor = ux > 0.3 ? "start" : (ux < -0.3 ? "end" : "middle");
  return (
    <g className="planet-label" pointerEvents="none">
      <line x1={ux * (planet.radius + 6)} y1={uy * (planet.radius + 6)}
            x2={ux * (planet.radius + 24)} y2={uy * (planet.radius + 24)}
            stroke={`var(--c-${planet.id})`} strokeOpacity={focused ? 0.85 : 0.5} strokeWidth="0.7" />
      <text x={lx} y={ly} textAnchor={anchor} className="pl-name"
            style={{ fill: `var(--c-${planet.id})`, fontWeight: focused ? 600 : 500 }}>
        {planet.label.toUpperCase()}
      </text>
      <text x={lx} y={ly + 13} textAnchor={anchor} className="pl-meta">
        {planet.allTechs.length} ENTRIES · TRL ø {planet.avgR.toFixed(1)}
      </text>
    </g>
  );
}

function GalaxyChrome({ focused }) {
  return (
    <div className="galaxy-chrome" aria-hidden>
      <div className="chrome corner tl">
        <span>FSA · 010</span>
        <span>SCAN {focused ? "FOCUSED" : "1 / 7"}</span>
      </div>
      <div className="chrome corner tr">
        <span>{focused ? `${focused.label.toUpperCase()} · ${focused.allTechs.length}E` : "SECTOR MAP"}</span>
        <span>RNG 280 AU</span>
      </div>
      <div className="chrome corner bl">
        <span>EVIDENCE · 3 POSTURES</span>
      </div>
      <div className="chrome corner br">
        <span>115 ENTRIES · LIVE</span>
      </div>
    </div>
  );
}

function DefaultReadout({ planets, hoverPlanet, hoverTech, setFocused, onOpenTech }) {
  // Tech-hover preview takes priority
  if (hoverTech) {
    const planet = planets.find(p => p.id === hoverTech.sector);
    const chem = window.FSA.CHEMICALS.find(c => c.sym === hoverTech.chemical);
    const bn = window.FSA.BOTTLENECKS.find(b => b.id === hoverTech.bottleneck);
    return (
      <div className="readout preview" data-sector={hoverTech.sector}>
        <div className="readout-head">
          <div className="meta">▼ MOON · {hoverTech.pid}</div>
          <div className="readout-title" style={{ color: `var(--c-${hoverTech.sector})` }}>{hoverTech.name}</div>
          <div className="meta dim">{planet?.label} · {hoverTech.evidence}</div>
        </div>
        <div className="preview-grid">
          <div className="preview-cell">
            <div className="meta">Spine</div>
            <div className="preview-val">{hoverTech.chemical} <span style={{ color: "var(--fg-faint)" }}>· {chem?.name}</span></div>
          </div>
          <div className="preview-cell">
            <div className="meta">Bottleneck</div>
            <div className="preview-val">{bn?.label}</div>
          </div>
        </div>
        <div className="preview-readiness">
          <div className="rl-row"><span className="rl-label">TRL</span><span className="rl-bar">{[...Array(9)].map((_,i)=><span key={i} className={`rl-tick ${i<hoverTech.trl?"on":""}`} style={i<hoverTech.trl?{background:`var(--c-${hoverTech.sector})`}:null} />)}</span><span className="rl-val tnum">{hoverTech.trl}/9</span></div>
          <div className="rl-row"><span className="rl-label">MRL</span><span className="rl-bar">{[...Array(9)].map((_,i)=><span key={i} className={`rl-tick ${i<hoverTech.mrl?"on":""}`} style={i<hoverTech.mrl?{background:`var(--c-${hoverTech.sector})`}:null} />)}</span><span className="rl-val tnum">{hoverTech.mrl}/9</span></div>
          <div className="rl-row"><span className="rl-label">IRL</span><span className="rl-bar">{[...Array(9)].map((_,i)=><span key={i} className={`rl-tick ${i<hoverTech.irl?"on":""}`} style={i<hoverTech.irl?{background:`var(--c-${hoverTech.sector})`}:null} />)}</span><span className="rl-val tnum">{hoverTech.irl}/9</span></div>
        </div>
        <button className="preview-open" onClick={() => onOpenTech(hoverTech)} style={{ borderColor: `var(--c-${hoverTech.sector})`, color: `var(--c-${hoverTech.sector})` }}>
          Open full card →
        </button>
      </div>
    );
  }

  const planet = hoverPlanet ? planets.find(p => p.id === hoverPlanet) : null;
  return (
    <div className="readout">
      <div className="readout-head">
        <div className="meta">▼ FIELD READOUT</div>
        <div className="readout-title">{planet ? planet.label : "Sector overview"}</div>
        <div className="meta dim">{planet ? `${planet.allTechs.length} entries · TRL ø ${planet.avgR.toFixed(1)}` : "Hover any planet or moon · click to focus"}</div>
      </div>
      <div className="readout-body">
        <p>
          {planet ? SECTOR_DESC[planet.id]
                  : "The atlas separates 115 frontier technologies across seven sectors. Each sector is a planet; each technology is a moon on a readiness orbit. Hover for a quick read, click to drill in. Use the readiness floor and evidence filter above to thin the field."}
        </p>
      </div>
      <div className="readout-list">
        {planets.map(p => (
          <button key={p.id} className="readout-row" onClick={() => setFocused(p.id)}>
            <span className="rr-dot" style={{ background: `var(--c-${p.id})` }} />
            <span className="rr-label">{p.label}</span>
            <span className="rr-count">{p.allTechs.length}</span>
            <span className="rr-trl meta">TRL ø {p.avgR.toFixed(1)}</span>
            <span className="rr-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FocusReadout({ planet, onClose, onOpenTech, bottlenecks }) {
  const bnTally = {};
  planet.allTechs.forEach(t => { bnTally[t.bottleneck] = (bnTally[t.bottleneck] || 0) + 1; });
  const bnSorted = Object.entries(bnTally).sort((a, b) => b[1] - a[1]).slice(0, 4);

  return (
    <div className="readout focused" data-sector={planet.id}>
      <div className="readout-head">
        <div className="meta">▼ SECTOR · {planet.id.toUpperCase()}</div>
        <div className="readout-title" style={{ color: `var(--c-${planet.id})` }}>{planet.label}</div>
        <div className="meta dim">{planet.allTechs.length} entries · TRL ø {planet.avgR.toFixed(1)}</div>
      </div>
      <div className="readout-body">
        <p>{SECTOR_DESC[planet.id]}</p>
      </div>

      <div className="readout-section">
        <div className="meta">Top bottlenecks</div>
        <div className="readout-bn">
          {bnSorted.map(([bnId, n]) => {
            const bn = bottlenecks.find(b => b.id === bnId);
            return (
              <div key={bnId} className="bn-row">
                <span className="bn-row-label">{bn?.label || bnId}</span>
                <span className="bn-row-bar"><span style={{ width: `${(n / planet.allTechs.length) * 100}%`, background: `var(--c-${planet.id})` }} /></span>
                <span className="bn-row-n meta">{n}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="readout-section">
        <div className="meta">Entries · click to open</div>
        <div className="readout-techlist">
          {planet.allTechs.map(t => (
            <button key={t.pid} className="rt-row" onClick={() => onOpenTech(t)}>
              <span className="rt-pid">{t.pid}</span>
              <span className="rt-name">{t.name}</span>
              <span className="rt-ready meta tnum">{t.trl}·{t.mrl}·{t.irl}</span>
              <span className={`rt-dot rt-${t.evidence}`} style={{ borderColor: `var(--c-${planet.id})` }} />
            </button>
          ))}
        </div>
      </div>

      <button className="readout-back" onClick={onClose}>← Back to galaxy</button>
    </div>
  );
}

window.GalaxyMap = GalaxyMap;
