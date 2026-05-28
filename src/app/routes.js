export const ROUTES = [
  { id: "home", label: "Home", href: "#home" },
  { id: "map", label: "Atlas", href: "#map" },
  { id: "guide", label: "Guide", href: "#guide" },
  { id: "cases", label: "Cases", href: "#cases" },
  { id: "index", label: "Index", href: "#index" },
  { id: "sources", label: "Sources", href: "#sources" },
  { id: "about", label: "About", href: "#about" }
];

const ROUTE_ALIASES = {
  "": "home",
  "/": "home",
  top: "home",
  atlas: "index",
  cards: "index"
};

export function parseHashRoute(hash = window.location.hash) {
  const withoutHash = hash.replace(/^#\/?/, "");
  const [rawRoute, rawQuery = ""] = withoutHash.split("?");
  const normalized = (rawRoute || "").trim().toLowerCase();
  const id = ROUTE_ALIASES[normalized] || normalized || "home";
  const route = ROUTES.some((item) => item.id === id) ? id : "home";
  return { route, query: new URLSearchParams(rawQuery) };
}

export function routeHref(route, params) {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  return `#${route}${query}`;
}
