#!/usr/bin/env python3
# Wrap the 300dpi bleed renders (render-print.cjs) into print-ready PDFs.
# Page size = finished size + 3mm bleed each side.  Needs: pip install img2pdf
# Usage:  node render-print.cjs && python3 build-print-pdf.py
import os, img2pdf

HERE = os.path.dirname(os.path.abspath(__file__))
PRINT = os.path.join(HERE, '..', 'print')


def mk(png, out, w_mm, h_mm):
    pw, ph = img2pdf.mm_to_pt(w_mm + 6), img2pdf.mm_to_pt(h_mm + 6)
    with open(out, 'wb') as f:
        f.write(img2pdf.convert(os.path.join(PRINT, png), layout_fun=img2pdf.get_layout_fun((pw, ph))))
    print('wrote', os.path.basename(out))


mk('_render_kaku2.png',   os.path.join(PRINT, 'LIEN封筒_角2号_入稿.pdf'),  240, 332)
mk('_render_chokei3.png', os.path.join(PRINT, 'LIEN封筒_長形3号_入稿.pdf'), 120, 235)

# remove the intermediate renders
for f in ('_render_kaku2.png', '_render_chokei3.png'):
    p = os.path.join(PRINT, f)
    if os.path.exists(p):
        os.remove(p)
