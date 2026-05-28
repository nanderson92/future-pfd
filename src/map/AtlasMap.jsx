import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ENTRIES, SECTORS } from "../data/atlasData.js";
import { matchesEntry, sectorById } from "../data/atlasHelpers.js";
import { routeHref } from "../app/routes.js";
import MapCanvas from "./MapCanvas.jsx";
import MapControls from "./MapControls.jsx";
import MapSearch from "./MapSearch.jsx";
import SectorPanel from "./SectorPanel.jsx";
import TechnologyModal from "./TechnologyModal.jsx";
import { clamp, createMapGeometry, fitBounds, safeAreaForViewport, screenToWorld } from "./mapGeometry.js";

export default function AtlasMap({ initialQuery = "" }) {
  const geometry = useMemo(() => createMapGeometry(ENTRIES, SECTORS), []);
  const [size, setSize] = useState({ width: 1000, height: 680 });
  const [camera, setCamera] = useState({ zoom: 0.58, tx: 0, ty: 0 });
  const [focused, setFocused] = useState("");
  const [lens, setLens] = useState("sectors");
  const [query, setQuery] = useState(initialQuery);
  const [hoverTarget, setHoverTarget] = useState(null);
  const [openEntry, setOpenEntry] = useState(null);
  const [mobileTab, setMobileTab] = useState("camera");

  const cameraRef = useRef(camera);
  const animationRef = useRef(0);
  const didFitRef = useRef(false);

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  const matchingEntries = useMemo(() => {
    if (!query.trim()) return ENTRIES;
    return ENTRIES.filter((entry) => matchesEntry(entry, query));
  }, [query]);

  const matchingIds = useMemo(() => new Set(matchingEntries.map((entry) => entry.pid)), [matchingEntries]);
  const focusedPlanet = focused ? geometry.planetById.get(focused) : null;

  const fitTarget = useCallback((sectorId = focused) => {
    const bounds = sectorId ? geometry.planetById.get(sectorId)?.bounds : geometry.fullBounds;
    return fitBounds(bounds || geometry.fullBounds, safeAreaForViewport(size), size, {
      padding: sectorId ? 0.88 : 0.9,
      maxZoom: sectorId ? 1.65 : 0.92
    });
  }, [focused, geometry, size]);

  const animateCamera = useCallback((target) => {
    cancelAnimationFrame(animationRef.current);
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) {
      setCamera(target);
      return;
    }
    const start = cameraRef.current;
    const startTime = performance.now();
    const duration = 520;

    const tick = (now) => {
      const t = clamp((now - startTime) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = {
        zoom: start.zoom + (target.zoom - start.zoom) * eased,
        tx: start.tx + (target.tx - start.tx) * eased,
        ty: start.ty + (target.ty - start.ty) * eased
      };
      setCamera(next);
      if (t < 1) animationRef.current = requestAnimationFrame(tick);
    };
    animationRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!didFitRef.current && size.width > 0 && size.height > 0) {
      didFitRef.current = true;
      setCamera(fitTarget(""));
    }
  }, [fitTarget, size]);

  useEffect(() => () => cancelAnimationFrame(animationRef.current), []);

  const focusSector = useCallback((sectorId) => {
    setFocused(sectorId);
    animateCamera(fitTarget(sectorId));
  }, [animateCamera, fitTarget]);

  const fullOrbit = useCallback(() => {
    setFocused("");
    animateCamera(fitTarget(""));
  }, [animateCamera, fitTarget]);

  const resetView = useCallback(() => {
    animateCamera(fitTarget(focused));
  }, [animateCamera, fitTarget, focused]);

  const panCamera = useCallback((dx, dy) => {
    setCamera((prev) => ({ ...prev, tx: prev.tx + dx, ty: prev.ty + dy }));
  }, []);

  const zoomCamera = useCallback((factor, anchor) => {
    setCamera((prev) => {
      const nextZoom = clamp(prev.zoom * factor, 0.24, 2.4);
      const pivot = anchor || { x: size.width / 2, y: size.height / 2 };
      const world = screenToWorld(pivot, prev);
      return {
        zoom: nextZoom,
        tx: pivot.x - world.x * nextZoom,
        ty: pivot.y - world.y * nextZoom
      };
    });
  }, [size]);

  const openSuggestion = useCallback((entry) => {
    focusSector(entry.sector);
    setOpenEntry(entry);
  }, [focusSector]);

  const openIndex = useCallback((sectorId) => {
    window.location.hash = routeHref("index", { sector: sectorId || focused || "" });
  }, [focused]);

  const searchNoResults = query.trim().length > 0 && matchingEntries.length === 0;

  return (
    <section className="atlas-map-page" aria-labelledby="map-title">
      <header className="map-header">
        <div>
          <p className="eyebrow">Mission control / process atlas</p>
          <h1 id="map-title">Future Systems Atlas Map</h1>
        </div>
        <div className="map-header-actions">
          <a href="#guide">Guide</a>
          <a href="#index">Index</a>
          <a href="#sources">Sources</a>
        </div>
      </header>

      <div className="map-app-shell">
        <aside className="map-left-panel">
          <MapSearch
            value={query}
            onChange={setQuery}
            count={matchingEntries.length}
            total={ENTRIES.length}
            noResults={searchNoResults}
            suggestions={matchingEntries}
            onOpenSuggestion={openSuggestion}
          />
          <MapControls
            sectors={SECTORS}
            focused={focused}
            lens={lens}
            onLens={setLens}
            onFocus={focusSector}
            onFullOrbit={fullOrbit}
            onZoom={zoomCamera}
            onPan={panCamera}
            onResetView={resetView}
          />
        </aside>

        <div className="map-stage">
          <MapCanvas
            geometry={geometry}
            camera={camera}
            lens={lens}
            focused={focused}
            searchTerm={query}
            matchingIds={matchingIds}
            hoverTarget={hoverTarget}
            onHover={setHoverTarget}
            onPlanetClick={focusSector}
            onMoonClick={setOpenEntry}
            onPan={panCamera}
            onZoom={zoomCamera}
            onSize={setSize}
          />
          <div className="map-stage-status" aria-live="polite">
            <span>{focusedPlanet ? `${sectorById[focused]?.label} focus` : "Full orbit"}</span>
            <span>{lens} lens</span>
            <span>{query ? `${matchingEntries.length} matches` : `${ENTRIES.length} cards`}</span>
          </div>
        </div>

        <SectorPanel
          focusedPlanet={focusedPlanet}
          hoverTarget={hoverTarget}
          lens={lens}
          onOpenEntry={setOpenEntry}
          onOpenIndex={openIndex}
        />
      </div>

      <MobileMapConsole
        activeTab={mobileTab}
        setActiveTab={setMobileTab}
        sectors={SECTORS}
        focused={focused}
        focusedPlanet={focusedPlanet}
        lens={lens}
        setLens={setLens}
        onFocus={focusSector}
        onFullOrbit={fullOrbit}
        onZoom={zoomCamera}
        onPan={panCamera}
        onResetView={resetView}
        hoverTarget={hoverTarget}
        query={query}
        setQuery={setQuery}
        count={matchingEntries.length}
        total={ENTRIES.length}
        noResults={searchNoResults}
        suggestions={matchingEntries}
        onOpenSuggestion={openSuggestion}
      />

      {openEntry && <TechnologyModal entry={openEntry} onClose={() => setOpenEntry(null)} />}
    </section>
  );
}

