import { useState, useRef } from 'react'

const BADGES = ['', '⭐ Popular', '🔥 Especial', '🌶️ Picante', '🍗 Combo', '🇦🇷 Clásica', '🍫 Personalizable', '🆕 Nuevo']

export default function ItemForm({ categories, onSave, onCancel, initial = {}, uploadImage }) {
  const [form, setForm] = useState({
    categoryId:  initial.categoryId  || initial.category_id || categories[0]?.id || '',
    name:        initial.name        || '',
    description: initial.description || '',
    price:       initial.price       || '',
    badge:       initial.badge       || '',
    imageUrl:    initial.imageUrl    || initial.image_url || '',
  })
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleImagePick(e) {
    const file = e.target.files?.[0]
    if (!file || !uploadImage) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      if (url) set('imageUrl', url)
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.categoryId) return
    onSave({ ...form, price: form.price ? Number(form.price) : null })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-400 mb-1">Categoría *</label>
        <select
          value={form.categoryId}
          onChange={(e) => set('categoryId', e.target.value)}
          required
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6600]"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.emoji} {cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Nombre del plato *</label>
        <input
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Ej: BBQ Burger"
          required
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6600]"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Descripción</label>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Ingredientes y detalles..."
          rows={3}
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6600] resize-none"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-1">Precio ($)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            placeholder="750"
            min={0}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6600]"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-1">Badge</label>
          <select
            value={form.badge}
            onChange={(e) => set('badge', e.target.value)}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6600]"
          >
            {BADGES.map((b) => <option key={b} value={b}>{b || '— Sin badge —'}</option>)}
          </select>
        </div>
      </div>

      {/* Imagen */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Imagen del plato</label>
        <div className="flex gap-3 items-start">
          <input
            value={form.imageUrl}
            onChange={(e) => set('imageUrl', e.target.value)}
            placeholder="https://... o subí un archivo →"
            className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6600] text-sm"
          />
          {uploadImage && (
            <>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-3 py-2.5 text-gray-400 hover:text-white hover:border-[#ff6600] transition-colors cursor-pointer text-sm disabled:opacity-50"
              >
                {uploading ? '…' : '📁'}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImagePick} className="hidden" />
            </>
          )}
        </div>
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="preview"
            className="mt-2 h-20 w-32 object-cover rounded-lg border border-[#3a3a3a]"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-[#ff6600] text-black font-semibold py-2.5 rounded-xl hover:bg-[#ff7a1a] transition-colors cursor-pointer"
        >
          Guardar
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-[#2a2a2a] text-gray-300 py-2.5 rounded-xl hover:bg-[#3a3a3a] transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

