import { useEffect, useRef } from 'react'
import CategoryNav from './CategoryNav'
import MenuSection  from './MenuSection'

export default function MenuPage({ categories, items }) {
  const activeCategories = categories.filter((cat) =>
    items.some((item) => (item.categoryId || item.category_id) === cat.id)
  )

  // Parallax sutil en el hero
  const heroRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#111111]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden pt-16 pb-12">
        {/* Glow background */}
        <div
          ref={heroRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,160,23,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Decorative grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <p className="anim-fade-in delay-0 text-[#D4A017] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Garden Food Truck · Bella Vista
          </p>
          <h1 className="anim-fade-up delay-1 hero-text font-display text-8xl sm:text-[10rem] leading-none mb-4">
            Distrito 44
          </h1>
          <div className="anim-fade-in delay-2 flex items-center justify-center gap-3 text-gray-600 text-sm">
            <span className="w-8 h-px bg-[#2e2e2e]" />
            <span>Precios con impuestos incluidos</span>
            <span className="w-8 h-px bg-[#2e2e2e]" />
          </div>
        </div>
      </header>

      {/* ── Sticky nav ───────────────────────────────────────────────────── */}
      <CategoryNav categories={activeCategories} />

      {/* ── Menu content ─────────────────────────────────────────────────── */}
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
            <p className="text-sm mt-2">Agrega categorías e ítems desde el panel de administración.</p>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-gray-800 text-xs border-t border-[#1a1a1a]">
        © Distrito 44 · Todos los derechos reservados
      </footer>
    </div>
  )
}
