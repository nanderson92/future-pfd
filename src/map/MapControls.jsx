const LENSES = [
  ["sectors", "Sectors"],
  ["chemicals", "Chemicals"],
  ["unitops", "Unit Ops"],
  ["bottlenecks", "Bottlenecks"],
  ["readiness", "Readiness"],
  ["evidence", "Evidence"]
];

export default function MapControls({
  sectors,
  focused,
  lens,
  onLens,
  onFocus,
  onFullOrbit,
  onZoom,
  onPan,
  onResetView
}) {
  return (
    <div className="map-control-panel">
      <section aria-label="Camera controls">
        <div className="panel-title">
          <span>Camera</span>
          <strong>{focused ? sectors.find((sector) => sector.id === focused)?.label : "Full Orbit"}</strong>
        </div>
        <div className="camera-pad">
          <button type="button" onClick={() => onPan(0, 70)} aria-label="Pan up" title="Pan up">Up</button>
          <button type="button" onClick={() => onPan(70, 0)} aria-label="Pan left" title="Pan left">Left</button>
          <button type="button" className="recenter-button" onClick={onResetView} aria-label="Recenter current view" title="Recenter current view">Recenter</button>
          <button type="button" onClick={() => onPan(-70, 0)} aria-label="Pan right" title="Pan right">Right</button>
          <button type="button" onClick={() => onPan(0, -70)} aria-label="Pan down" title="Pan down">Down</button>
        </div>
        <div className="control-row">
          <button type="button" onClick={() => onZoom(1.16)}>+</button>
          <button type="button" onClick={() => onZoom(0.86)}>-</button>
          <button type="button" onClick={onFullOrbit}>Full Orbit</button>
        </div>
      </section>

      <section aria-label="Lens controls">
        <div className="panel-title"><span>Lens</span><strong>{LENSES.find(([id]) => id === lens)?.[1]}</strong></div>
        <div className="lens-list">
          {LENSES.map(([id, label]) => (
            <button type="button" key={id} className={lens === id ? "active" : ""} onClick={() => onLens(id)}>
              {label}
            </button>
          ))}
        </div>
      </section>

      <section aria-label="Sector focus controls">
        <div className="panel-title"><span>Sectors</span><strong>{sectors.length}</strong></div>
        <div className="sector-list">
          {sectors.map((sector) => (
            <button
              type="button"
              data-sector={sector.id}
              className={focused === sector.id ? "active" : ""}
              key={sector.id}
              onClick={() => onFocus(sector.id)}
            >
              <span className="sector-dot" />
              {sector.label}
              <b>{sector.count}</b>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
