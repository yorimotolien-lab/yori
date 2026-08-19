import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// サイト全体のスクロール連動アニメーション。
// `.fade-in-up` クラスを持つ要素がビューポートに入ったら `.is-visible` を付与し、
// CSS 側でフェードイン＆スライドアップさせる（軽量な Intersection Observer を使用）。
// ページ遷移（pathname 変更）ごとに再スキャンする。
function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll('.fade-in-up:not(.is-visible)'),
    )
    if (targets.length === 0) return

    // 安全策：IntersectionObserver 非対応、または「視差効果を減らす」設定時は
    // 即時表示にして、内容が隠れたままになるのを防ぐ。
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (!('IntersectionObserver' in window) || prefersReduced) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
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

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}

export default ScrollReveal
