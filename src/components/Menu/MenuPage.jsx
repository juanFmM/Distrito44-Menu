import { useEffect, useRef } from 'react'
import CategoryNav from './CategoryNav'
import MenuSection  from './MenuSection'

export default function MenuPage({ categories, items }) {
  const activeCategories = categories.filter((cat) =>
    items.some((item) => (item.categoryId || item.category_id) === cat.id)
  )

  const heroRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.22}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0e0e0e]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden pt-10 pb-10">
        {/* Glow fondo */}
        <div
          ref={heroRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(255,102,0,0.13) 0%, transparent 70%)',
          }}
        />
        {/* Grid decorativo */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 55px),' +
              'repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 55px)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          {/* Logo SVG */}
          <div className="anim-scale-in delay-0 flex justify-center mb-4">
            <img
              src="/logo-clean.svg"
              alt="Distrito 44"
              className="logo-glow h-24 sm:h-32 w-auto"
            />
          </div>

          <p className="anim-fade-in delay-2 flex items-center justify-center gap-3 text-gray-600 text-xs tracking-widest uppercase">
            <span className="w-8 h-px bg-[#ff6600]/30" />
            Garden Food Truck · Bella Vista
            <span className="w-8 h-px bg-[#ff6600]/30" />
          </p>

          <p className="anim-fade-in delay-3 text-gray-700 text-xs mt-2">
            Precios con impuestos incluidos
          </p>
        </div>
      </header>

      {/* ── Sticky nav ───────────────────────────────────────────────────── */}
      <CategoryNav categories={activeCategories} />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {activeCategories.map((cat) => (
          <MenuSection
            key={cat.id}
            category={cat}
            items={items.filter((i) => (i.categoryId || i.category_id) === cat.id)}
          />
        ))}

        {activeCategories.length === 0 && (
          <div className="anim-fade-up text-center py-32 text-gray-600">
            <p className="text-6xl mb-4">🍔</p>
            <p className="text-xl font-display tracking-wide">El menú está vacío</p>
            <p className="text-sm mt-2">Agrega categorías desde el panel de administración.</p>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-gray-800 text-xs border-t border-[#181818]">
        © Distrito 44 · Todos los derechos reservados
      </footer>
    </div>
  )
}
