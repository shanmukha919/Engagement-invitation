import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import floralTL from '../assets/floral-tl.png';
import { weddingConfig } from '../data/config';

export default function Welcome() {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section id="welcome-section" className="py-16 px-5 relative z-20">
      <motion.div
        className="max-w-md mx-auto relative rounded-3xl p-8 sm:p-10 card-gold-border paper-texture shadow-wedding text-center overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Subtle sliding floral garland header */}
        <motion.div
          className="absolute -top-10 -right-10 w-28 h-28 pointer-events-none opacity-40"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img src={floralTL} alt="Garland" className="w-full h-full object-contain rotate-90" />
        </motion.div>

        {/* Section script heading */}
        <h2 className="font-script text-4xl sm:text-5xl text-olive mb-3">
          {t('welcome.title')}
        </h2>

        {/* Triple scaling hearts divider */}
        <div className="flex items-center justify-center gap-2 my-5">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Heart className="w-3.5 h-3.5 text-gold fill-gold/40" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <Heart className="w-5 h-5 text-gold fill-gold" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Heart className="w-3.5 h-3.5 text-gold fill-gold/40" />
          </motion.div>
        </div>

        {/* Welcome message text revealing line by line */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-olive/90"
        >
          <motion.p variants={item} className="italic">
            "{t('welcome.message')}"
          </motion.p>
          <motion.p variants={item} className="text-xs sm:text-sm font-sans uppercase tracking-widest text-gold-dark font-medium pt-2">
            — {weddingConfig.groom.fullName} &amp; {weddingConfig.bride.fullName}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
