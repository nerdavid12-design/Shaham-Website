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
