import { Link } from 'react-router-dom'
import { AREAS } from '../areas.js'
import { COMPANY } from '../constants.js'
import Seo from '../components/Seo.jsx'

// 地域別ランディングページの一覧（/area）。各エリアページへの導線を集約する。
function AreaIndex() {
  return (
    <>
      <Seo path="/area" name="対応エリア（地域別）" />
      <title>対応エリア（地域別）| 市川市の外壁塗装・防水 株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIENの地域別対応エリア。市川市を拠点に、船橋市・松戸市・浦安市・鎌ケ谷市・江戸川区など1都4県に対応。各エリアの外壁塗装・防水・雨漏り修理のご相談・お見積りは無料です。"
      />

      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">SERVICE AREA</p>
          <h1 className="page-title">対応エリア（地域別）</h1>
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

      <section className="section">
        <div className="section-inner fade-in-up">
          <p className="concept-text section-intro">
            {COMPANY.name}は千葉県市川市を拠点に、1都4県（千葉・東京・埼玉・神奈川・茨城）まで幅広く対応しています。まずは主要エリアの詳細ページをご覧ください。
          </p>
          <ul className="service-grid">
            {AREAS.map((a) => (
              <li key={a.slug} className="service-card">
                <h3>
                  {a.city}
                  <span className="area-card-pref"> / {a.pref}</span>
                </h3>
                <p>{a.city}の外壁塗装・防水・シーリング・雨漏り修理に対応します。</p>
                <Link to={`/area/${a.slug}`} className="btn btn-outline btn-more">
                  {a.city}の詳細を見る →
                </Link>
              </li>
            ))}
          </ul>
          <p className="concept-text section-intro">
            上記以外の市区町村も幅広く対応しています。詳しくは
            <Link to="/company">会社概要・対応エリア一覧</Link>
            をご覧いただくか、お気軽にお問い合わせください。
          </p>
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
