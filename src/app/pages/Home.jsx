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
                    <div className="relative z-10 p-4 flex items-center justify-between gap-3">
                        {/* Left: Logo + Branding */}
                        <div className="flex items-center gap-3">
                            <img
                                src={LOGO_URL}
                                alt="Logo"
                                loading="eager"
                                className="w-14 h-14 rounded-xl border-2 border-can-gold/30 shadow-lg object-cover"
                                onError={(event) => {
                                    event.target.src = 'https://s10.aconvert.com/convert/p3r68-cdx67/avr8y-z3sxq.jpg';
                                }}
                            />
                            <div>
                                <h1 className="text-xl font-black gradient-text tracking-tight leading-tight">TANGERINE</h1>
                                <p className="text-white/60 text-[10px] font-medium">Premium Quality</p>
                            </div>
                        </div>

                        {/* Right: CAN 2025 + Countdown */}
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🏆</span>
                                <h3 className="text-white font-bold text-base leading-tight">CAN 2025</h3>
                            </div>
                            <p className="text-can-gold text-[10px] font-semibold tracking-wide">
                                Dispo dans <span className="text-white">16j</span>
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-white text-xs font-bold group-hover:text-can-gold transition-colors">Voir packs</span>
                                <span className="text-white text-sm group-hover:translate-x-1 transition-transform">→</span>
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
