import { useEffect, useState } from 'react'

export default function CategoryNav({ categories }) {
  const [active, setActive] = useState(categories[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(entry.target.id.replace('cat-', ''))
        })
      },
      { rootMargin: '-28% 0px -60% 0px' }
    )
    categories.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [categories])

  function scrollTo(id) {
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="sticky top-0 z-20 border-b border-[#1e1b17] py-0"
      style={{ background: 'rgba(12,11,9,0.92)', backdropFilter: 'blur(16px)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-0 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              style={{ animationDelay: `${i * 45}ms` }}
              className={`cat-pill anim-fade-in flex-shrink-0 px-5 py-4 text-xs font-semibold tracking-[0.16em] uppercase cursor-pointer transition-colors
                ${active === cat.id ? 'active text-[#ff6600]' : 'text-[#5a5248] hover:text-[#e8e2d9]'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
