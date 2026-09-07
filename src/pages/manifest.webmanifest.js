import { COMPANY } from '../lib/company.js';

export const prerender = true;

// PWA/ホーム画面用マニフェスト。アイコンは brand/yoritsuki-logo.svg から生成した2行版。
export function GET() {
  const manifest = {
    name: COMPANY.name.ja,
    short_name: COMPANY.shortName,
    description: COMPANY.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1020',
    theme_color: '#0b1020',
    lang: 'ja',
    icons: [
      { src: '/icon-192.png', type: 'image/png', sizes: '192x192', purpose: 'any' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512', purpose: 'any' },
    ],
  };
  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
}
