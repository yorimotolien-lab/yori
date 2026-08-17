import { CTA_ASSURANCE } from '../constants.js'

// 問い合わせボタン周りのマイクロコピー。
// children にボタン類を渡すと、その上下に「安心の一言」を表示する。
// onDark: 濃色（ネイビー）背景に置くとき true。
function CtaAssurance({ children, onDark = false }) {
  return (
    <div className={`cta-assurance${onDark ? ' cta-assurance--dark' : ''}`}>
      <p className="cta-assurance-main">
        <span className="cta-assurance-flap" aria-hidden="true">
          ＼
        </span>
        <span className="cta-assurance-pill">{CTA_ASSURANCE.above}</span>
        <span className="cta-assurance-flap" aria-hidden="true">
          ／
        </span>
      </p>
      {children}
      <p className="cta-assurance-sub">{CTA_ASSURANCE.below}</p>
    </div>
  )
}

export default CtaAssurance
