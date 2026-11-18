import { Link } from 'react-router-dom'
import { AREAS } from '../areas.js'
import { AREA_DIRECTORY, COMPANY } from '../constants.js'
import Seo from '../components/Seo.jsx'

// 本社所在地（強調ピルにする地名）。
const HQ_CITY = '市川市'

// 「広域で選ばれる3つの理由」カードのアイコン（Home の REASON_ICONS と同じ塗りパス方式）。
const AREA_REASON_ICONS = {
  speed: (
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z" />
  ),
  area: (
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
  ),
  building: (
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
  ),
}

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
      <title>
        対応エリアのご案内｜東京都23区・千葉県（市川・柏・千葉市）の外壁塗装・雨漏り修理なら株式会社LIEN
      </title>
      <meta
        name="description"
        content="株式会社LIENの対応エリア一覧です。千葉県市川市を拠点に、東京都23区全域、千葉市、東葛エリア（柏・松戸）など1都4県へ最短即日で対応。戸建てからマンション大規模修繕まで、有資格者が高品質な施工をお届けします。"
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

      {/* LIENが広域で選ばれる3つの理由 */}
      <section className="section reasons stage-alt">
        <div className="section-inner fade-in-up">
          <p className="section-eyebrow">OUR STRENGTH</p>
          <h2 className="section-title">LIENが広域で選ばれる3つの理由</h2>
          <p className="concept-text section-intro">
            地域密着の機動力と、有資格者による確かな施工力。遠方の物件でも、安心してお任せいただける体制を整えています。
          </p>
          <ul className="reason-grid">
            {AREA_DIRECTORY.reasons.map((reason) => (
              <li key={reason.title} className="reason-card">
                <span className="reason-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    {AREA_REASON_ICONS[reason.icon]}
                  </svg>
                </span>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </li>
            ))}
          </ul>
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
        </div>
      </section>

      {/* エリア別のお問い合わせ（CTA） */}
      <section className="section cta">
        <div className="section-inner cta-inner fade-in-up">
          <p className="section-eyebrow">CONTACT</p>
          <h2 className="section-title">
            お住まいの地域の施工実績や、概算費用などお気軽にご相談ください
          </h2>
          <p>
            「自分の地域にも来てくれる？」「近くの施工事例は？」など、エリアに関するご質問も大歓迎です。現地調査・お見積りは無料。地域に精通したスタッフが丁寧にお答えします。
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

export default AreaIndex
