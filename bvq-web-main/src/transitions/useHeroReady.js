import { useEffect, useRef, useState } from 'react';
import { assetRegistry } from '../content';
import { themeFor } from './themeMap';

const PATH_TO_ASSET = {
  sakura: assetRegistry.spa,
  wave: assetRegistry.travel,
  steam: assetRegistry.restaurant,
  speed: assetRegistry.automotive,
  blueprint: assetRegistry.realEstate,
  silk: assetRegistry.fashion,
  gold: assetRegistry.studioHero,
};

function assetForPath(path) {
  const theme = themeFor(path);
  return PATH_TO_ASSET[theme] || PATH_TO_ASSET.gold;
}

export function useHeroReady(targetPath, timeoutMs = 1800) {
  const [ready, setReady] = useState(true);
  const tokenRef = useRef(0);

  useEffect(() => {
    if (!targetPath) {
      setReady(true);
      return;
    }
    const token = ++tokenRef.current;
    setReady(false);
    const src = assetForPath(targetPath);

    let done = false;
    const finish = () => {
      if (done || token !== tokenRef.current) return;
      done = true;
      setReady(true);
    };

    const img = new Image();
    img.onload = finish;
    img.onerror = finish;
    img.src = src;
    if (img.complete) {
      finish();
      return;
    }

    const timer = window.setTimeout(finish, timeoutMs);
    return () => window.clearTimeout(timer);
  }, [targetPath, timeoutMs]);

  return ready;
}
