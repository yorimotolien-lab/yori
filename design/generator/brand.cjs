// =============================================================================
//  LIEN brand toolkit  —  geometry, logo lockups and envelope composition.
//  Pure string builders (no dependencies); units are millimetres for print.
// =============================================================================

const f = (n) => Number(n.toFixed(3));

// ---- palette ----------------------------------------------------------------
const PALETTE = {
  INK: '#16181D',        // near-black, cool
  CHARCOAL: '#23272E',
  STEEL: '#5C636D',
  // navy identity — accent + cube faces (light top / mid / deep)
  NAVY: '#223A5C',       // primary accent (footer band, rules)
  NAVY_DEEP: '#19293F',  // cube right face
  NAVY_MID: '#3C5275',   // cube left face
  NAVY_TOP: '#D8DCE3',   // cube top face (cool light)
  STEEL_L: '#C7D0DC',    // light steel — inlaid "L" + hairline on navy
  FACE_TOP: '#DCDFE3',   // (legacy grayscale faces, kept for reference)
  FACE_LEFT: '#5C636D',
  FACE_RIGHT: '#272B32',
  BRASS: '#B0894A',      // (alternative accent, unused in navy scheme)
  PAPER: '#FAF9F5',      // warm off-white stock
};

const JP = 'IPAPGothic, IPAGothic, "Noto Sans JP", sans-serif';
const SANS = 'Liberation Sans, Arial, sans-serif';
const MIX = 'Liberation Sans, IPAPGothic, IPAGothic, sans-serif';

// ---- isometric cube ---------------------------------------------------------
// cx,cy = centre (near corner); s = distance centre -> top vertex.
function cube(cx, cy, s) {
  const w = s * Math.cos(Math.PI / 6);
  const T = [cx, cy - s], UR = [cx + w, cy - s / 2], LR = [cx + w, cy + s / 2];
  const B = [cx, cy + s], LL = [cx - w, cy + s / 2], UL = [cx - w, cy - s / 2];
  const C = [cx, cy];
  const P = (p) => `${f(p[0])},${f(p[1])}`;
  const poly = (...pts) => `M${pts.map(P).join(' L')} Z`;
  return { pts: { T, UR, LR, B, LL, UL, C }, top: poly(T, UR, C, UL), right: poly(C, UR, LR, B), left: poly(C, UL, LL, B), w };
}

// ---- geometric capitals (custom letterforms for the wordmark) ---------------
const rect = (x, y, w, h) => `M${f(x)},${f(y)} h${f(w)} v${f(h)} h${f(-w)} Z`;
function glyph(ch, x, y, H, t) {
  const parts = [];
  if (ch === 'L') { const W = H * 0.66; parts.push(rect(x, y, t, H), rect(x, y + H - t, W, t)); return { parts, w: W }; }
  if (ch === 'I') { parts.push(rect(x, y, t, H)); return { parts, w: t }; }
  if (ch === 'E') {
    const W = H * 0.64;
    parts.push(rect(x, y, t, H), rect(x, y, W, t), rect(x, y + (H - t) / 2, W * 0.86, t), rect(x, y + H - t, W, t));
    return { parts, w: W };
  }
  if (ch === 'N') {
    const W = H * 0.74;
    parts.push(rect(x, y, t, H), rect(x + W - t, y, t, H));
    const x1 = x + t, x2 = x + W - t, dx = t * 0.86;
    parts.push(`M${f(x1)},${f(y)} L${f(x1 + dx)},${f(y)} L${f(x2)},${f(y + H)} L${f(x2 - dx)},${f(y + H)} L${f(x1)},${f(y + t * 1.15)} Z`);
    return { parts, w: W };
  }
  return { parts, w: H * 0.6 };
}
function word(str, x, y, H, t, tracking) {
  let cx = x; const parts = [];
  for (const ch of str) { if (ch === ' ') { cx += H * 0.4; continue; } const g = glyph(ch, cx, y, H, t); parts.push(...g.parts); cx += g.w + tracking; }
  return { d: parts.join(' '), w: cx - tracking - x };
}
function wordWidth(str, H, t, tracking) {
  let cx = 0;
  for (const ch of str) { if (ch === ' ') { cx += H * 0.4; continue; } cx += glyph(ch, 0, 0, H, t).w + tracking; }
  return cx - tracking;
}
const tagWidth = (str, F, ls) => str.length * (0.66 * F + ls) - ls;

