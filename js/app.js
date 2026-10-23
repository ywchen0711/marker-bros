// The reader: a shelf of episodes, then page by page (or one panel at a time on a phone), with Flip-O-Rama pages.
import { renderPage, PW, PH } from './comic.js?v=1';
import { draw } from './chars.js?v=1';
import { seed, rect, txt, C } from './art.js?v=1';
import EP1 from './ep1.js?v=1';
import EP2 from './ep2.js?v=1';

const EPS = [EP1, EP2];
const $ = (id) => document.getElementById(id);
const store = { get(k, d) { try { const v = localStorage.getItem('mb.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem('mb.' + k, JSON.stringify(v)); } catch (e) { /* fine */ } } };
let lang = store.get('lang', /^zh/i.test(navigator.language || 'zh') ? 0 : 1);
let mode = store.get('mode', innerWidth < 640 ? 'panel' : 'page');
let ep = 0, pg = 0, pn = 0;
const UI = [
  { shelf: '書架', page: '整頁', panel: '逐格', auto: '自動翻', flip: '翻！', read: '開始看', cont: '繼續看', pages: (n) => `${n} 頁`, blurb: '我們是 Josh 和 Jasper。我們在閣樓找到一盒「超級麥克筆」：畫什麼，就變成真的！然後事情就……失控了。', cast: '登場人物', lang: 'EN' },
  { shelf: 'Shelf', page: 'Page', panel: 'Panels', auto: 'Auto', flip: 'FLIP!', read: 'Read', cont: 'Keep reading', pages: (n) => `${n} pages`, blurb: 'We’re Josh and Jasper. We found a box of MIGHTY MARKERS in the attic: whatever you draw comes true! Then things got... out of hand.', cast: 'The cast', lang: '中文' },
];
const u = () => UI[lang];
const CAST = [
  { c: 'josh', n: 'Josh', d: ['哥哥。最會運動，綠色帽子從來不脫。', 'Big brother. Great at sports. Never takes off the green cap.'] },
  { c: 'jasper', n: 'Jasper', d: ['弟弟。科學天才，相信每個東西都需要雷射。', 'Little brother. Science genius. Thinks everything needs lasers.'] },
  { c: 'jeff', n: ['爸爸 Jeff', 'Dad (Jeff)'], d: ['冷笑話之王。冷到連怪獸都會結冰。', 'King of dad jokes. So bad they can freeze a monster.'] },
  { c: 'erin', n: ['媽媽 Erin', 'Mom (Erin)'], d: ['全家最冷靜的人。畫畫超快。', 'The calmest one in the family. Draws really, really fast.'] },
  { c: 'mochi', n: ['麻糬', 'Mochi'], d: ['柴犬。有一天長出了鬍子，覺得自己很帥。', 'A Shiba puppy. Grew a mustache one day. Thinks he looks great.'] },
  { c: 'coach', n: ['郊狼教練', 'Coach Coyote'], d: ['學校的吉祥物，隨時準備吹哨子。', 'The school mascot. Always ready to blow the whistle.'] },
];
const tr = (x) => (Array.isArray(x) ? x[lang] : x);

// ------------------------------------------------------------------ pages, cached per language
const cache = new Map();
function page(e, p) { const k = `${e}/${p}/${lang}`; if (!cache.has(k)) cache.set(k, renderPage({ ...EPS[e].pages[p], num: p || null }, lang, (e + 1) * 1000 + p * 17 + 3)); return cache.get(k); }
const splittable = (e, p) => { const t = EPS[e].pages[p].type; return !t || t === 'comic'; };

// ------------------------------------------------------------------ the shelf
function castPic(c) { seed(c.length * 7); const d = draw({ c, x: 90, y: 196, s: c === 'mochi' ? 1 : c === 'jeff' || c === 'erin' || c === 'coach' ? 0.6 : 0.7, p: c === 'josh' ? 'wave' : c === 'jasper' ? 'point' : c === 'jeff' ? 'shrug' : 'stand', e: c === 'jasper' ? 'grin' : c === 'jeff' ? 'laugh' : 'happy', stache: c === 'mochi' }); return `<svg viewBox="0 -22 180 222" width="150">${d.svg}</svg>`; }
function shelf() {
  $('reader').hidden = true; $('shelf').hidden = false; document.title = lang ? 'Marker Bros' : '麥克筆兄弟 Marker Bros';
  const last = store.get('last', null);
  const logo = renderPage({ type: 'cover', title: ['麥克筆兄弟', 'MARKER BROS'], sub: ['', ''], badge: ['', ''], by: ['', ''], art: { bg: 'color', bgo: { color: '#ffd93d' } } }, lang, 7).svg;
  $('shelf').innerHTML = `<div class="logo">${logo.replace('viewBox="0 0 800 1130"', 'viewBox="40 40 720 230"')}</div>
    <p class="blurb">${u().blurb}</p>
    <div class="shelf-bar">${last ? `<button class="btn" id="cont">📖 ${u().cont}</button>` : ''}<button class="btn" id="sLang">${u().lang}</button></div>
    <div class="books">${EPS.map((E, i) => `<button class="book" data-ep="${i}"><div class="cv">${page(i, 0).svg}</div><b>${tr(E.title)}</b><small>${u().pages(E.pages.length)}</small></button>`).join('')}</div>
    <section class="cast"><h2>${u().cast}</h2><div class="cast-grid">${CAST.map((c) => `<div class="who">${castPic(c.c)}<b>${tr(c.n)}</b><span>${tr(c.d)}</span></div>`).join('')}</div></section>`;
  $('shelf').querySelectorAll('[data-ep]').forEach((b) => b.onclick = () => open(+b.dataset.ep, 0));
  if ($('cont')) $('cont').onclick = () => open(last.ep, last.pg);
  $('sLang').onclick = () => { lang = 1 - lang; store.set('lang', lang); shelf(); };
  history.replaceState(null, '', location.pathname);
}

// ------------------------------------------------------------------ reading
function open(e, p, n = 0) { ep = Math.min(e, EPS.length - 1); pg = Math.min(p, EPS[ep].pages.length - 1); pn = n; $('shelf').hidden = true; $('reader').hidden = false; show(); }
let flipT = null;
function show() {
  const E = EPS[ep], P = page(ep, pg), t = u();
  $('epTitle').textContent = tr(E.title); $('mode').textContent = mode === 'page' ? '🔍 ' + t.panel : '📄 ' + t.page; $('lang').textContent = t.lang;
  document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = t[el.dataset.t]; });
  $('slider').max = E.pages.length - 1; $('slider').value = pg; $('count').textContent = `${pg + 1} / ${E.pages.length}`;
  let svg;
  if (mode === 'panel' && splittable(ep, pg) && P.panels.length) {
    pn = Math.max(0, Math.min(pn, P.panels.length - 1));
    const q = P.panels[pn];
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 ${(q.w + 12).toFixed(1)} ${(q.h + 12).toFixed(1)}" class="panelv">${q.svg}<rect x="-2" y="-2" width="${(q.w + 4).toFixed(1)}" height="${(q.h + 4).toFixed(1)}" fill="none" stroke="#1b1612" stroke-width="6" rx="4"/></svg>`;
    $('count').textContent = `${pg + 1} / ${E.pages.length} · ${pn + 1}/${P.panels.length}`;
  } else svg = P.svg;
  $('view').innerHTML = svg;
  // fit the page: as tall as the screen allows, never wider than it
  const sv = $('view').querySelector('svg'), vb = sv.viewBox.baseVal, ar = vb.width / vb.height;
  sv.style.width = `min(100%, calc((100dvh - var(--chrome)) * ${ar.toFixed(4)}))`; sv.style.height = 'auto';
  const flip = $('view').querySelector('.flip');
  $('flipCtl').hidden = !flip; $('flipBtn').textContent = t.flip;
  clearInterval(flipT); if (flip && $('autoFlip').checked) flipT = setInterval(() => flip.classList.toggle('b'), 260);
  store.set('last', { ep, pg });
  history.replaceState(null, '', `#ep${ep + 1}/${pg + 1}`);
  // draw the next page ahead of time
  setTimeout(() => { if (pg + 1 < E.pages.length) page(ep, pg + 1); }, 50);
}
function step(d) {
  const E = EPS[ep], P = page(ep, pg);
  if (mode === 'panel' && splittable(ep, pg)) { const n = pn + d; if (n >= 0 && n < P.panels.length) { pn = n; show(); return; } }
  const np = pg + d;
  if (np < 0) return;
  if (np >= E.pages.length) { if (ep + 1 < EPS.length) open(ep + 1, 0); else shelf(); return; }
  pg = np; pn = d < 0 && mode === 'panel' && splittable(ep, pg) ? page(ep, pg).panels.length - 1 : 0; show();
}
$('prev').onclick = $('bPrev').onclick = () => step(-1);
$('next').onclick = $('bNext').onclick = () => step(1);
$('home').onclick = () => { clearInterval(flipT); shelf(); };
$('slider').oninput = () => { pg = +$('slider').value; pn = 0; show(); };
$('mode').onclick = () => { mode = mode === 'page' ? 'panel' : 'page'; store.set('mode', mode); pn = 0; show(); };
$('lang').onclick = () => { lang = 1 - lang; store.set('lang', lang); show(); };
// Flip-O-Rama: hold the button (or tap the picture) to flip between the two drawings
const flipOnce = () => { const f = $('view').querySelector('.flip'); if (f) f.classList.toggle('b'); };
let holdT = null;
$('flipBtn').onpointerdown = (e) => { e.preventDefault(); flipOnce(); clearInterval(holdT); holdT = setInterval(flipOnce, 170); };
['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => $('flipBtn').addEventListener(ev, () => clearInterval(holdT)));
$('autoFlip').onchange = () => show();
$('view').onclick = () => flipOnce();
document.addEventListener('keydown', (e) => {
  if ($('reader').hidden) return;
  if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); step(1); }
  else if (e.key === 'ArrowLeft' || e.key === 'PageUp') step(-1);
  else if (e.key === 'Escape') shelf();
  else if (e.key.toLowerCase() === 'f') flipOnce();
});
let sx = null;
$('stage').addEventListener('pointerdown', (e) => { sx = e.clientX; });
$('stage').addEventListener('pointerup', (e) => { if (sx !== null && Math.abs(e.clientX - sx) > 60) step(e.clientX < sx ? 1 : -1); sx = null; });

const m = location.hash.match(/^#ep(\d+)\/(\d+)/);
if (m) open(+m[1] - 1, +m[2] - 1); else shelf();
window.MB = { EPS, renderPage, open, page, set lang(v) { lang = v; }, get mode() { return mode; } };
