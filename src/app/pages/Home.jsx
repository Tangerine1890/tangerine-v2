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
            <div className="h-12" />

            <header className="relative z-10 max-w-7xl mx-auto px-4 pb-4 pt-6 md:pt-8 telegram-header">
                <div className="flex items-center justify-start gap-3 mb-6">
                    <img
                        src={LOGO_URL}
                        alt="Logo"
                        loading="lazy"
                        className="w-16 h-16 rounded-2xl border-2 border-white/20 shadow-xl float object-cover"
                        onError={(event) => {
                            event.target.src = 'https://s10.aconvert.com/convert/p3r68-cdx67/avr8y-z3sxq.jpg';
                        }}
                    />
                    <div>
                        <h1 className="text-3xl font-black gradient-text tracking-tight">TANGERINE</h1>
                        <p className={`text-sm ${textSecondaryClasses}`}>Premium Quality</p>
                    </div>
                </div>

                {/* CAN 2025 Section (Integrated) */}
                <div
                    onClick={() => handleCategoryChange('packs_can')}
                    className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-can-green-dark to-black border border-can-gold/20 cursor-pointer group"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
                    <div className="relative z-10 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-can-gold/20 flex items-center justify-center border border-can-gold/40 animate-pulse-slow">
                                <span className="text-2xl">🏆</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg leading-tight">CAN 2025</h3>
                                <p className="text-can-gold text-xs font-medium tracking-wide">
                                    Disponible dans <span className="text-white font-bold">04j 12h 45m</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-white text-sm font-bold group-hover:text-can-gold transition-colors">Voir les packs</span>
                            <span className="text-white text-lg group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-start gap-3 mb-6">
                    <img
                        src={LOGO_URL}
                        alt="Logo"
                        loading="lazy"
                        className="w-16 h-16 rounded-2xl border-2 border-white/20 shadow-xl float object-cover"
                        onError={(event) => {
                            event.target.src = 'https://s10.aconvert.com/convert/p3r68-cdx67/avr8y-z3sxq.jpg';
                        }}
                    />
                    <div>
                        <h1 className="text-3xl font-black gradient-text tracking-tight">TANGERINE</h1>
                        <p className={`text-sm ${textSecondaryClasses}`}>Premium Quality</p>
                    </div>
                </div>

                <CategoryList
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    scrollRef={categoryScrollRef}
                />
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
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
