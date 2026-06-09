// =============================================================================
//  LIEN envelope layouts  —  角2号 (240x332) and 長形3号 (120x235), millimetres.
//  Uses the actual LIEN CONSTRUCTION logo (design/logo/lien-master.png),
//  placed on the paper; the navy footer band carries the sender details.
//  Print master = bleed + brand only; mockup = addressing-area guide.
// =============================================================================

const fs = require('fs');
const path = require('path');
const B = require('./brand.cjs');
const { f, PALETTE: P, MIX, SANS } = B;

const SENDER = {
  name: '株式会社LIEN',
  zip: '〒272-0114',
  addr: '千葉県市川市塩焼3-20-6',
  tel: 'TEL 047-307-9287',
  fax: 'FAX 047-307-9288',
  web: 'Webサイト：https://lien-2020.com/',
  webShort: 'Web  lien-2020.com',
  license: '建設業許可　千葉県知事許可（般）第57419号',
  licenseShort: '千葉県知事許可（般）第57419号',
};

// embedded real logo (transparent, trimmed)
const LOGO_PATH = path.join(__dirname, '..', 'logo', 'lien-master.png');
const LOGO_URI = 'data:image/png;base64,' + fs.readFileSync(LOGO_PATH).toString('base64');
const LOGO_AR = 1692 / 1934; // width / height
function logoImg(x, y, w) {
  const h = w / LOGO_AR;
  return `<image x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" xlink:href="${LOGO_URI}"/>`;
}

function frame(W, H, body, bleed = 0, paper = P.PAPER) {
  const vw = W + bleed * 2, vh = H + bleed * 2;
  const bg = (paper && paper !== 'none')
    ? `<rect x="${f(-bleed)}" y="${f(-bleed)}" width="${f(vw)}" height="${f(vh)}" fill="${paper}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${f(vw)}mm" height="${f(vh)}mm" viewBox="${f(-bleed)} ${f(-bleed)} ${f(vw)} ${f(vh)}">`
    + bg + body + `</svg>`;
}

// light placeholder: postal code at the top, recipient name/address centred
function recipient(W, H) {
  const x = W * 0.165;
  const c = '#CBC7BE', lh = W * 0.054, fz = W * 0.030, big = W * 0.040;
  let s = `<g fill="${c}" font-family="${MIX}" font-weight="400">`;
  // 郵便番号 — top
  s += `<text x="${f(x)}" y="${f(H * 0.12)}" font-size="${f(fz)}" letter-spacing="0.3">〒123-4567</text>`;
  // 宛名 — centre
  let y = H * 0.42;
  s += `<text x="${f(x)}" y="${f(y)}" font-size="${f(fz)}">東京都千代田区丸の内1-2-3</text>`; y += lh;
  s += `<text x="${f(x)}" y="${f(y)}" font-size="${f(fz)}">〇〇ビル 4階</text>`; y += lh * 1.5;
  s += `<text x="${f(x)}" y="${f(y)}" font-size="${f(fz)}">株式会社 〇〇〇〇〇〇　〇〇部</text>`; y += lh * 1.45;
  s += `<text x="${f(x + W * 0.04)}" y="${f(y)}" font-size="${f(big)}" letter-spacing="${f(big * 0.12)}">氏名　氏名　様</text>`;
  return s + `</g>`;
}
function stampBox(W, H) {
  const w = W * 0.105, h = w * 1.32, x = W - W * 0.058 - w, y = H * 0.055;
  return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${f(W * 0.006)}" fill="none" stroke="#DCD8CE" stroke-width="${f(W * 0.0025)}"/>`;
}

