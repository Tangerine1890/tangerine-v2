import { CATEGORIES } from '../constants/index.js';

export const CategoryList = ({ selectedCategory, onCategoryChange, scrollRef }) => {
    return (
        <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth" ref={scrollRef}>
            {CATEGORIES.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-bold transition-all ${selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.gradient} text-white scale-105 glow`
                        : `glass opacity-70 hover:opacity-100 hover:scale-105`
                        }`}
                >
                    <span className="mr-2">{category.emoji}</span>
                    {category.label}
                </button>
            ))}
        </div>
    );
};
