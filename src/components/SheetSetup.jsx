import { useState } from 'react'
import { setSheetId } from '../utils/sheets'
import './SheetSetup.css'

function SheetSetup() {
  const [url, setUrl] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // Extract sheet ID from URL
    const match = url.match(/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
    if (match) {
      setSheetId(match[1])
    } else if (url.trim()) {
      // Maybe they pasted just the ID
      setSheetId(url.trim())
    }
  }

  return (
    <div className="sheet-setup">
      <div className="sheet-setup-card">
        <h3>חיבור Google Sheet</h3>
        <p>הדביקו את הקישור ל-Google Sheet כדי לטעון תוכן לאתר</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/..."
            dir="ltr"
          />
          <button type="submit">חבר</button>
        </form>
      </div>
    </div>
  )
}

export default SheetSetup
