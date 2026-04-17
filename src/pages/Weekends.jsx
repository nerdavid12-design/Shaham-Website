import { useLang } from '../utils/i18n'
import PageTransition from '../components/PageTransition'
import useSplitTextAnimation from '../hooks/useSplitTextAnimation'
import './Weekends.css'

function Weekends() {
  const { t } = useLang()
  const pageRef = useSplitTextAnimation([])

  return (
    <PageTransition>
      <div className="weekends-page" ref={pageRef}>
        <div className="page">
          <h1 className="weekends-title">{t('nav.weekends')}</h1>
        </div>
      </div>
    </PageTransition>
  )
}

export default Weekends
