// ページ別のSEOメタ（canonical）と構造化データ(JSON-LD)を出力する共通コンポーネント。
// React 19 のドキュメントメタデータ機能で <head> に反映される。
// JSON-LD は application/ld+json（非実行）のため、既存のCSP(script-src 'self')にも適合。
const SITE = 'https://lien-2020.com'

export default function Seo({ path = '/', name, jsonLd }) {
  const url = path === '/' ? `${SITE}/` : `${SITE}${path}`
  const blocks = []

  // トップ以外はパンくず(BreadcrumbList)を自動生成
  if (path !== '/' && name) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name, item: url },
      ],
    })
  }

  if (jsonLd) blocks.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]))

  return (
    <>
      <link rel="canonical" href={url} />
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  )
}
