import { useState, useEffect } from 'react'
import { fetchNowShowing } from '../utils/sheets'
import './NowShowing.css'

function NowShowing() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNowShowing().then(data => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="page now-page">
      <h1 className="page-title">מה מציגים עכשיו</h1>
      <div className="divider"></div>

      {loading ? (
        <p className="loading-text">טוען...</p>
      ) : items.length > 0 ? (
        <div className="now-items">
          {items.map((item) => (
            <article key={item.id} className="now-card">
              <div className="now-info">
                <h2 className="now-title">{item.title}</h2>
                {item.artist && (
                  <p className="now-artist">{item.artist}</p>
                )}
                {item.description && (
                  <p className="now-description">{item.description}</p>
                )}
              </div>
              {item.youtubeId && (
                <div className="now-embed">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeId}`}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {item.videoUrl && !item.youtubeId && (
                <div className="now-embed">
                  <iframe
                    src={item.videoUrl}
                    title={item.title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {item.imageUrl && (
                <div className="now-image-wrap">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="now-image"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="now-empty">
          <h2 className="now-empty-title">בקרוב</h2>
          <p className="now-empty-text">
            פרטים על הפרויקט הנוכחי יתווספו בקרוב.
          </p>
        </div>
      )}
    </div>
  )
}

export default NowShowing
