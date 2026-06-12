// 事業内容／劣化対策ページ用のインラインSVGアイコン（同一オリジン・依存なし・CSP安全）。
// 既存の REASON_ICONS（src/pages/Home.jsx）と同じ「塗りつぶしパス」スタイルで統一する。
// <svg viewBox="0 0 24 24"> の子要素として描画され、塗り色は CSS（.service-icon svg）で指定。
export const ICONS = {
  // 水滴 — 防水 / 防水塗膜
  drop: (
    <path d="M12 2.6c-2.6 3.6-6 8-6 11.3a6 6 0 0 0 12 0c0-3.3-3.4-7.7-6-11.3z" />
  ),

  // ペイントローラー — 塗装 / 外壁塗膜
  roller: (
    <>
      <rect x="2" y="3.5" width="15" height="6" rx="2.5" />
      <path d="M8.5 21v-6.5A1.5 1.5 0 0 1 10 13h6a1 1 0 0 0 1-1V9.5h2V12a3 3 0 0 1-3 3h-5.5v6z" />
    </>
  ),

  // コーキングガン — シーリング
  caulk: (
    <>
      <rect x="3" y="9.5" width="12" height="6" rx="1.5" />
      <path d="M15 11l6-1.8v5.6L15 14z" />
      <rect x="1" y="11.3" width="2" height="2.4" rx="0.6" />
      <rect x="5.5" y="15.5" width="2.4" height="3.2" rx="0.8" />
    </>
  ),

  // 足場（フレーム） — 足場工事
  scaffold: (
    <>
      <rect x="4" y="4" width="1.7" height="16" />
      <rect x="11.15" y="4" width="1.7" height="16" />
      <rect x="18.3" y="4" width="1.7" height="16" />
      <rect x="4" y="4" width="16" height="1.7" />
      <rect x="4" y="11.15" width="16" height="1.7" />
      <rect x="4" y="18.3" width="16" height="1.7" />
    </>
  ),

  // ビル — 大規模修繕
  building: <path d="M3 21V10h5V6h6v4h5v11z" />,

  // ソファ — 内装
  sofa: (
    <>
      <rect x="4" y="7" width="16" height="5.5" rx="2" />
      <rect x="3" y="11" width="18" height="5" rx="1.5" />
      <rect x="3" y="9.5" width="3" height="5.5" rx="1.3" />
      <rect x="18" y="9.5" width="3" height="5.5" rx="1.3" />
      <rect x="4.5" y="16" width="1.8" height="2.6" />
      <rect x="17.7" y="16" width="1.8" height="2.6" />
    </>
  ),

  // 虫眼鏡（診断） — 雨漏り診断
  search: (
    <path d="M10.5 3a7.5 7.5 0 0 1 5.96 12.05l4.24 4.24-1.41 1.41-4.24-4.24A7.5 7.5 0 1 1 10.5 3zm0 2.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
  ),
}
