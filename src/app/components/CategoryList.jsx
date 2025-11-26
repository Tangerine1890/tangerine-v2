import { CATEGORIES } from '../constants/index.js';

export const CategoryList = ({ selectedCategory, onCategoryChange, scrollRef }) => {
    return (
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar px-1" ref={scrollRef}>
            {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`flex-shrink-0 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 border backdrop-blur-md ${isActive
                            ? `bg-gradient-to-r ${category.gradient} text-white border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.3)] scale-105`
                            : `bg-white/5 text-white/60 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/10`
                            }`}
                    >
                        <span className={`mr-2 text-lg transition-transform duration-300 ${isActive ? 'scale-110 inline-block' : ''}`}>
                            {category.emoji}
                        </span>
                        {category.label}
                    </button>
                );
            })}
        </div>
    );
};
