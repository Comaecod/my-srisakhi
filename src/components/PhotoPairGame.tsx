/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';

/* ---------------- IMAGES ---------------- */

const imagesList = [
  '/game-photos/1.jpg',
  '/game-photos/2.jpg',
  '/game-photos/3.jpg',
  '/game-photos/4.jpg',
  '/game-photos/5.jpg',
  '/game-photos/6.jpg',
  '/game-photos/7.jpg',
  '/game-photos/8.jpg',
  '/game-photos/9.jpg',
  '/game-photos/10.jpg',
  '/game-photos/11.jpg',
  '/game-photos/12.jpg',
  '/game-photos/13.jpg',
  '/game-photos/14.jpg',
  '/game-photos/15.jpg',
  '/game-photos/16.jpg',
  '/game-photos/17.jpg',
  '/game-photos/18.jpg',
];

const imagePairs = imagesList.flatMap((img) => [img, img]);

const shuffleArray = (array: string[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/* ---------------- HEART LAYOUT ---------------- */

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type Props = {
  handleShowProposal: () => void;
};

export default function PhotoPairGame({ handleShowProposal }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [images] = useState(() => shuffleArray(imagePairs));

  const [hasStarted, setHasStarted] = useState(false);
  const [showBlink, setShowBlink] = useState(false);

  const flatLayout = useMemo(() => heartLayout.flat(), []);
  const blinkIndex = 4;

  /* ---------------- SKIP FUNCTION ---------------- */

  const skipGame = () => {
    setMatched([...Array(imagePairs.length).keys()]);
  };

  useEffect(() => {
    (window as any).skipPhotoPairGame = skipGame;
    return () => {
      delete (window as any).skipPhotoPairGame;
    };
  }, []);

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (!hasStarted) return;

    const timer = setTimeout(() => {
      setShowBlink(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, [hasStarted]);

  /* ---------------- CARD CLICK ---------------- */

  const handleClick = async (index: number) => {
    if (!hasStarted) setHasStarted(true);

    if (
      selected.length === 2 ||
      matched.includes(index) ||
      selected.includes(index)
    )
      return;

    if (selected.length === 1) {
      const first = selected[0];
      setSelected([first, index]);

      if (images[first] === images[index]) {
        setMatched((prev) => [...prev, first, index]);
        setSelected([]);
      } else {
        await new Promise((r) => setTimeout(r, 500));
        setIncorrect([first, index]);
        setTimeout(() => {
          setIncorrect([]);
          setSelected([]);
        }, 500);
      }
    } else {
      setSelected([index]);
    }
  };

  /* ---------------- WIN CHECK ---------------- */

  useEffect(() => {
    if (matched.length === imagePairs.length) {
      setShowBlink(false);
      handleShowProposal();
    }
  }, [matched, handleShowProposal]);

  /* ---------------- RENDER ---------------- */

  return (
    <div className='grid grid-cols-9 gap-1 lg:gap-2 max-w-[95vw] mx-auto place-items-center'>
      {flatLayout.map((index, i) =>
        index !== null ? (
          <motion.div
            key={i}
            className='w-[11vh] h-[11vh] lg:w-20 lg:h-20 relative cursor-pointer'
            whileHover={{ scale: 1.1 }}
            onClick={() => handleClick(index)}
            style={{ perspective: '1000px' }}>
            {!selected.includes(index) && !matched.includes(index) && (
              <motion.div
                className='absolute inset-0 bg-gray-300 rounded-sm lg:rounded-md'
                animate={{
                  rotateY:
                    selected.includes(index) || matched.includes(index)
                      ? 180
                      : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: 'hidden' }}
              />
            )}

            {(selected.includes(index) || matched.includes(index)) && (
              <motion.div
                className='absolute inset-0'
                initial={{ rotateY: -180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: 'hidden' }}>
                <Image
                  src={images[index]}
                  alt=''
                  fill
                  className='rounded-sm lg:rounded-md object-cover'
                />
              </motion.div>
            )}

            {incorrect.includes(index) && (
              <motion.div
                className='absolute inset-0 bg-red-500 rounded-sm lg:rounded-md'
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.div>
        ) : (
          <div
            key={i}
            className='w-[11vh] h-[11vh] lg:w-20 lg:h-20 relative'>
            {showBlink && i === blinkIndex && (
              <motion.div
                className='absolute inset-0 rounded-sm lg:rounded-md cursor-pointer'
                animate={{
                  backgroundColor: [
                    'rgba(236,72,153,0.2)',
                    'rgba(236,72,153,0.9)',
                    'rgba(236,72,153,0.2)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                onClick={skipGame}
              />
            )}
          </div>
        ),
      )}
    </div>
  );
}
