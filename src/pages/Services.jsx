import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../constants.js'
import { ICONS } from '../icons.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

const servicesLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: SERVICES.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.title,
  })),
}

function Services() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) =>
    setOpenIndex((current) => (current === index ? null : index))

  return (
    <>
      <Seo path="/services" name="事業内容" jsonLd={servicesLd} />
      <title>外壁塗装・防水・シーリング・大規模修繕 | 市川市の株式会社LIEN</title>
      <meta
        name="description"
        content="市川市を拠点に、シーリング・外壁塗装・防水・足場・大規模修繕・内装・雨漏り診断まで一貫対応。1級シーリング技能士・1級建築施工管理技士・雨漏り診断士が在籍。千葉・東京・埼玉・神奈川・茨城対応、現地調査無料。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">SERVICES</p>
          <h1 className="page-title">事業内容</h1>
        </div>
      </section>

      <Breadcrumb />

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
