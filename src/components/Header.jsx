import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'ホーム' },
  { to: '/about', label: '会社概要' },
  { to: '/services', label: '事業内容' },
  { to: '/contact', label: 'お問い合わせ' },
]

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">LIEN</span>
          <span className="brand-text">
            <span className="brand-jp">株式会社LIEN</span>
            <span className="brand-en">CONSTRUCTION</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="メニューを開閉"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`nav-toggle-bar ${open ? 'is-open' : ''}`}></span>
        </button>

        <nav className={`nav ${open ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
