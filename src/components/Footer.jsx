import { Link } from 'react-router-dom'
import { COMPANY, NAV_ITEMS } from '../constants.js'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-main">{COMPANY.name}</span>
          <span className="logo-sub">{COMPANY.nameEn}</span>
          <p className="footer-address">{COMPANY.address}</p>
          <p className="footer-tel">
            TEL <a href={COMPANY.telHref}>{COMPANY.tel}</a>
          </p>
        </div>
        <nav className="footer-nav">
          {NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="copyright">
        © {new Date().getFullYear()} {COMPANY.name}
      </p>
    </footer>
  )
}

export default Footer
