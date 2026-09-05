import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { COMPANY, WEB3FORMS_ACCESS_KEY } from '../constants.js'
import { ConsultIllustration } from '../illustrations.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import CtaAssurance from '../components/CtaAssurance.jsx'

const EMPTY = { name: '', email: '', tel: '', message: '' }

function Contact() {
  const [searchParams] = useSearchParams()
  // 診断シミュレーション等から引き継いだ内容を初期値に反映（?message=）。
  const [form, setForm] = useState(() => ({
    ...EMPTY,
    message: searchParams.get('message') || '',
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

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

  // アクセスキー未設定時のフォールバック（従来のメーラー起動）
  const sendViaMailto = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    // ハニーポット（ボット除け）: 隠しフィールドに入力があれば送信しない
    if (e.target.company_website && e.target.company_website.value) return

    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    // アクセスキー未設定ならメーラー起動にフォールバック
    if (!WEB3FORMS_ACCESS_KEY) {
      sendViaMailto()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `【お問い合わせ】${form.name} 様（株式会社LIEN サイト）`,
          from_name: '株式会社LIEN お問い合わせフォーム',
          replyto: form.email,
          お名前: form.name,
          メールアドレス: form.email,
          電話番号: form.tel || '（未入力）',
          お問い合わせ内容: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm(EMPTY)
        setErrors({})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Seo path="/contact" name="お問い合わせ" />
      <title>無料見積もり・お問い合わせ | 市川市の株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIENへのご相談・お見積りは無料です。お電話または問い合わせフォームよりお気軽にどうぞ。千葉県全域・東京都・埼玉県・神奈川県・茨城県対応。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">CONTACT</p>
          <h1 className="page-title">お問い合わせ</h1>
        </div>
      </section>

      <Breadcrumb />

      <section className="section">
        <div className="section-inner narrow">
          <div className="contact-illu">
            <ConsultIllustration />
          </div>
          <p className="contact-lead">
            「こんなこと聞いていいのかな？」も大歓迎です。専門スタッフが親身に対応いたします。
          </p>
          <ul className="assurance">
            <li>相談・見積もり無料</li>
            <li>相談だけでもOK</li>
            <li>しつこい営業なし</li>
            <li>1営業日以内に返信</li>
          </ul>
          <div className="contact-tel-block">
            <p className="contact-tel-label">お電話でのお問い合わせ</p>
            <a href={COMPANY.telHref} className="contact-tel">
              {COMPANY.tel}
            </a>
            <div>
              <a
                href={COMPANY.mapUrl}
                className="map-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                </svg>
                Googleマップで見る
              </a>
            </div>
          </div>

          {status === 'success' ? (
            <div className="form-success" role="status">
              <p className="form-success-title">送信が完了しました。</p>
              <p>
                お問い合わせありがとうございます。1営業日以内に担当者よりご連絡いたします。お急ぎの場合はお電話（
                <a href={COMPANY.telHref}>{COMPANY.tel}</a>
                ）でもご相談いただけます。
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="company_website"
                className="hp-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
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

              {status === 'error' && (
                <p className="form-error-banner" role="alert">
                  送信に失敗しました。お手数ですが、お電話（{COMPANY.tel}
                  ）または時間をおいて再度お試しください。
                </p>
              )}

              <CtaAssurance>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? '送信中…' : 'この内容で送信する'}
                </button>
              </CtaAssurance>
              <p className="form-note">
                {WEB3FORMS_ACCESS_KEY
                  ? '内容をご確認のうえ送信してください。1営業日以内にご返信します。'
                  : '送信ボタンを押すとメールソフトが起動します。内容をご確認のうえ送信してください。'}
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

export default Contact
