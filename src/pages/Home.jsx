import { useState, useEffect } from 'react'
import { fetchPosters } from '../utils/sheets'
import './Home.css'

function Home() {
  const [posters, setPosters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosters().then(data => {
      setPosters(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <img
            src="/assets/shaham-logo-vertical.png"
            alt="שחם מעבדת תרבות"
            className="hero-logo"
          />
          <p className="hero-tagline">מרחב ירושלמי לאמנות ניסיונית</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="page">
        <h2 className="page-title">מפרויקטים ואירועים</h2>
        <div className="divider"></div>

        {loading ? (
          <p className="gallery-note">טוען...</p>
        ) : posters.length > 0 ? (
          <div className="gallery">
            {posters.map((poster) => (
              <div key={poster.id} className="gallery-item">
                <img
                  src={poster.imageUrl}
                  alt={poster.title}
                  className="gallery-img"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="gallery-note">
            תמונות מפרויקטים ואירועים יתווספו בקרוב
          </p>
        )}
      </section>
    </div>
  )
}

export default Home