// three-row sender block: name | TEL·FAX / address | website / licence
function senderBand(xL, xR, yc, color, W) {
  const nameF = W * 0.034, bodyF = W * 0.022, smallF = W * 0.020, lg = W * 0.042;
  const o = bodyF * 0.32, y1 = yc - lg + o, y2 = yc + o, y3 = yc + lg + o;
  let s = '';
  s += `<text x="${f(xL)}" y="${f(y1)}" font-family="${MIX}" font-size="${f(nameF)}" letter-spacing="${f(nameF * 0.06)}" font-weight="700" fill="${color}">${SENDER.name}</text>`;
  s += `<text x="${f(xR)}" y="${f(y1)}" text-anchor="end" font-family="${SANS}" font-size="${f(bodyF)}" letter-spacing="0.3" fill="${color}">${SENDER.tel}　${SENDER.fax}</text>`;
  s += `<text x="${f(xL)}" y="${f(y2)}" font-family="${MIX}" font-size="${f(bodyF)}" fill="${color}">${SENDER.zip}　${SENDER.addr}</text>`;
  s += `<text x="${f(xR)}" y="${f(y2)}" text-anchor="end" font-family="${MIX}" font-size="${f(bodyF)}" fill="${color}">${SENDER.web}</text>`;
  s += `<text x="${f(xL)}" y="${f(y3)}" font-family="${MIX}" font-size="${f(smallF)}" fill="${color}">${SENDER.license}</text>`;
  return s;
}

const logoW = (W) => W * 0.235;

// left-aligned sender block (name / address / tel・fax / web / licence), on yc
function senderLeft(x, yc, color, W) {
  const nameF = W * 0.035, bodyF = W * 0.024, smallF = W * 0.0215, lh = W * 0.039;
  const lines = [
    [SENDER.name, nameF, 700, MIX],
    [`${SENDER.zip}　${SENDER.addr}`, bodyF, 400, MIX],
    [`${SENDER.tel}　${SENDER.fax}`, bodyF, 400, SANS],
    [SENDER.web, bodyF, 400, MIX],
    [SENDER.license, smallF, 400, MIX],
  ];
  let y = yc - lh * (lines.length - 1) / 2, s = '';
  for (const [t, fz, wt, ff] of lines) {
    s += `<text x="${f(x)}" y="${f(y)}" font-family="${ff}" font-size="${f(fz)}" letter-spacing="${f(fz * 0.04)}" font-weight="${wt}" fill="${color}">${t}</text>`;
    y += lh;
  }
  return s;
}

// ---- Concept A : minimal hairline footer -----------------------------------
function conceptA(W, H, { bleed = 0, mockup = false } = {}) {
  const M = W * 0.058; let b = '';
  if (mockup) { b += stampBox(W, H); b += recipient(W, H); }
  b += logoImg(M, M * 0.95, logoW(W));
  const footH = H * 0.120, ruleY = H - M - footH;
  b += `<line x1="${f(M)}" y1="${f(ruleY)}" x2="${f(W - M)}" y2="${f(ruleY)}" stroke="${P.NAVY}" stroke-width="${f(W * 0.0025)}"/>`;
  b += senderBand(M, W - M, ruleY + footH * 0.52, P.INK, W);
  return frame(W, H, b, bleed);
}

// ---- Concept B : navy footer band, logo on a white plate (selected) --------
function conceptB(W, H, { bleed = 0, mockup = false, paper = P.PAPER } = {}) {
  const M = W * 0.058; let b = '';
  if (mockup) { b += stampBox(W, H); b += recipient(W, H); }
  const bandH = H * 0.170, by = H - bandH;
  // thin navy vertical line up the left edge -> forms an L with the band
  const lineW = W * 0.017;
  b += `<rect x="${f(-bleed)}" y="${f(-bleed)}" width="${f(lineW + bleed)}" height="${f(by + bleed)}" fill="${P.NAVY}"/>`;
  b += `<rect x="${f(-bleed)}" y="${f(by)}" width="${f(W + bleed * 2)}" height="${f(bandH + bleed)}" fill="${P.NAVY}"/>`;
  b += `<rect x="${f(-bleed)}" y="${f(by)}" width="${f(W + bleed * 2)}" height="${f(W * 0.0035)}" fill="${P.STEEL_L}"/>`;
  // white plate behind the logo, inside the navy band
  const innerM = bandH * 0.13, plateH = bandH - innerM * 2, pad = plateH * 0.12;
  const logoH = plateH - pad * 2, lw = logoH * LOGO_AR, plateW = lw + pad * 2;
  const plateX = M, plateY = by + innerM, rx = plateH * 0.06;
  b += `<rect x="${f(plateX)}" y="${f(plateY)}" width="${f(plateW)}" height="${f(plateH)}" rx="${f(rx)}" fill="#FFFFFF" stroke="${P.STEEL_L}" stroke-width="${f(W * 0.0014)}"/>`;
  b += logoImg(plateX + pad, plateY + pad, lw);
  // sender details fill the rest of the band (single column, left-aligned)
  b += senderLeft(plateX + plateW + W * 0.05, by + bandH * 0.52, '#FFFFFF', W);
  return frame(W, H, b, bleed, paper);
}

