import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { CheckCircle2, Send, Share2, Heart, AlertCircle } from 'lucide-react';
import { submitRsvp } from '../lib/supabase';
import { weddingConfig } from '../data/config';

const rsvpSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name' }),
  phone: z.string().min(6, { message: 'Please enter a valid phone number' }),
  attending: z.enum(['yes', 'no'], { required_error: 'Please let us know if you can attend' }),
  guestCount: z.coerce.number().min(1, { message: 'At least 1 guest' }).max(10, { message: 'Maximum 10 guests' }),
  message: z.string().optional(),
});

export default function RSVPForm({ defaultGuestName, guestSlug }) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: defaultGuestName || '',
      phone: '',
      attending: 'yes',
      guestCount: 1,
      message: '',
    },
  });

  const attendingValue = watch('attending');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await submitRsvp({
        ...data,
        guestSlug,
      });

      if (res.success) {
        setIsSubmitted(true);
        // Confetti burst for RSVP celebration
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#C9A66B', '#8A9A7B', '#E8C9C0', '#F6EEDF'],
        });
      } else {
        setErrorMessage('Could not record RSVP. Please try again.');
      }
    } catch (err) {
      console.error('RSVP submission error:', err);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareWhatsApp = () => {
    const inviteLink = window.location.href;
    const text = encodeURIComponent(
      `${weddingConfig.whatsappShareText}\n${inviteLink}\n${weddingConfig.hashtag}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section className="py-16 px-5 relative z-20">
      <div className="max-w-md mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-serif text-gold-dark mb-3">
          <Heart className="w-3.5 h-3.5 text-gold fill-gold/20" />
          <span>Confirm Attendance</span>
        </div>

        <h2 className="font-script text-4xl sm:text-5xl text-olive mb-2">
          {t('rsvp.title')}
        </h2>
        <p className="font-serif text-xs sm:text-sm text-olive-light mb-8 italic">
          {t('rsvp.subtitle')}
        </p>

        <div className="rounded-3xl p-6 sm:p-8 card-gold-border paper-texture shadow-wedding text-left">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block font-serif text-xs uppercase tracking-wider text-olive-dark font-semibold mb-1.5">
                    {t('rsvp.name')} *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-2xl bg-cream/70 border text-sm text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
                      errors.name ? 'border-red-400 animate-shake' : 'border-gold/40'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-serif text-xs uppercase tracking-wider text-olive-dark font-semibold mb-1.5">
                    {t('rsvp.phone')} *
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 rounded-2xl bg-cream/70 border text-sm text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
                      errors.phone ? 'border-red-400 animate-shake' : 'border-gold/40'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Attending Toggle */}
                <div>
                  <label className="block font-serif text-xs uppercase tracking-wider text-olive-dark font-semibold mb-2">
                    {t('rsvp.attending')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`px-4 py-2.5 rounded-2xl border text-center cursor-pointer transition-all flex items-center justify-center gap-1.5 text-xs font-serif ${
                        attendingValue === 'yes'
                          ? 'bg-gold/25 border-gold font-bold text-olive-dark shadow-sm'
                          : 'bg-cream/50 border-gold/30 text-olive-light hover:bg-cream/80'
                      }`}
                    >
                      <input
                        type="radio"
                        value="yes"
                        {...register('attending')}
                        className="sr-only"
                      />
                      <span>{t('rsvp.yes')}</span>
                    </label>

                    <label
                      className={`px-4 py-2.5 rounded-2xl border text-center cursor-pointer transition-all flex items-center justify-center gap-1.5 text-xs font-serif ${
                        attendingValue === 'no'
                          ? 'bg-olive-light/20 border-olive-light font-bold text-olive-dark shadow-sm'
                          : 'bg-cream/50 border-gold/30 text-olive-light hover:bg-cream/80'
                      }`}
                    >
                      <input
                        type="radio"
                        value="no"
                        {...register('attending')}
                        className="sr-only"
                      />
                      <span>{t('rsvp.no')}</span>
                    </label>
                  </div>
                </div>

                {/* Guest Count */}
                {attendingValue === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block font-serif text-xs uppercase tracking-wider text-olive-dark font-semibold mb-1.5">
                      {t('rsvp.guestCount')} *
                    </label>
                    <select
                      {...register('guestCount')}
                      className="w-full px-4 py-3 rounded-2xl bg-cream/70 border border-gold/40 text-sm text-olive focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}

                {/* Message / Blessings */}
                <div>
                  <label className="block font-serif text-xs uppercase tracking-wider text-olive-dark font-semibold mb-1.5">
                    {t('rsvp.message')}
                  </label>
                  <textarea
                    rows={3}
                    {...register('message')}
                    placeholder="Write a sweet congratulatory note..."
                    className="w-full px-4 py-3 rounded-2xl bg-cream/70 border border-gold/40 text-sm text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                {errorMessage && (
                  <p className="text-red-600 text-xs text-center font-medium">
                    {errorMessage}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gold hover:bg-gold-dark text-white font-serif text-sm tracking-wider uppercase font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t('rsvp.submitting') : t('rsvp.submit')}</span>
                </button>
              </form>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-sage-light/40 border border-sage flex items-center justify-center text-sage-dark mb-4">
                  <CheckCircle2 className="w-9 h-9 text-sage-dark stroke-[2.2]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-olive-dark mb-2">
                  {t('rsvp.successTitle')}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-olive-light/90 max-w-xs mb-6">
                  {t('rsvp.successMsg')}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-serif text-gold-dark underline hover:text-gold"
                >
                  Update your RSVP details
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Share on WhatsApp Button */}
          <div className="mt-6 pt-5 border-t border-gold/30 text-center">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-3 rounded-2xl glass-pill hover:bg-cream-dark/50 text-olive font-serif text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Share2 className="w-4 h-4 text-gold" />
              <span>{t('rsvp.shareWhatsApp')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
