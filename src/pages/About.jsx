import { COMPANY } from '../constants.js'

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
    </>
  )
}

export default About
