import { useMemo, useEffect, useState } from 'react'

function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (target === 0) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return value
}

function StatCard({ icon, label, value, sub, color = '#ff6600', delay = 0 }) {
  const animated = useCountUp(typeof value === 'number' ? value : 0)
  return (
    <div
      className="stat-card anim-fade-up bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl p-5 flex items-start gap-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: `${color}18` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
        <p className="font-display text-4xl leading-none" style={{ color }}>
          {typeof value === 'number' ? animated : value}
        </p>
        {sub && <p className="text-gray-600 text-xs mt-1">{sub}</p>}
      </div>
    </div>
  )
}

function TopBar({ item, maxSales, rank, delay }) {
  const pct = maxSales > 0 ? Math.round((item.sales_count / maxSales) * 100) : 0
  const colors = ['#ff6600', '#C0C0C0', '#CD7F32', '#6b7280', '#6b7280']
  const color  = colors[rank] || '#4b5563'

  return (
    <div
      className="anim-fade-up flex items-center gap-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Rank badge */}
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: `${color}22`, color }}
      >
        {rank + 1}
      </div>

      {/* Name + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-white text-sm font-medium truncate pr-2">{item.name}</span>
          <span className="text-xs font-semibold flex-shrink-0" style={{ color }}>
            {item.sales_count} vendidos
          </span>
        </div>
        <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
          <div
            className="dash-bar h-full rounded-full"
            style={{
              '--bar-w': `${pct}%`,
              background: `linear-gradient(90deg, ${color}, ${color}99)`,
              animationDelay: `${delay + 100}ms`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

function CategoryBreakdown({ categories, items }) {
  return (
    <div className="space-y-3">
      {categories.map((cat, i) => {
        const catItems = items.filter((it) => (it.categoryId || it.category_id) === cat.id)
        const totalSales = catItems.reduce((s, it) => s + (it.sales_count || 0), 0)
        return (
          <div
            key={cat.id}
            className="anim-slide-r flex items-center justify-between bg-[#1e1e1e] rounded-xl px-4 py-3"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{cat.emoji}</span>
              <div>
                <p className="text-white text-sm font-medium">{cat.name}</p>
                <p className="text-gray-600 text-xs">{catItems.length} platos</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#ff6600] font-semibold text-sm">{totalSales}</p>
              <p className="text-gray-600 text-xs">ventas</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Dashboard({ categories, items, updateItem }) {
  const totalSales    = items.reduce((s, i) => s + (i.sales_count || 0), 0)
  const withPhoto     = items.filter((i) => i.imageUrl || i.image_url).length
  const topItems      = useMemo(() =>
    [...items].sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0)).slice(0, 8),
    [items]
  )
  const maxSales      = topItems[0]?.sales_count || 1
  const zeroSales     = items.filter((i) => !i.sales_count).length

  async function handleIncrement(item) {
    await updateItem(item.id, { ...item, sales_count: (item.sales_count || 0) + 1 })
  }

  return (
    <div className="space-y-8">

      {/* ── Stat cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🍔" label="Platos"       value={items.length}      sub={`en ${categories.length} categorías`} delay={0} />
        <StatCard icon="📦" label="Ventas totales" value={totalSales}       sub="registradas manualmente"              delay={60} />
        <StatCard icon="📸" label="Con foto"      value={withPhoto}        sub={`${items.length - withPhoto} sin foto`} color="#22c55e" delay={120} />
        <StatCard icon="⚠️" label="Sin ventas"   value={zeroSales}        sub="platos sin registro aún"              color="#f59e0b" delay={180} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Top vendidos ─────────────────────────────────────────────── */}
        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold">🏆 Top vendidos</h3>
              <p className="text-gray-600 text-xs mt-0.5">Ordenados por cantidad de ventas</p>
            </div>
          </div>

          {totalSales === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p className="text-3xl mb-2">📊</p>
              <p className="text-sm">Aún no hay ventas registradas.</p>
              <p className="text-xs mt-1">Usá el botón <span className="text-[#ff6600]">+1 venta</span> en la lista de abajo.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topItems.filter(i => (i.sales_count || 0) > 0).map((item, i) => (
                <TopBar key={item.id} item={item} maxSales={maxSales} rank={i} delay={i * 50} />
              ))}
            </div>
          )}
        </div>

        {/* ── Ventas por categoría ─────────────────────────────────────── */}
        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-white font-semibold">📂 Ventas por categoría</h3>
            <p className="text-gray-600 text-xs mt-0.5">Suma de ventas por sección del menú</p>
          </div>
          <CategoryBreakdown categories={categories} items={items} />
        </div>
      </div>

      {/* ── Registro manual de ventas ────────────────────────────────────── */}
      <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl p-6">
        <div className="mb-5">
          <h3 className="text-white font-semibold">🖊️ Registrar ventas manualmente</h3>
          <p className="text-gray-600 text-xs mt-0.5">
            Tocá <span className="text-[#ff6600]">+1 venta</span> cada vez que vendas un plato para mantener el conteo actualizado.
          </p>
        </div>

        <div className="space-y-2">
          {[...items]
            .sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
            .map((item, i) => {
              const catEmoji = categories.find(c => c.id === (item.categoryId || item.category_id))?.emoji || ''
              return (
                <div
                  key={item.id}
                  className="anim-fade-up flex items-center justify-between bg-[#111111] border border-[#2e2e2e] rounded-xl px-4 py-2.5 hover:border-[#ff6600]/20 transition-colors"
                  style={{ animationDelay: `${i * 25}ms` }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base flex-shrink-0">{catEmoji}</span>
                    <span className="text-white text-sm font-medium truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[#ff6600] font-display text-xl w-8 text-right">
                      {item.sales_count || 0}
                    </span>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="bg-[#ff6600]/10 hover:bg-[#ff6600] text-[#ff6600] hover:text-black border border-[#ff6600]/30 hover:border-[#ff6600] text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap"
                    >
                      + 1 venta
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

