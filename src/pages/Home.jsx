import { Link } from 'react-router-dom'
import { COMPANY, REASONS, WORKS_PLACEHOLDER } from '../constants.js'
import { POSTS } from '../posts.js'
import { WorksComingSoon } from '../illustrations.jsx'
import Seo from '../components/Seo.jsx'
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

// トップページの対応エリア（簡略版）で見せる主要エリア。全域は /company に集約。
const MAJOR_AREAS = [
  '市川市',
  '船橋市',
  '浦安市',
  '松戸市',
  '習志野市',
  '鎌ケ谷市',
]

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '株式会社LIEN',
  url: 'https://lien-2020.com/',
}

function Home() {
  const latestPosts = POSTS.slice(0, 3)

  return (
    <>
      <Seo path="/" jsonLd={websiteLd} />
      <title>市川市・千葉の外壁塗装・防水・シーリング | 株式会社LIEN</title>
      <meta
        name="description"
        content="千葉県市川市の建設会社・株式会社LIEN。外壁塗装・防水・シーリング・足場・大規模修繕・内装・雨漏り診断まで自社で一貫対応。千葉県全域・東京・埼玉・茨城対応、現地調査・お見積り無料。"
      />

      {/* A. ファーストビュー */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
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
          <p className="hero-note">相談だけでもOK／しつこい営業はいたしません</p>
          <ul className="hero-trust">
            <li>
              創業{' '}
              <CountUp end={2020} group={false} className="count-up--inline" />年
            </li>
            <li>有資格者 在籍</li>
            <li>1都3県 対応</li>
            <li>見積り 無料</li>
          </ul>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll-text">Scroll Down</span>
          <span className="hero-scroll-line" />
        </div>
      </section>

      {/* 戸建て・法人の2つの入り口 */}
      <section className="split-hero" aria-label="ご相談内容でお選びください">
        <Link to="/strength#corporate" className="split-pane split-corp">
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
        </Link>
        <Link to="/strength#for-home" className="split-pane split-home">
          <span className="split-eyebrow">FOR YOUR HOME</span>
          <span className="split-icon" aria-hidden="true">
            🏠
          </span>
          <span className="split-title">戸建てのお客様はこちら</span>
          <span className="split-sub">外壁塗装・屋根・雨漏り・リフォーム</span>
          <span className="split-cta">
            詳しく見る <span aria-hidden="true">→</span>
          </span>
        </Link>
      </section>

      {/* B. 選ばれる理由（要約） → /strength */}
      <section className="section reasons">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">OUR PROMISE</p>
          <h2 className="section-title">お客様への、4つの安心のお約束</h2>
          <p className="concept-text section-intro">
            大手に負けない品質と、地域の会社ならではの誠実さで。LIENが選ばれる理由をご紹介します。
          </p>
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
          <div className="section-action">
            <Link to="/strength" className="btn btn-outline btn-more">
              選ばれる理由をもっと見る →
            </Link>
          </div>
        </div>
      </section>

      {/* 施工事例（最新） → /works */}
      <section className="section works">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">WORKS</p>
          <h2 className="section-title">施工事例</h2>
          <p className="concept-text section-intro">
            これまで手がけてきた工事の事例を順次公開してまいります。
          </p>
          <ul className="works-grid">
            {WORKS_PLACEHOLDER.slice(0, 3).map((label) => (
              <li key={label} className="works-card">
                <div className="works-thumb">
                  <WorksComingSoon className="works-illu" />
                  <span>準備中</span>
                </div>
                <p className="works-label">{label}</p>
              </li>
            ))}
          </ul>
          <div className="section-action">
            <Link to="/works" className="btn btn-outline btn-more">
              施工実績をもっと見る →
            </Link>
          </div>
        </div>
      </section>

      {/* ブログ・お役立ち情報（最新3件） → /blog */}
      <section className="section blog-preview">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">BLOG</p>
          <h2 className="section-title">ブログ・お役立ち情報</h2>
          <p className="concept-text section-intro">
            外壁・防水・雨漏りなど、住まいを守るためのお役立ち情報を発信しています。
          </p>
          <ul className="blog-list">
            {latestPosts.map((post) => (
              <li key={post.slug} className="blog-card">
                <Link to={`/blog/${post.slug}`} className="blog-card-link">
                  {post.image ? (
                    <div className="blog-card-thumb">
                      <img
                        src={`${import.meta.env.BASE_URL}${post.image}`}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span className="blog-cat">{post.category}</span>
                      {post.date ? (
                        <time className="blog-date">{post.date}</time>
                      ) : null}
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <span className="blog-more">続きを読む →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="section-action">
            <Link to="/blog" className="btn btn-outline btn-more">
              お役立ち情報をもっと見る →
            </Link>
          </div>
        </div>
      </section>

      {/* 対応エリア（簡略版） → /company */}
      <section className="section areas-summary">
        <div className="section-inner narrow fade-in-up">
          <p className="section-eyebrow">SERVICE AREA</p>
          <h2 className="section-title">対応エリア</h2>
          <p className="concept-text section-intro">
            千葉県市川市を拠点に、1都3県（千葉・東京・埼玉・茨城）まで幅広く対応します。
          </p>
          <ul className="areas-tags areas-tags--center">
            {MAJOR_AREAS.map((area) => (
              <li
                key={area}
                className={`area-tag${area === '市川市' ? ' area-tag--hq' : ''}`}
              >
                {area === '市川市' ? `★ ${area}` : area}
              </li>
            ))}
            <li className="area-tag area-tag--more">ほか 千葉県全域</li>
          </ul>
          <div className="section-action">
            <Link to="/company" className="btn btn-outline btn-more">
              全対応エリアを見る →
            </Link>
          </div>
        </div>
      </section>

      {/* C. お問い合わせ */}
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

export default Home
