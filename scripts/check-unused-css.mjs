// 未使用CSSクラスの検出ガード。1つでも未使用があれば exit 1 でビルドを失敗させる。
// build 後（dist 生成後）に実行する想定: `astro build && node scripts/check-unused-css.mjs`
//
// 「使用中」の判定は次の2ソースの和集合:
//   (1) dist/**/*.html の class="..."（<template> 内の他言語コンテンツも生HTMLに含まれる）
//   (2) src/scripts/*.js の classList.add/toggle/remove("x")（JSが実行時に付与するクラス。
//       reveal-in / reveal-pending / active 等は静的HTMLには出ないためここで拾う）
// これによりハードコードの許可リスト無しで誤検出を防ぐ。
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const CSS_FILE = 'src/styles/globals.css';
const HTML_DIR = 'dist';
const JS_DIR = 'src/scripts';

function walk(dir, test) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p, test));
    else if (test(p)) out.push(p);
  }
  return out;
}

// CSS が定義しているクラス（.foo-bar）。先頭は英字/アンダースコアに限定し .5px 等を除外。
const css = readFileSync(CSS_FILE, 'utf8');
const defined = new Set([...css.matchAll(/\.([A-Za-z_][\w-]*)/g)].map((m) => m[1]));

// (1) HTML の class 属性
const used = new Set();
for (const f of walk(HTML_DIR, (p) => p.endsWith('.html'))) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    for (const c of m[1].split(/\s+/)) if (c) used.add(c);
  }
}

// (2) JS が実行時に付与/操作するクラス
for (const f of walk(JS_DIR, (p) => p.endsWith('.js'))) {
  const js = readFileSync(f, 'utf8');
  for (const m of js.matchAll(/classList\.(?:add|toggle|remove)\(\s*["']([\w-]+)["']/g)) {
    used.add(m[1]);
  }
}

const unused = [...defined].filter((c) => !used.has(c)).sort();

if (unused.length) {
  console.error(`\n✖ 未使用CSSクラスが ${unused.length} 件あります（ビルド失敗）:`);
  for (const c of unused) console.error(`   .${c}`);
  console.error(
    '\n使っていないなら globals.css から削除してください。' +
      'JSで実行時に付与するクラスは src/scripts/*.js の classList.add/toggle/remove で検出されます。\n'
  );
  process.exit(1);
}

console.log(`✓ 未使用CSSなし（定義 ${defined.size} クラスすべて使用中）`);
