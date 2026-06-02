import { useState } from 'react'

export default function CategoryForm({ onSave, onCancel, initial = {} }) {
  const [form, setForm] = useState({
    name:        initial.name        || '',
    emoji:       initial.emoji       || '—',   // mantenemos el campo pero sin mostrarlo
    description: initial.description || '',
  })

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-caps block mb-2">Nombre de la sección *</label>
        <input
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Ej: Bebidas artesanales"
          required
          className="w-full bg-[#0c0b09] border border-[#2a2520] rounded-sm px-4 py-3 text-[#e8e2d9] placeholder-[#3a342e] focus:outline-none focus:border-[#ff6600] text-sm transition-colors"
        />
      </div>

      <div>
        <label className="label-caps block mb-2">Descripción breve</label>
        <input
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Ej: Elaboradas con ingredientes locales"
          className="w-full bg-[#0c0b09] border border-[#2a2520] rounded-sm px-4 py-3 text-[#e8e2d9] placeholder-[#3a342e] focus:outline-none focus:border-[#ff6600] text-sm transition-colors"
        />
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
