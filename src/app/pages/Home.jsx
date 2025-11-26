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
                {/* Dynamic Hero Card - TANGERINE + CAN 2025 */}
                <div
                    className="mb-4 relative overflow-hidden rounded-2xl border border-can-gold/40 shadow-2xl"
                    style={{
                        background: 'linear-gradient(135deg, #065f46 0%, #064e3b 25%, #000000 50%, #064e3b 75%, #065f46 100%)',
                        backgroundSize: '400% 400%',
                        animation: 'gradientShift 15s ease infinite'
                    }}
                >
                    {/* Animated Background Layers */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0" style={{
                        background: 'radial-gradient(circle at 20% 50%, rgba(217, 119, 6, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)',
                        animation: 'pulse 8s ease-in-out infinite'
                    }}></div>

                    {/* Floating Glow Orbs */}
                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-can-gold/20 blur-3xl rounded-full animate-pulse-slow"></div>
                    <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-emerald-500/15 blur-3xl rounded-full" style={{
                        animation: 'float 6s ease-in-out infinite'
                    }}></div>

                    <div className="relative z-10 p-4 flex flex-col gap-3">
                        {/* TANGERINE - Expanded */}
                        <h1 className="text-3xl font-black gradient-text tracking-[0.25em] leading-tight uppercase text-center drop-shadow-lg">
                            TANGERINE
                        </h1>

                        {/* CAN 2025 + Button */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <span className="text-xl drop-shadow-lg">🏆</span>
                                <h3
                                    className="font-black text-xl tracking-wider uppercase"
                                    style={{
                                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        filter: 'drop-shadow(0 2px 8px rgba(251, 191, 36, 0.5)) drop-shadow(0 0 20px rgba(251, 191, 36, 0.3))',
                                        textShadow: '0 0 30px rgba(251, 191, 36, 0.4)'
                                    }}
                                >
                                    CAN 2025
                                </h3>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCategoryChange('packs_can');
                                }}
                                className="px-5 py-2 rounded-full bg-gradient-to-r from-can-gold via-amber-500 to-can-copper text-white font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 border border-amber-400/30"
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
