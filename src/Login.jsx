import { useState } from 'react'

async function sha256(text) {
  const buf = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function Login({ onAuthed }) {
  const stored = localStorage.getItem('auth_hash')
  const isSetup = !stored
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (pw.length < 4) {
      setError('パスワードは4文字以上で入力してください')
      return
    }
    setBusy(true)
    try {
      const hash = await sha256(pw)
      if (isSetup) {
        if (pw !== pw2) {
          setError('パスワードが一致しません')
          setBusy(false)
          return
        }
        localStorage.setItem('auth_hash', hash)
        sessionStorage.setItem('authed', '1')
        onAuthed()
      } else {
        if (hash !== stored) {
          setError('パスワードが違います')
          setBusy(false)
          return
        }
        sessionStorage.setItem('authed', '1')
        onAuthed()
      }
    } finally {
      setBusy(false)
    }
  }

  const reset = () => {
    if (!confirm('パスワードをリセットしますか？\n保存済みのAPIキー・パスワードが削除されます。')) return
    localStorage.removeItem('auth_hash')
    localStorage.removeItem('anthropic_api_key')
    location.reload()
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <h1>📷 レシートAI仕訳</h1>
        <p className="sub">{isSetup ? '初回セットアップ：パスワードを設定' : 'ログイン'}</p>

        <label className="label">
          パスワード
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="input"
            autoFocus
            autoComplete={isSetup ? 'new-password' : 'current-password'}
          />
        </label>

        {isSetup && (
          <label className="label">
            パスワード（確認）
            <input
              type="password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              className="input"
              autoComplete="new-password"
            />
          </label>
        )}

        {error && <p className="err">{error}</p>}

        <button type="submit" className="btn primary login-btn" disabled={busy}>
          {isSetup ? 'パスワードを設定してはじめる' : 'ログイン'}
        </button>

        {!isSetup && (
          <button type="button" className="link-btn" onClick={reset}>
            パスワードを忘れた場合（リセット）
          </button>
        )}

        <p className="hint">
          ※ パスワードはこの端末のlocalStorageにハッシュ化して保存されます。サーバーには送信されません。
        </p>
      </form>
    </div>
  )
}

export default Login
