// 親しみのあるフラットイラスト（同一オリジンのインラインSVG・CSP適合・依存なし）。
// 配色は既存ブランド色（ネイビー/オレンジ）をやわらげたトーンで統一。

// 相談スタッフ（お問い合わせページ用）
export function ConsultIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 180"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="120" cy="92" r="80" fill="#fdeede" />
      <path
        d="M150 78 l-10 18 24 -13 z"
        fill="#ffffff"
        stroke="#ef9a4f"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect
        x="142"
        y="34"
        width="76"
        height="50"
        rx="15"
        fill="#ffffff"
        stroke="#ef9a4f"
        strokeWidth="3"
      />
      <circle cx="168" cy="59" r="3.4" fill="#93a7bd" />
      <circle cx="180" cy="59" r="3.4" fill="#93a7bd" />
      <circle cx="192" cy="59" r="3.4" fill="#93a7bd" />
      <path d="M80 158 q0-36 40-36 q40 0 40 36 z" fill="#3a5780" />
      <rect x="111" y="110" width="18" height="18" rx="7" fill="#f4c39a" />
      <circle cx="120" cy="96" r="23" fill="#f4c39a" />
      <path
        d="M97 95 a23 23 0 0 1 46 0 q-7-12-23-12 q-16 0-23 12 z"
        fill="#5b4636"
      />
      <path
        d="M96 96 a24 24 0 0 1 48 0"
        fill="none"
        stroke="#2d3a4f"
        strokeWidth="4.5"
      />
      <rect x="92" y="94" width="8" height="14" rx="4" fill="#2d3a4f" />
      <rect x="140" y="94" width="8" height="14" rx="4" fill="#2d3a4f" />
      <path
        d="M141 104 q7 5 4 14"
        fill="none"
        stroke="#2d3a4f"
        strokeWidth="3.2"
      />
      <circle cx="134" cy="120" r="3" fill="#ef9a4f" />
      <circle cx="113" cy="98" r="2.3" fill="#3a2e25" />
      <circle cx="127" cy="98" r="2.3" fill="#3a2e25" />
      <path
        d="M114 106 q6 5 12 0"
        fill="none"
        stroke="#3a2e25"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// 施工事例「準備中」用のカメラ
export function WorksComingSoon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="200" height="150" rx="12" fill="#f6efe6" />
      <path d="M70 54 l5 -10 26 0 5 10 z" fill="#3a5780" />
      <rect x="48" y="54" width="104" height="64" rx="12" fill="#3a5780" />
      <circle cx="100" cy="86" r="22" fill="#fdf3e7" />
      <circle cx="100" cy="86" r="13" fill="#ef9a4f" />
      <circle cx="100" cy="86" r="6" fill="#fdf3e7" />
      <circle cx="134" cy="66" r="4" fill="#ffd58a" />
      <path
        d="M150 40 l2.4 7 7 2.4 -7 2.4 -2.4 7 -2.4 -7 -7 -2.4 7 -2.4 z"
        fill="#ffd58a"
      />
    </svg>
  )
}
