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
  const returnToMap = (pending) => {
    window.FSA_PENDING_ORBIT = pending || {};
    window.location.hash = "map";
  };
  const resetOrbit = () => returnToMap({ reset: true });
  const focusSector = (id) => returnToMap({ sector: id, lens: "sectors" });
  const setLens = (id) => returnToMap({ lens: id });
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


function getAtlasRoute() {
  const raw = (window.location.hash || "#map").replace(/^#/, "").trim().toLowerCase();
  if (!raw || raw === "top" || raw === "home") return "map";
  const valid = new Set(["map", "guide", "cases", "system", "chemicals", "unitops", "readiness", "pathways", "atlas", "sources", "about"]);
  return valid.has(raw) ? raw : "map";
}

function useAtlasRoute() {
  const [route, setRoute] = React.useState(getAtlasRoute);
  React.useEffect(() => {
    const onHash = () => setRoute(getAtlasRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

const SUPPORT_PAGE_META = {
  guide: { code: "FSA · GUIDE", title: "How to read the atlas", lede: "The map stays primary. This page explains the legend, evidence language, and process-engineering lenses." },
  cases: { code: "FSA · CASES", title: "Representative process cases", lede: "Selected examples that show how a future-looking capability becomes chemicals, operations, bottlenecks, and deployment rules." },
  system: { code: "FSA · SYSTEM", title: "System architecture", lede: "The hidden stack behind the visible future: resources, chemicals, unit operations, manufacturing systems, infrastructure, and deployment pathways." },
  chemicals: { code: "FSA · CHEMICALS", title: "Chemical spine", lede: "Recurring molecules and materials that connect sectors which look unrelated on the surface." },
  unitops: { code: "FSA · UNIT OPS", title: "Unit-operation layer", lede: "Separations, reactions, heat transfer, deposition, QA, and manufacturing operations that turn the future into an engineering problem." },
  readiness: { code: "FSA · READINESS", title: "Readiness and scale", lede: "TRL, MRL, and IRL separate proof of science from repeatable manufacturing and deployable infrastructure." },
  pathways: { code: "FSA · BOTTLENECKS", title: "Scale-up pathways", lede: "Where each technology gets stuck: cost, dilute feeds, durability, siting, safety, yield, permitting, or infrastructure." },
  atlas: { code: "FSA · INDEX", title: "Full process card index", lede: "The database layer beneath the orbit map. Search, filter, and open individual process cards." },
  sources: { code: "FSA · SOURCES", title: "Evidence layer", lede: "Source posture, confidence language, and the evidence trail behind the atlas." },
  about: { code: "FSA · ABOUT", title: "Builder note", lede: "Why this exists as an engineering artifact and portfolio system." },
};

function SupportPage({ route }) {
  const meta = SUPPORT_PAGE_META[route] || SUPPORT_PAGE_META.guide;
  const renderPage = () => {
    if (route === "guide") return <FieldGuide />;
    if (route === "cases") return <CaseStudies />;
    if (route === "system") return <SystemMap />;
    if (route === "chemicals") return <ChemicalSpine />;
    if (route === "unitops") return <UnitOps />;
    if (route === "readiness") return <Readiness />;
    if (route === "pathways") return <Pathways />;
    if (route === "atlas") return <Atlas />;
    if (route === "sources") return <><Evidence /><AuthorNote /></>;
    if (route === "about") return <AuthorNote />;
    return <FieldGuide />;
  };
  return (
    <div className="support-page-shell" data-page={route}>
      <div className="support-page-command">
        <a className="support-map-return" href="#map">← Return to orbit map</a>
        <div>
          <span className="meta">{meta.code}</span>
          <h1>{meta.title}</h1>
          <p>{meta.lede}</p>
        </div>
      </div>
      {renderPage()}
    </div>
  );
}

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const route = useAtlasRoute();
  const isMap = route === "map";

  // Apply theme + typography to <body>
  React.useEffect(() => {
    document.body.setAttribute("data-theme", t.theme);
    document.body.setAttribute("data-mono", t.typography);
    document.body.setAttribute("data-motion", t.motion);
    document.body.setAttribute("data-accent", t.accent);
    document.body.setAttribute("data-route", route);
  }, [t.theme, t.typography, t.motion, t.accent, route]);

  return (
    <>
      <Topology />
      <CoordinateGutters />
      <Nav />
      {!isMap && <OrbitDock />}
      <main className={`sheet ${isMap ? "map-sheet" : "support-sheet"}`}>
        {isMap ? <GalaxyMap /> : <SupportPage route={route} />}
      </main>
      {!isMap && <Footer />}

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
