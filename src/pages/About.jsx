import { company } from '../data/company.js'

function About() {
  const rows = [
    { label: '会社名', value: company.name },
    { label: '創業', value: company.founded },
    { label: '所在地', value: company.address },
    { label: '資本金', value: company.capital },
    { label: '代表者', value: company.ceo },
    {
      label: '事業内容',
      value:
        'シーリング工事 / 塗装工事 / 防水工事 / 足場工事 / 大規模修繕工事 / 内装工事',
    },
    {
      label: '電話番号',
      value: (
        <a href={`tel:${company.tel.replace(/-/g, '')}`}>{company.tel}</a>
      ),
    },
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
          <p className="concept-text">
            株式会社LIENは、千葉県市川市を拠点に、シーリング工事・塗装工事・防水工事・足場工事・大規模修繕工事・内装工事を手がける建設会社です。
          </p>
          <p className="concept-text">
            「LIEN」はフランス語で「絆」を意味します。お客様との信頼関係を大切に、確かな技術と誠実な対応で建物の資産価値を守り続けます。
          </p>

          <table className="info-table">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>{row.value}</td>
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
