import logo from './assets/logo.svg'
import './App.css'

const services = [
  {
    id: 'reform',
    title: 'リフォーム・改修工事',
    lead: '住まいや店舗を、暮らしや事業に合わせて最適にアップデートします。',
    items: [
      '内装リフォーム（クロス・床・建具）',
      '水まわりリフォーム（キッチン・浴室・トイレ・洗面）',
      '外装リフォーム（外壁・屋根）',
      '増改築・間取り変更',
      'バリアフリー改修',
      '店舗・オフィス改装',
    ],
  },
  {
    id: 'demo',
    title: '解体・塗装・防水工事',
    lead: '建物の寿命を延ばし、安全に次の工程へつなぐメンテナンス工事。',
    items: [
      '家屋・建物解体',
      '内装解体（スケルトン）',
      '外壁・屋根塗装',
      '屋上・ベランダ防水',
      'シーリング・コーキング',
      '足場設置',
    ],
  },
]

function App() {
  return (
    <>
      <header className="site-header">
        <img src={logo} className="site-logo" alt="LIEN CONSTRUCTION" />
      </header>

      <section className="hero">
        <h1>確かな施工で、暮らしと建物を支える</h1>
        <p className="hero-lead">
          LIEN CONSTRUCTION は、リフォーム・改修から解体・塗装・防水まで、
          ひとつひとつの現場に責任を持って取り組みます。
        </p>
        <a className="cta" href="#contact">
          無料で相談する
        </a>
      </section>

      <section className="services" aria-label="工事内容">
        {services.map((service) => (
          <article key={service.id} className="service-card">
            <h2>{service.title}</h2>
            <p className="service-lead">{service.lead}</p>
            <ul className="service-items">
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section id="contact" className="contact">
        <h2>お問い合わせ</h2>
        <p>
          お見積り・ご相談は無料です。工事の内容や規模に合わせて丁寧にご提案します。
        </p>
        <a className="cta" href="mailto:info@lien-construction.example">
          メールで問い合わせる
        </a>
      </section>

      <footer className="site-footer">
        <span>LIEN CONSTRUCTION</span>
      </footer>
    </>
  )
}

export default App
