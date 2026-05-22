import { useState } from 'react'
import { company } from '../data/company.js'

const initialForm = {
  name: '',
  email: '',
  tel: '',
  subject: '',
  message: '',
}

function Contact() {
  const [form, setForm] = useState(initialForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = form.subject || `お問い合わせ（${form.name}様）`
    const body = [
      `お名前: ${form.name}`,
      `メール: ${form.email}`,
      `電話番号: ${form.tel || '（未記入）'}`,
      '',
      'お問い合わせ内容:',
      form.message,
    ].join('\n')

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">CONTACT</p>
          <h1 className="page-title">お問い合わせ</h1>
          <p className="page-lead">
            工事のご相談・お見積りは、下記フォームまたはお電話にてお気軽にお問い合わせください。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner contact-layout">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="field">
              <span className="field-label">
                お名前<span className="req">必須</span>
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span className="field-label">
                メールアドレス<span className="req">必須</span>
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span className="field-label">電話番号</span>
              <input
                type="tel"
                name="tel"
                value={form.tel}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span className="field-label">件名</span>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span className="field-label">
                お問い合わせ内容<span className="req">必須</span>
              </span>
              <textarea
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </label>

            <button type="submit" className="btn btn-primary btn-block">
              この内容で送信する
            </button>
            <p className="form-note">
              送信ボタンを押すと、ご利用のメールソフトが起動します。
            </p>
          </form>

          <aside className="contact-aside">
            <h2 className="aside-title">お電話でのお問い合わせ</h2>
            <p className="aside-tel">
              <a href={`tel:${company.tel.replace(/-/g, '')}`}>{company.tel}</a>
            </p>
            <dl className="aside-info">
              <dt>会社名</dt>
              <dd>{company.name}</dd>
              <dt>所在地</dt>
              <dd>{company.address}</dd>
            </dl>
          </aside>
        </div>
      </section>
    </>
  )
}

export default Contact
