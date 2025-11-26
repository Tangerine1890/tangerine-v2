import { LOGO_URL } from '../utils/analytics.js';
import { CategoryList } from '../components/CategoryList.jsx';
import { ProductGrid } from '../components/ProductGrid.jsx';

export const Home = ({
    theme,
    selectedCategory,
    handleCategoryChange,
    productsToDisplay,
    handleAddToCart,
    handleAnimateAdd,
    setSelectedProduct,
    wishlist,
    handleToggleWishlist,
    categoryScrollRef
}) => {
    const textSecondaryClasses = theme === 'light' ? 'text-slate-600' : 'text-white/60';

    return (
        <>
            <div className="h-8" />

            <header className="relative z-10 max-w-7xl mx-auto px-4 pb-2 pt-2 telegram-header">
                {/* Minimal Hero Card - TANGERINE + CAN 2025 */}
                <div
                    className="mb-4 relative overflow-hidden rounded-2xl bg-gradient-to-br from-can-green-dark via-black to-can-green-dark/50 border border-can-gold/30 shadow-xl"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-can-gold/10 blur-3xl rounded-full"></div>

                    <div className="relative z-10 p-4 flex flex-col gap-3">
                        {/* TANGERINE - Expanded */}
                        <h1 className="text-3xl font-black gradient-text tracking-[0.25em] leading-tight uppercase text-center">
                            TANGERINE
                        </h1>

                        {/* CAN 2025 + Button */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <span className="text-xl">🏆</span>
                                <h3 className="text-white font-bold text-lg tracking-wide">CAN 2025</h3>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCategoryChange('packs_can');
                                }}
                                className="px-5 py-2 rounded-full bg-gradient-to-r from-can-gold to-can-copper text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
                            >
                                Voir Packs
                            </button>
                        </div>
                    </div>
                </div>

                <CategoryList
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    scrollRef={categoryScrollRef}
                />
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
                <ProductGrid
                    products={productsToDisplay}
                    onAddToCart={handleAddToCart}
                    onAnimateAdd={handleAnimateAdd}
                    onViewDetails={setSelectedProduct}
                    wishlist={wishlist}
                    onToggleWishlist={handleToggleWishlist}
                />
            </main>
        </>
    );
};
