// 言語Cookieと現在ページの言語が食い違う場合のみ、対応言語ページへ差し替える。
// 明示的にユーザーが切り替えたCookieがある時だけ発火する（Cookie無し＝初回訪問・
// クローラは絶対にリダイレクトしない → 検索エンジンは両言語に到達可能）。
// <head> 内・ペイント前に実行し、history を汚さない（location.replace）。
// ビルド時に esbuild で最小化されてインライン化される（このファイルはリンタ/整形対象）。
(function () {
  try {
    // 現在ページの言語は <html lang> から読む（サーバ埋め込み不要＝このファイルは静的）
    var cur = document.documentElement.lang === "en" ? "en" : "ja";
    var m = document.cookie.match(/(?:^|; )yoritsuki-lang=(ja|en)/);
    if (!m) return;
    var want = m[1];
    if (want === cur) return;

    var p = location.pathname;
    var to;
    if (want === "en") {
      to = p === "/" ? "/en/" : p.indexOf("/en") === 0 ? p : "/en" + p;
    } else {
      to = p.replace(/^\/en(?=\/|$)/, "") || "/";
    }
    if (to !== p) location.replace(to + location.search + location.hash);
  } catch (e) {}
})();
