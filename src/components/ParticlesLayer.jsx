import React, { useMemo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useReducedMotion } from 'framer-motion';

const initParticles = async (engine) => {
  await loadSlim(engine);
};

function ParticlesInner() {
  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: {
          value: 20,
          density: { enable: true, area: 800 },
        },
        color: {
          value: ['#C9A66B', '#E8C9C0', '#F6EEDF', '#8A9A7B'],
        },
        shape: {
          type: ['circle'],
        },
        opacity: {
          value: { min: 0.25, max: 0.65 },
        },
        size: {
          value: { min: 2, max: 5 },
        },
        move: {
          enable: true,
          direction: 'bottom',
          speed: 1.2,
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
      <Particles id="tsparticles-wedding" options={options} className="w-full h-full" />
    </div>
  );
}

export default function ParticlesLayer() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <ParticlesProvider init={initParticles}>
      <ParticlesInner />
    </ParticlesProvider>
  );
}
