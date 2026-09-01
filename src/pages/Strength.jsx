import { Link } from 'react-router-dom'
import {
  COMPANY,
  REASONS,
  CORPORATE_REASONS,
  WARRANTY,
  CONTRACTOR_TIPS,
  FLOW_STEPS,
  FOR_HOME,
} from '../constants.js'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import SosCheck from '../components/SosCheck.jsx'
import CountUp from '../components/CountUp.jsx'

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
  shield: (
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.06 13.54L7.4 11l1.41-1.41 2.12 2.12 4.24-4.24L16.6 8.9l-5.66 5.64z" />
  ),
  greeting: (
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  ),
}

const PROMISE_ICONS = {
  greeting: (
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  ),
  schedule: (
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  ),
  report: (
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  ),
}

function Strength() {
  return (
    <>
      <Seo path="/strength" name="選ばれる理由" />
      <title>選ばれる理由 | 市川市の建設会社 株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIENが選ばれる理由。直営・専門施工、有資格者による診断、最長10年保証、近隣配慮の徹底。法人・管理会社様、戸建てのお客様それぞれへの安心のお約束をご紹介します。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">OUR PROMISE</p>
          <h1 className="page-title">選ばれる理由</h1>
        </div>
      </section>

      <Breadcrumb />

      <section className="section reasons">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">OUR PROMISE</p>
          <h2 className="section-title">お客様への、4つの安心のお約束</h2>
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
        <div className="section-inner fade-in-up">
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

      <section className="section for-home" id="for-home">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">FOR YOUR HOME</p>

          <div className="fh-hero">
            <span className="fh-hero-icon" aria-hidden="true">
              🏠
            </span>
            <h2 className="section-title fh-hero-title">
              {FOR_HOME.hero.title}
            </h2>
            <p className="fh-hero-text">{FOR_HOME.hero.text}</p>
          </div>

          <div className="fh-block">
            <h3 className="fh-subtitle">{FOR_HOME.checklistTitle}</h3>
            <ul className="fh-checks">
              {FOR_HOME.checks.map((check) => (
                <li key={check.text} className="fh-check">
                  <span className="fh-check-photo">
                    <img
                      src={`${import.meta.env.BASE_URL}${check.image}`}
                      alt={check.text}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.parentElement.style.display = 'none'
                      }}
                    />
                  </span>
                  <span className="fh-check-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </span>
                  <span className="fh-check-text">{check.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="fh-block">
            <h3 className="fh-subtitle">{FOR_HOME.promisesTitle}</h3>
            <ul className="fh-promises">
              {FOR_HOME.promises.map((promise, index) => (
                <li key={promise.title} className="fh-promise">
                  <span className="fh-promise-no" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="fh-promise-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">{PROMISE_ICONS[promise.icon]}</svg>
                  </span>
                  <h4 className="fh-promise-title">{promise.title}</h4>
                  <p className="fh-promise-text">{promise.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="fh-cta">
            <Link to="/contact" className="fh-btn">
              無料で我が家の診断を申し込む
            </Link>
          </div>
        </div>
      </section>

      <SosCheck />

      <section className="section warranty">
        <div className="section-inner narrow fade-in-up">
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
                <span className="warranty-year-num">
                  <CountUp end={parseInt(y, 10)} suffix="年" />
                </span>
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

      <section className="section contractor-tips">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">HOW TO CHOOSE</p>
          <h2 className="section-title">{CONTRACTOR_TIPS.title}</h2>
          <p className="tips-lead">{CONTRACTOR_TIPS.lead}</p>
          <ul className="tips-grid">
            {CONTRACTOR_TIPS.points.map((point, index) => (
              <li key={point.text} className={`tips-card tips-${point.type}`}>
                <span className="tips-no" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="tips-icon" aria-hidden="true">
                  {point.type === 'pick' ? '✓' : '✕'}
                </span>
                <span className="tips-label">{point.label}</span>
                <p className="tips-text">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section flow">
        <div className="section-inner fade-in-up">
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
        <div className="section-inner cta-inner fade-in-up">
          <p className="section-eyebrow">CONTACT</p>
          <h2 className="section-title">まずは無料でご相談ください</h2>
          <p>
            現地調査・お見積りは無料です。相談だけでも歓迎ですので、お気軽にお問い合わせください。
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

export default Strength
