// Render a "what the Word file produces" preview: the transparent Concept B
// background on a white page + a sample (editable) recipient block, mirroring
// the section margins used in build-word.py.
// Output: ../preview/word-result-kaku2.png, ../preview/word-result-chokei3.png
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const WORD = path.resolve(__dirname, '..', 'word');
const PREV = path.resolve(__dirname, '..', 'preview');
const FONT = { fontDirs: ['/usr/share/fonts'], loadSystemFonts: true, defaultFontFamily: 'Liberation Sans' };
const JP = 'IPAPGothic, IPAGothic, sans-serif';

function preview(W, H, bgFile, out, sample, topMM, leftMM) {
  const b64 = fs.readFileSync(bgFile).toString('base64');
  let s = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${W} ${H}">`;
  s += `<rect width="${W}" height="${H}" fill="#ffffff"/>`;
  s += `<image x="0" y="0" width="${W}" height="${H}" xlink:href="data:image/png;base64,${b64}"/>`;
  let y = topMM + W * 0.030;
  for (const [t, fz] of sample) { s += `<text x="${leftMM}" y="${y}" font-family="${JP}" font-size="${fz}" fill="#111">${t}</text>`; y += fz * 1.7; }
  s += `</svg>`;
  const r = new Resvg(s, { fitTo: { mode: 'width', value: Math.round(W * 6) }, font: FONT, background: '#ffffff' });
  fs.writeFileSync(out, r.render().asPng());
}

preview(240, 332, path.join(WORD, 'bg-kaku2.png'), path.join(PREV, 'word-result-kaku2.png'),
  [['〒100-0005', 5.2], ['東京都千代田区丸の内1-1-1', 5.2], ['株式会社サンプル　御中', 5.2], ['山田　太郎　様', 7.0]], 110, 36);
preview(120, 235, path.join(WORD, 'bg-chokei3.png'), path.join(PREV, 'word-result-chokei3.png'),
  [['〒100-0005', 4.0], ['東京都千代田区丸の内1-1-1', 4.0], ['株式会社サンプル　御中', 4.0], ['山田　太郎　様', 5.4]], 78, 18);
console.log('word previews written');
