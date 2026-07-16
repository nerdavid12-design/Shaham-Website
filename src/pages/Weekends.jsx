import { useState, useEffect } from 'react'
import { fetchWeekends } from '../utils/sheets'
import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import useSplitTextAnimation from '../hooks/useSplitTextAnimation'
import './Weekends.css'

const PROGRAMS = [
  {
    id: 'jazz-visuals',
    poster: '/assets/posters/jazz-ora-kevodi.jpg',
    posterAlt: 'Jazz & Visualz | עורה כבודי',
  },
]

function Weekends() {
  const { t } = useLang()
  const [media, setMedia] = useState([])
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
