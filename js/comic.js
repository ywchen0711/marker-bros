// Turning a page description into a comic page: panels with wobbly borders, backgrounds, the cast, word balloons,
// captions and sound effects. Every piece of text is [中文, English].
import { C, INK, seed, rand, shape, circ, oval, rect, poly, line, tube, g, star, marks, ell, rectPts, txt, esc } from './art.js?v=1';
import { draw, prop, mochiParts } from './chars.js?v=1';
export { prop };

export const PW = 800, PH = 1130, M = 30, GUT = 20;
let LANG = 0;
const T = (t) => (Array.isArray(t) ? t[LANG] ?? t[0] : t ?? '');
const isCJK = (ch) => /[⺀-鿿＀-￯　-〿]/.test(ch);
const widthOf = (s, fs) => [...s].reduce((a, ch) => a + (isCJK(ch) ? fs : ch === ' ' ? fs * 0.28 : fs * (/[A-Z!?]/.test(ch) ? 0.56 : 0.47)), 0);
export function wrap(text, maxW, fs) {
  const out = [];
  for (const para of String(text).split('\n')) {
    if ([...para].some(isCJK)) {
      let cur = '';
      for (const ch of para) {
        if (widthOf(cur + ch, fs) > maxW && cur && !/[，。！？、…」）!?,.~～]/.test(ch)) { out.push(cur); cur = ''; }
        cur += ch;
      }
      out.push(cur);
    } else {
      let cur = '';
      for (const w of para.split(' ')) { const nx = cur ? cur + ' ' + w : w; if (widthOf(nx, fs) > maxW && cur) { out.push(cur); cur = w; } else cur = nx; }
      out.push(cur);
    }
  }
  return out;
}

