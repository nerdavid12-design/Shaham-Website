import './NowShowing.css'

function NowShowing() {
  return (
    <div className="page now-page">
      <h1 className="page-title">מה מציגים עכשיו</h1>
      <p className="page-subtitle">הפרויקט הנוכחי במרחב</p>
      <div className="divider"></div>

      <div className="now-empty">
        <div className="now-empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <h2 className="now-empty-title">בקרוב</h2>
        <p className="now-empty-text">
          פרטים על הפרויקט הנוכחי יתווספו בקרוב.
          <br />
          עקבו אחרינו לעדכונים.
        </p>
      </div>
    </div>
  )
}

export default NowShowing
