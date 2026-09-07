import { useParams, Link, Navigate } from 'react-router-dom'
import { COMPANY } from '../constants.js'
import { getPost, getRelatedPosts } from '../posts.js'
import { renderMarkdown } from '../markdown.jsx'
import Seo from '../components/Seo.jsx'
import Picture from '../components/Picture.jsx'

const SITE = 'https://lien-2020.com'

function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <Navigate to="/blog" replace />
  const related = getRelatedPosts(slug, 3)

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
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              className="blog-cat blog-cat--link"
            >
              {post.category}
            </Link>
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

          {related.length > 0 && (
            <section className="blog-related" aria-label="関連記事">
              <h2 className="blog-related-title">関連記事</h2>
              <ul className="blog-list">
                {related.map((rp) => (
                  <li key={rp.slug} className="blog-card">
                    <Link to={`/blog/${rp.slug}`} className="blog-card-link">
                      {rp.image ? (
                        <div className="blog-card-thumb">
                          <Picture
                            src={`${import.meta.env.BASE_URL}${rp.image}`}
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : (
                        <div
                          className="blog-card-thumb blog-card-thumb--ph"
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z" />
                          </svg>
                        </div>
                      )}
                      <div className="blog-card-body">
                        <div className="blog-meta">
                          <span className="blog-cat">{rp.category}</span>
                          {rp.date ? (
                            <time className="blog-date">{rp.date}</time>
                          ) : null}
                        </div>
                        <h3 className="blog-card-title">{rp.title}</h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

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
