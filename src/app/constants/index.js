export const PRICES_PER_CATEGORY = {
  wpff: 18,
  doublestatic: 14,
  freshfrozen: 8,
  accessoires: 0,
};

export const PRICES = PRICES_PER_CATEGORY;

export const DELIVERY_PRICES = {
  rabat: { name: 'Rabat', price: 0, emoji: '👑', featured: true, estimatedDays: 1 },
  casablanca: { name: 'Casablanca', price: 50, emoji: '🏙️', estimatedDays: 1 },
  marrakech: { name: 'Marrakech', price: 150, emoji: '🕌', estimatedDays: 2 },
  agadir: { name: 'Agadir', price: 200, emoji: '🏖️', estimatedDays: 2 },
  tangier: { name: 'Tanger', price: 100, emoji: '⛵', estimatedDays: 1 },
};

export const PROMO_CODES = {
  '420BLAZE': { discount: 0.2, label: '-20%' },
  'HAPPYWEED': { discount: 0.1, label: '-10%' },
  'ORANGEPOWER': { discount: 0.12, label: '-12%' },
  'HARAGAZZ': { discount: 0.15, label: '-15%' },
  'WELCOME10': { discount: 0.1, label: '-10%' },
};

export const QUANTITY_OPTIONS = [5, 10, 20];
export const MIN_QUANTITY = 5;
export const MIN_SPEND = 200;

export const WELCOME_STORAGE_KEY = 'tangerine_welcome_shown';
export const THEME_STORAGE_KEY = 'tangerine_theme';
export const CART_STORAGE_KEY = 'tangerine_cart';
export const WISHLIST_STORAGE_KEY = 'tangerine_wishlist';
export const FAVORITES_STORAGE_KEY = 'tangerine_favorites';
export const DELIVERY_CITY_STORAGE_KEY = 'tangerine_delivery_city';
export const PAYMENT_METHOD_STORAGE_KEY = 'tangerine_payment_method';
export const PROMO_CODE_STORAGE_KEY = 'tangerine_promo_code';
export const ORDER_HISTORY_STORAGE_KEY = 'tangerine_order_history';
export const USER_STORAGE_KEY = 'tangerine_user';

export const CATEGORIES = [
  { id: 'all', label: 'Tous', emoji: '✨', gradient: 'from-[#f97316] to-[#16a34a]' },
  { id: 'wpff', label: 'WPFF', emoji: '💎', gradient: 'from-[#2563eb] to-[#06b6d4]' },
  { id: 'doublestatic', label: 'Double Static', emoji: '⚡', gradient: 'from-yellow-500 to-orange-500' },
  { id: 'packs_can', label: 'Packs CAN 2025', emoji: '🏆', gradient: 'from-can-green to-can-gold' },
  { id: 'freshfrozen', label: 'Fresh Frozen', emoji: '❄️', gradient: 'from-blue-400 to-indigo-500' },
  { id: 'accessoires', label: 'Accessoires', emoji: '🧰', gradient: 'from-[#f97316] to-[#ec4899]' },
];
