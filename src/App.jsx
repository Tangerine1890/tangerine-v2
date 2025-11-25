import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  miniApp as miniAppFeature,
  themeParams as themeParamsFeature,
  useSignal,
  viewport as viewportFeature,
} from '@tma.js/sdk-react';
import { ensureTangerineNamespace } from './lib/registry.js';
import { useCartStore } from './store/cartStore.js';
import { useUIStore } from './store/uiStore.js';
import { useSettingsStore } from './store/settingsStore.js';
import { useHaptic } from './hooks/useHaptic.js';
import { fadeInUp, scaleIn } from './hooks/useAnimations.js';
import {
  CATEGORIES,
  DELIVERY_PRICES,
  MIN_QUANTITY,
  MIN_SPEND,
  PRICES,
  PROMO_CODES,
  WELCOME_STORAGE_KEY,
} from './app/constants/index.js';
import { StorageManager } from './app/utils/storage.js';
import { getVideoManager } from './app/utils/videoManager.js';
import {
  LOGO_URL,
  disableUmamiForOwner,
  logMediaMetric,
  // registerServiceWorker,
  scheduleDeferredAnalyticsLoad,
  trackEvent,
} from './app/utils/analytics.js';
import { PRODUCTS } from './app/data/products.js';
import { LoadingScreen } from './app/components/LoadingScreen.jsx';
import { ThemeToggle } from './app/components/ThemeToggle.jsx';
import { ProductCard } from './app/components/ProductCard.jsx';
import { CartDrawer } from './app/components/CartDrawer.jsx';
import { Notification } from './app/components/Notification.jsx';
import { Confetti } from './app/components/Confetti.jsx';
import { ParticlesBackground } from './app/components/ParticlesBackground.jsx';

