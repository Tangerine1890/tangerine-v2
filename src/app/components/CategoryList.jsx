import { CATEGORIES } from '../constants/index.js';

export const CategoryList = ({ selectedCategory, onCategoryChange, scrollRef }) => {
    return (
        <div className="flex gap-2.5 overflow-x-auto pb-3 hide-scrollbar px-1" ref={scrollRef}>
            {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-xs transition-all duration-300 border backdrop-blur-md ${isActive
                            ? `bg-gradient-to-r ${category.gradient} text-white border-transparent shadow-[0_3px_10px_rgba(0,0,0,0.25)] scale-105`
                            : `bg-white/5 text-white/60 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/10 hover:scale-102`
                            }`}
                    >
                        <span className={`mr-1.5 text-base transition-transform duration-300 ${isActive ? 'scale-110 inline-block' : ''}`}>
                            {category.emoji}
                        </span>
                        {category.label}
                    </button>
                );
            })}
        </div>
    );
};
