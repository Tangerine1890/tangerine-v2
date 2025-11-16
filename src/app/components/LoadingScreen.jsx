import { useEffect, useMemo, useState } from 'react';
import { registerTangerineComponent } from '../../lib/registry.js';
import { LOGO_URL, trackEvent } from '../utils/analytics.js';

const LOADING_MESSAGES = [
  'Cleaning Resin',
  'Loading Terpenes',
  'Curing the Product',
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const LoadingScreenComponent = ({ onComplete }) => {
  const [progress, setProgress] = useState(8);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    trackEvent('page_load', { page: 'loading' });
  }, []);

  useEffect(() => {
    let totalDelay = 0;
    const steps = [
      { value: 24, delay: 260 },
      { value: 46, delay: 360 },
      { value: 68, delay: 420 },
      { value: 88, delay: 360 },
      { value: 100, delay: 420 },
    ];

    const timers = steps.map((step) => {
      totalDelay += step.delay;
      return setTimeout(() => setProgress(step.value), totalDelay);
    });

    const completionTimer = setTimeout(() => {
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }, totalDelay + 320);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const clampedProgress = useMemo(() => clamp(Math.round(progress), 0, 100), [progress]);
  const progressStyle = useMemo(
    () => ({ transform: `scaleX(${Math.max(clampedProgress, 4) / 100})` }),
    [clampedProgress],
  );
  const subtext = useMemo(
    () => `Chargement des résines · ${clampedProgress}%`,
    [clampedProgress],
  );

  return (
    <div className="fixed inset-0 z-50">
      <div className="loading-overlay">
        <div className="loading-aurora">
          <div className="loading-orb orb-1" />
          <div className="loading-orb orb-2" />
          <div className="loading-orb orb-3" />
        </div>
        <div className="loading-noise" />

        <div className="loading-core">
          <div className="loading-logo-wrap">
            <div className="loading-ring" />
            <div className="loading-ring" />
            <img
              src={LOGO_URL}
              alt="Tangerine"
              className="loading-logo"
              onError={(event) => {
                event.target.src = 'https://s10.aconvert.com/convert/p3r68-cdx67/avr8y-z3sxq.jpg';
              }}
            />
            <div className="loading-shine" />
          </div>

          <span className="loading-tagline">ONLY PREMIUM QUALITY</span>

          <div className="loading-progress">
            <div className="loading-progress-bar" style={progressStyle} />
          </div>

          <div className="loading-message">{LOADING_MESSAGES[messageIndex]}</div>
          <div className="loading-subtext">{subtext}</div>
        </div>
      </div>
    </div>
  );
};

export const LoadingScreen = registerTangerineComponent(
  'LoadingScreen',
  LoadingScreenComponent,
);

export default LoadingScreen;
