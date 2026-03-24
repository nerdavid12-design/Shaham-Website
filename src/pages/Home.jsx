import { useState, useEffect } from 'react'
import { fetchPosters } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import './Home.css'

function Home() {
  const { t } = useLang()
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
        <video
          className="hero-video"
          src="/assets/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

      {/* Gallery Section */}
      <section className="page">

        {loading ? (
          <p className="gallery-note">{t('loading')}</p>
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
            {t('home.gallery.empty')}
          </p>
        )}
      </section>
    </div>
  )
}

export default Home
