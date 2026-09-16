// 会社の「事実」の唯一の正典（Single Source of Truth）。
// 社名・説明文・住所・代表者・法人番号などは必ずここだけで定義する。
// - メタデータ（title/description/OGP/JSON-LD/manifest）は app/layout.jsx・app/manifest.js が参照
// - 会社概要テーブル等の表示は lib/content.js が参照
// 同じ事実を二度書かない。表示用の整形（改行位置・リンク・サブ表記）は参照側で行う。

export const COMPANY = {
  name: { ja: '株式会社ヨリツキ', en: 'Yoritsuki, Inc.' },
  // ブランド略称（PWA short_name / OGP画像のalt など）
  shortName: 'ヨリツキ',
  description:
    '株式会社ヨリツキは、ソフトウェア開発と、アルゴリズム取引の研究・自己勘定運用を行う会社です。',
  descriptionEn:
    'Yoritsuki, Inc. is a company engaged in software development and the research and proprietary trading of algorithmic strategies.',
  founder: { ja: '岩佐 海彦', en: 'Umihiko Iwasa' },
  // date: JSON-LD用のISO表記 / ja・en: 会社概要テーブル用の表示表記（同一事実の別フォーマット）
  founding: { date: '2026-08', ja: '2026年8月', en: 'August 2026' },
  capital: { ja: '5,000,000円', en: '5,000,000 yen' },
  corporateNumber: '3010401201309',
  address: {
    postalCode: '107-0061',
    region: '東京都',
    locality: '港区',
    street: '北青山1-3-1 アールキューブ青山3F',
    en: 'R-Cube Aoyama 3F, 1-3-1 Kita-Aoyama, Minato-ku, Tokyo 107-0061, Japan',
    country: 'JP',
  },
  copyrightYear: '2026',
};

// 和文の完全住所（〒 + 郵便番号 + 都道府県 + 市区 + 番地）はパーツから導出する。
export const ADDRESS_JA = `〒${COMPANY.address.postalCode} ${COMPANY.address.region}${COMPANY.address.locality}${COMPANY.address.street}`;

// 既定タイトル（トップページ）: 「和文社名 | 英文社名」
export const TITLE_DEFAULT = `${COMPANY.name.ja} | ${COMPANY.name.en}`;

// ページ別メタ（言語別URL用）。title/description は各ページが現ロケールで選ぶ。
export const HOME_META = {
  title: { ja: TITLE_DEFAULT, en: `${COMPANY.name.en} | Software Engineering` },
  description: { ja: COMPANY.description, en: COMPANY.descriptionEn },
};
export const NOTICE_META = {
  title: { ja: `公告 | ${COMPANY.name.ja}`, en: `Public Notice | ${COMPANY.name.en}` },
  description: {
    ja: `${COMPANY.name.ja}の電子公告ページです。`,
    en: `Electronic public notices of ${COMPANY.name.en}.`,
  },
};

// 国税庁 法人番号公表サイトの当社ページ
export const CORPORATE_NUMBER_URL = `https://www.houjin-bangou.nta.go.jp/henkorireki-johoto.html?selHouzinNo=${COMPANY.corporateNumber}`;

export const COPYRIGHT = `© ${COMPANY.copyrightYear} ${COMPANY.name.en}`;
