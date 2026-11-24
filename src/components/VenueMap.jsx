import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { weddingConfig } from '../data/config';

// Custom Gold Pin Leaflet Icon
const customGoldPin = L.divIcon({
  className: 'custom-gold-marker',
  html: `
    <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">
      <svg width="36" height="42" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.5 12 28 12 28C12 28 24 18.5 24 12C24 5.37258 18.6274 0 12 0Z" fill="#C9A66B"/>
        <circle cx="12" cy="11" r="5" fill="#F6EEDF"/>
      </svg>
    </div>
  `,
  iconSize: [40, 42],
  iconAnchor: [20, 42],
  popupAnchor: [0, -38],
});

export default function VenueMap() {
  const { t } = useTranslation();
  const [showHint, setShowHint] = useState(true);
  const position = weddingConfig.venue.coordinates;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-5 relative z-20">
      <div className="max-w-md mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-serif text-gold-dark mb-3">
          <MapPin className="w-3.5 h-3.5 text-gold" />
          <span>Location</span>
        </div>

        <h2 className="font-script text-4xl sm:text-5xl text-olive mb-2">
          {t('venue.title')}
        </h2>
        <h3 className="font-serif text-xl font-bold text-olive-dark">
          {weddingConfig.venue.name}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-olive-light/90 max-w-xs mx-auto mt-1 mb-6">
          {weddingConfig.venue.address}
        </p>

        {/* Map Container */}
        <div className="relative w-full h-[320px] rounded-3xl overflow-hidden card-gold-border shadow-wedding">
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            touchZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customGoldPin}>
              <Popup>
                <div className="p-1 text-center font-serif">
                  <strong className="text-olive-dark block font-bold text-sm">
                    {weddingConfig.venue.name}
                  </strong>
                  <span className="text-xs text-olive-light">
                    {weddingConfig.venue.address}
                  </span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>

          {/* Map Gesture Hint Overlay */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-[500] pointer-events-none flex items-center justify-center p-4"
              >
                <div className="px-4 py-2 rounded-full glass-pill bg-cream/90 text-olive-dark text-xs font-sans font-medium flex items-center gap-2 shadow-lg">
                  <span>{t('venue.mapHint')}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Direction action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={weddingConfig.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gold hover:bg-gold-dark text-white font-serif text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{t('venue.openGoogleMaps')}</span>
          </a>

          <a
            href={weddingConfig.venue.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full glass-pill hover:bg-cream-dark/50 text-olive font-serif text-sm tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Navigation className="w-4 h-4 text-gold" />
            <span>{t('venue.getDirections')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
