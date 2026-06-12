import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../constants.js'
import { ICONS } from '../icons.jsx'

function Services() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) =>
    setOpenIndex((current) => (current === index ? null : index))

  return (
    <>
      <title>事業内容 | 塗装・防水・シーリング・大規模修繕 | 株式会社LIEN</title>
      <meta
        name="description"
        content="シーリング工事・塗装工事・防水工事・足場工事・大規模修繕工事・内装工事・雨漏り診断の詳細。1級シーリング技能士・1級建築施工管理技士・雨漏り診断士が在籍。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">SERVICES</p>
          <h1 className="page-title">事業内容</h1>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <ul className="service-grid">
            {SERVICES.map((service, index) => {
              const isOpen = openIndex === index
              const panelId = `service-detail-${index}`
              return (
                <li key={service.title} className="service-card">
                  <span className="service-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">{ICONS[service.icon]}</svg>
                  </span>
                  <span className="service-no">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  {service.details && (
                    <ul className="service-details">
                      {service.details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {service.detail && (
                    <>
                      <button
                        type="button"
                        className="disclosure-toggle"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(index)}
                      >
                        {isOpen ? '閉じる' : 'もっと詳しく'}
                        <span className="disclosure-icon" aria-hidden="true">
                          {isOpen ? '−' : '＋'}
                        </span>
                      </button>
                      {isOpen && (
                        <div id={panelId} className="disclosure-panel">
                          <p>{service.detail}</p>
                        </div>
                      )}
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner cta-inner">
          <h2 className="section-title">工事のご相談はこちら</h2>
          <Link to="/contact" className="btn btn-primary">
            お問い合わせフォーム
          </Link>
        </div>
      </section>
    </>
  )
}

export default Services
