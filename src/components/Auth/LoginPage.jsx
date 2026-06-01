import { useState } from 'react'

export default function LoginPage({ onLogin, error }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await onLogin(email, password)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="text-[#D4A017] text-xs font-medium tracking-widest uppercase mb-1">
            Panel de administración
          </p>
          <h1 className="font-display text-6xl text-white">Distrito 44</h1>
          <p className="text-gray-600 text-sm mt-1">Garden Food Truck</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl p-8">
          <h2 className="text-white font-semibold text-lg mb-6">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@distrito44.com"
                required
                autoComplete="email"
                className="w-full bg-[#111111] border border-[#3a3a3a] rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-[#D4A017] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full bg-[#111111] border border-[#3a3a3a] rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-[#D4A017] transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-950/40 border border-red-900/50 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4A017] text-black font-semibold py-3 rounded-xl hover:bg-[#e6b020] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              {loading ? 'Ingresando…' : 'Ingresar'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          Acceso solo para administradores
        </p>
      </div>
    </div>
  )
}
