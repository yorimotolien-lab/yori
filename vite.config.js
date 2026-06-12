import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// コンテンツセキュリティポリシー（同一オリジンのみ許可）。
// 外部スクリプト/CDN/Webフォント等は未使用のため 'self' 中心で厳格化できる。
// style-src の 'unsafe-inline' はヒーロー透かしのインラインスタイル用。
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
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

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), injectCspMeta()],
})
