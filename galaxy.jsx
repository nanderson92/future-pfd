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

const ATLAS_LENSES = [
  { id: "sectors", label: "Sectors", code: "01", section: null,
    title: "Seven future domains",
    body: "The outer planets are the main doors into the atlas. Pick a sector first, then read its moons as technology pathways." },
  { id: "chemicals", label: "Chemicals", code: "02", section: "chemicals",
    title: "Chemical spine",
    body: "This layer traces recurring molecules and materials, such as H₂, CO₂, NH₃, Si, Li, H₂O, across otherwise separate futures." },
  { id: "unitops", label: "Unit ops", code: "03", section: "unitops",
    title: "Unit-operation layer",
    body: "This layer asks what physical operations actually make the future work: separation, electrolysis, deposition, heat exchange, fermentation, and purification." },
  { id: "bottlenecks", label: "Bottlenecks", code: "04", section: "pathways",
    title: "Scale-up constraints",
    body: "This layer surfaces the limiting step: energy intensity, dilute feeds, material durability, manufacturing yield, cost, siting, or infrastructure." },
  { id: "readiness", label: "Readiness", code: "05", section: "readiness",
    title: "TRL · MRL · IRL",
    body: "This layer separates whether the science works, whether manufacturing can repeat it, and whether the surrounding infrastructure can absorb it." },
  { id: "evidence", label: "Evidence", code: "06", section: "sources",
    title: "Evidence posture",
    body: "This layer keeps the sci-fi honest: direct demonstrations, roadmap claims, and analogues from adjacent industries are visibly different." },
];

const lensById = (id) => ATLAS_LENSES.find(l => l.id === id) || ATLAS_LENSES[0];

