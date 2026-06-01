import MenuItemCard from './MenuItemCard'

export default function MenuSection({ category, items }) {
  if (items.length === 0) return null

  return (
    <section id={`cat-${category.id}`} className="scroll-mt-32 mb-14">
      <div className="anim-slide-r flex items-center gap-3 mb-7">
        <span className="text-4xl">{category.emoji}</span>
        <div>
          <h2 className="font-display text-4xl sm:text-5xl text-white leading-none">{category.name}</h2>
          {category.description && (
            <p className="text-gray-500 text-sm mt-0.5">{category.description}</p>
          )}
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-[#2e2e2e] to-transparent ml-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <MenuItemCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