// ---- cube mark as positioned <g> -------------------------------------------
function markGroup(size, x, y, { mono = false, ko = false } = {}) {
  const c = cube(size / 2, size / 2, size * 0.43);
  const sw = size * 0.022;
  let topF, leftF, rightF, stroke, ac;
  if (ko) { topF = '#FFFFFF'; leftF = 'rgba(255,255,255,0.78)'; rightF = 'rgba(255,255,255,0.58)'; stroke = '#FFFFFF'; ac = PALETTE.NAVY; }
  else if (mono) { topF = leftF = rightF = 'none'; stroke = '#000'; ac = '#000'; }
  else { topF = PALETTE.NAVY_TOP; leftF = PALETTE.NAVY_MID; rightF = PALETTE.NAVY_DEEP; stroke = PALETTE.INK; ac = PALETTE.STEEL_L; }
  const p = c.pts, lj = 'stroke-linejoin="round"';
  let g = `<g transform="translate(${f(x)},${f(y)})">`;
  g += `<path d="${c.top}" fill="${topF}" stroke="${stroke}" stroke-width="${f(sw)}" ${lj}/>`;
  g += `<path d="${c.left}" fill="${leftF}" stroke="${stroke}" stroke-width="${f(sw)}" ${lj}/>`;
  g += `<path d="${c.right}" fill="${rightF}" stroke="${stroke}" stroke-width="${f(sw)}" ${lj}/>`;
  g += `<path d="M${f(p.C[0])},${f(p.C[1])} L${f(p.B[0])},${f(p.B[1])}" stroke="${stroke}" stroke-width="${f(sw)}"/>`;
  // inlaid "L" (LIEN initial + structural joint) on the dark right face
  const u = [p.UR[0] - p.C[0], p.UR[1] - p.C[1]], v = [p.B[0] - p.C[0], p.B[1] - p.C[1]];
  const Q = (a, b) => [p.C[0] + a * u[0] + b * v[0], p.C[1] + a * u[1] + b * v[1]];
  const L1 = Q(0.22, 0.14), L2 = Q(0.22, 0.84), L3 = Q(0.66, 0.84);
  g += `<path d="M${f(L1[0])},${f(L1[1])} L${f(L2[0])},${f(L2[1])} L${f(L3[0])},${f(L3[1])}" fill="none" stroke="${ac}" stroke-width="${f(sw * 2.4)}" stroke-linecap="square"/>`;
  return g + `</g>`;
}

// ---- logo lockup (mark + LIEN + CONSTRUCTION) as positioned <g> -------------
function logoLockup(x, y, markH, { variant = 'color', tag = true } = {}) {
  const mono = variant === 'mono', ko = variant === 'ko';
  let g = `<g>` + markGroup(markH, x, y, { mono, ko });
  const H = markH * 0.40, t = H * 0.215, tracking = H * 0.17;
  const tagF = H * 0.34, tagLS = tagF * 0.44, gapx = markH * 0.16;
  const tx = x + markH + gapx;
  const blockH = tag ? H + H * 0.42 + tagF : H;
  const lienY = y + (markH - blockH) / 2;
  const ink = ko ? '#FFFFFF' : (mono ? '#000' : PALETTE.INK);
  g += `<path d="${word('LIEN', tx, 0, H, t, tracking).d}" transform="translate(0,${f(lienY)})" fill="${ink}"/>`;
  if (tag) {
    const tagY = lienY + H + H * 0.40;
    g += `<text x="${f(tx + 1)}" y="${f(tagY + tagF * 0.82)}" font-family="${SANS}" font-size="${f(tagF)}" letter-spacing="${f(tagLS)}" fill="${ink}" font-weight="500">CONSTRUCTION</text>`;
  }
  return g + `</g>`;
}

