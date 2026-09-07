// サイト全体の基準URL。og:image / canonical / sitemap / robots / JSON-LD が参照する。
// 優先順位: PUBLIC_SITE_URL > (devサーバー時: localhost:4321) > 本番ドメイン
// ローカル検証ビルドは `npm run build:local`（localhost:8642）を使う。
// デフォルトを本番ドメインに倒してあるため、デプロイ時に環境変数を忘れても事故らない。
const fallback = import.meta.env.DEV
  ? 'http://localhost:4321'
  : 'https://yoritsuki.co.jp';

export const SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? fallback;
