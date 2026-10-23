// The cast, drawn the way Josh and Jasper would draw them: big round heads, tube arms, mitten hands.
// draw(actor) -> SVG. actor: { c: who, x, y (feet), s: size, f: true = faces left, p: pose, e: face, hold, cape, stache, r: tilt }
import { C, INK, shape, circ, oval, rect, poly, line, tube, g, star, marks, rand, ell, txt } from './art.js?v=1';

// arm and leg angles in degrees from straight down; positive points the way the character faces
const POSES = {
  stand: { R: 16, L: -16, LR: 3, LL: -3 }, wave: { R: 165, L: -14, LR: 3, LL: -3 }, point: { R: 95, L: -14, LR: 3, LL: -3 },
  cheer: { R: 158, L: -158, LR: 14, LL: -14, lift: 12 }, shock: { R: 132, L: -132, LR: 10, LL: -10, lift: 4 }, run: { R: 75, L: -60, LR: 42, LL: -38, lean: 9 },
  walk: { R: 34, L: -28, LR: 20, LL: -16 }, hold: { R: 82, L: 68, LR: 3, LL: -3 }, fly: { R: 172, L: 160, LR: -8, LL: -22, lean: 72 }, think: { R: 150, L: -14, LR: 3, LL: -3 },
  shrug: { R: 118, L: -118, LR: 3, LL: -3 }, fall: { R: 150, L: -150, LR: 30, LL: -30, lean: -80 }, sit: { R: 40, L: -40, LR: 92, LL: 80, lift: -46 }, draw: { R: 100, L: -24, LR: 3, LL: -3 },
  facepalm: { R: 166, L: -10, LR: 3, LL: -3 }, punch: { R: 92, L: -50, LR: 30, LL: -24, lean: 8 }, dance: { R: 140, L: -38, LR: 28, LL: -4 }, up: { R: 176, L: -16, LR: 3, LL: -3 },
  throw: { R: 165, L: 60, LR: 26, LL: -20, lean: -6 }, hug: { R: 70, L: 60, LR: 3, LL: -3 }, scared: { R: 110, L: 100, LR: 8, LL: -8 },
};
const KID = { hip: -58, leg: 54, legT: 19, tor: [-35, -128, 70, 76], sh: -118, shX: 31, arm: 52, armT: 15, head: -194, hr: 64, eye: -200, mouth: -163, hand: 11, foot: [17, 10] };
const ADULT = { hip: -92, leg: 88, legT: 21, tor: [-40, -186, 80, 100], sh: -174, shX: 35, arm: 74, armT: 16, head: -240, hr: 55, eye: -245, mouth: -214, hand: 12, foot: [19, 10] };
const rad = (d) => d * Math.PI / 180;
const end = (x, y, a, len) => [x + Math.sin(rad(a)) * len, y + Math.cos(rad(a)) * len];

