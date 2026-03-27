import { useState, useEffect, useRef } from 'react'
import { fetchVideos } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import useSplitTextAnimation from '../hooks/useSplitTextAnimation'
import './Video.css'

function Video() {
  const { t, lang } = useLang()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  function localize(item, field) {
    if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`]
    if (lang === 'ar' && item[`${field}_ar`]) return item[`${field}_ar`]
    return item[field] || ''
  }

  useEffect(() => {
    fetchVideos().then(data => {
      setVideos(data)
      setLoading(false)
    })
  }, [])

  const pageRef = useSplitTextAnimation([loading])
  const videoRef = useRef(null)

  function handleVideoError() {
    if (videoRef.current) videoRef.current.style.display = 'none'
  }

  return (
    <PageTransition>
    <div className="video-page" ref={pageRef}>
      <section className="video-hero">
        <video
          ref={videoRef}
          className="video-hero-bg"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline=""
          preload="auto"
          onError={handleVideoError}
        >
          <source src="/assets/vid-hero.mp4" type="video/mp4" onError={handleVideoError} />
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
                {month && <h3 className="video-month-header">{localize({ month, month_en: groupVideos[0]?.month_en, month_ar: groupVideos[0]?.month_ar }, 'month')}</h3>}
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
                        <h3 className="video-title">{localize(video, 'title')}</h3>
                        {video.artist && <p className="video-artist">{localize(video, 'artist')}</p>}
                        {video.description && <p className="video-description">{localize(video, 'description')}</p>}
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
    </div>
    </PageTransition>
  )
}

export default Video
