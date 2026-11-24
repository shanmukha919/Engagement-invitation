import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/config';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="pt-16 pb-28 px-5 relative z-20 text-center select-none">
      <div className="max-w-md mx-auto flex flex-col items-center">
        
        {/* Top flourish */}
        <div className="flex items-center gap-3 mb-6 opacity-70">
          <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold" />
          <Sparkles className="w-4 h-4 text-gold" />
          <Heart className="w-4 h-4 text-gold fill-gold" />
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Script heading */}
        <p className="font-script text-5xl text-olive mb-2">
          {t('footer.withLove')}
        </p>

        {/* Family name */}
        <p className="font-serif text-base font-bold text-olive-dark tracking-wide mb-1">
          {t('footer.family')}
        </p>

        {/* Telugu family names */}
        <p className="font-telugu text-sm text-olive-light mb-4">
          పొత్తూరి సుధాకరరావు - శ్రీమతి లక్ష్మీ సుందరి, పొత్తూరి షణ్ముఖ
        </p>

        {/* "With Love & Blessings" tagline */}
        <div
          className="rounded-2xl px-6 py-4 mb-5 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(201,166,107,0.08) 0%, rgba(246,238,223,0.6) 100%)',
            border: '1px solid rgba(201,166,107,0.3)',
          }}
        >
          <p className="font-serif text-sm font-semibold text-olive-dark italic mb-1">
            "With Love &amp; Blessings – From Our Family"
          </p>
          <p className="font-telugu text-xs text-olive-light">
            మా కుటుంబం తరఫున ప్రేమతో &amp; ఆశీర్వాదాలతో ✨
          </p>
        </div>

        {/* Hashtag */}
        <div className="mt-2 px-4 py-1.5 rounded-full glass-pill border-gold/40 inline-block mb-4">
          <span className="font-sans text-xs uppercase tracking-widest text-gold-dark font-semibold">
            {weddingConfig.hashtag}
          </span>
        </div>

        {/* Middle divider */}
        <div className="flex items-center gap-3 my-3 opacity-40 w-full max-w-xs">
          <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold" />
          <Heart className="w-3 h-3 text-gold fill-gold" />
          <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Credit */}
        <p className="font-sans text-[11px] text-olive-light/60 tracking-widest uppercase mt-2 flex items-center gap-1 justify-center">
          <span>{t('footer.credit')}</span>
        </p>

        {/* Website URL */}
        <p className="font-sans text-[10px] text-olive/30 mt-2 tracking-wider">
          yaminisrikar.vercel.app
        </p>
      </div>
    </footer>
  );
}
