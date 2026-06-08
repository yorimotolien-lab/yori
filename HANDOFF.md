# 引き継ぎドキュメント — 株式会社LIEN コーポレートサイト

このファイル1つで、別の Claude Code アカウントの方が本サイトの運用を引き継げるようにまとめています。

---

## 1. プロジェクト概要

| 項目 | 内容 |
|---|---|
| サイト | 株式会社LIEN コーポレートサイト |
| 公開URL | https://lien-2020.com/ |
| GitHubリポジトリ | https://github.com/yorimotolien-lab/yori |
| GitHubアカウント | `yorimotolien-lab`（引き継ぎ後も同じものを使用） |
| 技術スタック | Vite + React 19 + React Router |
| ホスティング | GitHub Pages（GitHub Actions で自動デプロイ） |
| 独自ドメイン | `lien-2020.com`（`public/CNAME` 設定済み） |

---

## 2. 引き継ぎ手順（新しい Claude Code アカウントで）

同じパソコン・同じ GitHub アカウントのまま、Claude Code だけ別アカウントで運用する場合の手順です。

1. https://claude.ai/code を開き、**新しい Claude Code アカウントでサインイン**
2. 「Connect GitHub」で `yorimotolien-lab` の GitHub アカウントを認可（同じアカウントでログイン）
3. リポジトリ `yorimotolien-lab/yori` を選択し、新しいセッションを開始
4. このファイル（`HANDOFF.md`）を読んでもらい、依頼内容を伝える

> セッションの中で「`HANDOFF.md` を見て」「`src/constants.js` の `COMPANY.email` を変更して」のように具体的に指示するとスムーズです。

---

## 3. デプロイ・公開の流れ

- 開発ブランチで変更 → PR 作成 → main にマージ
- main への push をトリガに `.github/workflows/deploy.yml` が走り、GitHub Pages へ自動公開
- 反映には 1〜3 分程度。直後はキャッシュで古く見えることがあるのでスーパーリロード（Win: Ctrl+Shift+R / Mac: Cmd+Shift+R）

---

## 4. よくある変更と該当ファイル

ほぼすべてのテキスト・コンテンツは `src/constants.js` に集約しています。

| 変更したい内容 | 編集ファイル | 該当エクスポート |
|---|---|---|
| 会社名・所在地・電話・代表者・建設業許可・対応エリア | `src/constants.js` | `COMPANY` |
| 問い合わせ転送先メール（複数可・カンマ区切り） | `src/constants.js` | `COMPANY.email` |
| 有資格者バッジ | `src/constants.js` | `COMPANY.qualifications` |
| 有資格者の詳細カード | `src/constants.js` | `QUALIFICATION_DETAILS` |
| 有資格者のメリット | `src/constants.js` | `QUALIFICATION_MERITS` |
| 事業内容（追加・編集・詳細文） | `src/constants.js` | `SERVICES` |
| 選ばれる理由（ホーム） | `src/constants.js` | `REASONS` |
| お客様別（元請・オーナー・管理会社） | `src/constants.js` | `AUDIENCES` |
| 流れ（ご依頼〜お引き渡し） | `src/constants.js` | `FLOW_STEPS` |
| FAQ | `src/constants.js` | `FAQS` |
| 協力会社募集 | `src/constants.js` | `PARTNER` |
| 施工事例（仮枠タイトル） | `src/constants.js` | `WORKS_PLACEHOLDER` |
| ナビ項目 | `src/constants.js` | `NAV_ITEMS` |
| トップヒーローのキャッチコピー | `src/pages/Home.jsx` | `hero-title`, `hero-desc` 周辺 |
| 各ページのSEOタイトル/説明 | 各 `src/pages/*.jsx` | `<title>` `<meta description>` |
| ロゴ画像 | `public/logo.png` | （画像差し替え。同じファイル名で上書き） |
| 色テーマ（ネイビー・オレンジ・余白色） | `src/index.css` | `:root` の CSS 変数 |

---

## 5. 重要な URL 一覧

| 用途 | URL |
|---|---|
| 公開サイト | https://lien-2020.com/ |
| リポジトリ | https://github.com/yorimotolien-lab/yori |
| PR 一覧（履歴） | https://github.com/yorimotolien-lab/yori/pulls?q=is%3Apr |
| GitHub Actions | https://github.com/yorimotolien-lab/yori/actions |
| GitHub Pages 設定 | https://github.com/yorimotolien-lab/yori/settings/pages |
| Google Search Console | https://search.google.com/search-console |
| Bing Webmaster Tools | https://www.bing.com/webmasters |

---

## 6. 独自ドメイン / DNS 設定

- 公開URL: `https://lien-2020.com/`
- ドメイン会社の管理画面で以下が設定済み（変更しないでください）

**Aレコード（apex `@`、4件）**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**AAAAレコード（推奨・apex `@`）**
```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

**CNAME（推奨・www → apex）**
- ホスト: `www`、値: `yorimotolien-lab.github.io`

- GitHub Pages の `Custom domain` に `lien-2020.com` を設定済み・`Enforce HTTPS` 有効化済み
- リポジトリ側にも `public/CNAME` を配置済み（毎回のデプロイで自動保持）

---

## 7. SEO / 検索エンジン

実装済み（コード側）:
- `public/robots.txt`、`public/sitemap.xml`
- 各ページの `<title>` と `<meta description>`
- OGP / Twitter Card（SNS シェア対応）
- 構造化データ（JSON-LD `GeneralContractor`）

検索結果に出すための登録（**運用側で必要**）:
- **Google Search Console** に `lien-2020.com` を登録 → `sitemap.xml` 送信（Yahoo Japan もカバー）
- **Bing Webmaster Tools** に `https://lien-2020.com/` を登録 → `sitemap.xml` 送信（Microsoft Edge / Bing 全般）
- **Google ビジネスプロフィール**（地域検索／マップ表示のため、可能なら登録推奨）

---

## 8. 問い合わせフォーム

- 方式: **mailto**（送信ボタンでユーザーのメールソフトが起動）
- 転送先: `src/constants.js` の `COMPANY.email`（カンマ区切りで複数指定可）
- 現在の設定: `s.akimoto@lien-2020.com, r.yorimoto@lien-2020.com`

---

## 9. ローカル開発（任意）

```bash
npm install
npm run dev      # 開発サーバー http://localhost:5173/
npm run build    # 本番ビルド（dist/ に出力）
npm run lint     # ESLint
```

---

## 10. プレビュー環境（Vercel）

PR ごとに Vercel が自動で **プレビュー URL** を生成します（PR コメントに掲載されます）。マージ前に実機で見た目を確認できます。本番公開は GitHub Pages 側（`lien-2020.com`）です。

---

## 11. 既知の未対応・今後の推奨

- **施工事例の写真**: 現在は「準備中」のプレースホルダ。実写真（Before/After）を `public/` 等に追加し、`src/pages/Home.jsx` の works セクション、または専用ページを作成すると信頼感・問い合わせが大幅に向上します
- **お客様の声**: 未掲載（運用後に追加検討）
- **LINE 公式アカウント連携**: 未対応（LINE URL があれば CTA に追加可能）
- **Google ビジネスプロフィール登録**: 未登録（地域検索強化）

---

## 12. 連絡・参照先

- GitHub アカウント: `yorimotolien-lab`
- 公開URL: https://lien-2020.com/
- 過去の依頼・変更履歴は GitHub の PR 履歴で追跡可能（リンクは「重要な URL 一覧」参照）
