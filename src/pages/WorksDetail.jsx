import { useParams, Link, Navigate } from 'react-router-dom'
import { COMPANY, getWorksCase } from '../constants.js'
import Seo from '../components/Seo.jsx'

const SITE = 'https://lien-2020.com'

function WorksDetail() {
  const { slug } = useParams()
  const work = getWorksCase(slug)

  if (!work) return <Navigate to="/works" replace />

  const url = `${SITE}/works/${work.slug}`
  const imageUrl = work.cover ? `${SITE}/${work.cover}` : ''
  const desc = work.summary
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: '施工実績', item: `${SITE}/works` },
      { '@type': 'ListItem', position: 3, name: work.label, item: url },
    ],
  }

  return (
    <>
      <Seo path={`/works/${work.slug}`} jsonLd={[breadcrumbLd]} />
      <title>{`${work.label}｜施工実績｜株式会社LIEN`}</title>
      <meta name="description" content={desc} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={`${work.label}｜施工実績｜株式会社LIEN`} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="株式会社LIEN" />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
      <meta name="twitter:card" content="summary_large_image" />

      <section className="page-head">
        <div className="section-inner">
          <p className="section-eyebrow">WORKS</p>
          <h1 className="page-title">{work.label}</h1>
        </div>
      </section>

      <nav className="breadcrumb" aria-label="パンくずリスト">
        <div className="section-inner">
          <Link to="/">ホーム</Link>
          <span className="breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <Link to="/works">施工実績</Link>
          <span className="breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">{work.label}</span>
        </div>
      </nav>

      <article className="section">
        <div className="section-inner narrow fade-in-up">
          {work.categoryLabel ? (
            <p className="work-detail-cat">{work.categoryLabel}</p>
          ) : null}

          <p className="concept-text">{work.summary}</p>

          <dl className="work-detail-spec">
            {work.method ? (
              <div className="work-detail-spec-row">
                <dt>工法</dt>
                <dd>{work.method}</dd>
              </div>
            ) : null}
            {work.place ? (
              <div className="work-detail-spec-row">
                <dt>施工箇所</dt>
                <dd>{work.place}</dd>
              </div>
            ) : null}
          </dl>

          {work.points && work.points.length > 0 ? (
            <>
              <h2 className="work-detail-h2">この工事のポイント</h2>
              <ul className="check-list">
                {work.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </>
          ) : null}

          {work.gallery && work.gallery.length > 0 ? (
            <>
              <h2 className="work-detail-h2">施工の流れ（工程写真）</h2>
              <div className="work-gallery">
                {work.gallery.map((g) => (
                  <figure key={g.src} className="work-gallery-item">
                    <img
                      src={`${import.meta.env.BASE_URL}${g.src}`}
                      alt={g.caption}
                      loading="lazy"
                    />
                    {g.caption ? <figcaption>{g.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </>
          ) : null}

          <div className="blog-cta">
            <p className="blog-cta-text">
              「うちの屋上・ベランダも同じように直せる？」「この工事はいくらぐらい？」など、どんなご質問でもお気軽にどうぞ。現地調査・お見積りは無料です。
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
            <Link to="/works" className="text-link">
              ← 施工実績一覧へもどる
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}

export default WorksDetail
