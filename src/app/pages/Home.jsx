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
                    className="mb-4 relative overflow-hidden rounded-3xl bg-gradient-to-r from-can-green-dark via-can-green/80 to-black border border-can-gold/30 cursor-pointer group shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-can-gold/20 blur-3xl rounded-full animate-pulse-slow"></div>
                    <div className="relative z-10 p-5 flex items-center justify-between gap-4">
                        {/* Left: Logo + Branding */}
                        <div className="flex items-center gap-4">
                            <img
                                src={LOGO_URL}
                                alt="Logo"
                                loading="eager"
                                className="w-18 h-18 rounded-2xl border-2 border-can-gold/40 shadow-2xl object-cover ring-2 ring-can-gold/20"
                                onError={(event) => {
                                    event.target.src = 'https://s10.aconvert.com/convert/p3r68-cdx67/avr8y-z3sxq.jpg';
                                }}
                            />
                            <div>
                                <h1 className="text-2xl font-black gradient-text tracking-tight leading-tight">TANGERINE</h1>
                                <p className="text-white/70 text-xs font-semibold">Premium Quality</p>
                            </div>
                        </div>

                        {/* Right: CAN 2025 + Countdown */}
                        <div className="flex flex-col items-end gap-1.5">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">🏆</span>
                                <h3 className="text-white font-bold text-lg leading-tight">CAN 2025</h3>
                            </div>
                            <p className="text-can-gold text-xs font-bold tracking-wide">
                                Dispo dans <span className="text-white">16j</span>
                            </p>
                            <div className="flex items-center gap-2 mt-1 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/15 transition-all">
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
