import { useState, useEffect } from 'react'
import { fetchArtists } from '../utils/sheets'
import './Artists.css'

function Artists() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArtists().then(data => {
      setArtists(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="page">
      <h1 className="page-title">אמנים</h1>
      <div className="divider"></div>

      {loading ? (
        <p className="loading-text">טוען...</p>
      ) : artists.length > 0 ? (
        <div className="artists-grid">
          {artists.map((artist) => (
            <article key={artist.id} className="artist-card">
              {artist.imageUrl && (
                <div className="artist-image-wrap">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="artist-image"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="artist-info">
                <h3 className="artist-name">{artist.name}</h3>
                {artist.description && (
                  <p className="artist-description">{artist.description}</p>
                )}
                {artist.link && (
                  <a href={artist.link} target="_blank" rel="noopener noreferrer" className="artist-link">
                    קישור
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="artists-empty">
          <p>אמנים יתווספו בקרוב</p>
        </div>
      )}
    </div>
  )
}

export default Artists
