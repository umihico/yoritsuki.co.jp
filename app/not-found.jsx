import T from '../components/T';

// 404。トップと同じ配色・3行構成。数字だけ .notfound-code を新設し、
// 見出しは素のテキスト、リンクは既存の .notice-link を流用（独自スタイルは作らない）。
export default function NotFound() {
  return (
    <main className="notfound">
      <p className="notfound-code mono" aria-hidden="true">404</p>
      <p>
        <T ja="ページが見つかりません" en="Page not found" />
      </p>
      <a href="/" className="notice-link">
        <T ja="← トップに戻る" en="← Back to Home" />
      </a>
    </main>
  );
}
