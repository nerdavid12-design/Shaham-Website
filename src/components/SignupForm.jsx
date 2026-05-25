import { useState } from 'react'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz-LjwYD71nUK11BxLi3wJuXgtxt006PoKc7X7LSjhqL31fw_PtQIyhXGQe3uOFlwpmfA/exec'

export default function SignupForm({ eventName, t, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', guests: '1', promoConsent: true })
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(prev => ({ ...prev, [e.target.name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventName,
          name: form.name,
          email: form.email,
          phone: form.phone,
          guests: form.guests,
          promoConsent: form.promoConsent,
        }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="event-form-success">
        <p>{t('events.signup.success')}</p>
        <button type="button" className="event-form-close" onClick={onClose}>&times;</button>
      </div>
    )
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <button type="button" className="event-form-close" onClick={onClose}>&times;</button>
      <input name="name" type="text" placeholder={t('events.name')} value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder={t('events.email')} value={form.email} onChange={handleChange} required />
      <input name="phone" type="tel" placeholder={t('events.phone')} value={form.phone} onChange={handleChange} />
      <input name="guests" type="number" min="1" max="20" placeholder={t('events.guests')} value={form.guests} onChange={handleChange} />
      <label className="event-form-checkbox">
        <input name="promoConsent" type="checkbox" checked={form.promoConsent} onChange={handleChange} />
        {t('events.promo.consent')}
      </label>
      <button type="submit" className="event-form-submit" disabled={status === 'sending'}>
        {status === 'sending' ? t('events.signup.sending') : t('events.signup')}
      </button>
      {status === 'error' && <p className="event-form-error">{t('events.signup.error')}</p>}
    </form>
  )
}
