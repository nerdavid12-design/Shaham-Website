import { useState, useEffect, useRef } from 'react'
import { fetchNowShowing } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import useSplitTextAnimation from '../hooks/useSplitTextAnimation'
import './NowShowing.css'

function NowShowing() {
  const { t, lang } = useLang()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  function localize(item, field) {
    if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`]
    if (lang === 'ar' && item[`${field}_ar`]) return item[`${field}_ar`]
    return item[field] || ''
  }

  useEffect(() => {
    fetchNowShowing().then(data => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  // Load Instagram embed script and process embeds when items load
  useEffect(() => {
    if (loading || items.length === 0) return
    const hasInstagram = items.some(i => i.instagramUrl)
    if (!hasInstagram) return

    if (window.instgrm) {
      window.instgrm.Embeds.process()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.onload = () => {
      if (window.instgrm) window.instgrm.Embeds.process()
    }
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [loading, items])

  const pageRef = useSplitTextAnimation([loading])

  return (
    <PageTransition>
    <div className="now-bg" ref={pageRef}>
    <div className="page now-page">
      <h1 className="page-title">{t('now.title')}</h1>
      <div className="divider"></div>

      {loading ? (
        <p className="loading-text">{t('loading')}</p>
      ) : items.length > 0 ? (
        <div className="now-items">
          {items.map((item) => (
            <article key={item.id} className="now-card">
              <div className="now-info">
                <h2 className="now-title">{localize(item, 'title')}</h2>
                {item.artist && (
                  <p className="now-artist">{localize(item, 'artist')}</p>
                )}
                {item.description && (
                  <p className="now-description">{localize(item, 'description')}</p>
                )}
              </div>
              {item.youtubeId && (
                <div className="now-embed">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeId}`}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {item.videoUrl && !item.youtubeId && (
                <div className="now-embed">
                  <iframe
                    src={item.videoUrl}
                    title={item.title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {item.instagramUrl && (
                <div className="now-instagram-wrap">
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={item.instagramUrl}
                    data-instgrm-version="14"
                    data-instgrm-captioned
                  ></blockquote>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="now-empty">
          <h2 className="now-empty-title">{t('now.empty.title')}</h2>
          <p className="now-empty-text">{t('now.empty.text')}</p>
        </div>
      )}
    </div>
    </div>
    </PageTransition>
  )
}

export default NowShowing
