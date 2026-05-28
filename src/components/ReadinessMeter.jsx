export default function ReadinessMeter({ entry, compact = false }) {
  const rows = [
    ["TRL", entry.trl, "Does it work?"],
    ["MRL", entry.mrl, "Can we make it repeatedly?"],
    ["IRL", entry.irl, "Can it integrate?"]
  ];

  return (
    <div className={compact ? "readiness-mini" : "readiness-meter"} aria-label={`Readiness for ${entry.name}`}>
      {rows.map(([label, value, title]) => (
        <div className="readiness-row" key={label} title={`${title} ${value}/9`}>
          <span className="readiness-label">{label}</span>
          <span className="readiness-track" aria-hidden="true">
            {Array.from({ length: 9 }, (_, index) => (
              <span key={index} className={index < value ? "on" : ""} />
            ))}
          </span>
          <span className="readiness-value">{value}/9</span>
        </div>
      ))}
    </div>
  );
}
