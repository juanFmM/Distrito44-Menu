import { useState } from 'react'
import { useMenuData } from './hooks/useMenuData'
import { useAuth }     from './hooks/useAuth'
import MenuPage        from './components/Menu/MenuPage'
import AdminPanel      from './components/Admin/AdminPanel'
import LoginPage       from './components/Auth/LoginPage'
import './index.css'

export default function App() {
  const [view, setView]         = useState('menu') // 'menu' | 'admin' | 'login'
  const { user, loading: authLoading, error: authError, signIn, signOut } = useAuth()
  const menuData = useMenuData()

  // ── Ir al panel admin ─────────────────────────────────────────────────────
  function handleAdminClick() {
    if (user) {
      setView('admin')
    } else {
      setView('login')
    }
  }

  async function handleLogin(email, password) {
    await signIn(email, password)
    setView('admin')
  }

  async function handleSignOut() {
    await signOut()
    setView('menu')
  }

  // ── Loading auth ──────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#ff6600] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Cargando…</p>
        </div>
      </div>
    )
  }

  // ── Loading menu data ─────────────────────────────────────────────────────
  if (menuData.loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl text-[#ff6600] mb-3">Distrito 44</p>
          <div className="w-6 h-6 border-2 border-[#ff6600] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  // ── Login page ────────────────────────────────────────────────────────────
  if (view === 'login') {
    return (
      <div className="relative">
        <LoginPage onLogin={handleLogin} error={authError} />
        <button
          onClick={() => setView('menu')}
          className="fixed top-4 left-4 text-sm text-gray-600 hover:text-gray-300 transition-colors cursor-pointer flex items-center gap-1"
        >
          ← Volver al menú
        </button>
      </div>
    )
  }

  // ── Admin panel (protegido) ───────────────────────────────────────────────
  if (view === 'admin') {
    if (!user) {
      setView('login')
      return null
    }
    return (
      <div className="relative">
        <AdminPanel
          {...menuData}
          user={user}
          onSignOut={handleSignOut}
          usingSupabase={menuData.usingSupabase}
        />
        <button
          onClick={() => setView('menu')}
          className="fab fixed bottom-6 right-6 flex items-center gap-2 bg-white text-black font-semibold px-5 py-3 rounded-full shadow-xl cursor-pointer text-sm z-50"
        >
          👁️ Ver menú
        </button>
      </div>
    )
  }

  // ── Menú público ──────────────────────────────────────────────────────────
  return (
    <div className="relative">
      <MenuPage categories={menuData.categories} items={menuData.items} />

      {/* FAB — solo visible para admin o para ir a login */}
      <button
        onClick={handleAdminClick}
        className="fab fixed bottom-6 right-6 flex items-center gap-2 bg-[#ff6600] text-black font-semibold px-5 py-3 rounded-full shadow-xl cursor-pointer text-sm z-50"
      >
        {user ? '⚙️ Administrar' : '🔐 Admin'}
      </button>
    </div>
  )
}

