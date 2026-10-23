// node tools/test.mjs: every page of every episode draws in both languages, with nothing broken in the SVG
import { renderPage, wrap } from '../js/comic.js';
import EP1 from '../js/ep1.js';
import EP2 from '../js/ep2.js';

let fails = 0;
const ok = (name, cond, info = '') => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${name}${info ? '  ' + info : ''}`); if (!cond) fails++; };
for (const E of [EP1, EP2]) {
  let bad = [], panels = 0, lines = 0, size = 0;
  E.pages.forEach((p, i) => {
    for (const lang of [0, 1]) {
      let r;
      try { r = renderPage({ ...p, num: i || null }, lang, i * 17 + 3); } catch (e) { bad.push(`p${i} ${lang}: ${e.message}`); continue; }
      if (/NaN|undefined|\[object/.test(r.svg)) bad.push(`p${i} ${lang}: ${(r.svg.match(/.{40}(NaN|undefined|\[object).{20}/) || [''])[0]}`);
      panels += r.panels.length; size = Math.max(size, r.svg.length);
    }
    // every line of text exists in both languages
    for (const P of p.panels || [p.art, p.a, p.b].filter(Boolean)) for (const b of [...(P.b || []), ...(P.sfx || [])]) { lines++; if (!Array.isArray(b.t) || b.t.length !== 2 || !b.t[0] || !b.t[1]) bad.push(`p${i}: missing translation ${JSON.stringify(b.t)}`); }
  });
  ok(`${E.id}: ${E.pages.length} pages draw in 中文 and English`, bad.length === 0, bad.slice(0, 3).join(' | ') || `${panels / 2} panels, ${lines} lines, biggest page ${(size / 1024).toFixed(0)} KB`);
}
ok('Chinese wraps by character and keeps punctuation off the line start', wrap('我是……臭襪怪！我要讓全世界都變得臭臭的！', 200, 20).every((l) => !/^[，。！？、…]/.test(l)));
ok('English wraps by word', wrap('Why are pancakes great at baseball? They have the best BATTER!', 220, 20).every((l) => !/^\s|\s$/.test(l)));
console.log(fails ? `${fails} failed` : 'all passed');
process.exit(fails ? 1 : 0);
