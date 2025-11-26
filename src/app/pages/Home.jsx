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
                {/* Premium Hero Card - Logo + TANGERINE + CAN 2025 */}
                <div
                    className="mb-4 relative overflow-hidden rounded-3xl bg-gradient-to-br from-can-green-dark via-black to-can-green-dark/50 border border-can-gold/30 shadow-2xl group"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-can-gold/10 blur-3xl rounded-full"></div>

                    <div className="relative z-10 p-6 flex items-center gap-6">
                        {/* Logo - 1/4 Width */}
                        <div className="w-1/4 flex items-center justify-center">
                            <img
                                src={LOGO_URL}
                                alt="Tangerine Logo"
                                loading="eager"
                                className="w-full aspect-square rounded-2xl border-2 border-can-gold/40 shadow-2xl object-cover ring-4 ring-can-gold/20"
                                onError={(event) => {
                                    event.target.src = 'https://s10.aconvert.com/convert/p3r68-cdx67/avr8y-z3sxq.jpg';
                                }}
                            />
                        </div>

                        {/* Content - 3/4 Width */}
                        <div className="flex-1 flex flex-col gap-4">
                            {/* TANGERINE - Expanded */}
                            <h1 className="text-4xl font-black gradient-text tracking-[0.25em] leading-tight uppercase">
                                TANGERINE
                            </h1>

                            {/* CAN 2025 + Button */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🏆</span>
                                    <h3 className="text-white font-bold text-xl tracking-wide">CAN 2025</h3>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCategoryChange('packs_can');
                                    }}
                                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-can-gold to-can-copper text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
                                >
                                    Voir Packs
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
