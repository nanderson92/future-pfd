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
    energy: "Power generation, conversion, and storage — fusion, fission, batteries, geothermal, hydrogen, wind, solar.",
    carbon: "Removing CO₂ from the air and turning it into fuels, materials, and stable storage. The carbon spine of decarbonization.",
    water: "Producing, purifying, and reclaiming water — desalination, atmospheric harvesting, PFAS destruction, lithium-from-brine.",
    materials: "Engineered substrates, films, and structural matter — composites, perovskites, MOFs, graphene, solid electrolytes.",
    manufacturing: "Repeatable production of frontier hardware — additive, roll-to-roll, biofermentation, modular factories, recycling.",
    cities: "The built environment, mobility, and urban energy — vertical farms, eVTOLs, district heat, microgrids, retrofits.",
    space: "Launch, propulsion, ISRU, on-orbit manufacturing, habitats — the hardware of getting off-planet and staying.",
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
    const [mapSearch, setMapSearch] = React.useState("");
    const [mobilePanel, setMobilePanel] = React.useState("camera");
    const [navCamera, setNavCamera] = React.useState({ zoomScale: 1, panX: 0, panY: 0 });
    const stageRef = React.useRef(null);
    const [stageSize, setStageSize] = React.useState({ width: 0, height: 0 });
    React.useEffect(() => {
        const node = stageRef.current;
        if (!node || typeof ResizeObserver === "undefined")
            return;
        const update = () => {
            const rect = node.getBoundingClientRect();
            setStageSize(prev => {
                const width = Math.round(rect.width);
                const height = Math.round(rect.height);
                return prev.width === width && prev.height === height ? prev : { width, height };
            });
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
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
            if (el)
                window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
        };
        const onSector = (e) => {
            setFocused(e.detail);
            setActiveLens("sectors");
            const el = document.getElementById("map");
            if (el)
                window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
        };
        const onTech = (e) => {
            const entry = window.FSA.ENTRIES.find(x => x.pid === e.detail);
            if (entry)
                setOpenTech(entry);
        };
        const onLens = (e) => {
            const lensId = e.detail || "sectors";
            if (!ATLAS_LENSES.some(l => l.id === lensId))
                return;
            setActiveLens(lensId);
            if (lensId !== "chemicals")
                setHighlightChem(null);
            if (lensId !== "unitops")
                setHighlightOp(null);
            if (lensId !== "bottlenecks")
                setHighlightBottleneck(null);
            const el = document.getElementById("map");
            if (el)
                window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
        };
        const onReset = () => {
            setFocused(null);
            setActiveLens("sectors");
            clearOrbitFilters();
            const el = document.getElementById("map");
            if (el)
                window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
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
            }
            else {
                if (pending.lens && ATLAS_LENSES.some(l => l.id === pending.lens))
                    setActiveLens(pending.lens);
                if (pending.sector)
                    setFocused(pending.sector);
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
            const outerList = techs.filter(t => (t.trl + t.mrl + t.irl) / 3 < 4.5);
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
        const stageW = stageSize.width || W;
        const stageH = stageSize.height || H;
        const meet = Math.min(stageW / W, stageH / H);
        const ox = (stageW - W * meet) / 2;
        const oy = (stageH - H * meet) / 2;
        const cssToViewBox = (cssX, cssY) => ({
            x: (cssX - ox) / meet,
            y: (cssY - oy) / meet,
        });
        const hud = stageW >= 1180
            ? { left: 214, right: 390, top: 92, bottom: 132 }
            : stageW >= 760
                ? { left: 80, right: 80, top: 90, bottom: 170 }
                : { left: 18, right: 18, top: 78, bottom: 210 };
        const safeCssW = Math.max(280, stageW - hud.left - hud.right);
        const safeCssH = Math.max(320, stageH - hud.top - hud.bottom);
        const safeCenter = cssToViewBox(hud.left + safeCssW / 2, hud.top + safeCssH / 2);
        const safeVbW = safeCssW / meet;
        const safeVbH = safeCssH / meet;
        const fitBounds = (bounds, options = {}) => {
            const minZoom = options.minZoom ?? 0.52;
            const maxZoom = options.maxZoom ?? 1.20;
            const padX = options.padX ?? 80;
            const padY = options.padY ?? 80;
            const boxW = Math.max(1, bounds.maxX - bounds.minX + padX * 2);
            const boxH = Math.max(1, bounds.maxY - bounds.minY + padY * 2);
            const fitZoom = Math.min(safeVbW / boxW, safeVbH / boxH);
            const zoom = Math.max(minZoom, Math.min(maxZoom, fitZoom)) * navCamera.zoomScale;
            const anchorX = (bounds.minX + bounds.maxX) / 2;
            const anchorY = (bounds.minY + bounds.maxY) / 2;
            return {
                zoom,
                tx: safeCenter.x - zoom * anchorX + navCamera.panX,
                ty: safeCenter.y - zoom * anchorY + navCamera.panY,
            };
        };
        if (focusedPlanet) {
            return fitBounds(boundsForPlanet(focusedPlanet, "focus"), {
                padX: 96,
                padY: 96,
                minZoom: 0.78,
                maxZoom: 1.06,
            });
        }
        const fullBounds = mergeBounds(planets.map((planet) => boundsForPlanet(planet, "all")));
        return fitBounds(fullBounds, {
            padX: 72,
            padY: 72,
            minZoom: 0.42,
            maxZoom: 0.62,
        });
    }, [planets, focusedPlanet, navCamera.zoomScale, navCamera.panX, navCamera.panY, stageSize.width, stageSize.height]);
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
            if (t < 1)
                raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [targetCamera.zoom, targetCamera.tx, targetCamera.ty]);
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
        if (!lens.section)
            return;
        window.location.hash = lens.section;
    };
    // Twinkle field — deterministic positions
    const twinkles = React.useMemo(() => {
        const seeded = (n) => {
            const x = Math.sin(n * 9301 + 49297) * 233280;
            return x - Math.floor(x);
        };
        return Array.from({ length: 24 }, (_, i) => ({
            x: seeded(i + 1) * W,
            y: seeded(i + 200) * H,
            r: seeded(i + 400) * 0.9 + 0.3,
            dur: 2 + seeded(i + 600) * 4,
            delay: seeded(i + 800) * 4,
        }));
    }, []);
    // Filter logic for moon visibility
    const isMoonVisible = (t) => {
        if (t.ready < readinessMin)
            return false;
        if (evidenceFilter && t.evidence !== evidenceFilter)
            return false;
        if (highlightChem && t.chemical !== highlightChem)
            return false;
        if (highlightOp && t.unitOp !== highlightOp)
            return false;
        if (highlightBottleneck && t.bottleneck !== highlightBottleneck)
            return false;
        const q = mapSearch.trim().toLowerCase();
        if (q) {
            const bn = bottlenecks.find(b => b.id === t.bottleneck)?.label || "";
            const op = window.FSA.UNIT_OPS.find(o => o.id === t.unitOp)?.label || "";
            const haystack = `${t.name} ${t.pid} ${t.sector} ${t.chemical} ${bn} ${op}`.toLowerCase();
            if (!haystack.includes(q))
                return false;
        }
        return true;
    };
    const clearOrbitFilters = () => {
        setReadinessMin(1);
        setEvidenceFilter(null);
        setHighlightChem(null);
        setHighlightOp(null);
        setHighlightBottleneck(null);
        setMapSearch("");
    };
    const visibleCount = entries.filter(isMoonVisible).length;
    const filterCount = [readinessMin > 1, evidenceFilter, highlightChem, highlightOp, highlightBottleneck, mapSearch.trim()].filter(Boolean).length;
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
    return (React.createElement("section", { id: "map", className: "section section-galaxy section-feature orbit-home", "data-lens": activeLens, "data-focused": focused ? "true" : "false", "data-sector": focused || "all" },
        React.createElement("div", { className: "frame frame-flat" },
            React.createElement("div", { className: "orbit-home-head" },
                React.createElement("div", { className: "orbit-system-tag" },
                    React.createElement("span", null, "FSA \u00B7 001"),
                    React.createElement("span", { className: "sep" }, "\u25A3"),
                    React.createElement("span", null, "Interactive process atlas"),
                    React.createElement("span", { className: "sep" }, "\u25A3"),
                    React.createElement("span", null, "115 cards \u00B7 7 orbits")),
                React.createElement("div", { className: "orbit-head-actions" },
                    React.createElement("a", { className: "orbit-index-jump", href: "#guide" }, "Guide"),
                    React.createElement("a", { className: "orbit-index-jump", href: "#atlas" }, "Exit map \u00B7 full index \u2192"))),
            React.createElement("div", { className: "galaxy-filters" },
                React.createElement("div", { className: "gf-group" },
                    React.createElement("span", { className: "meta gf-label" }, "Readiness floor"),
                    React.createElement("input", { type: "range", min: "1", max: "9", value: readinessMin, onChange: e => setReadinessMin(Number(e.target.value)), className: "gf-slider" }),
                    React.createElement("span", { className: "gf-readout meta" },
                        "show TRL \u2265 ",
                        React.createElement("strong", null, readinessMin))),
                React.createElement("div", { className: "gf-group" },
                    React.createElement("span", { className: "meta gf-label" }, "Evidence posture"),
                    React.createElement("div", { className: "gf-chips" }, ["direct", "roadmap", "analogue"].map(ev => (React.createElement("button", { key: ev, className: `gf-chip ${evidenceFilter === ev ? "on" : ""}`, "data-evidence": ev, onClick: () => setEvidenceFilter(evidenceFilter === ev ? null : ev) },
                        React.createElement("span", { className: "gf-chip-dot" }),
                        ev))))),
                (filterCount > 0 || focused) && (React.createElement("button", { className: "gf-reset", onClick: () => {
                        clearOrbitFilters();
                        setFocused(null);
                        setActiveLens("sectors");
                        resetCameraNav();
                    } }, "Reset all \u00D7"))),
            React.createElement("div", { className: "galaxy orbit-galaxy", "data-focused": focused ? "true" : "false", "data-lens": activeLens, "data-sector": focused || "all" },
                React.createElement("div", { ref: stageRef, className: "galaxy-stage", "data-focused": focused ? "true" : "false", "data-lens": activeLens },
                    React.createElement("div", { className: "orbit-hero-card" },
                        React.createElement("div", { className: "meta" }, "115 frontier technologies \u00B7 process-engineering map"),
                        React.createElement("h1", null, "Navigate the future as a process map."),
                        React.createElement("p", null, "The planets are the website. Pick a system, then the camera moves into its technology moons, process constraints, and evidence layer."),
                        React.createElement("div", { className: "orbit-actions" },
                            React.createElement("button", { onClick: () => { setFocused(null); clearOrbitFilters(); setActiveLens("sectors"); resetCameraNav(); } }, "Reset orbit"),
                            React.createElement("a", { href: "#guide" }, "How to read it"))),
                    React.createElement(OrbitLensDock, { activeLens: activeLens, sectors: sectors, entries: entries, planets: planets, chems: chems, unitOps: window.FSA.UNIT_OPS, bottlenecks: bottlenecks, focused: focused, setFocused: setFocused, highlightChem: highlightChem, setHighlightChem: setHighlightChem, highlightOp: highlightOp, setHighlightOp: setHighlightOp, highlightBottleneck: highlightBottleneck, setHighlightBottleneck: setHighlightBottleneck, readinessMin: readinessMin, setReadinessMin: setReadinessMin, evidenceFilter: evidenceFilter, setEvidenceFilter: setEvidenceFilter, visibleCount: visibleCount, filterCount: filterCount, clearOrbitFilters: clearOrbitFilters, onOpenAtlas: openAtlasWithFilter }),
                    React.createElement("div", { className: "map-search", role: "search", "aria-label": "Find a technology on the map" },
                        React.createElement("span", { className: "map-search-icon" }, "\u2315"),
                        React.createElement("input", { type: "search", placeholder: "Find a technology\u2026 fusion, DAC, lithium, water", value: mapSearch, onChange: event => setMapSearch(event.target.value) }),
                        mapSearch && React.createElement("button", { type: "button", onClick: () => setMapSearch(""), "aria-label": "Clear map search" }, "\u00D7")),
                    React.createElement("div", { className: "orbit-path-hint", "aria-label": "How to use the orbit system" },
                        React.createElement("div", null,
                            React.createElement("b", null, "01"),
                            React.createElement("span", null, "Pick a planet")),
                        React.createElement("div", null,
                            React.createElement("b", null, "02"),
                            React.createElement("span", null, "Switch a lens")),
                        React.createElement("div", null,
                            React.createElement("b", null, "03"),
                            React.createElement("span", null, "Open a moon"))),
                    React.createElement("div", { className: "orbit-lens-rail", "aria-label": "Atlas layers" }, ATLAS_LENSES.map((lens) => (React.createElement("button", { key: lens.id, type: "button", className: activeLens === lens.id ? "active" : "", onClick: () => setActiveLens(lens.id), title: lens.title, "aria-pressed": activeLens === lens.id },
                        React.createElement("b", null, lens.code),
                        React.createElement("span", null, lens.label))))),
                    React.createElement("div", { className: "orbit-state-strip" },
                        React.createElement("span", { className: "meta" }, "Mission control"),
                        React.createElement("b", null, lensById(activeLens).label),
                        React.createElement("span", null,
                            visibleCount,
                            "/",
                            entries.length,
                            " moons visible"),
                        focusedPlanet && React.createElement("span", null,
                            "Focused: ",
                            focusedPlanet.label),
                        highlightChem && React.createElement("span", null,
                            "Spine: ",
                            highlightChem),
                        highlightOp && React.createElement("span", null,
                            "Unit op: ",
                            window.FSA.UNIT_OPS.find(o => o.id === highlightOp)?.label),
                        highlightBottleneck && React.createElement("span", null, "Bottleneck active"),
                        mapSearch && React.createElement("span", null,
                            "Search: ",
                            mapSearch)),
                    React.createElement(GalaxyChrome, { focused: focusedPlanet, activeLens: activeLens, visibleCount: visibleCount }),
                    React.createElement("div", { className: "map-page-tabs", "aria-label": "Map support pages" }, [
                        ["#guide", "Guide"],
                        ["#cases", "Cases"],
                        ["#atlas", "Index"],
                        ["#sources", "Sources"]
                    ].map(([href, label]) => React.createElement("a", { key: href, href: href }, label))),
                    React.createElement(MapCameraControls, { focusedPlanet: focusedPlanet, navCamera: navCamera, onNudge: nudgeCamera, onZoom: changeCameraZoom, onReset: resetCameraNav, onFullOrbit: () => { setFocused(null); clearOrbitFilters(); setActiveLens("sectors"); resetCameraNav(); resetCameraNav(); } }),
                    React.createElement(SectorJumpNav, { sectors: sectors, focused: focused, planets: planets, onFocus: focusSector, onFullOrbit: () => { setFocused(null); resetCameraNav(); } }),
                    React.createElement(MobileMapConsole, { activeTab: mobilePanel, setActiveTab: setMobilePanel, focusedPlanet: focusedPlanet, sectors: sectors, planets: planets, focused: focused, onFocus: focusSector, onFullOrbit: () => { setFocused(null); clearOrbitFilters(); setActiveLens("sectors"); resetCameraNav(); }, navCamera: navCamera, onNudge: nudgeCamera, onZoom: changeCameraZoom, onReset: resetCameraNav, activeLens: activeLens, setActiveLens: setActiveLens, readinessMin: readinessMin, setReadinessMin: setReadinessMin, evidenceFilter: evidenceFilter, setEvidenceFilter: setEvidenceFilter, visibleCount: visibleCount, totalCount: entries.length, hoverTech: hoverTech, hoverPlanet: hoverPlanet, clearOrbitFilters: clearOrbitFilters }),
                    focusedPlanet && (React.createElement("div", { className: "sector-lock-banner", "data-sector": focusedPlanet.id },
                        React.createElement("span", null, "Camera locked"),
                        React.createElement("b", null, focusedPlanet.label),
                        React.createElement("em", null,
                            focusedPlanet.allTechs.length,
                            " process moons \u00B7 TRL \u00F8 ",
                            focusedPlanet.avgR.toFixed(1)),
                        React.createElement("button", { onClick: () => setFocused(null) }, "Pull back to full orbit"))),
                    React.createElement("div", { className: "pov-reticle", "aria-hidden": "true" },
                        React.createElement("span", null, focusedPlanet ? `CAMERA LOCK · ${focusedPlanet.label.toUpperCase()}` : "FREE ORBIT CAMERA"),
                        React.createElement("b", null, lensById(activeLens).label)),
                    React.createElement(CanvasGalaxyLayer, { W: W, H: H, CX: CX, CY: CY, planets: planets, camera: camera, twinkles: twinkles, focusedPlanet: focusedPlanet, focused: focused, activeLens: activeLens, highlightChem: highlightChem, isMoonVisible: isMoonVisible, mapSearch: mapSearch, hoverTech: hoverTech, hoverPlanet: hoverPlanet, focusSector: focusSector, setFocused: setFocused, setHoverPlanet: setHoverPlanet, setHoverTech: setHoverTech, setOpenTech: setOpenTech, clearOrbitFilters: clearOrbitFilters, setActiveLens: setActiveLens, resetCameraNav: resetCameraNav })),
                React.createElement("aside", { className: "galaxy-panel" }, focusedPlanet ? (React.createElement(FocusReadout, { planet: focusedPlanet, activeLens: activeLens, setActiveLens: setActiveLens, onOpenLayer: openLensSection, onClose: () => setFocused(null), onOpenTech: setOpenTech, onOpenAtlas: openAtlasForSector, bottlenecks: bottlenecks })) : (React.createElement(DefaultReadout, { planets: planets, hoverPlanet: hoverPlanet, hoverTech: hoverTech, activeLens: activeLens, setActiveLens: setActiveLens, onOpenLayer: openLensSection, setFocused: setFocused, onOpenTech: setOpenTech })))),
            React.createElement("div", { className: "galaxy-chems" },
                React.createElement("div", { className: "meta gc-label" }, "Chemical spine \u2014 trace a molecule across planets"),
                React.createElement("div", { className: "gc-pills" },
                    chems.slice(0, 10).map(c => (React.createElement("button", { key: c.sym, className: `gc-pill ${highlightChem === c.sym ? "active" : ""}`, onClick: () => { setActiveLens("chemicals"); setHighlightChem(highlightChem === c.sym ? null : c.sym); } },
                        React.createElement("span", { className: "gc-pill-sym" }, c.sym),
                        React.createElement("span", { className: "gc-pill-name" }, c.name)))),
                    highlightChem && (React.createElement("button", { className: "gc-pill gc-reset", onClick: () => setHighlightChem(null) }, "Clear \u00D7")))),
            (highlightOp || highlightBottleneck || evidenceFilter || readinessMin > 1) && (React.createElement("div", { className: "orbit-filter-status" },
                React.createElement("span", { className: "meta" }, "Active orbit filters"),
                React.createElement("span", null,
                    visibleCount,
                    " / ",
                    entries.length,
                    " moons visible"),
                highlightOp && React.createElement("b", null,
                    "Unit op: ",
                    window.FSA.UNIT_OPS.find(o => o.id === highlightOp)?.label),
                highlightBottleneck && React.createElement("b", null,
                    "Bottleneck: ",
                    bottlenecks.find(b => b.id === highlightBottleneck)?.label),
                evidenceFilter && React.createElement("b", null,
                    "Evidence: ",
                    evidenceFilter),
                readinessMin > 1 && React.createElement("b", null,
                    "TRL floor: ",
                    readinessMin),
                React.createElement("button", { onClick: clearOrbitFilters }, "Clear filters \u00D7"))),
            React.createElement("div", { className: "galaxy-legend" },
                React.createElement("div", { className: "legend-group" },
                    React.createElement("div", { className: "meta" }, "Moon = technology"),
                    React.createElement("div", { className: "legend-rows" },
                        React.createElement("div", { className: "legend-row" },
                            React.createElement("span", { className: "lg-dot lg-direct" }),
                            " Direct \u2014 peer-reviewed pilots"),
                        React.createElement("div", { className: "legend-row" },
                            React.createElement("span", { className: "lg-dot lg-roadmap" }),
                            " Roadmap \u2014 program targets"),
                        React.createElement("div", { className: "legend-row" },
                            React.createElement("span", { className: "lg-dot lg-analogue" }),
                            " Analogue \u2014 adjacent industry"))),
                React.createElement("div", { className: "legend-group" },
                    React.createElement("div", { className: "meta" }, "Orbit = readiness"),
                    React.createElement("div", { className: "legend-rows" },
                        React.createElement("div", { className: "legend-row" },
                            React.createElement("span", { className: "lg-ring-inner" }),
                            " Inner \u2014 higher readiness (TRL+MRL+IRL avg \u2265 4.5)"),
                        React.createElement("div", { className: "legend-row" },
                            React.createElement("span", { className: "lg-ring-outer" }),
                            " Outer \u2014 lower readiness"))),
                React.createElement("div", { className: "legend-group" },
                    React.createElement("div", { className: "meta" }, "How to navigate"),
                    React.createElement("div", { className: "legend-rows" },
                        React.createElement("div", { className: "legend-row" }, "Click a planet \u2192 focus that sector."),
                        React.createElement("div", { className: "legend-row" }, "Click a moon \u2192 open the full card."),
                        React.createElement("div", { className: "legend-row" }, "Click the hub center \u2192 reset everything."))))),
        openTech && React.createElement(AtlasModal, { entry: openTech, onClose: () => setOpenTech(null) })));
}
/* ── Canvas-rendered map layer: heavy visuals move off SVG/DOM ─────── */
function CanvasGalaxyLayer({ W, H, CX, CY, planets, camera, twinkles, focusedPlanet, focused, activeLens, highlightChem, isMoonVisible, mapSearch, hoverTech, hoverPlanet, focusSector, setFocused, setHoverPlanet, setHoverTech, setOpenTech, clearOrbitFilters, setActiveLens, resetCameraNav }) {
    const canvasRef = React.useRef(null);
    const lastHoverRef = React.useRef({ type: null, id: null, planet: null });
    const mapPointFromEvent = React.useCallback((event) => {
        const canvas = canvasRef.current;
        if (!canvas)
            return null;
        const rect = canvas.getBoundingClientRect();
        const cssW = Math.max(1, rect.width);
        const cssH = Math.max(1, rect.height);
        const meet = Math.min(cssW / W, cssH / H);
        const ox = (cssW - W * meet) / 2;
        const oy = (cssH - H * meet) / 2;
        const sx = (event.clientX - rect.left - ox) / meet;
        const sy = (event.clientY - rect.top - oy) / meet;
        return {
            x: (sx - camera.tx) / camera.zoom,
            y: (sy - camera.ty) / camera.zoom
        };
    }, [W, H, camera.zoom, camera.tx, camera.ty]);
    const hitTest = React.useCallback((point) => {
        if (!point)
            return null;
        const dist = (x, y) => Math.hypot(point.x - x, point.y - y);
        if (dist(CX, CY) <= 92)
            return { type: "hub" };
        const queryActive = Boolean(mapSearch.trim());
        const moonPlanets = queryActive
            ? planets
            : focused
                ? planets.filter(p => p.id === focused)
                : [];
        for (const p of moonPlanets) {
            const allMoons = [...p.innerMoons, ...p.outerMoons];
            for (const t of allMoons) {
                if (!isMoonVisible(t))
                    continue;
                const mx = p.x + t.lx;
                const my = p.y + t.ly;
                if (dist(mx, my) <= 25)
                    return { type: "moon", planet: p, entry: t };
            }
        }
        for (const p of planets) {
            if (dist(p.x, p.y) <= p.radius + 58)
                return { type: "planet", planet: p };
        }
        return null;
    }, [CX, CY, focused, mapSearch, planets, isMoonVisible]);
    const updateHover = React.useCallback((hit) => {
        const next = hit
            ? hit.type === "moon"
                ? { type: "moon", id: hit.entry.pid, planet: hit.planet.id, entry: hit.entry }
                : hit.type === "planet"
                    ? { type: "planet", id: hit.planet.id, planet: hit.planet.id }
                    : { type: "hub", id: "hub", planet: null }
            : { type: null, id: null, planet: null };
        const prev = lastHoverRef.current;
        if (prev.type === next.type && prev.id === next.id && prev.planet === next.planet)
            return;
        lastHoverRef.current = next;
        if (next.type === "moon") {
            setHoverTech(next.entry);
            setHoverPlanet(next.planet);
        }
        else if (next.type === "planet") {
            setHoverTech(null);
            setHoverPlanet(next.planet);
        }
        else {
            setHoverTech(null);
            setHoverPlanet(null);
        }
        const canvas = canvasRef.current;
        if (canvas)
            canvas.style.cursor = next.type ? "pointer" : "default";
    }, [setHoverTech, setHoverPlanet]);
    const handlePointerMove = React.useCallback((event) => {
        updateHover(hitTest(mapPointFromEvent(event)));
    }, [hitTest, mapPointFromEvent, updateHover]);
    const handlePointerLeave = React.useCallback(() => {
        lastHoverRef.current = { type: null, id: null, planet: null };
        setHoverTech(null);
        setHoverPlanet(null);
        const canvas = canvasRef.current;
        if (canvas)
            canvas.style.cursor = "default";
    }, [setHoverTech, setHoverPlanet]);
    const handleClick = React.useCallback((event) => {
        const hit = hitTest(mapPointFromEvent(event));
        if (!hit)
            return;
        if (hit.type === "hub") {
            setFocused(null);
            clearOrbitFilters();
            setActiveLens("sectors");
            resetCameraNav();
        }
        else if (hit.type === "planet") {
            focusSector(hit.planet.id);
        }
        else if (hit.type === "moon") {
            setOpenTech(hit.entry);
        }
    }, [hitTest, mapPointFromEvent, setFocused, clearOrbitFilters, setActiveLens, resetCameraNav, focusSector, setOpenTech]);
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        let disposed = false;
        const draw = () => {
            if (disposed)
                return;
            const rect = canvas.getBoundingClientRect();
            const cssW = Math.max(1, rect.width);
            const cssH = Math.max(1, rect.height);
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
                canvas.width = Math.round(cssW * dpr);
                canvas.height = Math.round(cssH * dpr);
            }
            const ctx = canvas.getContext("2d", { alpha: true });
            if (!ctx)
                return;
            const fg = "#eef4fb";
            const faint = "rgba(218,228,240,0.56)";
            const bg = "#111722";
            const palette = {
                energy: "#e7c95c",
                carbon: "#5fd2c8",
                water: "#6ea8ff",
                materials: "#e174c8",
                manufacturing: "#75d68d",
                cities: "#ef9466",
                space: "#b18cff"
            };
            const sectorColor = (id) => palette[id] || "#87a7ff";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, cssW, cssH);
            const bgGrad = ctx.createRadialGradient(cssW * 0.5, cssH * 0.52, 0, cssW * 0.5, cssH * 0.52, Math.max(cssW, cssH) * 0.72);
            bgGrad.addColorStop(0, "rgba(255,255,255,0.045)");
            bgGrad.addColorStop(0.48, "rgba(70,120,180,0.035)");
            bgGrad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, cssW, cssH);
            const meet = Math.min(cssW / W, cssH / H);
            const ox = (cssW - W * meet) / 2;
            const oy = (cssH - H * meet) / 2;
            const ellipse = (x, y, rx, ry, stroke, alpha = 1, width = 1, dash = []) => {
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = stroke;
                ctx.lineWidth = width;
                ctx.setLineDash(dash);
                ctx.beginPath();
                ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            };
            const circle = (x, y, r, fill, stroke = null, width = 1, alpha = 1) => {
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                if (fill) {
                    ctx.fillStyle = fill;
                    ctx.fill();
                }
                if (stroke) {
                    ctx.strokeStyle = stroke;
                    ctx.lineWidth = width;
                    ctx.stroke();
                }
                ctx.restore();
            };
            const drawSectorTexture = (p, color) => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                ctx.clip();
                ctx.strokeStyle = color;
                ctx.lineWidth = 1.1;
                ctx.globalAlpha = 0.32;
                if (p.id === "energy") {
                    for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(a) * p.radius * 0.2, Math.sin(a) * p.radius * 0.2);
                        ctx.lineTo(Math.cos(a) * p.radius * 1.1, Math.sin(a) * p.radius * 1.1);
                        ctx.stroke();
                    }
                }
                else if (p.id === "water") {
                    for (let y = -p.radius; y <= p.radius; y += 19) {
                        ctx.beginPath();
                        ctx.moveTo(-p.radius, y);
                        ctx.bezierCurveTo(-p.radius * 0.35, y - 12, p.radius * 0.35, y + 12, p.radius, y);
                        ctx.stroke();
                    }
                }
                else if (p.id === "materials") {
                    for (let a = 0; a < Math.PI * 2; a += Math.PI / 5) {
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(Math.cos(a) * p.radius, Math.sin(a) * p.radius);
                        ctx.stroke();
                    }
                    for (let r = p.radius * 0.28; r < p.radius; r += 24) {
                        ellipse(0, 0, r, r * 0.66, color, 0.22, 1);
                    }
                }
                else if (p.id === "space") {
                    ctx.restore();
                    ctx.save();
                    ctx.strokeStyle = color;
                    ctx.globalAlpha = 0.42;
                    ctx.lineWidth = 1.3;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, p.radius * 1.36, p.radius * 0.32, -0.28, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                    ctx.clip();
                }
                else if (p.id === "cities") {
                    for (let x = -p.radius; x <= p.radius; x += 22) {
                        ctx.beginPath();
                        ctx.moveTo(x, -p.radius);
                        ctx.lineTo(x, p.radius);
                        ctx.stroke();
                    }
                    for (let y = -p.radius; y <= p.radius; y += 22) {
                        ctx.beginPath();
                        ctx.moveTo(-p.radius, y);
                        ctx.lineTo(p.radius, y);
                        ctx.stroke();
                    }
                }
                else if (p.id === "manufacturing") {
                    for (let x = -p.radius * 1.2; x <= p.radius * 1.2; x += 22) {
                        ctx.beginPath();
                        ctx.moveTo(x, -p.radius);
                        ctx.lineTo(x + p.radius * 0.7, p.radius);
                        ctx.stroke();
                    }
                }
                else {
                    for (let r = p.radius * 0.28; r <= p.radius; r += 23) {
                        ellipse(0, 0, r, r * 0.76, color, 0.25, 1);
                    }
                }
                ctx.restore();
            };
            const drawMoonLabel = (t, color, strong = false) => {
                const label = t.name.length > 36 ? t.name.slice(0, 33) + "…" : t.name;
                ctx.save();
                ctx.font = `${strong ? 600 : 500} 10px JetBrains Mono, monospace`;
                ctx.textBaseline = "middle";
                ctx.lineWidth = 5;
                ctx.strokeStyle = "rgba(12,17,24,0.86)";
                ctx.fillStyle = strong ? fg : "rgba(238,244,251,0.78)";
                ctx.strokeText(label, t.lx + 17, t.ly);
                ctx.fillText(label, t.lx + 17, t.ly);
                ctx.restore();
            };
            ctx.save();
            ctx.translate(ox, oy);
            ctx.scale(meet, meet);
            ctx.translate(camera.tx, camera.ty);
            ctx.scale(camera.zoom, camera.zoom);
            twinkles.forEach((t, i) => {
                ctx.save();
                ctx.globalAlpha = 0.16 + ((i % 5) * 0.03);
                ctx.fillStyle = faint;
                ctx.beginPath();
                ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            [140, 240, 360, 500, 660].forEach((rr) => {
                ellipse(CX, CY, rr, rr * 0.86, faint, 0.17, 0.8, [3, 8]);
            });
            ATLAS_LENSES.forEach((lens, i) => {
                const rr = 116 + i * 42;
                ellipse(CX, CY, rr, rr * 0.86, fg, lens.id === activeLens ? 0.34 : 0.08, lens.id === activeLens ? 1.4 : 0.8);
            });
            circle(CX, CY, 82, "rgba(255,255,255,0.035)", null, 1, 1);
            circle(CX, CY, 56, null, faint, 0.9, 0.35);
            circle(CX, CY, 42, null, faint, 0.9, 0.48);
            circle(CX, CY, 4.5, fg, null, 1, 0.9);
            if (focusedPlanet) {
                const color = sectorColor(focusedPlanet.id);
                ctx.save();
                ctx.strokeStyle = color;
                ctx.globalAlpha = 0.25;
                ctx.lineWidth = 1.2;
                ctx.setLineDash([8, 16]);
                ctx.beginPath();
                ctx.moveTo(CX, CY);
                ctx.lineTo(focusedPlanet.x, focusedPlanet.y);
                ctx.stroke();
                ellipse(focusedPlanet.x, focusedPlanet.y, focusedPlanet.radius + 96, focusedPlanet.radius + 96, color, 0.18, 1);
                ellipse(focusedPlanet.x, focusedPlanet.y, focusedPlanet.radius + 148, focusedPlanet.radius + 148, color, 0.12, 1);
                ctx.restore();
            }
            const queryActive = Boolean(mapSearch.trim());
            planets.forEach((p) => {
                const isFocused = focused === p.id;
                const isHover = hoverPlanet === p.id;
                const isDimmed = focused && !isFocused;
                const pVisibleCount = p.allTechs.filter(isMoonVisible).length;
                const hasVisible = pVisibleCount > 0;
                const opacity = isDimmed ? 0.18 : (hasVisible ? 1 : 0.14);
                const color = sectorColor(p.id);
                ctx.save();
                ctx.globalAlpha = opacity;
                ctx.translate(p.x, p.y);
                ellipse(0, 0, p.radius + 22, p.radius + 22, color, isFocused || isHover ? 0.52 : 0.18, 0.8, [2, 6]);
                ellipse(0, 0, p.radius + 46, p.radius + 46, color, isFocused || isHover ? 0.36 : 0.10, 0.8, [2, 8]);
                circle(0, 0, p.radius + 54, color, null, 1, isFocused || isHover ? 0.13 : 0.035);
                const grad = ctx.createRadialGradient(-p.radius * 0.32, -p.radius * 0.34, p.radius * 0.1, 0, 0, p.radius * 1.1);
                grad.addColorStop(0, "rgba(255,255,255,0.14)");
                grad.addColorStop(0.28, color);
                grad.addColorStop(1, bg);
                circle(0, 0, p.radius, grad, color, isFocused || isHover ? 2.2 : 1.35, 0.92);
                drawSectorTexture(p, color);
                const drawMoon = (t) => {
                    const visible = isMoonVisible(t);
                    const isHoveredMoon = hoverTech && hoverTech.pid === t.pid;
                    ctx.save();
                    ctx.globalAlpha = visible ? (isFocused ? 0.96 : 0.72) : 0.07;
                    ctx.strokeStyle = color;
                    ctx.lineWidth = isHoveredMoon ? 1.3 : 0.65;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(t.lx, t.ly);
                    ctx.stroke();
                    if (isHoveredMoon) {
                        circle(t.lx, t.ly, 24, color, null, 1, 0.16);
                    }
                    ctx.beginPath();
                    ctx.arc(t.lx, t.ly, isHoveredMoon ? 13.5 : (visible ? 10.5 : 6.5), 0, Math.PI * 2);
                    ctx.fillStyle = t.evidence === "direct" ? color : bg;
                    ctx.fill();
                    ctx.strokeStyle = color;
                    ctx.lineWidth = t.evidence === "analogue" ? 0.9 : 1.25;
                    if (t.evidence === "analogue")
                        ctx.setLineDash([2, 2]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    if (visible && (isFocused || queryActive || isHoveredMoon))
                        drawMoonLabel(t, color, isHoveredMoon);
                    ctx.restore();
                };
                p.innerMoons.forEach(drawMoon);
                p.outerMoons.forEach(drawMoon);
                const dx = p.x - CX, dy = p.y - CY;
                const len = Math.hypot(dx, dy) || 1;
                const ux = dx / len, uy = dy / len;
                const lx = ux * (p.radius + 31);
                const ly = uy * (p.radius + 31);
                ctx.font = `${isFocused || isHover ? 650 : 500} 13px JetBrains Mono, monospace`;
                ctx.fillStyle = color;
                ctx.globalAlpha = isFocused || isHover ? 0.98 : 0.74;
                ctx.textAlign = ux > 0.3 ? "left" : (ux < -0.3 ? "right" : "center");
                ctx.fillText(p.label.toUpperCase(), lx, ly);
                ctx.font = "9px JetBrains Mono, monospace";
                ctx.fillStyle = faint;
                ctx.globalAlpha = 0.7;
                const label = pVisibleCount !== p.allTechs.length ? `${pVisibleCount}/${p.allTechs.length} VISIBLE` : `${p.allTechs.length} ENTRIES`;
                ctx.fillText(label, lx, ly + 14);
                ctx.restore();
            });
            ctx.restore();
        };
        const resizeObserver = new ResizeObserver(draw);
        resizeObserver.observe(canvas);
        draw();
        return () => {
            disposed = true;
            resizeObserver.disconnect();
        };
    }, [
        W, H, CX, CY, planets, camera.zoom, camera.tx, camera.ty, focused,
        activeLens, highlightChem, mapSearch, twinkles, hoverTech?.pid,
        hoverPlanet, readinessSignature(planets, isMoonVisible)
    ]);
    return (React.createElement("canvas", { ref: canvasRef, className: "galaxy-canvas", role: "application", tabIndex: "0", "aria-label": "Interactive process atlas map. Click planets to focus sectors. Search or focus a planet to open technology moons.", onPointerMove: handlePointerMove, onPointerLeave: handlePointerLeave, onClick: handleClick, onKeyDown: (event) => {
            if (event.key === "Escape") {
                setFocused(null);
                setHoverTech(null);
                setHoverPlanet(null);
            }
        } }));
}
function readinessSignature(planets, isMoonVisible) {
    // Keeps the canvas redraw dependency cheap and deterministic when filters change.
    return planets.map(p => p.allTechs.filter(isMoonVisible).length).join("|");
}
function MapCameraControls({ focusedPlanet, navCamera, onNudge, onZoom, onReset, onFullOrbit }) {
    return (React.createElement("div", { className: "map-camera-controls", "aria-label": "Map camera controls" },
        React.createElement("div", { className: "mcc-head" },
            React.createElement("span", null, "Camera"),
            React.createElement("b", null, focusedPlanet ? focusedPlanet.label : "Full orbit")),
        React.createElement("div", { className: "mcc-pad", "aria-label": "Pan map" },
            React.createElement("span", null),
            React.createElement("button", { type: "button", onClick: () => onNudge(0, 90), "aria-label": "Pan map up" }, "\u2191"),
            React.createElement("span", null),
            React.createElement("button", { type: "button", onClick: () => onNudge(110, 0), "aria-label": "Pan map left" }, "\u2190"),
            React.createElement("button", { type: "button", onClick: onReset, "aria-label": "Reset camera pan and zoom" }, "\u233E"),
            React.createElement("button", { type: "button", onClick: () => onNudge(-110, 0), "aria-label": "Pan map right" }, "\u2192"),
            React.createElement("span", null),
            React.createElement("button", { type: "button", onClick: () => onNudge(0, -90), "aria-label": "Pan map down" }, "\u2193"),
            React.createElement("span", null)),
        React.createElement("div", { className: "mcc-zoom", "aria-label": "Zoom map" },
            React.createElement("button", { type: "button", onClick: () => onZoom(-0.12), "aria-label": "Zoom out" }, "\u2212"),
            React.createElement("span", null,
                Math.round(navCamera.zoomScale * 100),
                "%"),
            React.createElement("button", { type: "button", onClick: () => onZoom(0.12), "aria-label": "Zoom in" }, "+")),
        React.createElement("button", { type: "button", className: "mcc-wide", onClick: onFullOrbit }, "Full orbit")));
}
function SectorJumpNav({ sectors, focused, planets, onFocus, onFullOrbit }) {
    const countFor = (id) => planets.find(p => p.id === id)?.allTechs.length || 0;
    return (React.createElement("div", { className: "sector-jump-nav", "aria-label": "Jump between sector systems" },
        React.createElement("button", { type: "button", className: !focused ? "active" : "", onClick: onFullOrbit }, "All"),
        sectors.map(s => (React.createElement("button", { type: "button", key: s.id, className: focused === s.id ? "active" : "", "data-sector": s.id, onClick: () => onFocus(s.id), title: `${s.label} · ${countFor(s.id)} moons` },
            React.createElement("span", { className: "sjn-dot" }),
            React.createElement("span", null, s.label))))));
}
function MobileMapConsole({ activeTab, setActiveTab, focusedPlanet, sectors, planets, focused, onFocus, onFullOrbit, navCamera, onNudge, onZoom, onReset, activeLens, setActiveLens, readinessMin, setReadinessMin, evidenceFilter, setEvidenceFilter, visibleCount, totalCount, hoverTech, hoverPlanet, clearOrbitFilters }) {
    const tabs = [
        ["camera", "Camera"],
        ["sectors", "Sectors"],
        ["readout", "Readout"],
        ["filter", "Filter"],
    ];
    const countFor = (id) => planets.find(p => p.id === id)?.allTechs.length || 0;
    const hoveredPlanet = hoverPlanet ? planets.find(p => p.id === hoverPlanet) : null;
    return (React.createElement("div", { className: "mobile-map-console", "aria-label": "Mobile map controls" },
        React.createElement("div", { className: "mmc-tabs", role: "tablist", "aria-label": "Map control tabs" }, tabs.map(([id, label]) => (React.createElement("button", { key: id, type: "button", role: "tab", "aria-selected": activeTab === id, className: activeTab === id ? "active" : "", onClick: () => setActiveTab(id) }, label)))),
        activeTab === "camera" && (React.createElement("div", { className: "mmc-panel mmc-camera" },
            React.createElement("div", { className: "mmc-title" },
                React.createElement("span", null, "Camera"),
                React.createElement("b", null, focusedPlanet ? focusedPlanet.label : "Full orbit")),
            React.createElement("div", { className: "mmc-pad" },
                React.createElement("button", { type: "button", onClick: () => onNudge(0, 86) }, "\u2191"),
                React.createElement("button", { type: "button", onClick: () => onNudge(92, 0) }, "\u2190"),
                React.createElement("button", { type: "button", onClick: onReset }, "\u233E"),
                React.createElement("button", { type: "button", onClick: () => onNudge(-92, 0) }, "\u2192"),
                React.createElement("button", { type: "button", onClick: () => onNudge(0, -86) }, "\u2193")),
            React.createElement("div", { className: "mmc-zoom" },
                React.createElement("button", { type: "button", onClick: () => onZoom(-0.12) }, "\u2212"),
                React.createElement("span", null,
                    Math.round(navCamera.zoomScale * 100),
                    "%"),
                React.createElement("button", { type: "button", onClick: () => onZoom(0.12) }, "+")),
            React.createElement("button", { type: "button", className: "mmc-wide", onClick: onFullOrbit }, "Full orbit"))),
        activeTab === "sectors" && (React.createElement("div", { className: "mmc-panel mmc-sectors" },
            React.createElement("button", { type: "button", className: !focused ? "active" : "", onClick: onFullOrbit },
                "All sectors \u00B7 ",
                totalCount),
            sectors.map(s => React.createElement("button", { key: s.id, type: "button", className: focused === s.id ? "active" : "", "data-sector": s.id, onClick: () => onFocus(s.id) },
                React.createElement("span", { className: "sjn-dot" }),
                s.label,
                React.createElement("b", null, countFor(s.id)))))),
        activeTab === "readout" && (React.createElement("div", { className: "mmc-panel mmc-readout" },
            React.createElement("div", { className: "mmc-title" },
                React.createElement("span", null, "Readout"),
                React.createElement("b", null,
                    visibleCount,
                    "/",
                    totalCount,
                    " moons")),
            React.createElement("p", null, focusedPlanet ? `${focusedPlanet.label}: ${SECTOR_DESC[focusedPlanet.id]}` : "Pick a sector planet or search for a technology. Hovering or tapping a moon opens its process card."),
            hoverTech && React.createElement("div", { className: "mmc-callout" },
                React.createElement("b", null, hoverTech.name),
                React.createElement("span", null,
                    hoverTech.pid,
                    " \u00B7 ",
                    hoverTech.chemical,
                    " \u00B7 ",
                    hoverTech.evidence)),
            !hoverTech && hoveredPlanet && React.createElement("div", { className: "mmc-callout" },
                React.createElement("b", null, hoveredPlanet.label),
                React.createElement("span", null,
                    hoveredPlanet.allTechs.length,
                    " process moons")))),
        activeTab === "filter" && (React.createElement("div", { className: "mmc-panel mmc-filter" },
            React.createElement("label", { className: "mmc-range" },
                React.createElement("span", null, "TRL floor"),
                React.createElement("b", null, readinessMin),
                React.createElement("input", { type: "range", min: "1", max: "9", value: readinessMin, onChange: e => setReadinessMin(Number(e.target.value)) })),
            React.createElement("div", { className: "mmc-filter-grid" }, ATLAS_LENSES.map(lens => React.createElement("button", { key: lens.id, type: "button", className: activeLens === lens.id ? "active" : "", onClick: () => setActiveLens(lens.id) },
                lens.code,
                " \u00B7 ",
                lens.label))),
            React.createElement("div", { className: "mmc-filter-grid evidence" }, ["direct", "roadmap", "analogue"].map(ev => React.createElement("button", { key: ev, type: "button", className: evidenceFilter === ev ? "active" : "", "data-evidence": ev, onClick: () => setEvidenceFilter(evidenceFilter === ev ? null : ev) }, ev))),
            React.createElement("button", { type: "button", className: "mmc-wide", onClick: clearOrbitFilters }, "Clear filters")))));
}
function OrbitLensDock({ activeLens, sectors, entries, planets, chems, unitOps, bottlenecks, focused, setFocused, highlightChem, setHighlightChem, highlightOp, setHighlightOp, highlightBottleneck, setHighlightBottleneck, readinessMin, setReadinessMin, evidenceFilter, setEvidenceFilter, visibleCount, filterCount, clearOrbitFilters, onOpenAtlas }) {
    const lens = lensById(activeLens);
    const sectorItems = planets.map(p => ({ id: p.id, label: p.label, count: p.allTechs.length, avg: p.avgR }));
    const topChems = chems.slice(0, 12).map(c => ({ ...c, count: entries.filter(e => e.chemical === c.sym).length })).filter(c => c.count > 0);
    const opItems = unitOps.map(o => ({ ...o, count: entries.filter(e => e.unitOp === o.id).length }));
    const bottleneckItems = bottlenecks.slice(0, 10).map(b => ({ ...b, count: entries.filter(e => e.bottleneck === b.id).length })).filter(b => b.count > 0).sort((a, b) => b.count - a.count).slice(0, 8);
    const atlasFilterForLens = () => {
        if (focused)
            return { sector: focused };
        if (activeLens === "chemicals" && highlightChem)
            return { chem: highlightChem };
        if (activeLens === "unitops" && highlightOp)
            return { op: highlightOp };
        if (activeLens === "bottlenecks" && highlightBottleneck)
            return { bn: highlightBottleneck };
        if (activeLens === "evidence" && evidenceFilter)
            return { ev: evidenceFilter };
        return {};
    };
    const showOpenIndex = focused || highlightChem || highlightOp || highlightBottleneck || evidenceFilter;
    return (React.createElement("div", { className: "orbit-lens-dock", "data-lens": activeLens },
        React.createElement("div", { className: "old-head" },
            React.createElement("span", { className: "meta" },
                lens.code,
                " \u00B7 ",
                lens.label),
            React.createElement("span", { className: "old-count" },
                visibleCount,
                "/",
                entries.length,
                " moons")),
        React.createElement("div", { className: "old-title" }, lens.title),
        activeLens === "sectors" && (React.createElement("div", { className: "old-grid sectors" }, sectorItems.map(s => (React.createElement("button", { key: s.id, className: focused === s.id ? "active" : "", "data-sector": s.id, onClick: () => setFocused(focused === s.id ? null : s.id) },
            React.createElement("span", { className: "old-dot" }),
            React.createElement("span", null, s.label),
            React.createElement("b", null, s.count)))))),
        activeLens === "chemicals" && (React.createElement("div", { className: "old-grid chemicals" }, topChems.map(c => (React.createElement("button", { key: c.sym, className: highlightChem === c.sym ? "active" : "", "data-sector": c.color, onClick: () => { setHighlightChem(highlightChem === c.sym ? null : c.sym); setHighlightOp(null); setHighlightBottleneck(null); } },
            React.createElement("span", null, c.sym),
            React.createElement("b", null, c.count)))))),
        activeLens === "unitops" && (React.createElement("div", { className: "old-grid unitops" }, opItems.map(o => (React.createElement("button", { key: o.id, className: highlightOp === o.id ? "active" : "", onClick: () => { setHighlightOp(highlightOp === o.id ? null : o.id); setHighlightChem(null); setHighlightBottleneck(null); } },
            React.createElement("span", null, o.label),
            React.createElement("b", null, o.count)))))),
        activeLens === "bottlenecks" && (React.createElement("div", { className: "old-grid bottlenecks" }, bottleneckItems.map(b => (React.createElement("button", { key: b.id, className: highlightBottleneck === b.id ? "active" : "", onClick: () => { setHighlightBottleneck(highlightBottleneck === b.id ? null : b.id); setHighlightChem(null); setHighlightOp(null); } },
            React.createElement("span", null, b.label),
            React.createElement("b", null, b.count)))))),
        activeLens === "readiness" && (React.createElement("div", { className: "old-readiness" },
            React.createElement("label", null,
                React.createElement("span", null, "Readiness floor"),
                React.createElement("strong", null,
                    "TRL \u2265 ",
                    readinessMin)),
            React.createElement("input", { type: "range", min: "1", max: "9", value: readinessMin, onChange: e => setReadinessMin(Number(e.target.value)) }),
            React.createElement("p", null, "Raise the floor to hide earlier-stage moons and surface technologies closer to deployment."))),
        activeLens === "evidence" && (React.createElement("div", { className: "old-grid evidence" }, ["direct", "roadmap", "analogue"].map(ev => (React.createElement("button", { key: ev, className: evidenceFilter === ev ? "active" : "", "data-evidence": ev, onClick: () => setEvidenceFilter(evidenceFilter === ev ? null : ev) },
            React.createElement("span", { className: "old-dot" }),
            React.createElement("span", null, ev),
            React.createElement("b", null, entries.filter(e => e.evidence === ev).length)))))),
        React.createElement("div", { className: "old-actions" },
            filterCount > 0 && React.createElement("button", { onClick: clearOrbitFilters }, "Clear layer filters \u00D7"),
            showOpenIndex && React.createElement("button", { onClick: () => onOpenAtlas(atlasFilterForLens()) }, "Open matching index \u2192"))));
}
function FocusReadout({ planet, activeLens, setActiveLens, onOpenLayer, onClose, onOpenTech, onOpenAtlas, bottlenecks }) {
    const bnTally = {};
    planet.allTechs.forEach(t => { bnTally[t.bottleneck] = (bnTally[t.bottleneck] || 0) + 1; });
    const bnSorted = Object.entries(bnTally).sort((a, b) => b[1] - a[1]).slice(0, 4);
    return (React.createElement("div", { className: "readout focused", "data-sector": planet.id },
        React.createElement("div", { className: "readout-head" },
            React.createElement("div", { className: "meta" },
                "\u25BC SECTOR \u00B7 ",
                planet.id.toUpperCase()),
            React.createElement("div", { className: "readout-title", style: { color: `var(--c-${planet.id})` } }, planet.label),
            React.createElement("div", { className: "meta dim" },
                planet.allTechs.length,
                " entries \u00B7 TRL \u00F8 ",
                planet.avgR.toFixed(1))),
        React.createElement("div", { className: "readout-body" },
            React.createElement("p", null, SECTOR_DESC[planet.id])),
        React.createElement(LensModule, { activeLens: activeLens, setActiveLens: setActiveLens, onOpenLayer: onOpenLayer, compact: true }),
        React.createElement("div", { className: "readout-section" },
            React.createElement("div", { className: "meta" }, "Top bottlenecks"),
            React.createElement("div", { className: "readout-bn" }, bnSorted.map(([bnId, n]) => {
                const bn = bottlenecks.find(b => b.id === bnId);
                return (React.createElement("div", { key: bnId, className: "bn-row" },
                    React.createElement("span", { className: "bn-row-label" }, bn?.label || bnId),
                    React.createElement("span", { className: "bn-row-bar" },
                        React.createElement("span", { style: { width: `${(n / planet.allTechs.length) * 100}%`, background: `var(--c-${planet.id})` } })),
                    React.createElement("span", { className: "bn-row-n meta" }, n)));
            }))),
        React.createElement("div", { className: "readout-section" },
            React.createElement("div", { className: "meta" }, "Entries \u00B7 click to open"),
            React.createElement("div", { className: "readout-techlist" }, planet.allTechs.map(t => (React.createElement("button", { key: t.pid, className: "rt-row", onClick: () => onOpenTech(t) },
                React.createElement("span", { className: "rt-pid" }, t.pid),
                React.createElement("span", { className: "rt-name" }, t.name),
                React.createElement("span", { className: "rt-ready meta tnum" },
                    t.trl,
                    "\u00B7",
                    t.mrl,
                    "\u00B7",
                    t.irl),
                React.createElement("span", { className: `rt-dot rt-${t.evidence}`, style: { borderColor: `var(--c-${planet.id})` } })))))),
        React.createElement("div", { className: "readout-actions" },
            React.createElement("button", { className: "readout-back", onClick: onClose }, "\u2190 Back to full orbit"),
            React.createElement("button", { className: "readout-open-index", onClick: () => onOpenAtlas(planet.id) }, "Open filtered index \u2192"))));
}
window.GalaxyMap = GalaxyMap;
