import { useState } from "react";
import { ROUTES } from "../app/routes.js";

export default function Nav({ route }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Future Systems Atlas home">
        <span className="brand-mark">FSA</span>
        <span>
          <strong>Future Systems Atlas</strong>
          <em>process map / 115 technologies</em>
        </span>
      </a>
      <button
        type="button"
        className="nav-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>
      <nav
        id="primary-nav"
        className="nav-links"
        data-open={open ? "true" : "false"}
        aria-label="Primary navigation"
      >
        {ROUTES.filter((item) => item.id !== "home").map((item) => (
          <a
            key={item.id}
            href={item.href}
            aria-current={route === item.id ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
