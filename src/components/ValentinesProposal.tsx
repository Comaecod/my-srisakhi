/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Playfair_Display } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import Fireworks from '@fireworks-js/react';
import Image from 'next/image';
import { PoemSlide } from './PoemSlide';
import { slides } from '@/constants';

const playfairDisplay = Playfair_Display({
  display: 'swap',
  subsets: ['latin'],
});

// 36 images
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

  useEffect(() => {
    // Skip to proposal page (Yes/No)
    (window as any).goToProposal = () => {
      setStep(8);
    };

    // Skip everything and show accepted page
    (window as any).acceptDirectly = () => {
      setShowFireworks(true);
      setStep(9);
    };

    // Fast forward through steps one by one
    (window as any).fastForward = () => {
      setStep((prev) => Math.min(prev + 1, 9));
    };

    if (step < 8) {
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 20000);

      return () => {
        clearTimeout(timer);
        delete (window as any).goToProposal;
        delete (window as any).acceptDirectly;
        delete (window as any).fastForward;
      };
    }
  }, [step]);

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
            {/* Image Grid Background */}
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
              className={`text-3xl font-semibold mb-8 text-center ${playfairDisplay.className}`}>
              Will you be my companion in
            </h3>
            <h2
              className={`text-5xl font-semibold mb-8 text-center ${playfairDisplay.className}`}>
              Dharma, Artha, Kama, and Moksha?
            </h2>
            <Image
              src='/krishna.gif'
              alt='Sad Hamster'
              className='rounded-xl opacity-95'
              width={200}
              height={200}
            />
            <div className='flex space-x-4 mt-10'>
              <button
                className='px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                onClick={handleYesClick}>
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
                onClick={() => setPosition(getRandomPosition())}>
                No, I won&apos;t 😢
              </button>
            </div>
          </motion.div>
        )}
        {step === 9 && (
          <motion.div
            key='step-9'
            className={`text-4xl text-center font-semibold mb-4 flex flex-col justify-center items-center ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <span className='text-red-400 text-5xl font-bold mb-4 animate-pulse'>
              I LOVE YOU 💕
            </span>
            <br />
            <Image
              src='/radhekrishna.gif'
              alt='Hamster Feliz'
              className='rounded-3xl'
              width={200}
              height={200}
              unoptimized
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className='absolute w-full h-full'>
          <Fireworks
            options={{
              autoresize: true,
            }}
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
