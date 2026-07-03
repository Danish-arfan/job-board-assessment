"use client";

interface Category {
  name: string;
  count: string;
  icon: string;
  bg: string;
  color: string;
}

interface CategoriesGridProps {
  categories: Category[];
  selectedCategory: string;
  showSavedOnly: boolean;
  onSelectCategory: (categoryName: string) => void;
}

export default function CategoriesGrid({
  categories,
  selectedCategory,
  showSavedOnly,
  onSelectCategory,
}: CategoriesGridProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <div className="categories" id="categories">
      {categories.map((c) => {
        const isActive = selectedCategory === c.name && !showSavedOnly;
        return (
          <div
            key={c.name}
            className="cat-card"
            style={isActive ? { borderColor: "#3B5BFF", boxShadow: "0 10px 30px -10px rgba(59,91,255,0.25)" } : {}}
            onClick={() => onSelectCategory(c.name)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="cat-top">
              <div className="cat-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
              <div className="cat-arrow" style={isActive ? { background: "#3B5BFF", color: "#fff" } : {}}>→</div>
            </div>
            <div>
              <div className="cat-name">{c.name}</div>
              <div className="cat-count">{c.count}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}