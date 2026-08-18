import { Link } from 'react-router-dom'
import {
  COMPANY,
  SERVICES,
  FLOW_STEPS,
  REASONS,
  CORPORATE_REASONS,
  PRICING_POLICY,
  WARRANTY,
  WORKS_PLACEHOLDER,
} from '../constants.js'
import { WorksComingSoon } from '../illustrations.jsx'
import Seo from '../components/Seo.jsx'
import CtaAssurance from '../components/CtaAssurance.jsx'
import SosCheck from '../components/SosCheck.jsx'

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

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '株式会社LIEN',
  url: 'https://lien-2020.com/',
}

function Home() {
  // 導線分岐ボタンから同一ページ内のセクションへスムーズスクロール。
  const scrollToId = (event, id) => {
    const el = document.getElementById(id)
    if (!el) return
    event.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Seo path="/" jsonLd={websiteLd} />
      <title>
        市川市・千葉の外壁塗装・防水・シーリング | 株式会社LIEN
      </title>
      <meta
        name="description"
        content="千葉県市川市の建設会社・株式会社LIEN。外壁塗装・防水・シーリング・足場・大規模修繕・内装・雨漏り診断まで自社で一貫対応。千葉県全域・東京・埼玉・茨城対応、現地調査・お見積り無料。"
      />
      <section className="hero">
        <div
          className="hero-watermark"
          aria-hidden="true"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}logo.png)` }}
        />
        <div className="hero-inner">
          <p className="hero-lead">千葉県市川市の建設・修繕パートナー</p>
          <h1 className="hero-title hero-reveal">
            <span className="reveal-line">
              <span className="reveal-inner">建物の「困った」を、</span>
            </span>
            <span className="reveal-line">
              <span className="reveal-inner">まるごと解決します。</span>
            </span>
          </h1>
          <p className="hero-desc">
            シーリング・塗装・防水・足場・大規模修繕・内装・雨漏り診断まで自社で一貫対応。
            <br />
            ご相談・現地調査・お見積りは無料です。
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary pulse-button">
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
            <li>1都3県 対応</li>
            <li>見積り 無料</li>
          </ul>
        </div>
      </section>

      <section className="split-hero" aria-label="ご相談内容でお選びください">
        <a
          href="#corporate"
          onClick={(e) => scrollToId(e, 'corporate')}
          className="split-pane split-corp"
        >
          <span className="split-eyebrow">FOR CORPORATE</span>
          <span className="split-icon" aria-hidden="true">
            🏢
          </span>
          <span className="split-title">法人・管理会社様はこちら</span>
          <span className="split-sub">
            大規模修繕・防水・外壁・雨漏りのご相談
          </span>
          <span className="split-cta">
            詳しく見る <span aria-hidden="true">→</span>
          </span>
        </a>
        <a
          href="#services"
          onClick={(e) => scrollToId(e, 'services')}
          className="split-pane split-home"
        >
          <span className="split-eyebrow">FOR YOUR HOME</span>
          <span className="split-icon" aria-hidden="true">
            🏠
          </span>
          <span className="split-title">戸建てのお客様はこちら</span>
          <span className="split-sub">外壁塗装・屋根・雨漏り・リフォーム</span>
          <span className="split-cta">
            詳しく見る <span aria-hidden="true">→</span>
          </span>
        </a>
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

      <section className="section corporate" id="corporate">
        <div className="section-inner">
          <p className="section-eyebrow">FOR CORPORATE CLIENTS</p>
          <h2 className="section-title">
            法人・管理会社様にLIENが選ばれる3つの理由
          </h2>
          <p className="concept-text corp-lead">
            マンション・ビルの大規模修繕や維持管理では、確かな品質はもちろん、入居者様への配慮や透明性のあるご報告が欠かせません。LIENは、管理会社様・オーナー様の「お手間」と「ご不安」を減らすことを大切にしています。
          </p>
          <ul className="corp-grid">
            {CORPORATE_REASONS.map((reason, index) => (
              <li key={reason.title} className="corp-card">
                <div className="corp-photo">
                  {reason.image ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${reason.image}`}
                      alt={reason.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="corp-photo-ph" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z" />
                      </svg>
                      <span>写真準備中</span>
                    </div>
                  )}
                </div>
                <div className="corp-body">
                  <span className="corp-no">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="corp-cta">
            <p className="corp-cta-text">
              大規模修繕・防水・外壁のご相談、他社お見積りとの比較・セカンドオピニオンも歓迎です。
            </p>
            <div className="corp-cta-actions">
              <a href={COMPANY.telHref} className="btn btn-outline">
                お電話で相談 {COMPANY.tel}
              </a>
              <Link to="/contact" className="btn btn-primary">
                法人・管理会社様の無料相談
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-preview" id="services">
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

      <SosCheck />

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
                  <WorksComingSoon className="works-illu" />
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

      <section className="section partners-band">
        <div className="section-inner partners-band-inner">
          <div>
            <p className="section-eyebrow">PARTNERS</p>
            <h2 className="section-title">協力会社募集</h2>
            <p>
              ともに成長できる協力会社さまを募集しています。各分野の専門業者さまからのご連絡をお待ちしています。
            </p>
          </div>
          <Link to="/partners" className="btn btn-primary">
            協力会社募集の詳細
          </Link>
        </div>
      </section>

      <section className="section pricing-policy">
        <div className="section-inner narrow">
          <p className="section-eyebrow">PRICING</p>
          <h2 className="section-title">{PRICING_POLICY.title}</h2>
          {PRICING_POLICY.body.map((text) => (
            <p key={text} className="concept-text">
              {text}
            </p>
          ))}
          <div className="policy-callout">
            <h3 className="policy-callout-title">
              {PRICING_POLICY.breakdownTitle}
            </h3>
            <ul className="policy-tags">
              {PRICING_POLICY.breakdownExamples.map((ex) => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
            <p>{PRICING_POLICY.breakdownBody}</p>
          </div>
        </div>
      </section>

      <section className="section warranty">
        <div className="section-inner narrow">
          <p className="section-eyebrow">WARRANTY</p>
          <h2 className="section-title">{WARRANTY.title}</h2>
          {WARRANTY.lead.map((text) => (
            <p key={text} className="concept-text">
              {text}
            </p>
          ))}
          <ul className="warranty-years">
            {WARRANTY.years.map((y) => (
              <li key={y}>
                <span className="warranty-year-num">{y}</span>
                <span className="warranty-year-label">保証</span>
              </li>
            ))}
          </ul>
          <div className="warranty-guarantee">
            <h3 className="warranty-guarantee-title">
              {WARRANTY.guaranteeTitle}
            </h3>
            <p>{WARRANTY.guaranteeBody}</p>
          </div>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner cta-inner">
          <p className="section-eyebrow">CONTACT</p>
          <h2 className="section-title">まずは無料でご相談ください</h2>
          <p>
            現地調査・お見積りは無料です。相談だけでも歓迎ですので、お気軽にお問い合わせください。
          </p>
          <CtaAssurance onDark>
            <div className="cta-contacts">
              <a href={COMPANY.telHref} className="cta-tel">
                {COMPANY.tel}
              </a>
              <Link to="/contact" className="btn btn-primary pulse-button">
                無料で相談・見積もりする
              </Link>
            </div>
          </CtaAssurance>
        </div>
      </section>
    </>
  )
}

export default Home
