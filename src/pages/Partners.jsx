import { Link } from 'react-router-dom'
import { COMPANY, SERVICES, PARTNER } from '../constants.js'

function Partners() {
  return (
    <>
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">PARTNERS</p>
          <h1 className="page-title">協力会社募集</h1>
        </div>
      </section>

      <section className="section">
        <div className="section-inner narrow">
          <p className="concept-text">{PARTNER.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="section-eyebrow">JOB</p>
          <h2 className="section-title">募集職種</h2>
          <ul className="qual-list">
            {SERVICES.map((s) => (
              <li key={s.title}>{s.title}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="section-eyebrow">MERIT</p>
          <h2 className="section-title">協力会社になるメリット</h2>
          <ul className="audience-grid">
            {PARTNER.merits.map((m) => (
              <li key={m.title} className="audience-card">
                <h3>{m.title}</h3>
                <p>{m.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-inner narrow">
          <p className="section-eyebrow">REQUIREMENTS</p>
          <h2 className="section-title">こんな会社さまを募集しています</h2>
          <ul className="check-list">
            {PARTNER.requirements.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner cta-inner">
          <p className="section-eyebrow">CONTACT</p>
          <h2 className="section-title">ご応募・お問い合わせ</h2>
          <p>
            お電話・お問い合わせフォームより、「協力会社募集の件」とお伝えください。担当よりご連絡いたします。
          </p>
          <div className="cta-contacts">
            <a href={COMPANY.telHref} className="cta-tel">
              {COMPANY.tel}
            </a>
            <Link to="/contact" className="btn btn-primary">
              お問い合わせフォーム
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Partners
