// =============================================================================
//  Build all LIEN brand assets into ../logo, ../envelopes and ../preview.
//
//  SVG generation needs no dependencies:   node build.js --svg-only
//  PNG previews need @resvg/resvg-js:       npm i @resvg/resvg-js && node build.js
// =============================================================================

const fs = require('fs');
const path = require('path');
const B = require('./brand.cjs');
const { CONCEPTS, SIZES } = require('./envelopes.cjs');

const ROOT = path.resolve(__dirname, '..');
const dir = (d) => { const p = path.join(ROOT, d); fs.mkdirSync(p, { recursive: true }); return p; };
const LOGO = dir('logo'), ENV = dir('envelopes'), PREV = dir('preview');

// optional renderer
let Resvg = null;
try { Resvg = require('@resvg/resvg-js').Resvg; }
catch { console.warn('! @resvg/resvg-js not found — writing SVG only, skipping PNG previews'); }

const FONT = { fontDirs: ['/usr/share/fonts'], loadSystemFonts: true, defaultFontFamily: 'Liberation Sans' };
function png(svg, out, width, bg = '#ffffff') {
  if (!Resvg) return;
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: Math.round(width) }, font: FONT, background: bg });
  fs.writeFileSync(out, r.render().asPng());
}
const W = (p, s) => fs.writeFileSync(p, s);

// ---------------- logo ----------------
// The brand logo is the client's actual mark: logo/lien-master.png
// (transparent, trimmed). The envelope layouts embed it directly.

// ---------------- envelope masters + mockups ----------------
const envManifest = [];
for (const [sk, S] of Object.entries(SIZES)) {
  for (const [ck, C] of Object.entries(CONCEPTS)) {
    const base = `${sk}-${ck}-${C.name}`;
    const master = C.fn(S.W, S.H, { bleed: 3, mockup: false }); // print
    const mock = C.fn(S.W, S.H, { bleed: 0, mockup: true });    // preview
    W(path.join(ENV, base + '.svg'), master);
    png(mock, path.join(ENV, base + '-mockup.png'), S.W * 6);
    envManifest.push({ sk, ck, base, label: S.label, name: C.name });
  }
}
console.log('envelopes: ' + envManifest.length + ' masters');

// ---------------- preview sheets ----------------
function tile(b64, x, y, w, h, bg, label) {
  let s = `<rect x="${x - 2}" y="${y - 2}" width="${w + 4}" height="${h + 4}" fill="${bg}" stroke="#cfcfcf"/>`;
  s += `<image x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,${b64}"/>`;
  if (label) s += `<text x="${x + w / 2}" y="${y + h + 30}" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#333">${label}</text>`;
  return s;
}
function readB64(p) { return fs.readFileSync(p).toString('base64'); }

if (Resvg) {
  // selected-direction sheet: Concept B for both sizes, side by side
  {
    const Hpx = 1180, k2w = Math.round(Hpx * 240 / 332), n3w = Math.round(Hpx * 120 / 235);
    const gap = 70, padX = 70, padTop = 120, padBot = 80;
    const Wt = padX * 2 + k2w + gap + n3w, Ht = padTop + Hpx + padBot;
    const k2 = readB64(path.join(ENV, 'kaku2-B-band-mockup.png'));
    const n3 = readB64(path.join(ENV, 'chokei3-B-band-mockup.png'));
    let s = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${Wt}" height="${Ht}"><rect width="100%" height="100%" fill="#ECECEA"/>`;
    s += `<text x="${padX}" y="70" font-family="sans-serif" font-size="40" font-weight="700" fill="#223A5C">Concept B — フッターバンド ／ Navy</text>`;
    s += `<text x="${padX}" y="104" font-family="sans-serif" font-size="24" fill="#666">株式会社LIEN 封筒デザイン（差出人情報は下部・宛名グレーは配置ガイド）</text>`;
    s += tile(k2, padX, padTop, k2w, Hpx, '#fff', '角2号 240×332mm');
    s += tile(n3, padX + k2w + gap, padTop, n3w, Hpx, '#fff', '長形3号 120×235mm');
    s += `</svg>`;
    png(s, path.join(PREV, 'conceptB-final.png'), Wt);
  }

  // envelope concept sheets, one per size
  for (const [sk, S] of Object.entries(SIZES)) {
    const ppm = 6, iw = Math.round(S.W * ppm), ih = Math.round(S.H * ppm), gap2 = 40;
    let s = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${3 * iw + 4 * gap2}" height="${ih + 2 * gap2 + 70}"><rect width="100%" height="100%" fill="#e9e9e9"/>`;
    s += `<text x="${gap2}" y="${gap2 - 12}" font-family="sans-serif" font-size="28" fill="#444">${S.label}</text>`;
    ['A', 'B', 'C'].forEach((ck, i) => {
      const x = gap2 + i * (iw + gap2);
      const b64 = readB64(path.join(ENV, `${sk}-${ck}-${CONCEPTS[ck].name}-mockup.png`));
      s += tile(b64, x, gap2, iw, ih, '#ffffff', `Concept ${ck} — ${CONCEPTS[ck].name}`);
    });
    s += `</svg>`;
    png(s, path.join(PREV, `${sk}-concepts.png`), 3 * iw + 4 * gap2);
  }
  console.log('preview sheets written');
}

console.log('done.');
