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
                {/* CAN 2025 Hero Banner */}
                <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-can-green-dark via-can-green to-black shadow-2xl border border-can-gold/30">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-can-gold blur-[60px] opacity-30 animate-pulse-slow"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-can-copper blur-[60px] opacity-30 animate-pulse-slow"></div>

                    <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3 animate-float">
                                <span className="animate-pulse text-red-500 text-xs">●</span>
                                <span className="text-can-gold text-xs font-bold tracking-wider">ÉDITION LIMITÉE</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">
                                CAN <span className="text-can-gold">2025</span>
                            </h2>
                            <p className="text-white/80 text-sm md:text-base max-w-md">
                                Supportez les Lions avec nos packs exclusifs. <br />
                                <span className="text-can-gold font-bold">Jusqu'à -160€ d'économie !</span>
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="flex gap-3 text-center">
                                <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 min-w-[70px]">
                                    <span className="block text-2xl font-bold text-white">04</span>
                                    <span className="text-[10px] text-white/60 uppercase">Jours</span>
                                </div>
                                <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 min-w-[70px]">
                                    <span className="block text-2xl font-bold text-white">12</span>
                                    <span className="text-[10px] text-white/60 uppercase">Heures</span>
                                </div>
                                <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 min-w-[70px]">
                                    <span className="block text-2xl font-bold text-can-gold animate-pulse">45</span>
                                    <span className="text-[10px] text-white/60 uppercase">Min</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleCategoryChange('packs_can')}
                                className="mt-2 w-full py-2.5 bg-gradient-to-r from-can-gold to-can-copper text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-sm relative overflow-hidden group"
                            >
                                <span className="relative z-10">Voir les Packs 🏆</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
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
