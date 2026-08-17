import { useEffect, useRef, useState } from 'react';
import { labelFor, themeFor } from './themeMap';
import { MotifCanvas } from './MotifCanvas';
import { useHeroReady } from './useHeroReady';

const ENTER_MS = 620;
const HOLD_AFTER_READY_MS = 120;
const MAX_HOLD_MS = 1900;

export function PageTransition({ isTransitioning, targetPath, phase, onEntered }) {
  const targetTheme = themeFor(targetPath || '');
  const wordmark = labelFor(targetTheme);
  const heroReady = useHeroReady(targetPath);
  const [visualPhase, setVisualPhase] = useState('idle');
  const timersRef = useRef([]);

  const clearTimers = () => {
    for (const t of timersRef.current) window.clearTimeout(t);
    timersRef.current = [];
  };

  useEffect(() => {
    if (!isTransitioning) {
      setVisualPhase('idle');
      clearTimers();
      return;
    }
    setVisualPhase('exit');

    const maxTimer = window.setTimeout(() => {
      setVisualPhase('enter');
      const doneTimer = window.setTimeout(() => {
        onEntered?.();
      }, ENTER_MS);
      timersRef.current.push(doneTimer);
    }, MAX_HOLD_MS);
    timersRef.current.push(maxTimer);

    return clearTimers;
  }, [isTransitioning, onEntered]);

  useEffect(() => {
    if (!isTransitioning || visualPhase !== 'exit') return;
    if (phase !== 'committed') return;
    if (!heroReady) return;
    clearTimers();
    const t = window.setTimeout(() => {
      setVisualPhase('enter');
      const done = window.setTimeout(() => onEntered?.(), ENTER_MS);
      timersRef.current.push(done);
    }, HOLD_AFTER_READY_MS);
    timersRef.current.push(t);
  }, [isTransitioning, visualPhase, phase, heroReady, onEntered]);

  useEffect(() => () => clearTimers(), []);

  if (!isTransitioning && visualPhase === 'idle') return null;

  const activeMotif = visualPhase === 'exit' || (isTransitioning && phase !== 'idle');

  return (
    <div
      className={`page-transition pt-${visualPhase}`}
      aria-hidden="true"
      aria-live="off"
    >
      <div className="pt-curtain" />
      <MotifCanvas theme={targetTheme} active={activeMotif} />
      <div className="pt-wordmark">
        <span className="pt-wordmark-theme">{targetTheme}</span>
        <span className="pt-wordmark-label">{wordmark}</span>
      </div>
      {visualPhase === 'exit' && (
        <div className="pt-progress" aria-hidden="true">
          <div className="pt-progress-track">
            <div className="pt-progress-fill" />
          </div>
        </div>
      )}
    </div>
  );
}
