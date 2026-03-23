import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import About from './pages/About'
import NowShowing from './pages/NowShowing'
import { useLang } from './utils/i18n'
import './App.css'

const navKeys = [
  { path: '/', key: 'nav.home' },
  { path: '/video', key: 'nav.video' },
  { path: '/about', key: 'nav.about' },
  { path: '/now', key: 'nav.now' },
]

const langs = ['he', 'en', 'ar']

function App() {
  const location = useLocation()
  const { lang, setLang, t, dir } = useLang()

  return (
    <div className="app" dir={dir}>
      <header className="header">
        <div className="header-inner">
          <NavLink to="/" className="logo-link">
            <img src="/assets/shaham-logo.png" alt="שחם מעבדת תרבות" className="header-logo" />
          </NavLink>
          <nav className="nav">
            {navKeys.map(({ path, key }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {t(key)}
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video" element={<Video />} />
          <Route path="/about" element={<About />} />
          <Route path="/now" element={<NowShowing />} />
        </Routes>
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
