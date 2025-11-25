import { useEffect, useState } from 'react';
import { StorageManager } from '../app/utils/storage.js';
import { useCartStore } from '../store/cartStore.js';
import { useSettingsStore } from '../store/settingsStore.js';

export const useDataLoad = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setCart } = useCartStore();
  const {
    setDeliveryCity,
    setPaymentMethod,
    setAppliedPromo,
    setWishlist,
    setOrderHistory,
    setTheme
  } = useSettingsStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          savedCart,
          savedCity,
          savedPayment,
          savedPromo,
          savedWishlist,
          savedOrderHistory,
          savedTheme
        ] = await Promise.all([
          StorageManager.loadCart(),
          StorageManager.loadDeliveryCity(),
          StorageManager.loadPaymentMethod(),
          StorageManager.loadPromoCode(),
          StorageManager.loadWishlist(),
          StorageManager.loadOrderHistory(),
          StorageManager.loadTheme(),
        ]);

        // Populate stores
        setCart(savedCart);
        setDeliveryCity(savedCity);
        setPaymentMethod(savedPayment);
        setAppliedPromo(savedPromo);
        setWishlist(savedWishlist);
        setOrderHistory(savedOrderHistory);

        if (savedTheme) {
          setTheme(savedTheme);
          if (typeof document !== 'undefined') {
            document.documentElement.className = savedTheme === 'light' ? 'theme-light' : '';
          }
        } else if (typeof document !== 'undefined') {
          document.documentElement.className = '';
        }

        // Low data mode check
        try {
          const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          const isLowData = connection ? (connection.saveData || !((connection.effectiveType || '').toLowerCase().includes('4g'))) : false;

          if (typeof document !== 'undefined') {
            if (isLowData) {
              document.documentElement.classList.add('low-data');
            } else {
              document.documentElement.classList.remove('low-data');
            }
          }
        } catch {
          // Ignore connection API errors
        }

      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [setCart, setDeliveryCity, setPaymentMethod, setAppliedPromo, setWishlist, setOrderHistory, setTheme]);

  return { isLoading };
};
