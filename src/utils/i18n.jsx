import { createContext, useContext, useState } from 'react'

const translations = {
  he: {
    // Nav
    'nav.home': 'בית',
    'nav.video': 'וידאו שחם',
    'nav.about': 'אודות',
    'nav.now': 'מה מציגים עכשיו',

    // Home
    'home.tagline': 'מרחב ירושלמי לאמנות ניסיונית',
    'home.gallery.title': 'מפרויקטים ואירועים',
    'home.gallery.empty': 'תמונות מפרויקטים ואירועים יתווספו בקרוב',

    // Video
    'video.subtitle': 'היא תכנית שנתית להקרנת וידאו־ארט וקולנוע ניסיוני על מסך הפונה לרחוב בשחם מעבדת תרבות, באוצרות שרון בלבן. העבודות, המתחלפות לאורך השנה, מזמינות מפגש עירוני לילי עם יצירתם של אמני ואמניות וידאו צעירים, מתוך רצון לקדם קולות חדשים בסצנת הווידאו בירושלים.',
    'video.empty': 'סרטונים יתווספו בקרוב',

    // About
    'about.title': 'אודות',
    'about.heading': 'מרכז השחם: מעבדת תרבות',
    'about.vision': 'חזון',
    'about.core': 'משימות ליבה',
    'about.associated': 'משימות נלוות',

    // NowShowing
    'now.title': 'מה מציגים עכשיו',
    'now.empty.title': 'בקרוב',
    'now.empty.text': 'פרטים על הפרויקט הנוכחי יתווספו בקרוב.',

    // Common
    'loading': 'טוען...',

    // Footer
    'footer.text': 'שחם מעבדת תרבות',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.video': 'VID. SHAHAM',
    'nav.about': 'About',
    'nav.now': 'Now Showing',

    // Home
    'home.tagline': '',
    'home.gallery.title': '',
    'home.gallery.empty': '',

    // Video
    'video.subtitle': '',
    'video.empty': '',

    // About
    'about.title': '',
    'about.heading': '',
    'about.vision': '',
    'about.core': '',
    'about.associated': '',

    // NowShowing
    'now.title': '',
    'now.empty.title': '',
    'now.empty.text': '',

    // Common
    'loading': 'Loading...',

    // Footer
    'footer.text': 'Shaham Culture Lab',
  },
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.video': 'فيديو شحم',
    'nav.about': 'حول',
    'nav.now': 'ما يُعرض الآن',

    // Home
    'home.tagline': '',
    'home.gallery.title': '',
    'home.gallery.empty': '',

    // Video
    'video.subtitle': '',
    'video.empty': '',

    // About
    'about.title': '',
    'about.heading': '',
    'about.vision': '',
    'about.core': '',
    'about.associated': '',

    // NowShowing
    'now.title': '',
    'now.empty.title': '',
    'now.empty.text': '',

    // Common
    'loading': '...جاري التحميل',

    // Footer
    'footer.text': 'شحم مختبر ثقافة',
  },
}

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('he')

  function t(key) {
    return translations[lang]?.[key] || translations['he'][key] || key
  }

  const dir = lang === 'en' ? 'ltr' : 'rtl'

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
