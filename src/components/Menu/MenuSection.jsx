import MenuItemCard from './MenuItemCard';

export default function MenuSection({ category, items }) {
  if (items.length === 0) return null;

  return (
    <section id={`cat-${category.id}`} className="scroll-mt-32">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{category.emoji}</span>
        <div>
          <h2 className="font-display text-4xl text-white">{category.name}</h2>
          {category.description && (
            <p className="text-gray-500 text-sm">{category.description}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
