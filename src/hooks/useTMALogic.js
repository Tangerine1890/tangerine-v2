import { useEffect, useCallback, useState } from 'react';
import { miniApp as miniAppFeature } from '@tma.js/sdk-react';
import { useCartStore } from '../store/cartStore.js';
import { useUIStore } from '../store/uiStore.js';
import { useHaptic } from './useHaptic.js';

export const useTMALogic = () => {
  const miniApp = miniAppFeature;
  const { isCartOpen, setCartOpen, cart } = useCartStore();
  const { viewerOpen, selectedProduct, isContactOpen, showConfirmation } = useUIStore();
  const { light } = useHaptic();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [homeScreenStatus, setHomeScreenStatus] = useState('unknown');

  // Initialize TMA
  useEffect(() => {
    if (!miniApp) return;

    try {
      miniApp.ready?.();
      miniApp.expand?.();
      miniApp.requestFullscreen?.();
      miniApp.lockOrientation?.('portrait');
    } catch (error) {
      console.warn('TMA initialization warning:', error);
    }

    try {
      const onFullscreen = () => setIsFullscreen(Boolean(miniApp.isFullscreen));
      const onHomeScreenAdded = () => setHomeScreenStatus('added');

      miniApp.onEvent?.('fullscreenChanged', onFullscreen);
      miniApp.onEvent?.('homeScreenAdded', onHomeScreenAdded);

      miniApp.checkHomeScreenStatus?.((status) => {
        if (status) setHomeScreenStatus(status);
      });

      return () => {
        miniApp.offEvent?.('fullscreenChanged', onFullscreen);
        miniApp.offEvent?.('homeScreenAdded', onHomeScreenAdded);
      };
    } catch (error) {
      console.warn('TMA event registration warning:', error);
    }
  }, [miniApp]);

  // Main Button
  useEffect(() => {
    if (!miniApp?.MainButton) return;

    const handleMainButtonClick = () => {
      light();
      setCartOpen(!isCartOpen);
    };

    miniApp.MainButton.onClick(handleMainButtonClick);

    if (cart.length === 0) {
      miniApp.MainButton.hide();
    } else {
      miniApp.MainButton.setText(isCartOpen ? 'Fermer le panier' : 'Voir le panier');
      miniApp.MainButton.show();
      miniApp.MainButton.enable();
    }

    return () => {
      miniApp.MainButton?.offClick?.(handleMainButtonClick);
    };
  }, [miniApp, isCartOpen, cart.length, light, setCartOpen]);

  // Back Button
  useEffect(() => {
    if (!miniApp?.BackButton) return;

    const handleBack = () => {
      light();
      // Logic handled by UI store
    };

    miniApp.BackButton.onClick(handleBack);

    const shouldShow = Boolean(viewerOpen || selectedProduct || isContactOpen || showConfirmation || isCartOpen);
    if (shouldShow) {
      miniApp.BackButton.show();
    } else {
      miniApp.BackButton.hide();
    }

    return () => {
      miniApp.BackButton?.offClick?.(handleBack);
    };
  }, [miniApp, viewerOpen, selectedProduct, isContactOpen, showConfirmation, isCartOpen, light]);

  const handleAddToHomeScreen = useCallback(() => {
    if (!miniApp?.addToHomeScreen) return;
    light();
    miniApp.addToHomeScreen();
  }, [miniApp, light]);

  return {
    isFullscreen,
    homeScreenStatus,
    handleAddToHomeScreen,
    miniApp,
  };
};
