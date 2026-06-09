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
    s += `<text x="${padX}" y="104" font-family="sans-serif" font-size="24" fill="#666">株式会社LIEN 封筒デザイン（宛名は宛名ラベルで貼付・在中チェック＋QR付き）</text>`;
    s += tile(k2, padX, padTop, k2w, Hpx, '#fff', '角2号 240×332mm');
    s += tile(n3, padX + k2w + gap, padTop, n3w, Hpx, '#fff', '長形3号 120×235mm');
    s += `</svg>`;
    png(s, path.join(PREV, 'conceptB-final.png'), Wt);
  }

  // per-size concept sheet — all concepts in a 3-column grid
  const allKeys = Object.keys(CONCEPTS);
  for (const [sk, S] of Object.entries(SIZES)) {
    const ppm = 5, iw = Math.round(S.W * ppm), ih = Math.round(S.H * ppm), gap2 = 36, cols = 3;
    const rows = Math.ceil(allKeys.length / cols);
    const top = 60, rowH = ih + 46 + gap2;
    let s = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${cols * iw + (cols + 1) * gap2}" height="${top + rows * rowH}"><rect width="100%" height="100%" fill="#e9e9e9"/>`;
    s += `<text x="${gap2}" y="${top - 22}" font-family="sans-serif" font-size="28" fill="#444">${S.label}</text>`;
    allKeys.forEach((ck, i) => {
      const x = gap2 + (i % cols) * (iw + gap2), y = top + Math.floor(i / cols) * rowH;
      const b64 = readB64(path.join(ENV, `${sk}-${ck}-${CONCEPTS[ck].name}-mockup.png`));
      s += tile(b64, x, y, iw, ih, '#ffffff', `Concept ${ck} — ${CONCEPTS[ck].name}`);
    });
    s += `</svg>`;
    png(s, path.join(PREV, `${sk}-concepts.png`), cols * iw + (cols + 1) * gap2);
  }

  // "other designs" sheet — D/E/F across both sizes
  {
    const newKeys = ['D', 'E', 'F'];
    const hpx = 1000, gap3 = 40, top = 130;
    const k2w = Math.round(hpx * 240 / 332), n3w = Math.round(hpx * 120 / 235);
    const colW = Math.max(k2w, n3w);
    const Wt = gap3 + newKeys.length * (colW + gap3);
    const Ht = top + 2 * (hpx + 46 + gap3);
    let s = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${Wt}" height="${Ht}"><rect width="100%" height="100%" fill="#ECECEA"/>`;
    s += `<text x="${gap3}" y="64" font-family="sans-serif" font-size="40" font-weight="700" fill="#223A5C">その他のデザイン案 ／ Other directions</text>`;
    s += `<text x="${gap3}" y="98" font-family="sans-serif" font-size="22" fill="#666">D: センタード　E: フレーム　F: サイドバー（いずれもネイビー・実ロゴ）</text>`;
    newKeys.forEach((ck, i) => {
      const cx = gap3 + i * (colW + gap3);
      const k2 = readB64(path.join(ENV, `kaku2-${ck}-${CONCEPTS[ck].name}-mockup.png`));
      const n3 = readB64(path.join(ENV, `chokei3-${ck}-${CONCEPTS[ck].name}-mockup.png`));
      s += tile(k2, cx + (colW - k2w) / 2, top, k2w, hpx, '#fff', `Concept ${ck} — ${CONCEPTS[ck].name} ／ 角2号`);
      s += tile(n3, cx + (colW - n3w) / 2, top + hpx + 46 + gap3, n3w, hpx, '#fff', `Concept ${ck} ／ 長形3号`);
    });
    s += `</svg>`;
    png(s, path.join(PREV, 'other-concepts.png'), Wt);
  }
  console.log('preview sheets written');
}

console.log('done.');
