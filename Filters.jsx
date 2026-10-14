import { ACTIVITY_TYPES } from '../api/activities.js'

export default function Filters({
  type,
  participants,
  participantsMode,
  onChange,
  disabled,
}) {
  function update(patch) {
    onChange({ type, participants, participantsMode, ...patch })
  }

  const showMode = participants !== '' && participants !== '1'

  return (
    <div className="filters">
      <label className="field">
        <span className="field-label">Type</span>
        <div className="select-wrap">
          <select
            value={type}
            disabled={disabled}
            onChange={(e) => update({ type: e.target.value })}
          >
            <option value="">Any</option>
            {ACTIVITY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </label>

      <label className="field">
        <span className="field-label">People</span>
        <div className="select-wrap">
          <select
            value={participants}
            disabled={disabled}
            onChange={(e) => update({ participants: e.target.value })}
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </label>

      {showMode && (
        <div className="field mode-field">
          <span className="field-label">Match</span>
          <div className="toggle" role="group" aria-label="Participants match mode">
            <button
              type="button"
              className={`toggle-btn ${participantsMode === 'exact' ? 'is-active' : ''}`}
              aria-pressed={participantsMode === 'exact'}
              disabled={disabled}
              onClick={() => update({ participantsMode: 'exact' })}
            >
              Exact
            </button>
            <button
              type="button"
              className={`toggle-btn ${participantsMode === 'min' ? 'is-active' : ''}`}
              aria-pressed={participantsMode === 'min'}
              disabled={disabled}
              onClick={() => update({ participantsMode: 'min' })}
            >
              Min
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
