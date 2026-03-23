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
