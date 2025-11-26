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
                {/* Compact Hero Card - Logo + CAN 2025 */}
                <div
                    onClick={() => handleCategoryChange('packs_can')}
                    className="mb-4 relative overflow-hidden rounded-2xl bg-gradient-to-r from-can-green-dark to-black border border-can-gold/20 cursor-pointer group shadow-lg"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
                    <div className="relative z-10 p-3 flex gap-3">
                        {/* Left: Logo - Full Height */}
                        <img
                            src={LOGO_URL}
                            alt="Logo"
                            loading="eager"
                            className="w-14 h-full rounded-xl border-2 border-can-gold/30 shadow-lg object-cover flex-shrink-0"
                            onError={(event) => {
                                event.target.src = 'https://s10.aconvert.com/convert/p3r68-cdx67/avr8y-z3sxq.jpg';
                            }}
                        />

                        {/* Right: Stacked Content */}
                        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                            {/* Top: TANGERINE Branding - Full Width */}
                            <div>
                                <h1 className="text-xl font-black gradient-text tracking-tight leading-tight">TANGERINE</h1>
                                <p className="text-white/60 text-[9px] font-medium">Premium Quality</p>
                            </div>

                            {/* Bottom: CAN 2025 Info - Centered */}
                            <div className="flex items-center justify-center gap-2 text-[10px]">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-base">🏆</span>
                                    <h3 className="text-white font-bold text-sm leading-tight">CAN 2025</h3>
                                </div>
                                <p className="text-can-gold font-semibold tracking-wide">
                                    Dispo dans <span className="text-white font-bold">16j</span>
                                </p>
                                <div className="flex items-center gap-1">
                                    <span className="text-white text-[10px] font-bold group-hover:text-can-gold transition-colors">Voir packs</span>
                                    <span className="text-white text-xs group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
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
