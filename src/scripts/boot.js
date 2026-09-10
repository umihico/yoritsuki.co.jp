// テーマをペイント前に復元する（FOUC回避）。言語はURLで確定するため復元しない。
// ビルド時に esbuild で最小化されてインライン化される。
(function () {
  try {
    var theme = localStorage.getItem("yoritsuki-theme");
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
