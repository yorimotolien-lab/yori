import {
  COMPANY,
  QUALIFICATION_DETAILS,
  QUALIFICATION_MERITS,
  AUDIENCES,
} from '../constants.js'

function About() {
  const rows = [
    ['会社名', COMPANY.name],
    ['創業', COMPANY.founded],
    ['所在地', COMPANY.address],
    ['資本金', COMPANY.capital],
    ['代表者', COMPANY.representative],
    ['事業内容', COMPANY.business],
    ['有資格者', COMPANY.qualifications],
    ['電話番号', COMPANY.tel],
  ]

  return (
    <>
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">ABOUT US</p>
          <h1 className="page-title">会社概要</h1>
        </div>
      </section>

      <section className="section">
        <div className="section-inner narrow">
          <p className="concept-text">{COMPANY.concept}</p>
          <p className="concept-text">
            私たち{COMPANY.name}
            は、確かな技術と誠実な対応を信条とし、一つひとつの工事に真摯に向き合ってまいります。
          </p>
        </div>
      </section>

      <section className="section">
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
        </div>
      </section>

      <section className="section">
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
                <li key={merit}>{merit}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="section-eyebrow">FOR OUR CLIENTS</p>
          <h2 className="section-title">お客様別の安心ポイント</h2>
          <ul className="audience-grid">
            {AUDIENCES.map((a) => (
              <li key={a.target} className="audience-card">
                <h3>{a.target}へ</h3>
                <p>{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default About
