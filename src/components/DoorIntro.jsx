import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import doorLeft from '../assets/door-left.png';
import doorRight from '../assets/door-right.png';
import crestImg from '../assets/crest.png';

export default function DoorIntro({ onOpen, isOpen, onZipSound }) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 440, height: 844 });
  const [progress, setProgress] = useState(0);
  const [isUnzipping, setIsUnzipping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Measure container dimensions
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: clientWidth || 440,
          height: clientHeight || 844,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleTap = () => {
    if (isUnzipping || isFinished || isOpen) return;
    setIsUnzipping(true);

    if (onZipSound) onZipSound();
    if (onOpen) onOpen();

    if (shouldReduceMotion) {
      setProgress(1);
      setIsFinished(true);
      return;
    }

    // Smooth unzipping loop over 1700ms
    const duration = 1700;
    const startTime = performance.now();

    const animateUnzip = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);

      // Smooth custom cubic easing
      const ease = (p) =>
        p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      const currentProgress = ease(rawProgress);
      setProgress(currentProgress);

      if (rawProgress < 1) {
        requestAnimationFrame(animateUnzip);
      } else {
        setIsFinished(true);
      }
    };

    requestAnimationFrame(animateUnzip);
  };

  if (isFinished) {
    return null;
  }

  const { width: W, height: H } = dimensions;
  const halfW = W / 2;

  // Unzipping geometry calculations
  const sliderY = progress * (H + 50);
  const topOpeningWidth = Math.min(W * 0.58, progress * W * 0.74);
  const leftTopX = halfW - topOpeningWidth;
  const rightTopX = halfW + topOpeningWidth;
  const ctrlLeftX = halfW - topOpeningWidth * 0.16;
  const ctrlRightX = halfW + topOpeningWidth * 0.16;
  const ctrlY = sliderY * 0.65;

  // Clip paths for left and right panels
  const leftClipD = `M 0 0 L ${leftTopX} 0 Q ${ctrlLeftX} ${ctrlY} ${halfW} ${sliderY} L ${halfW} ${H} L 0 ${H} Z`;
  const rightClipD = `M ${W} 0 L ${rightTopX} 0 Q ${ctrlRightX} ${ctrlY} ${halfW} ${sliderY} L ${halfW} ${H} L ${W} ${H} Z`;

  // Curve paths for drawing golden zipper teeth along unzipping edge
  const leftCurveD = `M ${leftTopX} 0 Q ${ctrlLeftX} ${ctrlY} ${halfW} ${sliderY}`;
  const rightCurveD = `M ${rightTopX} 0 Q ${ctrlRightX} ${ctrlY} ${halfW} ${sliderY}`;

  // Crest fade as unzipping starts
  const crestOpacity = Math.max(0, 1 - progress * 4.2);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-30 overflow-hidden select-none ${
        isUnzipping ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
      }`}
      onClick={handleTap}
    >
      <svg
        className="w-full h-full block"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Metallic Gold Gradients for Zipper */}
          <linearGradient id="goldToothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2CC" />
            <stop offset="35%" stopColor="#DFC493" />
            <stop offset="70%" stopColor="#C9A66B" />
            <stop offset="100%" stopColor="#8A6B34" />
          </linearGradient>

          <linearGradient id="goldSliderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="30%" stopColor="#DFC493" />
            <stop offset="70%" stopColor="#C9A66B" />
            <stop offset="100%" stopColor="#6E5020" />
          </linearGradient>

          {/* Dynamic Clip Paths */}
          <clipPath id="unzipLeftClip">
            <path d={leftClipD} />
          </clipPath>
          <clipPath id="unzipRightClip">
            <path d={rightClipD} />
          </clipPath>

          {/* Drop Shadows */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="rgba(0,0,0,0.4)" />
          </filter>
        </defs>

        {/* ═══ LEFT PANEL ═══ */}
        <g clipPath="url(#unzipLeftClip)">
          <image
            href={doorLeft}
            x={0}
            y={0}
            width={halfW}
            height={H}
            preserveAspectRatio="none"
          />
          {/* Subtle 3D shadow on inner edge */}
          <path d={leftCurveD} stroke="rgba(0,0,0,0.35)" strokeWidth="12" fill="none" />
        </g>

        {/* ═══ RIGHT PANEL ═══ */}
        <g clipPath="url(#unzipRightClip)">
          <image
            href={doorRight}
            x={halfW}
            y={0}
            width={halfW}
            height={H}
            preserveAspectRatio="none"
          />
          {/* Subtle 3D shadow on inner edge */}
          <path d={rightCurveD} stroke="rgba(0,0,0,0.35)" strokeWidth="12" fill="none" />
        </g>

        {/* ═══ GOLDEN ZIPPER TEETH ALONG CURVES ═══ */}
        {/* Left unzipped curve teeth */}
        <path
          d={leftCurveD}
          stroke="url(#goldToothGrad)"
          strokeWidth="6"
          strokeDasharray="5 3"
          strokeLinecap="round"
          fill="none"
          filter="url(#goldGlow)"
        />

        {/* Right unzipped curve teeth */}
        <path
          d={rightCurveD}
          stroke="url(#goldToothGrad)"
          strokeWidth="6"
          strokeDasharray="5 3"
          strokeLinecap="round"
          fill="none"
          filter="url(#goldGlow)"
        />

        {/* Closed zipper seam below slider */}
        {sliderY < H && (
          <>
            <line
              x1={halfW}
              y1={sliderY}
              x2={halfW}
              y2={H}
              stroke="url(#goldToothGrad)"
              strokeWidth="6"
              strokeDasharray="5 3"
              strokeLinecap="round"
              filter="url(#goldGlow)"
            />
            {/* Center seam shadow */}
            <line
              x1={halfW}
              y1={sliderY}
              x2={halfW}
              y2={H}
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="2"
            />
          </>
        )}

        {/* ═══ GOLDEN ZIPPER SLIDER HEAD ═══ */}
        <g transform={`translate(${halfW}, ${sliderY})`} filter="url(#goldGlow)">
          {/* Slider body (wedge shield) */}
          <polygon
            points="-14,-16 14,-16 10,14 -10,14"
            fill="url(#goldSliderGrad)"
            stroke="#8A6B34"
            strokeWidth="1.2"
          />
          {/* Top groove */}
          <line x1="-8" y1="-8" x2="8" y2="-8" stroke="#FFFDF5" strokeWidth="1.5" opacity="0.9" />
          {/* Center loop */}
          <circle cx="0" cy="0" r="4" fill="#6E5020" />
          {/* Pull tab */}
          <rect
            x="-4.5"
            y="2"
            width="9"
            height="18"
            rx="3"
            fill="url(#goldSliderGrad)"
            stroke="#8A6B34"
            strokeWidth="1"
          />
          {/* Pull tab hole */}
          <circle cx="0" cy="14" r="2.2" fill="#5C421B" />
        </g>
      </svg>

      {/* ═══ CENTRAL GOLD CREST & "TAP TO OPEN" CTA ═══ */}
      {crestOpacity > 0 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none transition-opacity duration-300"
          style={{ opacity: crestOpacity }}
        >
          {/* Ornate Gold Crest with Continuous Shimmer */}
          <motion.div
            className="relative cursor-pointer pointer-events-auto filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={crestImg}
                alt="Royal Crest"
                className="w-full h-full object-contain"
              />
              {/* Continuous Gold Shimmer Sweep across the crest */}
              <div className="gold-shimmer-sweep absolute inset-0" />
            </div>
          </motion.div>

          {/* "Tap to Open" label with gentle breathing pulse */}
          <motion.div
            className="mt-5 px-6 py-2 rounded-full glass-pill text-olive font-serif text-sm uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer pointer-events-auto"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
            <span>{t('doors.tapToOpen')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
