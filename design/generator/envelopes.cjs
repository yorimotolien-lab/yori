// =============================================================================
//  LIEN envelope layouts  —  角2号 (240x332) and 長形3号 (120x235), millimetres.
//  Uses the actual LIEN CONSTRUCTION logo (design/logo/lien-master.png),
//  placed on the paper; the navy footer band carries the sender details.
//  Print master = bleed + brand only; mockup = addressing-area guide.
// =============================================================================

const fs = require('fs');
const path = require('path');
const B = require('./brand.cjs');
const { f, PALETTE: P, MIX, SANS, JP } = B;

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

// embedded QR code (white background, square)
const QR_PATH = path.join(__dirname, '..', 'logo', 'lien-qr.png');
const QR_URI = 'data:image/png;base64,' + fs.readFileSync(QR_PATH).toString('base64');
function qrImg(x, y, s) {
  return `<image x="${f(x)}" y="${f(y)}" width="${f(s)}" height="${f(s)}" xlink:href="${QR_URI}"/>`;
}

// 在中 checkboxes above the navy band: six 在中 items on row 1, その他 on row 2
// with its closing paren widened out to the 領収書在中 column. The font auto-
// fits the available width [x0,x1] (defaults to the standard margins).
function checkboxes(W, bandTopY, color, x0, x1) {
  if (x0 == null) x0 = W * 0.058;
  if (x1 == null) x1 = W - W * 0.058;
  const six = ['御見積書在中', '御請求書在中', '領収書在中', '御契約書在中', '注文書在中', '注文請書在中'];
  const fz = Math.min(W * 0.018, (x1 - x0) / 49); // 6 items + gaps must fit
  const box = fz * 0.95, gap = fz * 1.0;
  const itemW = (t) => box + fz * 0.45 + t.length * fz * 1.02;
  const lineH = fz * 2.05;
  const y1 = bandTopY - W * 0.018 - lineH, y2 = bandTopY - W * 0.018;
  const chk = (t, x, y) =>
    `<rect x="${f(x)}" y="${f(y - box)}" width="${f(box)}" height="${f(box)}" rx="${f(box * 0.12)}" fill="none" stroke="${color}" stroke-width="${f(W * 0.0016)}"/>`
    + (t ? `<text x="${f(x + box + fz * 0.45)}" y="${f(y)}" font-family="${MIX}" font-size="${f(fz)}" fill="${color}">${t}</text>` : '');
  let s = '', x = x0; const xs = [];
  for (const t of six) { xs.push(x); s += chk(t, x, y1); x += itemW(t) + gap; }
  const closeX = xs[2] + itemW(six[2]) - gap * 0.4; // ） to right edge of 領収書在中
  s += chk('その他（', x0, y2);
  s += `<text x="${f(closeX)}" y="${f(y2)}" font-family="${MIX}" font-size="${f(fz)}" fill="${color}">）</text>`;
  return s;
}

function frame(W, H, body, bleed = 0, paper = P.PAPER) {
  const vw = W + bleed * 2, vh = H + bleed * 2;
  const bg = (paper && paper !== 'none')
    ? `<rect x="${f(-bleed)}" y="${f(-bleed)}" width="${f(vw)}" height="${f(vh)}" fill="${paper}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${f(vw)}mm" height="${f(vh)}mm" viewBox="${f(-bleed)} ${f(-bleed)} ${f(vw)} ${f(vh)}">`
    + bg + body + `</svg>`;
}

// recipient is handled by an address label, so no printed guide is needed
function recipient() { return ''; }
function stampBox(W, H) {
  const w = W * 0.105, h = w * 1.32, x = W - W * 0.058 - w, y = H * 0.055;
  return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${f(W * 0.006)}" fill="none" stroke="#DCD8CE" stroke-width="${f(W * 0.0025)}"/>`;
}

