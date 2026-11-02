import type { APIRoute } from 'astro';
import { SITE_URL } from '../config/seo.mjs';

export const prerender = true;

// 1ページのLP。アンカーや外部予約サイトを別ページとして登録しない。
// 実際の更新日を管理していないため、架空のlastmodは出力しない。
export const GET: APIRoute = () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${new URL('/', SITE_URL).href}</loc></url>\n</urlset>\n`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