// ------------------------------------------------------------------ backgrounds (W × H panel)
const house = (x, y, s, c) => g(rect(-60, -90, 120, 90, c, { r: 3 }) + poly([[-74, -88], [0, -150], [74, -88]], C.red) + rect(-16, -50, 32, 50, C.brown, { r: 3 }) + rect(-48, -74, 26, 24, C.lblue, { r: 2 }) + rect(22, -74, 26, 24, C.lblue, { r: 2 }), x, y, s);
const tree = (x, y, s) => g(rect(-12, -90, 24, 90, C.brown, { r: 4 }) + circ(0, -130, 56, C.green) + circ(-36, -104, 36, C.green) + circ(36, -100, 36, C.green), x, y, s);
const cloud = (x, y, s) => g(circ(-30, 0, 24, '#ffffff', { w: 3.5 }) + circ(0, -12, 30, '#ffffff', { w: 3.5 }) + circ(30, 0, 24, '#ffffff', { w: 3.5 }) + rect(-46, -6, 92, 26, '#ffffff', { w: 0, r: 12 }), x, y, s);
const sun = (x, y) => circ(x, y, 34, C.yellow) + Array.from({ length: 8 }, (_, i) => line([[x + Math.cos(i * 0.785) * 44, y + Math.sin(i * 0.785) * 44], [x + Math.cos(i * 0.785) * 60, y + Math.sin(i * 0.785) * 60]], { w: 4 })).join('');
const windowPane = (x, y, w, h, sky = C.sky) => rect(x, y, w, h, sky, { r: 3 }) + line([[x + w / 2, y], [x + w / 2, y + h]], { w: 4 }) + line([[x, y + h / 2], [x + w, y + h / 2]], { w: 4 });
export function bg(type, W, H, o = {}) {
  const floorY = H * 0.8;
  switch (type) {
    case 'kitchen': return rect(-5, -5, W + 10, H + 10, '#fff1b8', { w: 0 }) + windowPane(W * 0.12, H * 0.12, W * 0.22, H * 0.3) + rect(W * 0.7, H * 0.08, W * 0.2, floorY - H * 0.08, '#f2f6fa', { r: 6 }) + line([[W * 0.7, H * 0.38], [W * 0.9, H * 0.38]], { w: 4 }) + rect(-5, floorY, W + 10, H, '#c9e3a6', { w: 0 }) + line([[-5, floorY], [W + 5, floorY]], { w: 4 }) + rect(W * 0.38, H * 0.48, W * 0.28, floorY - H * 0.48, '#c98a52', { r: 3 });
    case 'room': return rect(-5, -5, W + 10, H + 10, '#cfe8ff', { w: 0 }) + windowPane(W * 0.62, H * 0.1, W * 0.2, H * 0.28) + rect(W * 0.1, H * 0.12, W * 0.16, H * 0.24, '#ffffff', { r: 2 }) + star(W * 0.18, H * 0.24, H * 0.07, C.yellow) + rect(-5, floorY, W + 10, H, C.floor, { w: 0 }) + line([[-5, floorY], [W + 5, floorY]], { w: 4 }) + (o.bed === false ? '' : rect(W * 0.04, floorY - H * 0.16, W * 0.3, H * 0.16, C.blue, { r: 8 }) + rect(W * 0.04, floorY - H * 0.22, W * 0.08, H * 0.1, '#ffffff', { r: 6 }));
    case 'attic': return rect(-5, -5, W + 10, H + 10, '#c49a6c', { w: 0 }) + poly([[-5, H * 0.35], [W / 2, -5], [W + 5, H * 0.35]], '#a87a4c', { w: 4 }) + line([[W * 0.2, -5], [W * 0.2, floorY]], { w: 4 }) + line([[W * 0.8, -5], [W * 0.8, floorY]], { w: 4 }) + circ(W / 2, H * 0.18, 20, '#ffe68a', { w: 3 }) + rect(-5, floorY, W + 10, H, '#8a5a33', { w: 0 }) + line([[-5, floorY], [W + 5, floorY]], { w: 4 }) + prop('box', W * 0.12, floorY + 6, 0.7) + prop('box', W * 0.88, floorY + 6, 0.8);
    case 'yard': return rect(-5, -5, W + 10, H + 10, C.sky, { w: 0 }) + sun(W * 0.86, H * 0.16) + cloud(W * 0.3, H * 0.18, 0.8) + house(W * 0.72, H * 0.78, Math.min(1, H / 330)) + tree(W * 0.12, H * 0.8, Math.min(1, H / 320)) + rect(-5, H * 0.78, W + 10, H, C.grass, { w: 0 }) + line([[-5, H * 0.78], [W + 5, H * 0.78]], { w: 4 });
    case 'street': return rect(-5, -5, W + 10, H + 10, C.sky, { w: 0 }) + cloud(W * 0.7, H * 0.16, 0.7) + house(W * 0.18, H * 0.7, 0.8, '#ffe0a8') + house(W * 0.5, H * 0.7, 0.8, '#c8e8c0') + house(W * 0.82, H * 0.7, 0.8, '#ffc8d8') + rect(-5, H * 0.7, W + 10, H, '#9a9aa2', { w: 0 }) + line([[-5, H * 0.7], [W + 5, H * 0.7]], { w: 4 }) + Array.from({ length: 6 }, (_, i) => rect(i * W / 5.5, H * 0.86, W / 12, 8, '#ffffff', { w: 0, r: 2 })).join('');
    case 'school': return rect(-5, -5, W + 10, H + 10, C.sky, { w: 0 }) + rect(W * 0.18, H * 0.2, W * 0.64, H * 0.56, '#e8705a', { r: 4 }) + poly([[W * 0.14, H * 0.22], [W * 0.5, H * 0.04], [W * 0.86, H * 0.22]], '#b8483a') + rect(W * 0.44, H * 0.5, W * 0.12, H * 0.26, C.brown, { r: 3 }) + [0.24, 0.62].map((x) => windowPane(W * x, H * 0.3, W * 0.14, H * 0.14)).join('') + txt(o.sign || 'SAGE CANYON', W * 0.5, H * 0.18, { size: Math.min(26, W / 22), cls: 'sfx', fill: '#ffffff', stroke: INK, sw: 4 }) + rect(-5, H * 0.76, W + 10, H, C.grass, { w: 0 }) + line([[-5, H * 0.76], [W + 5, H * 0.76]], { w: 4 });
    case 'field': return rect(-5, -5, W + 10, H + 10, C.sky, { w: 0 }) + cloud(W * 0.2, H * 0.2, 0.8) + sun(W * 0.88, H * 0.18) + rect(-5, H * 0.6, W + 10, H, C.grass, { w: 0 }) + line([[-5, H * 0.6], [W + 5, H * 0.6]], { w: 4 }) + line([[W * 0.1, H * 0.75], [W * 0.9, H * 0.75]], { w: 5, ink: '#ffffff' }) + Array.from({ length: 5 }, (_, i) => rect(W * 0.66 + i * 26, H * 0.38, 18, H * 0.22, ['#ff6b6b', '#ffd93d', '#6bcbff'][i % 3], { r: 3, w: 3 })).join('');
    case 'sky': return rect(-5, -5, W + 10, H + 10, C.sky, { w: 0 }) + cloud(W * 0.2, H * 0.3, 1) + cloud(W * 0.78, H * 0.62, 0.9) + cloud(W * 0.55, H * 0.15, 0.6);
    case 'night': return rect(-5, -5, W + 10, H + 10, '#25306a', { w: 0 }) + circ(W * 0.82, H * 0.2, 30, '#fff4b0') + Array.from({ length: 10 }, (_, i) => star(rand(10, W - 10), rand(10, H * 0.5), 6, '#fff4b0', 4, { w: 2 })).join('') + house(W * 0.3, H, 0.9, '#5a5a8a');
    case 'lab': return rect(-5, -5, W + 10, H + 10, '#3d2a5e', { w: 0 }) + rect(W * 0.06, H * 0.1, W * 0.3, H * 0.3, '#6af0c0', { r: 6 }) + line([[W * 0.08, H * 0.3], [W * 0.14, H * 0.2], [W * 0.2, H * 0.28], [W * 0.28, H * 0.14], [W * 0.34, H * 0.22]], { w: 4, ink: '#1a4a3a' }) + Array.from({ length: 3 }, (_, i) => g(rect(-12, -50, 24, 34, '#ffffff', { r: 4 }) + oval(0, -10, 26, 22, ['#ff5ac8', '#6af06a', '#5ac8ff'][i]), W * (0.6 + i * 0.12), H * 0.58, 0.9)).join('') + rect(W * 0.52, H * 0.58, W * 0.46, 16, C.dgray, { r: 2 }) + rect(-5, floorY, W + 10, H, '#2a1d40', { w: 0 }) + line([[-5, floorY], [W + 5, floorY]], { w: 4 });
    case 'laundry': return rect(-5, -5, W + 10, H + 10, '#d9f2ff', { w: 0 }) + rect(-5, floorY, W + 10, H, '#c8c8d8', { w: 0 }) + line([[-5, floorY], [W + 5, floorY]], { w: 4 });
    case 'boom': { let s = rect(-5, -5, W + 10, H + 10, o.color || C.yellow, { w: 0 }); const cx = W / 2, cy = H / 2; for (let i = 0; i < 22; i++) { const a = (i / 22) * Math.PI * 2; s += poly([[cx, cy], [cx + Math.cos(a) * W, cy + Math.sin(a) * W], [cx + Math.cos(a + 0.12) * W, cy + Math.sin(a + 0.12) * W]], i % 2 ? C.orange : '#ffef8a', { w: 0 }); } return s; }
    case 'speed': { let s = rect(-5, -5, W + 10, H + 10, o.color || '#e6f4ff', { w: 0 }); for (let i = 0; i < 14; i++) { const x = rand(0, W + 100), y = rand(0, H); s += line([[x, y], [x - rand(80, 200), y]], { w: 3, ink: '#9cc8f0' }); } return s; }
    case 'black': return rect(-5, -5, W + 10, H + 10, '#1b1612', { w: 0 });
    case 'color': return rect(-5, -5, W + 10, H + 10, o.color || C.paper, { w: 0 });
    default: return rect(-5, -5, W + 10, H + 10, '#ffffff', { w: 0 });
  }
}

