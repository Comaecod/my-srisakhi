/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fireworks from '@fireworks-js/react';
import Image from 'next/image';
import { PoemSlide } from './PoemSlide';
import { slides } from '@/constants';

const images = [
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

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 80;
    const randomLeft = Math.random() * 80;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  /* ---------------- CLICK / TOUCH TO ADVANCE ---------------- */

  const goNext = useCallback(() => {
    setStep((prev) => (prev < 8 ? prev + 1 : prev));
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      if (step <= 7) {
        goNext();
      }
    };

    window.addEventListener('click', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
    };
  }, [step, goNext]);

  /* ---------------- DEV CONSOLE METHODS ---------------- */

  useEffect(() => {
    (window as any).goToProposal = () => setStep(8);

    (window as any).acceptDirectly = () => {
      setShowFireworks(true);
      setStep(9);
    };

    (window as any).fastForward = () => {
      setStep((prev) => Math.min(prev + 1, 9));
    };

    return () => {
      delete (window as any).goToProposal;
      delete (window as any).acceptDirectly;
      delete (window as any).fastForward;
    };
  }, []);

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(9);
  };

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <AnimatePresence mode='wait'>
        {step >= 0 && step <= 7 && (
          <PoemSlide
            slide={slides[step]}
            index={step}
          />
        )}

        {step === 8 && (
          <motion.div
            key='step-8'
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex flex-col items-center'>
            <div className='absolute inset-0 grid grid-cols-6 opacity-10'>
              {images.slice(0, 36).map((src, index) => (
                <div
                  key={index}
                  className='relative h-full'>
                  <Image
                    src={src}
                    alt={`Memory ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                </div>
              ))}
            </div>

            <h3
              className={'text-2xl md:text-3xl font-semibold mb-8 text-center'}>
              Will you be my companion in
              <br />
              Dharma, Artha, and Kama?
            </h3>

            <div className='relative w-40 sm:w-28 md:w-56 lg:w-64 aspect-square'>
              <Image
                src='/krishna.gif'
                alt='Krishna'
                fill
                className='rounded-2xl opacity-95 object-contain'
                unoptimized
              />
            </div>

            <div className='flex space-x-4 mt-10'>
              <button
                className='px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                onClick={(e) => {
                  e.stopPropagation();
                  handleYesClick();
                }}>
                Yes, I will! 🥰
              </button>

              <button
                className='px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-95 transition-all duration-300 shadow-lg'
                style={
                  position
                    ? {
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                      }
                    : {}
                }
                onMouseEnter={() => setPosition(getRandomPosition())}
                onClick={(e) => {
                  e.stopPropagation();
                  setPosition(getRandomPosition());
                }}>
                No, I won&apos;t 😢
              </button>
            </div>
          </motion.div>
        )}

        {step === 9 && (
          <motion.div
            key='step-9'
            className={`text-4xl text-center font-semibold mb-4 flex flex-col justify-center items-center`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <span className='text-red-400 text-3xl md:text-5xl font-bold mb-4 animate-pulse'>
              💕 I Love You 💕
            </span>

            <Image
              src='/radhekrishna.gif'
              alt='radhekrishna'
              className='rounded-3xl'
              width={150}
              height={150}
              unoptimized
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className='absolute w-full h-full'>
          <Fireworks
            options={{ autoresize: true }}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
