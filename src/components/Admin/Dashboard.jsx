import { useMemo, useEffect, useState } from 'react'

function useCountUp(target, duration = 900) {
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

function StatCard({ label, value, sub, color = '#ff6600', delay = 0 }) {
  const animated = useCountUp(typeof value === 'number' ? value : 0)
  return (
    <div
      className="stat-card anim-fade-up border border-[#1e1b17] bg-[#0f0d0b] rounded-sm p-5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="label-caps mb-2">{label}</p>
      <p className="font-display text-5xl leading-none" style={{ color }}>
        {typeof value === 'number' ? animated : value}
      </p>
      {sub && <p className="label-caps mt-2" style={{ color: '#3a342e' }}>{sub}</p>}
    </div>
  )
}

function TopBar({ item, maxSales, rank, delay }) {
  const pct    = maxSales > 0 ? Math.round((item.sales_count / maxSales) * 100) : 0
  const colors = ['#ff6600', '#9a9a9a', '#8b6f47', '#4a4440', '#4a4440']
  const color  = colors[rank] || '#3a342e'

  return (
    <div className="anim-fade-up flex items-center gap-4" style={{ animationDelay: `${delay}ms` }}>
      <span className="font-display text-2xl w-6 text-right flex-shrink-0" style={{ color }}>
        {rank + 1}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[#e8e2d9] text-sm font-medium truncate pr-2">{item.name}</span>
          <span className="label-caps flex-shrink-0" style={{ color }}>
            {item.sales_count}
          </span>
        </div>
        <div className="h-px bg-[#1e1b17] rounded-full overflow-hidden">
          <div
            className="dash-bar h-full"
            style={{
              '--bar-w': `${pct}%`,
              background: color,
              animationDelay: `${delay + 80}ms`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ categories, items, updateItem }) {
  const totalSales = items.reduce((s, i) => s + (i.sales_count || 0), 0)
  const withPhoto  = items.filter((i) => i.imageUrl || i.image_url).length
  const zeroSales  = items.filter((i) => !i.sales_count).length
  const topItems   = useMemo(() =>
    [...items].sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0)).slice(0, 8),
    [items]
  )
  const maxSales = topItems[0]?.sales_count || 1

  async function handleIncrement(item) {
    await updateItem(item.id, { ...item, sales_count: (item.sales_count || 0) + 1 })
  }

  return (
    <div className="space-y-8">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Platos en carta"    value={items.length}    sub={`${categories.length} secciones`}         delay={0}   />
        <StatCard label="Ventas registradas" value={totalSales}       sub="registro manual"                          delay={60}  />
        <StatCard label="Con fotografía"     value={withPhoto}        sub={`${items.length - withPhoto} sin foto`}   color="#5c7a5c" delay={120} />
        <StatCard label="Sin ventas"         value={zeroSales}        sub="platos sin registro"                      color="#7a6040" delay={180} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top vendidos */}
        <div className="border border-[#1e1b17] bg-[#0f0d0b] rounded-sm p-6">
          <p className="label-caps mb-1">Ranking</p>
          <h3 className="font-serif text-xl text-[#e8e2d9] mb-6">Más vendidos</h3>
          {totalSales === 0 ? (
            <div className="py-10 text-center">
              <p className="font-serif italic text-[#3a342e]">Sin ventas registradas aún</p>
              <p className="label-caps mt-2" style={{ color: '#2a2520' }}>
                Usá el botón agregar venta de abajo
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {topItems
                .filter(i => (i.sales_count || 0) > 0)
                .map((item, i) => (
                  <TopBar key={item.id} item={item} maxSales={maxSales} rank={i} delay={i * 45} />
                ))
              }
            </div>
          )}
        </div>

        {/* Por categoría */}
        <div className="border border-[#1e1b17] bg-[#0f0d0b] rounded-sm p-6">
          <p className="label-caps mb-1">Desglose</p>
          <h3 className="font-serif text-xl text-[#e8e2d9] mb-6">Ventas por sección</h3>
          <div className="space-y-1">
            {categories.map((cat, i) => {
              const catItems   = items.filter((it) => (it.categoryId || it.category_id) === cat.id)
              const totalCat   = catItems.reduce((s, it) => s + (it.sales_count || 0), 0)
              return (
                <div
                  key={cat.id}
                  className="anim-slide-r flex items-center justify-between py-3 border-b border-[#1a1714] last:border-0"
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  <div>
                    <p className="text-[#e8e2d9] text-sm">{cat.name}</p>
                    <p className="label-caps" style={{ color: '#3a342e' }}>{catItems.length} platos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-[#ff6600]">{totalCat}</p>
                    <p className="label-caps" style={{ color: '#3a342e' }}>ventas</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Registro manual */}
      <div className="border border-[#1e1b17] bg-[#0f0d0b] rounded-sm p-6">
        <p className="label-caps mb-1">Operación</p>
        <h3 className="font-serif text-xl text-[#e8e2d9] mb-2">Registrar ventas</h3>
        <p className="text-[#4a4440] text-sm font-light mb-6">
          Marcá cada venta manualmente para mantener el ranking actualizado en tiempo real.
        </p>

        <div className="space-y-1">
          {[...items]
            .sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
            .map((item, i) => {
              const section = categories.find(c => c.id === (item.categoryId || item.category_id))?.name || ''
              return (
                <div
                  key={item.id}
                  className="anim-fade-up flex items-center justify-between border border-[#1a1714] hover:border-[#2a2520] bg-[#0c0b09] rounded-sm px-4 py-2.5 transition-colors group"
                  style={{ animationDelay: `${i * 20}ms` }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="min-w-0">
                      <p className="text-[#e8e2d9] text-sm truncate">{item.name}</p>
                      <p className="label-caps" style={{ color: '#3a342e' }}>{section}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="font-display text-2xl text-[#ff6600]">
                      {item.sales_count || 0}
                    </span>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="label-caps border border-[#ff6600]/30 text-[#ff6600] hover:bg-[#ff6600] hover:text-white px-3 py-1.5 rounded-sm transition-all cursor-pointer"
                    >
                      + Venta
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
