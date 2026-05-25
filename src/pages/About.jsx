import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import './About.css'

gsap.registerPlugin(SplitText, ScrollTrigger)

function About() {
  const { t } = useLang()
  const pageRef = useRef(null)

  useEffect(() => {
    if (!pageRef.current) return
    const targets = pageRef.current.querySelectorAll('h1, p')
    const splits = []
    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        const split = SplitText.create(el, { type: 'words' })
        splits.push(split)
        gsap.from(split.words, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      })
    }, pageRef)
    return () => {
      ctx.revert()
      splits.forEach(s => s.revert())
    }
  }, [])

  return (
    <PageTransition>
    <div className="about-page" ref={pageRef}>
      <section className="about-hero">
        <video
          className="about-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="about-hero-overlay"></div>
      </section>

      <div className="page">
      <h1 className="page-title">{t('about.vision')}</h1>
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
          <p>{t('about.vision.text')}</p>
        </div>
      </div>
      </div>
    </div>
    </PageTransition>
  )
}

export default About
