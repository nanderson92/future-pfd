/* ────────────────────────────────────────────────────────────
   Future Systems Atlas — App shell + Tweaks
   ──────────────────────────────────────────────────────────── */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "typography": "grotesque",
  "motion": "off",
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
  const raw = (window.location.hash || "#home").replace(/^#/, "").trim().toLowerCase();
  if (!raw || raw === "top" || raw === "home") return "home";
  const valid = new Set(["home", "map", "guide", "cases", "system", "chemicals", "unitops", "readiness", "pathways", "atlas", "sources", "about"]);
  return valid.has(raw) ? raw : "home";
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
  home: { code: "FSA · HOME", title: "Future Systems Atlas", lede: "A fast launch page for the interactive process-engineering atlas." },
  guide: { code: "FSA · GUIDE", title: "How to read the atlas", lede: "The map stays primary. This page explains the legend, evidence language, and process-engineering lenses." },
  cases: { code: "FSA · CASES", title: "Representative process cases", lede: "Selected examples that show how a future-looking capability becomes chemicals, operations, bottlenecks, and deployment rules." },
  system: { code: "FSA · SYSTEM", title: "System architecture", lede: "The hidden stack behind the visible future: resources, chemicals, unit operations, manufacturing systems, infrastructure, and deployment pathways." },
  chemicals: { code: "FSA · CHEMICALS", title: "Chemical spine", lede: "Recurring molecules and materials that connect sectors which look unrelated on the surface." },
  unitops: { code: "FSA · UNIT OPS", title: "Unit-operation layer", lede: "Separations, reactions, heat transfer, deposition, QA, and manufacturing operations that turn the future into an engineering problem." },
  readiness: { code: "FSA · READINESS", title: "Readiness and scale", lede: "TRL, MRL, and IRL separate proof of science from repeatable manufacturing and deployable infrastructure." },
  pathways: { code: "FSA · BOTTLENECKS", title: "Scale-up pathways", lede: "Where each technology gets stuck: cost, dilute feeds, durability, siting, safety, yield, permitting, or infrastructure." },
  atlas: { code: "FSA · INDEX", title: "Full process card index", lede: "The database layer beneath the orbit map. Search, filter, and open individual process cards." },
  sources: { code: "FSA · SOURCES", title: "Evidence layer", lede: "Three evidence postures, 244 source records, and the trail behind the atlas." },
  about: { code: "FSA · ABOUT", title: "About Nathan Anderson", lede: "Who built this, why it exists, and how to contact me." },
};


function LandingPage() {
  const stats = [
    ["115", "frontier technologies"],
    ["244", "source records"],
    ["7", "future domains"],
    ["6", "featured process cases"],
  ];
  return (
    <section id="home" className="landing-page" aria-labelledby="landing-title">
      <div className="landing-bg" aria-hidden="true" />
      <div className="landing-shell">
        <div className="landing-copy">
          <div className="landing-kicker">FSA · MASTER · PROCESS ENGINEERING ATLAS</div>
          <h1 id="landing-title">A process-flow map of the technologies people call <span>the future.</span></h1>
          <p>
            Future Systems Atlas decomposes frontier technology into chemicals, unit operations,
            manufacturing bottlenecks, readiness levels, and evidence posture. Open the interactive
            map when you want the full planet/moon interface; start with cases when you want proof of the reasoning.
          </p>
          <div className="landing-actions">
            <a className="btn primary" href="#map">Launch interactive atlas <span className="arrow">→</span></a>
            <a className="btn" href="#cases">View process cases</a>
            <a className="btn" href="#about">About / contact</a>
          </div>
          <div className="landing-stats" aria-label="Atlas scope">
            {stats.map(([n, label]) => (
              <div key={label}>
                <b>{n}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <a className="landing-preview" href="#map" aria-label="Launch the interactive orbit map">
          <img src="og-cover.png" alt="Preview of the Future Systems Atlas orbit map" loading="eager" decoding="async" />
          <div className="landing-preview-caption">
            <span>Interactive map loads on demand</span>
            <b>Launch Atlas</b>
          </div>
        </a>
      </div>
    </section>
  );
}

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
  const isHome = route === "home";

  React.useEffect(() => {
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
  }, [route]);

  // Apply theme + typography to <body>
  React.useEffect(() => {
    document.body.setAttribute("data-theme", t.theme);
    document.body.setAttribute("data-mono", t.typography);
    document.body.setAttribute("data-motion", t.motion);
    document.body.setAttribute("data-accent", t.accent);
    document.body.setAttribute("data-route", route);
    document.body.setAttribute("data-perf", "optimized");
  }, [t.theme, t.typography, t.motion, t.accent, route]);

  return (
    <>
      <Topology />
      <CoordinateGutters />
      <Nav />
      {!isMap && !isHome && <OrbitDock />}
      <main className={`sheet ${isMap ? "map-sheet" : isHome ? "landing-sheet" : "support-sheet"}`}>
        {isMap ? <GalaxyMap /> : isHome ? <LandingPage /> : <SupportPage route={route} />}
      </main>
      {!isMap && !isHome && <Footer />}

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
