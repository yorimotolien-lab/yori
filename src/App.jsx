import { useState } from 'react'
import * as XLSX from 'xlsx'
import './App.css'

const CATEGORIES = [
  '租税公課',
  '消耗品費',
  '車両費',
  '福利厚生費',
  '接待交際費',
  '通信費',
  '給与',
  '家賃光熱費',
  'その他',
]

const CATEGORY_HINTS = `
- 租税公課: 印紙、収入印紙、自動車税、固定資産税、登録免許税、各種税金
- 消耗品費: 文具、事務用品、雑貨、清掃用品、低額の備品
- 車両費: ガソリン、軽油、駐車場、車検、洗車、高速料金、車両整備
- 福利厚生費: 従業員の食事代、健康診断、慶弔費、社員旅行
- 接待交際費: 取引先との飲食、贈答品、お中元・お歳暮、ゴルフ等の接待
- 通信費: 電話、携帯、インターネット、切手、はがき、宅配便
- 給与: 給料、賞与、人件費
- 家賃光熱費: 家賃、電気、ガス、水道、地代
- その他: 上記のいずれにも当てはまらない
`

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      const base64 = result.split(',')[1]
      resolve({ base64, mediaType: file.type || 'image/jpeg' })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function classifyReceipt(file, apiKey) {
  const { base64, mediaType } = await fileToBase64(file)

  const prompt = `あなたは日本の経理担当者です。添付のレシート/領収書画像を解析し、以下のJSON形式のみで返してください（前置きや説明は不要）。

カテゴリ候補と判定基準:
${CATEGORY_HINTS}

返却JSON:
{
  "date": "YYYY-MM-DD（読み取れない場合は空文字）",
  "vendor": "店舗・支払先名",
  "amount": 数値（税込合計、円。読み取れない場合は0）,
  "category": "上記カテゴリのうち最も適切な1つ",
  "description": "摘要（品目要約、20文字以内）",
  "confidence": 0.0〜1.0の数値
}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-7',
      max_tokens: 600,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
            { type: 'text', text: prompt },
          ],
        },
      ],
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`API ${res.status}: ${errText}`)
  }
  const data = await res.json()
  const text = data?.content?.[0]?.text ?? ''
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('AI応答からJSONを抽出できませんでした')
  const parsed = JSON.parse(match[0])
  if (!CATEGORIES.includes(parsed.category)) parsed.category = 'その他'
  return parsed
}

function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('anthropic_api_key') || '')
  const [rows, setRows] = useState([])
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const [error, setError] = useState('')

  const saveKey = (k) => {
    setApiKey(k)
    localStorage.setItem('anthropic_api_key', k)
  }

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return
    if (!apiKey) {
      setError('APIキーを入力してください')
      return
    }
    setError('')
    setBusy(true)
    setProgress({ done: 0, total: files.length })

    const newRows = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const previewUrl = URL.createObjectURL(file)
      try {
        const result = await classifyReceipt(file, apiKey)
        newRows.push({
          id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
          fileName: file.name,
          previewUrl,
          date: result.date || '',
          vendor: result.vendor || '',
          amount: Number(result.amount) || 0,
          category: result.category || 'その他',
          description: result.description || '',
          confidence: result.confidence ?? null,
          error: null,
        })
      } catch (err) {
        newRows.push({
          id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
          fileName: file.name,
          previewUrl,
          date: '',
          vendor: '',
          amount: 0,
          category: 'その他',
          description: '',
          confidence: null,
          error: err.message,
        })
      }
      setProgress({ done: i + 1, total: files.length })
      setRows((prev) => [...prev, newRows[newRows.length - 1]])
    }
    setBusy(false)
  }

  const updateRow = (id, field, value) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: field === 'amount' ? Number(value) || 0 : value } : r)),
    )
  }

  const removeRow = (id) => {
    setRows((prev) => {
      const target = prev.find((r) => r.id === id)
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl)
      return prev.filter((r) => r.id !== id)
    })
  }

  const clearAll = () => {
    rows.forEach((r) => r.previewUrl && URL.revokeObjectURL(r.previewUrl))
    setRows([])
  }

  const exportExcel = () => {
    if (!rows.length) return
    const header = ['日付', '支払先', '金額', '勘定科目', '摘要', 'ファイル名', '信頼度']
    const data = rows.map((r) => [
      r.date,
      r.vendor,
      r.amount,
      r.category,
      r.description,
      r.fileName,
      r.confidence,
    ])

    const totalsByCategory = CATEGORIES.map((cat) => {
      const sum = rows.filter((r) => r.category === cat).reduce((a, b) => a + (Number(b.amount) || 0), 0)
      return [cat, sum]
    }).filter(([, sum]) => sum > 0)
    const grandTotal = rows.reduce((a, b) => a + (Number(b.amount) || 0), 0)

    const wb = XLSX.utils.book_new()

    const ws1 = XLSX.utils.aoa_to_sheet([header, ...data])
    ws1['!cols'] = [{ wch: 12 }, { wch: 24 }, { wch: 10 }, { wch: 12 }, { wch: 24 }, { wch: 28 }, { wch: 8 }]
    XLSX.utils.book_append_sheet(wb, ws1, '明細')

    const ws2 = XLSX.utils.aoa_to_sheet([
      ['勘定科目', '合計金額'],
      ...totalsByCategory,
      ['合計', grandTotal],
    ])
    ws2['!cols'] = [{ wch: 14 }, { wch: 14 }]
    XLSX.utils.book_append_sheet(wb, ws2, '科目別集計')

    const ymd = new Date().toISOString().slice(0, 10)
    XLSX.writeFile(wb, `経費仕訳_${ymd}.xlsx`)
  }

  const totalAmount = rows.reduce((a, b) => a + (Number(b.amount) || 0), 0)

  return (
    <div className="app">
      <header className="hdr">
        <h1>📷 レシートAI仕訳</h1>
        <p className="sub">スマホで撮影 → AIが勘定科目に分類 → Excel出力</p>
      </header>

      <section className="card">
        <label className="label">
          Anthropic APIキー
          <input
            type="password"
            value={apiKey}
            onChange={(e) => saveKey(e.target.value)}
            placeholder="sk-ant-..."
            className="input"
          />
        </label>
        <p className="hint">
          ※キーはブラウザのlocalStorageにのみ保存されます。公開端末では使用しないでください。
        </p>
      </section>

      <section className="card">
        <div className="btn-row">
          <label className="btn primary">
            📸 カメラで撮影
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFiles}
              disabled={busy}
              hidden
            />
          </label>
          <label className="btn">
            🖼 画像を選択（複数可）
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              disabled={busy}
              hidden
            />
          </label>
          <button className="btn" onClick={exportExcel} disabled={!rows.length || busy}>
            📊 Excel出力
          </button>
          <button className="btn danger" onClick={clearAll} disabled={!rows.length || busy}>
            🗑 全削除
          </button>
        </div>
        {busy && (
          <p className="status">解析中… {progress.done}/{progress.total}</p>
        )}
        {error && <p className="err">{error}</p>}
      </section>

      {rows.length > 0 && (
        <section className="card">
          <div className="summary">
            <span>件数: {rows.length}</span>
            <span>合計: ¥{totalAmount.toLocaleString()}</span>
          </div>
          <div className="table-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>画像</th>
                  <th>日付</th>
                  <th>支払先</th>
                  <th>金額</th>
                  <th>勘定科目</th>
                  <th>摘要</th>
                  <th>信頼度</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className={r.error ? 'row-err' : ''}>
                    <td>
                      <a href={r.previewUrl} target="_blank" rel="noreferrer">
                        <img src={r.previewUrl} alt="" className="thumb" />
                      </a>
                    </td>
                    <td>
                      <input
                        type="date"
                        value={r.date}
                        onChange={(e) => updateRow(r.id, 'date', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={r.vendor}
                        onChange={(e) => updateRow(r.id, 'vendor', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={r.amount}
                        onChange={(e) => updateRow(r.id, 'amount', e.target.value)}
                        className="num"
                      />
                    </td>
                    <td>
                      <select
                        value={r.category}
                        onChange={(e) => updateRow(r.id, 'category', e.target.value)}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        value={r.description}
                        onChange={(e) => updateRow(r.id, 'description', e.target.value)}
                      />
                    </td>
                    <td className="conf">
                      {r.error ? <span title={r.error}>⚠️</span> : r.confidence != null ? r.confidence.toFixed(2) : '-'}
                    </td>
                    <td>
                      <button className="x" onClick={() => removeRow(r.id)} aria-label="削除">
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <footer className="ftr">
        <small>勘定科目: {CATEGORIES.join(' / ')}</small>
      </footer>
    </div>
  )
}

export default App