// ------------------------------------------------------------------ balloons, captions, sound effects
function balloon(b, W, H, actors) {
  const fs = b.fs || 21, maxW = (b.w || 0.44) * W, lines = wrap(T(b.t), maxW - 30, fs), tw = Math.max(...lines.map((l) => widthOf(l, fs))), lh = fs * 1.22;
  const bw = Math.max(70, tw + 34), bh = lines.length * lh + 26;
  let cx = Math.max(bw / 2 + 6, Math.min(W - bw / 2 - 6, b.x * W)), cy = Math.max(bh / 2 + 6, Math.min(H - bh / 2 - 6, b.y * H));
  let tgt = null;
  if (typeof b.to === 'number' && actors[b.to]) { const a = actors[b.to]; tgt = [a.x + (b.dx || 0), a.top + 26]; }
  else if (Array.isArray(b.to)) tgt = [b.to[0] * W, b.to[1] * H];
  let s = '';
  const k = b.k || 'say';
  if (tgt) {
    const dx = tgt[0] - cx, dy = tgt[1] - cy, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
    const ex = cx + ux * Math.min(d * 0.8, Math.max(bw, bh) / 2 + 46), ey = cy + uy * Math.min(d * 0.8, Math.max(bw, bh) / 2 + 46);
    if (k === 'think') s += circ(cx + (ex - cx) * 0.7, cy + (ey - cy) * 0.7, 9, '#ffffff', { w: 3.5 }) + circ(cx + (ex - cx) * 0.95, cy + (ey - cy) * 0.95, 5, '#ffffff', { w: 3 });
    else { const px = -uy * 13, py = ux * 13, tail = [[cx + px, cy + py], [ex, ey], [cx - px, cy - py]]; s += `<path d="M${tail.map((p) => p.map((n) => n.toFixed(1)).join(',')).join('L')}" fill="#ffffff" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>`; b._tail = tail; }
  }
  const fill = b.fill || '#ffffff';
  if (k === 'shout') { const pts = []; const n = 20; for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, r = i % 2 ? 1.0 : 1.22; pts.push([cx + Math.cos(a) * (bw / 2 + 10) * r, cy + Math.sin(a) * (bh / 2 + 10) * r]); } s += poly(pts, fill, { step: 400 }); }
  else if (k === 'think') { for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; s += circ(cx + Math.cos(a) * bw * 0.48, cy + Math.sin(a) * bh * 0.5, Math.min(bw, bh) * 0.22, fill, { w: 3.5 }); } s += oval(cx, cy, bw * 0.5, bh * 0.5, fill, { w: 0 }); }
  else s += shape(rectPts(cx - bw / 2, cy - bh / 2, bw, bh, Math.min(bh / 2, 26)), fill, { w: k === 'whisper' ? 3 : 4.5, dash: k === 'whisper' ? '8 7' : null });
  // cover the seam where the tail meets the balloon
  if (b._tail && k !== 'think' && k !== 'shout') { const t = b._tail; s += `<path d="M${t[0][0].toFixed(1)},${t[0][1].toFixed(1)}L${((t[0][0] + t[1][0] * 0.25) / 1.25).toFixed(1)},${((t[0][1] + t[1][1] * 0.25) / 1.25).toFixed(1)}L${((t[2][0] + t[1][0] * 0.25) / 1.25).toFixed(1)},${((t[2][1] + t[1][1] * 0.25) / 1.25).toFixed(1)}L${t[2][0].toFixed(1)},${t[2][1].toFixed(1)}Z" fill="${fill}"/>`; }
  const y0 = cy - (lines.length - 1) * lh / 2 + fs * 0.36;
  s += lines.map((l, i) => txt(l, cx, y0 + i * lh, { size: fs, cls: k === 'shout' ? 'tx bold' : 'tx' })).join('');
  return s;
}
function caption(c, W, H) {
  const o = Array.isArray(c) || typeof c === 'string' ? { t: c } : c, fs = o.fs || 19, lines = wrap(T(o.t), (o.w || 0.62) * W - 24, fs), tw = Math.max(...lines.map((l) => widthOf(l, fs)));
  const bw = tw + 24, bh = lines.length * fs * 1.2 + 16, x = o.pos === 'tr' || o.pos === 'br' ? W - bw - 8 : 8, y = o.pos === 'bl' || o.pos === 'br' ? H - bh - 8 : 8;
  return rect(x, y, bw, bh, o.fill || '#ffe45c', { r: 3, w: 4 }) + lines.map((l, i) => txt(l, x + 12, y + 8 + fs * 0.92 + i * fs * 1.2, { size: fs, anchor: 'start', cls: 'tx' })).join('');
}
const sfx = (o, W, H) => txt(T(o.t), o.x * W, o.y * H, { size: o.size || 64, cls: 'sfx', fill: o.fill || C.yellow, stroke: INK, sw: o.sw || 9, rot: o.rot ?? -8 });
function fx(o, W, H) {
  const x = o.x * W, y = o.y * H;
  // frozen solid by a cold joke
  if (o.k === 'ice') { const w = (o.w || 0.3) * W, h = (o.h || 0.6) * H; return rect(x - w / 2, y - h, w, h, 'rgba(170,225,255,.55)', { r: 10, ink: '#3a8ad0' }) + Array.from({ length: 5 }, (_, i) => poly([[x - w / 2 + 10 + i * (w - 20) / 4 - 7, y - h], [x - w / 2 + 10 + i * (w - 20) / 4 + 7, y - h], [x - w / 2 + 10 + i * (w - 20) / 4, y - h + 26]], '#e8f6ff', { w: 2.5, ink: '#3a8ad0' })).join('') + marks.shine(x + w / 2 - 14, y - h + 20); }
  // something rubbed out: only a dashed outline is left
  if (o.k === 'ghost') { const w = (o.w || 0.3) * W, h = (o.h || 0.3) * H; return rect(x - w / 2, y - h, w, h, null, { dash: '10 9', ink: '#9a948c', w: 3.5, r: 8 }) + txt(T(o.t || ['（被擦掉了）', '(erased)']), x, y - h / 2 + 7, { size: 18, cls: 'tx', fill: '#9a948c' }); }
 if (o.k === 'speed') return marks.speed(x, y, o.len || 80, o.n || 3, o.dir || -1); if (o.k === 'stink') return marks.stink(x, y, o.n || 3); if (o.k === 'star') return star(x, y, o.r || 30, o.fill || C.yellow, 5); return marks[o.k] ? marks[o.k](x, y) : ''; }

