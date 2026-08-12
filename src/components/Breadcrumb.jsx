import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../constants.js'

// 画面上のパンくずリスト（ホーム ＞ 現在ページ）。
// ページ名はナビ項目から取得し、/privacy のみ個別対応。トップでは非表示。
function Breadcrumb() {
  const { pathname } = useLocation()
  const navItem = NAV_ITEMS.find((item) => item.to === pathname)
  const name =
    navItem && navItem.to !== '/'
      ? navItem.label
      : pathname === '/privacy'
        ? 'プライバシーポリシー'
        : null

  if (!name) return null

  return (
    <nav className="breadcrumb" aria-label="パンくずリスト">
      <div className="section-inner">
        <Link to="/">ホーム</Link>
        <span className="breadcrumb-sep" aria-hidden="true">
          ›
        </span>
        <span aria-current="page">{name}</span>
      </div>
    </nav>
  )
}

export default Breadcrumb
