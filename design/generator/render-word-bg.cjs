// Render the Concept B design as transparent, full-page background PNGs for the
// Word document (logo + navy band only; no paper fill, so it prints straight
// onto the envelope stock). Output: ../word/bg-kaku2.png, ../word/bg-chokei3.png
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');
const { CONCEPTS } = require('./envelopes.cjs');

const OUT = path.resolve(__dirname, '..', 'word');
fs.mkdirSync(OUT, { recursive: true });
const FONT = { fontDirs: ['/usr/share/fonts'], loadSystemFonts: true, defaultFontFamily: 'Liberation Sans' };
const DPI = 200, ppm = DPI / 25.4;

function render(W, H, out) {
  const svg = CONCEPTS.B.fn(W, H, { bleed: 0, mockup: false, paper: 'none' }); // brand only, transparent
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: Math.round(W * ppm) }, font: FONT, background: 'rgba(0,0,0,0)' });
  fs.writeFileSync(out, r.render().asPng());
}
render(240, 332, path.join(OUT, 'bg-kaku2.png'));
render(120, 235, path.join(OUT, 'bg-chokei3.png'));
console.log('word backgrounds written to', OUT);
