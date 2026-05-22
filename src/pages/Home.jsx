import { Link } from 'react-router-dom'
import {
  COMPANY,
  SERVICES,
  FLOW_STEPS,
  REASONS,
  WORKS_PLACEHOLDER,
} from '../constants.js'

const REASON_ICONS = {
  badge: (
    <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8L12 2z" />
  ),
  free: (
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2H8v-2h3V9H8V7h3V5h2v2h3v2h-3v2h3v2h-3v2z" />
  ),
  pin: (
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
  ),
  wrench: (
    <path d="M21 6.5a4.5 4.5 0 01-6 4.2L7.7 18l-2.7-2.7 7.3-7.3A4.5 4.5 0 0118 2.5l-2.6 2.6 1.5 1.5L19.5 4A4.5 4.5 0 0121 6.5z" />
  ),
}

function Home() {
  return (
    <>
      <section className="hero">
        <div
          className="hero-watermark"
          aria-hidden="true"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}logo.png)` }}
        />
        <div className="hero-inner">
          <p className="hero-lead">千葉県市川市の建設・修繕パートナー</p>
          <h1 className="hero-title">
            建物の「困った」を、
            <br />
            まるごと解決します。
          </h1>
          <p className="hero-desc">
            シーリング・塗装・防水・足場・大規模修繕・内装・雨漏り診断まで自社で一貫対応。
            <br />
            ご相談・現地調査・お見積りは無料です。
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">
              無料で相談・見積もりする
            </Link>
            <a href={COMPANY.telHref} className="btn btn-ghost">
              電話する {COMPANY.tel}
            </a>
          </div>
          <p className="hero-note">
            相談だけでもOK／しつこい営業はいたしません
          </p>
          <ul className="hero-trust">
            <li>創業 2020年</li>
            <li>有資格者 在籍</li>
            <li>市川市 拠点</li>
            <li>見積り 無料</li>
          </ul>
        </div>
      </section>

      <section className="section reasons">
        <div className="section-inner">
          <p className="section-eyebrow">REASONS</p>
          <h2 className="section-title">LIENが選ばれる理由</h2>
          <ul className="reason-grid">
            {REASONS.map((reason) => (
              <li key={reason.title} className="reason-card">
                <span className="reason-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{REASON_ICONS[reason.icon]}</svg>
                </span>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </li>
            ))}
          </ul>
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
          <div className="section-action">
            <Link to="/services" className="text-link">
              事業内容の詳細を見る →
            </Link>
          </div>
        </div>
      </section>

      <section className="section works">
        <div className="section-inner">
          <p className="section-eyebrow">WORKS</p>
          <h2 className="section-title">施工事例</h2>
          <p className="concept-text">
            施工事例は順次公開してまいります。気になる工事は、まずお気軽にお問い合わせください。
          </p>
          <ul className="works-grid">
            {WORKS_PLACEHOLDER.map((label) => (
              <li key={label} className="works-card">
                <div className="works-thumb">
                  <span>準備中</span>
                </div>
                <p className="works-label">{label}</p>
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
          <p className="section-eyebrow">CONTACT</p>
          <h2 className="section-title">まずは無料でご相談ください</h2>
          <p>
            現地調査・お見積りは無料です。相談だけでも歓迎ですので、お気軽にお問い合わせください。
          </p>
          <div className="cta-contacts">
            <a href={COMPANY.telHref} className="cta-tel">
              {COMPANY.tel}
            </a>
            <Link to="/contact" className="btn btn-primary">
              無料で相談・見積もりする
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
