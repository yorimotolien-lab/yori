import { Link } from 'react-router-dom'
import { COMPANY, SERVICES, FLOW_STEPS } from '../constants.js'

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-lead">建物の資産価値を、確かな技術で守る。</p>
          <h1 className="hero-title">
            お客様との「絆」を
            <br />
            未来へつなぐ建設会社
          </h1>
          <p className="hero-desc">
            千葉県市川市を拠点に、シーリング・塗装・防水・足場・大規模修繕・内装工事を手がけています。
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
          <p className="section-eyebrow">ABOUT US</p>
          <h2 className="section-title">私たちについて</h2>
          <p className="concept-text">{COMPANY.concept}</p>
          <Link to="/about" className="text-link">
            会社概要を見る →
          </Link>
        </div>
      </section>

      <section className="section services-preview">
        <div className="section-inner">
          <p className="section-eyebrow">SERVICES</p>
          <h2 className="section-title">事業内容</h2>
          <ul className="service-grid">
            {SERVICES.map((service) => (
              <li key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section flow">
        <div className="section-inner">
          <p className="section-eyebrow">FLOW</p>
          <h2 className="section-title">ご依頼〜お引き渡しの流れ</h2>
          <p className="concept-text">
            初めてのお客様にも安心していただけるよう、お問い合わせから施工後のアフターフォローまで丁寧に進めてまいります。
          </p>
          <ol className="flow-diagram">
            {FLOW_STEPS.map((step, index) => (
              <li key={step.title} className="flow-node">
                <span className="flow-num">{index + 1}</span>
                <div className="flow-body">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner cta-inner">
          <h2 className="section-title">お気軽にご相談ください</h2>
          <p>各種工事のお見積り・ご相談を承っております。</p>
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

export default Home
