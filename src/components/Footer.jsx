import { Link } from 'react-router-dom'
import { company } from '../data/company.js'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-mark">LIEN</span>
          <div>
            <p className="footer-name">{company.name}</p>
            <p className="footer-tagline">「絆」を、確かな技術で。</p>
          </div>
        </div>

        <div className="footer-info">
          <p>{company.address}</p>
          <p>
            TEL:{' '}
            <a href={`tel:${company.tel.replace(/-/g, '')}`}>{company.tel}</a>
          </p>
        </div>

        <nav className="footer-nav">
          <Link to="/about">会社概要</Link>
          <Link to="/services">事業内容</Link>
          <Link to="/contact">お問い合わせ</Link>
        </nav>
      </div>
      <p className="copyright">
        © {new Date().getFullYear()} {company.name} All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
