import PageTransition from '../components/PageTransition'
import './Nails.css'

function Nails() {
  return (
    <PageTransition>
      <div className="nails-page">
        <iframe
          src="https://nails-gallery-two.vercel.app/"
          title="NAILS"
          allowFullScreen
        />
      </div>
    </PageTransition>
  )
}

export default Nails
