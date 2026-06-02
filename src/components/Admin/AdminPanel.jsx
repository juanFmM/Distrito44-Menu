import { useState } from 'react'
import CategoryForm from './CategoryForm'
import ItemForm from './ItemForm'
import Dashboard from './Dashboard'

export default function AdminPanel({
  categories, items,
  addCategory, updateCategory, deleteCategory,
  addItem, updateItem, deleteItem,
  resetToDefault, uploadImage,
  user, onSignOut, usingSupabase,
}) {
  const [tab, setTab]               = useState('dashboard')
  const [editingCat, setEditingCat] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [showNewCat, setShowNewCat] = useState(false)
  const [showNewItem, setShowNewItem] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [filterCat, setFilterCat]   = useState('all')
  const [actionError, setActionError] = useState(null)

  async function safe(fn) {
    setActionError(null)
    try { await fn() }
    catch (err) { setActionError(err.message) }
  }

  function getCategoryEmoji(id) {
    return categories.find((c) => c.id === id)?.emoji || ''
  }

  const filteredItems = filterCat === 'all'
    ? items
    : items.filter((i) => (i.categoryId || i.category_id) === filterCat)

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Header */}
      <header className="bg-[#111111] border-b border-[#2e2e2e] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo-clean.svg" alt="Distrito 44" className="h-9 w-auto opacity-90" />
          <div className="w-px h-6 bg-[#2e2e2e]" />
          <div>
            <h1 className="font-display text-xl text-white leading-none">Panel de Admin</h1>
            <p className="text-gray-600 text-xs">Garden Food Truck</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {usingSupabase && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-green-500 bg-green-950/30 border border-green-900/30 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
              Supabase
            </span>
          )}
          <span className="text-xs text-gray-600 hidden sm:block">
            {categories.length} cat · {items.length} platos
          </span>
          <button
            onClick={() => setConfirmReset(true)}
            className="text-xs text-gray-600 hover:text-red-400 transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-[#2e2e2e] hover:border-red-900"
          >
            Restaurar
          </button>
          <button
            onClick={onSignOut}
            className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-[#2e2e2e]"
            title={user?.email}
          >
            Salir
          </button>
        </div>
      </header>

      {/* User info banner */}
      {user && (
        <div className="bg-[#1a1a1a] border-b border-[#2e2e2e] px-6 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#ff6600] rounded-full"></div>
          <p className="text-xs text-gray-500">
            Sesión como <span className="text-gray-300">{user.email}</span>
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-[#2e2e2e] px-6">
        <div className="flex gap-1 max-w-4xl mx-auto">
          {[
            { key: 'dashboard',  label: '📊 Dashboard' },
            { key: 'items',      label: '🍔 Platos' },
            { key: 'categories', label: '📂 Categorías' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-3 text-sm font-medium transition-all cursor-pointer border-b-2 -mb-px
                ${tab === key ? 'text-[#ff6600] border-[#ff6600]' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* Error global */}
        {actionError && (
          <div className="bg-red-950/40 border border-red-900/50 rounded-xl px-4 py-3 mb-5 flex justify-between items-center">
            <p className="text-red-400 text-sm">{actionError}</p>
            <button onClick={() => setActionError(null)} className="text-red-600 hover:text-red-400 cursor-pointer text-lg leading-none">×</button>
          </div>
        )}

        {/* ── DASHBOARD TAB ── */}
        {tab === 'dashboard' && (
          <Dashboard
            categories={categories}
            items={items}
            updateItem={updateItem}
          />
        )}

        {/* ── ITEMS TAB ── */}
        {tab === 'items' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-white font-semibold text-lg">Platos del menú</h2>
                <p className="text-gray-600 text-sm">Gestiona todos los ítems.</p>
              </div>
              <button
                onClick={() => setShowNewItem(true)}
                className="bg-[#ff6600] text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-[#ff7a1a] transition-colors cursor-pointer text-sm whitespace-nowrap"
              >
                + Agregar plato
              </button>
            </div>

            {/* Filtro por categoría */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
              <button
                onClick={() => setFilterCat('all')}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer
                  ${filterCat === 'all' ? 'bg-[#ff6600] text-black border-[#ff6600]' : 'border-[#2e2e2e] text-gray-400 hover:border-[#ff6600]'}`}
              >
                Todos ({items.length})
              </button>
              {categories.map((cat) => {
                const count = items.filter((i) => (i.categoryId || i.category_id) === cat.id).length
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCat(cat.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer
                      ${filterCat === cat.id ? 'bg-[#ff6600] text-black border-[#ff6600]' : 'border-[#2e2e2e] text-gray-400 hover:border-[#ff6600]'}`}
                  >
                    {cat.emoji} {cat.name} ({count})
                  </button>
                )
              })}
            </div>

            {/* Formulario nuevo ítem */}
            {showNewItem && (
              <div className="bg-[#1a1a1a] border border-[#ff6600]/30 rounded-2xl p-5 mb-5">
                <h3 className="text-white font-semibold mb-4">Nuevo plato</h3>
                <ItemForm
                  categories={categories}
                  uploadImage={uploadImage}
                  onSave={(data) => safe(() => addItem(data)).then(() => setShowNewItem(false))}
                  onCancel={() => setShowNewItem(false)}
                />
              </div>
            )}

            {/* Lista */}
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <div key={item.id}>
                  {editingItem === item.id ? (
                    <div className="bg-[#1a1a1a] border border-[#ff6600]/30 rounded-2xl p-5">
                      <h3 className="text-white font-semibold mb-4">Editar plato</h3>
                      <ItemForm
                        categories={categories}
                        uploadImage={uploadImage}
                        initial={item}
                        onSave={(data) => safe(() => updateItem(item.id, data)).then(() => setEditingItem(null))}
                        onCancel={() => setEditingItem(null)}
                      />
                    </div>
                  ) : (
                    <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-3 flex items-center gap-3">
                      {(item.imageUrl || item.image_url) && (
                        <img
                          src={item.imageUrl || item.image_url}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#ff6600]">{getCategoryEmoji(item.categoryId || item.category_id)}</span>
                          <span className="text-white font-medium text-sm truncate">{item.name}</span>
                          {item.badge && <span className="text-xs text-gray-500 hidden sm:block">{item.badge}</span>}
                        </div>
                        <p className="text-gray-600 text-xs mt-0.5 truncate">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {item.price
                          ? <span className="text-[#ff6600] font-semibold text-sm">${item.price}</span>
                          : <span className="text-gray-600 text-xs">S/P</span>
                        }
                        <button onClick={() => setEditingItem(item.id)} className="text-gray-500 hover:text-white transition-colors cursor-pointer text-sm px-1">✏️</button>
                        <button onClick={() => safe(() => deleteItem(item.id))} className="text-gray-600 hover:text-red-400 transition-colors cursor-pointer text-sm px-1">🗑️</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="text-center py-12 text-gray-600">
                  <p className="text-3xl mb-2">🍽️</p>
                  <p>No hay platos en esta categoría.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CATEGORIES TAB ── */}
        {tab === 'categories' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-white font-semibold text-lg">Categorías</h2>
                <p className="text-gray-600 text-sm">Organiza el menú en secciones.</p>
              </div>
              <button
                onClick={() => setShowNewCat(true)}
                className="bg-[#ff6600] text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-[#ff7a1a] transition-colors cursor-pointer text-sm whitespace-nowrap"
              >
                + Nueva categoría
              </button>
            </div>

            {showNewCat && (
              <div className="bg-[#1a1a1a] border border-[#ff6600]/30 rounded-2xl p-5 mb-5">
                <h3 className="text-white font-semibold mb-4">Nueva categoría</h3>
                <CategoryForm
                  onSave={(data) => safe(() => addCategory(data)).then(() => setShowNewCat(false))}
                  onCancel={() => setShowNewCat(false)}
                />
              </div>
            )}

            <div className="space-y-2">
              {categories.map((cat) => {
                const count = items.filter((i) => (i.categoryId || i.category_id) === cat.id).length
                return (
                  <div key={cat.id}>
                    {editingCat === cat.id ? (
                      <div className="bg-[#1a1a1a] border border-[#ff6600]/30 rounded-2xl p-5">
                        <h3 className="text-white font-semibold mb-4">Editar categoría</h3>
                        <CategoryForm
                          initial={cat}
                          onSave={(data) => safe(() => updateCategory(cat.id, data)).then(() => setEditingCat(null))}
                          onCancel={() => setEditingCat(null)}
                        />
                      </div>
                    ) : (
                      <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-4 py-3 flex items-center gap-3">
                        <span className="text-2xl">{cat.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm">{cat.name}</p>
                          <p className="text-gray-600 text-xs">{cat.description || '—'} · {count} platos</p>
                        </div>
                        <button onClick={() => setEditingCat(cat.id)} className="text-gray-500 hover:text-white transition-colors cursor-pointer text-sm px-1">✏️</button>
                        <button onClick={() => safe(() => deleteCategory(cat.id))} className="text-gray-600 hover:text-red-400 transition-colors cursor-pointer text-sm px-1">🗑️</button>
                      </div>
                    )}
                  </div>
                )
              })}
              {categories.length === 0 && (
                <div className="text-center py-12 text-gray-600">
                  <p className="text-3xl mb-2">📂</p>
                  <p>No hay categorías creadas.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal reset */}
      {confirmReset && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-semibold text-lg mb-2">¿Restaurar menú?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Esto borrará todos los cambios y restaurará el menú original de Distrito 44.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => safe(resetToDefault).then(() => setConfirmReset(false))}
                className="flex-1 bg-red-600 text-white font-semibold py-2.5 rounded-xl hover:bg-red-500 transition-colors cursor-pointer"
              >
                Restaurar
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="flex-1 bg-[#2a2a2a] text-gray-300 py-2.5 rounded-xl hover:bg-[#3a3a3a] transition-colors cursor-pointer"
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

