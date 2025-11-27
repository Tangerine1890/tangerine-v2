import { ProductCard } from './ProductCard.jsx';

export const ProductGrid = ({
    products,
    onAddToCart,
    onAnimateAdd,
    onViewDetails,
    wishlist,
    onToggleWishlist,
}) => {
    if (products.length === 0) {
        return (
            <div className="text-center py-20 animate-fade-in-up">
                <div className="text-7xl mb-4">🔍</div>
                <p className="text-xl font-semibold mb-2">Aucun produit</p>
                <p className="opacity-60 text-sm">Essayez une autre catégorie</p>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Subtle Swipe Indicator - Right Side */}
            <div className="absolute right-0 top-0 bottom-6 w-16 pointer-events-none z-10 flex items-center justify-end pr-2">
                <div className="absolute inset-0 bg-gradient-to-l from-[#05090b] via-[#05090b]/60 to-transparent"></div>
                <div className="relative animate-pulse-slow">
                    <svg className="w-6 h-6 text-white/40 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-6 snap-x scroll-smooth" data-product-scroll>
                {products.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onAnimateAdd={onAnimateAdd}
                        onViewDetails={onViewDetails}
                        isInWishlist={wishlist.some((item) => item.id === product.id)}
                        onToggleWishlist={onToggleWishlist}
                        isInitiallyVisible={index === 0}
                        isPriority={index === 0}
                        className="animate-fade-in-right opacity-0"
                        style={{ animationDelay: `${index * 100}ms` }}
                    />
                ))}
            </div>
        </div>
    );
};
