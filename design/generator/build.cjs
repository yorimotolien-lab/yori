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

// ---------------- logo files ----------------
const logoFiles = [
  ['lien-logo-vertical',        B.verticalLogo({ variant: 'color' }), 'color'],
  ['lien-logo-vertical-mono',   B.verticalLogo({ variant: 'mono' }),  'mono'],
  ['lien-logo-vertical-white',  B.verticalLogo({ variant: 'ko' }),    'ko'],
  ['lien-logo-horizontal',      B.horizontalLogo({ variant: 'color' }), 'color'],
  ['lien-logo-horizontal-mono', B.horizontalLogo({ variant: 'mono' }),  'mono'],
  ['lien-logo-horizontal-white',B.horizontalLogo({ variant: 'ko' }),    'ko'],
  ['lien-mark',                 B.markOnly({ variant: 'color' }), 'color'],
  ['lien-mark-mono',            B.markOnly({ variant: 'mono' }),  'mono'],
  ['lien-mark-white',           B.markOnly({ variant: 'ko' }),    'ko'],
];
for (const [name, svg] of logoFiles) {
  W(path.join(LOGO, name + '.svg'), svg);
  png(svg, path.join(LOGO, name + '.png'), 1000, 'transparent');
}
console.log('logo: ' + logoFiles.length + ' svg');

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
  // logo overview
  const lo = [
    ['lien-logo-vertical', '#ffffff', 'vertical'],
    ['lien-logo-vertical-white', '#16181D', 'white'],
    ['lien-logo-horizontal', '#ffffff', 'horizontal'],
    ['lien-mark', '#ffffff', 'mark'],
  ];
  const cw = 520, gap = 28;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${2 * cw + 3 * gap}" height="${2 * 480 + 3 * gap + 30}"><rect width="100%" height="100%" fill="#eeeeec"/>`;
  lo.forEach(([n, bg, lb], i) => {
    const x = gap + (i % 2) * (cw + gap), y = gap + Math.floor(i / 2) * (480 + gap + 30);
    svg += tile(readB64(path.join(LOGO, n + '.png')), x + 40, y + 30, cw - 80, 380, bg, lb);
  });
  svg += `</svg>`;
  png(svg, path.join(PREV, 'logo-overview.png'), 2 * cw + 3 * gap);

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
