import { SITE_URL } from '../lib/site.js';

export const prerender = true;

export function GET() {
  const urls = [
    { loc: `${SITE_URL}/`, changefreq: 'monthly', priority: '1' },
    { loc: `${SITE_URL}/publicnotice/`, changefreq: 'monthly', priority: '0.5' },
  ];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map(
        (u) =>
          `<url>\n<loc>${u.loc}</loc>\n<changefreq>${u.changefreq}</changefreq>\n<priority>${u.priority}</priority>\n</url>`
      )
      .join('\n') +
    '\n</urlset>\n';
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
