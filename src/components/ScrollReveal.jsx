import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// サイト全体のスクロール連動アニメーション。
// `.fade-in-up` クラスを持つ要素がビューポートに入ったら `.is-visible` を付与し、
// CSS 側でフェードイン＆スライドアップさせる（軽量な Intersection Observer を使用）。
// ページ遷移（pathname 変更）ごとに再スキャンし、さらに React.lazy による
// 遅延読み込みや「もっと見る」等で後から追加される要素にも MutationObserver で対応する。
function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const supported = 'IntersectionObserver' in window

    const io = supported
      ? new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                obs.unobserve(entry.target)
              }
            })
          },
          // 要素が 15% ほど画面内に入った瞬間に発火。
          { threshold: 0.15 },
        )
      : null

    // 未処理の `.fade-in-up` を拾って監視（または即時表示）する。
    const scan = () => {
      const targets = document.querySelectorAll('.fade-in-up:not(.is-visible)')
      // 安全策：IntersectionObserver 非対応、または「視差効果を減らす」設定時は
      // 即時表示にして、内容が隠れたままになるのを防ぐ。
      if (!io || prefersReduced) {
        targets.forEach((el) => el.classList.add('is-visible'))
        return
      }
      targets.forEach((el) => io.observe(el))
    }

    scan()

    // 遅延読み込み（React.lazy / Suspense）で後からマウントされる要素にも対応。
    // DOM 変化を rAF でまとめて再スキャンする。
    let raf = 0
    const mo = new MutationObserver(() => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        scan()
      })
    })
    mo.observe(document.querySelector('main') || document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      mo.disconnect()
      if (raf) cancelAnimationFrame(raf)
      if (io) io.disconnect()
    }
  }, [pathname])

  return null
}

export default ScrollReveal
