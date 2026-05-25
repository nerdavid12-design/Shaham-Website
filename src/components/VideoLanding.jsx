import { useLang } from '../utils/i18n'
import './VideoLanding.css'

function VideoLanding({ featuredVideo, localize }) {
  const { t, lang } = useLang()
  const v = featuredVideo

  return (
    <section className="vl">
      {/* Decorative shapes */}
      <div className="vl-shape vl-shape--green-bar-1" aria-hidden="true"></div>
      <div className="vl-shape vl-shape--green-bar-2" aria-hidden="true"></div>
      <div className="vl-shape vl-shape--green-bar-3" aria-hidden="true"></div>
      <div className="vl-shape vl-shape--magenta-l-1" aria-hidden="true"></div>
      <div className="vl-shape vl-shape--magenta-l-2" aria-hidden="true"></div>
      <div className="vl-shape vl-shape--green-ring" aria-hidden="true"></div>

      {/* Hero title */}
      <div className="vl-hero">
        <img src="/assets/vid-shaham-neon.png" alt="וידאו שחם - VID. SHAHAM" className="vl-hero-logo" />
      </div>

      {/* Program description */}
      <div className="vl-desc">
        <p>{t('video.subtitle')}</p>
      </div>

      {/* "Now" banner */}
      <div className="vl-now-section">
        <h2 className="vl-now">
          <span className="vl-highlight-magenta">{t('video.now')}</span>
        </h2>
      </div>

      {v && (
        <>
          {/* Featured video embed */}
          <div className="vl-featured-embed">
            <iframe
              src={`https://www.youtube.com/embed/${v.youtubeId}`}
              title={localize(v, 'title')}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Artist + work info */}
          <div className="vl-featured-info">
            <h2 className="vl-artist-he">{v.artist}</h2>
            {v.artist_en && <h3 className="vl-artist-en">{v.artist_en}</h3>}
            <div className="vl-meta">
              {v.duration && <span>{v.duration}</span>}
              {v.year && <span>{v.year}</span>}
            </div>
            <h2 className="vl-work-title-he">{v.title}</h2>
            {v.title_en && <h3 className="vl-work-title-en">{v.title_en}</h3>}
          </div>

          {/* About the artist */}
          {(v.artist_bio || v.artist_bio_en) && (
            <div className="vl-about">
              <h3 className="vl-about-heading">
                <span className="vl-highlight-green">{t('video.about_artist')}</span>
              </h3>
              <div className="vl-about-grid">
                <div className="vl-about-bio">
                  <p>{localize(v, 'artist_bio')}</p>
                </div>
                {v.description && (
                  <div className="vl-about-work">
                    <p>{localize(v, 'description')}</p>
                  </div>
                )}
              </div>
              {v.artist_photo && (
                <div className="vl-about-photo-wrap">
                  <img src={v.artist_photo} alt={localize(v, 'artist')} className="vl-about-photo" />
                </div>
              )}
              {v.artist_email && (
                <a href={`mailto:${v.artist_email}`} className="vl-about-email">{v.artist_email}</a>
              )}
            </div>
          )}
        </>
      )}

      {/* Extended description + decorative shapes */}
      <div className="vl-extended">
        <div className="vl-shape vl-shape--magenta-l-3" aria-hidden="true"></div>
        <p className="vl-extended-text">{t('video.subtitle')}</p>
      </div>

      {/* "On View" transition header */}
      <div className="vl-on-view">
        <span className="vl-highlight-magenta vl-on-view-he">{t('video.on_view')}</span>
        <span className="vl-highlight-green vl-on-view-en">ON VIEW</span>
      </div>
    </section>
  )
}

export default VideoLanding
