// Render "what each Word file prints": the transparent Concept B background
// flattened onto a white page (recipient is applied later via an address label).
// Output: ../preview/word-result-kaku2.png, ../preview/word-result-chokei3.png
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const WORD = path.resolve(__dirname, '..', 'word');
const PREV = path.resolve(__dirname, '..', 'preview');

function preview(W, H, bgFile, out) {
  const b64 = fs.readFileSync(bgFile).toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${W} ${H}">`
    + `<rect width="${W}" height="${H}" fill="#ffffff"/>`
    + `<image x="0" y="0" width="${W}" height="${H}" xlink:href="data:image/png;base64,${b64}"/></svg>`;
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: Math.round(W * 6) }, background: '#ffffff' });
  fs.writeFileSync(out, r.render().asPng());
}

preview(240, 332, path.join(WORD, 'bg-kaku2.png'), path.join(PREV, 'word-result-kaku2.png'));
preview(120, 235, path.join(WORD, 'bg-chokei3.png'), path.join(PREV, 'word-result-chokei3.png'));
console.log('word previews written');
