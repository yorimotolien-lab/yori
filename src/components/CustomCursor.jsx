import { useEffect, useRef } from 'react'

// インタラクティブなカスタムカーソル（PC専用）。
// ・fine pointer かつ hover 可能な端末（＝マウス操作のPC）でのみ有効化。タッチ端末では何もしない。
// ・小さなドット（即追従）＋リング（なめらかに遅れて追従／lerp）の2要素。
// ・a / button などクリッカブル要素にホバーするとリングが拡大。
// ・mix-blend-mode: difference により背景色を反転して映える。
// ・prefers-reduced-motion 時は追従の慣性を無効化（即追従）。
function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('has-custom-cursor')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let rafId = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      if (reduceMotion) {
        ring.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      rafId = requestAnimationFrame(loop)
    }
    if (!reduceMotion) rafId = requestAnimationFrame(loop)

    // クリッカブル要素の判定
    const CLICKABLE =
      'a, button, [role="button"], label, summary, input, textarea, select, .sos-item'
    const onOver = (e) => {
      if (e.target.closest?.(CLICKABLE)) {
        document.body.classList.add('cursor-hover')
      }
    }
    const onOut = (e) => {
      if (e.target.closest?.(CLICKABLE)) {
        document.body.classList.remove('cursor-hover')
      }
    }
    const onDown = () => document.body.classList.add('cursor-down')
    const onUp = () => document.body.classList.remove('cursor-down')
    const onLeave = () => document.body.classList.add('cursor-hidden')
    const onEnter = () => document.body.classList.remove('cursor-hidden')

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.classList.remove(
        'has-custom-cursor',
        'cursor-hover',
        'cursor-down',
        'cursor-hidden',
      )
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-ring-shape" />
      </div>
    </>
  )
}

export default CustomCursor
