import { useState, useEffect, useRef } from 'react'
import { fetchPosters } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import './Home.css'

// Each character slides from a different direction
const directions = [
  { x: 0, y: -60 },   // top
  { x: 50, y: -40 },  // top-right
  { x: -50, y: 0 },   // left
  { x: 60, y: 30 },   // bottom-right
  { x: 0, y: 60 },    // bottom
  { x: -40, y: -30 }, // top-left
  { x: 40, y: 0 },    // right
  { x: 0, y: -50 },   // top
  { x: -60, y: 20 },  // bottom-left
  { x: 50, y: -20 },  // top-right
  { x: 0, y: 50 },    // bottom
]

function AnimatedLogo() {
  const [animate, setAnimate] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    // Trigger animation on mount (page open or return from another tab)
    const timer = setTimeout(() => setAnimate(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const iconDir = directions[0]
  const line1 = 'שחם'
  const line2 = 'מעבדת תרבות'

  return (
    <div className={`logo-anim ${animate ? 'logo-anim-active' : ''}`} ref={ref}>
      <span
        className="logo-anim-icon"
        style={{
          '--from-x': `${iconDir.x}px`,
          '--from-y': `${iconDir.y}px`,
          '--delay': '0s',
        }}
      >
        <img src="/assets/shaham-icon.png" alt="" className="logo-anim-icon-img" />
      </span>
      <span className="logo-anim-line">
        {line1.split('').map((char, i) => {
          const dir = directions[(i + 1) % directions.length]
          return (
            <span
              key={i}
              className="logo-anim-char"
              style={{
                '--from-x': `${dir.x}px`,
                '--from-y': `${dir.y}px`,
                '--delay': `${0.3 + i * 0.15}s`,
              }}
            >
              {char}
            </span>
          )
        })}
      </span>
      <span className="logo-anim-line logo-anim-line-sub">
        {line2.split('').map((char, i) => {
          const dir = directions[(i + 4) % directions.length]
          const isSpace = char === ' '
          return (
            <span
              key={i}
              className={`logo-anim-char ${isSpace ? 'logo-anim-space' : ''}`}
              style={{
                '--from-x': `${dir.x}px`,
                '--from-y': `${dir.y}px`,
                '--delay': `${1.0 + i * 0.08}s`,
              }}
            >
              {isSpace ? '\u00A0' : char}
            </span>
          )
        })}
      </span>
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
      {/* Hero with animated logo over video */}
      <section className="hero">
        {/* eslint-disable-next-line react/no-unknown-property */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline=""
          preload="auto"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
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
