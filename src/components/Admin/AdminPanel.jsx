import { useState } from 'react'
import CategoryForm from './CategoryForm'
import ItemForm from './ItemForm'
import Dashboard from './Dashboard'

const TABS = [
  { key: 'dashboard',  label: 'Dashboard' },
  { key: 'items',      label: 'Platos' },
  { key: 'categories', label: 'Categorías' },
]

export default function AdminPanel({
  categories, items,
  addCategory, updateCategory, deleteCategory,
  addItem, updateItem, deleteItem,
  resetToDefault, uploadImage,
  user, onSignOut, usingSupabase,
}) {
  const [tab, setTab]                 = useState('dashboard')
  const [editingCat, setEditingCat]   = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [showNewCat, setShowNewCat]   = useState(false)
  const [showNewItem, setShowNewItem] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [filterCat, setFilterCat]     = useState('all')
  const [actionError, setActionError] = useState(null)

  async function safe(fn) {
    setActionError(null)
    try { await fn() }
    catch (err) { setActionError(err.message) }
  }

  function getCategoryName(id) {
    return categories.find((c) => c.id === id)?.name || '—'
  }

  const filteredItems = filterCat === 'all'
    ? items
    : items.filter((i) => (i.categoryId || i.category_id) === filterCat)

  return (
    <div className="min-h-screen bg-[#0c0b09]">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="border-b border-[#1e1b17] px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(12,11,9,0.96)' }}>
        <div className="flex items-center gap-4">
          <img src="/logo-clean.svg" alt="Distrito 44" className="h-8 w-auto opacity-80" />
          <div className="w-px h-5 bg-[#2a2520]" />
          <p className="label-caps" style={{ color: '#4a4440' }}>Panel de administración</p>
        </div>

        <div className="flex items-center gap-4">
          {usingSupabase && (
            <span className="hidden sm:flex items-center gap-1.5 label-caps text-green-600 border border-green-900/40 px-2.5 py-1 rounded-sm">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              Supabase
            </span>
          )}
          <span className="hidden sm:block label-caps" style={{ color: '#3a342e' }}>
            {categories.length} secciones · {items.length} platos
          </span>
          <button
            onClick={() => setConfirmReset(true)}
            className="label-caps text-[#3a342e] hover:text-red-500 transition-colors cursor-pointer px-3 py-1.5 border border-[#1e1b17] hover:border-red-900/50 rounded-sm"
          >
            Restaurar
          </button>
          <button
            onClick={onSignOut}
            className="label-caps text-[#3a342e] hover:text-[#e8e2d9] transition-colors cursor-pointer px-3 py-1.5 border border-[#1e1b17] rounded-sm"
            title={user?.email}
          >
            Salir
          </button>
        </div>
      </header>

      {/* Session bar */}
      {user && (
        <div className="border-b border-[#1a1714] px-6 py-2 flex items-center gap-2"
          style={{ background: 'rgba(255,102,0,0.03)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600]" />
          <p className="label-caps">
            Sesión activa — <span className="text-[#8a7e74]">{user.email}</span>
          </p>
        </div>
      )}

      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-[#1e1b17] px-6">
        <div className="flex max-w-4xl mx-auto">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative px-6 py-4 label-caps cursor-pointer transition-colors
                ${tab === key ? 'text-[#ff6600]' : 'text-[#4a4440] hover:text-[#8a7e74]'}`}
            >
              {label}
              {tab === key && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#ff6600]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {actionError && (
          <div className="border border-red-900/50 bg-red-950/20 rounded-sm px-4 py-3 mb-6 flex justify-between items-center">
            <p className="text-red-400 text-sm">{actionError}</p>
            <button onClick={() => setActionError(null)} className="text-red-700 hover:text-red-400 cursor-pointer ml-4">×</button>
          </div>
        )}

        {/* Dashboard */}
        {tab === 'dashboard' && (
          <Dashboard categories={categories} items={items} updateItem={updateItem} />
        )}

        {/* Platos */}
        {tab === 'items' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="label-caps mb-1">Gestión</p>
                <h2 className="font-serif text-2xl text-[#e8e2d9]">Platos del menú</h2>
              </div>
              <button
                onClick={() => setShowNewItem(true)}
                className="btn-brand label-caps px-5 py-2.5 rounded-sm cursor-pointer"
              >
                + Agregar plato
              </button>
            </div>

            {/* Filtros */}
            <div className="flex gap-0 mb-6 overflow-x-auto border-b border-[#1e1b17] [&::-webkit-scrollbar]:hidden">
              <button
                onClick={() => setFilterCat('all')}
                className={`relative flex-shrink-0 px-4 py-3 label-caps cursor-pointer transition-colors
                  ${filterCat === 'all' ? 'text-[#ff6600]' : 'text-[#4a4440] hover:text-[#8a7e74]'}`}
              >
                Todos ({items.length})
                {filterCat === 'all' && <span className="absolute bottom-0 left-0 right-0 h-px bg-[#ff6600]" />}
              </button>
              {categories.map((cat) => {
                const count = items.filter((i) => (i.categoryId || i.category_id) === cat.id).length
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCat(cat.id)}
                    className={`relative flex-shrink-0 px-4 py-3 label-caps cursor-pointer transition-colors
                      ${filterCat === cat.id ? 'text-[#ff6600]' : 'text-[#4a4440] hover:text-[#8a7e74]'}`}
                  >
                    {cat.name} ({count})
                    {filterCat === cat.id && <span className="absolute bottom-0 left-0 right-0 h-px bg-[#ff6600]" />}
                  </button>
                )
              })}
            </div>

            {/* Formulario nuevo */}
            {showNewItem && (
              <div className="border border-[#ff6600]/20 bg-[#111009] rounded-sm p-6 mb-6">
                <p className="label-caps mb-4">Nuevo plato</p>
                <ItemForm
                  categories={categories}
                  uploadImage={uploadImage}
                  onSave={(data) => safe(() => addItem(data)).then(() => setShowNewItem(false))}
                  onCancel={() => setShowNewItem(false)}
                />
              </div>
            )}

            <div className="space-y-1">
              {filteredItems.map((item) => (
                <div key={item.id}>
                  {editingItem === item.id ? (
                    <div className="border border-[#ff6600]/20 bg-[#111009] rounded-sm p-6 mb-2">
                      <p className="label-caps mb-4">Editar plato</p>
                      <ItemForm
                        categories={categories}
                        uploadImage={uploadImage}
                        initial={item}
                        onSave={(data) => safe(() => updateItem(item.id, data)).then(() => setEditingItem(null))}
                        onCancel={() => setEditingItem(null)}
                      />
                    </div>
                  ) : (
                    <div className="border border-[#1a1714] hover:border-[#2a2520] bg-[#0f0d0b] rounded-sm px-4 py-3 flex items-center gap-3 transition-colors group">
                      {(item.imageUrl || item.image_url) && (
                        <img
                          src={item.imageUrl || item.image_url}
                          alt={item.name}
                          className="w-11 h-11 object-cover rounded-sm flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[#e8e2d9] text-sm font-medium truncate">{item.name}</span>
                          <span className="label-caps text-[#3a342e] hidden sm:block">
                            {getCategoryName(item.categoryId || item.category_id)}
                          </span>
                        </div>
                        <p className="text-[#4a4440] text-xs mt-0.5 truncate font-light">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        {item.price
                          ? <span className="font-display text-[#ff6600] text-xl">${item.price}</span>
                          : <span className="label-caps text-[#3a342e]">S/P</span>
                        }
                        <button onClick={() => setEditingItem(item.id)} className="label-caps text-[#3a342e] hover:text-[#e8e2d9] cursor-pointer transition-colors px-1">Editar</button>
                        <button onClick={() => safe(() => deleteItem(item.id))} className="label-caps text-[#3a342e] hover:text-red-500 cursor-pointer transition-colors px-1">Borrar</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="text-center py-16">
                  <p className="font-serif italic text-[#3a342e] text-lg">Sin platos en esta sección</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categorías */}
        {tab === 'categories' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="label-caps mb-1">Gestión</p>
                <h2 className="font-serif text-2xl text-[#e8e2d9]">Secciones del menú</h2>
              </div>
              <button
                onClick={() => setShowNewCat(true)}
                className="btn-brand label-caps px-5 py-2.5 rounded-sm cursor-pointer"
              >
                + Nueva sección
              </button>
            </div>

            {showNewCat && (
              <div className="border border-[#ff6600]/20 bg-[#111009] rounded-sm p-6 mb-6">
                <p className="label-caps mb-4">Nueva categoría</p>
                <CategoryForm
                  onSave={(data) => safe(() => addCategory(data)).then(() => setShowNewCat(false))}
                  onCancel={() => setShowNewCat(false)}
                />
              </div>
            )}

            <div className="space-y-1">
              {categories.map((cat) => {
                const count = items.filter((i) => (i.categoryId || i.category_id) === cat.id).length
                return (
                  <div key={cat.id}>
                    {editingCat === cat.id ? (
                      <div className="border border-[#ff6600]/20 bg-[#111009] rounded-sm p-6 mb-2">
                        <p className="label-caps mb-4">Editar categoría</p>
                        <CategoryForm
                          initial={cat}
                          onSave={(data) => safe(() => updateCategory(cat.id, data)).then(() => setEditingCat(null))}
                          onCancel={() => setEditingCat(null)}
                        />
                      </div>
                    ) : (
                      <div className="border border-[#1a1714] hover:border-[#2a2520] bg-[#0f0d0b] rounded-sm px-4 py-3 flex items-center justify-between transition-colors group">
                        <div>
                          <p className="text-[#e8e2d9] font-medium text-sm">{cat.name}</p>
                          <p className="label-caps text-[#3a342e] mt-0.5">{cat.description || '—'} · {count} platos</p>
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => setEditingCat(cat.id)} className="label-caps text-[#3a342e] hover:text-[#e8e2d9] cursor-pointer transition-colors">Editar</button>
                          <button onClick={() => safe(() => deleteCategory(cat.id))} className="label-caps text-[#3a342e] hover:text-red-500 cursor-pointer transition-colors">Borrar</button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
              {categories.length === 0 && (
                <div className="text-center py-16">
                  <p className="font-serif italic text-[#3a342e] text-lg">Sin secciones creadas</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal reset */}
      {confirmReset && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111009] border border-[#2a2520] rounded-sm p-8 max-w-sm w-full">
            <p className="label-caps mb-2">Confirmar acción</p>
            <h3 className="font-serif text-xl text-[#e8e2d9] mb-3">¿Restaurar el menú original?</h3>
            <p className="text-[#5a5248] text-sm mb-6 font-light">
              Se eliminarán todos los cambios y se restaurará el menú original de Distrito 44.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => safe(resetToDefault).then(() => setConfirmReset(false))}
                className="flex-1 bg-red-700 hover:bg-red-600 text-white label-caps py-3 rounded-sm cursor-pointer transition-colors"
              >
                Restaurar
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="flex-1 border border-[#2a2520] text-[#5a5248] label-caps py-3 rounded-sm hover:text-[#e8e2d9] hover:border-[#3a342e] cursor-pointer transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
