'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const START = 146;
const END = 236;
const VOLUME = 0.7;

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/photograph.mp3');
    audio.volume = VOLUME;
    audio.preload = 'auto';
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.paused) return;
      if (audio.currentTime >= END) {
        audio.currentTime = START;
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);

    audio.currentTime = START;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});

    const handleFirstClick = () => {
      if (audio.paused) {
        audio.currentTime = START;
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };
    window.addEventListener('click', handleFirstClick, { once: true });

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      window.removeEventListener('click', handleFirstClick);
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.currentTime = START;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <button
      onClick={toggle}
      className="fixed top-5 right-5 z-50 cursor-pointer text-2xl select-none"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <span
        className={`transition-all duration-300 ${
          isPlaying ? 'animate-pulse text-pink-400' : 'text-gray-400'
        }`}
      >
        {isPlaying ? '🎵' : '🔇'}
      </span>
    </button>
  );
}
