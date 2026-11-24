import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const PETAL_COUNT = 30;
const HEART_COUNT = 12;
const SPARKLE_COUNT = 18;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function Petal({ id }) {
  const left = randomBetween(2, 98);
  const duration = randomBetween(3.5, 7);
  const delay = randomBetween(0, 2.5);
  const sway = randomBetween(-45, 45);
  const size = randomBetween(14, 24);

  return (
    <span
      className="petal-fall"
      style={{
        left: `${left}%`,
        fontSize: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        '--sway': `${sway}px`,
      }}
    >
      🌸
    </span>
  );
}

function FloatingHeart({ id }) {
  const left = randomBetween(10, 90);
  const bottom = randomBetween(5, 35);
  const duration = randomBetween(2, 3.5);
  const delay = randomBetween(0, 2);

  return (
    <span
      className="heart-float"
      style={{
        left: `${left}%`,
        bottom: `${bottom}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        fontSize: `${randomBetween(12, 22)}px`,
      }}
    >
      ❤️
    </span>
  );
}

function GoldenSparkle({ id }) {
  const left = randomBetween(2, 96);
  const top = randomBetween(5, 90);
  const duration = randomBetween(0.6, 1.4);
  const delay = randomBetween(0, 2);

  return (
    <span
      className="sparkle-pop"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      ✨
    </span>
  );
}

export default function FlowerShower() {
  const [active, setActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [petals] = useState(() => Array.from({ length: PETAL_COUNT }, (_, i) => i));
  const [hearts] = useState(() => Array.from({ length: HEART_COUNT }, (_, i) => i));
  const [sparkles] = useState(() => Array.from({ length: SPARKLE_COUNT }, (_, i) => i));
  const timerRef = useRef(null);

  const handleBlessings = useCallback(() => {
    if (active) return;
    setActive(true);
    setShowToast(true);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActive(false);
      setShowToast(false);
    }, 7000);
  }, [active]);

  return (
    <>
      {/* Fixed Floating Blessing Button */}
      <motion.button
        onClick={handleBlessings}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-24 right-5 z-40 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-white font-serif text-xs font-semibold tracking-wide focus:outline-none select-none"
        aria-label="Send Your Blessings"
        style={{
          background: 'linear-gradient(135deg, #DFC493 0%, #C9A66B 50%, #9E7B44 100%)',
          boxShadow: '0 4px 20px rgba(201,166,107,0.65)',
          border: '1px solid rgba(201,166,107,0.4)',
        }}
      >
        <Heart className="w-3.5 h-3.5 fill-white/80" />
        <span>Send Blessings ❤️</span>
      </motion.button>

      {/* Animation overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          >
            {petals.map((id) => <Petal key={`p${id}`} id={id} />)}
            {hearts.map((id) => <FloatingHeart key={`h${id}`} id={id} />)}
            {sparkles.map((id) => <GoldenSparkle key={`s${id}`} id={id} />)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="fixed bottom-40 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-sm pointer-events-none"
          >
            <div className="rounded-2xl px-5 py-4 text-center shadow-wedding-lg glass-pill border border-gold/60 bg-cream/95 backdrop-blur-md">
              <div className="flex items-center justify-center gap-1 mb-1.5">
                <Sparkles className="w-4 h-4 text-gold" />
                <Sparkles className="w-5 h-5 text-gold" />
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <p className="font-serif text-sm font-bold text-olive-dark leading-snug">
                Your blessings make their journey more beautiful!
              </p>
              <p className="font-telugu text-xs text-olive-light mt-1.5 leading-relaxed">
                మీ ఆశీర్వాదాలు వారి జీవితాన్ని మరింత అందంగా చేస్తాయి! 🌸
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
