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
      if (heroRef.current)
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0c0b09]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden pt-14 pb-10">
        {/* Warm radial glow */}
        <div
          ref={heroRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% -5%, rgba(255,102,0,0.10) 0%, transparent 70%)',
          }}
        />
        {/* Subtle horizontal rule texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#c8b89a 0,#c8b89a 1px,transparent 1px,transparent 48px)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          {/* Logo */}
          <div className="anim-scale-in delay-0 flex justify-center mb-6">
            <img
              src="/logo-clean.svg"
              alt="Distrito 44"
              className="logo-glow h-20 sm:h-28 w-auto"
            />
          </div>

          {/* Divider */}
          <div className="anim-fade-in delay-2 flex items-center justify-center gap-4 mb-3">
            <span className="flex-shrink-0 w-12 h-px bg-[#ff6600]/30" />
            <span className="label-caps tracking-[0.22em]">Garden Food Truck · Bella Vista</span>
            <span className="flex-shrink-0 w-12 h-px bg-[#ff6600]/30" />
          </div>

          <p className="anim-fade-in delay-3 label-caps mt-1" style={{ color: '#3d3830' }}>
            Precios con impuestos incluidos
          </p>
        </div>
      </header>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <CategoryNav categories={activeCategories} />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-14">
        {activeCategories.map((cat) => (
          <MenuSection
            key={cat.id}
            category={cat}
            items={items.filter((i) => (i.categoryId || i.category_id) === cat.id)}
          />
        ))}

        {activeCategories.length === 0 && (
          <div className="anim-fade-up text-center py-36">
            <p className="font-serif italic text-2xl text-[#3d3830] mb-2">El menú está vacío</p>
            <p className="label-caps">Agrega platos desde el panel de administración</p>
          </div>
        )}
      </main>

      <footer className="text-center py-10 border-t border-[#1a1714]">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="w-8 h-px bg-[#2a2520]" />
          <img src="/logo-clean.svg" alt="" className="h-6 w-auto opacity-20" />
          <span className="w-8 h-px bg-[#2a2520]" />
        </div>
        <p className="label-caps" style={{ color: '#2a2520' }}>
          © Distrito 44 · Todos los derechos reservados
        </p>
      </footer>
    </div>
  )
}
