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
        <div className="control-row camera-actions">
          <button type="button" onClick={onResetView}>Recenter</button>
          <button type="button" onClick={onFullOrbit}>Full Orbit</button>
          <button type="button" onClick={() => onZoom(1.16)} aria-label="Zoom in" title="Zoom in">+</button>
          <button type="button" onClick={() => onZoom(0.86)} aria-label="Zoom out" title="Zoom out">-</button>
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
