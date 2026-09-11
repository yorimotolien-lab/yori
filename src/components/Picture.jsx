import { useState } from 'react'

// WebP を優先配信し、読み込めない場合は元画像（jpg/png）へ自動フォールバックする <img> のドロップイン。
// 使い方は <img> と同じ（src / alt / loading / className / onError など）。
//
// <picture> は「ブラウザが WebP 形式に対応しているか」だけで <source> を選び、
// 「ファイルが実在するか」は見ない。そのため WebP 版が未生成のまま新しい画像を追加すると、
// WebP を読みにいって 404 → 表示が壊れる（自動で jpg には戻らない）。
// これを防ぐため、<source>(WebP) の読み込みに失敗したら元画像に切り替える。
// → WebP があれば WebP（軽い）、無ければ jpg/png（壊れない）。新規画像は
//   アップロードするだけでよく、WebP 生成を忘れても崩れない。
const CONVERTIBLE = /\.(jpe?g|png)(\?.*)?$/i

function toWebp(src) {
  return src.replace(CONVERTIBLE, (m, ext, query = '') => `.webp${query || ''}`)
}

export default function Picture({ src, alt = '', onError, ...rest }) {
  // WebP(source) の読み込みに失敗したら true にして、元画像のみで再読み込みする。
  const [webpFailed, setWebpFailed] = useState(false)
  const convertible = !!src && CONVERTIBLE.test(src)

  // 変換対象外（svg 等）、または WebP が失敗した後は、素の <img>（元画像）を返す。
  // ここでの onError は呼び出し側に伝える（元画像も読めない＝本当に画像が無い場合）。
  if (!convertible || webpFailed) {
    return <img src={src} alt={alt} onError={onError} {...rest} />
  }

  return (
    <picture>
      <source srcSet={toWebp(src)} type="image/webp" />
      <img
        src={src}
        alt={alt}
        onError={() => setWebpFailed(true)}
        {...rest}
      />
    </picture>
  )
}
