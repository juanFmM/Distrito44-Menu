import MenuItemCard from './MenuItemCard'

export default function MenuSection({ category, items }) {
  if (items.length === 0) return null

  return (
    <section id={`cat-${category.id}`} className="scroll-mt-14 mb-16">
      {/* Section header */}
      <div className="anim-fade-in mb-8">
        <div className="flex items-center gap-5">
          <div className="flex-1 h-px bg-[#1e1b17]" />
          <div className="text-center">
            <p className="label-caps mb-1">{category.description || 'Selección'}</p>
            <h2 className="font-serif italic text-3xl sm:text-4xl text-[#e8e2d9] leading-tight">
              {category.name}
            </h2>
          </div>
          <div className="flex-1 h-px bg-[#1e1b17]" />
        </div>
        {/* Small orange dot accent */}
        <div className="flex justify-center mt-3">
          <span className="w-1 h-1 rounded-full bg-[#ff6600] opacity-60" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <MenuItemCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
