import { useState, useEffect } from 'react'
import { fetchPosters, fetchHeroVideo } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import './Home.css'

function Home() {
  const { t } = useLang()
  const [posters, setPosters] = useState([])
  const [loading, setLoading] = useState(true)
  const [heroVideoUrl, setHeroVideoUrl] = useState('')

  useEffect(() => {
    fetchPosters().then(data => {
      setPosters(data)
      setLoading(false)
    })
    fetchHeroVideo().then(url => setHeroVideoUrl(url))
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        {heroVideoUrl && (
          <video
            className="hero-video"
            src={heroVideoUrl}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        <div className="hero-overlay" />
        <div className="hero-content">
          <img
            src="/assets/shaham-logo-vertical.png"
            alt="שחם מעבדת תרבות"
            className="hero-logo"
          />
          <p className="hero-tagline">{t('home.tagline')}</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="page">
        <h2 className="page-title">{t('home.gallery.title')}</h2>
        <div className="divider"></div>

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
