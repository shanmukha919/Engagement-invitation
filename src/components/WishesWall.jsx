import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Sparkles, AlertCircle, MessageCircle } from 'lucide-react';
import { submitWish, getWishes } from '../lib/supabase';

function WishCard({ wish, index }) {
  const colors = [
    'from-gold/10 to-cream border-gold/30',
    'from-blush/20 to-cream border-blush/40',
    'from-sage/10 to-cream border-sage/30',
  ];
  const colorClass = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 1, 0.5, 1] }}
      className={`rounded-2xl p-4 bg-gradient-to-br ${colorClass} border shadow-wedding text-left relative overflow-hidden`}
    >
      {/* Background heart watermark */}
      <Heart className="absolute -bottom-3 -right-3 w-14 h-14 text-gold/5 fill-gold/5" />

      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0">
          <span className="font-serif font-bold text-gold-dark text-sm">
            {wish.name ? wish.name.charAt(0).toUpperCase() : '?'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif text-sm font-semibold text-olive-dark truncate">{wish.name}</p>
          <p className="font-sans text-xs text-olive/80 leading-relaxed mt-1 line-clamp-4">{wish.message}</p>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="mt-3 pt-2 border-t border-gold/15 flex items-center justify-between">
        <Heart className="w-3 h-3 text-gold fill-gold/40" />
        {wish.created_at && (
          <span className="text-[10px] text-olive/40 font-sans">
            {new Date(wish.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function WishesWall() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const lastSubmitRef = useRef(0);

  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    setLoading(true);
    try {
      const result = await getWishes();
      if (result.success) {
        setWishes(result.data || []);
      }
    } catch (e) {
      console.warn('Could not load wishes:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Spam protection: 60 second cooldown
    const now = Date.now();
    if (now - lastSubmitRef.current < 60000) {
      setError('Please wait a moment before submitting again.');
      return;
    }

    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (trimmedName.length < 2) return setError('Please enter your name (at least 2 characters).');
    if (trimmedMsg.length < 5) return setError('Please write a short wish (at least 5 characters).');
    if (trimmedMsg.length > 300) return setError('Message too long (max 300 characters).');

    setIsSubmitting(true);
    try {
      const result = await submitWish({ name: trimmedName, message: trimmedMsg });
      if (result.success) {
        lastSubmitRef.current = now;
        const newWish = {
          name: trimmedName,
          message: trimmedMsg,
          created_at: new Date().toISOString(),
          id: Date.now(),
        };
        setWishes((prev) => [newWish, ...prev]);
        setSubmitted(true);
        setName('');
        setMessage('');
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Could not save your wish. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-5 relative z-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-serif text-gold-dark mb-3">
            <MessageCircle className="w-3.5 h-3.5 text-gold" />
            <span>Wishes Wall</span>
          </div>
          <h2 className="font-script text-4xl sm:text-5xl text-olive mb-2">Your Blessings</h2>
          <p className="font-serif text-sm text-olive-light italic">
            Share your heartfelt wishes for Yamini &amp; Srikar
          </p>
        </div>

        {/* Submit Form */}
        <div className="rounded-3xl p-6 card-gold-border paper-texture shadow-wedding mb-8">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-6 text-center flex flex-col items-center gap-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center"
                >
                  <Heart className="w-7 h-7 text-gold fill-gold" />
                </motion.div>
                <p className="font-serif text-xl font-bold text-olive-dark">Thank You!</p>
                <p className="font-sans text-sm text-olive-light">Your blessings have been added to the wall 💛</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block font-serif text-xs uppercase tracking-wider text-olive-dark font-semibold mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    maxLength={50}
                    className="w-full px-4 py-3 rounded-2xl bg-cream/70 border border-gold/40 text-sm text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                  />
                </div>
                <div>
                  <label className="block font-serif text-xs uppercase tracking-wider text-olive-dark font-semibold mb-1.5">
                    Your Wish / Blessing *
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your heartfelt blessings for Yamini & Srikar..."
                    maxLength={300}
                    className="w-full px-4 py-3 rounded-2xl bg-cream/70 border border-gold/40 text-sm text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                  />
                  <p className="text-right text-[10px] text-olive/40 mt-1">{message.length}/300</p>
                </div>

                {error && (
                  <div className="flex items-center gap-1.5 text-red-500 text-xs">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gold hover:bg-gold-dark text-white font-serif text-sm tracking-wider uppercase font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Blessings...' : 'Send My Blessings'}</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Wishes Display */}
        {loading ? (
          <div className="flex justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent"
            />
          </div>
        ) : wishes.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="font-serif text-sm text-olive-light">
                {wishes.length} blessing{wishes.length !== 1 ? 's' : ''} from loved ones
              </span>
            </div>
            {wishes.map((wish, i) => (
              <WishCard key={wish.id || i} wish={wish} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 opacity-50">
            <Heart className="w-10 h-10 text-gold mx-auto mb-2" />
            <p className="font-serif text-sm text-olive-light">Be the first to share your blessings!</p>
          </div>
        )}
      </div>
    </section>
  );
}
