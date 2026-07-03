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
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, categoryName: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectCategory(categoryName);
    }
  };

  return (
    <div className="categories" id="categories" style={{ position: "relative", zIndex: 40 }}>
      {categories.map((c) => {
        const isActive = selectedCategory === c.name && !showSavedOnly;
        
        return (
          <div
            key={c.name}
            className="cat-card"
            style={isActive ? { borderColor: "#3B5BFF", boxShadow: "0 10px 30px -10px rgba(59,91,255,0.25)" } : {}}
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory(c.name);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, c.name)}
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