function GalaxyMap() {
  const sectors = window.FSA.SECTORS;
  const entries = window.FSA.ENTRIES;
  const chems = window.FSA.CHEMICALS;
  const bottlenecks = window.FSA.BOTTLENECKS;

  const [focused, setFocused] = React.useState(null);
  const [hoverTech, setHoverTech] = React.useState(null);
  const [hoverPlanet, setHoverPlanet] = React.useState(null);
  const [highlightChem, setHighlightChem] = React.useState(null);
  const [highlightOp, setHighlightOp] = React.useState(null);
  const [highlightBottleneck, setHighlightBottleneck] = React.useState(null);
  const [evidenceFilter, setEvidenceFilter] = React.useState(null);
  const [readinessMin, setReadinessMin] = React.useState(1);
  const [openTech, setOpenTech] = React.useState(null);
  const [activeLens, setActiveLens] = React.useState("sectors");
  const [navCamera, setNavCamera] = React.useState({ zoomScale: 1, panX: 0, panY: 0 });

  const resetCameraNav = React.useCallback(() => {
    setNavCamera({ zoomScale: 1, panX: 0, panY: 0 });
  }, []);

  const nudgeCamera = React.useCallback((dx, dy) => {
    setNavCamera(prev => ({ ...prev, panX: prev.panX + dx, panY: prev.panY + dy }));
  }, []);

  const changeCameraZoom = React.useCallback((delta) => {
    setNavCamera(prev => ({
      ...prev,
      zoomScale: Math.max(0.78, Math.min(1.52, Number((prev.zoomScale + delta).toFixed(2))))
    }));
  }, []);

  const focusSector = React.useCallback((sectorId) => {
    setFocused(current => current === sectorId ? null : sectorId);
  }, []);

  // Listen for cross-section navigation events
  React.useEffect(() => {
    const onChem = (e) => {
      setHighlightChem(e.detail);
      setHighlightOp(null);
      setHighlightBottleneck(null);
      setActiveLens("chemicals");
      setFocused(null);
      const el = document.getElementById("map");
      if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
    };
    const onSector = (e) => {
      setFocused(e.detail);
      setActiveLens("sectors");
      const el = document.getElementById("map");
      if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
    };
    const onTech = (e) => {
      const entry = window.FSA.ENTRIES.find(x => x.pid === e.detail);
      if (entry) setOpenTech(entry);
    };
    const onLens = (e) => {
      const lensId = e.detail || "sectors";
      if (!ATLAS_LENSES.some(l => l.id === lensId)) return;
      setActiveLens(lensId);
      if (lensId !== "chemicals") setHighlightChem(null);
      if (lensId !== "unitops") setHighlightOp(null);
      if (lensId !== "bottlenecks") setHighlightBottleneck(null);
      const el = document.getElementById("map");
      if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
    };
    const onReset = () => {
      setFocused(null);
      setActiveLens("sectors");
      clearOrbitFilters();
      const el = document.getElementById("map");
      if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
    };
    window.addEventListener("fsa:focus-chemical", onChem);
    window.addEventListener("fsa:focus-sector", onSector);
    window.addEventListener("fsa:open-tech", onTech);
    window.addEventListener("fsa:set-lens", onLens);
    window.addEventListener("fsa:reset-orbit", onReset);
    if (window.FSA_PENDING_ORBIT) {
      const pending = window.FSA_PENDING_ORBIT;
      window.FSA_PENDING_ORBIT = null;
      if (pending.reset) {
        setFocused(null);
        setActiveLens("sectors");
        clearOrbitFilters();
      } else {
        if (pending.lens && ATLAS_LENSES.some(l => l.id === pending.lens)) setActiveLens(pending.lens);
        if (pending.sector) setFocused(pending.sector);
      }
    }
    return () => {
      window.removeEventListener("fsa:focus-chemical", onChem);
      window.removeEventListener("fsa:focus-sector", onSector);
      window.removeEventListener("fsa:open-tech", onTech);
      window.removeEventListener("fsa:set-lens", onLens);
      window.removeEventListener("fsa:reset-orbit", onReset);
    };
  }, []);

  // Layout space
  const W = 1920, H = 1120;
  const CX = W / 2, CY = H / 2;
  const R = 545;

  const planets = React.useMemo(() => {
    return sectors.map((s, i) => {
      const angle = -Math.PI / 2 + (i / sectors.length) * Math.PI * 2;
      const x = CX + Math.cos(angle) * R;
      const y = CY + Math.sin(angle) * R * 0.86;
      const techs = entries.filter(e => e.sector === s.id);
      const radius = 78 + Math.sqrt(techs.length) * 8.6;
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
        const tr = radius + (ring === "inner" ? 76 : 162);
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

  const targetCamera = React.useMemo(() => {
    const boundsForPlanet = (planet, mode = "all") => {
      const moonReach = mode === "focus" ? 236 : 228;
      const halo = mode === "focus" ? 120 : 96;
      return {
        minX: planet.x - planet.radius - moonReach - halo,
        maxX: planet.x + planet.radius + moonReach + halo,
        minY: planet.y - planet.radius - moonReach - halo,
        maxY: planet.y + planet.radius + moonReach + halo,
      };
    };

    const mergeBounds = (items) => items.reduce((acc, b) => ({
      minX: Math.min(acc.minX, b.minX),
      maxX: Math.max(acc.maxX, b.maxX),
      minY: Math.min(acc.minY, b.minY),
      maxY: Math.max(acc.maxY, b.maxY),
    }));

    const fitBounds = (bounds, options = {}) => {
      const padX = options.padX ?? 110;
      const padY = options.padY ?? 110;
      const centerX = options.centerX ?? CX;
      const centerY = options.centerY ?? CY;
      const minZoom = options.minZoom ?? 0.62;
      const maxZoom = options.maxZoom ?? 1.52;
      const boxW = Math.max(1, bounds.maxX - bounds.minX);
      const boxH = Math.max(1, bounds.maxY - bounds.minY);
      const fitZoom = Math.min((W - padX * 2) / boxW, (H - padY * 2) / boxH);
      const zoom = Math.max(minZoom, Math.min(maxZoom, fitZoom)) * navCamera.zoomScale;
      const anchorX = (bounds.minX + bounds.maxX) / 2;
      const anchorY = (bounds.minY + bounds.maxY) / 2;
      return {
        zoom,
        tx: centerX - zoom * anchorX + navCamera.panX,
        ty: centerY - zoom * anchorY + navCamera.panY,
      };
    };

    if (focusedPlanet) {
      return fitBounds(boundsForPlanet(focusedPlanet, "focus"), {
        padX: 190,
        padY: 170,
        centerX: CX,
        centerY: CY + 8,
        minZoom: 0.88,
        maxZoom: 1.10,
      });
    }

    /*
      Full-orbit mode should not use the raw union-bounds center.
      The moon distribution is asymmetric, so bounds-fitting pulls the
      entire atlas rightward. Anchor the camera on the actual atlas hub
      instead, then choose a conservative zoom that keeps the full solar
      system in frame.
    */
    const fullBounds = mergeBounds(planets.map((planet) => boundsForPlanet(planet, "all")));
    const boxW = Math.max(1, fullBounds.maxX - fullBounds.minX);
    const boxH = Math.max(1, fullBounds.maxY - fullBounds.minY);
    const safeZoom = Math.min((W - 420) / boxW, (H - 320) / boxH);
    const zoom = Math.max(0.50, Math.min(0.61, safeZoom)) * navCamera.zoomScale;

    /*
      Browser-calibrated home target:
      the SVG viewBox center is not the perceived center once the fixed HUD,
      sector jump rail, and right-side readout are on top of it. The full-orbit
      camera now pins the process hub left of mathematical center so the visible
      planet field sits centered in the real viewport.
    */
    const HOME_SCREEN_X = CX - 330;
    const HOME_SCREEN_Y = CY + 18;
    return {
      zoom,
      tx: HOME_SCREEN_X - zoom * CX + navCamera.panX,
      ty: HOME_SCREEN_Y - zoom * CY + navCamera.panY,
    };
  }, [planets, focusedPlanet, navCamera.zoomScale, navCamera.panX, navCamera.panY]);

  const [camera, setCamera] = React.useState(targetCamera);
  const cameraRef = React.useRef(targetCamera);

  React.useEffect(() => {
    resetCameraNav();
  }, [focused, resetCameraNav]);

  React.useEffect(() => {
    const start = cameraRef.current;
    const end = targetCamera;
    const duration = focusedPlanet ? 1280 : 960;
    let raf = 0;
    const started = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const t = Math.min(1, (now - started) / duration);
      const k = ease(t);
      const next = {
        zoom: start.zoom + (end.zoom - start.zoom) * k,
        tx: start.tx + (end.tx - start.tx) * k,
        ty: start.ty + (end.ty - start.ty) * k,
      };
      cameraRef.current = next;
      setCamera(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetCamera.zoom, targetCamera.tx, targetCamera.ty]);

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

  const openAtlasForSector = (sectorId) => {
    window.FSA_PENDING_ATLAS_FILTER = { sector: sectorId };
    window.location.hash = "atlas";
  };

  const openAtlasWithFilter = (filter) => {
    window.FSA_PENDING_ATLAS_FILTER = filter || {};
    window.location.hash = "atlas";
  };

  const openLensSection = (lensId = activeLens) => {
    const lens = lensById(lensId);
    if (!lens.section) return;
    window.location.hash = lens.section;
  };

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
    if (highlightOp && t.unitOp !== highlightOp) return false;
    if (highlightBottleneck && t.bottleneck !== highlightBottleneck) return false;
    return true;
  };

  const clearOrbitFilters = () => {
    setReadinessMin(1);
    setEvidenceFilter(null);
    setHighlightChem(null);
    setHighlightOp(null);
    setHighlightBottleneck(null);
  };

  const visibleCount = entries.filter(isMoonVisible).length;
  const filterCount = [readinessMin > 1, evidenceFilter, highlightChem, highlightOp, highlightBottleneck].filter(Boolean).length;

  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent("fsa:orbit-state", {
      detail: {
        activeLens,
        focused,
        visibleCount,
        filters: { readinessMin, evidenceFilter, highlightChem, highlightOp, highlightBottleneck }
      }
    }));
  }, [activeLens, focused, visibleCount, readinessMin, evidenceFilter, highlightChem, highlightOp, highlightBottleneck]);

  return (
    <section id="map" className="section section-galaxy section-feature orbit-home" data-lens={activeLens} data-focused={focused ? "true" : "false"} data-sector={focused || "all"}>
      <div className="frame frame-flat">
        <div className="orbit-home-head">
          <div className="orbit-system-tag">
            <span>FSA · 001</span>
            <span className="sep">▣</span>
            <span>Interactive process atlas</span>
            <span className="sep">▣</span>
            <span>115 cards · 7 orbits</span>
          </div>
          <div className="orbit-head-actions">
            <a className="orbit-index-jump" href="#guide">Guide</a>
            <a className="orbit-index-jump" href="#atlas">Exit map · full index →</a>
          </div>
        </div>

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
          {(filterCount > 0 || focused) && (
            <button className="gf-reset" onClick={() => {
              clearOrbitFilters(); setFocused(null); setActiveLens("sectors"); resetCameraNav();
            }}>Reset all ×</button>
          )}
        </div>

        <div className="galaxy orbit-galaxy" data-focused={focused ? "true" : "false"} data-lens={activeLens} data-sector={focused || "all"}>
          <div className="galaxy-stage" data-focused={focused ? "true" : "false"} data-lens={activeLens}>
            <div className="orbit-hero-card">
              <div className="meta">CENTRAL INTERFACE · CLICK THE SYSTEM</div>
              <h1>Navigate the future as a process map.</h1>
              <p>The planets are the website. Pick a system, then the camera moves into its technology moons, process constraints, and evidence layer.</p>
              <div className="orbit-actions">
                <button onClick={() => { setFocused(null); clearOrbitFilters(); setActiveLens("sectors"); resetCameraNav(); }}>Reset orbit</button>
                <a href="#guide">How to read it</a>
              </div>
            </div>
            <OrbitLensDock
              activeLens={activeLens}
              sectors={sectors}
              entries={entries}
              planets={planets}
              chems={chems}
              unitOps={window.FSA.UNIT_OPS}
              bottlenecks={bottlenecks}
              focused={focused}
              setFocused={setFocused}
              highlightChem={highlightChem}
              setHighlightChem={setHighlightChem}
              highlightOp={highlightOp}
              setHighlightOp={setHighlightOp}
              highlightBottleneck={highlightBottleneck}
              setHighlightBottleneck={setHighlightBottleneck}
              readinessMin={readinessMin}
              setReadinessMin={setReadinessMin}
              evidenceFilter={evidenceFilter}
              setEvidenceFilter={setEvidenceFilter}
              visibleCount={visibleCount}
              filterCount={filterCount}
              clearOrbitFilters={clearOrbitFilters}
              onOpenAtlas={openAtlasWithFilter}
            />
            <div className="orbit-path-hint" aria-label="How to use the orbit system">
              <div><b>01</b><span>Pick a planet</span></div>
              <div><b>02</b><span>Switch a lens</span></div>
              <div><b>03</b><span>Open a moon</span></div>
            </div>
            <div className="orbit-lens-rail" aria-label="Atlas layers">
              {ATLAS_LENSES.map((lens) => (
                <button key={lens.id}
                  type="button"
                  className={activeLens === lens.id ? "active" : ""}
                  onClick={() => setActiveLens(lens.id)}
                  title={lens.title}
                  aria-pressed={activeLens === lens.id}>
                  <b>{lens.code}</b><span>{lens.label}</span>
                </button>
              ))}
            </div>
            <div className="orbit-state-strip">
              <span className="meta">Mission control</span>
              <b>{lensById(activeLens).label}</b>
              <span>{visibleCount}/{entries.length} moons visible</span>
              {focusedPlanet && <span>Focused: {focusedPlanet.label}</span>}
              {highlightChem && <span>Spine: {highlightChem}</span>}
              {highlightOp && <span>Unit op: {window.FSA.UNIT_OPS.find(o => o.id === highlightOp)?.label}</span>}
              {highlightBottleneck && <span>Bottleneck active</span>}
            </div>
            <GalaxyChrome focused={focusedPlanet} activeLens={activeLens} visibleCount={visibleCount} />
            <div className="map-page-tabs" aria-label="Map support pages">
              {[
                ["#guide", "Guide"],
                ["#cases", "Cases"],
                ["#atlas", "Index"],
                ["#sources", "Sources"]
              ].map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            </div>
            <MapCameraControls
              focusedPlanet={focusedPlanet}
              navCamera={navCamera}
              onNudge={nudgeCamera}
              onZoom={changeCameraZoom}
              onReset={resetCameraNav}
              onFullOrbit={() => { setFocused(null); clearOrbitFilters(); setActiveLens("sectors"); resetCameraNav(); resetCameraNav(); }}
            />
            <SectorJumpNav
              sectors={sectors}
              focused={focused}
              planets={planets}
              onFocus={focusSector}
              onFullOrbit={() => { setFocused(null); resetCameraNav(); }}
            />
            {focusedPlanet && (
              <div className="sector-lock-banner" data-sector={focusedPlanet.id}>
                <span>Camera locked</span>
                <b>{focusedPlanet.label}</b>
                <em>{focusedPlanet.allTechs.length} process moons · TRL ø {focusedPlanet.avgR.toFixed(1)}</em>
                <button onClick={() => setFocused(null)}>Pull back to full orbit</button>
              </div>
            )}
            <div className="pov-reticle" aria-hidden="true">
              <span>{focusedPlanet ? `CAMERA LOCK · ${focusedPlanet.label.toUpperCase()}` : "FREE ORBIT CAMERA"}</span>
              <b>{lensById(activeLens).label}</b>
            </div>
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

              <g className="camera-rig" transform={`matrix(${camera.zoom} 0 0 ${camera.zoom} ${camera.tx} ${camera.ty})`}>

              {/* Twinkle starfield */}
              <g className="warp-lines" aria-hidden>
                {Array.from({ length: 22 }, (_, i) => {
                  const a = (i / 22) * Math.PI * 2;
                  const x1 = CX + Math.cos(a) * 130;
                  const y1 = CY + Math.sin(a) * 112;
                  const x2 = CX + Math.cos(a) * 880;
                  const y2 = CY + Math.sin(a) * 760;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                })}
              </g>
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
                {[140, 240, 360, 500, 660].map(rr => (
                  <ellipse key={rr} cx={CX} cy={CY} rx={rr} ry={rr * 0.86} fill="none"
                    stroke="var(--grid-line)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.35" />
                ))}
              </g>

              <g className="lens-rings" aria-hidden="true">
                {ATLAS_LENSES.map((lens, i) => {
                  const rr = 116 + i * 42;
                  return (
                    <g key={lens.id} className={activeLens === lens.id ? "active" : ""}>
                      <ellipse cx={CX} cy={CY} rx={rr} ry={rr * 0.86} fill="none" />
                      <text x={CX + rr + 8} y={CY - rr * 0.12} className="lens-ring-label">{lens.code} · {lens.label.toUpperCase()}</text>
                    </g>
                  );
                })}
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
                 onClick={() => { setFocused(null); clearOrbitFilters(); setActiveLens("sectors"); resetCameraNav(); }}
                 onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setFocused(null); clearOrbitFilters(); setActiveLens("sectors"); resetCameraNav(); } }}
                 role="button"
                 tabIndex="0"
                 aria-label="Reset orbit to full atlas"
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

              {focusedPlanet && (
                <g className="focus-corridor" aria-hidden="true">
                  <line x1={CX} y1={CY} x2={focusedPlanet.x} y2={focusedPlanet.y} />
                  <circle cx={focusedPlanet.x} cy={focusedPlanet.y} r={focusedPlanet.radius + 96} />
                  <circle cx={focusedPlanet.x} cy={focusedPlanet.y} r={focusedPlanet.radius + 148} />
                </g>
              )}

              {/* Planets */}
              {planets.map((p, i) => {
                const isFocused = focused === p.id;
                const isHover = hoverPlanet === p.id;
                const isDimmed = focused && !isFocused;
                const pVisibleCount = p.allTechs.filter(isMoonVisible).length;
                const hasVisible = pVisibleCount > 0;
                const planetOpacity = isDimmed ? 0.22 : (hasVisible ? 1 : 0.16);

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

                    <g className="planet-atmosphere" aria-hidden="true">
                      <circle cx="0" cy="0" r={p.radius + 42} fill={`var(--c-${p.id})`} opacity={isFocused ? "0.065" : "0.025"} />
                      <circle cx="0" cy="0" r={p.radius + 78} fill="none" stroke={`var(--c-${p.id})`} strokeOpacity={isFocused ? "0.22" : "0.06"} strokeWidth="0.8" strokeDasharray="5 14">
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur={`${36 + i * 4}s`} repeatCount="indefinite" />
                      </circle>
                    </g>
                    {/* Planet body (clickable) */}
                    <g onClick={() => focusSector(p.id)}
                       onKeyDown={(event) => {
                         if (event.key === "Enter" || event.key === " ") {
                           event.preventDefault();
                           focusSector(p.id);
                         }
                       }}
                       onMouseEnter={() => setHoverPlanet(p.id)}
                       onMouseLeave={() => setHoverPlanet(null)}
                       role="button"
                       tabIndex="0"
                       aria-label={`Focus ${p.label} sector`}
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
                    <g className="moon-orbit moon-orbit-cw" style={{ "--dur": `${62 + i * 5}s` }}>
                      {p.innerMoons.map(t => (
                        <Moon key={t.pid} t={t} planet={p} visible={isMoonVisible(t)}
                              onHover={setHoverTech} onOpen={setOpenTech} />
                      ))}
                    </g>

                    {/* Outer orbit group — rotates counter-clockwise */}
                    <g className="moon-orbit moon-orbit-ccw" style={{ "--dur": `${84 + i * 6}s` }}>
                      {p.outerMoons.map(t => (
                        <Moon key={t.pid} t={t} planet={p} visible={isMoonVisible(t)}
                              onHover={setHoverTech} onOpen={setOpenTech} />
                      ))}
                    </g>

                    {/* Planet label (static — outside rotating groups, relative coords) */}
                    <PlanetLabel planet={p} focused={isFocused || isHover} CX={CX} CY={CY} visibleCount={pVisibleCount} />
                  </g>
                );
              })}
              </g>
            </svg>
          </div>

          {/* Side panel */}
          <aside className="galaxy-panel">
            {focusedPlanet ? (
              <FocusReadout planet={focusedPlanet}
                            activeLens={activeLens}
                            setActiveLens={setActiveLens}
                            onOpenLayer={openLensSection}
                            onClose={() => setFocused(null)}
                            onOpenTech={setOpenTech}
                            onOpenAtlas={openAtlasForSector}
                            bottlenecks={bottlenecks} />
            ) : (
              <DefaultReadout planets={planets}
                              hoverPlanet={hoverPlanet}
                              hoverTech={hoverTech}
                              activeLens={activeLens}
                              setActiveLens={setActiveLens}
                              onOpenLayer={openLensSection}
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
                onClick={() => { setActiveLens("chemicals"); setHighlightChem(highlightChem === c.sym ? null : c.sym); }}>
                <span className="gc-pill-sym">{c.sym}</span>
                <span className="gc-pill-name">{c.name}</span>
              </button>
            ))}
            {highlightChem && (
              <button className="gc-pill gc-reset" onClick={() => setHighlightChem(null)}>Clear ×</button>
            )}
          </div>
        </div>

        {(highlightOp || highlightBottleneck || evidenceFilter || readinessMin > 1) && (
          <div className="orbit-filter-status">
            <span className="meta">Active orbit filters</span>
            <span>{visibleCount} / {entries.length} moons visible</span>
            {highlightOp && <b>Unit op: {window.FSA.UNIT_OPS.find(o => o.id === highlightOp)?.label}</b>}
            {highlightBottleneck && <b>Bottleneck: {bottlenecks.find(b => b.id === highlightBottleneck)?.label}</b>}
            {evidenceFilter && <b>Evidence: {evidenceFilter}</b>}
            {readinessMin > 1 && <b>TRL floor: {readinessMin}</b>}
            <button onClick={clearOrbitFilters}>Clear filters ×</button>
          </div>
        )}

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