// ---- Concept C : architectural L-spine -------------------------------------
function conceptC(W, H, { bleed = 0, mockup = false } = {}) {
  const M = W * 0.058; let b = '';
  const spineW = W * 0.052, bandH = H * 0.140, by = H - bandH;
  b += `<rect x="${f(-bleed)}" y="${f(-bleed)}" width="${f(spineW + bleed)}" height="${f(by + bandH + bleed * 2)}" fill="${P.NAVY}"/>`;
  b += `<rect x="${f(-bleed)}" y="${f(by)}" width="${f(W + bleed * 2)}" height="${f(bandH + bleed)}" fill="${P.NAVY}"/>`;
  const gx = spineW + W * 0.022;
  b += `<line x1="${f(gx)}" y1="${f(M * 0.7)}" x2="${f(gx)}" y2="${f(by - W * 0.02)}" stroke="${P.NAVY}" stroke-width="${f(W * 0.0022)}"/>`;
  b += `<rect x="${f(-bleed)}" y="${f(by)}" width="${f(W + bleed * 2)}" height="${f(W * 0.0035)}" fill="${P.STEEL_L}"/>`;
  if (mockup) { b += recipient(W, H); b += stampBox(W, H); }
  b += logoImg(spineW + W * 0.05, M * 0.95, logoW(W));
  b += senderLeft(spineW + W * 0.05, by + bandH * 0.52, '#FFFFFF', W);
  return frame(W, H, b, bleed);
}

// centred 3-line sender block
function senderCentered(cx, yTop, color, W) {
  const nameF = W * 0.040, bodyF = W * 0.027, lh = W * 0.046;
  let s = '', y = yTop;
  s += `<text x="${f(cx)}" y="${f(y)}" text-anchor="middle" font-family="${MIX}" font-size="${f(nameF)}" letter-spacing="${f(nameF * 0.08)}" font-weight="700" fill="${color}">${SENDER.name}</text>`; y += lh * 1.05;
  s += `<text x="${f(cx)}" y="${f(y)}" text-anchor="middle" font-family="${MIX}" font-size="${f(bodyF)}" fill="${color}">${SENDER.zip}　${SENDER.addr}</text>`; y += lh * 0.82;
  s += `<text x="${f(cx)}" y="${f(y)}" text-anchor="middle" font-family="${SANS}" font-size="${f(bodyF)}" letter-spacing="0.3" fill="${color}">${SENDER.tel}　${SENDER.fax}</text>`; y += lh * 0.82;
  s += `<text x="${f(cx)}" y="${f(y)}" text-anchor="middle" font-family="${MIX}" font-size="${f(bodyF)}" fill="${color}">${SENDER.web}</text>`; y += lh * 0.78;
  s += `<text x="${f(cx)}" y="${f(y)}" text-anchor="middle" font-family="${MIX}" font-size="${f(bodyF * 0.92)}" fill="${color}">${SENDER.license}</text>`;
  return s;
}
// stacked sender block (for a narrow side panel), bottom-aligned, auto-fit
function senderStack(x, yBottom, color, W, panelW) {
  const usable = Math.max(panelW - x - W * 0.015, W * 0.1);
  const bodyF = Math.min(W * 0.024, usable / 14.5); // licence ~14.5 em advance
  const nameF = bodyF * 1.4, lh = bodyF * 1.55, nameGap = nameF * 1.35;
  const total = nameGap + 6 * lh;
  let y = yBottom - total, s = '';
  const put = (t, fz, wt, ff) => `<text x="${f(x)}" y="${f(y)}" font-family="${ff}" font-size="${f(fz)}" font-weight="${wt}" fill="${color}">${t}</text>`;
  s += put(SENDER.name, nameF, 700, MIX); y += nameGap;
  s += put(SENDER.zip, bodyF, 400, MIX); y += lh;
  s += put(SENDER.addr, bodyF, 400, MIX); y += lh;
  s += put(SENDER.tel, bodyF, 400, SANS); y += lh;
  s += put(SENDER.fax, bodyF, 400, SANS); y += lh;
  s += put(SENDER.webShort, bodyF * 0.96, 400, MIX); y += lh;
  s += put(SENDER.licenseShort, bodyF * 0.92, 400, MIX);
  return s;
}

