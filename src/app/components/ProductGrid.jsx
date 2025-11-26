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
    );
};
