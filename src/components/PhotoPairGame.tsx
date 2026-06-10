'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import GameTile from './GameTile';
import SkipTile from './SkipTile';
import { imagePaths } from '@/constants';

const imagePairs = imagePaths.flatMap((image) => [image, image]);

function seededRandom(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return (s >>> 0) / 0x100000000;
  };
}

function shuffleArray<T>(array: T[], rng: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type Cell = number | null | 'skip';

const heartLayout: Cell[][] = [
  [null, null, 0, 1, 'skip', 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

interface PhotoPairGameProps {
  handleShowProposal: () => void;
}

export default function PhotoPairGame({ handleShowProposal }: PhotoPairGameProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [shuffledImages] = useState(() => shuffleArray([...imagePairs], seededRandom(42)));
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    imagePaths.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    window.skipPhotoPairGame = () => {
      setMatched(Array.from({ length: imagePairs.length }, (_, i) => i));
    };
    return () => {
      delete window.skipPhotoPairGame;
    };
  }, []);

  useEffect(() => {
    if (matched.length === imagePairs.length) return;
    const timer = setTimeout(() => setShowSkip(true), 15000);
    return () => clearTimeout(timer);
  }, [matched]);

  const handleClick = useCallback(
    (index: number) => {
      if (selected.length === 2 || matched.includes(index) || selected.includes(index)) return;
      setSelected((prev) => [...prev, index]);
    },
    [selected, matched]
  );

  useEffect(() => {
    if (selected.length !== 2) return;

    const [a, b] = selected;
    const timer = setTimeout(() => {
      if (shuffledImages[a] === shuffledImages[b]) {
        setMatched((prev) => [...prev, a, b]);
      }
      setSelected([]);
    }, shuffledImages[a] === shuffledImages[b] ? 600 : 700);
    return () => clearTimeout(timer);
  }, [selected, shuffledImages]);

  const handleSkip = useCallback(() => {
    setMatched(Array.from({ length: imagePairs.length }, (_, i) => i));
  }, []);

  useEffect(() => {
    if (matched.length === imagePairs.length && matched.length > 0) {
      handleShowProposal();
    }
  }, [matched, handleShowProposal]);

  const cardClass = useMemo(
    () =>
      'w-[8vw] h-[8vw] sm:w-[7vw] sm:h-[7vw] md:w-[6vw] md:h-[6vw] lg:w-16 lg:h-16 xl:w-20 xl:h-20',
    []
  );

  return (
    <div suppressHydrationWarning className="grid grid-cols-9 gap-[2px] sm:gap-1 md:gap-1.5 lg:gap-2 max-w-[95vw] mx-auto place-items-center">
      {heartLayout.flat().map((cell, i) => {
        if (cell === 'skip') {
          return (
            <div key={i} className={cardClass}>
              <SkipTile onClick={handleSkip} visible={showSkip} />
            </div>
          );
        }

        if (cell === null) {
          return <div key={i} className={cardClass} />;
        }

        const index = cell;
        return (
          <div key={i} className={cardClass}>
            <GameTile
              imageSrc={shuffledImages[index]}
              index={index}
              isFaceUp={selected.includes(index) || matched.includes(index)}
              onClick={() => handleClick(index)}
            />
          </div>
        );
      })}
    </div>
  );
}