// ------------------------------------------------------------------ faces
function face(e, x0, y0, my, k = 1, o = {}) {
  const ex = 22 * k, d = 6 * k; let s = '';
  const eye = (cx, cy) => {
    if (e === 'laugh' || e === 'proud' || e === 'love') return line([[cx - 8 * k, cy + 3], [cx, cy - 6 * k], [cx + 8 * k, cy + 3]], { w: 4 });
    if (e === 'shock' || e === 'scared') return circ(cx, cy, 12 * k, C.white, { w: 3.5 }) + circ(cx + 2, cy + 1, 4.5 * k, INK, { w: 0 });
    if (e === 'dizzy') return line(Array.from({ length: 10 }, (_, i) => [cx + Math.cos(i * 1.2) * i * 1.1 * k, cy + Math.sin(i * 1.2) * i * 1.1 * k]), { w: 3, j: 0 });
    if (e === 'sleep') return line([[cx - 8 * k, cy], [cx + 8 * k, cy + 1]], { w: 4 });
    if (e === 'smug' || e === 'bored') return oval(cx, cy + 2, 7 * k, 5 * k, INK, { w: 0 }) + line([[cx - 10 * k, cy - 3], [cx + 10 * k, cy - 3]], { w: 4 });
    return oval(cx, cy, 6.5 * k, 9.5 * k, INK, { w: 0 });
  };
  s += eye(x0 - ex + d, y0) + eye(x0 + ex + d, y0);
  // brows
  if (e === 'angry' || e === 'evil') s += line([[x0 - ex + d - 12 * k, y0 - 20 * k], [x0 - ex + d + 9 * k, y0 - 11 * k]], { w: 5 }) + line([[x0 + ex + d + 12 * k, y0 - 20 * k], [x0 + ex + d - 9 * k, y0 - 11 * k]], { w: 5 });
  if (e === 'sad' || e === 'scared' || e === 'worry') s += line([[x0 - ex + d - 10 * k, y0 - 12 * k], [x0 - ex + d + 8 * k, y0 - 20 * k]], { w: 4 }) + line([[x0 + ex + d + 10 * k, y0 - 12 * k], [x0 + ex + d - 8 * k, y0 - 20 * k]], { w: 4 });
  if (e === 'think' || e === 'smug') s += line([[x0 + ex + d - 9 * k, y0 - 20 * k], [x0 + ex + d + 9 * k, y0 - 24 * k]], { w: 4 });
  // mouth
  const mx = x0 + d, w = 18 * k;
  if (e === 'happy' || e === 'proud' || e === 'love' || e === 'think' && false) s += line([[mx - w, my - 4], [mx - w / 2, my + 7 * k], [mx + w / 2, my + 7 * k], [mx + w, my - 4]], { w: 4.5 });
  else if (e === 'grin' || e === 'laugh' || e === 'cheer') s += shape([[mx - w * 1.2, my - 6], [mx + w * 1.2, my - 6], [mx + w * 0.8, my + 14 * k], [mx, my + 19 * k], [mx - w * 0.8, my + 14 * k]], '#b3263a', { w: 4, sharp: false }) + oval(mx + 3, my + 10 * k, 8 * k, 5 * k, C.pink, { w: 0 }) + rect(mx - w * 0.9, my - 6, w * 1.8, 6 * k, C.white, { w: 0, r: 2 });
  else if (e === 'shock') s += oval(mx, my + 5, 9 * k, 13 * k, '#7a1c2a', { w: 4 });
  else if (e === 'scared' || e === 'worry') s += line([[mx - w, my + 4], [mx - w / 2, my - 2], [mx, my + 4], [mx + w / 2, my - 2], [mx + w, my + 4]], { w: 4 });
  else if (e === 'angry') s += rect(mx - w, my - 4, w * 2, 14 * k, C.white, { w: 4, r: 3 }) + line([[mx - w, my + 3], [mx + w, my + 3]], { w: 2.5 });
  else if (e === 'evil') s += line([[mx - w * 1.1, my - 6], [mx - w / 2, my + 6], [mx + w / 2, my + 6], [mx + w * 1.1, my - 8]], { w: 4.5 }) + poly([[mx - 6, my + 4], [mx - 2, my + 13], [mx + 2, my + 4]], C.white, { w: 2.5 });
  else if (e === 'sad') s += line([[mx - w, my + 8], [mx - w / 2, my - 1], [mx + w / 2, my - 1], [mx + w, my + 8]], { w: 4.5 });
  else if (e === 'smug') s += line([[mx - w * 0.7, my + 2], [mx + w * 0.4, my + 4], [mx + w, my - 6]], { w: 4.5 });
  else if (e === 'dizzy' || e === 'bored') s += line([[mx - w * 0.7, my + 3], [mx + w * 0.7, my + 3]], { w: 4.5 });
  else if (e === 'sleep') s += oval(mx, my + 4, 5 * k, 6 * k, '#7a1c2a', { w: 3 });
  else if (e === 'yum') s += line([[mx - w, my - 4], [mx, my + 7 * k], [mx + w, my - 4]], { w: 4.5 }) + oval(mx + 6, my + 9 * k, 7 * k, 9 * k, C.pink, { w: 3 });
  else s += line([[mx - w, my - 4], [mx - w / 2, my + 7 * k], [mx + w / 2, my + 7 * k], [mx + w, my - 4]], { w: 4.5 });
  if (e === 'love') s += marks.hearts(x0 - 14, y0 - 44 * k);
  if (e === 'scared' || e === 'worry') s += marks.sweat(x0 + 52 * k, y0 - 16 * k);
  if (e === 'sad') s += shape([[x0 + ex + d, y0 + 12], [x0 + ex + d + 5, y0 + 24], [x0 + ex + d - 5, y0 + 24]], C.lblue, { w: 2.5, sharp: false });
  if (e === 'angry' || e === 'evil') s += line([[x0 + 54 * k, y0 - 44 * k], [x0 + 62 * k, y0 - 30 * k]], { w: 3, ink: C.red }) + line([[x0 + 62 * k, y0 - 46 * k], [x0 + 54 * k, y0 - 28 * k]], { w: 3, ink: C.red });
  if (o.blush) s += oval(x0 - 34 * k + d, my - 8, 9 * k, 5 * k, C.pink, { w: 0, op: 0.8 }) + oval(x0 + 34 * k + d, my - 8, 9 * k, 5 * k, C.pink, { w: 0, op: 0.8 });
  return s;
}

