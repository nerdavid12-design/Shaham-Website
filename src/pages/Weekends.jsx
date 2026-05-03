import { useState, useEffect } from 'react'
import { fetchWeekends } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import SignupForm from '../components/SignupForm'
import useSplitTextAnimation from '../hooks/useSplitTextAnimation'
import './Weekends.css'

const WEEKEND_PROGRAMS = [
  {
    id: 1,
    name: 'Jazz & Visuals',
    day: 'חמישי בלילה',
    time: '20:00–23:00',
    description: 'מוזיקה מודרנית חיה בשילוב עם אומנות וידאו (VJ) מוקרנים בסנכרון חופשי. הווידאו מגיב באופן חי לאמנים ולמוזיקה שמתנגנת בהופעה.',
  },
  {
    id: 2,
    name: 'מופעי שישי',
    day: 'שישי בצהריים',
    time: '12:00–14:00',
    description: 'מופע משתנה פתוח לקהל הרחב, סטודנט/ית מהחזותי או בוגרים טריים.',
  },
  {
    id: 3,
    name: 'מועדון Twin Peaks',
    day: 'מוצאי שבת',
    time: '20:00–23:00',
    description: 'הקרנה שבועית של הסדרה הקלאסית של דיוויד לינץ׳ + דיון קצר. אפשר להצטרף מכל פרק. עונה 1 בקיץ, עונה 2 בהמשך.',
  },
]

function Weekends() {
  const { t } = useLang()
  const [media, setMedia] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [activeSignup, setActiveSignup] = useState(null)
  const pageRef = useSplitTextAnimation([media.length])

  useEffect(() => {
    fetchWeekends().then(setMedia)
  }, [])

  return (
    <PageTransition>
      <div className="weekends-page" ref={pageRef}>
        <div className="page">

          {/* Page header */}
          <div className="weekends-header">
            <h1 className="weekends-title">{t('nav.weekends')}</h1>
            <p className="weekends-subtitle">{t('weekends.subtitle')}</p>
          </div>

          {/* Program cards */}
          <div className="weekends-programs">
            {WEEKEND_PROGRAMS.map((program) => (
              <div key={program.id} className="weekends-program-card">
                <div className="weekends-program-meta">
                  <span className="weekends-program-day">{program.day}</span>
                  <span className="weekends-program-time" dir="ltr">{program.time}</span>
                </div>
                <h2 className="weekends-program-name" dir="ltr">{program.name}</h2>
                <p className="weekends-program-desc">{program.description}</p>
                {activeSignup === program.id ? (
                  <SignupForm
                    eventName={program.name}
                    t={t}
                    onClose={() => setActiveSignup(null)}
                  />
                ) : (
                  <button
                    className="event-signup-btn"
                    onClick={() => setActiveSignup(program.id)}
                  >
                    {t('events.signup')}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Past events gallery */}
          {media.length > 0 && (
            <div className="weekends-gallery-section">
              <h2 className="weekends-gallery-title">{t('weekends.gallery')}</h2>
              <div className="weekends-gallery">
                {media.map((item) => (
                  <div key={item.id} className="weekends-media-item">
                    {item.videoUrl ? (
                      <iframe
                        src={item.videoUrl}
                        title={item.title}
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : (
                      <img src={item.imageUrl} alt={item.title} loading="lazy" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  )
}

export default Weekends