// ------------------------------------------------------------------ a panel
export function panel(P, W, H, key = 1) {
  seed(key);
  let s = bg(P.bg || 'white', W, H, P.bgo || {});
  for (const p of P.props || []) if (!p.front) s += prop(p.k, p.x * W, p.y * H, p.s || 1, p.r || 0, p);
  const drawn = (P.a || []).map((a) => draw({ ...a, x: a.x * W, y: (a.y ?? 0.97) * H, s: (a.s || 1) * (P.scale || Math.min(H / 400, W / 320, 1.5)) }));
  s += drawn.map((d) => d.svg).join('');
  for (const p of P.props || []) if (p.front) s += prop(p.k, p.x * W, p.y * H, p.s || 1, p.r || 0, p);
  for (const o of P.fx || []) s += fx(o, W, H);
  for (const o of P.sfx || []) s += sfx(o, W, H);
  for (const b of P.b || []) s += balloon({ ...b }, W, H, drawn);
  if (P.cap) s += caption(P.cap, W, H);
  if (P.cap2) s += caption({ ...(Array.isArray(P.cap2) ? { t: P.cap2 } : P.cap2), pos: (P.cap2.pos || 'br') }, W, H);
  return s;
}
const frame = (x, y, w, h) => shape(rectPts(x, y, w, h, 4), null, { w: 5.5, j: 1.6 });

