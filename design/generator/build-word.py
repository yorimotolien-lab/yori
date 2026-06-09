#!/usr/bin/env python3
# Assemble two self-contained Word .docx files — one per envelope size
# (角2号 240x332mm, 長形3号 120x235mm). Each is a single page at exact size
# with zero margins and the Concept B design as a full-bleed background image.
# Recipient is applied by an address label, so the page carries no text.
#
# Prereq: run `node render-word-bg.cjs` first to produce ../word/bg-*.png
# Usage:  python3 build-word.py
import os, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
WORD = os.path.join(HERE, '..', 'word')
NS_R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'

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
  '</Relationships>')

STYLES = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
  '<w:docDefaults><w:rPrDefault><w:rPr>'
  '<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="Yu Gothic" w:cs="Arial"/>'
  '<w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="en-US" w:eastAsia="ja-JP"/>'
  '</w:rPr></w:rPrDefault><w:pPrDefault/></w:docDefaults>'
  '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>'
  '</w:styles>')

SETTINGS = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  '<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:compat/></w:settings>')

CORE = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"'
  ' xmlns:dc="http://purl.org/dc/elements/1.1/">'
  '<dc:title>LIEN 封筒</dc:title><dc:creator>株式会社LIEN</dc:creator></cp:coreProperties>')

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


def anchor(cx, cy):
    return ('<w:r><w:drawing>'
      '<wp:anchor distT="0" distB="0" distL="0" distR="0" simplePos="0" relativeHeight="0"'
      ' behindDoc="1" locked="0" layoutInCell="1" allowOverlap="1">'
      '<wp:simplePos x="0" y="0"/>'
      '<wp:positionH relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionH>'
      '<wp:positionV relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionV>'
      f'<wp:extent cx="{cx}" cy="{cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:wrapNone/>'
      '<wp:docPr id="1" name="bg"/>'
      '<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>'
      '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic>'
      '<pic:nvPicPr><pic:cNvPr id="1" name="bg"/><pic:cNvPicPr/></pic:nvPicPr>'
      '<pic:blipFill><a:blip r:embed="rId100"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
      f'<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
      '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>'
      '</pic:pic></a:graphicData></a:graphic></wp:anchor></w:drawing></w:r>')


def build_one(out_name, w_tw, h_tw, cx_emu, cy_emu, bg_png):
    # single section, zero margins, one full-page background image
    sectpr = (f'<w:sectPr><w:pgSz w:w="{w_tw}" w:h="{h_tw}"/>'
      '<w:pgMar w:top="0" w:right="0" w:bottom="0" w:left="0" w:header="0" w:footer="0" w:gutter="0"/>'
      '<w:docGrid w:linePitch="360"/></w:sectPr>')
    body = f'<w:body><w:p><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr>{anchor(cx_emu, cy_emu)}</w:p>{sectpr}</w:body>'
    document = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + DOC_ROOT + body + '</w:document>'
    parts = {
      '[Content_Types].xml': CONTENT_TYPES, '_rels/.rels': RELS,
      'word/document.xml': document, 'word/_rels/document.xml.rels': DOC_RELS,
      'word/styles.xml': STYLES, 'word/settings.xml': SETTINGS,
      'docProps/core.xml': CORE, 'docProps/app.xml': APP,
    }
    out = os.path.join(WORD, out_name)
    if os.path.exists(out):
        os.remove(out)
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
        for name, data in parts.items():
            z.writestr(name, data)
        z.write(os.path.join(WORD, bg_png), 'word/media/image1.png')
    print('wrote', out, os.path.getsize(out), 'bytes')


# twips = mm * 1440 / 25.4 ;  EMU = mm * 36000
build_one('LIEN封筒_角2号.docx',   13606, 18822, 8640000, 11952000, 'bg-kaku2.png')    # 240 x 332
build_one('LIEN封筒_長形3号.docx',  6803, 13323, 4320000,  8460000, 'bg-chokei3.png')   # 120 x 235

# remove the previous combined file if present
old = os.path.join(WORD, 'lien-envelopes.docx')
if os.path.exists(old):
    os.remove(old)
