import { useState } from 'react'
import { COMPANY } from '../constants.js'
import { ConsultIllustration } from '../illustrations.jsx'
import Seo from '../components/Seo.jsx'

const EMPTY = { name: '', email: '', tel: '', message: '' }

function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'お名前を入力してください。'
    if (!form.email.trim()) {
      next.email = 'メールアドレスを入力してください。'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'メールアドレスの形式が正しくありません。'
    }
    if (!form.message.trim()) next.message = 'お問い合わせ内容を入力してください。'
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const subject = `お問い合わせ（${form.name} 様）`
    const body = [
      `お名前: ${form.name}`,
      `メールアドレス: ${form.email}`,
      `電話番号: ${form.tel}`,
      '',
      'お問い合わせ内容:',
      form.message,
    ].join('\n')

    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <Seo path="/contact" name="お問い合わせ" />
      <title>お問い合わせ | 株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIENへのご相談・お見積りは無料です。お電話または問い合わせフォームよりお気軽にどうぞ。千葉県全域・茨城県・東京都・埼玉県対応。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">CONTACT</p>
          <h1 className="page-title">お問い合わせ</h1>
        </div>
      </section>

      <section className="section">
        <div className="section-inner narrow">
          <div className="contact-illu">
            <ConsultIllustration />
          </div>
          <p className="contact-lead">
            「こんなこと聞いていいのかな？」も大歓迎です。専門スタッフが親身に対応いたします。
          </p>
          <div className="contact-tel-block">
            <p className="contact-tel-label">お電話でのお問い合わせ</p>
            <a href={COMPANY.telHref} className="contact-tel">
              {COMPANY.tel}
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">
                お名前 <span className="required">必須</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="field">
              <label htmlFor="email">
                メールアドレス <span className="required">必須</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="field">
              <label htmlFor="tel">電話番号</label>
              <input
                id="tel"
                name="tel"
                type="tel"
                value={form.tel}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="message">
                お問い合わせ内容 <span className="required">必須</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p className="field-error">{errors.message}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              この内容で送信する
            </button>
            <p className="form-note">
              送信ボタンを押すとメールソフトが起動します。内容をご確認のうえ送信してください。
            </p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
