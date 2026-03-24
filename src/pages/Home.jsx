import { useLang } from '../utils/i18n'
import './Home.css'

const posters = [
  { id: 1, title: 'אירוע השקה - BALL', imageUrl: '/assets/posters/ball.jpg' },
  { id: 2, title: 'הגר: נושאת אבנים', imageUrl: '/assets/posters/hagar.png' },
]

function Home() {
  const { t } = useLang()

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        {/* eslint-disable-next-line react/no-unknown-property */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline=""
          preload="auto"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Gallery Section */}
      <section className="page">
        <div className="gallery">
          {posters.map((poster) => (
            <div key={poster.id} className="gallery-item">
              <img
                src={poster.imageUrl}
                alt={poster.title}
                className="gallery-img"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
