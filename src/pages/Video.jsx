import { useState, useEffect } from 'react'
import { fetchVideos } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import VideoLanding from '../components/VideoLanding'
import useSplitTextAnimation from '../hooks/useSplitTextAnimation'
import './Video.css'

function Video() {
  const { t, lang } = useLang()
  const [videos, setVideos] = useState([])
  const [featuredVideo, setFeaturedVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  function localize(item, field) {
    if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`]
    if (lang === 'ar' && item[`${field}_ar`]) return item[`${field}_ar`]
    return item[field] || ''
  }

  useEffect(() => {
    fetchVideos().then(data => {
      const featured = data.find(v => v.featured)
      setFeaturedVideo(featured || null)
      setVideos(data)
      setLoading(false)
    })
  }, [])

  const pageRef = useSplitTextAnimation([loading])

  return (
    <PageTransition>
    <div className="video-page" ref={pageRef}>
      <VideoLanding featuredVideo={featuredVideo} localize={localize} />

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
