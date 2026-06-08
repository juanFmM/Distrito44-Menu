import { useState } from 'react'

const ICON_OPTIONS = [
  { icon: 'fa-solid fa-utensils',       label: 'General' },
  { icon: 'fa-solid fa-burger',         label: 'Burger' },
  { icon: 'fa-solid fa-bread-slice',    label: 'Pan' },
  { icon: 'fa-solid fa-cheese',         label: 'Queso' },
  { icon: 'fa-solid fa-fire',           label: 'Premium' },
  { icon: 'fa-solid fa-bowl-food',      label: 'Bowl' },
  { icon: 'fa-solid fa-ice-cream',      label: 'Postre' },
  { icon: 'fa-solid fa-hotdog',         label: 'Hot Dog' },
  { icon: 'fa-solid fa-drumstick-bite', label: 'Pollo' },
  { icon: 'fa-solid fa-seedling',       label: 'Vegetal' },
  { icon: 'fa-solid fa-pepper-hot',     label: 'Picante' },
  { icon: 'fa-solid fa-star',           label: 'Especial' },
  { icon: 'fa-solid fa-glass-water',    label: 'Bebida' },
  { icon: 'fa-solid fa-fish',           label: 'Mariscos' },
  { icon: 'fa-solid fa-bacon',          label: 'Bacon' },
  { icon: 'fa-solid fa-egg',            label: 'Huevo' },
]

export default function CategoryForm({ onSave, onCancel, initial = {} }) {
  const [form, setForm] = useState({
    name:        initial.name        || '',
    icon:        initial.icon        || 'fa-solid fa-utensils',
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
        <label className="label-caps block mb-2">Ícono</label>
        <div className="grid grid-cols-8 gap-1.5">
          {ICON_OPTIONS.map((opt) => (
            <button
              key={opt.icon}
              type="button"
              title={opt.label}
              onClick={() => set('icon', opt.icon)}
              className="flex items-center justify-center h-9 rounded-sm border cursor-pointer transition-all"
              style={{
                borderColor: form.icon === opt.icon ? '#ff6600' : '#2a2520',
                background:  form.icon === opt.icon ? 'rgba(255,102,0,0.12)' : 'transparent',
                color:       form.icon === opt.icon ? '#ff6600' : '#5a5248',
              }}
            >
              <i className={`${opt.icon} text-sm`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <i className={`${form.icon} text-[#ff6600] text-sm`} />
          <span className="label-caps text-[#5a5248] text-[0.6rem]">{form.icon}</span>
        </div>
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
