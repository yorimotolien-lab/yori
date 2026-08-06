import { useState, useEffect } from 'react'

// 文字サイズ切替（標準／大）。選択は localStorage で保持し、
// html に .font-lg を付与して拡大する（CSS: html.font-lg { zoom }）。
function FontSizeToggle() {
  const [large, setLarge] = useState(() => {
    try {
      return localStorage.getItem('fontLarge') === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('font-lg', large)
    try {
      localStorage.setItem('fontLarge', large ? '1' : '0')
    } catch {
      // localStorage が使えない環境では保存しない
    }
  }, [large])

  return (
    <div className="font-size-toggle" role="group" aria-label="文字サイズの変更">
      <span className="font-size-label">文字サイズ</span>
      <button
        type="button"
        className={large ? 'font-size-btn' : 'font-size-btn is-active'}
        aria-pressed={!large}
        onClick={() => setLarge(false)}
      >
        標準
      </button>
      <button
        type="button"
        className={large ? 'font-size-btn is-active' : 'font-size-btn'}
        aria-pressed={large}
        onClick={() => setLarge(true)}
      >
        大
      </button>
    </div>
  )
}

export default FontSizeToggle
