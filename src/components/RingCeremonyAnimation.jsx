import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function RingCeremonyAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [heartsVisible, setHeartsVisible] = useState(false);

  return (
    <section
      ref={ref}
      className="py-16 px-5 relative z-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F6EEDF 0%, #FFF8F0 40%, #F6EEDF 100%)',
      }}
    >
      {/* Soft radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,166,107,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Decorative corner florals */}
      <div className="absolute top-4 left-4 text-3xl opacity-20 select-none pointer-events-none">🌸</div>
      <div className="absolute top-4 right-4 text-3xl opacity-20 select-none pointer-events-none rotate-90">🌸</div>
      <div className="absolute bottom-4 left-4 text-3xl opacity-20 select-none pointer-events-none -rotate-90">🌸</div>
      <div className="absolute bottom-4 right-4 text-3xl opacity-20 select-none pointer-events-none rotate-180">🌸</div>

      <div className="max-w-md mx-auto text-center">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-serif text-gold-dark mb-3"
        >
          <span>💍</span>
          <span>Ring Ceremony</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-script text-4xl sm:text-5xl text-olive mb-1"
        >
          Nischaya Thamboolalu
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-telugu text-sm text-olive-light mb-10 italic"
        >
          నిశ్చయ తాంబూలాలు &amp; ఉంగరాల మార్పిడి
        </motion.p>

        {/* ═══ Ring Animation Scene ═══ */}
        <div className="relative flex items-center justify-center h-56 sm:h-64 mb-10">

          {/* Left Ring */}
          <motion.div
            initial={{ x: -130, opacity: 0, rotate: -25 }}
            animate={isInView ? { x: -40, opacity: 1, rotate: -15 } : {}}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            onAnimationComplete={() => setHeartsVisible(true)}
            className="relative z-10"
            style={{ filter: 'drop-shadow(0 12px 28px rgba(201,166,107,0.6))' }}
          >
            <PremiumRingSVG flip={false} />
            {/* Left ring sparkle */}
            {heartsVisible && (
              <motion.span
                className="absolute -top-4 right-0 text-lg"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5], rotate: [0, 20, -20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
              >
                ✨
              </motion.span>
            )}
          </motion.div>

          {/* ═══ CENTER BEATING RED HEART ═══ */}
          <div className="absolute z-20 flex items-center justify-center">
            {/* Outer glow rings */}
            {heartsVisible && (
              <>
                <motion.div
                  className="absolute rounded-full border border-red-300/30"
                  animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                  style={{ width: 60, height: 60 }}
                />
                <motion.div
                  className="absolute rounded-full border border-red-400/20"
                  animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.2 }}
                  style={{ width: 60, height: 60 }}
                />
              </>
            )}

            {/* White circle background */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={heartsVisible ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: 'backOut' }}
              className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, #ffffff 0%, #fff5f5 100%)',
                boxShadow: '0 0 0 3px rgba(239,68,68,0.2), 0 8px 24px rgba(239,68,68,0.3)',
              }}
            >
              {/* BEATING RED HEART */}
              <motion.span
                animate={heartsVisible ? {
                  scale: [1, 1.35, 0.95, 1.2, 1],
                } : {}}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
                style={{ display: 'inline-block', fontSize: 32, lineHeight: 1 }}
              >
                ❤️
              </motion.span>
            </motion.div>
          </div>

          {/* Right Ring */}
          <motion.div
            initial={{ x: 130, opacity: 0, rotate: 25 }}
            animate={isInView ? { x: 40, opacity: 1, rotate: 15 } : {}}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10"
            style={{ filter: 'drop-shadow(0 12px 28px rgba(201,166,107,0.6))' }}
          >
            <PremiumRingSVG flip={true} />
            {/* Right ring sparkle */}
            {heartsVisible && (
              <motion.span
                className="absolute -top-4 left-0 text-lg"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5], rotate: [0, -20, 20, 0] }}
                transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
              >
                ✨
              </motion.span>
            )}
          </motion.div>

          {/* Floating mini hearts that rise up */}
          {heartsVisible &&
            [0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                className="absolute text-sm pointer-events-none select-none"
                style={{ bottom: '20%', left: `${22 + i * 14}%`, fontSize: 10 + i * 2 }}
                animate={{ opacity: [0, 0.8, 0], y: [0, -(50 + i * 15)] }}
                transition={{
                  duration: 1.8,
                  delay: i * 0.35,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: 'easeOut',
                }}
              >
                🌸
              </motion.span>
            ))}
        </div>

        {/* ═══ Message Card ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={heartsVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-3 rounded-3xl px-6 py-6 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2A3323 0%, #3F4A35 100%)',
            border: '1.5px solid rgba(201,166,107,0.5)',
            boxShadow: '0 20px 50px rgba(42,51,35,0.25)',
          }}
        >
          {/* Corner ornaments */}
          <span className="absolute top-3 left-3 text-gold/50 text-base select-none">❋</span>
          <span className="absolute top-3 right-3 text-gold/50 text-base select-none">❋</span>
          <span className="absolute bottom-3 left-3 text-gold/50 text-base select-none">❋</span>
          <span className="absolute bottom-3 right-3 text-gold/50 text-base select-none">❋</span>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />

          <p className="font-script text-2xl sm:text-3xl text-cream mb-2">
            Two Hearts, One Beautiful Journey
          </p>

          <p className="font-telugu text-sm text-cream/70 leading-relaxed mb-4">
            రెండు హృదయాలు, ఒక అందమైన ప్రయాణం
          </p>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-3" />

          <p className="font-serif text-xs text-gold uppercase tracking-widest font-semibold">
            Yamini &amp; Srikar • December 3, 2026
          </p>
        </motion.div>

        {/* Animated floral row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          {['🌸', '✨', '💍', '✨', '🌸'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, delay: i * 0.25, repeat: Infinity, ease: 'easeInOut' }}
              className="text-base opacity-50 select-none"
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* Premium 3D-style ring SVG */
function PremiumRingSVG({ flip = false }) {
  const size = 100;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <defs>
        <linearGradient id={`ringG${flip ? 'R' : 'L'}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="20%" stopColor="#F0D898" />
          <stop offset="45%" stopColor="#C9A66B" />
          <stop offset="70%" stopColor="#A07840" />
          <stop offset="85%" stopColor="#C9A66B" />
          <stop offset="100%" stopColor="#F0D898" />
        </linearGradient>
        <linearGradient id={`shineG${flip ? 'R' : 'L'}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id={`diamG${flip ? 'R' : 'L'}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#D6EFFF" />
          <stop offset="70%" stopColor="#A8D8F0" />
          <stop offset="100%" stopColor="#7EC8E3" />
        </linearGradient>
        <filter id={`glow${flip ? 'R' : 'L'}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer shadow ring for depth */}
      <circle cx="50" cy="52" r="34" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="20" />

      {/* Main ring band */}
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke={`url(#ringG${flip ? 'R' : 'L'})`}
        strokeWidth="18"
      />

      {/* Top shine arc */}
      <path
        d={describeArc(50, 50, 34, 195, 315)}
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Diamond setting base */}
      <circle cx="50" cy="16" r="8" fill="#E8C87A" stroke="#9E7B44" strokeWidth="1.2" />

      {/* Diamond gem */}
      <polygon
        points="50,8 44,14 50,20 56,14"
        fill={`url(#diamG${flip ? 'R' : 'L'})`}
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="0.5"
        filter={`url(#glow${flip ? 'R' : 'L'})`}
      />
      {/* Diamond facet lines for realism */}
      <line x1="50" y1="8" x2="50" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      <line x1="44" y1="14" x2="56" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />

      {/* Bottom inner shadow for 3D depth */}
      <path
        d={describeArc(50, 50, 34, 30, 150)}
        fill="none"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function describeArc(x, y, r, startAngle, endAngle) {
  const s = polarToCartesian(x, y, r, endAngle);
  const e = polarToCartesian(x, y, r, startAngle);
  return `M ${s.x} ${s.y} A ${r} ${r} 0 0 0 ${e.x} ${e.y}`;
}
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
