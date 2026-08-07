import { Link } from 'react-router-dom'
import { MAINTENANCE } from '../constants.js'
import { ICONS } from '../icons.jsx'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import PageToc from '../components/PageToc.jsx'

const tocItems = [
  { id: 'importance', label: '早めの対応の重要性' },
  { id: 'layers', label: '3つの防御層と劣化サイン' },
  { id: 'risk', label: '放置するとどうなる？' },
  { id: 'benefit', label: '早めに対応するメリット' },
  { id: 'cycle', label: 'メンテナンスの目安' },
]

function Maintenance() {
  return (
    <>
      <Seo path="/maintenance" name="劣化と対策" />
      <title>外壁塗膜・防水・シーリング劣化の重要性 | 市川市の株式会社LIEN</title>
      <meta
        name="description"
        content="外壁塗膜・防水塗膜・シーリングの劣化を放置するリスクと、早めのメンテナンスの重要性を解説します。千葉県市川市の株式会社LIENが現地調査・お見積り無料で対応します。"
      />

      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">MAINTENANCE</p>
          <h1 className="page-title">外壁塗膜・防水・シーリング劣化の重要性</h1>
        </div>
      </section>

      <Breadcrumb />
      <PageToc items={tocItems} />

      <section className="section" id="importance">
        <div className="section-inner narrow">
          <p className="section-eyebrow">IMPORTANCE</p>
          <h2 className="section-title">劣化への早めの対応が、建物を守る</h2>
          {MAINTENANCE.lead.map((text) => (
            <p key={text} className="concept-text">
              {text}
            </p>
          ))}
        </div>
      </section>

      <section className="section" id="layers">
        <div className="section-inner">
          <p className="section-eyebrow">3 LAYERS</p>
          <h2 className="section-title">建物を守る3つの防御層と劣化サイン</h2>
          <ul className="service-grid">
            {MAINTENANCE.layers.map((layer, index) => (
              <li key={layer.title} className="service-card">
                <span className="service-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{ICONS[layer.icon]}</svg>
                </span>
                <span className="service-no">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{layer.title}</h3>
                <p>{layer.role}</p>
                <ul className="service-details">
                  {layer.signs.map((sign) => (
                    <li key={sign}>{sign}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="risk">
        <div className="section-inner">
          <p className="section-eyebrow">RISK</p>
          <h2 className="section-title">劣化を放置するとどうなる？</h2>
          <ul className="audience-grid">
            {MAINTENANCE.risks.map((risk) => (
              <li key={risk.title} className="audience-card">
                <h3>{risk.title}</h3>
                <p>{risk.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="benefit">
        <div className="section-inner">
          <p className="section-eyebrow">BENEFIT</p>
          <h2 className="section-title">早めに対応するメリット</h2>
          <div className="merit-box">
            <ul className="merit-list">
              {MAINTENANCE.benefits.map((benefit) => (
                <li key={benefit.title}>
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="cycle">
        <div className="section-inner narrow">
          <p className="section-eyebrow">CYCLE</p>
          <h2 className="section-title">メンテナンスの目安</h2>
          <table className="info-table">
            <tbody>
              {MAINTENANCE.cycles.map((cycle) => (
                <tr key={cycle.part}>
                  <th scope="row">{cycle.part}</th>
                  <td>{cycle.span}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="form-note">{MAINTENANCE.cycleNote}</p>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner cta-inner">
          <h2 className="section-title">まずは無料の現地調査・診断から</h2>
          <p>
            「これは劣化のサインかも？」と感じたら、年数にかかわらずお気軽にご相談ください。雨漏り診断士などの有資格者が建物の状態を確認し、最適なメンテナンスをご提案します。現地調査・お見積りは無料です。
          </p>
          <Link to="/contact" className="btn btn-primary">
            お問い合わせフォーム
          </Link>
        </div>
      </section>
    </>
  )
}

export default Maintenance
