import { useState } from 'react'
import Filters from './components/Filters.jsx'
import ActivityCard from './components/ActivityCard.jsx'
import Favorites from './components/Favorites.jsx'
import Spinner from './components/Spinner.jsx'
import { getFilteredActivity } from './api/activities.js'
import { useFavorites } from './hooks/useFavorites.js'

export default function App() {
  const [filters, setFilters] = useState({
    type: '',
    participants: '',
    participantsMode: 'exact',
  })
  const [activity, setActivity] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites()

  async function suggest() {
    setLoading(true)
    setError('')
    try {
      const result = await getFilteredActivity(filters)
      setActivity(result)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setActivity(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Activity · Edition 01</p>
        <h1>
          WHAT
          <br />
          SHOULD I DO
        </h1>
        <p className="subtitle">Select parameters. Generate a directive.</p>
      </header>

      <section className="controls">
        <Filters
          type={filters.type}
          participants={filters.participants}
          participantsMode={filters.participantsMode}
          onChange={setFilters}
          disabled={loading}
        />
        <button className="suggest-btn" onClick={suggest} disabled={loading}>
          {loading ? 'Generating' : activity ? 'Generate another' : 'Generate'}
        </button>
      </section>

      <section className="result">
        {loading && <Spinner label="Generating" />}
        {!loading && error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {!loading && !error && !activity && (
          <p className="placeholder">No directive yet.</p>
        )}
        {!loading && !error && (
          <ActivityCard
            activity={activity}
            isFavorite={isFavorite(activity)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </section>

      <Favorites favorites={favorites} onRemove={removeFavorite} />

      <footer className="footer">
        <span>Source — bored-api.appbrewery.com</span>
      </footer>
    </div>
  )
}
