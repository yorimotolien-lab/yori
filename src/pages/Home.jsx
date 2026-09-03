import { Link } from 'react-router-dom'
import {
  COMPANY,
  REASONS,
  AUTHORITY,
  SERVICES,
  FLOW_STEPS,
  CEO_MESSAGE,
  PRICE,
  GUARANTEE_CARE,
  CLIENTS_ENTRY,
  WORKS_ITEMS,
} from '../constants.js'
import { POSTS } from '../posts.js'
import { WorksComingSoon } from '../illustrations.jsx'
import Seo from '../components/Seo.jsx'
import CountUp from '../components/CountUp.jsx'
import SosCheck from '../components/SosCheck.jsx'

const AUTHORITY_ICONS = {
  eye: (
    <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
  ),
  clipboard: (
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0a1 1 0 110 2 1 1 0 010-2zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  ),
  shield: (
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.06 13.54L7.4 11l1.41-1.41 2.12 2.12 4.24-4.24L16.6 8.9l-5.66 5.64z" />
  ),
}

const GUARANTEE_ICONS = {
  shield: (
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.06 13.54L7.4 11l1.41-1.41 2.12 2.12 4.24-4.24L16.6 8.9l-5.66 5.64z" />
  ),
  calendar: (
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  ),
  chat: (
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  ),
}

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
const MAJOR_AREAS = ['市川市', '船橋市', '浦安市', '松戸市', '習志野市', '鎌ケ谷市']

