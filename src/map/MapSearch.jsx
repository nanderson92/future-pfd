export default function MapSearch({ value, onChange, count, total, noResults, suggestions, onOpenSuggestion }) {
  return (
    <div className="map-search">
      <label>
        <span>Find a technology</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Find a technology... fusion, DAC, lithium, water"
        />
      </label>
      {value && (
        <button className="icon-button" type="button" onClick={() => onChange("")} aria-label="Clear map search">
          x
        </button>
      )}
      <div className="map-search-status" aria-live="polite">
        {value ? `${count} / ${total} matches` : `${total} process moons`}
      </div>
      {noResults && <div className="map-no-results">No matching technologies in the atlas.</div>}
      {value && suggestions.length > 0 && (
        <div className="map-suggestions">
          {suggestions.slice(0, 5).map((entry) => (
            <button type="button" key={entry.pid} onClick={() => onOpenSuggestion(entry)}>
              <span>{entry.pid}</span>
              {entry.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
