// Drawing like a kid with markers: thick wobbly black outlines, flat colours that spill a little past the lines.
// Everything returns SVG strings. Coordinates are page units; characters stand with their feet at (x, y).
let R = Math.random;
export function seed(s) { let t = s >>> 0 || 1; R = () => { t = (t + 0x6d2b79f5) >>> 0; let x = t; x = Math.imul(x ^ (x >>> 15), x | 1); x ^= x + Math.imul(x ^ (x >>> 7), x | 61); return ((x ^ (x >>> 14)) >>> 0) / 4294967296; }; }
export const rand = (a = 0, b = 1) => a + R() * (b - a);
const f = (n) => Math.round(n * 10) / 10;
export const INK = '#1b1612';
export const C = {
  skin: '#ffd2a8', skin2: '#f2b98c', white: '#ffffff', paper: '#fffdf6', red: '#ff4b3e', orange: '#ff9a2e', yellow: '#ffd93d', green: '#4cc95a', dgreen: '#2f9a46',
  blue: '#3d8bff', lblue: '#9fd0ff', navy: '#2c3a73', purple: '#9b6bff', pink: '#ff8fb8', brown: '#8a5a33', dbrown: '#5a3820', tan: '#e7b36b', gray: '#a6a6ad', dgray: '#5f6068',
  coral: '#ff7f5c', khaki: '#d8c08a', teal: '#3cc2b5', sky: '#bfe7ff', grass: '#7fd36a', wall: '#fff2c9', floor: '#e0b27a',
};