// スクロールを次のセクションへ誘導する下向きの矢印キュー。
function ScrollCue() {
  return (
    <div className="scroll-cue" aria-hidden="true">
      <span />
    </div>
  )
}

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

      {/* ① 認知：ファーストビュー */}
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

      {/* ② 共感：戸建て・法人スプリット＋お家のSOSサイン診断 */}
      <section className="split-hero" aria-label="ご相談内容でお選びください">
        <Link to="/clients" className="split-pane split-corp">
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

      <SosCheck />
      <ScrollCue />

      {/* ③ 信頼：代表挨拶（要約）＋4つの安心のお約束 */}
      <section className="section message home-message stage-white">
        <div className="section-inner narrow fade-in-up">
          <p className="section-eyebrow">MESSAGE</p>
          <p className="message-catch">{CEO_MESSAGE.catch}</p>
          <p className="message-text">{CEO_MESSAGE.body[0]}</p>
          <p className="message-text">{CEO_MESSAGE.body[CEO_MESSAGE.body.length - 1]}</p>
          <div className="message-sign">
            <span className="sign-company">{CEO_MESSAGE.signCompany}</span>
            <span className="sign-name">{CEO_MESSAGE.signName}</span>
          </div>
          <div className="section-action">
            <Link to="/company" className="btn btn-outline btn-more">
              代表挨拶をすべて読む →
            </Link>
          </div>
        </div>
      </section>

      <section className="section reasons stage-alt">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">OUR PROMISE</p>
          <h2 className="section-title">お客様への、4つの安心のお約束</h2>
          <p className="concept-text section-intro">
            無駄な中間マージンをカットした直営・専門施工体制。大手にも負けない品質と、地域の会社ならではの誠実さでお応えします。
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

          {/* 有資格者の権威性バンド：専門家が直接診断・管理＝手抜きなし・高品質 */}
          <div className="authority-band">
            <div className="authority-lead-col">
              <p className="authority-eyebrow">{AUTHORITY.eyebrow}</p>
              <h3 className="authority-title">{AUTHORITY.title}</h3>
              <p className="authority-text">{AUTHORITY.lead}</p>
              <ul className="authority-badges">
                {AUTHORITY.badges.map((badge) => (
                  <li key={badge} className="authority-badge">
                    <span className="authority-badge-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 1l3.09 6.26L22 8.27l-5 4.87 1.18 6.88L12 16.77l-6.18 3.25L7 13.14 2 8.27l6.91-1.01L12 1z" />
                      </svg>
                    </span>
                    {badge}
                  </li>
                ))}
              </ul>
            </div>
            <ul className="authority-points">
              {AUTHORITY.points.map((point) => (
                <li key={point.title} className="authority-point">
                  <span className="authority-point-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      {AUTHORITY_ICONS[point.icon]}
                    </svg>
                  </span>
                  <div>
                    <h4 className="authority-point-title">{point.title}</h4>
                    <p className="authority-point-text">{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="section-action">
            <Link to="/strength" className="btn btn-outline btn-more">
              選ばれる理由をもっと見る →
            </Link>
          </div>
        </div>
      </section>

      {/* ④ 要約：事業内容（詳細は下層ページへ） */}
      <section className="section services-preview stage-white">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">SERVICES</p>
          <h2 className="section-title">事業内容</h2>
          <p className="concept-text section-intro">
            シーリング・塗装・防水・足場・大規模修繕・内装・雨漏り診断まで、自社で一貫対応します。
          </p>
          <ul className="service-grid">
            {SERVICES.map((service) => (
              <li key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ul>
          <div className="section-action">
            <Link to="/services" className="btn btn-outline btn-more">
              事業内容の詳細を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* 法人・オーナー・管理会社様の入り口ブロック（ネイビー／写真なし） → /clients */}
      <section className="section clients-cta">
        <div className="section-inner fade-in-up">
          <p className="clients-cta-eyebrow">{CLIENTS_ENTRY.eyebrow}</p>
          <p className="clients-cta-catch">{CLIENTS_ENTRY.catch}</p>
          <Link to="/clients" className="btn btn-primary pulse-button">
            {CLIENTS_ENTRY.button}
          </Link>
        </div>
      </section>

      {/* ⑤ 納得：施工の流れ＋対応エリア */}
      <section className="section flow stage-alt">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">FLOW</p>
          <h2 className="section-title">ご依頼〜お引き渡しの流れ</h2>
          <p className="concept-text section-intro">
            お問い合わせから施工後のアフターフォローまで、明瞭なプロセスでご案内。初めての方も安心してお任せいただけます。
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

      {/* ⑤ 納得：施工費用の目安（PRICE） */}
      <section className="section price stage-white" id="price">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">PRICE</p>
          <h2 className="section-title">{PRICE.title}</h2>
          <p className="concept-text section-intro">{PRICE.lead}</p>

          <div className="price-cards">
            {/* カード1：全体工事セット（含まれる工事をチェックリストで明示） */}
            <div className="price-set">
              <span className="price-set-badge">{PRICE.set.badge}</span>
              <h3 className="price-set-title">{PRICE.set.title}</h3>
              <p className="price-amount">
                {PRICE.set.price}
                <span className="price-amount-note">
                  （{PRICE.set.note}）
                </span>
              </p>
              <p className="price-total-note">
                <span className="price-total-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
                {PRICE.set.priceNote}
              </p>
              <p className="price-includes-title">{PRICE.set.includesTitle}</p>
              <ul className="price-includes">
                {PRICE.set.includes.map((item) => (
                  <li key={item.name} className="price-include">
                    <span className="price-check" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </span>
                    <span className="price-include-body">
                      <span className="price-include-name">{item.name}</span>
                      {item.sub ? (
                        <span className="price-include-sub">{item.sub}</span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* カード2：部位別・専門施工の目安 */}
            <div className="price-parts">
              <h3 className="price-parts-title">{PRICE.parts.title}</h3>
              <ul className="price-parts-list">
                {PRICE.parts.items.map((item) => (
                  <li key={item.name} className="price-part">
                    <span className="price-part-name">{item.name}</span>
                    <span className="price-part-price">{item.price}</span>
                  </li>
                ))}
              </ul>
              <p className="price-parts-hint">
                必要な工事だけを組み合わせてご提案します。
              </p>
            </div>
          </div>

          <ul className="price-notes">
            {PRICE.notes.map((note) => (
              <li key={note}>※{note}</li>
            ))}
          </ul>
          <div className="section-action">
            <Link to="/contact" className="btn btn-primary pulse-button">
              無料診断・お見積もりを申し込む
            </Link>
          </div>
        </div>
      </section>

      {/* ⑤ 納得：アフターフォロー・保証制度（GUARANTEE & AFTER CARE） */}
      <section className="section guarantee stage-alt" id="guarantee">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">GUARANTEE &amp; AFTER CARE</p>
          <h2 className="section-title">{GUARANTEE_CARE.title}</h2>
          <p className="guarantee-subtitle">{GUARANTEE_CARE.subtitle}</p>
          <ul className="guarantee-grid">
            {GUARANTEE_CARE.pillars.map((pillar) => (
              <li key={pillar.title} className="guarantee-card">
                <span className="guarantee-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{GUARANTEE_ICONS[pillar.icon]}</svg>
                </span>
                <h3 className="guarantee-card-title">{pillar.title}</h3>
                <p className="guarantee-card-text">{pillar.text}</p>
              </li>
            ))}
          </ul>
          <div className="guarantee-timeline" aria-label="定期点検スケジュール">
            <span className="guarantee-timeline-label">定期点検</span>
            <ol className="guarantee-timeline-track">
              {GUARANTEE_CARE.timeline.map((t) => (
                <li key={t} className="guarantee-timeline-node">
                  <span className="guarantee-timeline-dot" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section areas-summary stage-white">
        <div className="section-inner narrow fade-in-up">
          <p className="section-eyebrow">SERVICE AREA</p>
          <h2 className="section-title">対応エリア</h2>
          <p className="concept-text section-intro">
            千葉県市川市を拠点に、1都3県（千葉・東京・埼玉・茨城）まで幅広く対応。地元密着で、急なご相談や雨漏りにも<strong>最短即日</strong>で駆けつけます。
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

      <ScrollCue />

      {/* ⑥ 実証：施工事例（最新）＋ブログ（最新3件） */}
      <section className="section works stage-alt">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">WORKS</p>
          <h2 className="section-title">施工事例</h2>
          <p className="concept-text section-intro">
            これまで手がけてきた工事の事例を順次公開してまいります。
          </p>
          <ul className="works-grid">
            {WORKS_ITEMS.slice(0, 3).map((item) => (
              <li key={item.label} className="works-card">
                <div className="works-thumb">
                  <WorksComingSoon className="works-illu" />
                  <span>準備中</span>
                </div>
                <p className="works-label">{item.label}</p>
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

      <section className="section blog-preview stage-white">
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

      {/* ⑦ 行動：無料相談・お問い合わせ */}
      <section className="section cta">
        <div className="section-inner cta-inner fade-in-up">
          <p className="section-eyebrow">CONTACT</p>
          <h2 className="section-title">まずは無料でご相談ください</h2>
          <p>
            現地調査・お見積りは<strong>完全無料</strong>。相談だけでも歓迎ですので、お気軽にお問い合わせください。しつこい営業は一切いたしません。
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
