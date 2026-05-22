import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { COMPANY, NAV_ITEMS } from '../constants.js'

function Header() {
  const [open, setOpen] = useState(false)
  const [logoOk, setLogoOk] = useState(true)
  const logoSrc = `${import.meta.env.BASE_URL}logo.png`

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          to="/"
          className="logo"
          aria-label={`${COMPANY.name} ${COMPANY.nameEn}`}
          onClick={() => setOpen(false)}
        >
          {logoOk ? (
            <img
              src={logoSrc}
              alt={`${COMPANY.name} ${COMPANY.nameEn}`}
              className="logo-img"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <>
              <span className="logo-main">LIEN</span>
              <span className="logo-sub">CONSTRUCTION</span>
            </>
          )}
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="メニューを開く"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <nav className={`site-nav${open ? ' is-open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive ? 'nav-link is-active' : 'nav-link'
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <a className="nav-tel" href={COMPANY.telHref}>
            {COMPANY.tel}
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
