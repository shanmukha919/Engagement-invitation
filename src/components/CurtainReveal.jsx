import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import curtainLeft from '../assets/curtain-left.png';
import curtainRight from '../assets/curtain-right.png';
import valanceImg from '../assets/valance.png';
import sceneBg from '../assets/scene-bg.jpg';

export default function CurtainReveal({ isCurtainOpen }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10">
      {/* Courtyard Scene Background with 3s Camera Zoom (scale 1.15 -> 1.0) */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.12 }}
        animate={isCurtainOpen ? { scale: 1.0 } : { scale: 1.12 }}
        transition={{ duration: 3.0, ease: [0.25, 1, 0.5, 1] }}
      >
        <img
          src={sceneBg}
          alt="Courtyard"
          className="w-full h-full object-cover object-bottom opacity-60"
        />
        {/* Soft, warm ambient wash to guarantee high contrast behind typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6EEDF]/92 via-[#FAF6EE]/80 to-[#F6EEDF]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.75)_0%,_transparent_75%)]" />
      </motion.div>

      {/* Left Curtain Drape */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-[55%] z-20 origin-left"
        initial={{ x: '0%', scaleX: 1 }}
        animate={
          isCurtainOpen
            ? shouldReduceMotion
              ? { opacity: 0 }
              : { x: '-105%', scaleX: 0.5 }
            : { x: '0%', scaleX: 1 }
        }
        transition={{
          duration: 1.6,
          delay: 0.1,
          ease: [0.77, 0, 0.175, 1],
        }}
      >
        <img
          src={curtainLeft}
          alt="Left Silk Curtain"
          className="w-full h-full object-cover object-left filter drop-shadow-[5px_0_15px_rgba(0,0,0,0.2)]"
        />
      </motion.div>

      {/* Right Curtain Drape */}
      <motion.div
        className="absolute top-0 bottom-0 right-0 w-[55%] z-20 origin-right"
        initial={{ x: '0%', scaleX: 1 }}
        animate={
          isCurtainOpen
            ? shouldReduceMotion
              ? { opacity: 0 }
              : { x: '105%', scaleX: 0.5 }
            : { x: '0%', scaleX: 1 }
        }
        transition={{
          duration: 1.6,
          delay: 0.15,
          ease: [0.77, 0, 0.175, 1],
        }}
      >
        <img
          src={curtainRight}
          alt="Right Silk Curtain"
          className="w-full h-full object-cover object-right filter drop-shadow-[-5px_0_15px_rgba(0,0,0,0.2)]"
        />
      </motion.div>

      {/* Top Valance Swag with gentle swaying animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-25 origin-top"
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [-0.4, 0.4, -0.4],
                transition: { repeat: Infinity, duration: 5.0, ease: 'easeInOut' },
              }
        }
      >
        <img
          src={valanceImg}
          alt="Valance Swag"
          className="w-full h-auto max-h-32 object-contain object-top filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
        />
      </motion.div>
    </div>
  );
}
