/* ────────────────────────────────────────────────────────────
   Future Systems Atlas — App shell + Tweaks
   ──────────────────────────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
    "theme": "dark",
    "typography": "grotesque",
    "motion": "off",
    "accent": "energy"
} /*EDITMODE-END*/;
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
    return (React.createElement("aside", { className: "orbit-dock", "aria-label": "Orbit quick controls" },
        React.createElement("button", { className: "orbit-dock-hub", onClick: resetOrbit, title: "Return to full orbit" },
            React.createElement("span", null, "FSA"),
            React.createElement("b", null, "MAP")),
        React.createElement("div", { className: "orbit-dock-block" },
            React.createElement("span", { className: "orbit-dock-label" }, "Planets"),
            React.createElement("div", { className: "orbit-dock-planets" }, sectors.map(s => (React.createElement("button", { key: s.id, className: orbitState.focused === s.id ? "active" : "", "data-sector": s.id, onClick: () => focusSector(s.id), title: `Focus ${s.label}`, "aria-label": `Focus ${s.label} sector` },
                React.createElement("span", null)))))),
        React.createElement("div", { className: "orbit-dock-block" },
            React.createElement("span", { className: "orbit-dock-label" }, "Lenses"),
            React.createElement("div", { className: "orbit-dock-lenses" }, lenses.map(l => (React.createElement("button", { key: l.id, className: orbitState.activeLens === l.id ? "active" : "", onClick: () => setLens(l.id), title: `Switch to ${l.label} lens`, "aria-label": `Switch to ${l.label} lens` },
                React.createElement("span", null, l.code)))))),
        React.createElement("a", { className: "orbit-dock-index", href: "#atlas", title: "Open full index", "aria-label": "Open full atlas index" }, "IDX")));
}
function getAtlasRoute() {
    const raw = (window.location.hash || "#home").replace(/^#/, "").trim().toLowerCase();
    if (!raw || raw === "top" || raw === "home")
        return "home";
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
    return (React.createElement("section", { id: "home", className: "landing-page", "aria-labelledby": "landing-title" },
        React.createElement("div", { className: "landing-bg", "aria-hidden": "true" }),
        React.createElement("div", { className: "landing-shell" },
            React.createElement("div", { className: "landing-copy" },
                React.createElement("div", { className: "landing-kicker" }, "FSA \u00B7 MASTER \u00B7 PROCESS ENGINEERING ATLAS"),
                React.createElement("h1", { id: "landing-title" },
                    "A process-flow map of the technologies people call ",
                    React.createElement("span", null, "the future.")),
                React.createElement("p", null, "Future Systems Atlas decomposes frontier technology into chemicals, unit operations, manufacturing bottlenecks, readiness levels, and evidence posture. Open the interactive map when you want the full planet/moon interface; start with cases when you want proof of the reasoning."),
                React.createElement("div", { className: "landing-actions" },
                    React.createElement("a", { className: "btn primary", href: "#map" },
                        "Launch interactive atlas ",
                        React.createElement("span", { className: "arrow" }, "\u2192")),
                    React.createElement("a", { className: "btn", href: "#cases" }, "View process cases"),
                    React.createElement("a", { className: "btn", href: "#about" }, "About / contact")),
                React.createElement("div", { className: "landing-stats", "aria-label": "Atlas scope" }, stats.map(([n, label]) => (React.createElement("div", { key: label },
                    React.createElement("b", null, n),
                    React.createElement("span", null, label)))))),
            React.createElement("a", { className: "landing-preview", href: "#map", "aria-label": "Launch the interactive orbit map" },
                React.createElement("img", { src: "og-cover.png", alt: "Preview of the Future Systems Atlas orbit map", loading: "eager", decoding: "async" }),
                React.createElement("div", { className: "landing-preview-caption" },
                    React.createElement("span", null, "Interactive map loads on demand"),
                    React.createElement("b", null, "Launch Atlas"))))));
}
function SupportPage({ route }) {
    const meta = SUPPORT_PAGE_META[route] || SUPPORT_PAGE_META.guide;
    const renderPage = () => {
        if (route === "guide")
            return React.createElement(FieldGuide, null);
        if (route === "cases")
            return React.createElement(CaseStudies, null);
        if (route === "system")
            return React.createElement(SystemMap, null);
        if (route === "chemicals")
            return React.createElement(ChemicalSpine, null);
        if (route === "unitops")
            return React.createElement(UnitOps, null);
        if (route === "readiness")
            return React.createElement(Readiness, null);
        if (route === "pathways")
            return React.createElement(Pathways, null);
        if (route === "atlas")
            return React.createElement(Atlas, null);
        if (route === "sources")
            return React.createElement(React.Fragment, null,
                React.createElement(Evidence, null),
                React.createElement(AuthorNote, null));
        if (route === "about")
            return React.createElement(AuthorNote, null);
        return React.createElement(FieldGuide, null);
    };
    return (React.createElement("div", { className: "support-page-shell", "data-page": route },
        React.createElement("div", { className: "support-page-command" },
            React.createElement("a", { className: "support-map-return", href: "#map" }, "\u2190 Return to orbit map"),
            React.createElement("div", null,
                React.createElement("span", { className: "meta" }, meta.code),
                React.createElement("h1", null, meta.title),
                React.createElement("p", null, meta.lede))),
        renderPage()));
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
    return (React.createElement(React.Fragment, null,
        React.createElement(Topology, null),
        React.createElement(CoordinateGutters, null),
        React.createElement(Nav, null),
        !isMap && !isHome && React.createElement(OrbitDock, null),
        React.createElement("main", { className: `sheet ${isMap ? "map-sheet" : isHome ? "landing-sheet" : "support-sheet"}` }, isMap ? React.createElement(GalaxyMap, null) : isHome ? React.createElement(LandingPage, null) : React.createElement(SupportPage, { route: route })),
        !isMap && !isHome && React.createElement(Footer, null)));
}
/* ── Coordinate gutters (top/bottom/left/right rules) ─────── */
function CoordinateGutters() {
    return (React.createElement(React.Fragment, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
