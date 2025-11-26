import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCartLogic } from '../hooks/useCartLogic';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';

// Mock stores
vi.mock('../store/cartStore');
vi.mock('../store/uiStore');
vi.mock('./useHaptic', () => ({
    useHaptic: () => ({
        medium: vi.fn(),
        success: vi.fn(),
        error: vi.fn(),
    }),
}));

describe('useCartLogic', () => {
    const mockAddToCart = vi.fn().mockResolvedValue(undefined);
    const mockRemoveFromCart = vi.fn().mockResolvedValue(undefined);
    const mockUpdateQuantity = vi.fn().mockResolvedValue(undefined);
    const mockClearCart = vi.fn().mockResolvedValue(undefined);
    const mockShowNotification = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        useCartStore.mockReturnValue({
            cart: [],
            addToCart: mockAddToCart,
            removeFromCart: mockRemoveFromCart,
            updateQuantity: mockUpdateQuantity,
            clearCart: mockClearCart,
        });

        useUIStore.mockReturnValue({
            showNotification: mockShowNotification,
        });
    });

    describe('handleAddToCart', () => {
        it('should add product to cart successfully', async () => {
            const { result } = renderHook(() => useCartLogic());
            const product = { id: 't1', name: 'Tropicali', emoji: '🥭' };

            await act(async () => {
                await result.current.handleAddToCart(product, 10, 180);
            });

            expect(mockAddToCart).toHaveBeenCalledWith(product, 10, 180);
            expect(mockShowNotification).not.toHaveBeenCalled();
        });

        it('should reject quantity below minimum', async () => {
            const { result } = renderHook(() => useCartLogic());
            const product = { id: 't1', name: 'Tropicali' };

            await act(async () => {
                await result.current.handleAddToCart(product, 2, 36);
            });

            expect(mockAddToCart).not.toHaveBeenCalled();
            expect(mockShowNotification).toHaveBeenCalledWith(
                expect.stringContaining('Minimum'),
                'error'
            );
        });

        it('should handle errors gracefully', async () => {
            mockAddToCart.mockRejectedValueOnce(new Error('Storage error'));
            const { result } = renderHook(() => useCartLogic());
            const product = { id: 't1', name: 'Tropicali' };

            await act(async () => {
                await result.current.handleAddToCart(product, 10, 180);
            });

            expect(mockShowNotification).toHaveBeenCalledWith(
                expect.stringContaining('Erreur'),
                'error'
            );
        });
    });

    describe('handleRemoveFromCart', () => {
        it('should remove product from cart', async () => {
            const { result } = renderHook(() => useCartLogic());

            await act(async () => {
                await result.current.handleRemoveFromCart(0);
            });

            expect(mockRemoveFromCart).toHaveBeenCalledWith(0);
            expect(mockShowNotification).toHaveBeenCalledWith('Produit retiré', 'info');
        });

        it('should handle removal errors', async () => {
            mockRemoveFromCart.mockRejectedValueOnce(new Error('Error'));
            const { result } = renderHook(() => useCartLogic());

            await act(async () => {
                await result.current.handleRemoveFromCart(0);
            });

            expect(mockShowNotification).toHaveBeenCalledWith(
                expect.stringContaining('Erreur'),
                'error'
            );
        });
    });

    describe('handleUpdateQuantity', () => {
        it('should update product quantity', async () => {
            const { result } = renderHook(() => useCartLogic());

            await act(async () => {
                await result.current.handleUpdateQuantity(0, 20, 360);
            });

            expect(mockUpdateQuantity).toHaveBeenCalledWith(0, 20, 360);
        });
    });

    describe('cartTotal', () => {
        it('should calculate total correctly', () => {
            useCartStore.mockReturnValue({
                cart: [
                    { product: { name: 'Tropicali' }, quantity: 10, totalPrice: 180 },
                    { product: { name: 'Kush Mints' }, quantity: 5, totalPrice: 90 },
                ],
                addToCart: mockAddToCart,
                removeFromCart: mockRemoveFromCart,
                updateQuantity: mockUpdateQuantity,
                clearCart: mockClearCart,
            });

            const { result } = renderHook(() => useCartLogic());

            expect(result.current.cartTotal).toBe(270);
        });

        it('should return 0 for empty cart', () => {
            const { result } = renderHook(() => useCartLogic());
            expect(result.current.cartTotal).toBe(0);
        });
    });
});
