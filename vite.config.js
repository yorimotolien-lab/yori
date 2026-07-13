import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), injectCspMeta()],
})
