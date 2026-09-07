import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { POSTS, CATEGORIES } from '../posts.js'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Picture from '../components/Picture.jsx'

const INITIAL = 6 // 初期表示件数
const STEP = 6 // 「もっと見る」で追加表示する件数

function Blog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') // null = すべて
  const [visible, setVisible] = useState(INITIAL)

  // カテゴリ絞り込みが変わったら表示件数をリセット
  useEffect(() => {
    setVisible(INITIAL)
  }, [activeCategory])

  const filtered = activeCategory
    ? POSTS.filter((p) => p.category === activeCategory)
    : POSTS
  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  const selectCategory = (category) => {
    if (category) setSearchParams({ category })
    else setSearchParams({})
  }

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
            <>
              {CATEGORIES.length > 1 && (
                <div
                  className="blog-filter"
                  role="group"
                  aria-label="カテゴリで絞り込み"
                >
                  <button
                    type="button"
                    className={`blog-filter-chip${activeCategory ? '' : ' is-active'}`}
                    aria-pressed={!activeCategory}
                    onClick={() => selectCategory(null)}
                  >
                    すべて
                  </button>
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`blog-filter-chip${
                        activeCategory === category ? ' is-active' : ''
                      }`}
                      aria-pressed={activeCategory === category}
                      onClick={() => selectCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {shown.length === 0 ? (
                <p className="concept-text">
                  このカテゴリの記事は準備中です。
                </p>
              ) : (
                <ul className="blog-list">
                  {shown.map((post) => (
                    <li key={post.slug} className="blog-card">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="blog-card-link"
                      >
                        {post.image ? (
                          <div className="blog-card-thumb">
                            <Picture
                              src={`${import.meta.env.BASE_URL}${post.image}`}
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

              {hasMore && (
                <div className="blog-loadmore">
                  <button
                    type="button"
                    className="blog-loadmore-btn"
                    onClick={() => setVisible((v) => v + STEP)}
                  >
                    もっと見る <span aria-hidden="true">＋</span>
                  </button>
                  <p className="blog-loadmore-count">
                    {shown.length} / {filtered.length} 件を表示中
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default Blog
