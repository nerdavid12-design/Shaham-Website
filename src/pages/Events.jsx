import { useState, useEffect } from 'react'
import { fetchEvents } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import useSplitTextAnimation from '../hooks/useSplitTextAnimation'
import './Events.css'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwINSpMMANfk0ao9XGGxVLC1nWeCi2KtAT1EdUd0QQ__avb6eWtPsJbzjt-0vVJ0EKPfg/exec'

function EventSignupForm({ event, t, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', guests: '1' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!APPS_SCRIPT_URL) {
      setStatus('success')
      return
    }
    setStatus('sending')
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: event.title,
          name: form.name,
          email: form.email,
          phone: form.phone,
          guests: form.guests,
        }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="event-form-success">
        <p>{t('events.signup.success')}</p>
        <button type="button" className="event-form-close" onClick={onClose}>&times;</button>
      </div>
    )
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <button type="button" className="event-form-close" onClick={onClose}>&times;</button>
      <input
        name="name"
        type="text"
        placeholder={t('events.name')}
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder={t('events.email')}
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        type="tel"
        placeholder={t('events.phone')}
        value={form.phone}
        onChange={handleChange}
      />
      <input
        name="guests"
        type="number"
        min="1"
        max="20"
        placeholder={t('events.guests')}
        value={form.guests}
        onChange={handleChange}
      />
      <button type="submit" className="event-form-submit" disabled={status === 'sending'}>
        {status === 'sending' ? t('events.signup.sending') : t('events.signup')}
      </button>
      {status === 'error' && <p className="event-form-error">{t('events.signup.error')}</p>}
    </form>
  )
}

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

  // Normalize DD.MM.YYYY → YYYY-MM-DD for comparison and parsing
  function normalizeDate(dateStr) {
    if (!dateStr) return ''
    const dotMatch = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
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
      return d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'en' ? 'en-US' : 'he-IL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const bgImage = events[0]?.imageUrl || ''

  return (
    <PageTransition>
    <div
      className="events-bg"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
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
                    {event.location && <span className="event-location">{localize(event, 'location')}</span>}
                  </div>
                  <h2 className="event-title">{localize(event, 'title')}</h2>
                  {event.description && (
                    <p className="event-description">{localize(event, 'description')}</p>
                  )}
                  {openFormId === event.id ? (
                    <EventSignupForm
                      event={event}
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
                    <h2 className="event-title">{localize(event, 'title')}</h2>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    </div>
    </PageTransition>
  )
}

export default Events
