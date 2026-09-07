import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MobileCta from './components/MobileCta.jsx'
import FloatingCta from './components/FloatingCta.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ScrollReveal from './components/ScrollReveal.jsx'
import Home from './pages/Home.jsx'
import './App.css'

// トップページ(Home)は初回表示のため即時読み込み。
// それ以外のページはルート単位で遅延読み込み（コード分割）し、初期バンドルを軽量化する。
const Strength = lazy(() => import('./pages/Strength.jsx'))
const Works = lazy(() => import('./pages/Works.jsx'))
const Diagnosis = lazy(() => import('./pages/Diagnosis.jsx'))
const Clients = lazy(() => import('./pages/Clients.jsx'))
const Company = lazy(() => import('./pages/Company.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const Maintenance = lazy(() => import('./pages/Maintenance.jsx'))
const Faq = lazy(() => import('./pages/Faq.jsx'))
const Partners = lazy(() => import('./pages/Partners.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const AreaIndex = lazy(() => import('./pages/AreaIndex.jsx'))
const AreaLanding = lazy(() => import('./pages/AreaLanding.jsx'))

function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollReveal />
      <Header />
      <main>
        <Suspense
          fallback={
            <div className="route-loading" aria-live="polite" aria-busy="true">
              <span className="route-spinner" aria-hidden="true" />
              <span className="sr-only">読み込み中…</span>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/strength" element={<Strength />} />
            <Route path="/works" element={<Works />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/company" element={<Company />} />
            <Route path="/area" element={<AreaIndex />} />
            <Route path="/area/:slug" element={<AreaLanding />} />
            {/* 旧URL /about は /company へ恒久リダイレクト（被リンク・SEO維持） */}
            <Route path="/about" element={<Navigate to="/company" replace />} />
            <Route path="/services" element={<Services />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <MobileCta />
      <FloatingCta />
    </>
  )
}

export default App
