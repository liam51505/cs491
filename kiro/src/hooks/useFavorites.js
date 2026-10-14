import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'activity-favorites'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Persist a list of favorite activities in localStorage.
 * Activities are de-duplicated by their API `key`.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Ignore write failures (private mode, quota, etc.)
    }
  }, [favorites])

  const isFavorite = useCallback(
    (activity) => activity && favorites.some((f) => f.key === activity.key),
    [favorites],
  )

  const addFavorite = useCallback((activity) => {
    if (!activity) return
    setFavorites((prev) =>
      prev.some((f) => f.key === activity.key) ? prev : [activity, ...prev],
    )
  }, [])

  const removeFavorite = useCallback((key) => {
    setFavorites((prev) => prev.filter((f) => f.key !== key))
  }, [])

  const toggleFavorite = useCallback((activity) => {
    if (!activity) return
    setFavorites((prev) =>
      prev.some((f) => f.key === activity.key)
        ? prev.filter((f) => f.key !== activity.key)
        : [activity, ...prev],
    )
  }, [])

  return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }
}
