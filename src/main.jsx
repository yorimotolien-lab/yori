import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Google Analytics 4 (gtag.js) — 本番ビルドのみ計測。
// 厳格なCSPに合わせ、インラインではなく同一オリジンのバンドルJSから読み込む。
if (import.meta.env.PROD) {
  const GA_ID = 'G-EBC614EHQS'
  const gaScript = document.createElement('script')
  gaScript.async = true
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(gaScript)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
