import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COMPANY } from '../constants.js'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

// 選択肢の定義（外部ライブラリ不使用のシンプルなステップ式ウィザード）。
const BUILDINGS = [
  { key: 'house', label: '戸建て住宅', icon: '🏠' },
  { key: 'apartment', label: 'アパート・マンション', icon: '🏢' },
  { key: 'other', label: 'ビル・店舗・その他', icon: '🏬' },
]

const AGES = [
  { key: 'lt10', label: '〜10年' },
  { key: '10to20', label: '11〜20年' },
  { key: 'gt20', label: '21年以上' },
  { key: 'unknown', label: 'わからない' },
]

const SYMPTOMS = [
  { key: 'crack', label: 'ひび割れ（クラック）' },
  { key: 'chalk', label: 'チョーキング（白い粉）' },
  { key: 'fade', label: '色あせ・ツヤ引け' },
  { key: 'moss', label: 'コケ・カビ・黒ずみ' },
  { key: 'leak', label: '雨漏り・室内のシミ' },
  { key: 'sealing', label: 'シーリングの割れ・切れ' },
  { key: 'none', label: '特にない・わからない' },
]

const BUILDING_LABEL = Object.fromEntries(BUILDINGS.map((b) => [b.key, b.label]))
const AGE_LABEL = Object.fromEntries(AGES.map((a) => [a.key, a.label]))
const SYMPTOM_LABEL = Object.fromEntries(SYMPTOMS.map((s) => [s.key, s.label]))

// 選択内容から、おすすめの調査プランと概算費用の目安を組み立てる。
function buildResult({ building, symptoms }) {
  const has = (k) => symptoms.includes(k)
  let plan, planDesc

  if (has('leak')) {
    plan = '雨漏り診断調査'
    planDesc =
      '「雨漏り診断士」が散水調査などで原因を特定します。表面的な対処ではなく、根本原因からの解決をご提案します。'
  } else if (has('crack') || has('sealing')) {
    plan = '外壁補修 ＋ シーリング打ち替え'
    planDesc =
      'ひび割れ（クラック）補修とシーリングの打ち替えで、雨水の浸入を防ぎます。外壁塗装と同時に行うと足場代を節約できます。'
  } else if (has('chalk') || has('fade') || has('moss')) {
    plan = '外壁塗装（＋屋根塗装）'
    planDesc =
      '高圧洗浄・下地補修のうえ、下塗り・中塗り・上塗りの3回塗りで美観と防水性を回復します。'
  } else {
    plan = '無料の外壁・屋根点検'
    planDesc =
      'まずは有資格者が現状を点検し、いま本当に必要なメンテナンスだけをご提案します。'
  }

  let price
  if (building !== 'house') {
    price = '規模により変動するため、無料の現地調査で正確にお見積りします'
  } else if (plan === '雨漏り診断調査') {
    price = '調査後にお見積り（軽微な補修は数万円〜）'
  } else if (plan.startsWith('外壁補修')) {
    price = '15万円〜30万円（外壁塗装と同時なら割安になります）'
  } else if (plan.startsWith('外壁塗装')) {
    price =
      '外壁塗装のみ 60万円〜100万円／全体メンテナンス 110万円〜180万円（30坪前後・足場代/諸経費コミ）'
  } else {
    price = '点検・お見積りは無料です'
  }

  return { plan, planDesc, price }
}

