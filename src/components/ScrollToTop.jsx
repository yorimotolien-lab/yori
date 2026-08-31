import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // ハッシュ付きリンク（例: /strength#corporate）ではその要素までスクロール。
    // 固定ヘッダーぶんの補正は CSS の scroll-padding-top に任せる。
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        // 遷移直後はDOM描画待ちのため次フレームで実行。
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        )
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
