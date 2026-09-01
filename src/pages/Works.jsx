import { useState } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY, WORK_CATEGORIES, WORKS_ITEMS } from '../constants.js'
import { WorksComingSoon } from '../illustrations.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

// カテゴリ key → 表示ラベルの対応表（カード上のバッジ用）。
const CATEGORY_LABEL = Object.fromEntries(
  WORK_CATEGORIES.filter((c) => c.key !== 'all').map((c) => [c.key, c.label]),
)

function Works() {
  const [active, setActive] = useState('all')

  const filtered =
    active === 'all'
      ? WORKS_ITEMS
      : WORKS_ITEMS.filter((item) => item.category === active)

  return (
    <>
      <Seo path="/works" name="施工実績" />
      <title>施工実績 | 市川市の外壁塗装・防水・大規模修繕 株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIENの施工実績。外壁塗装・屋根塗装・防水・シーリング・雨漏り修繕など、目的別に絞り込んでご覧いただけます。千葉県市川市を中心に施工事例を順次公開してまいります。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">WORKS</p>
          <h1 className="page-title">施工実績</h1>
        </div>
      </section>

      <Breadcrumb />

      <section className="section">
        <div className="section-inner fade-in-up">
          <p className="concept-text">
            外壁塗装・屋根塗装・防水・シーリング・雨漏り修繕まで、これまで手がけてきた工事の事例を順次公開してまいります。見たい工事の種類をタブで絞り込んでご覧ください。
          </p>

          {/* 目的別フィルター（ピル形状のタブ・スマホは横スクロール） */}
          <div className="filter-tabs" role="tablist" aria-label="施工の種類で絞り込み">
            {WORK_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={active === cat.key}
                className={`filter-tab${active === cat.key ? ' is-active' : ''}`}
                onClick={() => setActive(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* key を切り替えることで、絞り込みのたびにフワッとフェードイン */}
          <ul className="works-grid" key={active}>
            {filtered.map((item) => (
              <li key={item.label} className="works-card filter-in">
                <div className="works-thumb">
                  <WorksComingSoon className="works-illu" />
                  <span>準備中</span>
                  <span className="works-cat-badge">
                    {CATEGORY_LABEL[item.category]}
                  </span>
                </div>
                <p className="works-label">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner cta-inner fade-in-up">
          <p className="section-eyebrow">CONTACT</p>
          <h2 className="section-title">施工事例について詳しく知りたい方へ</h2>
          <p>
            「うちと似た建物の事例はある？」「この工事はいくらぐらい？」など、どんなご質問でもお気軽にどうぞ。現地調査・お見積りは無料です。
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

export default Works
