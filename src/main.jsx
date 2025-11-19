import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

if (typeof window !== 'undefined' && !window.Telegram) {
  window.Telegram = {
    WebApp: {
      initData: '',
      initDataUnsafe: {
        query_id: '',
        user: { id: 0, first_name: 'Dev', is_bot: false },
        auth_date: Math.floor(Date.now() / 1000),
      },
      ready: () => {},
      expand: () => {},
      requestFullscreen: () => {},
      lockOrientation: () => {},
      HapticFeedback: {
        impactOccurred: () => {},
      },
      MainButton: {
        onClick: () => {},
        offClick: () => {},
        show: () => {},
        hide: () => {},
        enable: () => {},
        disable: () => {},
        setText: () => {},
      },
      BackButton: {
        onClick: () => {},
        offClick: () => {},
        show: () => {},
        hide: () => {},
      },
      onEvent: () => {},
      offEvent: () => {},
      checkHomeScreenStatus: (cb) => cb?.('unknown'),
      safeAreaInset: { top: 0, bottom: 0, left: 0, right: 0 },
    },
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
