import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function TeluguWelcomeBanner() {
  return (
    <section className="py-14 px-5 relative z-20 overflow-hidden">
      {/* Soft background gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(201,166,107,0.18) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="max-w-md mx-auto"
      >
        <div
          className="relative rounded-3xl p-7 sm:p-9 text-center overflow-hidden shadow-wedding-lg"
          style={{
            background: 'linear-gradient(135deg, #2A3323 0%, #3F4A35 50%, #2A3323 100%)',
            border: '1.5px solid rgba(201,166,107,0.5)',
          }}
        >
          {/* Corner ornaments */}
          <span className="absolute top-4 left-4 text-gold/60 text-xl select-none">❋</span>
          <span className="absolute top-4 right-4 text-gold/60 text-xl select-none">❋</span>
          <span className="absolute bottom-4 left-4 text-gold/60 text-xl select-none">❋</span>
          <span className="absolute bottom-4 right-4 text-gold/60 text-xl select-none">❋</span>

          {/* Top gold line */}
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-5" />

          {/* Sacred invocation */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-telugu text-xs text-gold/70 font-semibold tracking-wider mb-4"
          >
            శ్రీరస్తు - శుభమస్తు - అవిఘ్నమస్తు
          </motion.p>

          {/* Heart row */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold/50" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-5 h-5 text-gold fill-gold" />
            </motion.div>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          {/* Telugu main message */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-telugu text-xl sm:text-2xl font-bold text-cream leading-relaxed mb-3"
          >
            మా ఇంటి ఆనంద వేడుకకు మీకు హృదయపూర్వక స్వాగతం ❤️
          </motion.p>

          {/* Divider */}
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto my-5" />

          {/* English message */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-serif text-sm sm:text-base font-semibold text-cream/90 italic mb-2"
          >
            "With Love &amp; Blessings – From Our Family"
          </motion.p>

          {/* Family name */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-sans text-xs uppercase tracking-widest text-gold font-semibold mt-3"
          >
            Sri Potturi Sudhakara Rao &amp; Smt. Lakshmi Sundari
          </motion.p>

          {/* Bottom gold line */}
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-5" />

          {/* Animated sparkles */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: `${20 + i * 30}%`, left: `${5 + i * 5}%` }}
              animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.7,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Sparkles className="w-3 h-3 text-gold" />
            </motion.div>
          ))}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`r${i}`}
              className="absolute"
              style={{ top: `${20 + i * 30}%`, right: `${5 + i * 5}%` }}
              animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
              transition={{
                duration: 2,
                delay: 1 + i * 0.7,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Sparkles className="w-3 h-3 text-gold" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
