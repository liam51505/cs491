export default function Favorites({ favorites, onRemove }) {
  if (favorites.length === 0) return null

  return (
    <section className="favorites" aria-label="Saved activities">
      <div className="favorites-head">
        <h2 className="section-title">Saved</h2>
        <span className="favorites-count">{favorites.length}</span>
      </div>

      <ul className="favorites-list">
        {favorites.map((f) => (
          <li key={f.key} className="favorite-row">
            <div className="favorite-info">
              <span className="favorite-type">{f.type}</span>
              <span className="favorite-title">{f.activity}</span>
            </div>
            <button
              type="button"
              className="remove-btn"
              aria-label={`Remove ${f.activity}`}
              onClick={() => onRemove(f.key)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
