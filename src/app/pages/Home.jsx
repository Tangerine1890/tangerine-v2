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
            <div className="h-4" />

            <header className="relative z-10 max-w-7xl mx-auto px-4 pb-2 pt-2 telegram-header">
                {/* Dynamic Hero Card - TANGERINE + CAN 2025 */}
                {/* Dynamic Hero Card - TANGERINE + CAN 2025 */}
                {/* Dynamic Hero Card - TANGERINE + CAN 2025 */}
                <div
                    className="mb-2 relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl group backdrop-blur-md"
                    style={{
                        background: '#0a0a0a', // Deep premium black
                    }}
                >
                    {/* Premium Dynamic Background - "Aurora" Effect */}
                    <div className="absolute inset-0 opacity-60" style={{
                        background: 'radial-gradient(circle at 0% 0%, rgba(6, 95, 70, 0.4) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(217, 119, 6, 0.3) 0%, transparent 50%)',
                        filter: 'blur(40px)',
                        animation: 'pulse 8s ease-in-out infinite alternate'
                    }}></div>

                    {/* Moving Light Beam */}
                    <div className="absolute -inset-[100%] opacity-20 rotate-12" style={{
                        background: 'conic-gradient(from 90deg at 50% 50%, #000000 0%, #064e3b 50%, #000000 100%)',
                        animation: 'spin-slow 20s linear infinite',
                        mixBlendMode: 'screen'
                    }}></div>

                    {/* Subtle Grain Texture for "High-End" Feel */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>

                    <div className="relative z-10 p-4 flex flex-col gap-3">
                        {/* TANGERINE - Floating Header */}
                        <div className="relative">
                            <h1 className="text-3xl font-black gradient-text tracking-[0.25em] leading-tight uppercase text-center drop-shadow-lg">
                                TANGERINE
                            </h1>
                        </div>

                        {/* CAN 2025 - Framed "Ticket" Style */}
                        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-1">
                            {/* Inner Border/Glow */}
                            <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none"></div>
                            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#020405] rounded-full border-r border-white/10"></div>
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#020405] rounded-full border-l border-white/10"></div>

                            <div className="flex items-center justify-between px-3 py-1.5">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl animate-bounce-subtle">🏆</span>
                                    <h3 className="font-black text-xl tracking-wide italic text-white drop-shadow-md">
                                        CAN <span className="text-can-gold">2025</span>
                                    </h3>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCategoryChange('packs_can');
                                    }}
                                    className="relative overflow-hidden px-4 py-1.5 rounded-lg bg-gradient-to-r from-can-gold to-amber-600 text-white font-bold text-xs tracking-wider uppercase shadow-lg hover:scale-105 active:scale-95 transition-all group-hover:shadow-can-gold/20"
                                >
                                    <span className="relative z-10">Voir Packs</span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>
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
