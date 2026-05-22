import { Link } from 'react-router-dom'
import { COMPANY } from '../constants.js'

function MobileCta() {
  return (
    <div className="mobile-cta">
      <a href={COMPANY.telHref} className="mobile-cta-btn mobile-cta-tel">
        <span className="mobile-cta-label">お電話</span>
        <span className="mobile-cta-sub">{COMPANY.tel}</span>
      </a>
      <Link to="/contact" className="mobile-cta-btn mobile-cta-form">
        <span className="mobile-cta-label">無料で相談</span>
        <span className="mobile-cta-sub">お問い合わせ</span>
      </Link>
    </div>
  )
}

export default MobileCta