// ------------------------------------------------------------------ lines and shapes
export function smooth(pts, closed) {
  const n = pts.length; if (n < 2) return '';
  const P = (i) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
  }
  return d + (closed ? 'Z' : '');
}
const sharpD = (pts, closed) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])},${f(p[1])}`).join('') + (closed ? 'Z' : '');
export const jit = (pts, a) => pts.map(([x, y]) => [x + rand(-a, a), y + rand(-a, a)]);
export function ell(cx, cy, rx, ry, n = 0, rot = 0) {
  n = n || Math.max(10, Math.round((rx + ry) / 5)); const out = [], c = Math.cos(rot), s = Math.sin(rot);
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, x = Math.cos(a) * rx, y = Math.sin(a) * ry; out.push([cx + x * c - y * s, cy + x * s + y * c]); }
  return out;
}
// points along straight edges, so wobble does not round the corners away
function edges(pts, closed, step = 34) {
  const out = [];
  for (let i = 0; i < (closed ? pts.length : pts.length - 1); i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
    for (let k = 0; k < n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
  }
  if (!closed) out.push(pts[pts.length - 1]);
  return out;
}
export function rectPts(x, y, w, h, r = 6) {
  if (r <= 0) return edges([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], true);
  r = Math.min(r, w / 2, h / 2);
  const out = [], arc = (cx, cy, a0) => { for (let i = 0; i <= 3; i++) { const a = a0 + (i / 3) * Math.PI / 2; out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } };
  const side = (ax, ay, bx, by) => { const n = Math.max(0, Math.round(Math.hypot(bx - ax, by - ay) / 40)); for (let k = 1; k < n; k++) out.push([ax + (bx - ax) * k / n, ay + (by - ay) * k / n]); };
  arc(x + w - r, y + r, -Math.PI / 2); side(x + w, y + r, x + w, y + h - r); arc(x + w - r, y + h - r, 0); side(x + w - r, y + h, x + r, y + h);
  arc(x + r, y + h - r, Math.PI / 2); side(x, y + h - r, x, y + r); arc(x + r, y + r, Math.PI); side(x + r, y, x + w - r, y);
  return out;
}
// a filled shape: the colour sits slightly off the outline, like a kid colouring in
export function shape(pts, fill, o = {}) {
  const w = o.w ?? 4.5, a = o.j ?? 1.4, D = o.sharp ? sharpD : smooth;
  let s = '';
  if (fill) s += `<path d="${D(jit(pts, a * 1.5), true)}" fill="${fill}"${o.op ? ` opacity="${o.op}"` : ''} transform="translate(${f(rand(-2.2, 2.2))} ${f(rand(-2.2, 2.2))})"/>`;
  if (w) s += `<path d="${D(jit(pts, a), true)}" fill="none" stroke="${o.ink || INK}" stroke-width="${w}" stroke-linejoin="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
  return s;
}
export const circ = (cx, cy, r, fill, o = {}) => shape(ell(cx, cy, r, r, o.n), fill, o);
export const oval = (cx, cy, rx, ry, fill, o = {}) => shape(ell(cx, cy, rx, ry, o.n, o.rot || 0), fill, o);
export const rect = (x, y, w, h, fill, o = {}) => shape(rectPts(x, y, w, h, o.r ?? 6), fill, o);
export const poly = (pts, fill, o = {}) => shape(edges(pts, true, o.step || 30), fill, { ...o, sharp: o.sharp ?? true });
export function line(pts, o = {}) {
  const p = o.raw ? pts : jit(edges(pts, false, o.step || 30), o.j ?? 1.2);
  return `<path d="${(o.sharp ? sharpD : smooth)(p, false)}" fill="none" stroke="${o.ink || INK}" stroke-width="${o.w ?? 4.5}" stroke-linecap="round" stroke-linejoin="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}${o.op ? ` opacity="${o.op}"` : ''}/>`;
}
// a tube: thick coloured line with an outline (arms, legs, tails)
export function tube(pts, color, thick, o = {}) {
  const d = smooth(jit(pts, o.j ?? 1), false);
  return `<path d="${d}" fill="none" stroke="${o.ink || INK}" stroke-width="${thick + 9}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${thick}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
export const g = (inner, x = 0, y = 0, s = 1, flip = false, rot = 0) => `<g transform="translate(${f(x)} ${f(y)})${rot ? ` rotate(${f(rot)})` : ''} scale(${flip ? -s : s} ${s})">${inner}</g>`;
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export function txt(str, x, y, o = {}) {
  return `<text x="${f(x)}" y="${f(y)}" class="${o.cls || 'tx'}" font-size="${o.size || 22}" text-anchor="${o.anchor || 'middle'}" fill="${o.fill || INK}"${o.rot ? ` transform="rotate(${o.rot} ${f(x)} ${f(y)})"` : ''}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 6}" paint-order="stroke" stroke-linejoin="round"` : ''}>${esc(str)}</text>`;
}
// little marks around a face or body
export const marks = {
  sweat: (x, y) => shape([[x, y - 14], [x + 8, y + 2], [x, y + 9], [x - 8, y + 2]], C.lblue, { w: 3, sharp: false }),
  stink: (x, y, n = 3) => Array.from({ length: n }, (_, i) => line([[x + i * 18, y], [x + i * 18 + 8, y - 16], [x + i * 18 - 4, y - 32], [x + i * 18 + 6, y - 48]], { ink: '#6dbb3a', w: 4 })).join(''),
  speed: (x, y, len = 70, n = 3, dir = -1) => Array.from({ length: n }, (_, i) => line([[x, y + i * 16], [x + dir * len * (0.7 + rand(0, 0.4)), y + i * 16]], { w: 3.5 })).join(''),
  hearts: (x, y) => [0, 1].map((i) => shape([[x + i * 26, y + 8], [x + i * 26 - 10, y - 2], [x + i * 26 - 6, y - 10], [x + i * 26, y - 5], [x + i * 26 + 6, y - 10], [x + i * 26 + 10, y - 2]], C.red, { w: 3, sharp: false })).join(''),
  stars: (x, y, n = 3) => Array.from({ length: n }, (_, i) => star(x + Math.cos(i * 2.1) * 34, y + Math.sin(i * 2.1) * 14, 9, C.yellow, 5)).join(''),
  bang: (x, y) => line([[x, y], [x, y - 24]], { w: 5 }) + circ(x, y + 9, 2.5, INK, { w: 0 }),
  zzz: (x, y) => txt('Z', x, y, { size: 26, cls: 'sfx' }) + txt('z', x + 18, y - 18, { size: 18, cls: 'sfx' }),
  shine: (x, y) => [0, 1, 2, 3].map((i) => line([[x + Math.cos(i * 1.57) * 8, y + Math.sin(i * 1.57) * 8], [x + Math.cos(i * 1.57) * 20, y + Math.sin(i * 1.57) * 20]], { w: 3 })).join(''),
};
export function star(cx, cy, r, fill, n = 5, o = {}) { const pts = []; for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2, rr = i % 2 ? r * (o.inner || 0.45) : r; pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } return shape(pts, fill, { ...o, sharp: true }); }