// ------------------------------------------------------------------ people
const LOOK = {
  josh: { rig: KID, shirt: C.green, pants: C.blue, shoes: '#ffffff', hairC: C.brown, k: 1 },
  jasper: { rig: KID, shirt: '#8f979c', pants: C.lblue, shoes: C.red, hairC: '#1d1714', k: 0.94 },
  jeff: { rig: ADULT, shirt: C.coral, pants: C.khaki, shoes: C.dbrown, hairC: '#4a2e18', k: 1 },
  erin: { rig: ADULT, shirt: C.pink, pants: C.navy, shoes: '#c43a6a', hairC: '#4a2a16', k: 0.96 },
  rivera: { rig: ADULT, shirt: C.teal, pants: '#e8dcc0', shoes: C.dbrown, hairC: '#2e1a10', k: 0.95 },
  coach: { rig: ADULT, shirt: C.red, pants: '#f2f2f2', shoes: C.red, hairC: C.tan, k: 1.02 },
  eraser: { rig: ADULT, shirt: C.purple, pants: '#3a2f5a', shoes: INK, hairC: C.pink, k: 1 },
};
function hairBack(c, r, hx, hy) {
  if (c === 'erin') return shape([[hx - r - 14, hy - 10], [hx - r - 8, hy + r + 46], [hx - 20, hy + r + 30], [hx + 20, hy + r + 30], [hx + r + 8, hy + r + 46], [hx + r + 14, hy - 10], [hx, hy - r - 12]], LOOK.erin.hairC, { sharp: false });
  if (c === 'rivera') return circ(hx - r - 14, hy - 18, 22, LOOK.rivera.hairC);
  return '';
}
function hairFront(c, r, hx, hy, e, a = {}) {
  const L = LOOK[c];
  if (c === 'josh' && a.nocap) return shape([[hx - r + 2, hy - 18], [hx - r + 10, hy - 50], [hx - 20, hy - r - 14], [hx + 4, hy - r - 2], [hx + 24, hy - r - 16], [hx + r - 8, hy - 48], [hx + r - 2, hy - 18], [hx + 20, hy - 34], [hx - 22, hy - 30]], L.hairC, { sharp: false });
  if (c === 'josh') {   // green cap with a J, brown hair poking out
    return shape([[hx - r - 4, hy - 10], [hx + r + 6, hy - 14], [hx + r - 4, hy - 34], [hx + r * 0.6, hy - r + 2], [hx, hy - r - 10], [hx - r * 0.6, hy - r + 2], [hx - r + 2, hy - 34]], C.dgreen, { sharp: false })
      + shape([[hx + r - 10, hy - 18], [hx + r + 50, hy - 10], [hx + r + 48, hy - 2], [hx + r - 6, hy - 6]], '#2a7d3a', { sharp: false })
      + txt('J', hx + 6, hy - 30, { size: 30, cls: 'sfx', fill: '#ffffff', stroke: INK, sw: 4 })
      + poly([[hx - r + 2, hy - 8], [hx - r - 10, hy + 6], [hx - r + 10, hy + 2]], L.hairC, { w: 3 });
  }
  if (c === 'jasper') {   // spiky black hair
    const pts = []; const n = 7;
    for (let i = 0; i <= n; i++) { const a = Math.PI + (i / n) * Math.PI; pts.push([hx + Math.cos(a) * (r + 2), hy + Math.sin(a) * (r + 2) + 14]); if (i < n) { const b = Math.PI + ((i + 0.5) / n) * Math.PI; pts.push([hx + Math.cos(b) * (r + 26), hy + Math.sin(b) * (r + 26) + (e === 'shock' ? -10 : 6)]); } }
    pts.push([hx + r - 6, hy - 18], [hx + 10, hy - 30], [hx - 18, hy - 22], [hx - r + 6, hy - 16]);
    return poly(pts, L.hairC, { step: 200 });
  }
  if (c === 'jeff') {   // short brown hair with a part, and glasses
    return shape([[hx - r - 2, hy - 2], [hx - r + 2, hy - 34], [hx - 20, hy - r - 8], [hx + 26, hy - r - 6], [hx + r + 2, hy - 30], [hx + r + 2, hy - 4], [hx + r - 8, hy - 22], [hx + 10, hy - 30], [hx - 10, hy - 26], [hx - r + 8, hy - 22]], L.hairC, { sharp: false })
      + glasses(hx + 6, hy - 6, 0.95);
  }
  if (c === 'erin') return shape([[hx - r - 4, hy], [hx - r + 4, hy - 36], [hx - 16, hy - r - 10], [hx + 30, hy - r - 6], [hx + r + 4, hy - 30], [hx + r + 4, hy], [hx + r - 6, hy - 26], [hx + 8, hy - 34], [hx - 14, hy - 20], [hx - r + 8, hy - 18]], L.hairC, { sharp: false })
    + circ(hx - r - 3, hy + 16, 5, C.yellow, { w: 2.5 });
  if (c === 'rivera') return shape([[hx - r - 2, hy - 4], [hx - r + 6, hy - 38], [hx, hy - r - 8], [hx + r - 2, hy - 36], [hx + r + 2, hy - 8], [hx + r - 10, hy - 26], [hx - r + 12, hy - 26]], L.hairC, { sharp: false }) + glasses(hx + 6, hy - 6, 0.9);
  if (c === 'eraser') return rect(hx - r + 8, hy - r - 8, (r - 8) * 2, 18, '#5ad1ff', { r: 8 }) + circ(hx - 22, hy - r + 1, 9, '#c8f0ff', { w: 3 }) + circ(hx + 22, hy - r + 1, 9, '#c8f0ff', { w: 3 });
  return '';
}
const glasses = (x, y, k) => circ(x - 23 * k, y, 15 * k, 'rgba(255,255,255,.35)', { w: 4 }) + circ(x + 23 * k, y, 15 * k, 'rgba(255,255,255,.35)', { w: 4 }) + line([[x - 8 * k, y - 2], [x + 8 * k, y - 2]], { w: 4 });

