import { useParams, Link, Navigate } from 'react-router-dom'
import { COMPANY } from '../constants.js'
import { getPost } from '../posts.js'
import { renderMarkdown } from '../markdown.jsx'
import Seo from '../components/Seo.jsx'

const SITE = 'https://lien-2020.com'

function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <Navigate to="/blog" replace />

  const url = `${SITE}/blog/${post.slug}`
  const imageUrl = post.image ? `${SITE}/${post.image}` : ''
  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    ...(post.date ? { datePublished: post.date, dateModified: post.date } : {}),
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: COMPANY.name },
    publisher: { '@type': 'Organization', name: COMPANY.name },
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'ブログ', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <>
      <Seo path={`/blog/${post.slug}`} jsonLd={[blogPostingLd, breadcrumbLd]} />
      <title>{`${post.title} | 株式会社LIEN`}</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={`${post.title} | 株式会社LIEN`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="株式会社LIEN" />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
      <meta
        name="twitter:card"
        content={imageUrl ? 'summary_large_image' : 'summary'}
      />

      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">BLOG</p>
          <h1 className="page-title blog-post-title">{post.title}</h1>
        </div>
      </section>

      <nav className="breadcrumb" aria-label="パンくずリスト">
        <div className="section-inner">
          <Link to="/">ホーム</Link>
          <span className="breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <Link to="/blog">ブログ</Link>
          <span className="breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">{post.title}</span>
        </div>
      </nav>

      <article className="section">
        <div className="section-inner narrow">
          <div className="blog-meta">
            <span className="blog-cat">{post.category}</span>
            {post.date ? <time className="blog-date">{post.date}</time> : null}
          </div>

          <div className="blog-body">{renderMarkdown(post.body)}</div>

          <div className="blog-cta">
            <p className="blog-cta-text">
              建物のことでお困りごとはありませんか？ ご相談・現地調査・お見積りは無料です。
            </p>
            <div className="blog-cta-actions">
              <a href={COMPANY.telHref} className="btn btn-outline">
                お電話で相談 {COMPANY.tel}
              </a>
              <Link to="/contact" className="btn btn-primary">
                無料で相談・お問い合わせ
              </Link>
            </div>
          </div>

          <div className="section-action">
            <Link to="/blog" className="text-link">
              ← ブログ一覧へもどる
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}

export default BlogPost
