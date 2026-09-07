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
  eyebrow: 'FULL-CYCLE SOFTWARE ENGINEERING',
  title: {
    ja: ['企画・開発・運用', '全部、お任せ。'],
    en: ['Think, build, run —', 'leave it all to us.'],
  },
  // 宣言風の3文。1文ずつ改行して表示する
  declarations: [
    {
      ja: '同じ目線で事業課題を理解し、お客様の期待を超える提案を目指します。',
      en: 'We work at eye level — understanding your business problems and aiming for proposals that exceed expectations.',
    },
    {
      ja: '技術選定から開発、リリースまでAIを適切に駆使しスピードと品質を両立します。',
      en: 'From tech selection through development and release, we apply AI where it counts — for both speed and quality.',
    },
    {
      ja: '運用から機能追加まで末永くお付き合いします。',
      en: 'And we stay for the long run — from daily operations to new features.',
    },
  ],
};

export const FOR_YOU = {
  label: { ja: 'こんなときに', en: 'WHEN TO TALK TO US' },
  items: [
    { ja: '新しいWebサービス・アプリを立ち上げたい', en: 'You want to launch a new web service or app' },
    { ja: '社内の業務を整理して、自動化したい', en: 'You want to streamline and automate internal work' },
    { ja: '開発から運用まで、一貫して任せたい', en: 'You want one team from development through operations' },
    { ja: 'インフラの運用負担やコスト、セキュリティを見直したい', en: 'You want to rethink your infrastructure workload, costs, and security' },
  ],
  note: {
    ja: '「まだ要件になっていない」段階のご相談も歓迎です。一緒に言葉にするところから始めます。',
    en: 'It’s fine if it isn’t a "requirement" yet — we start by putting it into words together.',
  },
};

export const CAPABILITIES = [
  {
    glyph: 'web',
    title: { ja: '受託開発', en: 'Custom Software Development' },
    body: {
      ja: 'Webサービス・モバイルアプリ・業務システムの企画から設計・開発、業務の自動化やAI導入、リリース後の保守運用まで一貫してお任せいただけます。',
      en: 'From planning and design of web services, mobile apps, and business systems to automation, AI adoption, and post-release operations — one team, end to end.',
    },
  },
  {
    glyph: 'product',
    title: { ja: 'Webサービスの企画・開発・運営', en: 'Web Services — Planning, Development & Operation' },
    body: {
      ja: '受託開発で培った技術と知見を活かし、サービスの企画・開発にも取り組んでいます。詳細は準備が整い次第、本サイトでお知らせします。',
      en: 'Applying the expertise gained through client work, we also plan, build, and operate services of our own. Details will be announced here once ready.',
    },
  },
  {
    glyph: 'server',
    title: { ja: 'サーバー運用・保守', en: 'Managed Infrastructure Services' },
    body: {
      ja: '当社開発以外のシステムも含め、サーバーの監視・保守・障害対応を代行し、セキュリティ強化やコスト最適化までご提案します。開発元を問わず、現状の構成のままご相談ください。',
      en: 'We take over server monitoring, maintenance, and incident response — including systems we didn’t build — with proposals for security hardening and cost optimization. Bring it as it is, whoever developed it.',
    },
  },
];

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
  body: {
    ja: '現在、既存のお客様およびご関係者様からのご紹介に限り、ご相談を承っております。',
    en: 'At present, we accept new inquiries only through referrals from our existing clients and their associates.',
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
  empty: { ja: '掲載中の公告：0件', en: 'Notices currently posted: 0' },
};

export const COPYRIGHT = COMPANY_COPYRIGHT;
