/* ────────────────────────────────────────────────────────────
   Future Systems Atlas — App shell + Tweaks
   ──────────────────────────────────────────────────────────── */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "typography": "grotesque",
  "motion": "on",
  "accent": "energy"
}/*EDITMODE-END*/;

function OrbitDock() {
  const sectors = window.FSA?.SECTORS || [];
  const [orbitState, setOrbitState] = React.useState({ activeLens: "sectors", focused: null, visibleCount: null });
  const lenses = [
    { id: "sectors", label: "Sectors", code: "01" },
    { id: "chemicals", label: "Chem", code: "02" },
    { id: "unitops", label: "Ops", code: "03" },
    { id: "bottlenecks", label: "Limits", code: "04" },
    { id: "readiness", label: "Ready", code: "05" },
    { id: "evidence", label: "Proof", code: "06" },
  ];
  React.useEffect(() => {
    const onState = (event) => {
      setOrbitState((prev) => ({ ...prev, ...(event.detail || {}) }));
    };
    window.addEventListener("fsa:orbit-state", onState);
    return () => window.removeEventListener("fsa:orbit-state", onState);
  }, []);
  const jumpTop = () => {
    const el = document.getElementById("top");
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  };
  const resetOrbit = () => {
    window.dispatchEvent(new CustomEvent("fsa:reset-orbit"));
    jumpTop();
  };
  const focusSector = (id) => {
    window.dispatchEvent(new CustomEvent("fsa:focus-sector", { detail: id }));
    jumpTop();
  };
  const setLens = (id) => {
    window.dispatchEvent(new CustomEvent("fsa:set-lens", { detail: id }));
    jumpTop();
  };
  return (
    <aside className="orbit-dock" aria-label="Orbit quick controls">
      <button className="orbit-dock-hub" onClick={resetOrbit} title="Return to full orbit">
        <span>FSA</span>
        <b>MAP</b>
      </button>
      <div className="orbit-dock-block">
        <span className="orbit-dock-label">Planets</span>
        <div className="orbit-dock-planets">
          {sectors.map(s => (
            <button
              key={s.id}
              className={orbitState.focused === s.id ? "active" : ""}
              data-sector={s.id}
              onClick={() => focusSector(s.id)}
              title={`Focus ${s.label}`}
              aria-label={`Focus ${s.label} sector`}>
              <span />
            </button>
          ))}
        </div>
      </div>
      <div className="orbit-dock-block">
        <span className="orbit-dock-label">Lenses</span>
        <div className="orbit-dock-lenses">
          {lenses.map(l => (
            <button
              key={l.id}
              className={orbitState.activeLens === l.id ? "active" : ""}
              onClick={() => setLens(l.id)}
              title={`Switch to ${l.label} lens`}
              aria-label={`Switch to ${l.label} lens`}>
              <span>{l.code}</span>
            </button>
          ))}
        </div>
      </div>
      <a className="orbit-dock-index" href="#atlas" title="Open full index" aria-label="Open full atlas index">IDX</a>
    </aside>
  );
}

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Apply theme + typography to <body>
  React.useEffect(() => {
    document.body.setAttribute("data-theme", t.theme);
    document.body.setAttribute("data-mono", t.typography);
    document.body.setAttribute("data-motion", t.motion);
    document.body.setAttribute("data-accent", t.accent);
  }, [t.theme, t.typography, t.motion, t.accent]);

  return (
    <>
      <Topology />
      <CoordinateGutters />
      <Nav />
      <OrbitDock />
      <main className="sheet">
        <GalaxyMap />
        <FieldGuide />
        <CaseStudies />
        <SystemMap />
        <ChemicalSpine />
        <UnitOps />
        <Readiness />
        <Pathways />
        <Atlas />
        <Evidence />
        <AuthorNote />
      </main>
      <Footer />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Surface">
          <window.TweakRadio
            label="Theme"
            value={t.theme}
            onChange={v => setTweak("theme", v)}
            options={[{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }]}
          />
        </window.TweakSection>
        <window.TweakSection title="Typography">
          <window.TweakSelect
            label="Pairing"
            value={t.typography}
            onChange={v => setTweak("typography", v)}
            options={[
              { value: "grotesque", label: "Grotesque + Mono (default)" },
              { value: "serif",     label: "Serif headlines + Mono meta" },
              { value: "mono",      label: "All mono (terminal)" },
            ]}
          />
        </window.TweakSection>
        <window.TweakSection title="Motion">
          <window.TweakRadio
            label="Ambient motion"
            value={t.motion}
            onChange={v => setTweak("motion", v)}
            options={[{ value: "on", label: "On" }, { value: "off", label: "Off" }]}
          />
        </window.TweakSection>
        <window.TweakSection title="Accent">
          <window.TweakColor
            label="Hero accent"
            value={t.accent}
            onChange={v => setTweak("accent", v)}
            options={[
              { value: "energy",    color: "oklch(0.80 0.155 80)" },
              { value: "carbon",    color: "oklch(0.78 0.135 195)" },
              { value: "water",     color: "oklch(0.76 0.145 245)" },
              { value: "materials", color: "oklch(0.76 0.155 335)" },
              { value: "manufacturing", color: "oklch(0.80 0.145 150)" },
              { value: "cities",    color: "oklch(0.78 0.155 35)" },
              { value: "space",     color: "oklch(0.76 0.155 290)" },
            ]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

/* ── Coordinate gutters (top/bottom/left/right rules) ─────── */
function CoordinateGutters() {
  return (
    <>

    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
