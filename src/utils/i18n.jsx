import { createContext, useContext, useState } from 'react'

const translations = {
  he: {
    // Nav
    'nav.home': 'בית',
    'nav.video': 'וידאו שחם',
    'nav.about': 'אודות',
    'nav.now': 'עכשיו בשחם',

    // Home
    'home.tagline': 'מרחב ירושלמי לאמנות ניסיונית',
    'home.gallery.title': 'מפרויקטים ואירועים',
    'home.gallery.heading': 'פרויקטים בעבר ובהווה',
    'home.gallery.empty': 'תמונות מפרויקטים ואירועים יתווספו בקרוב',

    // Video
    'video.subtitle': 'תכנית שנתית להקרנת וידאו ארט וקולנוע ניסיוני על מסך הפונה לרחוב בשחם מעבדת תרבות. העבודות מזמינות מפגש עירוני לילי עם יצירתם של אמני ואמניות וידאו צעירים, מתוך רצון לקדם קולות חדשים בסצנת הווידאו בירושלים.',
    'video.heading': 'וידאו שחם | באוצרות שרון בלבן',
    'video.curated': '| באוצרות שרון בלבן',
    'video.empty': 'סרטונים יתווספו בקרוב',
    'video.now': 'עכשיו',
    'video.about_artist': 'על האמן',
    'video.on_view': 'מוצג',
    'video.on_view_en': 'ON VIEW',

    // About
    'about.title': 'אודות',
    'about.heading': 'מרכז השחם: מעבדת תרבות',
    'about.vision': 'חזון',
    'about.vision.text': 'ירושלים הינה עיר מיוחדת במינה. לא רק בשל המורכבות התרבותית שלה, אלא בזכותה. סתירות רבות עולות מן הניגודים הללו, אך אותן סתירות ממש יכולות להיות מוגדרות כנקודות ממשק מרתקות. לעיתים קרובות נאמר כי העיר משקפת את המגוון של המדינה ומשמשת כזרז לישראל כולה. בעיר פועלים כ-11 מוסדות אקדמיים בתחום האמנות, מהמובילים בארץ. לכן, ירושלים ניצבת לא רק כמקום האוצר מסורת עתיקה, אלא גם כמרחב אינטנסיבי המבקש מתושביו לעמוד כל העת בפני אתגרים. המרכז שלנו יבקש לעמוד בתור מעבדה פנימית שבה נערכים ניסויים אלו.',
    'about.core': 'משימות ליבה',
    'about.associated': 'משימות נלוות',

    // NowShowing
    'now.title': 'עכשיו בשחם',
    'now.empty.title': 'בקרוב',
    'now.empty.text': 'פרטים על הפרויקט הנוכחי יתווספו בקרוב.',
    'now.hagar.title': 'הגר: נושאת אבנים | אנה קוצ\'ריאבי',
    'now.hagar.description': 'הפרויקט הוא מעבדת מחקר ופיתוח רב-תחומית החוקרת גלות, זיכרון ומרחב קדוש דרך סיפורה של הגר. בבסיסו, הפרויקט שואל: כיצד המרחב מעצב את חוויית הטראומה, הזיכרון והגעגוע?',

    // Events
    'nav.events': 'אירועים',
    'events.title': 'אירועים',
    'events.signup': 'הרשמה',
    'events.signup.success': 'נרשמת בהצלחה!',
    'events.signup.error': 'שגיאה בהרשמה, נסו שוב.',
    'events.signup.sending': 'שולח...',
    'events.name': 'שם מלא',
    'events.email': 'אימייל',
    'events.phone': 'טלפון',
    'events.guests': 'מספר אורחים',
    'events.directions': 'נווט',
    'events.promo.consent': 'אני מסכים/ה לקבל עדכונים ואירועים מהמרחב',
    'events.empty.title': 'בקרוב',
    'events.empty.text': 'אירועים קרובים יתווספו בקרוב.',
    'events.past': 'אירועים שהיו',

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
    'home.tagline': 'A Jerusalem Space for Experimental Art',
    'home.gallery.title': 'Projects & Events',
    'home.gallery.heading': 'Past and Present Projects',
    'home.gallery.empty': 'Project and event photos will be added soon',

    // Video
    'video.subtitle': 'An annual program geared towards screening video art and experimental cinema on a street-facing screen. The works invite pedestrians for a nightly urban encounter with the creations of young video artists, aiming to promote new voices within the local Jerusalem video scene.',
    'video.heading': 'Vid.Shaham | Curated by Sharon Balban',
    'video.curated': '| Curated by Sharon Balban',
    'video.empty': 'Videos coming soon',
    'video.now': 'Now Showing',
    'video.about_artist': 'About the Artist',
    'video.on_view': 'On View',
    'video.on_view_en': 'ON VIEW',

    // About
    'about.title': 'About',
    'about.heading': 'Shaham Center: Culture Lab',
    'about.vision': 'Vision',
    'about.vision.text': 'Jerusalem is a one-of-a-kind city. This is true not only despite its cultural complexity, but because of it. Many contradictions arise from these contrasts, yet those same contradictions can be defined as fascinating points of interface. It is often said that the city reflects the diversity of the country and serves as a catalyst for Israel as a whole. The city is home to 11 academic art institutions, among the leading in the country. Therefore, Jerusalem stands not only as a place holding ancient tradition, but also as an intensive space that constantly asks its residents to meet challenges. Our center seeks to serve as an internal laboratory in which these experiments are conducted.',
    'about.core': 'Core Missions',
    'about.associated': 'Associated Missions',

    // NowShowing
    'now.title': 'Now Showing',
    'now.empty.title': 'Coming Soon',
    'now.empty.text': 'Details about the current project will be added soon.',
    'now.hagar.title': 'Hagar, Who Carries Stones | Annie Q',
    'now.hagar.description': 'A multidisciplinary research and development lab exploring exile, memory, and sacred space through the story of Hagar. At its core, the project asks: How does space shape the experience of trauma, memory, and longing?',

    // Events
    'nav.events': 'Events',
    'events.title': 'Events',
    'events.signup': 'Sign Up',
    'events.signup.success': 'Successfully registered!',
    'events.signup.error': 'Registration failed, please try again.',
    'events.signup.sending': 'Sending...',
    'events.name': 'Full Name',
    'events.email': 'Email',
    'events.phone': 'Phone',
    'events.guests': 'Number of Guests',
    'events.directions': 'Get Directions',
    'events.promo.consent': 'I agree to receive updates and event announcements from the venue',
    'events.empty.title': 'Coming Soon',
    'events.empty.text': 'Upcoming events will be added soon.',
    'events.past': 'Past Events',

    // Common
    'loading': 'Loading...',

    // Footer
    'footer.text': 'Shaham Culture Lab',
  },
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.video': 'فيديو شحام',
    'nav.about': 'حول',
    'nav.now': 'الآن في "شحام"',

    // Home
    'home.tagline': 'حيز قدسي للفن التجريبي',
    'home.gallery.title': 'من المشاريع والفعاليات',
    'home.gallery.heading': 'مشاريع في الماضي والحاضر',
    'home.gallery.empty': 'ستُضاف صور من المشاريع والفعاليات قريباً',

    // Video
    'video.subtitle': 'برنامج سنوي لعرض فن الفيديو والسينما التجريبية على شاشة تطل على الشارع في مختبر "شحام" الثقافي. تدعو الأعمال إلى لقاء مدني ليلي مع إبداعات فناني وفنانات فيديو شباب، انطلاقاً من الرغبة في تعزيز أصوات جديدة في مشهد الفيديو في القدس.',
    'video.heading': 'فيديو شحام | من تقييم شارون بلبان',
    'video.curated': '| من تقييم شارون بلبان',
    'video.empty': 'ستُضاف مقاطع فيديو قريباً',
    'video.now': 'الآن',
    'video.about_artist': 'عن الفنان',
    'video.on_view': 'معروض',
    'video.on_view_en': 'ON VIEW',

    // About
    'about.title': 'حول',
    'about.heading': 'مركز شحام: مختبر ثقافة',
    'about.vision': 'رؤية',
    'about.vision.text': 'القدس مدينة فريدة من نوعها، ليس فقط بسبب تعقيدها الثقافي، بل بفضله. تنشأ تناقضات عديدة من هذا التباين، ولكن يمكن تعريف هذه التناقضات كنقاط التقاء رائعة. كثيراً ما يقال إن المدينة تعكس تنوع الدولة وتشكل حافزاً لإسرائيل ككل. يوجد في المدينة حوالي 11 مؤسسة أكاديمية في مجال الفنون، وهي من الرواد في البلاد. لذلك، لا تقف القدس كمكان يحمل تقاليد قديمة فحسب، بل أيضاً كحيز مكثف يطلب من سكانه مواجهة التحديات باستمرار. يسعى مركزنا ليكون بمثابة مختبر داخلي تُجرى فيه هذه التجارب.',
    'about.core': 'المهام الأساسية',
    'about.associated': 'المهام المرتبطة',

    // NowShowing
    'now.title': 'الآن في "شحام"',
    'now.empty.title': 'قريباً',
    'now.empty.text': 'ستُضاف تفاصيل المشروع الحالي قريباً.',
    'now.hagar.title': 'هاجر: حاملة الحجارة | أنا كوتشريافي',
    'now.hagar.description': 'مختبر بحث وتطوير متعدد المجالات يستكشف النفي والذاكرة والحيز المقدس من خلال قصة هاجر. في جوهره، يتساءل المشروع: كيف يشكل الحيز تجربة الصدمة والذاكرة والشوق؟',

    // Events
    'nav.events': 'فعاليات',
    'events.title': 'فعاليات',
    'events.signup': 'التسجيل',
    'events.signup.success': 'تم التسجيل بنجاح!',
    'events.signup.error': 'فشل التسجيل، يرجى المحاولة مرة أخرى.',
    'events.signup.sending': 'جارٍ الإرسال...',
    'events.name': 'الاسم الكامل',
    'events.email': 'البريد الإلكتروني',
    'events.phone': 'الهاتف',
    'events.guests': 'عدد الضيوف',
    'events.directions': 'احصل على الاتجاهات',
    'events.promo.consent': 'أوافق على تلقي التحديثات والإعلانات عن الفعاليات من المركز',
    'events.empty.title': 'قريباً',
    'events.empty.text': 'ستُضاف الفعاليات القادمة قريباً.',
    'events.past': 'فعاليات سابقة',

    // Common
    'loading': 'جاري التحميل...',

    // Footer
    'footer.text': 'شحام مختبر ثقافة',
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
