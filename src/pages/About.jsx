import { useState } from 'react'
import {
  COMPANY,
  QUALIFICATION_DETAILS,
  QUALIFICATION_MERITS,
  AUDIENCES,
} from '../constants.js'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import PageToc from '../components/PageToc.jsx'

const tocItems = [
  { id: 'company-info', label: '会社情報' },
  { id: 'qualifications', label: '有資格者の在籍' },
  { id: 'for-clients', label: 'お客様別の安心ポイント' },
]

// 資格者証のサムネイル。タップで実物大の画像を別タブ表示。
// 画像ファイルが未配置（読み込み失敗）の場合は何も表示しない。
function CertLink({ src, name }) {
  const [available, setAvailable] = useState(true)
  if (!available) return null
  return (
    <a
      className="cert-link"
      href={src}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={src}
        alt={`${name}の資格者証`}
        loading="lazy"
        onError={() => setAvailable(false)}
      />
      <span className="cert-link-label">資格者証（タップで拡大）</span>
    </a>
  )
}

function About() {
  const [openAudience, setOpenAudience] = useState(null)

  const toggleAudience = (index) =>
    setOpenAudience((current) => (current === index ? null : index))

  const rows = [
    ['会社名', COMPANY.name],
    ['創業', COMPANY.founded],
    ['所在地', COMPANY.address],
    ['対応エリア', COMPANY.serviceArea],
    ['資本金', COMPANY.capital],
    ['代表者', COMPANY.representative],
    ['建設業許可', COMPANY.constructionLicense],
    ['事業内容', COMPANY.business],
    ['有資格者', COMPANY.qualifications],
    ['電話番号', COMPANY.tel],
  ]

  return (
    <>
      <Seo path="/about" name="会社概要" />
      <title>会社概要 | 市川市の建設会社 株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIEN（リアン）の会社概要・代表者・有資格者・建設業許可・対応エリア。千葉県市川市の建設会社で、1都3県で施工対応します。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">ABOUT US</p>
          <h1 className="page-title">会社概要</h1>
        </div>
      </section>

      <Breadcrumb />

      <PageToc items={tocItems} />

      <section className="section">
        <div className="section-inner narrow">
          <p className="concept-text">{COMPANY.concept}</p>
          <p className="concept-text">
            私たち{COMPANY.name}
            は、確かな技術と誠実な対応を信条とし、一つひとつの工事に真摯に向き合ってまいります。
          </p>
        </div>
      </section>

      <section className="section" id="company-info">
        <div className="section-inner narrow">
          <h2 className="section-title">会社情報</h2>
          <table className="info-table">
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>
                    {label === '電話番号' ? (
                      <a href={COMPANY.telHref}>{value}</a>
                    ) : label === '有資格者' ? (
                      <ul className="qual-list">
                        {value.map((q) => (
                          <li key={q}>{q}</li>
                        ))}
                      </ul>
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <a
            href={COMPANY.mapUrl}
            className="map-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
            </svg>
            Googleマップで見る
          </a>
        </div>
      </section>

      <section className="section" id="qualifications">
        <div className="section-inner">
          <p className="section-eyebrow">QUALIFICATIONS</p>
          <h2 className="section-title">有資格者の在籍</h2>
          <p className="concept-text">
            {COMPANY.name}
            には、各分野の専門資格を持つ技術者が在籍しています。資格に裏付けられた確かな知識と技術で、一つひとつの工事に責任をもって取り組みます。
          </p>
          <ul className="qual-detail-grid">
            {QUALIFICATION_DETAILS.map((q) => (
              <li key={q.name} className="qual-detail-card">
                <h3>{q.name}</h3>
                <p>{q.description}</p>
                {q.image && (
                  <CertLink
                    src={`${import.meta.env.BASE_URL}${q.image}`}
                    name={q.name}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="merit-box">
            <h3 className="merit-title">有資格者が在籍するメリット</h3>
            <p className="merit-lead">
              専門資格を持つ技術者が在籍しているからこそ、{COMPANY.name}
              は安心してお任せいただけます。
            </p>
            <ul className="merit-list">
              {QUALIFICATION_MERITS.map((merit) => (
                <li key={merit.title}>
                  <h4>{merit.title}</h4>
                  <p>{merit.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="for-clients">
        <div className="section-inner">
          <p className="section-eyebrow">FOR OUR CLIENTS</p>
          <h2 className="section-title">お客様別の安心ポイント</h2>
          <ul className="audience-grid">
            {AUDIENCES.map((a, index) => {
              const isOpen = openAudience === index
              const panelId = `audience-detail-${index}`
              return (
                <li key={a.target} className="audience-card">
                  <h3>{a.target}へ</h3>
                  <p>{a.description}</p>
                  {a.detail && (
                    <>
                      <button
                        type="button"
                        className="disclosure-toggle"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleAudience(index)}
                      >
                        {isOpen ? '閉じる' : 'もっと詳しく'}
                        <span className="disclosure-icon" aria-hidden="true">
                          {isOpen ? '−' : '＋'}
                        </span>
                      </button>
                      {isOpen && (
                        <div id={panelId} className="disclosure-panel">
                          <p>{a.detail}</p>
                        </div>
                      )}
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}

export default About