function person(a) {
  const lbl = (s) => (a.f ? `<g transform="scale(-1 1)">${s}</g>` : s);   // letters stay readable when facing left
  const L = LOOK[a.c], K = L.rig, P = POSES[a.p || 'stand'] || POSES.stand, e = a.e || 'happy', lift = P.lift || 0;
  let back = '', body = '', front = '';
  const hipY = K.hip - lift, shY = K.sh - lift, headY = K.head - lift, [tx, ty, tw, th] = K.tor;
  // cape behind everything
  if (a.cape) back += shape([[-28, shY - 4], [28, shY - 4], [-20 - 70, hipY + 30 + (P.lean > 40 ? -60 : 0)], [-95, hipY - 10], [-70, shY + 30]], a.cape, { sharp: false });
  // legs and shoes
  const leg = (x, ang) => { const [fx, fy] = end(x, hipY, ang, K.leg); return tube([[x, hipY], [(x + fx) / 2, (hipY + fy) / 2], [fx, fy]], L.pants, K.legT) + oval(fx + 7, fy + 2, K.foot[0], K.foot[1], L.shoes, { w: 4 }); };
  body += leg(-15, P.LL) + leg(15, P.LR);
  // arms (back arm first)
  const arm = (x, ang) => { const [hx, hy] = end(x, shY, ang, K.arm); return { svg: tube([[x, shY], [(x + hx) / 2 + (ang > 0 ? 1 : -1) * 3, (shY + hy) / 2], [hx, hy]], L.shirt, K.armT) + circ(hx, hy, K.hand, a.c === 'coach' ? C.tan : a.gloves || C.skin, { w: 4 }), at: [hx, hy] }; };
  const la = arm(-K.shX, P.L), ra = arm(K.shX, P.R);
  back += la.svg;
  // torso
  if (a.c === 'eraser') body += rect(tx - 6, ty, tw + 12, th + 10, '#ffffff', { r: 10 }) + rect(tx + 18, ty + 4, tw - 36, th - 10, L.shirt, { r: 4 });   // lab coat
  else body += rect(tx, ty, tw, th, L.shirt, { r: 16 });
  if (a.c === 'josh') body += line([[tx + 6, ty + th * 0.45], [tx + tw - 6, ty + th * 0.45]], { w: 9, ink: '#ffffff' }) + line([[tx + 6, ty + th * 0.45 - 6], [tx + tw - 6, ty + th * 0.45 - 6]], { w: 2.5 });
  if (a.c === 'jasper') body += circ(0, ty + th * 0.48, 7, C.yellow, { w: 3 }) + oval(0, ty + th * 0.48, 22, 8, null, { w: 2.5 }) + oval(0, ty + th * 0.48, 22, 8, null, { w: 2.5, rot: 1.05 }) + oval(0, ty + th * 0.48, 22, 8, null, { w: 2.5, rot: -1.05 });
  if (a.c === 'jeff') body += poly([[-16, ty + 2], [0, ty + 22], [16, ty + 2]], '#ffb59a', { w: 3.5 }) + circ(0, ty + 34, 3, INK, { w: 0 }) + circ(0, ty + 50, 3, INK, { w: 0 });
  if (a.c === 'erin') body += oval(0, ty + 4, 18, 8, C.skin, { w: 3 }) + circ(0, ty + 22, 5, C.yellow, { w: 2.5 });
  if (a.c === 'coach') body += lbl(txt('SC', 0, ty + th * 0.62, { size: 34, cls: 'sfx', fill: '#ffffff', stroke: INK, sw: 4 }));
  if (a.c === 'eraser') body += lbl(txt('E', 0, ty + th * 0.6, { size: 26, cls: 'sfx', fill: C.pink, stroke: INK, sw: 4 }));
  // head
  const r = K.hr, hx = 0, hy = headY;
  let head = hairBack(a.c, r, hx, hy);
  if (a.c === 'coach') {   // the mascot's coyote head
    head += poly([[hx - 40, hy - 30], [hx - 30, hy - r - 50], [hx - 6, hy - 40]], C.tan, { w: 4.5 }) + poly([[hx + 40, hy - 30], [hx + 30, hy - r - 50], [hx + 6, hy - 40]], C.tan, { w: 4.5 })
      + circ(hx, hy, r, '#d9a65e') + oval(hx + 30, hy + 18, 34, 22, '#f6e2c0') + oval(hx + 58, hy + 8, 9, 7, INK, { w: 0 }) + face(e, hx - 4, hy - 8, hy + 30, 0.85);
  } else if (a.c === 'eraser') {   // Dr. Eraser: a pink rubber block for a head
    head += rect(hx - r, hy - r, r * 2, r * 2 - 4, C.pink, { r: 18 }) + line([[hx - r + 10, hy + 18], [hx - r + 26, hy + 22]], { w: 2.5, ink: '#c46a8a' }) + face(e === 'happy' ? 'evil' : e, hx, hy - 4, hy + 30, 1);
  } else {
    head += circ(hx - r + 2, hy + 6, 12, C.skin, { w: 4 }) + circ(hx + r - 2, hy + 6, 12, C.skin, { w: 4 }) + circ(hx, hy, r, C.skin) + face(e, hx, K.eye - lift, K.mouth - lift, a.c === 'jeff' || a.c === 'erin' || a.c === 'rivera' ? 0.9 : 1, { blush: a.blush || a.c === 'erin' });
    if (a.stache) head += shape([[hx - 4, K.mouth - lift - 14], [hx - 34, K.mouth - lift - 4], [hx - 40, K.mouth - lift - 16], [hx + 6, K.mouth - lift - 22], [hx + 52, K.mouth - lift - 16], [hx + 46, K.mouth - lift - 4], [hx + 16, K.mouth - lift - 14]], '#3a2414', { sharp: false });
  }
  head += hairFront(a.c, r, hx, hy, e, a);
  front += ra.svg;
  if (a.hold) front += prop(a.hold, ra.at[0], ra.at[1], 1, P.R);
  if (a.hold2) front += prop(a.hold2, la.at[0], la.at[1], 1, P.L);
  const all = back + body + head + front;
  return { svg: all, top: headY - r - 20, hands: [ra.at, la.at] };
}

