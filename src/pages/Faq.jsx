import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FAQS } from '../constants.js'

function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) =>
    setOpenIndex((current) => (current === index ? null : index))

  return (
    <>
      <title>よくあるご質問 | 株式会社LIEN</title>
      <meta
        name="description"
        content="対応エリア・無料見積もり・工期・アフターフォローなど、株式会社LIENへ寄せられるよくあるご質問にお答えします。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">FAQ</p>
          <h1 className="page-title">よくあるご質問</h1>
        </div>
      </section>

      <section className="section">
        <div className="section-inner narrow">
          <ul className="faq-list">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index
              const panelId = `faq-answer-${index}`
              return (
                <li key={faq.question} className="faq-item">
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span className="faq-q-mark" aria-hidden="true">
                      Q
                    </span>
                    <span className="faq-q-text">{faq.question}</span>
                    <span className="faq-q-icon" aria-hidden="true">
                      {isOpen ? '−' : '＋'}
                    </span>
                  </button>
                  {isOpen && (
                    <div id={panelId} className="faq-answer">
                      <span className="faq-a-mark" aria-hidden="true">
                        A
                      </span>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner cta-inner">
          <h2 className="section-title">解決しない場合はお気軽に</h2>
          <p>ご不明な点は、お電話・お問い合わせフォームよりお気軽にご相談ください。</p>
          <Link to="/contact" className="btn btn-primary">
            お問い合わせフォーム
          </Link>
        </div>
      </section>
    </>
  )
}

export default Faq
