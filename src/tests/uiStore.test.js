import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '../store/uiStore';

describe('uiStore', () => {
    beforeEach(() => {
        // Reset store before each test
        useUIStore.setState({
            selectedProduct: null,
            isContactOpen: false,
            showConfirmation: false,
            viewerOpen: false,
            viewerProduct: null,
            viewerStartIndex: 0,
            notification: { message: '', isVisible: false, type: 'success' },
            selectedCategory: 'all',
            showWelcome: false,
            welcomeRendered: false,
            animations: [],
        });
    });

    describe('selectedProduct', () => {
        it('should set selected product', () => {
            const product = { id: 't1', name: 'Tropicali' };

            useUIStore.getState().setSelectedProduct(product);

            expect(useUIStore.getState().selectedProduct).toEqual(product);
        });

        it('should clear selected product', () => {
            const product = { id: 't1', name: 'Tropicali' };
            useUIStore.getState().setSelectedProduct(product);

            useUIStore.getState().setSelectedProduct(null);

            expect(useUIStore.getState().selectedProduct).toBeNull();
        });
    });

    describe('contact modal', () => {
        it('should toggle contact modal', () => {
            useUIStore.getState().setIsContactOpen(true);
            expect(useUIStore.getState().isContactOpen).toBe(true);

            useUIStore.getState().setIsContactOpen(false);
            expect(useUIStore.getState().isContactOpen).toBe(false);
        });
    });

    describe('confirmation modal', () => {
        it('should show/hide confirmation', () => {
            useUIStore.getState().setShowConfirmation(true);
            expect(useUIStore.getState().showConfirmation).toBe(true);

            useUIStore.getState().setShowConfirmation(false);
            expect(useUIStore.getState().showConfirmation).toBe(false);
        });
    });

    describe('viewer', () => {
        it('should open viewer with product and index', () => {
            const product = { id: 't1', name: 'Tropicali' };

            useUIStore.getState().setViewer(true, product, 2);

            expect(useUIStore.getState().viewerOpen).toBe(true);
            expect(useUIStore.getState().viewerProduct).toEqual(product);
            expect(useUIStore.getState().viewerStartIndex).toBe(2);
        });

        it('should close viewer', () => {
            const product = { id: 't1', name: 'Tropicali' };
            useUIStore.getState().setViewer(true, product, 2);

            useUIStore.getState().setViewer(false);

            expect(useUIStore.getState().viewerOpen).toBe(false);
        });
    });

    describe('notifications', () => {
        it('should show success notification', () => {
            useUIStore.getState().showNotification('Product added', 'success');

            const notification = useUIStore.getState().notification;
            expect(notification.message).toBe('Product added');
            expect(notification.type).toBe('success');
            expect(notification.isVisible).toBe(true);
        });

        it('should show error notification', () => {
            useUIStore.getState().showNotification('Error occurred', 'error');

            const notification = useUIStore.getState().notification;
            expect(notification.message).toBe('Error occurred');
            expect(notification.type).toBe('error');
            expect(notification.isVisible).toBe(true);
        });

        it('should hide notification', () => {
            useUIStore.getState().showNotification('Test', 'success');

            useUIStore.getState().hideNotification();

            const notification = useUIStore.getState().notification;
            expect(notification.message).toBe('');
            expect(notification.isVisible).toBe(false);
            expect(notification.type).toBe('success');
        });
    });

    describe('category selection', () => {
        it('should set selected category', () => {
            useUIStore.getState().setSelectedCategory('wpff');
            expect(useUIStore.getState().selectedCategory).toBe('wpff');

            useUIStore.getState().setSelectedCategory('doublestatic');
            expect(useUIStore.getState().selectedCategory).toBe('doublestatic');
        });
    });

    describe('welcome screen', () => {
        it('should show/hide welcome', () => {
            useUIStore.getState().setShowWelcome(true);
            expect(useUIStore.getState().showWelcome).toBe(true);

            useUIStore.getState().setShowWelcome(false);
            expect(useUIStore.getState().showWelcome).toBe(false);
        });

        it('should mark welcome as rendered', () => {
            useUIStore.getState().setWelcomeRendered(true);
            expect(useUIStore.getState().welcomeRendered).toBe(true);
        });
    });

    describe('animations', () => {
        it('should add animation', () => {
            const animation = { id: 1, text: '🥭 +10g', startX: 100, startY: 200 };

            useUIStore.getState().addAnimation(animation);

            expect(useUIStore.getState().animations).toHaveLength(1);
            expect(useUIStore.getState().animations[0]).toEqual(animation);
        });

        it('should add multiple animations', () => {
            const anim1 = { id: 1, text: '🥭 +10g' };
            const anim2 = { id: 2, text: '🍵 +5g' };

            useUIStore.getState().addAnimation(anim1);
            useUIStore.getState().addAnimation(anim2);

            expect(useUIStore.getState().animations).toHaveLength(2);
        });

        it('should remove animation by id', () => {
            const anim1 = { id: 1, text: '🥭 +10g' };
            const anim2 = { id: 2, text: '🍵 +5g' };

            useUIStore.getState().addAnimation(anim1);
            useUIStore.getState().addAnimation(anim2);

            useUIStore.getState().removeAnimation(1);

            const animations = useUIStore.getState().animations;
            expect(animations).toHaveLength(1);
            expect(animations[0].id).toBe(2);
        });
    });
});