// ------------------------------------------------------------------ pages
function grid(rows, hs, top = M, bottom = PH - M) {
  const totalH = bottom - top - GUT * (rows.length - 1), sumH = hs.reduce((a, b) => a + b, 0), out = []; let y = top;
  rows.forEach((cols, r) => { const h = totalH * hs[r] / sumH, sumW = cols.reduce((a, b) => a + b, 0), totalW = PW - 2 * M - GUT * (cols.length - 1); let x = M; for (const c of cols) { const w = totalW * c / sumW; out.push([x, y, w, h]); x += w + GUT; } y += h + GUT; });
  return out;
}
const sub = (inner, x, y, w, h, cls = '') => `<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" viewBox="0 0 ${w.toFixed(1)} ${h.toFixed(1)}" overflow="hidden"${cls ? ` class="${cls}"` : ''}>${inner}</svg>`;
function bigTitle(str, cx, cy, size, colors, o = {}) {
  const chars = [...str], ws = chars.map((c) => (isCJK(c) ? size : c === ' ' ? size * 0.3 : size * 0.62)), tot = ws.reduce((a, b) => a + b, 0);
  let x = cx - tot / 2, s = '';
  chars.forEach((c, i) => { if (c !== ' ') s += txt(c, x + ws[i] / 2, cy + (i % 2 ? 6 : -6), { size, cls: 'sfx', fill: colors[i % colors.length], stroke: INK, sw: o.sw || 12, rot: i % 2 ? 6 : -6 }); x += ws[i]; });
  return s;
}
// returns { svg, panels: [{ svg, w, h, flip? }] } — panels are for reading one panel at a time on phones
export function renderPage(page, lang, pageKey) {
  LANG = lang; seed(pageKey);
  const out = [], body = [];
  const add = (P, x, y, w, h, i, cls = '') => { const inner = panel(P, w, h, pageKey * 31 + i); body.push(sub(inner, x, y, w, h, cls) + frame(x, y, w, h)); out.push({ svg: inner, w, h }); return inner; };
  if (page.type === 'cover') {
    const [x, y, w, h] = [M, M, PW - 2 * M, PH - 2 * M];
    const inner = panel(page.art, w, h, pageKey) + bigTitle(T(page.title), w / 2, 130, LANG ? 96 : 120, [C.red, C.yellow, C.green, C.blue, C.orange, C.purple])
      + bigTitle(T(page.sub), w / 2, 232, LANG ? 42 : 50, ['#ffffff'], { sw: 9 })
      + g(star(0, 0, 70, C.red, 12, { inner: 0.72 }) + txt(T(page.badge), 0, 10, { size: 26, cls: 'sfx', fill: '#ffffff', stroke: INK, sw: 5 }), w - 90, 330, 1, false, 12)
      + g(rect(-130, -26, 260, 52, '#ffffff', { r: 10 }) + txt(T(page.by), 0, 10, { size: 24, cls: 'hand' }), w / 2, h - 46, 1, false, -2);
    body.push(sub(inner, x, y, w, h) + frame(x, y, w, h)); out.push({ svg: inner, w, h });
  } else if (page.type === 'chapter') {
    const head = bigTitle(T(page.n), PW / 2, 120, 64, [C.red, C.blue, C.green, C.orange]) + bigTitle(T(page.title), PW / 2, 220, LANG ? 46 : 56, [C.yellow], { sw: 10 });
    body.push(head);
    add(page.art, M, 290, PW - 2 * M, PH - 290 - M, 0);
    out[0].head = head;
  } else if (page.type === 'flip') {
    const head = bigTitle(T(page.title), PW / 2, 92, 56, [C.red, C.orange, C.yellow, C.green, C.blue, C.purple]) + txt(T(page.how), PW / 2, 150, { size: 20, cls: 'tx' });
    body.push(head);
    const [x, y, w, h] = [M + 20, 190, PW - 2 * M - 40, PH - 190 - 130];
    seed(pageKey); const A = panel(page.a, w, h, pageKey * 7), B = panel(page.b, w, h, pageKey * 7);
    body.push(`<g class="flip">${sub(A, x, y, w, h, 'fa')}${sub(B, x, y, w, h, 'fb')}</g>` + frame(x, y, w, h));
    body.push(txt(T(page.chant), PW / 2, PH - 72, { size: 26, cls: 'sfx', fill: C.yellow, stroke: INK, sw: 7, rot: -2 }));
    out.push({ svg: `<g class="flip"><g class="fa">${A}</g><g class="fb">${B}</g></g>`, w, h, flip: true, head });
  } else if (page.type === 'howto') {
    body.push(bigTitle(T(page.title), PW / 2, 92, 54, [C.orange, C.red, C.blue, C.green]) + txt(T(page.sub), PW / 2, 150, { size: 20, cls: 'tx' }));
    const cells = grid([[1, 1], [1, 1], [1, 1]], [1, 1, 1], 190), parts = mochiParts('happy', 'stand'), order = [0, 1, 2, 3, 4, 5];
    cells.forEach(([x, y, w, h], i) => {
      seed(pageKey * 5);   // the same wobble in every step, so each picture adds to the last
      let art = '';
      order.slice(0, i + 1).forEach((pi, j) => { const sv = parts[pi](); art += j < i ? `<g opacity=".5">${sv}</g>` : sv; });
      const inner = rect(-5, -5, w + 10, h + 10, '#ffffff', { w: 0 }) + g(art, w * 0.46, h * 0.88, Math.min(1.6, h / 150)) + g(circ(0, 0, 22, C.yellow) + txt(String(i + 1), 0, 10, { size: 28, cls: 'sfx' }), 30, 30);
      body.push(sub(inner, x, y, w, h) + frame(x, y, w, h)); out.push({ svg: inner, w, h });
    });
  } else {
    const cells = grid(page.rows || [[1]], page.h || (page.rows || [[1]]).map(() => 1));
    (page.panels || []).forEach((P, i) => { const c = cells[i]; if (c) add(P, ...c, i); });
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PW} ${PH}" class="page">${rect(0, 0, PW, PH, C.paper, { w: 0, j: 0 })}${body.join('')}${page.num ? txt(String(page.num), PW / 2, PH - 8, { size: 16, cls: 'hand', fill: '#8a8070' }) : ''}</svg>`;
  return { svg, panels: out };
}
