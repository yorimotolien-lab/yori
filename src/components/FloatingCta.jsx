import { Link } from 'react-router-dom'

// PC表示で常時追従する相談ボタン（モバイルは下部固定バー MobileCta を使用）
function FloatingCta() {
  return (
    <Link to="/contact" className="floating-cta">
      <span className="floating-cta-main">無料相談</span>
      <span className="floating-cta-sub">見積り無料・相談だけOK</span>
    </Link>
  )
}

export default FloatingCta
