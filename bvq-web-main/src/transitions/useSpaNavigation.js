import { useCallback, useEffect, useRef, useState } from 'react';

function shouldIntercept(anchor) {
  if (!anchor) return false;
  const href = anchor.getAttribute('href');
  if (!href) return false;
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  if (anchor.target === '_blank' || anchor.hasAttribute('download')) return false;
  if (anchor.origin !== window.location.origin) return false;
  if (!href.startsWith('/')) return false;
  return true;
}

export function useSpaNavigation() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPath, setTargetPath] = useState(null);
  const [phase, setPhase] = useState('idle');
  const lockRef = useRef(false);

  const finishTransition = useCallback(() => {
    setIsTransitioning(false);
    setTargetPath(null);
    setPhase('idle');
    lockRef.current = false;
  }, []);

  const commitNavigation = useCallback((href) => {
    window.history.pushState({}, '', href);
    setPathname(href);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setPhase('committed');
  }, []);

  const navigate = useCallback((href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (href === pathname || lockRef.current) return;
    lockRef.current = true;
    setTargetPath(href);
    setIsTransitioning(true);
    setPhase('exit');

    const EXIT_MS = 520;
    window.setTimeout(() => {
      const doCommit = () => commitNavigation(href);
      const vt = document.startViewTransition;
      if (typeof vt === 'function') {
        document.startViewTransition(doCommit);
      } else {
        doCommit();
      }
    }, EXIT_MS);
  }, [pathname, commitNavigation]);

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname);
      setIsTransitioning(false);
      setTargetPath(null);
      setPhase('idle');
      lockRef.current = false;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a');
      if (!a || !shouldIntercept(a)) return;
      e.preventDefault();
      navigate(a.getAttribute('href'));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  return { pathname, navigate, isTransitioning, targetPath, phase, finishTransition };
}
