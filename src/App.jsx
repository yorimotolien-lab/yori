import './App.css'

import logo from '/lien_logo_master.png'

function WallIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path d="M3 5h18M3 12h18M3 19h18M8 5v7M16 5v7M5 12v7M12 12v7M19 12v7" />
    </svg>
  )
}

function WaterIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path d="M12 3c3.5 4.2 6 7.4 6 10.5A6 6 0 0 1 6 13.5C6 10.4 8.5 7.2 12 3Z" />
      <path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  )
}

function SealIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path d="M4 8h16M4 16h16" />
      <path d="M7 11.5l1.5 1.5L7 14.5M12 11.5l1.5 1.5L12 14.5M17 11.5l1.5 1.5L17 14.5" />
    </svg>
  )
}

const concerns = [
  {
    id: 'gaiheki',
    no: '01',
    tag: '外壁塗膜',
    title: '外壁塗膜の劣化',
    lead: '塗膜は紫外線や雨風から建物を守る、最前線のバリアです。',
    signs: [
      'チョーキング(触ると白い粉が付く)',
      '色あせ・変色',
      'ひび割れ(クラック)',
      '塗膜のふくれ・剥がれ',
    ],
    risk: '防水性が失われ、雨水が壁の内部へ浸入します。下地やサイディング・モルタルが傷み、カビや凍害、鉄部のサビへと被害が広がります。',
    why: '美観の回復だけでなく、建物の構造そのものを雨水から守り寿命を延ばします。劣化が進む前の塗り替えが、結果的に補修費用を大きく抑えます。',
    Icon: WallIcon,
  },
  {
    id: 'bousui',
    no: '02',
    tag: '防水塗膜',
    title: '防水塗膜の劣化',
    lead: '屋上・ベランダ・バルコニーの防水層は、建物内部への浸水を食い止める要です。',
    signs: [
      'ひび割れ・ふくれ',
      '水たまり(水はけの低下)',
      'コケや植物の発生',
      '防水層の剥離・破れ',
    ],
    risk: '雨漏りが発生し、天井や室内へ漏水します。鉄筋コンクリートでは鉄筋がサビて膨張し、コンクリートの爆裂(剥落)を招くこともあります。',
    why: '雨漏りは一度起きると建物全体の劣化を加速させます。定期的なトップコートの塗り替えや防水改修が、深刻な漏水被害を未然に防ぎます。',
    Icon: WaterIcon,
  },
  {
    id: 'sealing',
    no: '03',
    tag: 'シーリング',
    title: 'シーリングの劣化',
    lead: '目地やサッシまわりのシーリングは、建物の「継ぎ目」を雨水から守ります。',
    signs: [
      'ひび割れ・硬化',
      '肉やせ(やせ細り)',
      '剥離(すき間の発生)',
      '黒ずみ・変色',
    ],
    risk: 'すき間から雨水が浸入し、内部の腐食や漏水の原因になります。外壁材の動きを吸収できず、外壁自体のひび割れにもつながります。',
    why: '寿命は約7〜10年と塗膜より短い場合が多く、外壁塗装と同時の打ち替え・増し打ちが効率的。足場費用を一度にまとめられ、コストも抑えられます。',
    Icon: SealIcon,
  },
]

function App() {
  return (
    <div className="site">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LIEN CONSTRUCTION ホーム">
          <img src={logo} alt="LIEN CONSTRUCTION" className="brand-logo" />
        </a>
        <a className="header-cta" href="#contact">
          無料診断を依頼
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">外装メンテナンスの基本</p>
          <h1>
            建物の寿命は、
            <br />
            外装の<span className="accent">「劣化対策」</span>で決まる。
          </h1>
          <p className="hero-lead">
            <strong>外壁塗膜</strong>・<strong>防水塗膜</strong>・
            <strong>シーリング</strong>。
            この3つの劣化を見逃さないことが、大切な建物を雨水から守り、資産価値を長く保ちます。
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#concerns">
              3つの劣化と重要性を見る
            </a>
            <a className="btn btn-ghost" href="#contact">
              お問い合わせ
            </a>
          </div>
        </section>

        <section id="concerns" className="concerns">
          <div className="section-head">
            <p className="eyebrow">なぜ、早めの対策が必要なのか</p>
            <h2>放置は禁物。3つの劣化とその重要性</h2>
            <p className="section-sub">
              外装の劣化は外から気づきにくく、放置するほど補修範囲も費用も拡大します。
              劣化のサインと、放置したときのリスクを知ることが第一歩です。
            </p>
          </div>

          <div className="concern-grid">
            {concerns.map(({ id, no, tag, title, lead, signs, risk, why, Icon }) => (
              <article className="concern-card" key={id}>
                <div className="concern-top">
                  <span className="concern-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="concern-no">{no}</span>
                </div>
                <span className="concern-tag">{tag}</span>
                <h3>{title}</h3>
                <p className="concern-lead">{lead}</p>

                <div className="concern-block">
                  <h4>劣化のサイン</h4>
                  <ul className="sign-list">
                    {signs.map((sign) => (
                      <li key={sign}>{sign}</li>
                    ))}
                  </ul>
                </div>

                <div className="concern-block">
                  <h4 className="risk-title">放置すると…</h4>
                  <p>{risk}</p>
                </div>

                <div className="concern-block concern-why">
                  <h4>なぜ重要か</h4>
                  <p>{why}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="summary">
          <h2>早期発見・早期メンテナンスが、建物を守る</h2>
          <p>
            3つの劣化はそれぞれ進行のスピードが異なり、放置すれば雨漏りや構造材の腐食といった
            重大な被害へとつながります。定期的な点検と適切なタイミングでのメンテナンスが、
            建物の安心と資産価値を守る最も確実な方法です。
          </p>
          <a className="btn btn-primary" id="contact" href="mailto:r.yorimoto@lien-2020.com">
            無料診断・お見積もりを依頼する
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <img src={logo} alt="" className="footer-logo" />
        <p className="footer-name">LIEN CONSTRUCTION</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} LIEN CONSTRUCTION. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default App
