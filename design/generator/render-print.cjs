// Render Concept B at 350dpi WITH 3mm bleed (white background) for print.
// Output PNGs feed build-print-pdf.py (img2pdf) -> ../print/*.pdf
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');
const { CONCEPTS } = require('./envelopes.cjs');

const OUT = path.resolve(__dirname, '..', 'print');
fs.mkdirSync(OUT, { recursive: true });
const FONT = { fontDirs: ['/usr/share/fonts'], loadSystemFonts: true, defaultFontFamily: 'Liberation Sans' };
const ppm = 350 / 25.4; // 350 dpi (print)

function render(W, H, name) {
  const svg = CONCEPTS.B.fn(W, H, { bleed: 3, mockup: false, paper: '#FFFFFF' });
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: Math.round((W + 6) * ppm) }, font: FONT, background: '#FFFFFF' });
  fs.writeFileSync(path.join(OUT, name), r.render().asPng());
}
render(240, 332, '_render_kaku2.png');
render(120, 235, '_render_chokei3.png');
console.log('print renders written (300dpi, +3mm bleed)');