// ------------------------------------------------------------------ Mochi the Shiba (also in parts, for "how to draw")
export function mochiParts(e = 'happy', p = 'stand') {
  const O = '#ee9a4a', W = '#fff4e0', run = p === 'run', jump = p === 'jump', sit = p === 'sit', lift = jump ? 30 : 0;
  const hx = 34, hy = -92 - lift + (sit ? -6 : 0), bx = -22, by = -44 - lift;
  return [
    () => circ(hx, hy, 38, O),   // 1 head
    () => poly([[hx - 30, hy - 18], [hx - 26, hy - 62], [hx - 4, hy - 34]], O, { w: 4.5 }) + poly([[hx + 30, hy - 18], [hx + 26, hy - 62], [hx + 4, hy - 34]], O, { w: 4.5 }) + poly([[hx - 24, hy - 30], [hx - 22, hy - 50], [hx - 12, hy - 34]], C.pink, { w: 0 }) + poly([[hx + 24, hy - 30], [hx + 22, hy - 50], [hx + 12, hy - 34]], C.pink, { w: 0 }),   // 2 ears
    () => oval(hx + 6, hy + 16, 26, 17, W) + oval(hx + 8, hy + 4, 7, 5, INK, { w: 0 }) + face(e === 'happy' ? 'yum' : e, hx - 4, hy - 12, hy + 18, 0.7),   // 3 face
    () => (sit ? oval(bx + 8, by - 6, 34, 40, O) : oval(bx, by, 50, 30, O)) + (sit ? oval(bx + 20, by + 2, 16, 24, W, { w: 0 }) : oval(bx + 12, by + 10, 28, 12, W, { w: 0 })),   // 4 body
    () => [[-56, run ? -40 : 4, sit ? 0 : 1], [-34, run ? 30 : -4, 1], [0, run ? 40 : 4, 1], [16, run ? -30 : -4, 1]].map(([x, a, on]) => on ? tube([[bx + x + 30, by + 14], [bx + x + 30 + Math.sin(a * Math.PI / 180) * 30, by + 14 + Math.cos(a * Math.PI / 180) * 30]], O, 13) : '').join(''),   // 5 legs
    () => line(Array.from({ length: 9 }, (_, i) => [bx - 46 + Math.cos(i * 0.75) * (16 - i), by - 28 + Math.sin(i * 0.75) * (16 - i)]), { w: 13, ink: INK, j: 0 }) + line(Array.from({ length: 9 }, (_, i) => [bx - 46 + Math.cos(i * 0.75) * (16 - i), by - 28 + Math.sin(i * 0.75) * (16 - i)]), { w: 6, ink: O, j: 0 }),   // 6 tail
  ];
}
function mochi(a) {
  const parts = mochiParts(a.e || 'happy', a.p || 'stand'), order = [5, 4, 3, 0, 1, 2];
  let s = order.map((i) => parts[i]()).join('');
  if (a.stache) s += shape([[30, -76], [6, -68], [2, -80], [34, -86], [66, -80], [62, -68], [38, -76]], '#3a2414', { sharp: false });
  return { svg: s, top: -170, hands: [[70, -60], [70, -60]] };
}

