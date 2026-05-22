import { Link } from 'react-router-dom'
import { services } from '../data/company.js'

function Services() {
  return (
    <>
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">SERVICES</p>
          <h1 className="page-title">事業内容</h1>
          <p className="page-lead">
            建物の「守り」を支える6つの工事。調査・診断から施工・アフターまで、確かな技術で対応します。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="card-grid">
            {services.map((s, i) => (
              <div className="card service-card" key={s.title}>
                <span className="service-no">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="card-title">{s.title}</h2>
                <p className="card-text">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-inner">
          <h2 className="cta-title">どの工事もお気軽にご相談ください</h2>
          <Link to="/contact" className="btn btn-primary">
            お問い合わせ
          </Link>
        </div>
      </section>
    </>
  )
}

export default Services
