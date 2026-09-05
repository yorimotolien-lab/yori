import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MobileCta from './components/MobileCta.jsx'
import FloatingCta from './components/FloatingCta.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ScrollReveal from './components/ScrollReveal.jsx'
import Home from './pages/Home.jsx'
import Strength from './pages/Strength.jsx'
import Works from './pages/Works.jsx'
import Diagnosis from './pages/Diagnosis.jsx'
import Clients from './pages/Clients.jsx'
import Company from './pages/Company.jsx'
import Services from './pages/Services.jsx'
import Maintenance from './pages/Maintenance.jsx'
import Faq from './pages/Faq.jsx'
import Partners from './pages/Partners.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import './App.css'

function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollReveal />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/strength" element={<Strength />} />
          <Route path="/works" element={<Works />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/company" element={<Company />} />
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
      </main>
      <Footer />
      <MobileCta />
      <FloatingCta />
    </>
  )
}

export default App
