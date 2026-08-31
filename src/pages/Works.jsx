import { Link } from 'react-router-dom'
import { COMPANY, WORKS_PLACEHOLDER } from '../constants.js'
import { WorksComingSoon } from '../illustrations.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

function Works() {
  return (
    <>
      <Seo path="/works" name="施工実績" />
      <title>施工実績 | 市川市の外壁塗装・防水・大規模修繕 株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIENの施工実績。外壁塗装・シーリング・防水・屋根・大規模修繕など、千葉県市川市を中心とした施工事例を順次公開してまいります。"
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
            外壁塗装・シーリング・防水・屋根・大規模修繕・内装まで、これまで手がけてきた工事の事例を順次公開してまいります。気になる工事がございましたら、まずはお気軽にお問い合わせください。写真をご覧いただきながら、施工内容を詳しくご説明いたします。
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
