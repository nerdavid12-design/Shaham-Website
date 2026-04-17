import { useState, useEffect } from 'react'
import { fetchWeekends } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import SignupForm from '../components/SignupForm'
import useSplitTextAnimation from '../hooks/useSplitTextAnimation'
import './Weekends.css'

function Weekends() {
  const { t } = useLang()
  const [media, setMedia] = useState([])
  const [showForm, setShowForm] = useState(false)
  const pageRef = useSplitTextAnimation([media.length])

  useEffect(() => {
    fetchWeekends().then(setMedia)
  }, [])

  return (
    <PageTransition>
      <div className="weekends-page" ref={pageRef}>
        <div className="page">

          {/* Signup section */}
          <div className="weekends-signup-section">
            <h1 className="weekends-title">Jazz & Visuals</h1>
            <p className="weekends-subtitle">{t('weekends.subtitle')}</p>
            {showForm ? (
              <SignupForm
                eventName="Jazz & Visuals"
                t={t}
                onClose={() => setShowForm(false)}
              />
            ) : (
              <button className="event-signup-btn" onClick={() => setShowForm(true)}>
                {t('events.signup')}
              </button>
            )}
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
