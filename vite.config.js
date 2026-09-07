import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { AREAS } from './src/areas.js'
import { STATIC_META, SITE_URL, DEFAULT_OG_IMAGE } from './src/site-meta.js'

// コンテンツセキュリティポリシー。
// 外部は Google Analytics(gtag) と Web3Forms のみ許可し、それ以外は 'self' 中心で厳格化。
// style-src の 'unsafe-inline' はヒーロー透かしのインラインスタイル用。
const CSP = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://api.web3forms.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

// CSP メタタグは本番ビルドの index.html にのみ注入する。
// （dev サーバーは HMR でインラインスクリプト/eval/WebSocket を使うため付与しない）
function injectCspMeta() {
  return {
    name: 'inject-csp-meta',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        '<head>',
        `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`,
      )
    },
  }
}

// sitemap.xml をビルド時に自動生成する。
// 固定ページ＋ src/posts/*.md から全ブログ記事URLを収集するため、記事を追加しても自動反映される。
function generateSitemap() {
  const SITE = 'https://lien-2020.com'
  const staticRoutes = [
    '/',
    '/strength',
    '/works',
    '/clients',
    '/diagnosis',
    '/services',
    '/maintenance',
    '/faq',
    '/partners',
    '/company',
    '/area',
    '/blog',
    '/contact',
    '/privacy',
    // 地域別ランディングページ（src/areas.js から自動生成）
    ...AREAS.map((a) => `/area/${a.slug}`),
  ]
  return {
    name: 'generate-sitemap',
    apply: 'build',
    closeBundle() {
      let posts
      try {
        posts = fs
          .readdirSync(path.resolve('src/posts'))
          .filter((f) => f.endsWith('.md'))
          .map((f) => `/blog/${f.replace(/\.md$/, '')}`)
      } catch {
        posts = []
      }
      const urls = [...staticRoutes, ...posts]
      const body = urls
        .map((u) => `  <url>\n    <loc>${SITE}${u}</loc>\n  </url>`)
        .join('\n')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
      fs.writeFileSync(path.resolve('dist/sitemap.xml'), xml)
    },
  }
}

// ルートごとの静的HTMLを生成し、正しい <title>・<meta description>・OGP を埋め込む。
// 純クライアントSPA（全ルートに index.html を配信）では、SNSクローラー等の
// JS非実行環境に静的HTMLしか届かないため、これによりページ別OGPを本当に効かせる。
function prerenderMeta() {
  const escAttr = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

  // src/posts/*.md のフロントマターから記事メタを取得
  const readPostsMeta = () => {
    try {
      return fs
        .readdirSync(path.resolve('src/posts'))
        .filter((f) => f.endsWith('.md'))
        .map((f) => {
          const raw = fs
            .readFileSync(path.resolve('src/posts', f), 'utf8')
            .replace(/\r\n/g, '\n')
          const meta = {}
          const fm = raw.match(/^---\n([\s\S]*?)\n---/)
          if (fm) {
            fm[1].split('\n').forEach((line) => {
              const i = line.indexOf(':')
              if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
            })
          }
          const slug = f.replace(/\.md$/, '')
          return {
            slug,
            title: meta.title || slug,
            excerpt: meta.excerpt || '',
            image: meta.image || '',
          }
        })
    } catch {
      return []
    }
  }

  const buildRouteMeta = () => {
    const routes = Object.entries(STATIC_META).map(([pathname, m]) => ({
      path: pathname,
      title: m.title,
      description: m.description,
      image: DEFAULT_OG_IMAGE,
      type: 'website',
    }))
    for (const p of readPostsMeta()) {
      routes.push({
        path: `/blog/${p.slug}`,
        title: `${p.title} | 株式会社LIEN`,
        description: p.excerpt,
        image: p.image ? `/${p.image}` : DEFAULT_OG_IMAGE,
        type: 'article',
      })
    }
    for (const a of AREAS) {
      routes.push({
        path: `/area/${a.slug}`,
        title: `${a.city}の外壁塗装・防水・雨漏り修理 | 株式会社LIEN`,
        description: a.metaDescription,
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      })
    }
    return routes
  }

  const renderHtml = (template, route) => {
    const url = `${SITE_URL}${route.path}`
    const title = escAttr(route.title)
    const desc = escAttr(route.description)
    const img = `${SITE_URL}${route.image}`
    let html = template
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
      .replace(
        /<meta[^>]*name="description"[^>]*>/,
        `<meta name="description" content="${desc}" />`,
      )
      .replace(
        /<meta[^>]*property="og:title"[^>]*>/,
        `<meta property="og:title" content="${title}" />`,
      )
      .replace(
        /<meta[^>]*property="og:description"[^>]*>/,
        `<meta property="og:description" content="${desc}" />`,
      )
      .replace(
        /<meta[^>]*property="og:url"[^>]*>/,
        `<meta property="og:url" content="${url}" />`,
      )
      .replace(
        /<meta[^>]*property="og:type"[^>]*>/,
        `<meta property="og:type" content="${route.type}" />`,
      )
      .replace(
        /<meta[^>]*property="og:image"[^>]*>/,
        `<meta property="og:image" content="${img}" />`,
      )
      .replace(
        /<meta[^>]*name="twitter:title"[^>]*>/,
        `<meta name="twitter:title" content="${title}" />`,
      )
      .replace(
        /<meta[^>]*name="twitter:description"[^>]*>/,
        `<meta name="twitter:description" content="${desc}" />`,
      )
      .replace(
        /<meta[^>]*name="twitter:image"[^>]*>/,
        `<meta name="twitter:image" content="${img}" />`,
      )
    // canonical を注入
    html = html.replace(
      '</head>',
      `    <link rel="canonical" href="${url}" />\n  </head>`,
    )
    return html
  }

  return {
    name: 'prerender-meta',
    apply: 'build',
    closeBundle() {
      const distIndex = path.resolve('dist/index.html')
      let template
      try {
        template = fs.readFileSync(distIndex, 'utf8')
      } catch {
        return
      }
      for (const route of buildRouteMeta()) {
        const html = renderHtml(template, route)
        if (route.path === '/') {
          fs.writeFileSync(distIndex, html)
        } else {
          // フラットな <path>.html として出力（スラッシュなしURLで直接配信されるため、
          // 内部リンク・サイトマップ・canonical のスラッシュなし表記と一致する）。
          const filePath = path.resolve(
            'dist',
            `${route.path.replace(/^\//, '')}.html`,
          )
          fs.mkdirSync(path.dirname(filePath), { recursive: true })
          fs.writeFileSync(filePath, html)
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), injectCspMeta(), generateSitemap(), prerenderMeta()],
})
