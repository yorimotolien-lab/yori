// ページ内の目次（アンカーナビ）。items: [{ id, label }]。
// クリックで対象セクションへスムーズスクロール（sticky ヘッダー分は
// CSS の scroll-margin-top で調整）。JS が無効でも href の通常ジャンプで機能。
function PageToc({ items }) {
  const handleClick = (e, id) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="page-toc" aria-label="このページの目次">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={(e) => handleClick(e, item.id)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default PageToc
