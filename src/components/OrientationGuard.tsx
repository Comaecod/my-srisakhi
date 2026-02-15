'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const START_TIME = 146; // 2:26
const END_TIME = 236; // 3:56
const FADE_DURATION = 1000;

export default function OrientationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrame = useRef<number | null>(null);
  const isPlayingRef = useRef(false); // 🔥 important fix

  /* ---------------- ORIENTATION CHECK ---------------- */

  useEffect(() => {
    const checkOrientation = () => {
      const portrait =
        window.innerHeight > window.innerWidth && window.innerWidth < 1024;
      setIsPortrait(portrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  /* ---------------- FADE FUNCTIONS ---------------- */

  const fade = useCallback((targetVolume: number, callback?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;

    const startVolume = audio.volume;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / FADE_DURATION, 1);

      // 🔊 VOLUME IS SET HERE
      audio.volume = startVolume + (targetVolume - startVolume) * progress;

      if (progress < 1) {
        fadeFrame.current = requestAnimationFrame(animate);
      } else {
        callback?.();
      }
    };

    if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current);
    fadeFrame.current = requestAnimationFrame(animate);
  }, []);

  const fadeIn = useCallback(() => fade(0.7), [fade]);
  const fadeOut = useCallback((cb?: () => void) => fade(0, cb), [fade]);

  /* ---------------- AUDIO INIT ---------------- */

  useEffect(() => {
    const audio = new Audio('/photograph.mp3');
    audioRef.current = audio;

    audio.volume = 0; // 🔊 initial volume set here
    audio.preload = 'auto';

    const handleTimeUpdate = () => {
      if (!isPlayingRef.current) return;

      if (audio.currentTime >= END_TIME) {
        fadeOut(() => {
          if (!isPlayingRef.current) return;
          audio.currentTime = START_TIME;
          audio.play();
          fadeIn();
        });
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current);
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [fadeIn, fadeOut]);

  /* ---------------- START ON FIRST CLICK ---------------- */

  useEffect(() => {
    const startMusic = () => {
      if (hasInteracted) return;

      const audio = audioRef.current;
      if (!audio) return;

      audio.currentTime = START_TIME;

      audio.play().then(() => {
        fadeIn();
        isPlayingRef.current = true;
        setIsPlaying(true);
        setHasInteracted(true);
      });

      window.removeEventListener('click', startMusic);
    };

    window.addEventListener('click', startMusic);

    return () => {
      window.removeEventListener('click', startMusic);
    };
  }, [fadeIn, hasInteracted]);

  /* ---------------- TOGGLE MUSIC ---------------- */

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlayingRef.current) {
      audio.play().then(() => fadeIn());
      isPlayingRef.current = true;
      setIsPlaying(true);
    } else {
      fadeOut(() => audio.pause());
      isPlayingRef.current = false;
      setIsPlaying(false);
    }
  };

  /* ---------------- PORTRAIT SCREEN ---------------- */

  if (isPortrait) {
    return (
      <div className='fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-center p-8'>
        <MusicIcon
          isPlaying={isPlaying}
          toggle={toggleMusic}
        />

        <motion.div
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='mb-6'>
          <svg
            className='w-20 h-20 text-pink-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
            />
          </svg>
        </motion.div>

        <h2 className='text-3xl font-bold text-white mb-4'>
          Rotate your device
        </h2>

        <p className='text-gray-400 text-lg max-w-xs'>
          To play correctly, switch to <b>landscape mode</b>.
        </p>
      </div>
    );
  }

  /* ---------------- NORMAL RENDER ---------------- */

  return (
    <>
      <MusicIcon
        isPlaying={isPlaying}
        toggle={toggleMusic}
      />
      {children}
    </>
  );
}

/* ---------------- MUSIC ICON ---------------- */

function MusicIcon({
  isPlaying,
  toggle,
}: {
  isPlaying: boolean;
  toggle: () => void;
}) {
  return (
    <div
      onClick={toggle}
      className='fixed top-5 right-5 cursor-pointer text-3xl z-50 select-none'>
      <span
        className={`transition-all duration-300 ${
          isPlaying ? 'animate-pulse text-pink-500' : 'text-gray-400'
        }`}>
        {isPlaying ? '🎵' : '🔇'}
      </span>
    </div>
  );
}
