import { useState, useEffect } from 'react'
import { fetchPosters } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import useSplitTextAnimation from '../hooks/useSplitTextAnimation'
import './Home.css'

function Home() {
  const { t, lang } = useLang()
  const [posters, setPosters] = useState([])
  const [flippedId, setFlippedId] = useState(null)

  useEffect(() => {
    fetchPosters().then(data => setPosters(data))
  }, [])

  const pageRef = useSplitTextAnimation([posters.length, t])

  function toggleFlip(id) {
    setFlippedId(prev => prev === id ? null : id)
  }

  function getPosterTitle(poster) {
    if (lang === 'en' && poster.title_en) return poster.title_en
    if (lang === 'ar' && poster.title_ar) return poster.title_ar
    return poster.title
  }

  function getPosterDescription(poster) {
    if (lang === 'en' && poster.description_en) return poster.description_en
    if (lang === 'ar' && poster.description_ar) return poster.description_ar
    return poster.description
  }

  return (
    <PageTransition>
    <div className="home" ref={pageRef}>
      {/* Hero with animated logo over still image */}
      <section className="hero">
        <video
          className="hero-video"
          src="/assets/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-overlay"></div>
      </section>

      {/* About text */}
      <section className="page home-about">
        <p className="home-about-text">{t('about.vision.text')}</p>
      </section>

      {/* Gallery Section */}
      <section className="page">
        <h2 className="gallery-heading">{t('home.gallery.heading')}</h2>
        <div className="gallery">
          {posters.map((poster) => (
            <div
              key={poster.id}
              className="gallery-item"
              onClick={() => toggleFlip(poster.id)}
              role="button"
              tabIndex={0}
              aria-label={getPosterTitle(poster)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleFlip(poster.id) }}
              style={{ '--poster-bg': `url(${poster.imageUrl})` }}
            >
              <div className={`gallery-card${flippedId === poster.id ? ' flipped' : ''}`}>
                <div className="gallery-card-front">
                  <img
                    src={poster.imageUrl}
                    alt={getPosterTitle(poster)}
                    className="gallery-img"
                  />
                </div>
                <div className="gallery-card-back">
                  <h3 className="card-back-title">{getPosterTitle(poster)}</h3>
                  {(poster.startDate || poster.endDate) && (
                    <p className="card-back-dates">
                      {poster.startDate}{poster.startDate && poster.endDate ? ' — ' : ''}{poster.endDate}
                    </p>
                  )}
                  {getPosterDescription(poster) && (
                    <p className="card-back-desc">{getPosterDescription(poster)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="home-map">
        <iframe
          title="venue-map"
          src="https://maps.google.com/maps?q=שחם+מעבדת+תרבות&output=embed"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
    </PageTransition>
  )
}

export default Home
