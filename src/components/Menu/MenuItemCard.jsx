// Badge sin emoji — solo texto en small caps
const BADGE_MAP = {
  '⭐ Popular':           'Popular',
  '🔥 Especial':          'Especial',
  '🌶️ Picante':          'Picante',
  '🍗 Combo':             'Combo',
  '🇦🇷 Clásica':         'Clásica',
  '🍫 Personalizable':    'Personalizable',
  '🆕 Nuevo':             'Nuevo',
}

function cleanBadge(badge) {
  if (!badge) return null
  return BADGE_MAP[badge] || badge.replace(/[\u{1F300}-\u{1FFFF}]/gu, '').trim()
}

export default function MenuItemCard({ item, index = 0 }) {
  const image = item.imageUrl || item.image_url
  const badge = cleanBadge(item.badge)
  const delay = ['delay-0','delay-1','delay-2','delay-3','delay-4','delay-5'][index % 6]

  return (
    <article className={`menu-card anim-fade-up ${delay} bg-[#111009] border border-[#1e1b17] rounded-sm overflow-hidden flex flex-col`}>
      {image && (
        <div className="h-48 overflow-hidden relative">
          <img
            src={image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            onError={(e) => { e.target.parentElement.style.display = 'none' }}
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111009]/70 via-transparent to-transparent pointer-events-none" />
          {badge && (
            <span className="absolute top-3 right-3 label-caps bg-[#0c0b09]/80 text-[#ff6600] border border-[#ff6600]/30 px-2.5 py-1 rounded-sm backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Badge when no image */}
        {!image && badge && (
          <span className="label-caps text-[#ff6600] self-start border-b border-[#ff6600]/30 pb-0.5">
            {badge}
          </span>
        )}

        <h3 className="font-display text-2xl text-[#e8e2d9] leading-tight tracking-wide">
          {item.name}
        </h3>

        <p className="text-sm text-[#6b6459] leading-relaxed flex-1 font-light">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[#1e1b17]">
          {item.price ? (
            <span className="font-display text-3xl text-[#ff6600] tracking-wider">
              ${item.price}
            </span>
          ) : (
            <span className="font-serif italic text-sm text-[#4a4440]">A consultar</span>
          )}
        </div>
      </div>
    </article>
  )
}
