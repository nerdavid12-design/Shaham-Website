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
          <img src="/assets/vid-shaham-neon.png" alt="וידאו שחם - VID. SHAHAM" className="vid-shaham-logo-hero" />
        </div>
      </section>

      <div className="page">
        <p className="video-curated">
          <img src="/assets/vid-shaham-black.png" alt="וידאו שחם" className="video-curated-logo" />
          <span>{t('video.curated')}</span>
        </p>
        <p className="page-subtitle">{t('video.subtitle')}</p>

        <div className="divider"></div>

      {loading ? (
        <p className="loading-text">{t('loading')}</p>
      ) : videos.length > 0 ? (
        <div className="video-sections">
          {(() => {
            const featuredVideos = videos.filter(v => v.featured)
            const pastVideos = videos.filter(v => !v.featured)

            return (
              <>
                {featuredVideos.length > 0 && (
                  <div className="video-featured-section">
                    <div className="video-on-view-banner">
                      <a href="https://www.vidshaham.org/" target="_blank" rel="noopener noreferrer" className="video-on-view-btn">
                        ON VIEW
                      </a>
                    </div>
                    <div className="video-grid">
                      {featuredVideos.map((video) => (
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
                            {(video.instagram_handle || video.artist_email) && (
                              <div className="video-contact">
                                {video.instagram_handle && (() => {
                                  const match = video.instagram_handle.match(/instagram\.com\/([a-zA-Z0-9_.-]+)/)
                                  const handle = match ? match[1] : video.instagram_handle.replace(/^@/, '')
                                  return (
                                    <a
                                      href={`https://instagram.com/${handle}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="video-contact-btn"
                                      aria-label="Instagram"
                                    >
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <circle cx="12" cy="12" r="5" />
                                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                                      </svg>
                                      <span>@{handle}</span>
                                    </a>
                                  )
                                })()}
                                {video.artist_email && (
                                  <a
                                    href={`mailto:${video.artist_email}`}
                                    className="video-contact-btn"
                                    aria-label="Email"
                                  >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <rect x="2" y="4" width="20" height="16" rx="2" />
                                      <polyline points="2,4 12,13 22,4" />
                                    </svg>
                                    <span>{video.artist_email}</span>
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {pastVideos.length > 0 && (
                  <div className="video-past-section">
                    <h2 className="video-section-header">{t('video.past_works')}</h2>
                    <div className="video-grid">
                      {pastVideos.map((video) => (
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
                            {(video.instagram_handle || video.artist_email) && (
                              <div className="video-contact">
                                {video.instagram_handle && (() => {
                                  const match = video.instagram_handle.match(/instagram\.com\/([a-zA-Z0-9_.-]+)/)
                                  const handle = match ? match[1] : video.instagram_handle.replace(/^@/, '')
                                  return (
                                    <a
                                      href={`https://instagram.com/${handle}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="video-contact-btn"
                                      aria-label="Instagram"
                                    >
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <circle cx="12" cy="12" r="5" />
                                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                                      </svg>
                                      <span>@{handle}</span>
                                    </a>
                                  )
                                })()}
                                {video.artist_email && (
                                  <a
                                    href={`mailto:${video.artist_email}`}
                                    className="video-contact-btn"
                                    aria-label="Email"
                                  >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <rect x="2" y="4" width="20" height="16" rx="2" />
                                      <polyline points="2,4 12,13 22,4" />
                                    </svg>
                                    <span>{video.artist_email}</span>
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )
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