// three-row sender block: name | TEL·FAX / address / licence
function senderBand(xL, xR, yc, color, W) {
  const nameF = W * 0.034, bodyF = W * 0.022, smallF = W * 0.020, lg = W * 0.042;
  const o = bodyF * 0.32, y1 = yc - lg + o, y2 = yc + o, y3 = yc + lg + o;
  let s = '';
  s += `<text x="${f(xL)}" y="${f(y1)}" font-family="${MIX}" font-size="${f(nameF)}" letter-spacing="${f(nameF * 0.06)}" font-weight="700" fill="${color}">${SENDER.name}</text>`;
  s += `<text x="${f(xR)}" y="${f(y1)}" text-anchor="end" font-family="${SANS}" font-size="${f(bodyF)}" letter-spacing="0.3" fill="${color}">${SENDER.tel}　${SENDER.fax}</text>`;
  s += `<text x="${f(xL)}" y="${f(y2)}" font-family="${MIX}" font-size="${f(bodyF)}" fill="${color}">${SENDER.zip}　${SENDER.addr}</text>`;
  s += `<text x="${f(xL)}" y="${f(y3)}" font-family="${MIX}" font-size="${f(smallF)}" fill="${color}">${SENDER.license}</text>`;
  return s;
}

const logoW = (W) => W * 0.235;

