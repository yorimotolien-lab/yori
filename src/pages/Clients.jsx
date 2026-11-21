import { Link } from 'react-router-dom'
import { COMPANY, CLIENTS, CLIENT_VOICE } from '../constants.js'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

// Google の「G」マーク（4色）。実際のGoogleクチコミである出所を視覚的に示す。
function GoogleG() {
  return (
    <svg className="voice-google-g" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

function Clients() {
  return (
    <>
      <Seo path="/clients" name="法人のお客様へ" />
      <title>大規模修繕｜千葉・柏・市川のマンション管理会社様へ｜LIEN</title>
      <meta
        name="description"
        content="千葉県で大規模修繕なら株式会社LIEN。柏市・市川市を中心に、マンションオーナー様・管理会社様・元請様へ外壁塗装・防水・シーリングの専門工事を直営でご提供。工程管理と居住者様への配慮を徹底し、協力会社様の募集も行っています。"
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

      {/* 法人・管理会社様からの実際のGoogleクチコミ（星5） */}
      <section className="section client-voice stage-alt" aria-label="お客様の声">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">VOICE</p>
          <h2 className="section-title voice-microcopy">
            {CLIENT_VOICE.microcopy}
          </h2>

          <figure className="voice-card">
            <div className="voice-card-head">
              <span className="voice-avatar" aria-hidden="true">
                {CLIENT_VOICE.initial}
              </span>
              <div className="voice-meta">
                <figcaption className="voice-name">
                  {CLIENT_VOICE.name}
                  <span className="voice-role">（{CLIENT_VOICE.role}）</span>
                </figcaption>
                <div
                  className="voice-stars"
                  role="img"
                  aria-label={`5つ星中${CLIENT_VOICE.rating}つ星の評価`}
                >
                  {'★★★★★'}
                </div>
              </div>
              <span className="voice-source">
                <GoogleG />
                <span className="voice-source-label">
                  {CLIENT_VOICE.source}
                </span>
              </span>
            </div>
            <blockquote className="voice-comment">
              {CLIENT_VOICE.comment}
            </blockquote>
          </figure>
        </div>
      </section>

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
