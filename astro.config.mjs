// @ts-check
import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/lib/site.js';

// 静的書き出し。build.format:'directory' で /publicnotice/ が publicnotice/index.html になる。
// trailingSlash は既定の 'ignore'（末尾スラッシュ有無どちらも許容）にして、dev/preview で
// 未定義URLに対しカスタム 404.html がフォールバック表示されるようにする
// （'always' だと preview がルーティング厳格化のヒント404を返し、カスタム404が出ない）。
// GitHub Pages は未解決パスに対し常にサイト直下の 404.html を返すため、本番の挙動は変わらない。
// build.inlineStylesheets:'always' でCSSをHTMLの<style>へインライン化（Next の experimental.inlineCss 相当）。
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
});
