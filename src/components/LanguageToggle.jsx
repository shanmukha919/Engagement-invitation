import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
];

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('wedding_invite_lang', code);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-5 z-40">
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-pill flex items-center justify-center text-olive hover:text-gold shadow-lg transition-colors border border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Change Language"
      >
        <Languages className="w-5 h-5 text-olive" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 left-0 mb-2 w-36 rounded-2xl glass-pill bg-cream/95 p-1.5 shadow-2xl border border-gold/50 flex flex-col gap-1"
          >
            {languages.map((lang) => {
              const active = i18n.language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full px-3 py-2 rounded-xl text-left text-xs font-serif flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-gold/25 font-semibold text-olive-dark'
                      : 'hover:bg-cream-dark/40 text-olive'
                  }`}
                >
                  <span>{lang.native}</span>
                  {active && <Check className="w-3.5 h-3.5 text-gold" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
