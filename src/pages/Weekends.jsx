import { useState, useEffect } from 'react'
import { fetchWeekends } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import SignupForm from '../components/SignupForm'
import useSplitTextAnimation from '../hooks/useSplitTextAnimation'
import './Weekends.css'

const PROGRAMS = [
  {
    id: 'jazz-visuals',
    poster: '/assets/posters/jazz-oz-yechiali.jpg',
    posterAlt: 'Jazz & Visualz | חמישיית עוז יחיאלי',
    ticketUrl: 'https://tickchak.co.il/107572',
  },
]

function Weekends() {
  const { t } = useLang()
  const [media, setMedia] = useState([])
  const [activeSignup, setActiveSignup] = useState(null)
  const pageRef = useSplitTextAnimation([media.length])

  useEffect(() => {
    fetchWeekends().then(setMedia)
  }, [])

  return (
    <PageTransition>
      <div className="weekends-page" ref={pageRef}>

        <div className="wknd-programs">
          {PROGRAMS.map((program) => (
            <section key={program.id} className={`wknd-section wknd-${program.id}`}>
              <div className="wknd-poster-wrap">
                <img
                  src={program.poster}
                  alt={program.posterAlt}
                  className="wknd-poster"
                />
              </div>
              <div className="wknd-text">
                {program.ticketUrl ? (
                  <a
                    href={program.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-signup-btn"
                  >
                    {t('weekends.tickets')}
                  </a>
                ) : activeSignup === program.id ? (
                  <SignupForm
                    eventName={program.posterAlt}
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
            </section>
          ))}
        </div>

        {media.length > 0 && (
          <div className="wknd-gallery-section">
            <div className="wknd-gallery-inner">
              <h2 className="wknd-gallery-title">{t('weekends.gallery')}</h2>
              <div className="wknd-gallery">
                {media.map((item) => (
                  <div key={item.id} className="wknd-media-item">
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
          </div>
        )}

      </div>
    </PageTransition>
  )
}

export default Weekends
