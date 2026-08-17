import { useEffect, useRef } from 'react';
import { createSakuraEngine } from './motifs/sakura';
import {
  createWaveEngine,
  createSteamEngine,
  createSpeedEngine,
  createBlueprintEngine,
  createSilkEngine,
  createGoldEngine,
} from './motifs/engines';

const FACTORY = {
  sakura: createSakuraEngine,
  wave: createWaveEngine,
  steam: createSteamEngine,
  speed: createSpeedEngine,
  blueprint: createBlueprintEngine,
  silk: createSilkEngine,
  gold: createGoldEngine,
};

export function MotifCanvas({ theme, active }) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const factory = FACTORY[theme] || FACTORY.gold;
    const engine = factory(canvas);
    engineRef.current = engine;
    if (active) engine.start();
    return () => engine.stop();
  }, [theme]);

  useEffect(() => {
    const eng = engineRef.current;
    if (!eng) return;
    if (active) eng.start();
    else eng.stop();
  }, [active]);

  return <canvas ref={canvasRef} className="pt-motif" aria-hidden="true" />;
}
