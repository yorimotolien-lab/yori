#!/usr/bin/env python3
# Wrap the 350dpi renders (render-print.cjs) into print-ready PDFs.
#   フチなし製袋 : page = finished + 3mm bleed (B)
#   フチありG/H  : page = finished size (no bleed)
# Needs: pip install img2pdf
# Usage:  node render-print.cjs && python3 build-print-pdf.py
import os, glob, img2pdf

HERE = os.path.dirname(os.path.abspath(__file__))
PRINT = os.path.join(HERE, '..', 'print')

SIZES = {'kaku2': (240, 332, '角2号'), 'chokei3': (120, 235, '長形3号')}
JOBS = [('b', 'フチなし製袋', 3), ('g', 'フチありG', 0), ('h', 'フチありH', 0)]


def mk(png, out, w_mm, h_mm, bleed):
    pw, ph = img2pdf.mm_to_pt(w_mm + bleed * 2), img2pdf.mm_to_pt(h_mm + bleed * 2)
    with open(out, 'wb') as f:
        f.write(img2pdf.convert(os.path.join(PRINT, png), layout_fun=img2pdf.get_layout_fun((pw, ph))))
    print('wrote', os.path.basename(out))


# remove previous PDFs (clean, unambiguous filenames)
for old in glob.glob(os.path.join(PRINT, 'LIEN封筒_*.pdf')):
    os.remove(old)

for tag, label, bleed in JOBS:
    for k, (w, h, jp) in SIZES.items():
        mk(f'_{tag}_{k}.png', os.path.join(PRINT, f'LIEN封筒_{jp}_{label}.pdf'), w, h, bleed)

# drop intermediate renders
for p in glob.glob(os.path.join(PRINT, '_*.png')):
    os.remove(p)
