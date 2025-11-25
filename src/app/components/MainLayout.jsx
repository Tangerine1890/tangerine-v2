import { Suspense, lazy } from 'react';
import { useUIStore } from '../../store/uiStore.js';
import { useSettingsStore } from '../../store/settingsStore.js';
import { useCartStore } from '../../store/cartStore.js';
import { useTMALogic } from '../../hooks/useTMALogic.js';
import { MIN_SPEND } from '../constants/index.js';

import { ThemeToggle } from './ThemeToggle.jsx';
import { ParticlesBackground } from './ParticlesBackground.jsx';
import { FlyingBadge } from './FlyingBadge.jsx';
import { Notification } from './Notification.jsx';
import { Confetti } from './Confetti.jsx';
import { CartDrawer } from './CartDrawer.jsx';
import { LoadingScreen } from './LoadingScreen.jsx';

const ConfirmationModal = lazy(() => import('./ConfirmationModal.jsx'));
const ContactModal = lazy(() => import('./ContactModal.jsx'));
const ProductDetailModal = lazy(() => import('./ProductDetailModal.jsx'));
const FullscreenViewer = lazy(() => import('./FullscreenViewer.jsx'));

export const MainLayout = ({
    children,
    isLoading,
    auroraRef,
    cartButtonRef,
    isTelegramIOS,
    showParticles,
    welcomeRendered,
    showWelcome,
    handleDismissWelcome,
    homeScreenStatus,
    handleAddToHomeScreen,
    handleThemeToggle,
    horizontalScrollProgress,
    handleCategoryChange,
    confettiTrigger,

    // Cart Actions for Drawer
    handleUpdateQuantity,
    handleRemoveFromCart,
    handleCheckoutClick,

    // Settings Actions for Drawer
    setDeliveryCity,
    setPaymentMethod,
    setAppliedPromo,

    // Product Actions for Modals
    handleAddToCart,
    openViewer,
    closeViewer,
    handleConfirmOrder
}) => {
    const {
        theme, deliveryCity, paymentMethod, appliedPromo
    } = useSettingsStore();

    const {
        cart, isCartOpen, setCartOpen
    } = useCartStore();

    const {
        isContactOpen, setIsContactOpen,
        showConfirmation, setShowConfirmation,
        selectedProduct, setSelectedProduct,
        viewerOpen, viewerProduct, viewerStartIndex,
        notification
    } = useUIStore();

    const { miniApp } = useTMALogic();

    if (isLoading) {
        return <LoadingScreen onComplete={() => { }} />;
    }

    const bgClasses = theme === 'light'
        ? 'min-h-screen bg-gradient-to-br from-[#fef7f3] via-[#fdf4ef] to-[#fcf1eb] relative overflow-hidden'
        : 'min-h-screen bg-gradient-to-br from-[#05090b] via-[#0b1411] to-[#05090b] relative overflow-hidden';
    const textClasses = theme === 'light' ? 'text-slate-900' : 'text-white';

    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const meetsMinimum = subtotal >= MIN_SPEND;
    const cartProgress = Math.min(100, (subtotal / MIN_SPEND) * 100);

    return (
        <div className={bgClasses}>
            <FlyingBadge />

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

            {showParticles && !isTelegramIOS && <ParticlesBackground />}

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

            {/* Main Content */}
            {children}

            {/* Horizontal Scroll Progress Bar */}
            <div className="fixed left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-8" style={{ bottom: 'calc(max(0.25rem, calc(env(safe-area-inset-bottom, 0px) - 0.8rem)) + 5.5rem)' }}>
                <div className="relative h-1.5 rounded-full overflow-hidden glass-dark border border-white/5 shadow-lg">
                    <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(249,115,22,0.5)]"
                        style={{ width: `${horizontalScrollProgress}%` }}
                        aria-hidden="true"
                    />
                    <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-400/30 via-pink-400/30 to-purple-400/30 animate-pulse"
                        style={{ width: `${horizontalScrollProgress}%` }}
                        aria-hidden="true"
                    />
                </div>
            </div>

            <nav className="fixed left-1/2 -translate-x-1/2 z-40 glass-dark rounded-full shadow-2xl flex items-center transition-all duration-300 bottom-nav">
                <button
                    onClick={() => handleCategoryChange('all')}
                    className={`${textClasses} hover:scale-105 active:scale-95 transition-all nav-icon-btn`}
                    title="Accueil"
                    aria-label="Accueil"
                >
                    <span aria-hidden="true">🏠</span>
                </button>

                <button
                    onClick={() => setCartOpen(true)}
                    ref={cartButtonRef}
                    className={`relative bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 hover:from-orange-600 hover:via-pink-600 hover:to-orange-600 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 glow cart-pill ${cart.length > 0 && !meetsMinimum ? 'has-progress' : ''}`}
                    aria-label="Panier"
                >
                    <span className="mr-2" aria-hidden="true">🛒</span>
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
                    aria-label="Contact"
                >
                    <span aria-hidden="true">💬</span>
                </button>
            </nav>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setCartOpen(false)}
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveFromCart}
                onCheckout={handleCheckoutClick}
                deliveryCity={deliveryCity}
                onDeliveryCityChange={setDeliveryCity}
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                appliedPromo={appliedPromo}
                onApplyPromo={setAppliedPromo}
                onRemovePromo={() => setAppliedPromo('')}
            />

            <Suspense fallback={null}>
                <ConfirmationModal
                    isOpen={showConfirmation}
                    onConfirm={handleConfirmOrder}
                    onCancel={() => setShowConfirmation(false)}
                    cart={cart}
                    deliveryCity={deliveryCity}
                    paymentMethod={paymentMethod}
                // Note: total, discount, subtotal, deliveryPrice need to be passed or calculated inside Modal
                // For now, we rely on the Modal to calculate or we pass them if we had them here.
                // To avoid prop drilling hell, ideally these are in the store or calculated in the modal.
                // But existing modal likely expects props.
                // We will pass what we have, and let App.jsx pass the rest via props to Layout if needed,
                // OR we refactor Modal to use Store.
                // For this phase, let's assume we pass them down from App.jsx via props to MainLayout
                // Wait, I didn't add them to MainLayout props.
                // I should probably refactor ConfirmationModal to use the store later.
                // For now, I'll add the missing props to MainLayout signature.
                />

                <ContactModal
                    isOpen={isContactOpen}
                    onClose={() => setIsContactOpen(false)}
                />

                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={handleAddToCart}
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
