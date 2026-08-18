import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { COMPANY, NAV_ITEMS } from '../constants.js'
import FontSizeToggle from './FontSizeToggle.jsx'

function Header() {
  const [open, setOpen] = useState(false)
  // ロゴ表示の切り替え: 'metallic'(logo.jpg) → 'png'(logo.png) → 'text'
  const [logo, setLogo] = useState('png')
  const metallicSrc = `${import.meta.env.BASE_URL}logo.jpg`
  const pngSrc = `${import.meta.env.BASE_URL}logo.png`
  const alt = `${COMPANY.name} ${COMPANY.nameEn}`

  // 新しい白背景ロゴ(public/logo.jpg)が存在すれば自動でそちらを使う。
  // 無ければ従来のロゴ(logo.png)のまま表示し、ちらつき・不具合を防ぐ。
  useEffect(() => {
    const img = new Image()
    img.onload = () => setLogo('metallic')
    img.src = metallicSrc
  }, [metallicSrc])

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          to="/"
          className="logo"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          {logo === 'metallic' ? (
            <img
              src={metallicSrc}
              alt={alt}
              className="logo-img logo-img--metallic"
              onError={() => setLogo('png')}
            />
          ) : logo === 'png' ? (
            <img
              src={pngSrc}
              alt={alt}
              className="logo-img"
              onError={() => setLogo('text')}
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
          <FontSizeToggle />
        </nav>
      </div>
    </header>
  )
}

export default Header
