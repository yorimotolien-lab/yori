# プロジェクトコンテキスト — 株式会社LIEN コーポレートサイト

このファイルは Claude Code がセッション開始時に自動で読み込みます。依頼を受けたら、まずここの情報を前提として動いてください。

## このプロジェクトは何
- 千葉県市川市の建設会社「株式会社LIEN」のコーポレートサイト
- 公開URL: https://lien-2020.com/
- 技術: Vite + React 19 + React Router、GitHub Pages へ GitHub Actions で自動デプロイ
- 詳細・運用手順は `HANDOFF.md` を参照

## ほぼ全てのテキストはここ
`src/constants.js` に `COMPANY` / `SERVICES` / `FAQS` / `REASONS` / `AUDIENCES` / `FLOW_STEPS` / `PARTNER` / `NAV_ITEMS` / `QUALIFICATION_*` などサイト全体の文言・データを集約。**まずは該当エクスポートを編集**するのが基本。

## 編集場所早見表

| 変更内容 | ファイル / エクスポート |
|---|---|
| 会社情報・電話・メール・建設業許可・対応エリア・有資格者バッジ | `src/constants.js` → `COMPANY` |
| 有資格者の詳細カード | `QUALIFICATION_DETAILS` |
| 有資格者のメリット | `QUALIFICATION_MERITS` |
| 事業内容（一覧・詳細） | `SERVICES` |
| 選ばれる理由（ホーム） | `REASONS` |
| お客様別（元請/オーナー/管理会社） | `AUDIENCES` |
| 流れ（ホーム） | `FLOW_STEPS` |
| FAQ | `FAQS` |
| 協力会社募集 | `PARTNER` |
| 施工事例の仮枠 | `WORKS_PLACEHOLDER` |
| ナビ項目 | `NAV_ITEMS` |
| ヒーローのキャッチコピー | `src/pages/Home.jsx` |
| ロゴ画像 | `public/logo.png` を同じファイル名で上書き |
| 色テーマ（ネイビー・オレンジ・余白色） | `src/index.css` の `:root` の CSS 変数 |
| 各ページのSEOタイトル/説明 | 各 `src/pages/*.jsx` の `<title>` `<meta>` |

## 開発・デプロイの流れ
1. `main` から作業ブランチを切る（命名: `claude/<short-desc>`）
2. 編集後、`npm run lint && npm run build` で確認
3. ドラフト PR を作成し、ユーザーにマージ可否を確認
4. main にマージ → GitHub Actions が自動デプロイ（数分）
5. ユーザーにはスーパーリロード（Ctrl/Cmd+Shift+R）を案内

## 公開URL・ドメイン
- 公開: https://lien-2020.com/（GitHub Pages + 独自ドメイン）
- `public/CNAME`（`lien-2020.com`）と `vite.config.js` の `base: '/'` は変更しない
- DNS は別途設定済み（A／AAAA／CNAME）

## 問い合わせ転送先
`COMPANY.email`（カンマ区切りで複数可）。現在: `info@lien-2020.com`

## 注意・未対応
- 施工事例は「準備中」の仮枠。実写真が用意でき次第、`public/` に画像を追加し `WORKS_PLACEHOLDER` 関連を画像対応に
- お客様の声・LINE 公式アカウント連携は未実装
- Google Search Console / Bing Webmaster Tools への登録はユーザー側で実施
