'use client';

import { useEffect, useRef } from 'react';

export default function VantaBackground() {
  const ref = useRef(null);

  useEffect(() => {
    let effect;
    const init = async () => {
      const THREE = await import('three');
      const HALO = (await import('vanta/dist/vanta.halo.min')).default;

      effect = HALO({
        el: ref.current,
        THREE,
        backgroundColor: 0x05060f,
        baseColor: 0x6d21bb,
        amplitude: 1.2,
        size: 1,
      });
    };

    init();

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
      }}
    />
  );
}
