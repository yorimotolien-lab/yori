import { Link } from 'react-router-dom'
import { POSTS } from '../posts.js'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

function Blog() {
  return (
    <>
      <Seo path="/blog" name="ブログ" />
      <title>ブログ・お知らせ | 株式会社LIEN</title>
      <meta
        name="description"
        content="株式会社LIENのブログ・お知らせ。外壁塗装・防水・シーリング・大規模修繕のお役立ち情報や、施工に関する最新情報を市川市からお届けします。"
      />
      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">BLOG</p>
          <h1 className="page-title">ブログ・お知らせ</h1>
        </div>
      </section>

      <Breadcrumb />

      <section className="section">
        <div className="section-inner">
          {POSTS.length === 0 ? (
            <p className="concept-text">記事を準備中です。</p>
          ) : (
            <ul className="blog-list">
              {POSTS.map((post) => (
                <li key={post.slug} className="blog-card">
                  <Link to={`/blog/${post.slug}`} className="blog-card-link">
                    {post.image ? (
                      <div className="blog-card-thumb">
                        <img
                          src={`${import.meta.env.BASE_URL}${post.image}`}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div className="blog-card-body">
                      <div className="blog-meta">
                        <span className="blog-cat">{post.category}</span>
                        {post.date ? (
                          <time className="blog-date">{post.date}</time>
                        ) : null}
                      </div>
                      <h2 className="blog-card-title">{post.title}</h2>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      <span className="blog-more">続きを読む →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}

export default Blog
