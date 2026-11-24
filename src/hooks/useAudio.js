import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { weddingConfig } from '../data/config';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const musicRef = useRef(null);
  const chimeRef = useRef(null);
  const zipRef = useRef(null);

  useEffect(() => {
    musicRef.current = new Howl({
      src: [weddingConfig.audio.src],
      html5: true,
      loop: true,
      volume: weddingConfig.audio.volume || 0.65,
      preload: true,
      onplay: () => {
        setIsPlaying(true);
        setIsMuted(false);
      },
      onpause: () => {
        setIsPlaying(false);
        setIsMuted(true);
      },
      onstop: () => {
        setIsPlaying(false);
        setIsMuted(true);
      },
    });

    chimeRef.current = new Howl({
      src: [weddingConfig.audio.chimeSrc],
      volume: 0.7,
      preload: true,
    });

    zipRef.current = new Howl({
      src: ['/zip.wav'],
      volume: 0.65,
      preload: true,
    });

    return () => {
      if (musicRef.current) musicRef.current.unload();
      if (chimeRef.current) chimeRef.current.unload();
      if (zipRef.current) zipRef.current.unload();
    };
  }, []);

  const startMusic = useCallback(() => {
    if (!musicRef.current) return;
    if (musicRef.current.playing()) return;

    musicRef.current.volume(weddingConfig.audio.volume || 0.65);
    musicRef.current.play();
    setIsPlaying(true);
    setIsMuted(false);
  }, []);

  const toggleMusic = useCallback(() => {
    if (!musicRef.current) return;

    if (musicRef.current.playing()) {
      musicRef.current.pause();
      setIsPlaying(false);
      setIsMuted(true);
    } else {
      musicRef.current.volume(weddingConfig.audio.volume || 0.65);
      musicRef.current.play();
      setIsPlaying(true);
      setIsMuted(false);
    }
  }, []);

  const playChime = useCallback(() => {
    if (!isMuted && chimeRef.current) {
      chimeRef.current.play();
    }
  }, [isMuted]);

  const playZipSound = useCallback(() => {
    if (zipRef.current) {
      zipRef.current.play();
    }
  }, []);

  return {
    isPlaying,
    isMuted,
    startMusic,
    toggleMusic,
    playChime,
    playZipSound,
  };
}
