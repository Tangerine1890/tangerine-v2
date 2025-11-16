import {
  CART_STORAGE_KEY,
  DELIVERY_CITY_STORAGE_KEY,
  ORDER_HISTORY_STORAGE_KEY,
  PAYMENT_METHOD_STORAGE_KEY,
  PROMO_CODE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  WISHLIST_STORAGE_KEY,
} from '../constants/index.js';

const ensureWindow = () => (typeof window !== 'undefined' ? window : undefined);

const getStorageBackend = () => {
  const win = ensureWindow();
  if (!win) return null;

  if (win.storage && typeof win.storage.get === 'function' && typeof win.storage.set === 'function') {
    return win.storage;
  }

  try {
    return {
      async get(key) {
        const value = win.localStorage.getItem(key);
        return value != null ? { value } : null;
      },
      async set(key, value) {
        win.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
        return true;
      },
    };
  } catch (error) {
    console.warn('No storage backend available', error);
    return null;
  }
};

const storage = getStorageBackend();

const safeParse = (value, fallback) => {
  try {
    return value != null ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
};

export const StorageManager = {
  async saveCart(cart) {
    if (!storage) return false;
    try {
      await storage.set(CART_STORAGE_KEY, cart);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },

  async loadCart() {
    if (!storage) return [];
    try {
      const result = await storage.get(CART_STORAGE_KEY);
      return safeParse(result?.value, []);
    } catch (error) {
      return [];
    }
  },

  async saveDeliveryCity(city) {
    if (!storage) return false;
    try {
      await storage.set(DELIVERY_CITY_STORAGE_KEY, city);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },

  async loadDeliveryCity() {
    if (!storage) return 'rabat';
    try {
      const result = await storage.get(DELIVERY_CITY_STORAGE_KEY);
      return result?.value || 'rabat';
    } catch (error) {
      return 'rabat';
    }
  },

  async savePaymentMethod(method) {
    if (!storage) return false;
    try {
      await storage.set(PAYMENT_METHOD_STORAGE_KEY, method);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },

  async loadPaymentMethod() {
    if (!storage) return 'cash';
    try {
      const result = await storage.get(PAYMENT_METHOD_STORAGE_KEY);
      return result?.value || 'cash';
    } catch (error) {
      return 'cash';
    }
  },

  async savePromoCode(code) {
    if (!storage) return false;
    try {
      await storage.set(PROMO_CODE_STORAGE_KEY, code);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },

  async loadPromoCode() {
    if (!storage) return '';
    try {
      const result = await storage.get(PROMO_CODE_STORAGE_KEY);
      return result?.value || '';
    } catch (error) {
      return '';
    }
  },

  async saveWishlist(wishlist) {
    if (!storage) return false;
    try {
      await storage.set(WISHLIST_STORAGE_KEY, wishlist);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },

  async loadWishlist() {
    if (!storage) return [];
    try {
      const result = await storage.get(WISHLIST_STORAGE_KEY);
      return safeParse(result?.value, []);
    } catch (error) {
      return [];
    }
  },

  async saveOrderHistory(orders) {
    if (!storage) return false;
    try {
      await storage.set(ORDER_HISTORY_STORAGE_KEY, orders);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },

  async loadOrderHistory() {
    if (!storage) return [];
    try {
      const result = await storage.get(ORDER_HISTORY_STORAGE_KEY);
      return safeParse(result?.value, []);
    } catch (error) {
      return [];
    }
  },

  async saveTheme(theme) {
    if (!storage) return false;
    try {
      await storage.set(THEME_STORAGE_KEY, theme);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },

  async loadTheme() {
    if (!storage) return 'dark';
    try {
      const result = await storage.get(THEME_STORAGE_KEY);
      return result?.value || 'dark';
    } catch (error) {
      return 'dark';
    }
  },
};