// ---- standalone logo files --------------------------------------------------
function verticalLogo({ w = 600, variant = 'color' } = {}) {
  const mono = variant === 'mono', ko = variant === 'ko';
  const pad = w * 0.06, markSize = w * 0.60, H = w * 0.205, t = H * 0.215, tracking = H * 0.17;
  const lienW = wordWidth('LIEN', H, t, tracking);
  const tagF = w * 0.072, tagLS = tagF * 0.40, tW = tagWidth('CONSTRUCTION', tagF, tagLS);
  const contentW = Math.max(markSize, lienW, tW), totalW = contentW + pad * 2, cx = totalW / 2;
  const markY = pad, lienY = markY + markSize + w * 0.025, tagY = lienY + H + w * 0.05, totalH = tagY + tagF + pad;
  const ink = ko ? '#FFFFFF' : (mono ? '#000' : PALETTE.INK);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(totalW)} ${f(totalH)}">`;
  if (ko) s += `<rect width="${f(totalW)}" height="${f(totalH)}" fill="${PALETTE.NAVY}"/>`;
  s += markGroup(markSize, cx - markSize / 2, markY, { mono, ko });
  s += `<path d="${word('LIEN', cx - lienW / 2, 0, H, t, tracking).d}" transform="translate(0,${f(lienY)})" fill="${ink}"/>`;
  s += `<text x="${f(cx)}" y="${f(tagY + tagF * 0.82)}" font-family="${SANS}" font-size="${f(tagF)}" letter-spacing="${f(tagLS)}" text-anchor="middle" fill="${ink}" font-weight="500">CONSTRUCTION</text>`;
  return s + `</svg>`;
}
function horizontalLogo({ w = 900, variant = 'color' } = {}) {
  const mono = variant === 'mono', ko = variant === 'ko';
  const pad = w * 0.035, markSize = w * 0.26, H = markSize * 0.46, t = H * 0.215, tracking = H * 0.17;
  const lienW = wordWidth('LIEN', H, t, tracking);
  const tagF = H * 0.34, tagLS = tagF * 0.46, tW = tagWidth('CONSTRUCTION', tagF, tagLS);
  const textW = Math.max(lienW, tW), gapx = w * 0.03;
  const totalW = pad * 2 + markSize + gapx + textW, totalH = markSize + pad * 2;
  const tx = pad + markSize + gapx, blockH = H + H * 0.34 + tagF;
  const lienY = pad + (markSize - blockH) / 2, tagY = lienY + H + H * 0.30;
  const ink = ko ? '#FFFFFF' : (mono ? '#000' : PALETTE.INK);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(totalW)} ${f(totalH)}">`;
  if (ko) s += `<rect width="${f(totalW)}" height="${f(totalH)}" fill="${PALETTE.NAVY}"/>`;
  s += markGroup(markSize, pad, pad, { mono, ko });
  s += `<path d="${word('LIEN', tx, 0, H, t, tracking).d}" transform="translate(0,${f(lienY)})" fill="${ink}"/>`;
  s += `<text x="${f(tx)}" y="${f(tagY + tagF * 0.82)}" font-family="${SANS}" font-size="${f(tagF)}" letter-spacing="${f(tagLS)}" fill="${ink}" font-weight="500">CONSTRUCTION</text>`;
  return s + `</svg>`;
}
function markOnly({ w = 400, variant = 'color' } = {}) {
  const mono = variant === 'mono', ko = variant === 'ko';
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${w}">`;
  if (ko) s += `<rect width="${w}" height="${w}" fill="${PALETTE.NAVY}"/>`;
  return s + markGroup(w * 0.86, w * 0.07, w * 0.07, { mono, ko }) + `</svg>`;
}

module.exports = {
  f, PALETTE, JP, SANS, MIX, cube, word, wordWidth, tagWidth,
  markGroup, logoLockup, verticalLogo, horizontalLogo, markOnly,
};
