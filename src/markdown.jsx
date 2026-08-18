import { Link } from 'react-router-dom'

// 依存ライブラリなしの簡易Markdownレンダラー。
// React要素を返すため dangerouslySetInnerHTML を使わず、XSSの心配がない。
// 対応記法: ## / ### 見出し、段落、- / * 箇条書き、1. 番号付き、
//   **太字**、[テキスト](URL)リンク、![alt](画像URL)、> ポイント囲み枠、--- 区切り線。

function parseInline(text) {
  const nodes = []
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let key = 0
  let m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      nodes.push(<strong key={key++}>{m[1]}</strong>)
    } else {
      const label = m[2]
      const url = m[3]
      if (/^https?:\/\//.test(url)) {
        nodes.push(
          <a key={key++} href={url} target="_blank" rel="noopener noreferrer">
            {label}
          </a>,
        )
      } else {
        nodes.push(
          <Link key={key++} to={url}>
            {label}
          </Link>,
        )
      }
    }
    last = m.index + m[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

const SPECIAL = /^(#{2,3}\s|[-*]\s|\d+\.\s|>\s|---+\s*$|!\[)/

export function renderMarkdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i++
      continue
    }
    const key = blocks.length

    const heading = line.match(/^(#{2,3})\s+(.*)$/)
    if (heading) {
      const Tag = heading[1].length === 2 ? 'h2' : 'h3'
      blocks.push(<Tag key={key}>{parseInline(heading[2])}</Tag>)
      i++
      continue
    }

    if (/^---+\s*$/.test(line)) {
      blocks.push(<hr key={key} />)
      i++
      continue
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/)
    if (image) {
      blocks.push(
        <figure key={key} className="blog-figure">
          <img src={image[2]} alt={image[1]} loading="lazy" />
        </figure>,
      )
      i++
      continue
    }

    if (line.startsWith('> ')) {
      const buf = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        buf.push(lines[i].slice(2))
        i++
      }
      blocks.push(
        <aside key={key} className="point-box">
          {parseInline(buf.join(' '))}
        </aside>,
      )
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''))
        i++
      }
      blocks.push(
        <ul key={key} className="blog-ul">
          {items.map((it, j) => (
            <li key={j}>{parseInline(it)}</li>
          ))}
        </ul>,
      )
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''))
        i++
      }
      blocks.push(
        <ol key={key} className="blog-ol">
          {items.map((it, j) => (
            <li key={j}>{parseInline(it)}</li>
          ))}
        </ol>,
      )
      continue
    }

    const buf = []
    while (i < lines.length && lines[i].trim() && !SPECIAL.test(lines[i])) {
      buf.push(lines[i])
      i++
    }
    blocks.push(<p key={key}>{parseInline(buf.join(' '))}</p>)
  }
  return blocks
}
