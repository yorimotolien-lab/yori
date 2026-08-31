import { Link } from 'react-router-dom'
import { COMPANY, FOOTER_LINKS } from '../constants.js'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-main">LIEN</span>
          <span className="logo-sub">CONSTRUCTION</span>
          <p className="footer-company">{COMPANY.name}</p>
          <p className="footer-address">{COMPANY.address}</p>
          <p className="footer-tel">
            TEL <a href={COMPANY.telHref}>{COMPANY.tel}</a>
          </p>
        </div>
        <nav className="footer-nav">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
          <Link to="/privacy">プライバシーポリシー</Link>
        </nav>
      </div>
      <p className="copyright">
        © {new Date().getFullYear()} {COMPANY.name}
      </p>
    </footer>
  )
}

export default Footer
