import { useState, useRef } from 'react'

const BADGES = ['', 'Popular', 'Especial', 'Picante', 'Combo', 'Clásica', 'Personalizable', 'Nuevo']

export default function ItemForm({ categories, onSave, onCancel, initial = {}, uploadImage }) {
  const [form, setForm] = useState({
    categoryId:  initial.categoryId  || initial.category_id || categories[0]?.id || '',
    name:        initial.name        || '',
    description: initial.description || '',
    price:       initial.price       || '',
    badge:       cleanBadge(initial.badge) || '',
    imageUrl:    initial.imageUrl    || initial.image_url   || '',
  })
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  function cleanBadge(b) {
    if (!b) return ''
    return b.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{27BF}]/gu, '').trim()
  }

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

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.categoryId) return
    onSave({ ...form, price: form.price ? Number(form.price) : null })
  }

  const inputClass = "w-full bg-[#0c0b09] border border-[#2a2520] rounded-sm px-4 py-3 text-[#e8e2d9] placeholder-[#3a342e] focus:outline-none focus:border-[#ff6600] text-sm transition-colors"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-caps block mb-2">Sección *</label>
        <select
          value={form.categoryId}
          onChange={(e) => set('categoryId', e.target.value)}
          required
          className={inputClass}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label-caps block mb-2">Nombre del plato *</label>
        <input
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Ej: Pulled Pork Fries"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="label-caps block mb-2">Descripción</label>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Ingredientes, preparación, características..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label-caps block mb-2">Precio ($)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            placeholder="750"
            min={0}
            className={inputClass}
          />
        </div>
        <div>
          <label className="label-caps block mb-2">Etiqueta</label>
          <select
            value={form.badge}
            onChange={(e) => set('badge', e.target.value)}
            className={inputClass}
          >
            {BADGES.map((b) => (
              <option key={b} value={b}>{b || '— Sin etiqueta —'}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label-caps block mb-2">Fotografía</label>
        <div className="flex gap-2 items-start">
          <input
            value={form.imageUrl}
            onChange={(e) => set('imageUrl', e.target.value)}
            placeholder="https://... o subir archivo"
            className={`${inputClass} flex-1`}
          />
          {uploadImage && (
            <>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="border border-[#2a2520] text-[#5a5248] hover:border-[#ff6600] hover:text-[#ff6600] rounded-sm px-4 py-3 label-caps cursor-pointer transition-colors disabled:opacity-40"
              >
                {uploading ? '...' : 'Subir'}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImagePick} className="hidden" />
            </>
          )}
        </div>
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="preview"
            className="mt-2 h-20 w-32 object-cover rounded-sm border border-[#2a2520] opacity-80"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 btn-brand label-caps py-3 rounded-sm cursor-pointer"
        >
          Guardar
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-[#2a2520] text-[#5a5248] label-caps py-3 rounded-sm hover:text-[#e8e2d9] hover:border-[#3a342e] cursor-pointer transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
