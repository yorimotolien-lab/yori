#!/usr/bin/env python3
# Assemble a self-contained Word .docx with two pages — 角2号 (240x332mm) and
# 長形3号 (120x235mm) — each carrying the Concept B design as a full-page
# background image (behind text) plus an editable recipient block.
#
# Prereq: run `node render-word-bg.cjs` first to produce ../word/bg-*.png
# Usage:  python3 build-word.py   ->  ../word/lien-envelopes.docx
import os, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
WORD = os.path.join(HERE, '..', 'word')
OUT = os.path.join(WORD, 'lien-envelopes.docx')

NS_R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'

# ---- fixed package parts ----------------------------------------------------
CONTENT_TYPES = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
  '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
  '<Default Extension="xml" ContentType="application/xml"/>'
  '<Default Extension="png" ContentType="image/png"/>'
  '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
  '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'
  '<Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>'
  '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>'
  '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>'
  '</Types>')

RELS = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
  '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
  '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>'
  '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>'
  '</Relationships>')

DOC_RELS = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
  '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
  '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>'
  f'<Relationship Id="rId100" Type="{NS_R}/image" Target="media/image1.png"/>'
  f'<Relationship Id="rId101" Type="{NS_R}/image" Target="media/image2.png"/>'
  '</Relationships>')

STYLES = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
  '<w:docDefaults><w:rPrDefault><w:rPr>'
  '<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="Yu Gothic" w:cs="Arial"/>'
  '<w:sz w:val="24"/><w:szCs w:val="24"/><w:lang w:val="en-US" w:eastAsia="ja-JP"/>'
  '</w:rPr></w:rPrDefault><w:pPrDefault/></w:docDefaults>'
  '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>'
  '</w:styles>')

SETTINGS = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  '<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:compat/></w:settings>')

CORE = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"'
  ' xmlns:dc="http://purl.org/dc/elements/1.1/">'
  '<dc:title>LIEN 封筒（角2号・長形3号）</dc:title><dc:creator>株式会社LIEN</dc:creator></cp:coreProperties>')

APP = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">'
  '<Application>LIEN brand generator</Application></Properties>')

DOC_ROOT = ('<w:document'
  ' xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"'
  ' xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"'
  ' xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"'
  ' xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"'
  ' xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"'
  ' xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"'
  ' xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="wp14">')

# ---- builders ---------------------------------------------------------------
def anchor(rid, cx, cy, idn, name):
    return ('<w:r><w:drawing>'
      '<wp:anchor distT="0" distB="0" distL="0" distR="0" simplePos="0" relativeHeight="0"'
      ' behindDoc="1" locked="0" layoutInCell="1" allowOverlap="1">'
      '<wp:simplePos x="0" y="0"/>'
      '<wp:positionH relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionH>'
      '<wp:positionV relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionV>'
      f'<wp:extent cx="{cx}" cy="{cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:wrapNone/>'
      f'<wp:docPr id="{idn}" name="{name}"/>'
      '<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>'
      '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic>'
      f'<pic:nvPicPr><pic:cNvPr id="{idn}" name="{name}"/><pic:cNvPicPr/></pic:nvPicPr>'
      f'<pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
      f'<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
      '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>'
      '</pic:pic></a:graphicData></a:graphic></wp:anchor></w:drawing></w:r>')

def run(text, sz, bold=False):
    rpr = '<w:rPr>' + ('<w:b/>' if bold else '') + f'<w:sz w:val="{sz}"/><w:szCs w:val="{sz}"/></w:rPr>'
    return f'<w:r>{rpr}<w:t xml:space="preserve">{text}</w:t></w:r>'

def para(inner, after):
    return f'<w:p><w:pPr><w:spacing w:after="{after}"/></w:pPr>{inner}</w:p>'

POSTAL = ('〒　　-　　　　', 24)                       # postal code — top of page
NAME = [('（ご住所）', 24), ('（会社名・部署名）', 24), ('（ご担当者名）　様', 32)]  # 宛名 — centre

def section(img, gap, sectpr=None):
    # postal code at the top (carries the background image), then a large gap
    out = [para(img + run(POSTAL[0], POSTAL[1]), gap)]
    # recipient name/address, centred down the page
    for t, sz in NAME:
        out.append(para(run(t, sz, bold=(sz >= 32)), 180 if sz >= 32 else 100))
    if sectpr:
        out.append(f'<w:p><w:pPr>{sectpr}</w:pPr></w:p>')
    return ''.join(out)

def sectpr(w, h, top, right, bottom, left):
    return (f'<w:sectPr><w:pgSz w:w="{w}" w:h="{h}"/>'
      f'<w:pgMar w:top="{top}" w:right="{right}" w:bottom="{bottom}" w:left="{left}"'
      ' w:header="720" w:footer="720" w:gutter="0"/>'
      '<w:cols w:space="720"/><w:docGrid w:type="lines" w:linePitch="360"/></w:sectPr>')

# twips = mm * 1440 / 25.4 ;  EMU = mm * 36000
# small top margin -> postal code near the top; gap pushes 宛名 to the centre
KAKU2 = sectpr(13606, 18822, 2268, 1134, 3290, 2041)   # 240x332, 〒~40mm top
CHOKEI3 = sectpr(6803, 13323, 1587, 567, 2381, 1020)   # 120x235, 〒~28mm top
GAP_KAKU2, GAP_CHOKEI3 = 5600, 4000                    # spacing after 〒 (twips)
img1 = anchor('rId100', 8640000, 11952000, 1, 'bg-kaku2')
img2 = anchor('rId101', 4320000, 8460000, 2, 'bg-chokei3')

document = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + DOC_ROOT + '<w:body>'
  + section(img1, GAP_KAKU2, KAKU2) + section(img2, GAP_CHOKEI3) + CHOKEI3 + '</w:body></w:document>')

# ---- write package ----------------------------------------------------------
parts = {
  '[Content_Types].xml': CONTENT_TYPES,
  '_rels/.rels': RELS,
  'word/document.xml': document,
  'word/_rels/document.xml.rels': DOC_RELS,
  'word/styles.xml': STYLES,
  'word/settings.xml': SETTINGS,
  'docProps/core.xml': CORE,
  'docProps/app.xml': APP,
}
media = {'word/media/image1.png': os.path.join(WORD, 'bg-kaku2.png'),
         'word/media/image2.png': os.path.join(WORD, 'bg-chokei3.png')}

if os.path.exists(OUT):
    os.remove(OUT)
with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
    for name, data in parts.items():
        z.writestr(name, data)
    for name, src in media.items():
        z.write(src, name)
print('wrote', OUT, os.path.getsize(OUT), 'bytes')
