import { priceLabel } from '../api/activities.js'

export default function ActivityCard({ activity, isFavorite, onToggleFavorite }) {
  if (!activity) return null

  const {
    activity: title,
    type,
    participants,
    price,
    accessibility,
    duration,
    kidFriendly,
    link,
  } = activity

  return (
    <article className="card" aria-live="polite">
      <div className="card-top">
        <span className="type-badge">{type}</span>
        {onToggleFavorite && (
          <button
            type="button"
            className={`fav-btn ${isFavorite ? 'is-active' : ''}`}
            aria-pressed={!!isFavorite}
            onClick={() => onToggleFavorite(activity)}
          >
            {isFavorite ? '★ Saved' : '☆ Save'}
          </button>
        )}
      </div>

      <h2 className="card-title">{title}</h2>

      <dl className="meta">
        <div className="meta-row">
          <dt>People</dt>
          <dd>{participants}</dd>
        </div>
        <div className="meta-row">
          <dt>Cost</dt>
          <dd>{priceLabel(price)}</dd>
        </div>
        {duration && (
          <div className="meta-row">
            <dt>Duration</dt>
            <dd>{duration}</dd>
          </div>
        )}
        {accessibility && (
          <div className="meta-row">
            <dt>Effort</dt>
            <dd>{accessibility}</dd>
          </div>
        )}
        <div className="meta-row">
          <dt>Kid friendly</dt>
          <dd>{kidFriendly ? 'Yes' : 'No'}</dd>
        </div>
      </dl>

      {link && (
        <a className="card-link" href={link} target="_blank" rel="noopener noreferrer">
          Learn more →
        </a>
      )}
    </article>
  )
}
