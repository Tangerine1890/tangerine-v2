import { useEffect, useRef } from 'react';
import { registerTangerineComponent } from '../../lib/registry.js';
import { trackEvent } from '../utils/analytics.js';

const ContactModalComponent = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const focusables = () => {
      if (!dialogRef.current) return [];
      return Array.from(dialogRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter((el) => !el.hasAttribute('disabled'));
    };
    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return;
      const nodes = focusables();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const node = dialogRef.current;
    node?.addEventListener('keydown', onKeyDown);
    (closeRef.current || node)?.focus();
    return () => node?.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      <div
        className="glass-dark rounded-3xl max-w-md w-full animate-slide-up max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💬</span>
            <h3 id="contact-title" className="text-2xl font-bold text-white">Contact</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-3xl leading-none transition-all"
            ref={closeRef}
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 float">
              📱
            </div>
            <h4 className="text-white font-bold text-xl mb-2">Commandez maintenant</h4>
            <p className="text-white/60 text-sm mb-6">Contactez-nous sur Telegram</p>
          </div>

          <div className="space-y-4">
            <a
              href="https://t.me/Tangerine_212"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('contact_telegram_click')}
              className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 glow text-center"
            >
              📲 @Tangerine_212
            </a>

            <a
              href="https://t.me/angry0terps"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('contact_telegram_angry_click')}
              className="block w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 glow text-center"
            >
              📲 @angry0terps
            </a>
          </div>

          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-white font-bold mb-2">Disponible 24/7</p>
            <p className="text-white/60 text-sm">Deux contacts pour vous servir</p>
          </div>

          <div className="border-t border-white/20 pt-6">
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>💳</span>
              <span>Modes de paiement acceptés</span>
            </h4>

            <div className="space-y-3">
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💵</span>
                  <span className="text-white font-semibold">Espèces</span>
                </div>
                <p className="text-white/60 text-sm">Toutes devises acceptées</p>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🪙</span>
                  <span className="text-white font-semibold">Cryptomonnaies</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Solana', icon: '◎' },
                    { label: 'USDT', icon: '₮' },
                    { label: 'Bitcoin', icon: '₿' },
                    { label: 'Ethereum', icon: 'Ξ' },
                  ].map(({ label, icon }) => (
                    <div key={label} className="glass-dark rounded-lg p-2 text-center">
                      <div className="text-lg mb-1">{icon}</div>
                      <p className="text-white/80 text-xs font-semibold">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 text-white/60 text-xs">
            <div className="flex-1 flex items-center justify-center gap-2 glass rounded-xl py-3">
              <span>🚚</span>
              <span>Rapide</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 glass rounded-xl py-3">
              <span>✅</span>
              <span>Qualité</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactModal = registerTangerineComponent('ContactModal', ContactModalComponent);

export default ContactModal;
