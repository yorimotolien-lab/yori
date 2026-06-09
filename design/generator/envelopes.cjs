// =============================================================================
//  LIEN envelope layouts  —  角2号 (240x332) and 長形3号 (120x235), millimetres.
//  Each concept renders either a print master (bleed, brand only) or a mockup
//  (no bleed, with a light addressing-area guide for presentation).
// =============================================================================

const B = require('./brand.cjs');
const { f, PALETTE: P, MIX, SANS } = B;

const SENDER = {
  name: '株式会社LIEN',
  zip: '〒272-0114',
  addr: '千葉県市川市塩焼3-20-6',
  tel: 'TEL 047-307-9287',
  fax: 'FAX 047-307-9288',
};

function frame(W, H, body, bleed = 0, paper = P.PAPER) {
  const vw = W + bleed * 2, vh = H + bleed * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${f(vw)}mm" height="${f(vh)}mm" viewBox="${f(-bleed)} ${f(-bleed)} ${f(vw)} ${f(vh)}">`
    + `<rect x="${f(-bleed)}" y="${f(-bleed)}" width="${f(vw)}" height="${f(vh)}" fill="${paper}"/>`
    + body + `</svg>`;
}

// light placeholder showing where the recipient address / stamp will go
function recipient(W, H) {
  const x = W * 0.165; let y = H * 0.30;
  const c = '#CBC7BE', lh = W * 0.052, fz = W * 0.030, big = W * 0.040;
  let s = `<g fill="${c}" font-family="${MIX}" font-weight="400">`;
  s += `<text x="${f(x)}" y="${f(y)}" font-size="${f(fz)}">〒123-4567</text>`; y += lh;
  s += `<text x="${f(x)}" y="${f(y)}" font-size="${f(fz)}">東京都千代田区丸の内1-2-3</text>`; y += lh * 0.92;
  s += `<text x="${f(x)}" y="${f(y)}" font-size="${f(fz)}">〇〇ビル 4階</text>`; y += lh * 1.25;
  s += `<text x="${f(x)}" y="${f(y)}" font-size="${f(fz)}">株式会社 〇〇〇〇〇〇　〇〇部</text>`; y += lh * 1.25;
  s += `<text x="${f(x + W * 0.04)}" y="${f(y)}" font-size="${f(big)}" letter-spacing="${f(big * 0.12)}">氏名　氏名　様</text>`;
  return s + `</g>`;
}
function stampBox(W, H) {
  const w = W * 0.105, h = w * 1.32, x = W - W * 0.058 - w, y = H * 0.055;
  return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${f(W * 0.006)}" fill="none" stroke="#DCD8CE" stroke-width="${f(W * 0.0025)}"/>`;
}

function senderLines(x, y, W, anchor, color, opts = {}) {
  const nameF = opts.nameF || W * 0.036, bodyF = opts.bodyF || W * 0.025, lh = opts.lh || W * 0.040;
  let s = '', yy = y;
  s += `<text x="${f(x)}" y="${f(yy)}" text-anchor="${anchor}" font-family="${MIX}" font-size="${f(nameF)}" letter-spacing="${f(nameF * 0.06)}" font-weight="700" fill="${color}">${SENDER.name}</text>`; yy += lh * 1.05;
  s += `<text x="${f(x)}" y="${f(yy)}" text-anchor="${anchor}" font-family="${MIX}" font-size="${f(bodyF)}" fill="${color}">${SENDER.zip}　${SENDER.addr}</text>`; yy += lh * 0.82;
  s += `<text x="${f(x)}" y="${f(yy)}" text-anchor="${anchor}" font-family="${SANS}" font-size="${f(bodyF)}" letter-spacing="0.3" fill="${color}">${SENDER.tel}　${SENDER.fax}</text>`;
  return s;
}

