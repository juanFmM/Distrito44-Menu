import { useState } from 'react'
import ImageLightbox from './ImageLightbox'

const BADGE_MAP = {
  '⭐ Popular':        'Popular',
  '🔥 Especial':       'Especial',
  '🌶️ Picante':       'Picante',
  '🍗 Combo':          'Combo',
  '🇦🇷 Clásica':      'Clásica',
  '🍫 Personalizable': 'Personalizable',
  '🆕 Nuevo':          'Nuevo',
}

function cleanBadge(badge) {
  if (!badge) return null
  return BADGE_MAP[badge] || badge.replace(/[\u{1F300}-\u{1FFFF}]/gu, '').trim() || null
}

export default function MenuItemCard({ item, index = 0 }) {
  const [lightbox, setLightbox] = useState(false)
  const image = item.imageUrl || item.image_url
  const badge = cleanBadge(item.badge)
  const delay = ['delay-0','delay-1','delay-2','delay-3','delay-4','delay-5'][index % 6]

  return (
    <>
      <article className={`menu-card anim-fade-up ${delay} bg-[#111009] border border-[#1e1b17] rounded-sm overflow-hidden flex flex-col`}>

        {/* Imagen clicable */}
        {image && (
          <div
            className="h-48 overflow-hidden relative cursor-zoom-in group"
            onClick={() => setLightbox(true)}
            role="button"
            tabIndex={0}
            aria-label={`Ver foto de ${item.name}`}
            onKeyDown={(e) => e.key === 'Enter' && setLightbox(true)}
          >
            <img
              src={image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => { e.target.parentElement.style.display = 'none' }}
              draggable={false}
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111009]/70 via-transparent to-transparent pointer-events-none" />

            {/* Zoom hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-[#0c0b09]/70 border border-[#2a2520] rounded-sm px-3 py-2 backdrop-blur-sm">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#e8e2d9]">
                  <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M6 8.5H11M8.5 6V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {badge && (
              <span className="absolute top-3 right-3 label-caps bg-[#0c0b09]/80 text-[#ff6600] border border-[#ff6600]/30 px-2.5 py-1 rounded-sm backdrop-blur-sm pointer-events-none">
                {badge}
              </span>
            )}
          </div>
        )}

        <div className="p-5 flex flex-col gap-3 flex-1">
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

      {lightbox && (
        <ImageLightbox
          src={image}
          alt={item.name}
          onClose={() => setLightbox(false)}
        />
      )}
    </>
  )
}
