import { Link } from 'react-router-dom'
import { AREAS } from '../areas.js'
import { AREA_DIRECTORY } from '../constants.js'
import Seo from '../components/Seo.jsx'

// 本社所在地（強調ピルにする地名）。
const HQ_CITY = '市川市'

// 詳細ページ（/area/<slug>）を持つ市区の「地名 → slug」対応表。
// ディレクトリのピルを内部リンクにするために使う。
const SLUG_BY_CITY = Object.fromEntries(AREAS.map((a) => [a.city, a.slug]))

// エリアタグ1つ。詳細ページがある地名はリンク、無い地名はテキストで表示する。
// 本社所在地（市川市）は star 付きの強調ピルにする。
function AreaTag({ area }) {
  const slug = SLUG_BY_CITY[area]
  const isHq = area === HQ_CITY
  const className = `area-tag${isHq ? ' area-tag--hq' : ''}${
    slug ? ' area-tag--link' : ''
  }`
  const label = isHq ? `★ ${area}` : area

  if (slug) {
    return (
      <li className={className}>
        <Link to={`/area/${slug}`}>
          {label}
          <span className="area-tag-arrow" aria-hidden="true">
            ›
          </span>
        </Link>
      </li>
    )
  }
  return <li className={className}>{label}</li>
}

function AreaIndex() {
  return (
    <>
      <Seo path="/area" name="対応エリア（東京23区・千葉市ほか）" />
      <title>東京23区・千葉市の外壁塗装・大規模修繕｜株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIENの対応エリア一覧。東京都23区全域・千葉市全域（6区）に加え、市川市・船橋市・松戸市・柏市など千葉県の主要エリアで外壁塗装・防水・雨漏り修理・大規模修繕に対応。複数物件のオーナー様・管理会社様のご依頼も歓迎。現地調査・お見積り無料。"
      />

      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">SERVICE AREA</p>
          <h1 className="page-title">対応エリア</h1>
        </div>
      </section>

      <nav className="breadcrumb" aria-label="パンくずリスト">
        <div className="section-inner">
          <Link to="/">ホーム</Link>
          <span className="breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">対応エリア</span>
        </div>
      </nav>

      {/* キャッチコピー＋広域対応の説明 */}
      <section className="section">
        <div className="section-inner fade-in-up">
          <h2 className="section-title area-catch">{AREA_DIRECTORY.catch}</h2>
          <p className="concept-text section-intro">{AREA_DIRECTORY.lead}</p>
        </div>
      </section>

      {/* 詳細ページのある注目エリア（内部リンク強化） */}
      <section className="section area-guide">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">AREA GUIDE</p>
          <h2 className="section-title">地域別の詳しいご案内</h2>
          <p className="concept-text section-intro">
            主要エリアは、地域の特性に合わせた施工のポイントを詳しくご紹介しています。
          </p>
          <ul className="service-grid">
            {AREAS.map((a) => (
              <li key={a.slug} className="service-card">
                <h3>
                  {a.city}
                  <span className="area-card-pref"> / {a.pref}</span>
                </h3>
                <p>
                  {a.city}の外壁塗装・防水・シーリング・雨漏り修理に対応します。
                </p>
                <Link
                  to={`/area/${a.slug}`}
                  className="btn btn-outline btn-more"
                >
                  {a.city}の詳細を見る →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 全対応エリア・ディレクトリ（アコーディオン＋ピル型タグ） */}
      <section className="section area-directory">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">AREA LIST</p>
          <h2 className="section-title">対応エリア一覧</h2>
          <p className="concept-text section-intro">
            東京都23区・千葉市全域をはじめ、幅広い地域に対応しています。地域名をタップすると開閉できます。
            <span className="area-legend">
              <span className="area-legend-mark">›</span>
              付きは詳しい地域ページへ移動できます。
            </span>
          </p>

          {AREA_DIRECTORY.groups.map((group, i) => (
            <details
              key={group.region}
              className="area-accordion"
              open={i === 0}
            >
              <summary className="area-accordion-summary">
                <span className="area-accordion-title">
                  <svg
                    className="areas-pin"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                  </svg>
                  {group.region}
                </span>
                <span className="area-accordion-meta">
                  <span className="area-accordion-count">
                    {group.areas.length}エリア
                  </span>
                  <span className="area-accordion-icon" aria-hidden="true" />
                </span>
              </summary>
              <div className="area-accordion-body">
                {group.note && (
                  <p className="area-accordion-note">{group.note}</p>
                )}
                <ul className="areas-tags">
                  {group.areas.map((area) => (
                    <AreaTag key={area} area={area} />
                  ))}
                </ul>
              </div>
            </details>
          ))}

          <p className="areas-note area-directory-note">{AREA_DIRECTORY.note}</p>

          <div className="section-action">
            <Link to="/contact" className="btn btn-primary pulse-button">
              無料で相談・見積もりする
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AreaIndex