function Diagnosis() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0) // 0:建物 1:築年数 2:症状 3:結果
  const [building, setBuilding] = useState('')
  const [age, setAge] = useState('')
  const [symptoms, setSymptoms] = useState([])

  const totalSteps = 3

  const toggleSymptom = (key) => {
    setSymptoms((prev) => {
      if (key === 'none') return prev.includes('none') ? [] : ['none']
      const withoutNone = prev.filter((k) => k !== 'none')
      return withoutNone.includes(key)
        ? withoutNone.filter((k) => k !== key)
        : [...withoutNone, key]
    })
  }

  const result = step === 3 ? buildResult({ building, symptoms }) : null

  const restart = () => {
    setBuilding('')
    setAge('')
    setSymptoms([])
    setStep(0)
  }

  // 診断結果を引き継いでお問い合わせフォームへ（message を事前入力）。
  const goToContact = () => {
    const symptomText =
      symptoms.length === 0
        ? '（未選択）'
        : symptoms.map((k) => SYMPTOM_LABEL[k]).join('、')
    const message = [
      '【カンタン診断の結果をもとにご相談】',
      `・建物の種類：${BUILDING_LABEL[building] || '未選択'}`,
      `・築年数：${AGE_LABEL[age] || '未選択'}`,
      `・気になる症状：${symptomText}`,
      '',
      `▼おすすめの調査プラン：${result.plan}`,
      `▼概算費用の目安：${result.price}`,
      '',
      '上記の内容で、無料の現地調査・お見積りを相談したいです。',
    ].join('\n')
    navigate(`/contact?message=${encodeURIComponent(message)}`)
  }

  return (
    <>
      <Seo path="/diagnosis" name="カンタン診断" />
      <title>カンタン外壁・雨漏り診断シミュレーション | 株式会社LIEN</title>
      <meta
        name="description"
        content="30秒でわかる、カンタン外壁・雨漏り診断シミュレーション。建物の種類・築年数・気になる症状を選ぶだけで、おすすめの調査プランと概算費用の目安がわかります。そのまま無料相談も可能です。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">DIAGNOSIS</p>
          <h1 className="page-title">カンタン外壁・雨漏り診断</h1>
        </div>
      </section>

      <Breadcrumb />

      <section className="section">
        <div className="section-inner narrow fade-in-up">
          <p className="concept-text diag-intro">
            3つの質問に答えるだけで、あなたのお家におすすめの調査プランと概算費用の目安がわかります。入力内容はそのまま無料相談に引き継げます。
          </p>

          <div className="diag-card">
            {/* 進捗インジケーター */}
            <div className="diag-progress" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`diag-progress-step${
                    step > i ? ' is-done' : step === i ? ' is-current' : ''
                  }`}
                />
              ))}
            </div>

            {step === 0 && (
              <div className="diag-step">
                <p className="diag-q-num">STEP 1 / {totalSteps}</p>
                <h2 className="diag-q">建物の種類を選んでください</h2>
                <div className="diag-options">
                  {BUILDINGS.map((b) => (
                    <button
                      key={b.key}
                      type="button"
                      className={`diag-option${building === b.key ? ' is-selected' : ''}`}
                      onClick={() => {
                        setBuilding(b.key)
                        setStep(1)
                      }}
                    >
                      <span className="diag-option-icon" aria-hidden="true">
                        {b.icon}
                      </span>
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="diag-step">
                <p className="diag-q-num">STEP 2 / {totalSteps}</p>
                <h2 className="diag-q">築年数はどのくらいですか？</h2>
                <div className="diag-options diag-options--grid">
                  {AGES.map((a) => (
                    <button
                      key={a.key}
                      type="button"
                      className={`diag-option${age === a.key ? ' is-selected' : ''}`}
                      onClick={() => {
                        setAge(a.key)
                        setStep(2)
                      }}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
                <div className="diag-nav">
                  <button
                    type="button"
                    className="diag-back"
                    onClick={() => setStep(0)}
                  >
                    ← 戻る
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="diag-step">
                <p className="diag-q-num">STEP 3 / {totalSteps}</p>
                <h2 className="diag-q">
                  気になる症状を選んでください
                  <span className="diag-q-note">（複数選択できます）</span>
                </h2>
                <div className="diag-chips">
                  {SYMPTOMS.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      className={`diag-chip${symptoms.includes(s.key) ? ' is-selected' : ''}`}
                      aria-pressed={symptoms.includes(s.key)}
                      onClick={() => toggleSymptom(s.key)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <div className="diag-nav">
                  <button
                    type="button"
                    className="diag-back"
                    onClick={() => setStep(1)}
                  >
                    ← 戻る
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={symptoms.length === 0}
                    onClick={() => setStep(3)}
                  >
                    診断結果を見る
                  </button>
                </div>
              </div>
            )}

            {step === 3 && result && (
              <div className="diag-result">
                <p className="diag-result-label">DIAGNOSIS RESULT</p>
                <p className="diag-result-cond">
                  {BUILDING_LABEL[building]}・{AGE_LABEL[age]}・
                  {symptoms.map((k) => SYMPTOM_LABEL[k]).join('／')}
                </p>
                <div className="diag-result-plan">
                  <p className="diag-result-plan-label">おすすめの調査プラン</p>
                  <h2 className="diag-result-plan-name">{result.plan}</h2>
                  <p className="diag-result-plan-desc">{result.planDesc}</p>
                </div>
                <div className="diag-result-price">
                  <span className="diag-result-price-label">概算費用の目安</span>
                  <span className="diag-result-price-value">{result.price}</span>
                </div>
                <p className="diag-result-note">
                  ※目安の金額です。正確な費用は、1級建築施工管理技士・雨漏り診断士による無料の現地調査でお出しします。
                </p>
                <div className="diag-result-actions">
                  <button
                    type="button"
                    className="btn btn-primary pulse-button"
                    onClick={goToContact}
                  >
                    この内容で無料相談する →
                  </button>
                  <a href={COMPANY.telHref} className="btn btn-outline">
                    電話で相談 {COMPANY.tel}
                  </a>
                </div>
                <button
                  type="button"
                  className="diag-restart"
                  onClick={restart}
                >
                  もう一度診断する
                </button>
              </div>
            )}
          </div>

          <p className="diag-disclaimer">
            ※本診断はかんたんな目安を表示するものです。実際の劣化状況は建物によって異なります。
          </p>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner cta-inner fade-in-up">
          <p className="section-eyebrow">CONTACT</p>
          <h2 className="section-title">まずは無料でご相談ください</h2>
          <p>
            現地調査・お見積りは<strong>完全無料</strong>。相談だけでも歓迎ですので、お気軽にお問い合わせください。
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

export default Diagnosis
