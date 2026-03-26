import { useLang } from '../utils/i18n'
import './About.css'

function About() {
  const { t } = useLang()

  return (
    <div className="about-page">
      <section className="about-hero">
        <video
          className="about-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="about-hero-overlay"></div>
      </section>

      <div className="page">
      <h1 className="page-title">{t('about.title')}</h1>
      <div className="divider"></div>

      <div className="about-content">
        <div className="about-logo-section">
          <img
            src="/assets/shaham-logo-vertical.png"
            alt="שחם מעבדת תרבות"
            className="about-logo"
          />
        </div>
        <div className="about-text">
          <h2 className="about-heading">{t('about.heading')}</h2>

          <h3 className="about-subheading">{t('about.vision')}</h3>
          <p>{t('about.vision.text')}</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default About
