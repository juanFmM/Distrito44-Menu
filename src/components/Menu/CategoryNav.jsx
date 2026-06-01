import { useEffect, useState } from 'react'

export default function CategoryNav({ categories }) {
  const [active, setActive] = useState(categories[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace('cat-', ''))
          }
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
    <nav className="sticky top-0 z-20 bg-[#111111]/85 backdrop-blur-xl border-b border-[#1e1e1e] py-3.5 shadow-lg shadow-black/30">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              style={{ animationDelay: `${i * 50}ms` }}
              className={`cat-pill anim-fade-in flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border cursor-pointer
                ${active === cat.id
                  ? 'active bg-[#D4A017] text-black border-[#D4A017]'
                  : 'bg-transparent text-gray-400 border-[#2e2e2e] hover:border-[#D4A017]/50 hover:text-white'
                }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