// ------------------------------------------------------------------ villains and machines
function sockzilla(a) {
  const e = a.e || 'evil', S = '#f4f0e6', st = C.red;
  let s = shape([[-60, -420], [60, -420], [64, -150], [150, -120], [176, -60], [150, -4], [-20, -2], [-64, -40]], S, { sharp: false });
  for (let i = 0; i < 3; i++) s += rect(-62, -410 + i * 34, 124, 16, i % 2 ? C.blue : st, { w: 3, r: 2 });
  s += rect(-70, -440, 140, 34, S, { r: 10 });
  s += circ(-22, -300, 26, C.white, { w: 4.5 }) + circ(-16, -296, 10, INK, { w: 0 }) + circ(30, -306, 30, C.white, { w: 4.5 }) + circ(38, -300, 11, INK, { w: 0 });
  if (e === 'evil' || e === 'angry') s += line([[-46, -336], [-4, -322]], { w: 6 }) + line([[66, -342], [16, -326]], { w: 6 });
  if (e === 'dizzy') s += marks.stars(4, -360);
  s += shape([[-40, -246], [56, -246], [40, -196], [-26, -196]], '#7a1c2a', { sharp: false });
  for (let i = 0; i < 5; i++) s += poly([[-34 + i * 18, -246], [-26 + i * 18, -228], [-18 + i * 18, -246]], C.white, { w: 3 });
  s += oval(80, -60, 14, 10, '#c9c2b0', { w: 3 }) + oval(10, -40, 18, 12, '#c9c2b0', { w: 3 });   // holes
  if (e !== 'clean') s += marks.stink(-90, -330, 2) + marks.stink(96, -300, 2) + marks.stink(150, -150, 2);
  else s += marks.shine(-80, -360) + marks.shine(90, -380);
  // little sock arms
  s += tube([[-58, -200], [-110, -230], [-130, -290]], S, 22) + tube([[60, -200], [110, -240], [140, -290]], S, 22);
  return { svg: s, top: -450, hands: [[140, -290], [-130, -290]] };
}
function robobroom(a) {
  const e = a.e || 'happy', crazy = e === 'evil' || e === 'angry' || e === 'dizzy';
  let s = rect(-50, -110, 100, 80, '#c9d4e0', { r: 8 }) + circ(-30, -18, 20, INK, { w: 0 }) + circ(30, -18, 20, INK, { w: 0 }) + circ(-30, -18, 8, C.gray, { w: 3 }) + circ(30, -18, 8, C.gray, { w: 3 });
  s += rect(-42, -200, 84, 80, '#dfe7f0', { r: 10 }) + rect(-30, -186, 60, 36, crazy ? '#ff5a4a' : '#7ff0c0', { r: 4 });
  s += crazy ? line([[-22, -176], [-8, -164]], { w: 4 }) + line([[22, -176], [8, -164]], { w: 4 }) + line([[-16, -158], [-8, -164], [0, -158], [8, -164], [16, -158]], { w: 3 }) : circ(-12, -170, 5, INK, { w: 0 }) + circ(12, -170, 5, INK, { w: 0 }) + line([[-10, -160], [0, -156], [10, -160]], { w: 3 });
  s += line([[0, -200], [0, -228]], { w: 4 }) + circ(0, -234, 8, crazy ? C.red : C.yellow, { w: 3.5 });
  const arm = (x, dir) => tube([[x, -90], [x + dir * 40, -110], [x + dir * 60, -150]], C.gray, 10) + rect(x + dir * 60 - 6, -230, 12, 84, C.brown, { r: 3 }) + poly([[x + dir * 60 - 22, -240], [x + dir * 60 + 22, -240], [x + dir * 60 + 10, -270], [x + dir * 60 - 10, -270]], C.yellow, { w: 4 });
  s += arm(-50, -1) + arm(50, 1);
  if (crazy) s += marks.bang(0, -262) + marks.speed(-90, -120, 40, 3, -1);
  return { svg: s, top: -280, hands: [[110, -150], [-110, -150]] };
}
function washer(a) {
  const e = a.e || 'happy';
  let s = rect(-110, -260, 220, 260, '#f4f6fa', { r: 14 }) + rect(-110, -260, 220, 50, '#d9e0ea', { r: 10 }) + circ(-70, -236, 10, C.red, { w: 3 }) + circ(-40, -236, 10, C.green, { w: 3 });
  s += circ(0, -110, 76, '#bfe0ff') + circ(0, -110, 56, '#8cc8ff', { w: 4 });
  if (a.spin) s += line(Array.from({ length: 12 }, (_, i) => [Math.cos(i * 0.6) * (10 + i * 3.5), -110 + Math.sin(i * 0.6) * (10 + i * 3.5)]), { w: 4, ink: '#3a6ad0', j: 0 });
  s += face(e, 0, -200 + 0, -176, 0.8);
  return { svg: s, top: -270, hands: [[110, -120], [-110, -120]] };
}
function pencil(a) {   // the giant pencil (it has a face, it is a comic)
  let s = rect(-36, -420, 72, 330, C.yellow, { r: 2 }) + line([[-12, -410], [-12, -100]], { w: 3 }) + line([[12, -410], [12, -100]], { w: 3 });
  s += rect(-36, -470, 72, 50, C.pink, { r: 14 }) + rect(-38, -430, 76, 22, '#c8ccd4', { r: 2 });
  s += poly([[-36, -90], [36, -90], [0, 0]], '#f2d2a0', { w: 4.5 }) + poly([[-12, -30], [12, -30], [0, 0]], INK, { w: 0 });
  s += face(a.e || 'proud', 0, -300, -268, 0.8);
  return { svg: s, top: -480, hands: [[40, -250], [-40, -250]] };
}
const DRAW = { josh: person, jasper: person, jeff: person, erin: person, rivera: person, coach: person, eraser: person, mochi, sockzilla, robobroom, washer, pencil };

