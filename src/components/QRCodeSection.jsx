import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import { Download, QrCode, Heart, Sparkles } from 'lucide-react';

const INVITE_URL = 'https://yaminisrikar.vercel.app/';

export default function QRCodeSection() {
  const canvasRef = useRef(null);
  const [qrReady, setQrReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, INVITE_URL, {
      width: 220,
      margin: 2,
      color: {
        dark: '#2A3323',
        light: '#F6EEDF',
      },
      errorCorrectionLevel: 'H',
    }).then(() => setQrReady(true)).catch(console.error);
  }, []);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    // Create a higher-res canvas for print quality
    const printCanvas = document.createElement('canvas');
    const size = 600;
    printCanvas.width = size;
    printCanvas.height = size + 120;
    const ctx = printCanvas.getContext('2d');

    // Background
    ctx.fillStyle = '#F6EEDF';
    ctx.fillRect(0, 0, printCanvas.width, printCanvas.height);

    // Gold border
    ctx.strokeStyle = '#C9A66B';
    ctx.lineWidth = 8;
    ctx.strokeRect(12, 12, printCanvas.width - 24, printCanvas.height - 24);

    // Inner border
    ctx.strokeStyle = '#DFC493';
    ctx.lineWidth = 2;
    ctx.strokeRect(22, 22, printCanvas.width - 44, printCanvas.height - 44);

    // Draw QR scaled up
    ctx.drawImage(canvasRef.current, 40, 40, size - 80, size - 80);

    // Title text
    ctx.fillStyle = '#2A3323';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('Yamini & Srikar', printCanvas.width / 2, size - 10);

    ctx.font = '18px Georgia, serif';
    ctx.fillStyle = '#8A6728';
    ctx.fillText('Engagement • December 3, 2026', printCanvas.width / 2, size + 30);

    ctx.font = '14px Georgia, serif';
    ctx.fillStyle = '#5B6850';
    ctx.fillText('Scan to open the digital invitation', printCanvas.width / 2, size + 60);

    ctx.font = '12px monospace';
    ctx.fillStyle = '#9E7B44';
    ctx.fillText(INVITE_URL, printCanvas.width / 2, size + 90);

    const link = document.createElement('a');
    link.download = 'YaminiSrikar-Invitation-QR.png';
    link.href = printCanvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <section className="py-16 px-5 relative z-20">
      <div className="max-w-md mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-serif text-gold-dark mb-3">
          <QrCode className="w-3.5 h-3.5 text-gold" />
          <span>Digital Invitation</span>
        </div>
        <h2 className="font-script text-4xl sm:text-5xl text-olive mb-2">Share the Joy</h2>
        <p className="font-serif text-sm text-olive-light italic mb-10">
          Scan to open the digital invitation &amp; share with family and friends
        </p>

        {/* QR Code Decorative Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto inline-block"
        >
          {/* Decorative outer frame */}
          <div
            className="rounded-3xl p-6 shadow-wedding-lg bg-cream border-2 border-gold/50"
            style={{
              background: 'linear-gradient(135deg, #F6EEDF 0%, #FAF6EE 50%, #F6EEDF 100%)',
              boxShadow: '0 20px 60px rgba(201,166,107,0.25), 0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            {/* Corner flourishes */}
            <div className="absolute top-3 left-3 text-gold/50 text-lg select-none">✦</div>
            <div className="absolute top-3 right-3 text-gold/50 text-lg select-none">✦</div>
            <div className="absolute bottom-3 left-3 text-gold/50 text-lg select-none">✦</div>
            <div className="absolute bottom-3 right-3 text-gold/50 text-lg select-none">✦</div>

            {/* Sacred invocation */}
            <p className="font-telugu text-xs text-gold-dark mb-3 font-semibold">
              శ్రీరస్తు - శుభమస్తు
            </p>

            {/* Gold border around QR */}
            <div
              className="relative mx-auto rounded-2xl overflow-hidden border-4 border-gold/60"
              style={{ width: 220, height: 220, background: '#F6EEDF' }}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: 'block' }}
              />
              {/* Center heart overlay on QR */}
              {qrReady && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-cream flex items-center justify-center border border-gold/40">
                    <Heart className="w-5 h-5 text-gold fill-gold" />
                  </div>
                </div>
              )}
            </div>

            {/* Names */}
            <div className="mt-4">
              <p className="font-script text-2xl text-olive-dark">Yamini &amp; Srikar</p>
              <p className="font-serif text-xs text-gold-dark font-semibold mt-1">
                Engagement Ceremony • December 3, 2026
              </p>
              <p className="font-sans text-[10px] text-olive/50 mt-1 tracking-wider">
                {INVITE_URL}
              </p>
            </div>

            {/* Gold line */}
            <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-3" />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={!qrReady}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-gold-dark text-white font-serif text-sm tracking-wider font-semibold shadow-lg transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Download QR Code</span>
          </motion.button>

          <motion.button
            onClick={() => {
              const url = encodeURIComponent(INVITE_URL);
              const text = encodeURIComponent(
                '✨ శ్రీరస్తు - శుభమస్తు! You\'re invited to the Engagement of Yamini & Srikar on Dec 3, 2026 at MSR Convention, Vijayawada. Open invitation: '
              );
              window.open(`https://wa.me/?text=${text}${url}`, '_blank');
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full glass-pill text-olive font-serif text-sm tracking-wider font-semibold transition-all"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Share via WhatsApp</span>
          </motion.button>
        </div>

        <p className="font-sans text-xs text-olive/40 mt-4">
          High-resolution QR code — perfect for printing on invitation cards
        </p>
      </div>
    </section>
  );
}
