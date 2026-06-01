import CategoryNav from './CategoryNav';
import MenuSection from './MenuSection';

export default function MenuPage({ categories, items }) {
  const activeCategories = categories.filter((cat) =>
    items.some((item) => item.categoryId === cat.id)
  );

  return (
    <div className="min-h-screen bg-[#111111]">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4A017]/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <p className="text-[#D4A017] text-sm font-medium tracking-widest uppercase mb-2">
            Garden Food Truck · Bella Vista
          </p>
          <h1 className="font-display text-7xl sm:text-9xl text-white mb-2 leading-none">
            Distrito 44
          </h1>
          <p className="text-gray-500 text-sm">
            Precios con impuestos incluidos
          </p>
        </div>
      </header>

      {/* Nav sticky */}
      <CategoryNav categories={activeCategories} />

      {/* Sections */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        {activeCategories.map((cat) => (
          <MenuSection
            key={cat.id}
            category={cat}
            items={items.filter((i) => i.categoryId === cat.id)}
          />
        ))}

        {activeCategories.length === 0 && (
          <div className="text-center py-24 text-gray-600">
            <p className="text-5xl mb-4">🍔</p>
            <p className="text-lg">El menú está vacío.</p>
            <p className="text-sm mt-1">Agrega categorías e ítems desde el panel de administración.</p>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-gray-700 text-xs border-t border-[#1e1e1e]">
        © Distrito 44 · Todos los derechos reservados
      </footer>
    </div>
  );
}
