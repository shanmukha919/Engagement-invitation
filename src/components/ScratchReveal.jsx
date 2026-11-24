import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { Calendar, Download, Sparkles, Heart } from 'lucide-react';
import { useScratch } from '../hooks/useScratch';
import { weddingConfig } from '../data/config';
import { generateIcsFile, getGoogleCalendarUrl } from '../lib/ics';

export default function ScratchReveal({ onChime }) {
  const { t, i18n } = useTranslation();
  const isTelugu = i18n.language === 'te';
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  const fireConfetti = () => {
    // Canvas confetti burst from center with gold, blush, cream
    const count = 70;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#C9A66B', '#E8C9C0', '#F6EEDF', '#8A9A7B', '#FFFFFF'],
      disableForReducedMotion: true,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 45 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 40 });
  };

  const handleComplete = () => {
    setRevealed(true);
    if (onChime) onChime();
    fireConfetti();
  };

  const { scratch, percentScratched } = useScratch({
    canvasRef,
    onComplete: handleComplete,
    threshold: 55,
    brushRadius: 30,
    glitterSrc: '/glitter.png',
  });

  // Handle pointer down / move for mouse and touch
  const handlePointerMove = (e) => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);

    if (clientX !== undefined && clientY !== undefined) {
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;
      scratch(x, y);
    }
  };

  return (
    <section className="py-16 px-5 relative z-20">
      <div className="max-w-md mx-auto text-center">
        {/* Section Title */}
        <h2 className="font-script text-4xl sm:text-5xl text-olive mb-2">
          {t('scratch.title')}
        </h2>
        <p className="font-serif text-sm sm:text-base text-olive-light mb-8 max-w-xs mx-auto">
          {revealed ? '✨ The auspicious date has been revealed!' : t('scratch.instructions')}
        </p>

        {/* Scratch Card Container */}
        <div className="relative mx-auto w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-3xl p-4 card-gold-border paper-texture shadow-wedding flex items-center justify-center overflow-hidden">
          
          {/* UNDERNEATH: The Sacred Date & Time Reveal */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-olive select-none pointer-events-none text-center">
            <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-1.5">
              <Sparkles className="w-4 h-4 fill-gold text-gold" />
            </span>
            <p className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-gold-dark font-bold">
              {isTelugu ? 'శుభ ముహూర్తం' : 'Save The Sacred Date'}
            </p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-olive-dark my-1 leading-tight">
              {isTelugu ? weddingConfig.displayDateTelugu : 'Dec 03, 2026'}
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#7A5B20] font-bold">
              {isTelugu ? weddingConfig.muhurthamTelugu : weddingConfig.muhurtham}
            </p>
            <p className="font-sans text-[11px] text-[#3D4D2E] font-medium mt-0.5">
              {isTelugu ? weddingConfig.lunchFeastTelugu : `Banquet: ${weddingConfig.lunchFeast}`}
            </p>
            <div className="mt-2 pt-2 border-t border-gold/30 flex items-center justify-center gap-1.5 text-xs font-sans text-olive-light font-semibold">
              <Heart className="w-3 h-3 text-gold fill-gold" />
              <span>{isTelugu ? weddingConfig.venue.nameTelugu : weddingConfig.venue.name} • Vijayawada</span>
            </div>
          </div>

          {/* OVERLAY: Glitter Canvas (Scratchable) */}
          <canvas
            ref={canvasRef}
            width={320}
            height={320}
            onPointerDown={handlePointerMove}
            onPointerMove={handlePointerMove}
            onTouchStart={handlePointerMove}
            onTouchMove={handlePointerMove}
            className={`relative z-10 w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
              revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{ touchAction: 'none' }}
          />

          {/* Scratch Progress indicator ring or badge if scratching in progress */}
          {!revealed && percentScratched > 0 && (
            <div className="absolute bottom-3 z-20 px-3 py-1 rounded-full bg-olive-dark/80 text-cream text-[11px] font-sans tracking-wider backdrop-blur-sm pointer-events-none">
              {percentScratched}% Scratched
            </div>
          )}
        </div>

        {/* Action Buttons: revealed state */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gold hover:bg-gold-dark text-white font-serif text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('scratch.addToGoogle')}</span>
              </a>

              <button
                type="button"
                onClick={generateIcsFile}
                className="w-full sm:w-auto px-6 py-3 rounded-full glass-pill hover:bg-cream-dark/50 text-olive font-serif text-sm tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <Download className="w-4 h-4 text-gold" />
                <span>{t('scratch.downloadIcs')}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
