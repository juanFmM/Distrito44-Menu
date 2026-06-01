import { useState } from 'react';

const EMOJIS = ['🍔', '🍟', '🥩', '🌮', '🧀', '🍗', '🥖', '🍕', '🥗', '🍺', '🥤', '🧃', '☕', '🍓', '🍫', '🍰'];

export default function CategoryForm({ onSave, onCancel, initial = {} }) {
  const [form, setForm] = useState({
    name: initial.name || '',
    emoji: initial.emoji || '🍔',
    description: initial.description || '',
  });

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-400 mb-1">Nombre de categoría *</label>
        <input
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Ej: Bebidas"
          required
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4A017]"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Ícono</label>
        <div className="flex flex-wrap gap-2">
          {EMOJIS.map((em) => (
            <button
              type="button"
              key={em}
              onClick={() => set('emoji', em)}
              className={`text-xl w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer
                ${form.emoji === em ? 'bg-[#D4A017]' : 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'}`}
            >
              {em}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Descripción (opcional)</label>
        <input
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Ej: Refrescos, jugos y más"
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4A017]"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-[#D4A017] text-black font-semibold py-2.5 rounded-xl hover:bg-[#e6b020] transition-colors cursor-pointer"
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
  );
}
