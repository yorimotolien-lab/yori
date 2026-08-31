import { useEffect, useRef, useState } from 'react'

// 数字を 0 から end まで滑らかにカウントアップするコンポーネント。
// 要素がビューポートに入った瞬間に一度だけ発火する（IntersectionObserver）。
// - prefix / suffix で「最長」「年」などの装飾文字を数字の前後に添えられる。
// - 「視差効果を減らす」設定時や IntersectionObserver 非対応時は、
//   即時に最終値を表示してアクセシビリティを担保する。
// アニメーションを再生できない環境（IntersectionObserver 非対応 / 視差効果オフ）か。
function shouldSkipAnimation() {
  if (typeof window === 'undefined') return true
  if (!('IntersectionObserver' in window)) return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function CountUp({
  end,
  duration = 1400,
  prefix = '',
  suffix = '',
  className = '',
  // 桁区切りカンマの有無。年号（2020）などは false、大きな実績件数は true。
  group = true,
}) {
  const ref = useRef(null)
  // 非再生環境では最初から最終値を表示（effect 内での同期 setState を避ける）。
  const [value, setValue] = useState(() => (shouldSkipAnimation() ? end : 0))

  useEffect(() => {
    const el = ref.current
    if (!el || shouldSkipAnimation()) return

    let rafId = 0
    let started = false

    // easeOutCubic：終盤でゆっくり止まる、上品な減速カーブ。
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const run = () => {
      const startTime = performance.now()
      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1)
        setValue(Math.round(easeOutCubic(progress) * end))
        if (progress < 1) rafId = requestAnimationFrame(step)
      }
      rafId = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true
            run()
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [end, duration])

  return (
    <span ref={ref} className={`count-up ${className}`.trim()}>
      {prefix}
      {group ? value.toLocaleString('ja-JP') : String(value)}
      {suffix}
    </span>
  )
}

export default CountUp
