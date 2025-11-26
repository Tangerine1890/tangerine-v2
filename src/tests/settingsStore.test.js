import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSettingsStore } from '../store/settingsStore';
import { StorageManager } from '../app/utils/storage';

// Mock StorageManager
vi.mock('../app/utils/storage', () => ({
    StorageManager: {
        saveTheme: vi.fn().mockResolvedValue(true),
        saveDeliveryCity: vi.fn().mockResolvedValue(true),
        savePaymentMethod: vi.fn().mockResolvedValue(true),
        savePromoCode: vi.fn().mockResolvedValue(true),
        saveWishlist: vi.fn().mockResolvedValue(true),
        saveOrderHistory: vi.fn().mockResolvedValue(true),
    },
}));

describe('settingsStore', () => {
    beforeEach(() => {
        // Reset store before each test
        useSettingsStore.setState({
            theme: 'dark',
            deliveryCity: 'rabat',
            paymentMethod: 'cash',
            appliedPromo: '',
            wishlist: [],
            orderHistory: [],
        });
        vi.clearAllMocks();

        // Mock document
        global.document = {
            documentElement: {
                className: '',
            },
        };
    });

    describe('theme', () => {
        it('should set dark theme', async () => {
            await useSettingsStore.getState().setTheme('dark');

            expect(useSettingsStore.getState().theme).toBe('dark');
            expect(document.documentElement.className).toBe('');
            expect(StorageManager.saveTheme).toHaveBeenCalledWith('dark');
        });

        it('should set light theme', async () => {
            await useSettingsStore.getState().setTheme('light');

            expect(useSettingsStore.getState().theme).toBe('light');
            expect(document.documentElement.className).toBe('theme-light');
            expect(StorageManager.saveTheme).toHaveBeenCalledWith('light');
        });
    });

    describe('delivery city', () => {
        it('should set delivery city to Rabat', async () => {
            await useSettingsStore.getState().setDeliveryCity('rabat');

            expect(useSettingsStore.getState().deliveryCity).toBe('rabat');
            expect(StorageManager.saveDeliveryCity).toHaveBeenCalledWith('rabat');
        });

        it('should set delivery city to Casablanca', async () => {
            await useSettingsStore.getState().setDeliveryCity('casablanca');

            expect(useSettingsStore.getState().deliveryCity).toBe('casablanca');
            expect(StorageManager.saveDeliveryCity).toHaveBeenCalledWith('casablanca');
        });
    });

    describe('payment method', () => {
        it('should set payment method to cash', async () => {
            await useSettingsStore.getState().setPaymentMethod('cash');

            expect(useSettingsStore.getState().paymentMethod).toBe('cash');
            expect(StorageManager.savePaymentMethod).toHaveBeenCalledWith('cash');
        });

        it('should set payment method to card', async () => {
            await useSettingsStore.getState().setPaymentMethod('card');

            expect(useSettingsStore.getState().paymentMethod).toBe('card');
            expect(StorageManager.savePaymentMethod).toHaveBeenCalledWith('card');
        });
    });

    describe('promo code', () => {
        it('should apply promo code', async () => {
            await useSettingsStore.getState().setAppliedPromo('FIRST10');

            expect(useSettingsStore.getState().appliedPromo).toBe('FIRST10');
            expect(StorageManager.savePromoCode).toHaveBeenCalledWith('FIRST10');
        });

        it('should clear promo code', async () => {
            await useSettingsStore.getState().setAppliedPromo('FIRST10');
            await useSettingsStore.getState().setAppliedPromo('');

            expect(useSettingsStore.getState().appliedPromo).toBe('');
            expect(StorageManager.savePromoCode).toHaveBeenCalledWith('');
        });
    });

    describe('wishlist', () => {
        it('should add product to wishlist', async () => {
            const wishlist = ['t1', 't2'];

            await useSettingsStore.getState().setWishlist(wishlist);

            expect(useSettingsStore.getState().wishlist).toEqual(wishlist);
            expect(StorageManager.saveWishlist).toHaveBeenCalledWith(wishlist);
        });

        it('should clear wishlist', async () => {
            await useSettingsStore.getState().setWishlist(['t1', 't2']);
            await useSettingsStore.getState().setWishlist([]);

            expect(useSettingsStore.getState().wishlist).toEqual([]);
        });
    });

    describe('order history', () => {
        it('should add order to history', async () => {
            const order = {
                id: '123',
                date: '2025-11-26',
                total: 270,
                items: [],
            };

            await useSettingsStore.getState().setOrderHistory([order]);

            expect(useSettingsStore.getState().orderHistory).toHaveLength(1);
            expect(useSettingsStore.getState().orderHistory[0].id).toBe('123');
            expect(StorageManager.saveOrderHistory).toHaveBeenCalledWith([order]);
        });

        it('should handle multiple orders', async () => {
            const orders = [
                { id: '123', total: 270 },
                { id: '124', total: 180 },
            ];

            await useSettingsStore.getState().setOrderHistory(orders);

            expect(useSettingsStore.getState().orderHistory).toHaveLength(2);
        });
    });
});
