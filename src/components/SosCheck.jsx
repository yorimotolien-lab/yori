import { Link } from 'react-router-dom'
import { SOS_CHECK } from '../constants.js'

// 「お家のSOSサイン診断」。タップすると✓の色がフワッと変わる（CSSチェックボックスハック・JS不要）。
function SosCheck() {
  return (
    <section className="section sos-check">
      <div className="section-inner narrow">
        <p className="section-eyebrow">CHECK</p>
        <h2 className="section-title">{SOS_CHECK.title}</h2>
        <p className="concept-text">{SOS_CHECK.lead}</p>

        <ul className="sos-list">
          {SOS_CHECK.items.map((item) => (
            <li key={item.text}>
              <label className="sos-item">
                <input type="checkbox" />
                <span className="sos-photo" aria-hidden="true">
                  <img
                    src={`${import.meta.env.BASE_URL}${item.image}`}
                    alt={item.text}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.parentElement.style.display = 'none'
                    }}
                  />
                </span>
                <span className="sos-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <span className="sos-text">{item.text}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="sos-result">
          <p className="sos-result-text">{SOS_CHECK.result}</p>
          <Link to="/contact" className="btn btn-primary">
            無料で診断を申し込む
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SosCheck
