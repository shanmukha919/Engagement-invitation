import { useState, useEffect } from 'react';
import { weddingConfig } from '../data/config';

export function useCountdown(targetDateISO = weddingConfig.weddingDateTimeISO) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDateISO) - +new Date();
    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00', isCompleted: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      isCompleted: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateISO]);

  return timeLeft;
}
