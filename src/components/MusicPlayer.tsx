'use client';

import { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react';

interface MusicContextValue {
  isPlaying: boolean;
  toggle: () => void;
}

const MusicCtx = createContext<MusicContextValue>({
  isPlaying: false,
  toggle: () => {},
});

export const useMusic = () => useContext(MusicCtx);

const START = 146;
const END = 236;
const VOLUME = 0.7;

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const audio = new Audio('/photograph.mp3');
    audio.volume = VOLUME;
    audio.preload = 'auto';
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (!playingRef.current) return;
      if (audio.currentTime >= END) {
        audio.currentTime = START;
        audio.play();
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);

    const onFirstClick = () => {
      if (started) return;
      audio.currentTime = START;
      audio.play().then(() => {
        playingRef.current = true;
        setIsPlaying(true);
        setStarted(true);
      });
    };

    window.addEventListener('click', onFirstClick, { once: true });

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      window.removeEventListener('click', onFirstClick);
    };
  }, [started]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!playingRef.current) {
      audio.currentTime = START;
      audio.play();
      playingRef.current = true;
      setIsPlaying(true);
    } else {
      audio.pause();
      playingRef.current = false;
      setIsPlaying(false);
    }
  }, []);

  return (
    <MusicCtx.Provider value={{ isPlaying, toggle }}>
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
    </MusicCtx.Provider>
  );
}