// left-aligned sender block (name / address / tel・fax / licence), on yc.
// maxW (optional) auto-fits the font so the longest line stays within it.
function senderLeft(x, yc, color, W, maxW) {
  let bodyF = W * 0.024;
  if (maxW) bodyF = Math.max(W * 0.013, Math.min(bodyF, maxW / 19));
  const nameF = bodyF * 1.42, smallF = bodyF * 0.9, lh = bodyF * 1.68;
  const lines = [
    [SENDER.name, nameF, 700, MIX],
    [`${SENDER.zip}　${SENDER.addr}`, bodyF, 400, MIX],
    [`${SENDER.tel}　${SENDER.fax}`, bodyF, 400, SANS],
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

// ---- Concept B : navy L-frame, logo (left) + sender + QR (right) [selected] -
function conceptB(W, H, { bleed = 0, mockup = false, paper = P.PAPER } = {}) {
  const M = W * 0.058; let b = '';
  if (mockup) b += stampBox(W, H);          // 宛名 is applied by label — no guide
  const bandH = H * 0.205, by = H - bandH;   // larger band
  const lineW = W * 0.028;                    // wider navy vertical line
  // navy L-frame: vertical line overlaps into the band so the corner is solid
  b += `<rect x="${f(-bleed)}" y="${f(by)}" width="${f(W + bleed * 2)}" height="${f(bandH + bleed)}" fill="${P.NAVY}"/>`;
  b += `<rect x="${f(-bleed)}" y="${f(-bleed)}" width="${f(lineW + bleed)}" height="${f(by + bleed + bandH * 0.5)}" fill="${P.NAVY}"/>`;
  // steel hairline on the band top, starting from the vertical line (keeps the corner solid navy)
  b += `<rect x="${f(lineW)}" y="${f(by)}" width="${f(W + bleed - lineW)}" height="${f(W * 0.0035)}" fill="${P.STEEL_L}"/>`;
  // 在中 checkboxes above the band
  b += checkboxes(W, by, P.NAVY);
  const innerM = bandH * 0.12, plateH = bandH - innerM * 2, rx = plateH * 0.06, plateY = by + innerM;
  // logo plate (left)
  const lpad = plateH * 0.11, logoH = plateH - lpad * 2, lw = logoH * LOGO_AR, logoPlateW = lw + lpad * 2;
  const logoPlateX = Math.max(M, lineW + W * 0.022);
  b += `<rect x="${f(logoPlateX)}" y="${f(plateY)}" width="${f(logoPlateW)}" height="${f(plateH)}" rx="${f(rx)}" fill="#FFFFFF" stroke="${P.STEEL_L}" stroke-width="${f(W * 0.0014)}"/>`;
  b += logoImg(logoPlateX + lpad, plateY + lpad, lw);
  // QR plate (right, opposite the logo)
  const qrPlateS = Math.min(plateH, W * 0.195), qrPad = qrPlateS * 0.1, qrS = qrPlateS - qrPad * 2;
  const qrPlateX = W - M - qrPlateS, qrPlateY = by + (bandH - qrPlateS) / 2;
  b += `<rect x="${f(qrPlateX)}" y="${f(qrPlateY)}" width="${f(qrPlateS)}" height="${f(qrPlateS)}" rx="${f(qrPlateS * 0.06)}" fill="#FFFFFF" stroke="${P.STEEL_L}" stroke-width="${f(W * 0.0014)}"/>`;
  b += qrImg(qrPlateX + qrPad, qrPlateY + qrPad, qrS);
  // sender details between the two plates
  const sxL = logoPlateX + logoPlateW + W * 0.03, sxR = qrPlateX - W * 0.03;
  b += senderLeft(sxL, by + bandH * 0.5, '#FFFFFF', W, sxR - sxL);
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
  s += `<text x="${f(cx)}" y="${f(y)}" text-anchor="middle" font-family="${MIX}" font-size="${f(bodyF * 0.92)}" fill="${color}">${SENDER.license}</text>`;
  return s;
}
// stacked sender block (for a narrow side panel), bottom-aligned, auto-fit
function senderStack(x, yBottom, color, W, panelW) {
  const usable = Math.max(panelW - x - W * 0.015, W * 0.1);
  const bodyF = Math.min(W * 0.024, usable / 14.5); // licence ~14.5 em advance
  const nameF = bodyF * 1.4, lh = bodyF * 1.55, nameGap = nameF * 1.35;
  const total = nameGap + 5 * lh;
  let y = yBottom - total, s = '';
  const put = (t, fz, wt, ff) => `<text x="${f(x)}" y="${f(y)}" font-family="${ff}" font-size="${f(fz)}" font-weight="${wt}" fill="${color}">${t}</text>`;
  s += put(SENDER.name, nameF, 700, MIX); y += nameGap;
  s += put(SENDER.zip, bodyF, 400, MIX); y += lh;
  s += put(SENDER.addr, bodyF, 400, MIX); y += lh;
  s += put(SENDER.tel, bodyF, 400, SANS); y += lh;
  s += put(SENDER.fax, bodyF, 400, SANS); y += lh;
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

// ---- Concept G : フチあり版（既製封筒用）— inset navy L + plates, no bleed ----
function conceptG(W, H, { mockup = false, paper = P.PAPER } = {}) {
  const SM = Math.max(W * 0.05, 9);            // safe printable margin (no bleed)
  const ix0 = SM, iy0 = SM, ix1 = W - SM, iy1 = H - SM;
  let b = '';
  if (mockup) b += stampBox(W, H);
  const bandH = H * 0.165, by = iy1 - bandH, lineW = W * 0.024;
  // inset navy L (vertical line down the left + bottom band), within the margins
  b += `<rect x="${f(ix0)}" y="${f(iy0)}" width="${f(lineW)}" height="${f(iy1 - iy0)}" fill="${P.NAVY}"/>`;
  b += `<rect x="${f(ix0)}" y="${f(by)}" width="${f(ix1 - ix0)}" height="${f(bandH)}" fill="${P.NAVY}"/>`;
  b += `<rect x="${f(ix0 + lineW)}" y="${f(by)}" width="${f(ix1 - ix0 - lineW)}" height="${f(W * 0.0035)}" fill="${P.STEEL_L}"/>`;
  // 在中 checkboxes above the band (right of the vertical line)
  b += checkboxes(W, by, P.NAVY, ix0 + lineW + W * 0.012, ix1 - W * 0.006);
  const innerM = bandH * 0.12, plateH = bandH - innerM * 2, plateY = by + innerM, rx = plateH * 0.06;
  const lpad = plateH * 0.11, logoH = plateH - lpad * 2, lw = logoH * LOGO_AR, logoPlateW = lw + lpad * 2;
  const logoPlateX = ix0 + lineW + W * 0.018;
  b += `<rect x="${f(logoPlateX)}" y="${f(plateY)}" width="${f(logoPlateW)}" height="${f(plateH)}" rx="${f(rx)}" fill="#FFFFFF" stroke="${P.STEEL_L}" stroke-width="${f(W * 0.0014)}"/>`;
  b += logoImg(logoPlateX + lpad, plateY + lpad, lw);
  const qrPlateS = Math.min(plateH, W * 0.16), qrPad = qrPlateS * 0.1, qrS = qrPlateS - qrPad * 2;
  const qrPlateX = ix1 - W * 0.022 - qrPlateS, qrPlateY = by + (bandH - qrPlateS) / 2;
  b += `<rect x="${f(qrPlateX)}" y="${f(qrPlateY)}" width="${f(qrPlateS)}" height="${f(qrPlateS)}" rx="${f(qrPlateS * 0.06)}" fill="#FFFFFF" stroke="${P.STEEL_L}" stroke-width="${f(W * 0.0014)}"/>`;
  b += qrImg(qrPlateX + qrPad, qrPlateY + qrPad, qrS);
  const sxL = logoPlateX + logoPlateW + W * 0.025, sxR = qrPlateX - W * 0.025;
  b += senderLeft(sxL, by + bandH * 0.5, '#FFFFFF', W, sxR - sxL);
  return frame(W, H, b, 0, paper);
}

// ---- Concept H : フチあり版（既製封筒用）— rounded contained footer card ----
function conceptH(W, H, { mockup = false, paper = P.PAPER } = {}) {
  const SM = Math.max(W * 0.05, 9);
  const ix0 = SM, ix1 = W - SM, iy1 = H - SM;
  let b = '';
  if (mockup) b += stampBox(W, H);
  const bandH = H * 0.17, by = iy1 - bandH, rx = bandH * 0.12;
  // rounded navy footer card, inset on all sides
  b += `<rect x="${f(ix0)}" y="${f(by)}" width="${f(ix1 - ix0)}" height="${f(bandH)}" rx="${f(rx)}" fill="${P.NAVY}"/>`;
  b += `<rect x="${f(ix0 + rx)}" y="${f(by + bandH * 0.085)}" width="${f(ix1 - ix0 - rx * 2)}" height="${f(W * 0.0032)}" fill="${P.STEEL_L}"/>`;
  // 在中 checkboxes above the card
  b += checkboxes(W, by, P.NAVY, ix0 + W * 0.006, ix1 - W * 0.006);
  const innerM = bandH * 0.14, plateH = bandH - innerM * 2, plateY = by + innerM, prx = plateH * 0.08;
  const lpad = plateH * 0.11, logoH = plateH - lpad * 2, lw = logoH * LOGO_AR, logoPlateW = lw + lpad * 2;
  const logoPlateX = ix0 + bandH * 0.16;
  b += `<rect x="${f(logoPlateX)}" y="${f(plateY)}" width="${f(logoPlateW)}" height="${f(plateH)}" rx="${f(prx)}" fill="#FFFFFF" stroke="${P.STEEL_L}" stroke-width="${f(W * 0.0014)}"/>`;
  b += logoImg(logoPlateX + lpad, plateY + lpad, lw);
  const qrPlateS = Math.min(plateH, W * 0.155), qrPad = qrPlateS * 0.1, qrS = qrPlateS - qrPad * 2;
  const qrPlateX = ix1 - bandH * 0.16 - qrPlateS, qrPlateY = by + (bandH - qrPlateS) / 2;
  b += `<rect x="${f(qrPlateX)}" y="${f(qrPlateY)}" width="${f(qrPlateS)}" height="${f(qrPlateS)}" rx="${f(qrPlateS * 0.08)}" fill="#FFFFFF" stroke="${P.STEEL_L}" stroke-width="${f(W * 0.0014)}"/>`;
  b += qrImg(qrPlateX + qrPad, qrPlateY + qrPad, qrS);
  const sxL = logoPlateX + logoPlateW + W * 0.025, sxR = qrPlateX - W * 0.025;
  b += senderLeft(sxL, by + bandH * 0.5, '#FFFFFF', W, sxR - sxL);
  return frame(W, H, b, 0, paper);
}

const CONCEPTS = {
  A: { name: 'line', fn: conceptA }, B: { name: 'band', fn: conceptB }, C: { name: 'spine', fn: conceptC },
  D: { name: 'center', fn: conceptD }, E: { name: 'frame', fn: conceptE }, F: { name: 'sidebar', fn: conceptF },
  G: { name: 'inset', fn: conceptG }, H: { name: 'card', fn: conceptH },
};
const SIZES = { kaku2: { W: 240, H: 332, label: '角2号 (240 × 332 mm)' }, chokei3: { W: 120, H: 235, label: '長形3号 (120 × 235 mm)' } };

module.exports = { CONCEPTS, SIZES, SENDER };
