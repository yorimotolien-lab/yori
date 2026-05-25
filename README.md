# 株式会社LIEN コーポレートサイト

千葉県市川市の建設会社「株式会社LIEN」のコーポレートサイトです。
シーリング・塗装・防水・足場・大規模修繕・内装工事・雨漏り診断を手がけています。

## 技術スタック

- React 19 + React Router
- Vite
- GitHub Pages（GitHub Actions で自動デプロイ）

## 開発

```bash
npm install
npm run dev      # 開発サーバー (http://localhost:5173/)
npm run build    # 本番ビルド
npm run lint     # ESLint
```

## デプロイ

`main` ブランチへの push をトリガーに、GitHub Actions（`.github/workflows/deploy.yml`）が
ビルドして GitHub Pages へ公開します。

- 公開URL: https://lien-2020.com/
