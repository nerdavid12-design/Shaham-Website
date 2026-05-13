import { useState, useEffect } from 'react'
import { fetchEvents } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import useSplitTextAnimation from '../hooks/useSplitTextAnimation'
import SignupForm from '../components/SignupForm'
import './Events.css'

function Events() {
  const { t, lang } = useLang()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [openFormId, setOpenFormId] = useState(null)

  function localize(item, field) {
    if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`]
    if (lang === 'ar' && item[`${field}_ar`]) return item[`${field}_ar`]
    return item[field] || ''
  }

  useEffect(() => {
    fetchEvents().then(data => {
      setEvents(data)
      setLoading(false)
    })
  }, [])

  const pageRef = useSplitTextAnimation([loading])

  // Normalize DD.MM.YYYY or DD/MM/YYYY → YYYY-MM-DD for comparison and parsing
  function normalizeDate(dateStr) {
    if (!dateStr) return ''
    const dotMatch = dateStr.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/)
    if (dotMatch) return `${dotMatch[3]}-${dotMatch[2].padStart(2, '0')}-${dotMatch[1].padStart(2, '0')}`
    return dateStr
  }

  const today = new Date().toISOString().split('T')[0]
  const upcoming = events.filter(e => !e.date || normalizeDate(e.date) >= today)
  const past = events.filter(e => e.date && normalizeDate(e.date) < today)

  function formatDate(dateStr) {
    if (!dateStr) return ''
    try {
      const normalized = normalizeDate(dateStr)
      const d = new Date(normalized + 'T00:00:00')
      if (isNaN(d.getTime())) return dateStr
      return d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'en' ? 'en-US' : 'he-IL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const bgUrl = events[0]?.imageUrl || ''
  const bgIsVideo = /\.(mp4|webm|ogg)(\?|$)/i.test(bgUrl)

  return (
    <PageTransition>
    <div
      className="events-bg"
      style={!bgIsVideo && bgUrl ? { backgroundImage: `url(${bgUrl})` } : {}}
    >
      {bgIsVideo && (
        <video
          className="events-bg-video"
          src={bgUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
    <div className="events-page" ref={pageRef}>
      <div className="page events-inner">
        {loading ? (
          <p className="loading-text">{t('loading')}</p>
        ) : upcoming.length > 0 ? (
          <div className="events-list">
            {upcoming.map((event) => (
              <article key={event.id} className="event-card">
                <div className="event-content">
                  <div className="event-meta">
                    {event.date && <span className="event-date">{formatDate(event.date)}</span>}
                    {event.time && <span className="event-time">{event.time}</span>}
                    {event.location && (
                      <span className="event-location">{localize(event, 'location')}</span>
                    )}
                  </div>
                  <h2 className="event-title" dir="auto">{localize(event, 'title')}</h2>
                  {event.description && (
                    <div className="event-description">
                      {(() => {
                        const lines = localize(event, 'description').replace(/\u00A0/g, ' ').split('\n')
                        let firstNonEmpty = true
                        return lines.map((line, i) => {
                          const isSubtitle = firstNonEmpty && line.trim()
                          if (isSubtitle) firstNonEmpty = false
                          return <span key={i} className={isSubtitle ? 'event-description-subtitle' : ''}>{line}<br /></span>
                        })
                      })()}
                    </div>
                  )}
                  {openFormId === event.id ? (
                    <SignupForm
                      eventName={localize(event, 'title')}
                      t={t}
                      onClose={() => setOpenFormId(null)}
                    />
                  ) : (
                    <button
                      className="event-signup-btn"
                      onClick={() => setOpenFormId(event.id)}
                    >
                      {t('events.signup')}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="events-empty">
            <h2>{t('events.empty.title')}</h2>
            <p>{t('events.empty.text')}</p>
          </div>
        )}

        {past.length > 0 && (
          <>
            <h2 className="events-past-header">{t('events.past')}</h2>
            <div className="divider"></div>
            <div className="events-list events-past">
              {past.map((event) => (
                <article key={event.id} className="event-card event-card-past">
                  <div className="event-content">
                    <div className="event-meta">
                      {event.date && <span className="event-date">{formatDate(event.date)}</span>}
                    </div>
                    <h2 className="event-title" dir="auto">{localize(event, 'title')}</h2>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        <div className="events-map">
          <iframe
            title="venue-map"
            src="https://maps.google.com/maps?q=שחם+מעבדת+תרבות&output=embed"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
    </div>
    </PageTransition>
  )
}

export default Events