// ---- Concept A : minimal hairline footer -----------------------------------
function conceptA(W, H, { bleed = 0, mockup = false } = {}) {
  const M = W * 0.058; let b = '';
  if (mockup) { b += stampBox(W, H); b += recipient(W, H); }
  const footH = H * 0.118, ruleY = H - M - footH;
  b += `<line x1="${f(M)}" y1="${f(ruleY)}" x2="${f(W - M)}" y2="${f(ruleY)}" stroke="${P.BRASS}" stroke-width="${f(W * 0.0025)}"/>`;
  const markH = W * 0.082, logoY = ruleY + (footH - markH) / 2 + footH * 0.04;
  b += B.logoLockup(M, logoY, markH, { variant: 'color' });
  b += senderLines(W - M, ruleY + footH * 0.42, W, 'end', P.INK, { nameF: W * 0.036, bodyF: W * 0.025, lh: W * 0.040 });
  return frame(W, H, b, bleed);
}

// ---- Concept B : dark footer band ------------------------------------------
function conceptB(W, H, { bleed = 0, mockup = false } = {}) {
  const M = W * 0.058; let b = '';
  if (mockup) { b += stampBox(W, H); b += recipient(W, H); }
  const bandH = H * 0.150, by = H - bandH;
  b += `<rect x="${f(-bleed)}" y="${f(by)}" width="${f(W + bleed * 2)}" height="${f(bandH + bleed)}" fill="${P.INK}"/>`;
  b += `<rect x="${f(-bleed)}" y="${f(by)}" width="${f(W + bleed * 2)}" height="${f(W * 0.004)}" fill="${P.BRASS}"/>`;
  const markH = W * 0.088, logoY = by + (bandH - markH) / 2;
  b += B.logoLockup(M, logoY, markH, { variant: 'ko' });
  b += senderLines(W - M, by + bandH * 0.40, W, 'end', '#FFFFFF', { nameF: W * 0.036, bodyF: W * 0.025, lh: W * 0.040 });
  return frame(W, H, b, bleed);
}

// ---- Concept C : architectural L-spine -------------------------------------
function conceptC(W, H, { bleed = 0, mockup = false } = {}) {
  const M = W * 0.058; let b = '';
  const spineW = W * 0.052, bandH = H * 0.140, by = H - bandH;
  b += `<rect x="${f(-bleed)}" y="${f(-bleed)}" width="${f(spineW + bleed)}" height="${f(by + bandH + bleed * 2)}" fill="${P.INK}"/>`;
  b += `<rect x="${f(-bleed)}" y="${f(by)}" width="${f(W + bleed * 2)}" height="${f(bandH + bleed)}" fill="${P.INK}"/>`;
  const gap = spineW + W * 0.018;
  b += `<line x1="${f(gap)}" y1="${f(M * 0.7)}" x2="${f(gap)}" y2="${f(by - W * 0.018)}" stroke="${P.BRASS}" stroke-width="${f(W * 0.0022)}"/>`;
  b += `<rect x="${f(-bleed)}" y="${f(by)}" width="${f(W + bleed * 2)}" height="${f(W * 0.004)}" fill="${P.BRASS}"/>`;
  const cmH = spineW * 0.78;
  b += B.markGroup(cmH, (spineW - cmH) / 2, M * 0.7, { ko: true });
  if (mockup) { b += recipient(W, H); b += stampBox(W, H); }
  const markH = W * 0.086, logoY = by + (bandH - markH) / 2;
  b += B.logoLockup(spineW + W * 0.03, logoY, markH, { variant: 'ko' });
  b += senderLines(W - M, by + bandH * 0.40, W, 'end', '#FFFFFF', { nameF: W * 0.036, bodyF: W * 0.025, lh: W * 0.040 });
  return frame(W, H, b, bleed);
}

const CONCEPTS = { A: { name: 'line', fn: conceptA }, B: { name: 'band', fn: conceptB }, C: { name: 'spine', fn: conceptC } };
const SIZES = { kaku2: { W: 240, H: 332, label: '角2号 (240 × 332 mm)' }, chokei3: { W: 120, H: 235, label: '長形3号 (120 × 235 mm)' } };

module.exports = { CONCEPTS, SIZES, SENDER };
