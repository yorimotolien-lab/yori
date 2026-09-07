import { Link, useParams, Navigate } from 'react-router-dom'
import { AREAS, getArea } from '../areas.js'
import { COMPANY, REASONS, SERVICES } from '../constants.js'
import { ICONS } from '../icons.jsx'
import Seo from '../components/Seo.jsx'

const SITE = 'https://lien-2020.com'

// 地域別ランディングページ（/area/:slug）。ローカルSEO用に、各市固有の
// 導入文・施工ポイントを表示しつつ、選ばれる理由・事業内容・CTAは共通データを再利用する。
function AreaLanding() {
  const { slug } = useParams()
  const area = getArea(slug)
  // 未知の slug はエリア一覧へ
  if (!area) return <Navigate to="/area" replace />

  const { city, pref, lead, points, metaDescription } = area
  const title = `${city}の外壁塗装・防水・雨漏り修理 | 株式会社LIEN`
  const others = AREAS.filter((a) => a.slug !== slug)

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: '外壁塗装・屋根塗装・防水・シーリング・雨漏り修理・大規模修繕',
    areaServed: { '@type': 'City', name: `${pref}${city}` },
    provider: {
      '@type': 'GeneralContractor',
      name: COMPANY.name,
      telephone: '+81-47-307-9287',
      url: `${SITE}/`,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'JP',
        addressRegion: '千葉県',
        addressLocality: '市川市',
        streetAddress: '塩焼3-20-6',
      },
    },
    url: `${SITE}/area/${slug}`,
  }

  return (
    <>
      <Seo
        path={`/area/${slug}`}
        name={`${city}の対応エリア`}
        jsonLd={serviceLd}
      />
      <title>{title}</title>
      <meta name="description" content={metaDescription} />

      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">SERVICE AREA</p>
          <h1 className="page-title">{city}の外壁塗装・防水・雨漏り修理</h1>
        </div>
      </section>

      <nav className="breadcrumb" aria-label="パンくずリスト">
        <div className="section-inner">
          <Link to="/">ホーム</Link>
          <span className="breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <Link to="/area">対応エリア</Link>
          <span className="breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">{city}</span>
        </div>
      </nav>

      <section className="section">
        <div className="section-inner narrow fade-in-up">
          <p className="concept-text">{lead}</p>
          <p className="concept-text">
            {city}での外壁塗装・屋根塗装・防水・シーリング・雨漏り修理・大規模修繕は、
            現地調査・お見積りとも<strong>完全無料</strong>
            です。1級建築施工管理技士・雨漏り診断士などの有資格者が、確かな技術で建物の資産価値を守ります。
          </p>
        </div>
      </section>

      <section className="section stage-alt">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">LOCAL POINTS</p>
          <h2 className="section-title">{city}での施工のポイント</h2>
          <ul className="service-grid">
            {points.map((p) => (
              <li key={p.title} className="service-card">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">OUR PROMISE</p>
          <h2 className="section-title">{city}で選ばれる理由</h2>
          <ul className="service-grid">
            {REASONS.map((r) => (
              <li key={r.title} className="service-card">
                <h3>{r.title}</h3>
                <p>{r.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section stage-alt">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">SERVICES</p>
          <h2 className="section-title">{city}で対応できる工事</h2>
          <ul className="service-grid">
            {SERVICES.map((s) => (
              <li key={s.title} className="service-card">
                <span className="service-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{ICONS[s.icon]}</svg>
                </span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
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

      <section className="section">
        <div className="section-inner narrow fade-in-up">
          <p className="section-eyebrow">NEARBY</p>
          <h2 className="section-title">近隣の対応エリア</h2>
          <ul className="areas-tags areas-tags--center">
            {others.map((a) => (
              <li key={a.slug} className="area-tag">
                <Link to={`/area/${a.slug}`}>{a.city}</Link>
              </li>
            ))}
          </ul>
          <p className="concept-text section-intro">
            上記以外の地域も幅広く対応しています。
            <Link to="/company">対応エリアの一覧</Link>もあわせてご覧ください。
          </p>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner cta-inner fade-in-up">
          <p className="section-eyebrow">CONTACT</p>
          <h2 className="section-title">{city}で無料相談・お見積り</h2>
          <p>
            {city}での外壁・屋根・雨漏りのお悩みは、まずはお気軽にご相談ください。しつこい営業は一切いたしません。
            <Link to="/diagnosis">30秒カンタン診断</Link>
            で、必要な工事の目安をチェックすることもできます。
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

export default AreaLanding
