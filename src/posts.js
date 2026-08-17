// src/posts/*.md を読み込み、記事データの配列にする。
// 記事を追加するには src/posts/ に .md ファイルを1つ足すだけでよい。
// 先頭に「フロントマター」を書く:
//   ---
//   title: 記事タイトル
//   date: 2026-08-17
//   category: お知らせ
//   excerpt: 一覧に表示する短い説明
//   ---
//   本文（Markdown）...
const files = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parsePost(path, raw) {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  const meta = {}
  let body = raw
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (fm) {
    fm[1].split('\n').forEach((line) => {
      const idx = line.indexOf(':')
      if (idx > 0) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
    })
    body = fm[2]
  }
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    category: meta.category || 'お知らせ',
    excerpt: meta.excerpt || '',
    image: meta.image || '',
    body: body.trim(),
  }
}

export const POSTS = Object.entries(files)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export const getPost = (slug) => POSTS.find((p) => p.slug === slug)
