import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

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
    '/blog',
    '/contact',
    '/privacy',
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

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), injectCspMeta(), generateSitemap()],
})
