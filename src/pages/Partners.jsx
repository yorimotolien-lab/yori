import { Link } from 'react-router-dom'
import { COMPANY, SERVICES, PARTNER } from '../constants.js'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

function Partners() {
  return (
    <>
      <Seo path="/partners" name="協力会社募集" />
      <title>協力会社募集 | 株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIENでは、ともに成長できる協力会社さまを募集しています。シーリング・塗装・防水・足場・大規模修繕・内装・雨漏り補修の専門業者さま、お気軽にご連絡ください。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">PARTNERS</p>
          <h1 className="page-title">協力会社募集</h1>
        </div>
      </section>

      <Breadcrumb />

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
            {[...SERVICES.map((s) => s.title), ...PARTNER.additionalJobs].map(
              (job) => (
                <li key={job}>{job}</li>
              ),
            )}
          </ul>
          <p className="form-note">{PARTNER.jobsNote}</p>
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

      <section className="section">
        <div className="section-inner narrow">
          <p className="section-eyebrow">RECRUIT</p>
          <h2 className="section-title">従業員（自社スタッフ）募集</h2>
          <p className="concept-text">{PARTNER.staff.lead}</p>
          <ul className="check-list">
            {PARTNER.staff.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner cta-inner">
          <p className="section-eyebrow">CONTACT</p>
          <h2 className="section-title">ご応募・お問い合わせ</h2>
          <p>
            お電話・お問い合わせフォームより、「協力会社募集の件」または「求人（従業員募集）の件」とお伝えください。担当よりご連絡いたします。
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
