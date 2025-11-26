import { CATEGORIES } from '../constants/index.js';

export const CategoryList = ({ selectedCategory, onCategoryChange, scrollRef }) => {
    return (
        <div className="flex gap-3 overflow-x-auto pb-3 hide-scrollbar" ref={scrollRef}>
            {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`
                            flex-shrink-0 px-5 py-2.5 rounded-full font-bold text-sm 
                            transition-all duration-300 backdrop-blur-xl
                            ${isActive
                                ? `bg-gradient-to-r ${category.gradient} text-white shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)] scale-105 border border-white/20`
                                : `bg-gradient-to-br from-white/8 to-white/4 text-white/70 border border-white/10 hover:from-white/12 hover:to-white/8 hover:text-white hover:border-white/20 hover:scale-102 shadow-sm`
                            }
                        `}
                    >
                        <span className={`mr-2 text-base transition-all duration-300 ${isActive ? 'scale-110 inline-block drop-shadow-lg' : ''}`}>
                            {category.emoji}
                        </span>
                        <span className="tracking-wide">{category.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
