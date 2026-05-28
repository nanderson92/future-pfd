import { useEffect, useRef } from "react";
import ReadinessMeter from "../components/ReadinessMeter.jsx";
import { bottleneckById, chemicalBySym, sectorById, unitOpById } from "../data/atlasHelpers.js";
import { routeHref } from "../app/routes.js";

export default function TechnologyModal({ entry, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!entry) return null;

  const sector = sectorById[entry.sector];
  const chemical = chemicalBySym[entry.chemical];
  const unitOp = unitOpById[entry.unitOp];
  const bottleneck = bottleneckById[entry.bottleneck];

  return (
    <div className="modal-scrim" onMouseDown={onClose} role="presentation">
      <article
        className="tech-modal"
        data-sector={entry.sector}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tech-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <p className="eyebrow">{entry.pid} / {sector?.label}</p>
            <h2 id="tech-modal-title">{entry.name}</h2>
            <p>{entry.description}</p>
          </div>
          <button ref={closeRef} className="icon-button close-button" type="button" onClick={onClose} aria-label="Close technology card">
            x
          </button>
        </header>

        <div className="modal-grid">
          <section className="process-flow" aria-labelledby="flow-title">
            <h3 id="flow-title">Process Flow</h3>
            <div className="flow-chain">
              {entry.flow.map(([code, name], index) => (
                <div className="flow-step" key={`${code}-${index}`}>
                  <span>{code}</span>
                  <strong>{name}</strong>
                </div>
              ))}
            </div>
          </section>

          <aside className="tech-card-facts" aria-label="Technology facts">
            <div>
              <span>Chemical / material spine</span>
              <strong>{entry.chemical} / {chemical?.name || "material system"}</strong>
            </div>
            <div>
              <span>Primary unit operation</span>
              <strong>{unitOp?.label}</strong>
            </div>
            <div>
              <span>Bottleneck</span>
              <strong>{bottleneck?.label}</strong>
            </div>
            <div>
              <span>Scale trigger</span>
              <strong>{entry.scaleTrigger}</strong>
            </div>
            <div>
              <span>Evidence posture</span>
              <strong className="evidence-pill" data-evidence={entry.evidence}>{entry.evidence}</strong>
            </div>
            <ReadinessMeter entry={entry} />
            <a className="text-link" href={routeHref("index", { tech: entry.pid })}>Open in index</a>
          </aside>
        </div>
      </article>
    </div>
  );
}
