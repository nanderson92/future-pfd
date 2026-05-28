import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import GuidePage from "../pages/GuidePage.jsx";
import CasesPage from "../pages/CasesPage.jsx";
import IndexPage from "../pages/IndexPage.jsx";
import SourcesPage from "../pages/SourcesPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import { parseHashRoute } from "./routes.js";

const AtlasMap = lazy(() => import("../map/AtlasMap.jsx"));

const PAGE_TITLES = {
  home: "Future Systems Atlas - Interactive Process Atlas",
  map: "Future Systems Atlas - Map",
  guide: "Future Systems Atlas - Guide",
  cases: "Future Systems Atlas - Cases",
  index: "Future Systems Atlas - Index",
  sources: "Future Systems Atlas - Sources",
  about: "Future Systems Atlas - About Nathan Anderson"
};

function useHashRoute() {
  const [state, setState] = useState(() => parseHashRoute());

  useEffect(() => {
    const onHashChange = () => setState(parseHashRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return state;
}

export default function App() {
  const { route, query } = useHashRoute();
  const isMap = route === "map";

  useEffect(() => {
    document.title = PAGE_TITLES[route] || PAGE_TITLES.home;
    document.body.dataset.route = route;
    if (!isMap) {
      requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    }
  }, [isMap, route]);

  const page = useMemo(() => {
    switch (route) {
      case "map":
        return (
          <Suspense fallback={<div className="route-loading">Loading atlas map...</div>}>
            <AtlasMap initialQuery={query.get("q") || ""} />
          </Suspense>
        );
      case "guide":
        return <GuidePage />;
      case "cases":
        return <CasesPage />;
      case "index":
        return <IndexPage initialTech={query.get("tech")} initialQuery={query.get("q") || ""} initialSector={query.get("sector") || ""} />;
      case "sources":
        return <SourcesPage />;
      case "about":
        return <AboutPage />;
      default:
        return <LandingPage />;
    }
  }, [query, route]);

  return (
    <Layout route={route} isMap={isMap}>
      {page}
    </Layout>
  );
}
