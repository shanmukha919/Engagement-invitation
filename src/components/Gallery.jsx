import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { Camera, X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

import gallery1 from '../assets/gallery-1.jpg';
import gallery2 from '../assets/gallery-2.jpg';
import gallery3 from '../assets/gallery-3.jpg';
import gallery4 from '../assets/gallery-4.jpg';
import gallery5 from '../assets/gallery-5.jpg';
import gallery6 from '../assets/gallery-6.jpg';

const photos = [
  { src: gallery1, caption: 'Sunset Promise & Stolen Glances' },
  { src: gallery2, caption: 'In Full Bloom — Garden Romance' },
  { src: gallery3, caption: 'Golden Hour & Warm Laughter' },
  { src: gallery4, caption: 'Royal Courtyard & Heritage Elegance' },
  { src: gallery5, caption: 'Walks Along Emerald Lawns' },
  { src: gallery6, caption: 'Under A Canopy of Twinkling Lights' },
];

function Lightbox({ index: initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  const prev = useCallback(() => {
    setZoom(1);
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, []);

  const next = useCallback(() => {
    setZoom(1);
    setCurrent((c) => (c + 1) % photos.length);
  }, []);

  const toggleZoom = useCallback(() => {
    setZoom((z) => (z === 1 ? 2 : 1));
  }, []);

  // Keyboard support
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-sm flex flex-col items-center justify-center"
      onClick={onClose}
    >
      {/* Top controls */}
      <div
        className="absolute top-4 right-4 flex gap-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={toggleZoom}
          className="w-10 h-10 rounded-full glass-pill flex items-center justify-center hover:bg-cream/20 transition-colors"
          aria-label={zoom === 1 ? 'Zoom in' : 'Zoom out'}
        >
          {zoom === 1 ? (
            <ZoomIn className="w-5 h-5 text-cream" />
          ) : (
            <ZoomOut className="w-5 h-5 text-cream" />
          )}
        </button>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full glass-pill flex items-center justify-center hover:bg-cream/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-cream" />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative w-full max-w-sm sm:max-w-md px-12 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '70vh' }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={photos[current].src}
            alt={photos[current].caption}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: zoom }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: 'center', cursor: zoom === 1 ? 'zoom-in' : 'zoom-out' }}
            onClick={toggleZoom}
            className="w-full max-h-[65vh] object-contain rounded-2xl shadow-wedding-lg border border-gold/20"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Nav arrows */}
      <div
        className="absolute inset-y-0 left-2 flex items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full glass-pill flex items-center justify-center hover:bg-cream/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-cream" />
        </button>
      </div>
      <div
        className="absolute inset-y-0 right-2 flex items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={next}
          className="w-10 h-10 rounded-full glass-pill flex items-center justify-center hover:bg-cream/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-cream" />
        </button>
      </div>

      {/* Caption + counter */}
      <div
        className="absolute bottom-6 left-0 right-0 text-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-serif text-sm text-cream/90 italic mb-1">{photos[current].caption}</p>
        <p className="font-sans text-xs text-cream/40">
          {current + 1} / {photos.length}
        </p>
        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => { setZoom(1); setCurrent(i); }}
              className={`rounded-full transition-all ${
                i === current ? 'w-5 h-2 bg-gold' : 'w-2 h-2 bg-cream/30'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section className="py-16 px-5 relative z-20 overflow-hidden">
      <motion.div
        className="max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-serif text-gold-dark mb-3">
          <Camera className="w-3.5 h-3.5 text-gold" />
          <span>Our Journey</span>
        </div>

        <h2 className="font-script text-4xl sm:text-5xl text-olive mb-2">
          {t('gallery.title')}
        </h2>
        <p className="font-serif text-sm text-olive-light mb-8 italic">
          {t('gallery.subtitle')}
        </p>
        <p className="font-sans text-xs text-olive/50 mb-4">Tap any photo to view fullscreen</p>

        {/* Swiper Cards Carousel */}
        <div className="w-[280px] sm:w-[320px] mx-auto py-4">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Autoplay, Pagination]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="w-full h-[400px] sm:h-[440px] rounded-3xl"
          >
            {photos.map((item, idx) => (
              <SwiperSlide key={idx} className="rounded-3xl overflow-hidden shadow-wedding-lg">
                <div
                  className="relative w-full h-full bg-cream card-gold-border p-2.5 flex flex-col justify-between cursor-pointer"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <div className="relative w-full h-[85%] rounded-2xl overflow-hidden bg-cream-dark group">
                    <img
                      src={item.src}
                      alt={item.caption}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="h-[15%] flex items-center justify-center px-2">
                    <p className="font-serif text-xs sm:text-sm text-olive-dark italic truncate">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
