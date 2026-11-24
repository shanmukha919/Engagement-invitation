import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Gem, Music, Sun, Sparkles, Shirt, Bus, Building, Calendar, MapPin, Clock } from 'lucide-react';
import { weddingConfig } from '../data/config';

const iconMap = {
  Gem,
  Music,
  Sun,
  Sparkles,
};

function EventCard({ item }) {
  const IconComponent = iconMap[item.icon] || Sparkles;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="min-w-[280px] sm:min-w-[320px] rounded-3xl p-6 card-gold-border paper-texture shadow-wedding flex flex-col justify-between text-left select-none snap-center"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-2xl bg-gold/15 flex items-center justify-center text-gold">
            <IconComponent className="w-5 h-5 text-gold" />
          </div>
          <span className="text-[11px] font-sans uppercase tracking-wider text-gold-dark font-semibold px-2.5 py-1 rounded-full bg-cream-dark/60">
            {item.date}
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold text-olive-dark mb-1">
          {item.name}
        </h3>

        <div className="space-y-1.5 text-xs text-olive-light my-3">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>{item.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="truncate">{item.venue}</span>
          </div>
        </div>

        <p className="font-sans text-xs text-olive/80 leading-relaxed mb-4">
          {item.description}
        </p>
      </div>

      {/* Dress code & color palette chips */}
      <div className="pt-3 border-t border-gold/25">
        <div className="flex items-center justify-between text-[11px] font-serif text-olive-dark mb-1.5">
          <span className="font-semibold">Attire: {item.dressCode}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {item.palette.map((color, cIdx) => (
            <span
              key={cIdx}
              className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PreWeddingEvents() {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-5 relative z-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-serif text-gold-dark mb-3">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Celebrations</span>
          </div>
          <h2 className="font-script text-4xl sm:text-5xl text-olive mb-2">
            {t('events.title')}
          </h2>
        </div>

        {/* Horizontal Swipeable Event Cards */}
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory no-scrollbar -mx-5 px-5">
          {weddingConfig.celebrations.map((item, index) => (
            <EventCard key={index} item={item} />
          ))}
        </div>

        {/* Extra Experience Sections from the video (Dress Code, Transportation, Accommodation) */}
        <div className="mt-12 space-y-4">
          {/* Dress Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-6 card-gold-border paper-texture shadow-wedding text-left"
          >
            <div className="flex items-center gap-2.5 text-gold mb-3">
              <Shirt className="w-5 h-5 text-gold" />
              <h3 className="font-serif text-xl font-bold text-olive-dark">
                {t('info.dressCodeTitle')}
              </h3>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-olive/85 leading-relaxed">
              <p>
                <strong className="text-olive-dark">{t('info.women')}:</strong>{' '}
                {weddingConfig.guestInfo.dressCode.women}
              </p>
              <p>
                <strong className="text-olive-dark">{t('info.men')}:</strong>{' '}
                {weddingConfig.guestInfo.dressCode.men}
              </p>
            </div>
          </motion.div>

          {/* Transportation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-6 card-gold-border paper-texture shadow-wedding text-left"
          >
            <div className="flex items-center gap-2.5 text-gold mb-3">
              <Bus className="w-5 h-5 text-gold" />
              <h3 className="font-serif text-xl font-bold text-olive-dark">
                {t('info.transportationTitle')}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-olive/85 leading-relaxed">
              {weddingConfig.guestInfo.transportation}
            </p>
          </motion.div>

          {/* Accommodation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-6 card-gold-border paper-texture shadow-wedding text-left"
          >
            <div className="flex items-center gap-2.5 text-gold mb-3">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="font-serif text-xl font-bold text-olive-dark">
                {t('info.accommodationTitle')}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-olive/85 leading-relaxed">
              {weddingConfig.guestInfo.accommodation}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