function MapCameraControls({ focusedPlanet, navCamera, onNudge, onZoom, onReset, onFullOrbit }) {
  return (
    <div className="map-camera-controls" aria-label="Map camera controls">
      <div className="mcc-head">
        <span>Camera</span>
        <b>{focusedPlanet ? focusedPlanet.label : "Full orbit"}</b>
      </div>
      <div className="mcc-pad" aria-label="Pan map">
        <span />
        <button type="button" onClick={() => onNudge(0, 90)} aria-label="Pan map up">↑</button>
        <span />
        <button type="button" onClick={() => onNudge(110, 0)} aria-label="Pan map left">←</button>
        <button type="button" onClick={onReset} aria-label="Reset camera pan and zoom">⌾</button>
        <button type="button" onClick={() => onNudge(-110, 0)} aria-label="Pan map right">→</button>
        <span />
        <button type="button" onClick={() => onNudge(0, -90)} aria-label="Pan map down">↓</button>
        <span />
      </div>
      <div className="mcc-zoom" aria-label="Zoom map">
        <button type="button" onClick={() => onZoom(-0.12)} aria-label="Zoom out">−</button>
        <span>{Math.round(navCamera.zoomScale * 100)}%</span>
        <button type="button" onClick={() => onZoom(0.12)} aria-label="Zoom in">+</button>
      </div>
      <button type="button" className="mcc-wide" onClick={onFullOrbit}>Full orbit</button>
    </div>
  );
}

