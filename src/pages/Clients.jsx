import { Link } from 'react-router-dom'
import { COMPANY, CLIENTS } from '../constants.js'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

function Clients() {
  return (
    <>
      <Seo path="/clients" name="法人のお客様へ" />
      <title>法人のお客様へ | 元請・オーナー・管理会社様 | 株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIENの法人のお客様向けご案内。元請様・オーナー様・管理会社様それぞれに、確かな品質・工程管理・居住者様への配慮で、大規模修繕から専門工事までご対応します。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">FOR CORPORATE CLIENTS</p>
          <h1 className="page-title">法人のお客様へ</h1>
        </div>
      </section>

      <Breadcrumb />

      <section className="section clients-intro">
        <div className="section-inner narrow fade-in-up">
          <p className="concept-text">
            マンション・ビルの大規模修繕から、元請様の専門工事のパートナーまで。株式会社LIENは、確かな技術と誠実な対応で、法人のお客様一社一社の課題に真摯にお応えします。お立場に合わせたご案内をご覧ください。
          </p>
        </div>
      </section>

      {CLIENTS.map((client, index) => (
        <section
          key={client.audience}
          className={`section client-block ${index % 2 === 0 ? 'stage-alt' : 'stage-white'}`}
          aria-label={client.audience}
        >
          <div className="section-inner fade-in-up">
            <div className="client-grid">
              <div className="client-head">
                <p className="client-eyebrow">{client.audience}</p>
                <h2 className="client-heading">{client.heading}</h2>
              </div>
              <div className="client-detail">
                <p>{client.text}</p>
                <Link to="/contact" className="client-link">
                  無料で相談する <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section cta">
        <div className="section-inner cta-inner fade-in-up">
          <p className="section-eyebrow">CONTACT</p>
          <h2 className="section-title">法人・管理会社様の無料相談</h2>
          <p>
            大規模修繕・防水・外壁のご相談、他社お見積りとの比較・セカンドオピニオンも歓迎です。現地調査・お見積りは無料です。
          </p>
          <div className="cta-contacts">
            <a href={COMPANY.telHref} className="cta-tel">
              {COMPANY.tel}
            </a>
            <Link to="/contact" className="btn btn-primary pulse-button">
              無料で相談・見積もりする
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Clients
