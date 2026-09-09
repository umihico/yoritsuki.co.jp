// 言語別URL（/ = ja, /en/ = en）のための共通ヘルパー。
// 各ページ・コンポーネントは単一言語で描画する。二言語spanのCSS切替は廃止。

export const LOCALES = ['ja', 'en'];
export const DEFAULT_LOCALE = 'ja';

// 現在ロケール。i18nが解決しない文脈（例: 404）ではデフォルトへ倒す。
export function getLocale(Astro) {
  const l = Astro.currentLocale;
  return LOCALES.includes(l) ? l : DEFAULT_LOCALE;
}

// {ja, en} ペアから現在ロケールの値を取り出す（無ければデフォルト）。
export function pick(locale, pair) {
  if (pair == null) return undefined;
  return pair[locale] ?? pair[DEFAULT_LOCALE];
}

// 内部リンクを現在ロケールのURLへ変換する。
// ja: そのまま / en: 先頭に /en を付与（'/' → '/en/'、'/#x' → '/en/#x'）。
export function localizedHref(locale, href) {
  if (locale !== 'en') return href;
  if (href === '/') return '/en/';
  return '/en' + href;
}

// あるページのパスから、両言語の対応パスを導出する（hreflang・言語トグル用）。
// pathname は現在ページの絶対パス（Astro.url.pathname）。
export function alternatePaths(pathname) {
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  const jaPath = isEn ? (pathname.replace(/^\/en(?=\/|$)/, '') || '/') : pathname;
  const enPath = jaPath === '/' ? '/en/' : '/en' + jaPath;
  return { ja: jaPath, en: enPath };
}