function MobileMapConsole(props) {
  const {
    activeTab,
    setActiveTab,
    sectors,
    focused,
    focusedPlanet,
    lens,
    setLens,
    onFocus,
    onFullOrbit,
    onZoom,
    onPan,
    onResetView,
    hoverTarget,
    query,
    setQuery,
    count,
    total,
    noResults,
    suggestions,
    onOpenSuggestion
  } = props;

  const tabs = [
    ["camera", "Camera"],
    ["sectors", "Sectors"],
    ["readout", "Readout"],
    ["filters", "Filters"]
  ];

  return (
    <div className="mobile-map-console">
      <MapSearch
        value={query}
        onChange={setQuery}
        count={count}
        total={total}
        noResults={noResults}
        suggestions={suggestions}
        onOpenSuggestion={onOpenSuggestion}
      />
      <div className="mobile-tabs" role="tablist" aria-label="Mobile map controls">
        {tabs.map(([id, label]) => (
          <button type="button" role="tab" aria-selected={activeTab === id} className={activeTab === id ? "active" : ""} key={id} onClick={() => setActiveTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === "camera" && (
        <div className="mobile-panel">
          <div className="control-row">
            <button type="button" onClick={() => onZoom(1.16)}>+</button>
            <button type="button" onClick={() => onZoom(0.86)}>-</button>
            <button type="button" onClick={onResetView}>Refit</button>
            <button type="button" onClick={onFullOrbit}>Full Orbit</button>
          </div>
          <div className="control-row">
            <button type="button" onClick={() => onPan(70, 0)}>Left</button>
            <button type="button" onClick={() => onPan(-70, 0)}>Right</button>
            <button type="button" onClick={() => onPan(0, 70)}>Up</button>
            <button type="button" onClick={() => onPan(0, -70)}>Down</button>
          </div>
        </div>
      )}

      {activeTab === "sectors" && (
        <div className="mobile-panel sector-scroll">
          <button type="button" className={!focused ? "active" : ""} onClick={onFullOrbit}>All sectors</button>
          {sectors.map((sector) => (
            <button type="button" data-sector={sector.id} className={focused === sector.id ? "active" : ""} key={sector.id} onClick={() => onFocus(sector.id)}>
              {sector.label} <b>{sector.count}</b>
            </button>
          ))}
        </div>
      )}

      {activeTab === "readout" && (
        <div className="mobile-panel readout-text">
          <strong>{hoverTarget?.entry?.name || focusedPlanet?.label || "Full Orbit"}</strong>
          <span>{hoverTarget?.entry?.description || (focusedPlanet ? `${focusedPlanet.moons.length} process moons in focus.` : "Tap a sector or search to inspect process moons.")}</span>
        </div>
      )}

      {activeTab === "filters" && (
        <div className="mobile-panel lens-scroll">
          {["sectors", "chemicals", "unitops", "bottlenecks", "readiness", "evidence"].map((item) => (
            <button type="button" className={lens === item ? "active" : ""} key={item} onClick={() => setLens(item)}>
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
