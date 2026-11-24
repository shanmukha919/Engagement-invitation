import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Heart, Calendar, MapPin, Sparkles } from 'lucide-react';
import floralTL from '../assets/floral-tl.png';
import floralBR from '../assets/floral-br.png';
import { weddingConfig } from '../data/config';
import ParticlesLayer from './ParticlesLayer';

export default function Hero({ guestName }) {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isTelugu = i18n.language === 'te';

  // Container variants with stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between pt-20 pb-10 px-4 sm:px-6 text-center overflow-hidden">
      {/* Falling Golden Petals & Sparkles Layer */}
      <ParticlesLayer />

      {/* Drifting Floral Corners */}
      <motion.img
        src={floralTL}
        alt="Floral Corner"
        className="absolute top-0 left-0 w-32 sm:w-40 h-auto pointer-events-none z-15 opacity-75"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-3, 3, -3],
                y: [-3, 3, -3],
                transition: { repeat: Infinity, duration: 7, ease: 'easeInOut' },
              }
        }
      />
      <motion.img
        src={floralBR}
        alt="Floral Corner"
        className="absolute bottom-12 right-0 w-32 sm:w-40 h-auto pointer-events-none z-15 opacity-75"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [3, -3, 3],
                y: [3, -3, 3],
                transition: { repeat: Infinity, duration: 7, ease: 'easeInOut' },
              }
        }
      />

      {/* Main High-Contrast Luxury Parchment Card */}
      <motion.div
        className="relative z-20 w-full max-w-[420px] mx-auto my-auto rounded-3xl p-6 sm:p-7 bg-[#FCFAF5]/94 backdrop-blur-md border border-[#C9A66B]/70 shadow-[0_16px_45px_rgba(35,45,25,0.16)] flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sacred Traditional Invocation */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mb-2 text-gold-dark"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="font-telugu text-xs sm:text-sm font-semibold tracking-wider text-[#6B5322]">
            {weddingConfig.sacredInvocation}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold" />
        </motion.div>

        {/* Personalized Guest Greeting if guestName exists */}
        {guestName && (
          <motion.div
            variants={itemVariants}
            className="mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-xs font-serif tracking-wider text-olive-dark font-medium shadow-sm"
          >
            <Heart className="w-3 h-3 text-gold fill-gold" />
            <span>
              {t('hero.dear')} <strong className="font-bold text-[#1F2B16]">{guestName}</strong>
            </span>
          </motion.div>
        )}

        {/* Family Heading & Ceremony Subtitle */}
        <motion.div variants={itemVariants} className="mb-4">
          <p className="font-telugu text-sm font-bold text-[#3B482D] tracking-wide">
            {weddingConfig.familyHeading}
          </p>
          <p className="font-serif uppercase tracking-[0.22em] text-xs sm:text-sm text-[#5C6D48] font-bold mt-0.5">
            {isTelugu ? weddingConfig.ceremonyTypeTelugu : t('hero.weAreGettingMarried')}
          </p>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2" />
        </motion.div>

        {/* ═══ GROOM SECTION ═══ */}
        <motion.div variants={itemVariants} className="w-full">
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-script text-5xl sm:text-6xl text-[#1E2916] font-bold leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
              {weddingConfig.groom.firstName}
            </h1>
          </div>
          <p className="font-telugu text-sm font-semibold text-[#3A492C] mt-0.5">
            {weddingConfig.groom.teluguName}
          </p>
          <p className="font-sans text-xs sm:text-sm font-medium text-[#2F3D23] mt-1 leading-snug">
            {isTelugu ? weddingConfig.groom.parentsTelugu : weddingConfig.groom.parents}
          </p>
          <p className="font-sans text-[11px] font-semibold text-[#485A35]">
            {isTelugu ? weddingConfig.groom.hometownTelugu : weddingConfig.groom.hometown}
          </p>
          <p className="font-sans text-xs uppercase tracking-wider text-[#8A6728] font-bold mt-0.5">
            {weddingConfig.groom.qualifications} ({weddingConfig.groom.university})
          </p>
        </motion.div>

        {/* ═══ ORNATE GOLD AMPERSAND ═══ */}
        <motion.div
          variants={itemVariants}
          className="my-3 text-gold font-script text-3xl sm:text-4xl flex items-center justify-center gap-3 w-full"
        >
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold" />
          <span className="font-serif text-2xl font-bold italic text-[#C9A66B] px-1">&</span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        {/* ═══ BRIDE SECTION ═══ */}
        <motion.div variants={itemVariants} className="w-full">
          <div className="flex items-center justify-center gap-2">
            <h2 className="font-script text-5xl sm:text-6xl text-[#1E2916] font-bold leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
              {weddingConfig.bride.firstName}
            </h2>
          </div>
          <p className="font-telugu text-sm font-semibold text-[#3A492C] mt-0.5">
            {weddingConfig.bride.teluguName}
          </p>
          <p className="font-sans text-xs sm:text-sm font-medium text-[#2F3D23] mt-1 leading-snug">
            {isTelugu ? weddingConfig.bride.parentsTelugu : weddingConfig.bride.parents}
          </p>
          <p className="font-sans text-xs uppercase tracking-wider text-[#8A6728] font-bold mt-0.5">
            {weddingConfig.bride.qualifications} ({weddingConfig.bride.university})
          </p>
        </motion.div>

        {/* ═══ AUSPICIOUS DATE, MUHURTHAM & VENUE BOX ═══ */}
        <motion.div
          variants={itemVariants}
          className="mt-5 pt-4 border-t border-gold/40 w-full flex flex-col items-center bg-[#F4EEDF]/75 rounded-2xl p-3.5 border border-gold/30 shadow-inner"
        >
          <div className="flex items-center gap-1.5 text-[#8A6728] mb-1">
            <Calendar className="w-4 h-4 text-gold" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider">
              {isTelugu ? 'తాంబూలాల శుభలగ్నం' : 'Auspicious Muhurtham'}
            </span>
          </div>

          <p className="font-serif text-base sm:text-lg font-bold text-[#1E2916]">
            {isTelugu ? weddingConfig.displayDateTelugu : weddingConfig.displayDate}
          </p>
          <p className="font-sans text-xs sm:text-sm font-bold text-[#7A5B20] mt-0.5">
            {isTelugu ? weddingConfig.muhurthamTelugu : weddingConfig.muhurtham}
          </p>
          <p className="font-sans text-xs font-semibold text-[#3D4D2E] mt-0.5">
            {isTelugu ? weddingConfig.lunchFeastTelugu : `Banquet Feast: ${weddingConfig.lunchFeast}`}
          </p>

          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gold/25 text-xs text-[#2A371F] font-semibold">
            <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>
              {isTelugu ? weddingConfig.venue.nameTelugu : weddingConfig.venue.name} • {weddingConfig.city}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bouncing Chevron CTA at bottom */}
      <motion.div
        className="relative z-20 flex flex-col items-center gap-1 cursor-pointer opacity-80 hover:opacity-100 transition-opacity mt-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        onClick={() => {
          const el = document.getElementById('welcome-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="font-sans text-[11px] uppercase tracking-widest text-[#2F3D23] font-bold">
          {t('hero.scrollDown')}
        </span>
        <ChevronDown className="w-4 h-4 text-gold stroke-[2.5]" />
      </motion.div>
    </section>
  );
}
