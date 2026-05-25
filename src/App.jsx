import { useState } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Video from './pages/Video'
import About from './pages/About'
import NowShowing from './pages/NowShowing'
import Events from './pages/Events'
import Weekends from './pages/Weekends'
import { useLang } from './utils/i18n'
import './App.css'

const navKeys = [
  { path: '/', key: 'nav.home' },
  { path: '/video', key: 'nav.video' },
  { path: '/now', key: 'nav.now' },
  { path: '/events', key: 'nav.events' },
  { path: '/weekends', key: 'nav.weekends' },
]

const langs = ['he', 'en']

function App() {
  const location = useLocation()
  const { lang, setLang, t, dir } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app" dir={dir}>
      <header className="header">
        <div className="header-inner">
          <NavLink to="/" className="logo-link" onClick={() => setMenuOpen(false)}>
            <img src="/assets/shaham-logo.png" alt="שחם מעבדת תרבות" className="header-logo" />
          </NavLink>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            {navKeys.map(({ path, key }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {path === '/video' ? (
                  <span className="nav-vid-logo-wrap">
                    <img src="/assets/vid-shaham-white.png" alt="VID. SHAHAM" className="nav-vid-logo nav-vid-white" />
                    <img src="/assets/vid-shaham-neon.png" alt="" className="nav-vid-logo nav-vid-neon" aria-hidden="true" />
                  </span>
                ) : (
                  t(key)
                )}
              </NavLink>
            ))}
            <a href="https://www.instagram.com/shaham.jlm/" target="_blank" rel="noopener noreferrer" className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <div className="lang-switcher">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`lang-btn ${lang === l ? 'lang-active' : ''}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/video" element={<Video />} />
            <Route path="/about" element={<About />} />
            <Route path="/now" element={<NowShowing />} />
            <Route path="/events" element={<Events />} />
            <Route path="/weekends" element={<Weekends />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logos">
            <img src="/assets/shaham-icon.png" alt="שחם" className="footer-logo-img" />
            <img src="/assets/sadeh-logo.png" alt="שדה - אמנות חזותית בירושלים" className="footer-logo-img" />
          </div>
          <p className="footer-text">{t('footer.text')} &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
