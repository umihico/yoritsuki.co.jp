// サイト全文のコンテンツ定義。表示はコンポーネント側が担う。
// 社名・住所・代表者などの「事実」は lib/company.js が正典。ここでは表示形へ組み立てるだけ。
import { COMPANY, ADDRESS_JA, CORPORATE_NUMBER_URL, COPYRIGHT as COMPANY_COPYRIGHT } from './company';

export const NAV_ITEMS = [
  { href: '/#capabilities', ja: '事業内容', en: 'Capabilities' },
  { href: '/#company', ja: '会社概要', en: 'Company' },
  { href: '/#contact', ja: 'お問い合わせ', en: 'Contact' },
  { href: '/publicnotice/', ja: '公告', en: 'Public Notice' },
];

export const HERO = {
  // eyebrow（小さいkicker）は各言語で英字のミッション句を置く。
  // ja='ENGINEERING THE EDGE'（=en見出しと同句のブランドタグライン）/ en='RESEARCH. CODE. EXECUTION.'（事業3本柱のプロセス）。
  eyebrow: {
    ja: 'ENGINEERING THE EDGE',
    en: 'RESEARCH. CODE. EXECUTION.',
  },
  // 見出しは lead / grad の2セグメント。着色グラデは日英共通の --grad 1本（言語で区別しない）。
  // ja: 2文目「市場に挑む。」を着色 / en: 核語 "Edge" を着色。どちらも同じ --grad を通す。
  // ja: 英語同様、収まる幅なら1行。折り返す場合のみ lead/grad 間の <wbr>（読点「、」直後）で改行。
  // en: PCは1行、SPのみ折返し（表示側で "Engineering" の後に <wbr>、「the Edge」は .nowrap で一体）。
  title: {
    ja: { lead: '技術力で、', grad: '市場に挑む。' },
    en: { lead: 'Engineering', grad: 'Edge' },
  },
  // ヒーローのリード文は company.js の description を正典として参照（meta と同一定数）
};

export const CAPABILITIES = [
  {
    glyph: 'research',
    title: { ja: 'トレード戦略の研究', en: 'Trading Strategy Research' },
    body: {
      ja: '過去の市場データを研究・分析し、市場に存在するエッジ*を発見します。そのうえで、トレード戦略としての採用可否を判断します。',
      en: 'We research and analyze historical data to discover market edges*, then decide whether to adopt them as trading strategies.',
    },
  },
  {
    glyph: 'build',
    title: { ja: 'トレード戦略・注文執行インフラの開発', en: 'Strategy & Execution Systems' },
    body: {
      ja: '市場に生じるエッジをリアルタイムに検出する監視基盤と、検出したエッジを遅延なく自動で注文執行するアルゴリズム・インフラを開発します。',
      en: 'We develop the monitoring platform that detects market edges in real time, and the algorithms and infrastructure that execute orders on them automatically, without delay.',
    },
  },
  {
    glyph: 'trade',
    title: { ja: '自己勘定による運用', en: 'Proprietary Trading' },
    body: {
      ja: '戦略ごとに自己勘定で運用し、実際の運用結果に基づき戦略の改善と、資金配分を最適化します。',
      en: 'We trade each strategy with our own capital, refining it based on live results and optimizing capital allocation.',
    },
  },
];

// 事業内容カードの下に置く小さな注釈。専門用語「エッジ」の意味を section 内で一度だけ定義する
// （各カードにインラインで（優位性）と繰り返さず、用語のトーンを保ちつつ可読性を確保）。
export const CAPABILITIES_NOTE = {
  ja: '* エッジ（優位性）：市場に潜む価格の歪みや偏りを捉え、それに基づく取引によって利益が見込めること。',
  en: '* Edge: an advantage — by identifying price distortions or biases hidden in the market and trading on them, a profit can be expected.',
};

export const COMPANY_ROWS = [
  {
    label: { ja: '会社名', en: 'Company Name' },
    main: { ja: COMPANY.name.ja, en: COMPANY.name.en },
    // 日本語モードでは和文社名のみ表示（サブなし）。英語モードは英語メイン+和文サブ
    sub: { en: COMPANY.name.ja },
  },
  {
    label: { ja: '設立', en: 'Established' },
    main: { ja: COMPANY.founding.ja, en: COMPANY.founding.en },
  },
  {
    label: { ja: '資本金', en: 'Capital' },
    main: { ja: COMPANY.capital.ja, en: COMPANY.capital.en },
  },
  {
    // 法人番号は国税庁の正式英名 "Corporate Number"（上場企業の英語版会社概要でも同表記）
    label: { ja: '法人番号', en: 'Corporate Number' },
    main: { ja: COMPANY.corporateNumber, en: COMPANY.corporateNumber },
    // 国税庁 法人番号公表サイトの当社ページへ明示リンク（日英とも）
    href: CORPORATE_NUMBER_URL,
  },
  {
    label: { ja: '代表取締役', en: 'Founder & CEO' },
    main: { ja: COMPANY.founder.ja, en: COMPANY.founder.en },
    sub: { ja: COMPANY.founder.en, en: COMPANY.founder.ja },
  },
  {
    label: { ja: '所在地', en: 'Address' },
    main: {
      ja: ADDRESS_JA,
      en: COMPANY.address.en,
    },
    // 日本語モードでは和文住所のみ表示（サブなし）。英語モードは英語メイン+和文サブ
    sub: {
      en: ADDRESS_JA,
    },
    // 和文住所は「東京都」の直前を優先改行位置にする（郵便番号のあとで折り返す）
    breakBefore: '東京都',
    // 日英とも住所テキスト範囲だけをGoogleマップへ明示リンク（OSの自動リンクには任せない）。
    // 英字の下に小さく出る和文サブはリンクなし。
    href: 'https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E5%8C%97%E9%9D%92%E5%B1%B11-3-1%E3%82%A2%E3%83%BC%E3%83%AB%E3%82%AD%E3%83%A5%E3%83%BC%E3%83%96%E9%9D%92%E5%B1%B1',
  },
];

export const CONTACT = {
  // 各要素を <br> で改行して1段落に表示する
  body: {
    ja: ['お問い合わせ窓口は設けておりません。', '何卒ご了承ください。'],
    en: ['We do not offer any means of contact.', 'Thank you for your understanding.'],
  },
  // 本文とのあいだに1行空けて表示する採用に関する補足
  note: {
    ja: 'なお、採用も現在は行っておりません。',
    en: 'We are not currently hiring, either.',
  },
};

// トップページの公告セクション（専用ページへの案内）
export const NOTICE_SECTION = {
  body: {
    ja: '電子公告は、専用ページに掲載しています。',
    en: 'Electronic public notices are posted on a dedicated page.',
  },
  link: { ja: '公告ページはこちら', en: 'View public notices' },
};

export const NOTICE = {
  body: {
    ja: '現在、掲載すべき公告はありません。電子公告を行う場合は、本ページに掲載します。',
    en: 'There are currently no public notices. Electronic public notices, if any, will be posted on this page.',
  },
  empty: { ja: '掲載中の公告 0件', en: 'Notices currently posted: 0' },
};

export const COPYRIGHT = COMPANY_COPYRIGHT;
