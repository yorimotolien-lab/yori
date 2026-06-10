// Render print masters at 350dpi (white bg) for PDF export.
//   B = full-bleed (+3mm) for オリジナル製袋
//   G / H = フチあり, finished size (no bleed) for 既製封筒
// Output PNGs feed build-print-pdf.py (img2pdf) -> ../print/*.pdf
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');
const { CONCEPTS } = require('./envelopes.cjs');

const OUT = path.resolve(__dirname, '..', 'print');
fs.mkdirSync(OUT, { recursive: true });
const FONT = { fontDirs: ['/usr/share/fonts'], loadSystemFonts: true, defaultFontFamily: 'Liberation Sans' };
const ppm = 350 / 25.4; // 350 dpi (print)

const JOBS = [
  { c: 'B', bleed: 3, tag: 'b' },  // full-bleed (製袋)
  { c: 'G', bleed: 0, tag: 'g' },  // フチあり 既製封筒
  { c: 'H', bleed: 0, tag: 'h' },
];
const SIZES = [{ k: 'kaku2', W: 240, H: 332 }, { k: 'chokei3', W: 120, H: 235 }];

for (const j of JOBS) {
  for (const s of SIZES) {
    const svg = CONCEPTS[j.c].fn(s.W, s.H, { bleed: j.bleed, mockup: false, paper: '#FFFFFF' });
    const r = new Resvg(svg, { fitTo: { mode: 'width', value: Math.round((s.W + j.bleed * 2) * ppm) }, font: FONT, background: '#FFFFFF' });
    fs.writeFileSync(path.join(OUT, `_${j.tag}_${s.k}.png`), r.render().asPng());
  }
}
console.log('print renders written (350dpi): B(+3mm), G/H(finished size)');
