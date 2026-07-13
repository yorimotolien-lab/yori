import { Link } from 'react-router-dom'
import { COMPANY } from '../constants.js'
import Seo from '../components/Seo.jsx'

function Privacy() {
  return (
    <>
      <Seo path="/privacy" name="プライバシーポリシー" />
      <title>プライバシーポリシー | 株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIENのプライバシーポリシー（個人情報保護方針）。お問い合わせ情報の利用目的、Cookie・Googleアナリティクスの利用について記載しています。"
      />

      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">PRIVACY POLICY</p>
          <h1 className="page-title">プライバシーポリシー</h1>
        </div>
      </section>

      <section className="section">
        <div className="section-inner narrow legal-body">
          <p>
            {COMPANY.name}
            （以下「当社」といいます）は、お客様の個人情報の保護を重要な責務と考え、以下の方針に基づき個人情報を適切に取り扱います。
          </p>

          <h2>1. 取得する個人情報</h2>
          <p>
            当社は、お問い合わせフォームやお電話でのご連絡の際に、お名前・メールアドレス・電話番号・お問い合わせ内容などをお伺いする場合があります。
          </p>

          <h2>2. 利用目的</h2>
          <p>取得した個人情報は、次の目的で利用します。</p>
          <ul>
            <li>お問い合わせ・ご相談への対応、お見積りのご連絡</li>
            <li>現地調査・工事等のご案内、施工後のアフターフォロー</li>
            <li>サービス向上のためのご連絡</li>
          </ul>

          <h2>3. 個人情報の第三者提供</h2>
          <p>
            当社は、法令に基づく場合を除き、あらかじめご本人の同意を得ることなく個人情報を第三者に提供することはありません。
          </p>

          <h2>4. Cookie・アクセス解析について</h2>
          <p>
            当サイトでは、利用状況の把握とサービス改善のため、Google
            LLC が提供する「Googleアナリティクス」を利用しています。Googleアナリティクスはトラフィックデータの収集のためにCookieを使用しますが、このデータは匿名で収集されており、個人を特定するものではありません。ブラウザの設定でCookieを無効にすることで、収集を拒否することも可能です。
          </p>
          <p>
            データの取り扱いについては
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Googleのプライバシーポリシー
            </a>
            をご確認ください。また、
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Googleアナリティクス オプトアウト アドオン
            </a>
            を利用して計測を無効にすることもできます。
          </p>

          <h2>5. 個人情報の安全管理</h2>
          <p>
            当社は、個人情報への不正アクセス、紛失、破壊、改ざん、漏えい等を防止するため、適切な安全管理措置を講じ、必要に応じて是正・改善に努めます。
          </p>

          <h2>6. 開示・訂正・削除等のご請求</h2>
          <p>
            ご本人からの個人情報の開示・訂正・利用停止・削除等のお申し出には、ご本人であることを確認のうえ、法令に従い速やかに対応します。
          </p>

          <h2>7. お問い合わせ窓口</h2>
          <p>
            個人情報の取り扱いに関するお問い合わせは、
            <Link to="/contact">お問い合わせフォーム</Link>
            またはお電話（<a href={COMPANY.telHref}>{COMPANY.tel}</a>
            ）までご連絡ください。
          </p>

          <h2>8. 本ポリシーの改定</h2>
          <p>
            当社は、法令の変更や事業内容の変更等に応じて、本ポリシーを改定することがあります。改定後の内容は、本ページに掲載した時点から効力を生じるものとします。
          </p>

          <p className="legal-updated">制定日: 2026年7月13日</p>
        </div>
      </section>
    </>
  )
}

export default Privacy
