import { ENTRIES, FEATURED } from "../data/atlasData.js";
import { sectorById } from "../data/atlasHelpers.js";
import { routeHref } from "../app/routes.js";

const CASE_LENS = {
  "Atmospheric Water Harvesting": {
    visible: "A compact machine that produces water from air.",
    hidden: "A low-humidity separations train: capture, regeneration, condensation, polishing, and storage."
  },
  "Green Hydrogen Electrolysis": {
    visible: "Clean hydrogen at a pipeline, tank, or industrial user.",
    hidden: "Water treatment, stack electrochemistry, gas handling, compression, drying, and power coupling."
  },
  "Solid-Sorbent Direct Air Capture": {
    visible: "CO2 removal modules arranged like industrial air-handling equipment.",
    hidden: "Dilute air contact, sorbent loading, regeneration energy, drying, compression, and MRV."
  },
  "Perovskite Tandem PV": {
    visible: "A higher-efficiency solar module.",
    hidden: "Interface-controlled coating, crystallization, contact formation, encapsulation, and outdoor stability."
  },
  "Roll-to-Roll Perovskite Manufacturing": {
    visible: "Continuous solar laminate coming off a web line.",
    hidden: "Web handling, coating windows, solvent removal, electrode deposition, encapsulation, and inline metrology."
  },
  "Cryo Propellant Transfer": {
    visible: "Orbital refueling that extends spacecraft range.",
    hidden: "Chilldown, line conditioning, phase management, pressure control, zero-boiloff cooling, and mass accounting."
  }
};

export default function CasesPage() {
  return (
    <section className="page-shell cases-page" aria-labelledby="cases-title">
      <div className="page-head">
        <p className="eyebrow">Engineering proof layer</p>
        <h1 id="cases-title">Six process cases.</h1>
        <p>
          Each case starts with the thing people see, then exposes the hidden process system
          that decides whether it can become deployable infrastructure.
        </p>
      </div>

      <nav className="case-jump-nav" aria-label="Case study jump links">
        {FEATURED.map((item) => (
          <a href={`#case-${slugify(item.name)}`} key={item.name}>{item.name}</a>
        ))}
      </nav>

      <div className="case-list">
        {FEATURED.map((item, index) => {
          const sector = sectorById[item.sector];
          const lens = CASE_LENS[item.name] || {};
          const atlasEntry = entryForCase(item);
          return (
            <article id={`case-${slugify(item.name)}`} className={`case-study ${index % 2 ? "case-study-alt" : ""}`} data-sector={item.sector} key={item.pid}>
              <header>
                <p className="eyebrow">{item.pid} / {sector?.label}</p>
                <h2>{item.name}</h2>
              </header>
              <div className="case-columns">
                <div>
                  <h3>Visible product</h3>
                  <p>{lens.visible}</p>
                </div>
                <div>
                  <h3>Hidden process system</h3>
                  <p>{lens.hidden}</p>
                </div>
              </div>
              <div className="case-inputs">
                <div>
                  <span>Inputs</span>
                  <strong>{item.inputs.join(" / ")}</strong>
                </div>
                <div>
                  <span>Output</span>
                  <strong>{item.output}</strong>
                </div>
              </div>
              <div className="flow-chain case-flow">
                {item.steps.map(([code, name]) => (
                  <div className="flow-step" key={`${item.pid}-${code}`}>
                    <span>{code}</span>
                    <strong>{name}</strong>
                  </div>
                ))}
              </div>
              <div className="case-judgment">
                <div><span>Key bottleneck</span><strong>{item.bottleneck}</strong></div>
                <div><span>Scale trigger</span><strong>{item.trigger}</strong></div>
                <div><span>Readiness gap</span><strong>{item.readiness}</strong></div>
              </div>
              <p className="judgment-copy">{item.reasoning}</p>
              {atlasEntry && (
                <div className="case-actions">
                  <a className="text-link" href={routeHref("index", { tech: atlasEntry.pid })}>Open in index</a>
                  <a className="text-link" href={routeHref("map", { q: atlasEntry.name })}>Open in atlas</a>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function entryForCase(item) {
  const aliases = {
    "Atmospheric Water Harvesting": "Atmospheric water (sorbent)",
    "Green Hydrogen Electrolysis": "Green hydrogen electrolysis",
    "Solid-Sorbent Direct Air Capture": "Solid-sorbent DAC",
    "Perovskite Tandem PV": "Perovskite tandem PV",
    "Roll-to-Roll Perovskite Manufacturing": "Roll-to-roll perovskite",
    "Cryo Propellant Transfer": "Cryo propellant transfer"
  };
  return ENTRIES.find((entry) => entry.name === aliases[item.name] || entry.pid === item.pid);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
