# Tangerine – Vite React App

Vite-based migration of the Tangerine Telegram WebApp experience. The UI mimmics the legacy inline React bundle with modular components, Tailwind utility classes, advanced animations, analytics, cart flows, and Telegram-specific behaviours.

## Project structure

```
src/
  App.jsx                # Root application: state, effects, rendering
  app/components/        # UI building blocks (ProductCard, CartDrawer…)
  app/constants/         # Prices, promo codes, categories, storage keys
  app/data/products.js   # Product catalogue
  app/utils/             # Storage, analytics, video manager utilities
public/manifest.webmanifest
index.html               # Document head, Telegram bootstrap, preloads
tailwind.config.js       # Tailwind content scan configuration
```

## Getting started

```bash
pnpm install   # or npm install / yarn install
pnpm run dev   # launches Vite dev server (default http://localhost:5173)
```

Environment requirements:

- Node.js ≥ 18
- pnpm (recommended) or npm/yarn

## Available scripts

| Command          | Description                                 |
| ---------------- | ------------------------------------------- |
| `pnpm run dev`   | Start development server with HMR           |
| `pnpm run build` | Production build (outputs to `dist/`)       |
| `pnpm run preview` | Preview the production build locally      |

## Configuration & assets

- **Manifest**: `public/manifest.webmanifest` references the Tangerine logo (remote for now). Replace with self-hosted assets before shipping.
- **Favicon / Apple touch icon**: served from `index.html`. Update to point to locally hosted icons when available.
- **Preloads**: Two hero videos are preloaded via `<link rel="preload">` to improve perceived performance (legacy behaviour).
- **Service Worker**: `registerServiceWorker()` currently attempts to register `/sw.js`. Provide an implementation under `public/sw.js` or remove the registration call if not needed.

## Analytics

- Deferred loading of Umami + Microsoft Clarity after 3 seconds post `window.load`.
- Owner sessions (Telegram username `tangerine_212`) automatically disable Umami tracking via `localStorage`.
- Helpers located in `src/app/utils/analytics.js` and initialised from `App.jsx`.

## Styling

- Tailwind is used in combination with bespoke utility classes ported from the legacy build.
- Global styles (glassmorphism, aurora background, animations) live in `src/index.css`. They rely on Tailwind’s `@tailwind base|components|utilities` directives.
- Some CSS warnings (`scrollbar-width`, `-webkit-overflow-scrolling`, `backdrop-filter`) are accepted to preserve the Telegram/iOS experience; Safari fallbacks use `-webkit-backdrop-filter` where appropriate.

## Remaining follow-ups

- Provide a local copy of the Tangerine logo and video assets; update references away from remote CDNs if necessary.
- Add/adjust service worker (`public/sw.js`) to support offline caching or disable registration.
- Review analytics IDs (`Umami`, `Clarity`) and move to environment-managed configuration if needed.
- End-to-end testing inside Telegram WebApp container (viewport, safe-area insets, theme toggles).

## Deployment notes

- Build artefacts are output to `dist/`. Serve via any static host capable of SPA fallback (e.g. Netlify, Vercel, Cloudflare Pages).
- Ensure response headers allow video preloads and cross-origin media (currently dependent on `file.garden` / `files.catbox.moe`).
