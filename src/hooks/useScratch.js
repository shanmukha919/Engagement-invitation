import { useEffect, useRef, useState, useCallback } from 'react';

export function useScratch({
  canvasRef,
  onComplete,
  threshold = 55,
  brushRadius = 28,
  glitterSrc = '/glitter.png',
}) {
  const [percentScratched, setPercentScratched] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const isScratchingRef = useRef(false);
  const lastCheckTimeRef = useRef(0);
  const totalPixelsRef = useRef(0);
  const completedRef = useRef(false);

  // Draw heart path on context
  const drawHeartPath = useCallback((ctx, w, h) => {
    ctx.beginPath();
    const topCurveHeight = h * 0.3;
    ctx.moveTo(w / 2, h / 5);
    // Top left curve
    ctx.bezierCurveTo(w / 2, 0, 0, 0, 0, topCurveHeight);
    // Bottom left curve
    ctx.bezierCurveTo(0, (h + topCurveHeight) / 2, w / 4, (h + topCurveHeight) / 2, w / 2, h * 0.95);
    // Bottom right curve
    ctx.bezierCurveTo(3 * w / 4, (h + topCurveHeight) / 2, w, (h + topCurveHeight) / 2, w, topCurveHeight);
    // Top right curve
    ctx.bezierCurveTo(w, 0, w / 2, 0, w / 2, h / 5);
    ctx.closePath();
  }, []);

  // Initialize canvas with glitter heart
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.save();

    // Clip to heart shape
    drawHeartPath(ctx, w, h);
    ctx.clip();

    // Load glitter texture image or procedural gradient
    const img = new Image();
    img.src = glitterSrc;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, w, h);

      // Gold shimmer border on top of heart
      ctx.restore();
      ctx.save();
      drawHeartPath(ctx, w, h);
      ctx.strokeStyle = '#C9A66B';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Count total non-transparent pixels in heart
      const imgData = ctx.getImageData(0, 0, w, h);
      let count = 0;
      for (let i = 3; i < imgData.data.length; i += 16) {
        if (imgData.data[i] > 10) count++;
      }
      totalPixelsRef.current = count;
      ctx.restore();
    };

    img.onerror = () => {
      // Procedural fallback if image loading delayed
      const grad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w / 2);
      grad.addColorStop(0, '#C9A66B');
      grad.addColorStop(0.5, '#8A9A7B');
      grad.addColorStop(1, '#5E6D52');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };
  }, [canvasRef, drawHeartPath, glitterSrc]);

  // Scratch action
  const scratch = useCallback((x, y) => {
    if (completedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Throttle progress check to every 200ms
    const now = Date.now();
    if (now - lastCheckTimeRef.current > 200) {
      lastCheckTimeRef.current = now;
      checkProgress();
    }
  }, [brushRadius, canvasRef]);

  // Check progress
  const checkProgress = useCallback(() => {
    if (completedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    let remaining = 0;

    for (let i = 3; i < imgData.data.length; i += 16) {
      if (imgData.data[i] > 10) remaining++;
    }

    if (totalPixelsRef.current === 0) return;
    const cleared = ((totalPixelsRef.current - remaining) / totalPixelsRef.current) * 100;
    const percent = Math.min(100, Math.max(0, Math.round(cleared)));
    setPercentScratched(percent);

    if (percent >= threshold && !completedRef.current) {
      completedRef.current = true;
      setIsRevealed(true);
      // Auto clear rest with fade
      ctx.clearRect(0, 0, w, h);
      if (onComplete) onComplete();
    }
  }, [canvasRef, onComplete, threshold]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  return {
    percentScratched,
    isRevealed,
    scratch,
    isScratchingRef,
    initCanvas,
  };
}
