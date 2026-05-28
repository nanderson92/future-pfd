import { ROUTES } from "../app/routes.js";

export default function Nav({ route }) {
  return (
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Future Systems Atlas home">
        <span className="brand-mark">FSA</span>
        <span>
          <strong>Future Systems Atlas</strong>
          <em>process map / 115 technologies</em>
        </span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {ROUTES.filter((item) => item.id !== "home").map((item) => (
          <a key={item.id} href={item.href} aria-current={route === item.id ? "page" : undefined}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
