import { SITE_URL } from '../lib/site.js';

export const prerender = true;

// 言語ペア単位でページを定義。各URLに xhtml:link で hreflang 代替を明示する
// （Google 推奨の多言語サイトマップ形式。ページ内 hreflang と二重に補強する）。
const PAGES = [
  { ja: '/', en: '/en/', changefreq: 'monthly', priority: '1' },
  { ja: '/publicnotice/', en: '/en/publicnotice/', changefreq: 'monthly', priority: '0.5' },
];

export function GET() {
  const abs = (p) => `${SITE_URL}${p}`;

  const urlEntries = PAGES.flatMap((page) => {
    const alternates = [
      `<xhtml:link rel="alternate" hreflang="ja" href="${abs(page.ja)}"/>`,
      `<xhtml:link rel="alternate" hreflang="en" href="${abs(page.en)}"/>`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(page.ja)}"/>`,
    ].join('\n');
    // ja版・en版の両エントリに同じ代替セットを付ける
    return [page.ja, page.en].map(
      (loc) =>
        `<url>\n<loc>${abs(loc)}</loc>\n${alternates}\n<changefreq>${page.changefreq}</changefreq>\n<priority>${page.priority}</priority>\n</url>`
    );
  });

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urlEntries.join('\n') +
    '\n</urlset>\n';

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
