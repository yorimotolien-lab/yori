import { Link } from 'react-router-dom'
import { SERVICES } from '../constants.js'

function Services() {
  return (
    <>
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">SERVICES</p>
          <h1 className="page-title">事業内容</h1>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <ul className="service-grid">
            {SERVICES.map((service, index) => (
              <li key={service.title} className="service-card">
                <span className="service-no">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </li>
            ))}
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
