import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCartStore } from '../store/cartStore';
import { StorageManager } from '../app/utils/storage';

// Mock StorageManager
vi.mock('../app/utils/storage', () => ({
    StorageManager: {
        saveCart: vi.fn().mockResolvedValue(true),
        loadCart: vi.fn().mockResolvedValue([]),
    },
}));

describe('cartStore', () => {
    beforeEach(() => {
        // Reset store before each test
        useCartStore.setState({ cart: [], isCartOpen: false });
        vi.clearAllMocks();
    });

    describe('addToCart', () => {
        it('should add a new product to empty cart', async () => {
            const product = { id: 't1', name: 'Tropicali', emoji: '🥭' };

            await useCartStore.getState().addToCart(product, 10, 180);

            const cart = useCartStore.getState().cart;
            expect(cart).toHaveLength(1);
            expect(cart[0].product.name).toBe('Tropicali');
            expect(cart[0].quantity).toBe(10);
            expect(cart[0].totalPrice).toBe(180);
            expect(StorageManager.saveCart).toHaveBeenCalledWith(cart);
        });

        it('should update quantity if product already exists', async () => {
            const product = { id: 't1', name: 'Tropicali', emoji: '🥭' };

            // Add first time
            await useCartStore.getState().addToCart(product, 10, 180);
            // Add again
            await useCartStore.getState().addToCart(product, 5, 90);

            const cart = useCartStore.getState().cart;
            expect(cart).toHaveLength(1);
            expect(cart[0].quantity).toBe(15); // 10 + 5
            expect(cart[0].totalPrice).toBe(270); // 180 + 90
        });

        it('should add multiple different products', async () => {
            const product1 = { id: 't1', name: 'Tropicali', emoji: '🥭' };
            const product2 = { id: 't2', name: 'Kush Mints', emoji: '🍵' };

            await useCartStore.getState().addToCart(product1, 10, 180);
            await useCartStore.getState().addToCart(product2, 5, 90);

            const cart = useCartStore.getState().cart;
            expect(cart).toHaveLength(2);
            expect(cart[0].product.name).toBe('Tropicali');
            expect(cart[1].product.name).toBe('Kush Mints');
        });
    });

    describe('removeFromCart', () => {
        it('should remove product at specified index', async () => {
            const product1 = { id: 't1', name: 'Tropicali' };
            const product2 = { id: 't2', name: 'Kush Mints' };

            await useCartStore.getState().addToCart(product1, 10, 180);
            await useCartStore.getState().addToCart(product2, 5, 90);

            await useCartStore.getState().removeFromCart(0);

            const cart = useCartStore.getState().cart;
            expect(cart).toHaveLength(1);
            expect(cart[0].product.name).toBe('Kush Mints');
        });

        it('should save to storage after removal', async () => {
            const product = { id: 't1', name: 'Tropicali' };
            await useCartStore.getState().addToCart(product, 10, 180);

            await useCartStore.getState().removeFromCart(0);

            expect(StorageManager.saveCart).toHaveBeenCalledWith([]);
        });
    });

    describe('updateQuantity', () => {
        it('should update quantity and price', async () => {
            const product = { id: 't1', name: 'Tropicali' };
            await useCartStore.getState().addToCart(product, 10, 180);

            await useCartStore.getState().updateQuantity(0, 20, 360);

            const cart = useCartStore.getState().cart;
            expect(cart[0].quantity).toBe(20);
            expect(cart[0].totalPrice).toBe(360);
        });
    });

    describe('clearCart', () => {
        it('should empty the cart', async () => {
            const product = { id: 't1', name: 'Tropicali' };
            await useCartStore.getState().addToCart(product, 10, 180);

            await useCartStore.getState().clearCart();

            expect(useCartStore.getState().cart).toHaveLength(0);
            expect(StorageManager.saveCart).toHaveBeenCalledWith([]);
        });
    });

    describe('setCart', () => {
        it('should replace entire cart', async () => {
            const newCart = [
                { product: { id: 't1', name: 'Tropicali' }, quantity: 10, totalPrice: 180 },
            ];

            await useCartStore.getState().setCart(newCart);

            expect(useCartStore.getState().cart).toEqual(newCart);
            expect(StorageManager.saveCart).toHaveBeenCalledWith(newCart);
        });
    });

    describe('toggleCartOpen', () => {
        it('should toggle cart open state', () => {
            expect(useCartStore.getState().isCartOpen).toBe(false);

            useCartStore.getState().toggleCartOpen();
            expect(useCartStore.getState().isCartOpen).toBe(true);

            useCartStore.getState().toggleCartOpen();
            expect(useCartStore.getState().isCartOpen).toBe(false);
        });
    });

    describe('setCartOpen', () => {
        it('should set cart open state directly', () => {
            useCartStore.getState().setCartOpen(true);
            expect(useCartStore.getState().isCartOpen).toBe(true);

            useCartStore.getState().setCartOpen(false);
            expect(useCartStore.getState().isCartOpen).toBe(false);
        });
    });
});
