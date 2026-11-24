import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-5 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-pill flex items-center justify-center shadow-lg border border-gold/40 hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold group transition-all"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 text-olive group-hover:text-gold transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
