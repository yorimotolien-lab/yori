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

      {CLIENTS.map((client) => (
        <section
          key={client.title}
          className={`client-section fade-in-up${client.flip ? ' client-section--flip' : ''}`}
          aria-label={client.title}
        >
          <div className="client-media">
            <div className="image-placeholder" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z" />
              </svg>
              <span>イメージ画像</span>
            </div>
          </div>
          <div className="client-body">
            <div className="client-body-inner">
              <p className="client-eyebrow">{client.eyebrow}</p>
              <h2 className="client-title">{client.title}</h2>
              <p className="client-text">{client.text}</p>
              <Link to="/contact" className="client-btn">
                もっと詳しく <span aria-hidden="true">＋</span>
              </Link>
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
