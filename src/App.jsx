import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import About from './pages/About'
import NowShowing from './pages/NowShowing'
import './App.css'

const navItems = [
  { path: '/', label: 'בית' },
  { path: '/video', label: 'וידאו שחם' },
  { path: '/about', label: 'אודות' },
  { path: '/now', label: 'מה מציגים עכשיו' },
]

function App() {
  const location = useLocation()

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <NavLink to="/" className="logo-link">
            <img src="/assets/shaham-logo.png" alt="שחם מעבדת תרבות" className="header-logo" />
          </NavLink>
          <nav className="nav">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
            <a href="https://www.instagram.com/shaham.jlm/" target="_blank" rel="noopener noreferrer" className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
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
          <p className="footer-text">שחם מעבדת תרבות &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
