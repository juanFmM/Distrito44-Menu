export default function MenuItemCard({ item, index = 0 }) {
  const image = item.imageUrl || item.image_url
  const delay = ['delay-0','delay-1','delay-2','delay-3','delay-4','delay-5'][index % 6]

  return (
    <div className={`menu-card anim-fade-up ${delay} bg-[#1e1e1e] border border-[#2e2e2e] rounded-2xl overflow-hidden flex flex-col`}>
      {image && (
        <div className="h-48 overflow-hidden relative">
          <img
            src={image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => { e.target.parentElement.style.display = 'none' }}
          />
          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e]/60 to-transparent pointer-events-none" />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-display text-2xl text-white leading-tight">{item.name}</h3>
          {item.badge && (
            <span className="text-xs bg-[#ff6600]/10 text-[#ff6600] border border-[#ff6600]/20 px-2.5 py-1 rounded-full whitespace-nowrap font-medium flex-shrink-0">
              {item.badge}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-400 leading-relaxed flex-1">{item.description}</p>

        <div className="flex items-center justify-between mt-1 pt-3 border-t border-[#2e2e2e]">
          {item.price ? (
            <span className="font-display text-3xl text-[#ff6600]">${item.price}</span>
          ) : (
            <span className="text-sm text-gray-500 italic">Precio a consultar</span>
          )}
        </div>
      </div>
    </div>
  )
}

