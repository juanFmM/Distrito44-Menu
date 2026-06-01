export default function MenuItemCard({ item }) {
  const image = item.imageUrl || item.image_url

  return (
    <div className="menu-card bg-[#1e1e1e] border border-[#2e2e2e] rounded-2xl overflow-hidden flex flex-col">
      {image && (
        <div className="h-44 overflow-hidden">
          <img
            src={image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.parentElement.style.display = 'none' }}
          />
        </div>
      )}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-display text-2xl text-white leading-tight">{item.name}</h3>
          {item.badge && (
            <span className="text-xs bg-[#2e2e2e] text-[#D4A017] px-2 py-1 rounded-full whitespace-nowrap font-medium flex-shrink-0">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400 leading-relaxed flex-1">{item.description}</p>
        <div className="flex items-center justify-between mt-1">
          {item.price ? (
            <span className="font-display text-3xl text-[#D4A017]">${item.price}</span>
          ) : (
            <span className="text-sm text-gray-500 italic">Precio a consultar</span>
          )}
        </div>
      </div>
    </div>
  )
}
