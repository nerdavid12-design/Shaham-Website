import { useState, useEffect, useRef } from 'react'
import { fetchPosters } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import './Home.css'

// Icon split into 4 quadrants, each from a corner
const iconParts = [
  { clip: 'inset(0 50% 50% 0)',   dir: { x: -50, y: -50 } }, // top-right
  { clip: 'inset(0 0 50% 50%)',   dir: { x: 50, y: -50 } },  // top-left
  { clip: 'inset(50% 50% 0 0)',   dir: { x: -50, y: 50 } },  // bottom-right
  { clip: 'inset(50% 0 0 50%)',   dir: { x: 50, y: 50 } },   // bottom-left
]

function AnimatedLogo() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`logo-anim ${animate ? 'logo-anim-active' : ''}`}>
      {/* Icon split into 4 quadrants */}
      <div className="logo-anim-icon-wrap">
        {iconParts.map((part, i) => (
          <span
            key={i}
            className="logo-anim-icon-part"
            style={{
              '--from-x': `${part.dir.x}px`,
              '--from-y': `${part.dir.y}px`,
              '--delay': `${i * 0.04}s`,
              clipPath: part.clip,
            }}
          >
            <img src="/assets/shaham-icon.png" alt="" className="logo-anim-icon-img" />
          </span>
        ))}
      </div>
    </div>
  )
}

function Home() {
  const { t, lang } = useLang()
  const [posters, setPosters] = useState([])
  const [flippedId, setFlippedId] = useState(null)

  useEffect(() => {
    fetchPosters().then(data => setPosters(data))
  }, [])

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
    <div className="home">
      {/* Hero with animated logo over still image */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <AnimatedLogo />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="page">
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
    </div>
  )
}

export default Home
