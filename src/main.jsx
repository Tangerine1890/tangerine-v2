import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Prevent Web3 library conflicts
if (typeof window !== 'undefined' && !window.ethereum) {
  Object.defineProperty(window, 'ethereum', {
    value: undefined,
    writable: true,
    configurable: true,
  });
}

if (typeof window !== 'undefined' && !window.Telegram) {
  window.Telegram = {
    WebApp: {
      initData: '',
      initDataUnsafe: {
        query_id: '',
        user: { id: 0, first_name: 'Dev', is_bot: false },
        auth_date: Math.floor(Date.now() / 1000),
      },
      isExpanded: true,
      isFullscreen: false,
      viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
      viewportStableHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
      headerColor: '#ffffff',
      backgroundColor: '#ffffff',
      bottomBarColor: '#ffffff',
      isClosingConfirmationEnabled: false,
      ready: () => {
        // Safe no-op for dev environment
      },
      expand: () => {
        // Safe no-op for dev environment
      },
      requestFullscreen: () => {
        // Safe no-op for dev environment
      },
      lockOrientation: () => {
        // Safe no-op for dev environment
      },
      addToHomeScreen: () => {
        // Safe no-op for dev environment
      },
      checkHomeScreenStatus: (cb) => {
        if (typeof cb === 'function') {
          cb('unknown');
        }
      },
      HapticFeedback: {
        impactOccurred: () => { },
        notificationOccurred: () => { },
        selectionChanged: () => { },
      },
      MainButton: {
        onClick: () => { },
        offClick: () => { },
        show: () => { },
        hide: () => { },
        enable: () => { },
        disable: () => { },
        setText: () => { },
        setParams: () => { },
      },
      BackButton: {
        onClick: () => { },
        offClick: () => { },
        show: () => { },
        hide: () => { },
      },
      onEvent: () => { },
      offEvent: () => { },
      safeAreaInset: { top: 0, bottom: 0, left: 0, right: 0 },
      contentSafeAreaInset: { top: 0, bottom: 0, left: 0, right: 0 },
      CloudStorage: {
        getItem: (key, callback) => callback(null, null),
        setItem: (key, value, callback) => callback(null),
        removeItem: (key, callback) => callback(null),
        getKeys: (callback) => callback(null, []),
      },
      sendData: () => { },
      close: () => { },
      openLink: (url) => {
        if (typeof window !== 'undefined') {
          window.open(url, '_blank');
        }
      },
      openTelegramLink: (url) => {
        if (typeof window !== 'undefined') {
          window.open(url, '_blank');
        }
      },
      openInvoice: () => { },
      showPopup: () => { },
      showAlert: (message) => {
        if (typeof window !== 'undefined') {
          alert(message);
        }
      },
      showConfirm: (message, callback) => {
        if (typeof window !== 'undefined' && typeof callback === 'function') {
          callback(confirm(message));
        }
      },
    },
  };
}

import { SDKProvider } from '@tma.js/sdk-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SDKProvider acceptCustomStyles debug>
      <App />
    </SDKProvider>
  </StrictMode>,
);