const ConfirmationModal = lazy(() => import('./app/components/ConfirmationModal.jsx'));
const ContactModal = lazy(() => import('./app/components/ContactModal.jsx'));
const ProductDetailModal = lazy(() => import('./app/components/ProductDetailModal.jsx'));
const FullscreenViewer = lazy(() => import('./app/components/FullscreenViewer.jsx'));

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState({ message: '', isVisible: false, type: 'success' });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [deliveryCity, setDeliveryCity] = useState('rabat');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [showParticles, setShowParticles] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerProduct, setViewerProduct] = useState(null);
  const [viewerStartIndex, setViewerStartIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeRendered, setWelcomeRendered] = useState(false);
  const miniApp = miniAppFeature;

  const openViewer = useCallback((product, startIndex = 0) => {
    setViewerProduct(product);
    setViewerStartIndex(startIndex ?? 0);
    setViewerOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setViewerOpen(false);
    setViewerStartIndex(0);
    setViewerProduct(null);
  }, []);
  const themeParams = useSignal(themeParamsFeature.state);
  const viewport = useSignal(viewportFeature.state);
  const welcomeTimerRef = useRef(null);
  const welcomeUnmountRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const cartButtonRef = useRef(null);
  const auroraRef = useRef(null);
  const videoManagerRef = useRef(getVideoManager());

  const markWelcomeSeen = useCallback(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(WELCOME_STORAGE_KEY, '1');
      }
    } catch (error) {
      /* ignore */
    }
  }, []);

  const clearWelcomeTimers = useCallback(() => {
    if (welcomeTimerRef.current) {
      clearTimeout(welcomeTimerRef.current);
      welcomeTimerRef.current = null;
    }
    if (welcomeUnmountRef.current) {
      clearTimeout(welcomeUnmountRef.current);
      welcomeUnmountRef.current = null;
    }
  }, []);

  const handleDismissWelcome = useCallback(
    (source = 'manual') => {
      setShowWelcome(false);
      markWelcomeSeen();
      if (source === 'manual') {
        clearWelcomeTimers();
      }
    },
    [clearWelcomeTimers, markWelcomeSeen],
  );

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [homeScreenStatus, setHomeScreenStatus] = useState('unknown');
  const [isAppActive, setIsAppActive] = useState(true);
  const [horizontalScrollProgress, setHorizontalScrollProgress] = useState(0);

  useEffect(() => {
    ensureTangerineNamespace();
    if (typeof window !== 'undefined') {
      window.videoManager = videoManagerRef.current;
    }
  }, []);

  useEffect(() => {
    const handleHorizontalScroll = (e) => {
      if (!e.target) return;
      const scrollLeft = e.target.scrollLeft;
      const scrollWidth = e.target.scrollWidth - e.target.clientWidth;
      const scrolled = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
      setHorizontalScrollProgress(scrolled);
    };

    const productContainer = document.querySelector('[data-product-scroll]');
    if (productContainer) {
      productContainer.addEventListener('scroll', handleHorizontalScroll, { passive: true });
      return () => productContainer.removeEventListener('scroll', handleHorizontalScroll);
    }
  }, []);

  useEffect(() => {
    if (!themeParams) return;
    const root = document.documentElement;
    const themeEntries = [
      ['--tg-theme-bg-color', themeParams.backgroundColor],
      ['--tg-theme-text-color', themeParams.textColor],
      ['--tg-theme-hint-color', themeParams.hintColor],
      ['--tg-theme-link-color', themeParams.linkColor],
      ['--tg-theme-button-color', themeParams.buttonColor],
      ['--tg-theme-button-text-color', themeParams.buttonTextColor],
      ['--tg-theme-secondary-bg-color', themeParams.secondaryBackgroundColor],
    ];
    themeEntries.forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(key, value);
      }
    });
  }, [themeParams]);

  useEffect(() => {
    if (!viewport) return;
    const root = document.documentElement;
    if (viewport.height) {
      root.style.setProperty('--tg-viewport-height', `${viewport.height}px`);
    }
    if (viewport.stableHeight) {
      root.style.setProperty('--tg-viewport-stable-height', `${viewport.stableHeight}px`);
    }
  }, [viewport]);

  useEffect(() => {
    if (!miniApp) return;
    try {
      miniApp.ready?.();
      miniApp.expand?.();
      miniApp.requestFullscreen?.();
      miniApp.lockOrientation?.('portrait');
    } catch (error) {
      console.warn('TMA SDK initialization warning (expected in dev):', error);
    }

    try {
      const onFullscreen = () => {
        setIsFullscreen(Boolean(miniApp.isFullscreen));
      };
      const onActivated = () => setIsAppActive(true);
      const onDeactivated = () => setIsAppActive(false);
      const onHomeScreenAdded = () => setHomeScreenStatus('added');

      miniApp.onEvent?.('fullscreenChanged', onFullscreen);
      miniApp.onEvent?.('activated', onActivated);
      miniApp.onEvent?.('deactivated', onDeactivated);
      miniApp.onEvent?.('homeScreenAdded', onHomeScreenAdded);

      miniApp.checkHomeScreenStatus?.((status) => {
        if (status) {
          setHomeScreenStatus(status);
        }
      });
    } catch (error) {
      console.warn('TMA event registration warning:', error);
    }

    const safeAreaHandler = () => {
      const root = document.documentElement;
      const safeArea = miniApp.safeAreaInset;
      if (!safeArea) return;
      root.style.setProperty('--tg-safe-area-top', `${safeArea.top ?? 0}px`);
      root.style.setProperty('--tg-safe-area-bottom', `${safeArea.bottom ?? 0}px`);
      root.style.setProperty('--tg-safe-area-left', `${safeArea.left ?? 0}px`);
      root.style.setProperty('--tg-safe-area-right', `${safeArea.right ?? 0}px`);
    };

    miniApp.onEvent?.('safeAreaChanged', safeAreaHandler);
    safeAreaHandler();

    return () => {
      miniApp.offEvent?.('fullscreenChanged', onFullscreen);
      miniApp.offEvent?.('activated', onActivated);
      miniApp.offEvent?.('deactivated', onDeactivated);
      miniApp.offEvent?.('homeScreenAdded', onHomeScreenAdded);
      miniApp.offEvent?.('safeAreaChanged', safeAreaHandler);
    };
  }, [miniApp]);

  useEffect(() => {
    if (!miniApp?.MainButton) return undefined;

    const { MainButton } = miniApp;
    const handleMainButtonClick = () => {
      miniApp?.HapticFeedback?.impactOccurred?.('medium');
      setIsCartOpen((prev) => !prev);
    };

    MainButton.onClick(handleMainButtonClick);

    return () => {
      miniApp.MainButton?.offClick?.(handleMainButtonClick);
    };
  }, [miniApp]);

  useEffect(() => {
    if (!miniApp?.MainButton) return;

    const { MainButton } = miniApp;
    if (!cart.length) {
      MainButton.hide();
      return;
    }

    MainButton.setText(isCartOpen ? 'Fermer le panier' : 'Voir le panier');
    MainButton.show();
    MainButton.enable();
  }, [miniApp, cart.length, isCartOpen]);

  useEffect(() => {
    if (!miniApp?.BackButton) return undefined;

    const { BackButton } = miniApp;
    const handleBack = () => {
      miniApp?.HapticFeedback?.impactOccurred?.('light');
      if (viewerOpen) {
        closeViewer();
        return;
      }
      if (selectedProduct) {
        setSelectedProduct(null);
        return;
      }
      if (isContactOpen) {
        setIsContactOpen(false);
        return;
      }
      if (showConfirmation) {
        setShowConfirmation(false);
        return;
      }
      if (isCartOpen) {
        setIsCartOpen(false);
      }
    };

    BackButton.onClick(handleBack);

    const shouldShow = Boolean(
      viewerOpen || selectedProduct || isContactOpen || showConfirmation || isCartOpen,
    );
    if (shouldShow) {
      BackButton.show();
    } else {
      BackButton.hide();
    }

    return () => {
      miniApp.BackButton?.offClick?.(handleBack);
    };
  }, [miniApp, viewerOpen, selectedProduct, isContactOpen, showConfirmation, isCartOpen, closeViewer]);

  useEffect(() => {
    let cleanup;

    try {
      const disabled = disableUmamiForOwner();
      if (!disabled) {
        cleanup = scheduleDeferredAnalyticsLoad();
      }
    } catch (error) {
      console.warn('Deferred analytics init failed', error);
    }

    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedCart, savedCity, savedPayment, savedPromo, savedWishlist, savedOrderHistory, savedTheme] = await Promise.all([
          StorageManager.loadCart(),
          StorageManager.loadDeliveryCity(),
          StorageManager.loadPaymentMethod(),
          StorageManager.loadPromoCode(),
          StorageManager.loadWishlist(),
          StorageManager.loadOrderHistory(),
          StorageManager.loadTheme(),
        ]);

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

        try {
          const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          const isFast = connection ? (connection.saveData ? false : (connection.effectiveType || '').toLowerCase().includes('4g')) : true;
          const allowParticles = isFast || (typeof window !== 'undefined' && window.innerWidth >= 360);
          setShowParticles(allowParticles);

          const isLowData = connection ? (connection.saveData || !((connection.effectiveType || '').toLowerCase().includes('4g'))) : false;
          if (typeof document !== 'undefined') {
            if (isLowData) {
              document.documentElement.classList.add('low-data');
            } else {
              document.documentElement.classList.remove('low-data');
            }
          }
        } catch (error) {
          if (typeof window !== 'undefined') {
            setShowParticles(window.innerWidth > 700);
          }
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        if (typeof document !== 'undefined') {
          document.documentElement.className = '';
        }
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    try {
      const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 900 || /Mobi|Android/i.test(navigator.userAgent || ''));
      const toPreload = PRODUCTS.slice(0, isMobile ? 3 : 5);

      toPreload.forEach((product) => {
        if (product.thumbnail) {
          const img = new Image();
          img.src = product.thumbnail;
          img.fetchPriority = 'high';
        }
      });

      toPreload.forEach((product, index) => {
        const videoUrls = (product.media || []).slice(0, 1);
        videoUrls.forEach((src) => {
          if (!src.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
            const img = new Image();
            img.src = src;
            return;
          }

          setTimeout(() => {
            videoManagerRef.current.preloadVideo(src);
          }, index * (isMobile ? 50 : 200));
        });
      });

      if (isMobile && typeof document !== 'undefined') {
        const menuVideos = Array.from(document.querySelectorAll('main video')).slice(0, 5);
        menuVideos.forEach((videoElement, idx) => {
          try {
            videoElement.muted = true;
            videoElement.defaultMuted = true;
            videoElement.playsInline = true;
            videoElement.setAttribute('playsinline', '');
            videoElement.setAttribute('muted', '');
            videoElement.preload = 'auto';
            videoElement.load();

            let attempts = 0;
            const tryPlay = () => {
              attempts += 1;
              videoElement.play().then(() => {
                logMediaMetric(videoElement.dataset?.productId || `menu_video_${idx}`, 0, 'menu_autoplay_success');
              }).catch(() => {
                if (attempts < 4) {
                  setTimeout(tryPlay, 400 + attempts * 200);
                } else {
                  logMediaMetric(videoElement.dataset?.productId || `menu_video_${idx}`, 0, 'menu_autoplay_failed');
                }
              });
            };

            tryPlay();
          } catch (error) {
            /* ignore per-video errors */
          }
        });
      }
    } catch (error) {
      /* ignore preload errors */
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || welcomeRendered) return;

    let alreadySeen = false;
    try {
      if (typeof localStorage !== 'undefined') {
        alreadySeen = localStorage.getItem(WELCOME_STORAGE_KEY) === '1';
      }
    } catch (error) {
      /* ignore */
    }

    setWelcomeRendered(true);

    if (alreadySeen) {
      markWelcomeSeen();
      return undefined;
    }

    welcomeTimerRef.current = setTimeout(() => {
      welcomeTimerRef.current = null;
      setShowWelcome(true);
      markWelcomeSeen();
      trackEvent('welcome_shown');
    }, 200);

    welcomeUnmountRef.current = setTimeout(() => {
      welcomeUnmountRef.current = null;
      handleDismissWelcome('auto');
    }, 4200);

    return () => {
      clearWelcomeTimers();
    };
  }, [clearWelcomeTimers, handleDismissWelcome, isLoading, markWelcomeSeen, welcomeRendered]);

  useEffect(() => {
    if (isLoading) return;

    try {
      const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 900 || /Mobi|Android/i.test(navigator.userAgent || ''));
      const toPreload = PRODUCTS.slice(0, isMobile ? 3 : 5);

      toPreload.forEach((product) => {
        if (product.thumbnail) {
          const img = new Image();
          img.src = product.thumbnail;
          img.fetchPriority = 'high';
        }
      });

      toPreload.forEach((product, index) => {
        const videoUrls = (product.media || []).slice(0, 1);
        videoUrls.forEach((src) => {
          if (!src.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
            const img = new Image();
            img.src = src;
            return;
          }

          setTimeout(() => {
            videoManagerRef.current.preloadVideo(src);
          }, index * (isMobile ? 50 : 200));
        });
      });

      if (isMobile && typeof document !== 'undefined') {
        const menuVideos = Array.from(document.querySelectorAll('main video')).slice(0, 5);
        menuVideos.forEach((videoElement, idx) => {
          try {
            videoElement.muted = true;
            videoElement.defaultMuted = true;
            videoElement.playsInline = true;
            videoElement.setAttribute('playsinline', '');
            videoElement.setAttribute('muted', '');
            videoElement.preload = 'auto';
            videoElement.load();

            let attempts = 0;
            const tryPlay = () => {
              attempts += 1;
              videoElement.play().then(() => {
                logMediaMetric(videoElement.dataset?.productId || `menu_video_${idx}`, 0, 'menu_autoplay_success');
              }).catch(() => {
                if (attempts < 4) {
                  setTimeout(tryPlay, 400 + attempts * 200);
                } else {
                  logMediaMetric(videoElement.dataset?.productId || `menu_video_${idx}`, 0, 'menu_autoplay_failed');
                }
              });
            };

            tryPlay();
          } catch (error) {
            /* ignore per-video errors */
          }
        });
      }
    } catch (error) {
      /* ignore preload errors */
    }
  }, [isLoading]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const layer = auroraRef.current;
    if (!layer) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let orientationActive = false;
    let rafId = null;
    const maxOffset = 26;
    let targetX = 0;
    let targetY = 0;

    const applyOffset = () => {
      layer.style.setProperty('--aurora-offset-x', `${targetX}px`);
      layer.style.setProperty('--aurora-offset-y', `${targetY}px`);
      rafId = null;
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(applyOffset);
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const handleTilt = (event) => {
      if (event.beta == null || event.gamma == null) return;
      orientationActive = true;
      const normX = clamp(event.gamma, -30, 30) / 30;
      const normY = clamp(event.beta, -30, 30) / 30;
      targetX = normX * maxOffset;
      targetY = normY * maxOffset;
      scheduleUpdate();
    };

    const handlePointer = (event) => {
      if (orientationActive) return;
      const normX = (event.clientX / window.innerWidth) - 0.5;
      const normY = (event.clientY / window.innerHeight) - 0.5;
      targetX = normX * maxOffset * 1.2;
      targetY = normY * maxOffset * 1.2;
      scheduleUpdate();
    };

    window.addEventListener('deviceorientation', handleTilt, { passive: true });
    window.addEventListener('mousemove', handlePointer);

    return () => {
      window.removeEventListener('deviceorientation', handleTilt);
      window.removeEventListener('mousemove', handlePointer);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      layer.style.removeProperty('--aurora-offset-x');
      layer.style.removeProperty('--aurora-offset-y');
    };
  }, []);

  const handleAddToHomeScreen = useCallback(() => {
    if (!miniApp?.addToHomeScreen) return;
    miniApp?.HapticFeedback?.impactOccurred?.('light');
    miniApp.addToHomeScreen();
  }, [miniApp]);

  const handleThemeToggle = useCallback(async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.className = newTheme === 'light' ? 'theme-light' : '';
    }
    await StorageManager.saveTheme(newTheme);
    trackEvent('theme_changed', { theme: newTheme });
  }, [theme]);

  const showNotificationMessage = useCallback((message, type = 'success') => {
    setNotification({ message, isVisible: true, type });
    setTimeout(() => setNotification({ message: '', isVisible: false, type: 'success' }), 2500);
  }, []);

  const addToCart = useCallback(async (product, quantity, price) => {
    if (quantity < MIN_QUANTITY) {
      showNotificationMessage(`Minimum ${MIN_QUANTITY}g par produit`, 'error');
      miniApp?.HapticFeedback?.impactOccurred?.('medium');
      return;
    }

    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let newCart;

    if (existingIndex !== -1) {
      newCart = cart.map((item, index) => {
        if (index === existingIndex) {
          const newQuantity = item.quantity + quantity;
          const unitPrice = PRICES[product.category];
          return { ...item, quantity: newQuantity, totalPrice: unitPrice * newQuantity };
        }
        return item;
      });
    } else {
      newCart = [...cart, { product, quantity, totalPrice: price }];
    }

    setCart(newCart);
    await StorageManager.saveCart(newCart);
  }, [cart, showNotificationMessage]);

  const handleAnimateAdd = useCallback((product, quantity, sourceButton) => {
    try {
      const cartButton = cartButtonRef.current;
      if (!cartButton || !sourceButton) return;

      const startRect = sourceButton.getBoundingClientRect();
      const cartRect = cartButton.getBoundingClientRect();

      const startX = startRect.left + startRect.width / 2;
      const startY = startRect.top + startRect.height / 2;
      const endX = cartRect.left + cartRect.width / 2;
      const endY = cartRect.top + cartRect.height / 2;

      const midX = startX + (endX - startX) * 0.55;
      const midY = Math.min(startY, endY) - 100;

      const badge = document.createElement('div');
      badge.className = 'flying-badge';
      badge.textContent = `${product.emoji} +${quantity}g`;
      badge.style.left = `${startX}px`;
      badge.style.top = `${startY}px`;
      document.body.appendChild(badge);

      const animation = badge.animate([
        { left: `${startX}px`, top: `${startY}px`, opacity: 0.05, transform: 'scale(0.7)' },
        { left: `${startX}px`, top: `${startY}px`, opacity: 0.95, transform: 'scale(1.15)', offset: 0.28 },
        { left: `${midX}px`, top: `${midY}px`, opacity: 0.7, transform: 'scale(1)', offset: 0.68 },
        { left: `${endX}px`, top: `${endY}px`, opacity: 0, transform: 'scale(0.6)' },
      ], {
        duration: 1080,
        easing: 'cubic-bezier(0.25, 0.85, 0.25, 1)',
      });

      const removeBadge = () => badge.remove();
      animation.addEventListener('finish', removeBadge);
      animation.addEventListener('cancel', removeBadge);

      cartButton.classList.add('cart-button-pulse');
      setTimeout(() => cartButton.classList.remove('cart-button-pulse'), 480);
    } catch (error) {
      console.error('animateAdd failed', error);
    }
  }, []);

  const updateQuantity = useCallback(async (index, newQuantity, newPrice) => {
    const newCart = cart.map((item, idx) => (idx === index ? { ...item, quantity: newQuantity, totalPrice: newPrice } : item));
    setCart(newCart);
    await StorageManager.saveCart(newCart);
  }, [cart]);

  const removeFromCart = useCallback(async (index) => {
    const newCart = cart.filter((_, idx) => idx !== index);
    setCart(newCart);
    await StorageManager.saveCart(newCart);
    showNotificationMessage('Produit retiré', 'info');
  }, [cart, showNotificationMessage]);

  const handleDeliveryCityChange = useCallback(async (city) => {
    setDeliveryCity(city);
    await StorageManager.saveDeliveryCity(city);
  }, []);

  const handlePaymentMethodChange = useCallback(async (method) => {
    setPaymentMethod(method);
    await StorageManager.savePaymentMethod(method);
    trackEvent('payment_method_changed', { method });
  }, []);

  const handleApplyPromo = useCallback(async (code) => {
    setAppliedPromo(code);
    await StorageManager.savePromoCode(code);
    showNotificationMessage(`Code ${code} appliqué !`, 'success');
  }, [showNotificationMessage]);

  const handleRemovePromo = useCallback(async () => {
    setAppliedPromo('');
    await StorageManager.savePromoCode('');
    showNotificationMessage('Code promo retiré', 'info');
  }, [showNotificationMessage]);

  const handleCheckoutClick = useCallback(() => {
    if (cart.length === 0) {
      showNotificationMessage('Panier vide !', 'error');
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const deliveryPrice = DELIVERY_PRICES[deliveryCity].price;
    const orderTotal = subtotal + deliveryPrice;
    const discount = appliedPromo && PROMO_CODES[appliedPromo]
      ? Math.round(orderTotal * PROMO_CODES[appliedPromo].discount)
      : 0;
    const total = orderTotal - discount;

    if (subtotal < MIN_SPEND) {
      const remaining = MIN_SPEND - subtotal;
      showNotificationMessage(`Minimum de ${MIN_SPEND}€ requis (hors livraison). Ajoutez encore ${remaining.toFixed(0)}€ de produits`, 'error');
      return;
    }

    trackEvent('checkout_initiated', { itemCount: cart.length });
    setShowConfirmation(true);
  }, [appliedPromo, cart, deliveryCity, showNotificationMessage]);

  const handleConfirmOrder = useCallback(async () => {
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const deliveryPrice = DELIVERY_PRICES[deliveryCity].price;
    const orderTotal = subtotal + deliveryPrice;
    const discount = appliedPromo && PROMO_CODES[appliedPromo]
      ? Math.round(orderTotal * PROMO_CODES[appliedPromo].discount)
      : 0;
    const totalPrice = orderTotal - discount;

    const message = cart
      .map((item) => `${item.product.emoji} ${item.product.name} - ${item.quantity}g : ${item.totalPrice}€`)
      .join('\n');

    const paymentText = paymentMethod === 'cash' ? '💵 Espèces' : '🪙 Crypto';
    const promoText = appliedPromo ? `\n🎟️ Code promo ${appliedPromo}: -${discount}€` : '';

    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cart,
      subtotal,
      deliveryPrice,
      discount,
      total: totalPrice,
      deliveryCity: DELIVERY_PRICES[deliveryCity].name,
      paymentMethod,
      promoCode: appliedPromo || null,
      estimatedDelivery: DELIVERY_PRICES[deliveryCity].estimatedDays,
    };

    const newOrderHistory = [order, ...orderHistory];
    setOrderHistory(newOrderHistory);
    await StorageManager.saveOrderHistory(newOrderHistory);

    const telegramURL = `https://t.me/Tangerine_212?text=${encodeURIComponent(
      `🎉 NOUVELLE COMMANDE TANGERINE\n\n${message}\n\n📦 Sous-total: ${subtotal}€${promoText}\n🚚 Livraison ${DELIVERY_PRICES[deliveryCity].name}: ${deliveryPrice === 0 ? 'GRATUIT' : `${deliveryPrice}€`}\n💳 Paiement: ${paymentText}\n\n💰 TOTAL: ${totalPrice}€`,
    )}`;

    trackEvent('order_confirmed', {
      total: totalPrice,
      itemCount: cart.length,
      deliveryCity: DELIVERY_PRICES[deliveryCity].name,
      paymentMethod,
      promoCode: appliedPromo || 'none',
      discount,
    });

    if (typeof window !== 'undefined') {
      window.open(telegramURL, '_blank');
    }

    setCart([]);
    StorageManager.saveCart([]);
    setIsCartOpen(false);
    setShowConfirmation(false);
    setConfettiTrigger((prev) => prev + 1);
    showNotificationMessage('Commande envoyée ! ✅', 'success');
  }, [appliedPromo, cart, deliveryCity, orderHistory, paymentMethod, showNotificationMessage]);

  const handleToggleWishlist = useCallback(async (product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    let newWishlist;

    if (isInWishlist) {
      newWishlist = wishlist.filter((item) => item.id !== product.id);
      showNotificationMessage(`${product.emoji} ${product.name} retiré des favoris`, 'info');
    } else {
      newWishlist = [...wishlist, product];
      showNotificationMessage(`${product.emoji} ${product.name} ajouté aux favoris`, 'success');
    }

    setWishlist(newWishlist);
    await StorageManager.saveWishlist(newWishlist);
    trackEvent('wishlist_toggled', { product: product.name, added: !isInWishlist });
  }, [showNotificationMessage, wishlist]);

  const productsToDisplay = useMemo(() => {
    if (selectedCategory === 'all') {
      return PRODUCTS;
    }
    return PRODUCTS.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    trackEvent('category_changed', { category: categoryId });
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryPrice = DELIVERY_PRICES[deliveryCity].price;
  const orderTotal = subtotal + deliveryPrice;
  const discount = appliedPromo && PROMO_CODES[appliedPromo]
    ? Math.round(orderTotal * PROMO_CODES[appliedPromo].discount)
    : 0;
  const total = orderTotal - discount;
  const meetsMinimum = subtotal >= MIN_SPEND;
  const cartProgress = Math.min(100, (subtotal / MIN_SPEND) * 100);

  const bgClasses = theme === 'light'
    ? 'min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#edf4ef] to-[#f8fafc] relative overflow-hidden'
    : 'min-h-screen bg-gradient-to-br from-[#05090b] via-[#0b1411] to-[#05090b] relative overflow-hidden';
  const textClasses = theme === 'light' ? 'text-slate-900' : 'text-white';
  const textSecondaryClasses = theme === 'light' ? 'text-slate-600' : 'text-white/60';

  return (
    <div className={bgClasses}>

      {welcomeRendered && (
        <div
          className={`welcome-toast ${showWelcome ? 'show' : ''}`}
          role="status"
          aria-live="polite"
          onClick={() => handleDismissWelcome('manual')}
        >
          <span className="text-xl">🍊</span>
          <span className="welcome-text">Welcome</span>
        </div>
      )}

      <div className="background-aurora" aria-hidden="true" ref={auroraRef}>
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="noise-overlay" />
      </div>

      {showParticles && <ParticlesBackground />}

      <ThemeToggle theme={theme} onToggle={handleThemeToggle} cartOpen={isCartOpen} />

      {miniApp?.addToHomeScreen && homeScreenStatus !== 'added' && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="glass-dark border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-white font-semibold text-sm">📱 Ajouter Tangerine à l’écran d’accueil</p>
              <p className="text-white/60 text-xs">
                Accès direct depuis Telegram. Statut : {homeScreenStatus}
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddToHomeScreen}
              className="glass-cta px-4 py-2 rounded-xl text-sm font-semibold"
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

      {/* Top spacing */}
      <div className="h-12" />

      <header className="relative z-10 max-w-7xl mx-auto px-4 pb-4 pt-12 md:pt-16 telegram-header">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src={LOGO_URL}
            alt="Logo"
            loading="lazy"
            className="w-16 h-16 rounded-2xl border-2 border-white/20 shadow-xl float object-cover"
            onError={(event) => {
              event.target.src = 'https://s10.aconvert.com/convert/p3r68-cdx67/avr8y-z3sxq.jpg';
            }}
          />
          <div>
            <h1 className="text-3xl font-black gradient-text">TANGERINE</h1>
            <p className={`text-sm ${textSecondaryClasses}`}>Premium Quality</p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth" ref={categoryScrollRef}>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold transition-all ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.gradient} text-white scale-105 glow`
                  : `glass ${textClasses} opacity-70 hover:opacity-100 hover:scale-105`
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.label}
            </button>
          ))}
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
        {productsToDisplay.length === 0 ? (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="text-7xl mb-4">🔍</div>
            <p className={`${textClasses} text-xl font-semibold mb-2`}>Aucun produit</p>
            <p className={`${textSecondaryClasses} text-sm`}>Essayez une autre catégorie</p>
          </div>
        ) : (
          <div className="flex gap-5 overflow-x-auto pb-6 snap-x scroll-smooth" data-product-scroll>
            {productsToDisplay.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onAnimateAdd={handleAnimateAdd}
                onViewDetails={setSelectedProduct}
                isInWishlist={wishlist.some((item) => item.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                isInitiallyVisible={index === 0}
                isPriority={index === 0}
              />
            ))}
          </div>
        )}
      </main>

      {/* Horizontal Scroll Progress Bar */}
      <div className="relative w-full h-1 bg-gray-800 mb-2">
        <div className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500" style={{ width: `${horizontalScrollProgress}%`, transition: 'width 0.15s ease-out' }} />
      </div>

      <nav className="fixed left-1/2 -translate-x-1/2 z-40 glass-dark rounded-full shadow-2xl flex items-center transition-all duration-300 bottom-nav">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`${textClasses} hover:scale-105 active:scale-95 transition-all nav-icon-btn`}
          title="Accueil"
        >
          <span>🏠</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          ref={cartButtonRef}
          className={`relative bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 hover:from-orange-600 hover:via-pink-600 hover:to-orange-600 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 glow cart-pill ${cart.length > 0 && !meetsMinimum ? 'has-progress' : ''}`}
        >
          <span className="mr-2">🛒</span>
          Panier
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-pulse">
              {cart.length}
            </span>
          )}
          <div className="cart-progress-track">
            <div
              className="cart-progress-fill"
              style={{ width: cart.length > 0 && !meetsMinimum ? `${cartProgress}%` : '0%' }}
            />
          </div>
        </button>

        <button
          onClick={() => setIsContactOpen(true)}
          className={`${textClasses} hover:scale-105 active:scale-95 transition-all nav-icon-btn`}
          title="Contact"
        >
          <span>💬</span>
        </button>
      </nav>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckoutClick}
        deliveryCity={deliveryCity}
        onDeliveryCityChange={handleDeliveryCityChange}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={handlePaymentMethodChange}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      <Suspense fallback={null}>
        <ConfirmationModal
          isOpen={showConfirmation}
          onConfirm={handleConfirmOrder}
          onCancel={() => setShowConfirmation(false)}
          cart={cart}
          deliveryCity={deliveryCity}
          total={total}
          paymentMethod={paymentMethod}
          discount={discount}
          subtotal={subtotal}
          deliveryPrice={deliveryPrice}
        />

        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />

        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          openViewer={openViewer}
        />

        <FullscreenViewer
          isOpen={viewerOpen}
          product={viewerProduct}
          startIndex={viewerStartIndex}
          onClose={closeViewer}
        />
      </Suspense>

      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        type={notification.type}
      />

      <Confetti trigger={confettiTrigger} />
    </div>
  );
};

export default App;
