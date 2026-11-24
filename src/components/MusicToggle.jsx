import React from 'react';
import { motion } from 'framer-motion';

export default function MusicToggle({ isMuted, toggleMusic }) {
  return (
    <motion.button
      type="button"
      onClick={toggleMusic}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-5 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-pill flex items-center justify-center shadow-lg transition-colors border border-gold/40 hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      aria-label={isMuted ? 'Play Music' : 'Mute Music'}
    >
      {isMuted ? (
        /* Muted: static icon with X */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-olive/60">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        /* Playing: animated waveform bars */
        <div className="flex items-end gap-[3px] h-5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block w-[3px] rounded-full bg-gold"
              animate={{ height: ['6px', '16px', '8px', '14px', '6px'] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
              style={{ minHeight: 4 }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}
