import { Link } from 'react-router-dom'
import { company, services } from '../data/company.js'

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">CHIBA / ICHIKAWA — CONSTRUCTION</p>
          <h1 className="hero-title">
            「絆」を、
            <br />
            確かな技術で。
          </h1>
          <p className="hero-lead">
            株式会社LIENは、千葉県市川市を拠点に、シーリング・塗装・防水・足場・大規模修繕・内装工事を手がける建設会社です。
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">
              お問い合わせ
            </Link>
            <Link to="/services" className="btn btn-ghost">
              事業内容を見る
            </Link>
          </div>
        </div>
      </section>

      <section className="section concept">
        <div className="section-inner">
          <p className="section-eyebrow">CONCEPT</p>
          <h2 className="section-title">「LIEN」が意味するもの</h2>
          <p className="concept-text">
            「LIEN」はフランス語で「絆」を意味します。
            お客様との信頼関係を大切に、確かな技術と誠実な対応で建物の資産価値を守り続けます。
          </p>
        </div>
      </section>

      <section className="section section-soft">
        <div className="section-inner">
          <p className="section-eyebrow">SERVICES</p>
          <h2 className="section-title">事業内容</h2>
          <div className="card-grid">
            {services.map((s) => (
              <div className="card" key={s.title}>
                <h3 className="card-title">{s.title}</h3>
                <p className="card-text">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="section-actions">
            <Link to="/services" className="btn btn-ghost">
              詳しく見る
            </Link>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-inner">
          <h2 className="cta-title">工事のご相談・お見積りはお気軽に</h2>
          <p className="cta-tel">
            <a href={`tel:${company.tel.replace(/-/g, '')}`}>{company.tel}</a>
          </p>
          <Link to="/contact" className="btn btn-primary">
            お問い合わせフォーム
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
