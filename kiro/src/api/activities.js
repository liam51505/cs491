// Service layer for the Bored API (https://bored-api.appbrewery.com)

// In dev, requests go through the Vite proxy at /api (see vite.config.js) to
// avoid CORS, since the Bored API sends no Access-Control-Allow-Origin header.
// In a production build there is no proxy, so we call the API directly — note
// that this requires the API to allow your deployed origin, or your own proxy.
const BASE_URL = import.meta.env.DEV ? '/api' : 'https://bored-api.appbrewery.com'

/**
 * The activity "types" supported by the API.
 */
export const ACTIVITY_TYPES = [
  'education',
  'recreational',
  'social',
  'diy',
  'charity',
  'cooking',
  'relaxation',
  'music',
  'busywork',
]

/**
 * Normalize price/availability floats into friendly labels.
 */
export function priceLabel(price) {
  if (price === 0) return 'Free'
  if (price <= 0.3) return 'Cheap'
  if (price <= 0.6) return 'Moderate'
  return 'Pricey'
}

async function request(path) {
  let res
  try {
    res = await fetch(`${BASE_URL}${path}`)
  } catch {
    throw new Error('Network error — check your connection and try again.')
  }

  if (!res.ok) {
    throw new Error(`Request failed (${res.status}). Try different filters.`)
  }

  const data = await res.json()

  // The filter endpoint returns an error object when nothing matches.
  if (data && data.error) {
    throw new Error(data.error)
  }
  return data
}

/**
 * Fetch a single random activity.
 */
export async function getRandomActivity() {
  return request('/random')
}

/**
 * Fetch activities matching the given filters, then return one at random.
 * @param {{ type?: string, participants?: number|string, participantsMode?: 'exact'|'min' }} filters
 */
export async function getFilteredActivity(filters = {}) {
  const { type, participants, participantsMode = 'exact' } = filters

  const params = new URLSearchParams()
  if (type) params.set('type', type)
  // For "exact" mode we let the API filter by participant count directly.
  // For "min" mode we filter client-side after fetching, so we omit it here.
  if (participants && participantsMode === 'exact') {
    params.set('participants', String(participants))
  }

  const query = params.toString()
  if (!query && !participants) return getRandomActivity()

  // When only a "min participants" filter is set with no type, there is no
  // query to send, so fall back to the full list via an empty type filter.
  const results = await request(query ? `/filter?${query}` : '/filter?type=')

  let matches = Array.isArray(results) ? results : []

  if (participants && participantsMode === 'min') {
    const min = Number(participants)
    matches = matches.filter((a) => Number(a.participants) >= min)
  }

  if (matches.length === 0) {
    throw new Error('No activities match those filters. Try loosening them.')
  }

  // Pick a random one from the matches so the user gets variety.
  return matches[Math.floor(Math.random() * matches.length)]
}
