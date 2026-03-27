import { useState, useEffect, useRef } from 'react'
import { animate, scroll } from 'motion'
import { fetchVideos } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import './Video.css'

function ScrollGallery() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const items = containerRef.current.querySelectorAll('.scroll-gallery-item > div')
    const cleanups = []
    items.forEach((item) => {
      const stop = scroll(
        animate(item, { opacity: [0, 1, 1, 0] }),
        { target: item, offset: ['start end', 'end end', 'start start', 'end start'] }
      )
      cleanups.push(stop)
    })
    return () => cleanups.forEach(fn => fn?.())
  }, [])

  return (
    <div ref={containerRef} className="scroll-gallery">
      {[1, 2, 3, 4, 5].map((n) => (
        <section key={n} className="scroll-gallery-item">
          <div>
            <img src={`/photos/cityscape/${n}.jpg`} alt={`#${String(n).padStart(3, '0')}`} />
            <h2>#{String(n).padStart(3, '0')}</h2>
          </div>
        </section>
      ))}
    </div>
  )
}

function Video() {
  const { t } = useLang()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideos().then(data => {
      setVideos(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="video-page">
      <section className="video-hero">
        <video
          className="video-hero-bg"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline=""
          preload="auto"
        >
          <source src="/assets/vid-hero.mp4" type="video/mp4" />
        </video>
        <div className="video-hero-overlay"></div>
        <div className="video-hero-content">
          <img src="/assets/vid-shaham-white.png" alt="וידאו שחם - VID. SHAHAM" className="vid-shaham-logo-hero" />
        </div>
      </section>

      <div className="page">
        <p className="video-curated">{t('video.heading')}</p>
        <p className="page-subtitle">{t('video.subtitle')}</p>
        <div className="divider"></div>

      {loading ? (
        <p className="loading-text">{t('loading')}</p>
      ) : videos.length > 0 ? (
        <div className="video-sections">
          <h2 className="video-year-header">2026</h2>
          {(() => {
            const groups = []
            let currentMonth = null
            let currentGroup = []
            videos.forEach((video) => {
              if (video.month !== currentMonth) {
                if (currentGroup.length > 0) groups.push({ month: currentMonth, videos: currentGroup })
                currentMonth = video.month
                currentGroup = [video]
              } else {
                currentGroup.push(video)
              }
            })
            if (currentGroup.length > 0) groups.push({ month: currentMonth, videos: currentGroup })
            return groups.map(({ month, videos: groupVideos }) => (
              <div key={month} className="video-month-group">
                {month && <h3 className="video-month-header">{month}</h3>}
                <div className="video-grid">
                  {groupVideos.map((video) => (
                    <article key={video.id} className="video-card">
                      <div className="video-embed">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="video-info">
                        <h3 className="video-title">{video.title}</h3>
                        {video.artist && <p className="video-artist">{video.artist}</p>}
                        {video.description && <p className="video-description">{video.description}</p>}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))
          })()}
        </div>
      ) : (
        <div className="video-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <p>{t('video.empty')}</p>
        </div>
      )}
      </div>
      <ScrollGallery />
    </div>
  )
}

export default Video
