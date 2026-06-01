import { useEffect, useState } from 'react';

export default function CategoryNav({ categories }) {
  const [active, setActive] = useState(categories[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('cat-', '');
            setActive(id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    categories.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  function scrollTo(id) {
    const el = document.getElementById(`cat-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <nav className="sticky top-0 z-20 bg-[#111111]/90 backdrop-blur-md border-b border-[#2e2e2e] py-3">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className={`category-pill flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border
                ${active === cat.id
                  ? 'bg-[#D4A017] text-black border-[#D4A017]'
                  : 'bg-transparent text-gray-400 border-[#2e2e2e] hover:border-[#D4A017] hover:text-white'
                }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
