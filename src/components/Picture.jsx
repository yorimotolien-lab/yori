// WebP を優先配信し、非対応ブラウザには元画像（jpg/png）をフォールバックする <img> のドロップイン。
// 使い方は <img> と同じ（src / alt / loading / className など）。src が jpg/png のときだけ
// <picture> でラップし、それ以外（svg 等）や webp 版が無い画像はそのまま <img> を返す。
// CSS は従来どおり子孫セレクタ（.xxx img）で当たる（picture は display:contents で
// レイアウトに影響しない → App.css 参照）。
const CONVERTIBLE = /\.(jpe?g|png)(\?.*)?$/i

function toWebp(src) {
  return src.replace(CONVERTIBLE, (m, ext, query = '') => `.webp${query || ''}`)
}

export default function Picture({ src, alt = '', ...rest }) {
  if (!src || !CONVERTIBLE.test(src)) {
    return <img src={src} alt={alt} {...rest} />
  }
  return (
    <picture>
      <source srcSet={toWebp(src)} type="image/webp" />
      <img src={src} alt={alt} {...rest} />
    </picture>
  )
}
