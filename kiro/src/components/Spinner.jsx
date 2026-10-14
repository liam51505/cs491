export default function Spinner({ label = 'Loading' }) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <span className="spinner-mark" aria-hidden="true" />
      <span className="spinner-label">{label}</span>
    </div>
  )
}