function SectorJumpNav({ sectors, focused, planets, onFocus, onFullOrbit }) {
  const countFor = (id) => planets.find(p => p.id === id)?.allTechs.length || 0;
  return (
    <div className="sector-jump-nav" aria-label="Jump between sector systems">
      <button type="button" className={!focused ? "active" : ""} onClick={onFullOrbit}>All</button>
      {sectors.map(s => (
        <button
          type="button"
          key={s.id}
          className={focused === s.id ? "active" : ""}
          data-sector={s.id}
          onClick={() => onFocus(s.id)}
          title={`${s.label} · ${countFor(s.id)} moons`}>
          <span className="sjn-dot" />
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  );
}


function OrbitLensDock({ activeLens, sectors, entries, planets, chems, unitOps, bottlenecks, focused, setFocused, highlightChem, setHighlightChem, highlightOp, setHighlightOp, highlightBottleneck, setHighlightBottleneck, readinessMin, setReadinessMin, evidenceFilter, setEvidenceFilter, visibleCount, filterCount, clearOrbitFilters, onOpenAtlas }) {
  const lens = lensById(activeLens);
  const sectorItems = planets.map(p => ({ id: p.id, label: p.label, count: p.allTechs.length, avg: p.avgR }));
  const topChems = chems.slice(0, 12).map(c => ({ ...c, count: entries.filter(e => e.chemical === c.sym).length })).filter(c => c.count > 0);
  const opItems = unitOps.map(o => ({ ...o, count: entries.filter(e => e.unitOp === o.id).length }));
  const bottleneckItems = bottlenecks.slice(0, 10).map(b => ({ ...b, count: entries.filter(e => e.bottleneck === b.id).length })).filter(b => b.count > 0).sort((a,b) => b.count - a.count).slice(0, 8);

  const atlasFilterForLens = () => {
    if (focused) return { sector: focused };
    if (activeLens === "chemicals" && highlightChem) return { chem: highlightChem };
    if (activeLens === "unitops" && highlightOp) return { op: highlightOp };
    if (activeLens === "bottlenecks" && highlightBottleneck) return { bn: highlightBottleneck };
    if (activeLens === "evidence" && evidenceFilter) return { ev: evidenceFilter };
    return {};
  };

  const showOpenIndex = focused || highlightChem || highlightOp || highlightBottleneck || evidenceFilter;

  return (
    <div className="orbit-lens-dock" data-lens={activeLens}>
      <div className="old-head">
        <span className="meta">{lens.code} · {lens.label}</span>
        <span className="old-count">{visibleCount}/{entries.length} moons</span>
      </div>
      <div className="old-title">{lens.title}</div>

      {activeLens === "sectors" && (
        <div className="old-grid sectors">
          {sectorItems.map(s => (
            <button key={s.id} className={focused === s.id ? "active" : ""} data-sector={s.id} onClick={() => setFocused(focused === s.id ? null : s.id)}>
              <span className="old-dot" />
              <span>{s.label}</span>
              <b>{s.count}</b>
            </button>
          ))}
        </div>
      )}

      {activeLens === "chemicals" && (
        <div className="old-grid chemicals">
          {topChems.map(c => (
            <button key={c.sym} className={highlightChem === c.sym ? "active" : ""} data-sector={c.color} onClick={() => { setHighlightChem(highlightChem === c.sym ? null : c.sym); setHighlightOp(null); setHighlightBottleneck(null); }}>
              <span>{c.sym}</span>
              <b>{c.count}</b>
            </button>
          ))}
        </div>
      )}

      {activeLens === "unitops" && (
        <div className="old-grid unitops">
          {opItems.map(o => (
            <button key={o.id} className={highlightOp === o.id ? "active" : ""} onClick={() => { setHighlightOp(highlightOp === o.id ? null : o.id); setHighlightChem(null); setHighlightBottleneck(null); }}>
              <span>{o.label}</span>
              <b>{o.count}</b>
            </button>
          ))}
        </div>
      )}

      {activeLens === "bottlenecks" && (
        <div className="old-grid bottlenecks">
          {bottleneckItems.map(b => (
            <button key={b.id} className={highlightBottleneck === b.id ? "active" : ""} onClick={() => { setHighlightBottleneck(highlightBottleneck === b.id ? null : b.id); setHighlightChem(null); setHighlightOp(null); }}>
              <span>{b.label}</span>
              <b>{b.count}</b>
            </button>
          ))}
        </div>
      )}

      {activeLens === "readiness" && (
        <div className="old-readiness">
          <label>
            <span>Readiness floor</span>
            <strong>TRL ≥ {readinessMin}</strong>
          </label>
          <input type="range" min="1" max="9" value={readinessMin} onChange={e => setReadinessMin(Number(e.target.value))} />
          <p>Raise the floor to hide earlier-stage moons and surface technologies closer to deployment.</p>
        </div>
      )}

      {activeLens === "evidence" && (
        <div className="old-grid evidence">
          {["direct", "roadmap", "analogue"].map(ev => (
            <button key={ev} className={evidenceFilter === ev ? "active" : ""} data-evidence={ev} onClick={() => setEvidenceFilter(evidenceFilter === ev ? null : ev)}>
              <span className="old-dot" />
              <span>{ev}</span>
              <b>{entries.filter(e => e.evidence === ev).length}</b>
            </button>
          ))}
        </div>
      )}

      <div className="old-actions">
        {filterCount > 0 && <button onClick={clearOrbitFilters}>Clear layer filters ×</button>}
        {showOpenIndex && <button onClick={() => onOpenAtlas(atlasFilterForLens())}>Open matching index →</button>}
      </div>
    </div>
  );
}

/* ── A single moon (rendered inside a rotating <g>) ─────── */
function Moon({ t, planet, visible, onHover, onOpen }) {
  const ev = t.evidence;
  const baseR = 10.8;
  const openMoon = (event) => {
    event.stopPropagation();
    if (!visible) return;
    onOpen(t);
  };
  return (
    <g className="moon"
       role="button"
       tabIndex={visible ? 0 : -1}
       aria-label={`Open ${t.name} process card`}
       onFocus={() => onHover(t)}
       onBlur={() => onHover(null)}
       onMouseEnter={() => onHover(t)}
       onMouseLeave={() => onHover(null)}
       onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openMoon(event); } }}
       onClick={openMoon}
       style={{ cursor: visible ? "pointer" : "default", opacity: visible ? 1 : 0.12, transition: "opacity 0.25s" }}>
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

function PlanetLabel({ planet, focused, CX, CY, visibleCount }) {
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
        {visibleCount != null && visibleCount !== planet.allTechs.length
          ? `${visibleCount}/${planet.allTechs.length} VISIBLE · TRL ø ${planet.avgR.toFixed(1)}`
          : `${planet.allTechs.length} ENTRIES · TRL ø ${planet.avgR.toFixed(1)}`}
      </text>
    </g>
  );
}

function GalaxyChrome({ focused, activeLens, visibleCount }) {
  return (
    <div className="galaxy-chrome" aria-hidden>
      <div className="chrome corner tl">
        <span>FSA · 010</span>
        <span>SCAN {focused ? "FOCUSED" : "1 / 7"}</span>
      </div>
      <div className="chrome corner tr">
        <span>{focused ? `${focused.label.toUpperCase()} · ${focused.allTechs.length}E` : "SECTOR MAP"}</span>
        <span>{activeLens?.toUpperCase()} · {visibleCount} VISIBLE</span>
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

function DefaultReadout({ planets, hoverPlanet, hoverTech, activeLens, setActiveLens, onOpenLayer, setFocused, onOpenTech }) {
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
      <LensModule activeLens={activeLens} setActiveLens={setActiveLens} onOpenLayer={onOpenLayer} />
      <div className="readout-body">
        <p>
          {planet ? SECTOR_DESC[planet.id]
                  : "This orbit system is the site map. Each sector is a planet; each technology is a moon; the rings encode readiness and evidence. Hover for a quick read, click to make a sector the page, or open a moon as a process card."}
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

function LensModule({ activeLens, setActiveLens, onOpenLayer, compact = false }) {
  const lens = lensById(activeLens);
  return (
    <div className={`lens-module ${compact ? "compact" : ""}`} data-lens={activeLens}>
      <div className="lens-module-head">
        <span className="meta">ACTIVE LENS</span>
        <span className="lens-code">{lens.code}</span>
      </div>
      <div className="lens-module-title">{lens.title}</div>
      <p>{lens.body}</p>
      <div className="lens-mini-grid">
        {ATLAS_LENSES.map(l => (
          <button key={l.id}
            className={activeLens === l.id ? "active" : ""}
            onClick={() => setActiveLens(l.id)}>
            {l.code}
          </button>
        ))}
      </div>
      {lens.section && (
        <button className="lens-jump" onClick={() => onOpenLayer(activeLens)}>Open supporting layer →</button>
      )}
    </div>
  );
}

function FocusReadout({ planet, activeLens, setActiveLens, onOpenLayer, onClose, onOpenTech, onOpenAtlas, bottlenecks }) {
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

      <LensModule activeLens={activeLens} setActiveLens={setActiveLens} onOpenLayer={onOpenLayer} compact />

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

      <div className="readout-actions">
        <button className="readout-back" onClick={onClose}>← Back to full orbit</button>
        <button className="readout-open-index" onClick={() => onOpenAtlas(planet.id)}>Open filtered index →</button>
      </div>
    </div>
  );
}

window.GalaxyMap = GalaxyMap;