export function draw(a) {
  if (a.c === 'washer' && a.spin === undefined) a = { ...a };
  const fn = DRAW[a.c]; if (!fn) return { svg: '', top: 0 };
  const L = LOOK[a.c], s = (a.s || 1) * (L ? L.k : 1), P = POSES[a.p] || {}, lean = (a.r || 0) + (P.lean || 0);
  const out = fn(a);
  return { svg: g(out.svg, a.x, a.y, s, !!a.f, a.f ? -lean : lean), top: a.y + out.top * s, x: a.x, s };
}

// ------------------------------------------------------------------ things people hold, and things in the world
export function prop(kind, x, y, s = 1, ang = 0, o = {}) {
  const k = (inner, rot = 0) => g(inner, x, y, s, !!o.f, rot);
  switch (kind) {
    case 'marker': { const c = o.color || C.red; return k(rect(-9, -60, 18, 64, '#ffffff', { r: 5 }) + rect(-10, -76, 20, 22, c, { r: 6 }) + poly([[-7, 4], [7, 4], [0, 20]], c, { w: 3.5 }) + rect(-9, -40, 18, 10, c, { w: 2.5, r: 1 }), ang - 180 + 90); }
    case 'markers': return k([C.red, C.blue, C.green, C.yellow, C.purple].map((c, i) => rect(-60 + i * 24, -86, 18, 64, c, { r: 5 }) + rect(-60 + i * 24, -96, 18, 16, '#ffffff', { r: 4 })).join('') + rect(-74, -40, 148, 44, '#ffcf3d', { r: 6 }) + txt(o.label || 'MIGHTY', 0, -10, { size: 22, cls: 'sfx', fill: C.red, stroke: INK, sw: 4 }));
    case 'pancakes': return k(oval(0, 0, 80, 16, '#ffffff') + [0, 1, 2, 3].map((i) => oval(0, -14 - i * 16, 62, 14, C.tan)).join('') + rect(-18, -88, 36, 14, '#ffe68a', { r: 4 }) + shape([[-50, -76], [-30, -60], [-46, -34], [-20, -40]], '#b8641e', { w: 0, sharp: false, op: 0.85 }));
    case 'broom': return k(rect(-5, -90, 10, 110, C.brown, { r: 3 }) + poly([[-24, 20], [24, 20], [34, 70], [-34, 70]], C.yellow, { w: 4 }), ang - 180);
    case 'sock': return k(shape([[-14, -40], [14, -40], [16, 4], [40, 12], [36, 30], [-14, 26]], o.color || '#f4f0e6', { sharp: false }) + rect(-16, -46, 32, 12, C.red, { w: 3, r: 2 }) + (o.stink ? marks.stink(-10, -56, 2) : ''), o.rot || 0);
    case 'socks': return k(Array.from({ length: 9 }, (_, i) => prop('sock', -110 + (i % 5) * 55 + rand(-8, 8), -10 - Math.floor(i / 5) * 40, 1, 0, { rot: rand(-60, 60), color: ['#f4f0e6', C.lblue, '#ffe68a', C.pink][i % 4] })).join('') + marks.stink(-60, -80, 4));
    case 'ball': return k(circ(0, 0, 18, '#ffffff') + line([[-10, -14], [-6, 0], [-10, 14]], { w: 2.5, ink: C.red }) + line([[10, -14], [6, 0], [10, 14]], { w: 2.5, ink: C.red }));
    case 'paper': return k(rect(-50, -66, 100, 76, '#ffffff', { r: 2 }) + (o.doodle || line([[-30, -20], [-10, -40], [10, -20], [30, -44]], { w: 3, ink: C.blue })), -6);
    case 'box': return k(rect(-80, -90, 160, 90, '#d9a65e', { r: 3 }) + line([[-80, -60], [80, -60]], { w: 3 }) + rect(-20, -96, 40, 14, '#f2e2b0', { w: 3, r: 2 }) + (o.label ? txt(o.label, 0, -24, { size: 22, cls: 'hand', fill: INK }) : ''));
    case 'blaster': return k(rect(-6, -18, 70, 28, C.purple, { r: 8 }) + rect(52, -26, 40, 44, C.pink, { r: 10 }) + rect(-2, 4, 18, 30, '#3a2f5a', { r: 4 }), ang - 90);
    case 'eraserbit': return k(Array.from({ length: 6 }, (_, i) => oval(rand(-40, 40), rand(-20, 0), 9, 5, C.pink, { w: 2.5, rot: rand(0, 3) })).join(''));
    case 'cookie': return k(circ(0, 0, 20, C.tan) + [[-6, -6], [8, -2], [-2, 8]].map(([a, b]) => circ(a, b, 3.5, C.dbrown, { w: 0 })).join(''));
    case 'trophy': return k(poly([[-40, -120], [40, -120], [30, -60], [-30, -60]], C.yellow, { w: 4.5 }) + rect(-8, -60, 16, 30, C.yellow, { r: 2 }) + rect(-34, -32, 68, 22, C.brown, { r: 4 }) + marks.shine(48, -120));
    case 'book': return k(rect(-40, -54, 80, 60, C.red, { r: 4 }) + rect(-32, -48, 64, 10, '#ffffff', { w: 0, r: 2 }) + txt(o.label || '', 0, -16, { size: 15, cls: 'hand', fill: '#ffffff' }), -8);
    case 'spatula': return k(rect(-4, -10, 8, 70, C.dgray, { r: 3 }) + rect(-20, 56, 40, 40, C.gray, { r: 4 }), ang - 180);
    case 'phone': return k(rect(-16, -30, 32, 56, '#2a2a33', { r: 6 }) + rect(-11, -24, 22, 40, '#7fd0ff', { w: 0, r: 2 }));
    case 'clipboard': return k(rect(-34, -50, 68, 86, C.brown, { r: 4 }) + rect(-26, -40, 52, 70, '#ffffff', { w: 2.5, r: 2 }) + [0, 1, 2].map((i) => line([[-18, -26 + i * 16], [18, -26 + i * 16]], { w: 2.5 })).join(''), -6);
    case 'whistle': return k(circ(0, 0, 10, C.gray, { w: 3 }));
    default: return '';
  }
}
