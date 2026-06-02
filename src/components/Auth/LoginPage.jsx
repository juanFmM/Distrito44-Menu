import { useState } from 'react'

export default function LoginPage({ onLogin, error }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try { await onLogin(email, password) }
    finally { setLoading(false) }
  }

  const inputClass = "w-full bg-[#0a0908] border border-[#2a2520] rounded-sm px-4 py-3 text-[#e8e2d9] placeholder-[#3a342e] focus:outline-none focus:border-[#ff6600] text-sm transition-colors"

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: '#0c0b09',
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,102,0,0.07) 0%, transparent 60%)',
      }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="anim-fade-up text-center mb-12">
          <div className="flex justify-center mb-5">
            <img src="/logo-clean.svg" alt="Distrito 44" className="logo-glow h-16 w-auto" />
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#2a2520]" />
            <p className="label-caps">Acceso restringido</p>
            <span className="w-8 h-px bg-[#2a2520]" />
          </div>
        </div>

        {/* Formulario */}
        <div className="anim-fade-up delay-1 border border-[#1e1b17] bg-[#0f0d0b] rounded-sm p-8">
          <p className="label-caps mb-1">Administración</p>
          <h2 className="font-serif text-2xl text-[#e8e2d9] mb-6">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-caps block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@distrito44.com"
                required
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <div>
              <label className="label-caps block mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className={inputClass}
              />
            </div>

            {error && (
              <div className="border border-red-900/40 bg-red-950/20 rounded-sm px-4 py-3">
                <p className="text-red-500 text-sm font-light">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-brand label-caps py-3 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <p className="text-center label-caps mt-6" style={{ color: '#2a2520' }}>
          Solo para administradores
        </p>
      </div>
    </div>
  )
}
