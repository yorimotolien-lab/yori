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

function parsePost(path, rawInput) {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  // 改行コードを LF に正規化（Windows で CRLF になってもフロントマターを正しく解析するため）
  const raw = rawInput.replace(/\r\n/g, '\n')
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

// 記事に含まれる主要トピックのキーワード（関連記事の類似度計算に使用）。
const TOPIC_KEYWORDS = [
  '外壁', '屋根', '防水', '雨漏り', 'シーリング', '塗料', '塗装', '色',
  '艶', 'ツヤ', '遮熱', '断熱', 'ベランダ', 'バルコニー', 'クラック',
  'ひび割れ', '高圧洗浄', '付帯部', '費用', '相場', 'クリヤー', 'ツートン',
  'スケジュール', '季節', 'グレード', '点検', '診断', 'チョーキング',
  'メンテナンス', 'カビ', 'コケ',
]

// 記事のタイトル＋抜粋から、該当するトピックキーワードを抽出する。
function keywordsOf(post) {
  const hay = `${post.title} ${post.excerpt}`
  return TOPIC_KEYWORDS.filter((k) => hay.includes(k))
}

// 指定記事に関連する記事を、キーワードの一致数（＋同カテゴリ）でスコアリングして返す。
// スコアが同点、または関連が少ない場合は新しい記事で補完し、常に limit 件を返す。
export function getRelatedPosts(slug, limit = 3) {
  const current = POSTS.find((p) => p.slug === slug)
  if (!current) return []
  const curKw = keywordsOf(current)
  return POSTS.filter((p) => p.slug !== slug)
    .map((p) => {
      const overlap = keywordsOf(p).filter((k) => curKw.includes(k)).length
      const sameCategory = p.category === current.category ? 1 : 0
      return { post: p, score: overlap * 2 + sameCategory }
    })
    .sort((a, b) =>
      b.score !== a.score
        ? b.score - a.score
        : a.post.date < b.post.date
          ? 1
          : -1,
    )
    .slice(0, limit)
    .map((s) => s.post)
}

// 記事一覧に存在するカテゴリ（登場順）。ブログ一覧の絞り込みに使用。
export const CATEGORIES = POSTS.reduce((acc, p) => {
  if (p.category && !acc.includes(p.category)) acc.push(p.category)
  return acc
}, [])
