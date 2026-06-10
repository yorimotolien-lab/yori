import json
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

data=json.load(open('_research/data.json'))

order={'高':0,'中':1,'低':2}
prefs=['千葉県','茨城県','埼玉県']

wb=Workbook()
# README sheet first
ws0=wb.active; ws0.title='このリストについて'

hdr_fill=PatternFill('solid',fgColor='1F4E78')
hdr_font=Font(bold=True,color='FFFFFF',size=11)
conf_fill={'高':PatternFill('solid',fgColor='C6E0B4'),'中':PatternFill('solid',fgColor='FFF2CC'),'低':PatternFill('solid',fgColor='F8CBAD')}
thin=Side(style='thin',color='BFBFBF')
border=Border(left=thin,right=thin,top=thin,bottom=thin)
cols=[('No',6),('会社名',26),('住所',40),('電話番号',15),('HP',34),('協力会社募集欄',18),('確度',7),('備考（特徴・除外チェック）',60)]

def style_sheet(ws, rows):
    # header
    for c,(name,w) in enumerate(cols,1):
        cell=ws.cell(1,c,name); cell.fill=hdr_fill; cell.font=hdr_font
        cell.alignment=Alignment(horizontal='center',vertical='center',wrap_text=True)
        cell.border=border
        ws.column_dimensions[get_column_letter(c)].width=w
    ws.row_dimensions[1].height=30
    r=2
    for i,rec in enumerate(rows,1):
        ws.cell(r,1,i)
        ws.cell(r,2,rec['name'])
        ws.cell(r,3,rec['address'])
        ws.cell(r,4,rec['phone'])
        hp=rec['hp']
        hc=ws.cell(r,5,hp)
        if hp.startswith('http'):
            hc.hyperlink=hp; hc.font=Font(color='0563C1',underline='single')
        part=rec.get('partner','不明')
        if part in ('不明','要確認',''): part='要確認（公式HP）'
        ws.cell(r,6,part)
        cf=ws.cell(r,7,rec['conf']); cf.alignment=Alignment(horizontal='center')
        if rec['conf'] in conf_fill: cf.fill=conf_fill[rec['conf']]
        ws.cell(r,8,rec['note'])
        for c in range(1,9):
            cell=ws.cell(r,c); cell.border=border
            cell.alignment=Alignment(vertical='top',wrap_text=True, horizontal='center' if c in (1,7) else 'left')
        r+=1
    ws.freeze_panes='A2'
    ws.auto_filter.ref=f"A1:H{r-1}"

for p in prefs:
    rows=[x for x in data if x['pref']==p]
    rows.sort(key=lambda x:(order.get(x['conf'],3)))
    ws=wb.create_sheet(p)
    style_sheet(ws,rows)

# README content
ws0['A1']='不動産賃貸管理会社リスト（千葉県・茨城県・埼玉県）'
ws0['A1'].font=Font(bold=True,size=14)
notes=[
 '',
 '■ 抽出条件（すべて満たす会社）',
 '  ・不動産賃貸管理がメイン事業（オーナーから賃貸物件の管理を受託）',
 '  ・社内に「管理部」と「リフォーム部（リフォーム/リノベ/工事事業）」の両方を持つ',
 '  ・地域密着型の独立系・地場企業',
 '',
 '■ 除外した会社',
 '  ・建設会社／工務店／ハウスメーカー／リフォーム専業（建築・施工が本業）',
 '  ・大手建設グループ（大和ハウス・積水ハウス系・大東建託・レオパレス・ポラス・新昭和 等）',
 '  ・建設会社/工務店をグループ・併設に持つ不動産会社（例：三共土地建物＝三共矢崎建設、桂不動産＝建築土木、太陽ハウス＝建築部門 等）',
 '  ・売買/買取が主で賃貸管理・リフォームが弱い会社',
 '',
 '■ 各シート：千葉県 / 茨城県 / 埼玉県（確度の高い順に並べ替え済み）',
 '',
 '■ 列の説明',
 '  会社名・住所・電話番号・HP・協力会社募集欄・確度・備考',
 '  ・協力会社募集欄：公式サイトに「協力会社/協力業者/職人募集」ページがあるか。',
 '    ※本調査は検索ベースのため大半は「要確認（公式HP）」。直接確認の追加調査が可能です。',
 '  ・確度：高=賃貸管理+リフォーム+建設系グループ無しを確認 / 中=おおむね該当 / 低=該当だが管理規模やリフォーム部の体制に要確認点あり',
 '',
 '■ 注意',
 '  ・電話番号「要確認」は検索で番号が特定できなかった社（公式HPに掲載あり）。',
 '  ・吉田不動産は本社が大宮(埼玉)・管理の主力は市川/船橋等(千葉)のため埼玉に収録。',
 '  ・社数：千葉17 / 茨城17 / 埼玉15（条件を満たす地場企業を優先。20社/県への増補・協力会社募集欄の精査も対応可能）',
 '  ・調査日：2026-06-10',
]
for i,t in enumerate(notes,3):
    c=ws0.cell(i,1,t)
    if t.startswith('■'): c.font=Font(bold=True,size=11,color='1F4E78')
ws0.column_dimensions['A'].width=110

fn='不動産賃貸管理会社リスト_千葉_茨城_埼玉_2026.xlsx'
wb.save(fn)
print('saved',fn)
import os; print('bytes',os.path.getsize(fn))
