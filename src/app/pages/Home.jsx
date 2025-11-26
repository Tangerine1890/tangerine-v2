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
                        className="w-20 h-20 rounded-2xl border-2 border-white/20 shadow-xl float object-cover"
                        onError={(event) => {
                            event.target.src = 'https://s10.aconvert.com/convert/p3r68-cdx67/avr8y-z3sxq.jpg';
                        }}
                    />
                    <div>
                        <h1 className="text-4xl font-black gradient-text tracking-tight">TANGERINE</h1>
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