// ---- Concept D : centred / classic -----------------------------------------
function conceptD(W, H, { bleed = 0, mockup = false } = {}) {
  const M = W * 0.058; let b = '';
  const lw = logoW(W) * 0.94;
  b += logoImg((W - lw) / 2, M * 1.0, lw);
  if (mockup) { b += stampBox(W, H); b += recipient(W, H); }
  const footY = H - M - H * 0.075, ruleW = W * 0.26;
  b += `<line x1="${f((W - ruleW) / 2)}" y1="${f(footY)}" x2="${f((W + ruleW) / 2)}" y2="${f(footY)}" stroke="${P.NAVY}" stroke-width="${f(W * 0.003)}"/>`;
  b += senderCentered(W / 2, footY + H * 0.028, P.INK, W);
  return frame(W, H, b, bleed);
}

// ---- Concept E : navy keyline frame ----------------------------------------
function conceptE(W, H, { bleed = 0, mockup = false } = {}) {
  const M = W * 0.058; let b = '';
  const ins = W * 0.046, pad = W * 0.035;
  b += `<rect x="${f(ins)}" y="${f(ins)}" width="${f(W - ins * 2)}" height="${f(H - ins * 2)}" fill="none" stroke="${P.NAVY}" stroke-width="${f(W * 0.004)}"/>`;
  b += `<rect x="${f(ins + W * 0.012)}" y="${f(ins + W * 0.012)}" width="${f(W - (ins + W * 0.012) * 2)}" height="${f(H - (ins + W * 0.012) * 2)}" fill="none" stroke="${P.STEEL_L}" stroke-width="${f(W * 0.0014)}"/>`;
  b += logoImg(ins + pad, ins + pad, logoW(W) * 0.9);
  if (mockup) { b += stampBox(W, H); b += recipient(W, H); }
  const footH = H * 0.10, ruleY = H - ins - pad - footH;
  b += `<line x1="${f(ins + pad)}" y1="${f(ruleY)}" x2="${f(W - ins - pad)}" y2="${f(ruleY)}" stroke="${P.NAVY}" stroke-width="${f(W * 0.0022)}"/>`;
  b += senderBand(ins + pad, W - ins - pad, ruleY + footH * 0.54, P.INK, W);
  return frame(W, H, b, bleed);
}

// ---- Concept F : navy side panel (colour block) ----------------------------
function conceptF(W, H, { bleed = 0, mockup = false } = {}) {
  const M = W * 0.058; let b = '';
  const panelW = W * 0.30;
  b += `<rect x="${f(-bleed)}" y="${f(-bleed)}" width="${f(panelW + bleed)}" height="${f(H + bleed * 2)}" fill="${P.NAVY}"/>`;
  b += `<rect x="${f(panelW)}" y="${f(-bleed)}" width="${f(W * 0.004)}" height="${f(H + bleed * 2)}" fill="${P.STEEL_L}"/>`;
  b += logoImg(panelW + W * 0.05, M * 1.0, logoW(W) * 0.92);
  if (mockup) { b += recipient(W, H); b += stampBox(W, H); }
  b += senderStack(W * 0.045, H - M, '#FFFFFF', W, panelW);
  return frame(W, H, b, bleed);
}

const CONCEPTS = {
  A: { name: 'line', fn: conceptA }, B: { name: 'band', fn: conceptB }, C: { name: 'spine', fn: conceptC },
  D: { name: 'center', fn: conceptD }, E: { name: 'frame', fn: conceptE }, F: { name: 'sidebar', fn: conceptF },
};
const SIZES = { kaku2: { W: 240, H: 332, label: '角2号 (240 × 332 mm)' }, chokei3: { W: 120, H: 235, label: '長形3号 (120 × 235 mm)' } };

module.exports = { CONCEPTS, SIZES, SENDER };
