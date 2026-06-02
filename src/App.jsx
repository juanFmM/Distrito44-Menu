import { useState } from 'react'
import { useMenuData } from './hooks/useMenuData'
import { useAuth }     from './hooks/useAuth'
import MenuPage        from './components/Menu/MenuPage'
import AdminPanel      from './components/Admin/AdminPanel'
import LoginPage       from './components/Auth/LoginPage'
import './index.css'

function LoadingScreen({ label }) {
  return (
    <div className="min-h-screen bg-[#0c0b09] flex items-center justify-center">
      <div className="text-center">
        <img src="/logo-clean.svg" alt="Distrito 44" className="h-14 w-auto mx-auto mb-6 opacity-40" />
        <div className="flex justify-center mb-3">
          <div className="w-5 h-5 border border-[#ff6600]/40 border-t-[#ff6600] rounded-full animate-spin" />
        </div>
        <p className="label-caps">{label}</p>
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('menu')
  const { user, loading: authLoading, error: authError, signIn, signOut } = useAuth()
  const menuData = useMenuData()

  function handleAdminClick() {
    setView(user ? 'admin' : 'login')
  }

  async function handleLogin(email, password) {
    await signIn(email, password)
    setView('admin')
  }

  async function handleSignOut() {
    await signOut()
    setView('menu')
  }

  if (authLoading)    return <LoadingScreen label="Verificando sesión" />
  if (menuData.loading) return <LoadingScreen label="Cargando menú" />

  if (view === 'login') {
    return (
      <div className="relative">
        <LoginPage onLogin={handleLogin} error={authError} />
        <button
          onClick={() => setView('menu')}
          className="fixed top-5 left-5 label-caps text-[#3a342e] hover:text-[#e8e2d9] transition-colors cursor-pointer flex items-center gap-2"
        >
          ← Volver al menú
        </button>
      </div>
    )
  }

  if (view === 'admin') {
    if (!user) { setView('login'); return null }
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
          className="fab fixed bottom-6 right-6 label-caps border border-[#2a2520] bg-[#0f0d0b] text-[#8a7e74] hover:text-[#e8e2d9] hover:border-[#3a342e] px-5 py-3 rounded-sm shadow-xl cursor-pointer z-50"
        >
          Ver menú
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <MenuPage categories={menuData.categories} items={menuData.items} />
      <button
        onClick={handleAdminClick}
        className="fab fixed bottom-6 right-6 btn-brand label-caps px-5 py-3 rounded-sm shadow-xl cursor-pointer z-50"
      >
        {user ? 'Administrar' : 'Admin'}
      </button>
    </div>
  )
}
