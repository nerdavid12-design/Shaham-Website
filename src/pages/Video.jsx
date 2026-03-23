import { useState, useEffect } from 'react'
import { fetchVideos } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import './Video.css'

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
    <div className="page">
      <img src="/assets/vid-shaham-black.png" alt="וידאו שחם - VID. SHAHAM" className="vid-shaham-logo" />
      <p className="page-subtitle">{t('video.subtitle')}</p>
      <div className="divider"></div>

      {loading ? (
        <p className="loading-text">{t('loading')}</p>
      ) : videos.length > 0 ? (
        <div className="video-grid">
          {videos.map((video) => (
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
                {video.artist && (
                  <p className="video-artist">{video.artist}</p>
                )}
                {video.description && (
                  <p className="video-description">{video.description}</p>
                )}
              </div>
            </article>
          ))}
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
  )
}

export default Video
