import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, Sparkles, HeartHandshake, Camera, Utensils, Clock } from 'lucide-react';
import { weddingConfig } from '../data/config';

const iconMap = {
  Users,
  Sparkles,
  HeartHandshake,
  Camera,
  Utensils,
  Clock,
};

export default function Timeline() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 70%'],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  return (
    <section ref={containerRef} className="py-16 px-5 relative z-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-serif text-gold-dark mb-3">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <span>Schedule</span>
          </div>

          <h2 className="font-script text-4xl sm:text-5xl text-olive mb-2">
            {t('timeline.title')}
          </h2>
          <p className="font-serif text-sm text-olive-light italic">
            {t('timeline.subtitle')}
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative pl-8 sm:pl-10 space-y-8">
          
          {/* Scroll-drawing gold line */}
          <div className="absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-[2px] bg-gold/25">
            <motion.div
              style={{ scaleY: pathLength, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-gold via-gold-light to-gold rounded-full"
            />
          </div>

          {/* Timeline Nodes */}
          {weddingConfig.timeline.map((event, index) => {
            const IconComponent = iconMap[event.icon] || Sparkles;

            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Node icon pill */}
                <div className="absolute -left-[30px] sm:-left-[34px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cream card-gold-border flex items-center justify-center z-10 shadow-sm">
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold fill-gold/20" />
                </div>

                {/* Event Card */}
                <div className="rounded-2xl p-4 sm:p-5 card-gold-border paper-texture shadow-wedding text-left">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-gold/20 text-gold-dark font-sans text-xs font-bold tracking-wider mb-1.5">
                    {event.time}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-olive-dark">
                    {event.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-olive-light/90 leading-relaxed mt-1">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
