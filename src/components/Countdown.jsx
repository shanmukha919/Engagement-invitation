import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { weddingConfig } from '../data/config';

function CountdownUnit({ value, label, accent }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Flip tile */}
      <div
        className="relative w-[68px] h-[82px] sm:w-20 sm:h-24 rounded-2xl flex items-center justify-center overflow-hidden shadow-md"
        style={{
          background: 'linear-gradient(145deg, #FCFAF5 0%, #F6EEDF 60%, #EDE3CE 100%)',
          border: '1.5px solid rgba(201,166,107,0.5)',
          boxShadow: '0 6px 20px rgba(201,166,107,0.18), 0 2px 6px rgba(0,0,0,0.08)',
        }}
      >
        {/* Horizontal divider line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gold/20 z-10" />

        {/* Shimmer top highlight */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}
        />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -22, opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="relative z-20 font-serif font-bold text-olive-dark"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 2.25rem)', lineHeight: 1 }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Label */}
      <span
        className="font-sans text-[10px] sm:text-xs uppercase tracking-widest font-semibold"
        style={{ color: '#9E7B44' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { t } = useTranslation();
  const { days, hours, minutes, seconds } = useCountdown(weddingConfig.weddingDateTimeISO);

  return (
    <section className="py-14 px-5 relative z-20">
      <motion.div
        className="max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-serif text-gold-dark mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Save The Date</span>
        </div>

        <h2 className="font-script text-4xl sm:text-5xl text-olive mb-2">
          {t('countdown.title')}
        </h2>

        {/* Date pill */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 mb-8">
          <span className="font-serif text-xs sm:text-sm font-bold text-olive-dark">
            December 3, 2026
          </span>
          <span className="text-gold/60">•</span>
          <span className="font-sans text-xs text-gold-dark">MSR Convention, Vijayawada</span>
        </div>

        {/* 4 Countdown Tiles */}
        <div
          className="rounded-3xl px-6 py-7 sm:px-8 sm:py-8 mx-2 shadow-wedding"
          style={{
            background: 'linear-gradient(135deg, rgba(246,238,223,0.9) 0%, rgba(252,250,245,0.95) 50%, rgba(246,238,223,0.9) 100%)',
            border: '1.5px solid rgba(201,166,107,0.4)',
          }}
        >
          <div className="grid grid-cols-4 gap-3 sm:gap-4 justify-center items-center max-w-sm mx-auto">
            <CountdownUnit value={days} label={t('countdown.days')} />
            <CountdownUnit value={hours} label={t('countdown.hours')} />
            <CountdownUnit value={minutes} label={t('countdown.minutes')} />
            <CountdownUnit value={seconds} label={t('countdown.seconds')} />
          </div>

          {/* Colons between units */}
          <div className="sr-only">Days : Hours : Minutes : Seconds</div>

          {/* Footer note */}
          <p className="font-telugu text-xs text-olive-light mt-5 opacity-70">
            ముహూర్తానికి మిగిలిన సమయం
          </p>
        </div>
      </motion.div>
    </section>
  );
}
