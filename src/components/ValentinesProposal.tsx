'use client';

import { useState, useEffect, useCallback } from 'react';
import { Playfair_Display } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import Fireworks from '@fireworks-js/react';
import Image from 'next/image';
import PoemSlide from './PoemSlide';
import { slides } from '@/constants';
import { imagePaths } from '@/constants';

const playfairDisplay = Playfair_Display({
  display: 'swap',
  subsets: ['latin'],
});

const delay = 30000;
const totalSeconds = Math.ceil(delay / 1000);
const SLIDE_COUNT = 8;
const PROPOSAL_STEP = 8;
const ACCEPTED_STEP = 9;

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [noPosition, setNoPosition] = useState<{ top: string; left: string } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  const setStepSafe = useCallback((s: number) => {
    setStep(Math.max(0, Math.min(s, ACCEPTED_STEP)));
  }, []);

  const goNext = useCallback(() => {
    if (step < SLIDE_COUNT - 1) {
      setStepSafe(step + 1);
    } else if (step === SLIDE_COUNT - 1) {
      setStep(PROPOSAL_STEP);
    }
  }, [step, setStepSafe]);

  const goPrev = useCallback(() => {
    if (step > 0) setStepSafe(step - 1);
  }, [step, setStepSafe]);

  const jumpToProposal = useCallback(() => setStep(PROPOSAL_STEP), []);
  const acceptDirectly = useCallback(() => {
    setShowFireworks(true);
    setStep(ACCEPTED_STEP);
  }, []);
  const fastForward = useCallback(() => {
    setStepSafe(step + 1);
  }, [step, setStepSafe]);

  useEffect(() => {
    window.goToProposal = jumpToProposal;
    window.acceptDirectly = acceptDirectly;
    window.fastForward = fastForward;
    return () => {
      delete window.goToProposal;
      delete window.acceptDirectly;
      delete window.fastForward;
    };
  }, [jumpToProposal, acceptDirectly, fastForward]);

  useEffect(() => {
    if (step >= PROPOSAL_STEP) return;

    const timer = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, delay);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [step]);

  useEffect(() => {
    if (step < PROPOSAL_STEP) {
      const id = setTimeout(() => setSecondsLeft(totalSeconds), 0);
      return () => clearTimeout(id);
    }
  }, [step]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(ACCEPTED_STEP);
  };

  const teleportNo = useCallback(() => {
    const randomTop = 5 + Math.random() * 75;
    const randomLeft = 5 + Math.random() * 75;
    setNoPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  }, []);

  const isFirstSlide = step === 0;
  const isLastSlide = step === SLIDE_COUNT - 1;
  const nextLabel = isLastSlide ? 'Proposal' : 'Next';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 sm:px-6">
      <AnimatePresence mode="wait">
        {step >= 0 && step <= SLIDE_COUNT - 1 && (
          <motion.div
            key="slides"
            className="flex flex-col items-center w-full"
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PoemSlide slide={slides[step]} index={step} secondsLeft={secondsLeft} />

            <div className="flex items-center gap-6 mt-6 sm:mt-8">
              <button
                onClick={goPrev}
                disabled={isFirstSlide}
                className={`flex items-center gap-1 px-4 py-2 text-sm sm:text-base font-medium rounded-xl transition-all duration-300 ${
                  isFirstSlide
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-300 hover:text-white hover:bg-white/10 active:scale-95'
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </button>

              <span className="text-xs text-gray-600 font-mono">
                {step + 1} / {SLIDE_COUNT}
              </span>

              <button
                onClick={goNext}
                className="flex items-center gap-1 px-4 py-2 text-sm sm:text-base font-medium rounded-xl transition-all duration-300 text-gray-300 hover:text-white hover:bg-white/10 active:scale-95"
              >
                {nextLabel}
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {step === PROPOSAL_STEP && (
          <motion.div
            key="step-8"
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full max-w-lg mx-auto"
          >
            <div className="absolute inset-0 grid grid-cols-6 opacity-10 pointer-events-none">
              {[...imagePaths, ...imagePaths].map((src, i) => (
                <div key={i} className="relative h-full">
                  <Image
                    src={src}
                    alt={`Memory ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="16.67vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center w-full px-4">
              <h3
                className={`text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center ${playfairDisplay.className}`}
              >
                Will you be my companion in
              </h3>
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 sm:mb-8 text-center ${playfairDisplay.className}`}
              >
                Dharma, Artha, and Kama?
              </h2>

              <Image
                src="/krishna.gif"
                alt="Krishna"
                className="rounded-xl opacity-95"
                width={160}
                height={160}
                unoptimized
              />

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 sm:mt-10 relative min-h-[120px]">
                <button
                  className="px-8 py-3 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={handleYesClick}
                >
                  Yes, I will! 🥰
                </button>

                <button
                  className="px-8 py-3 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-95 transition-all duration-300 shadow-lg"
                  style={
                    noPosition
                      ? {
                          position: 'fixed',
                          top: noPosition.top,
                          left: noPosition.left,
                          zIndex: 60,
                        }
                      : {}
                  }
                  onMouseEnter={teleportNo}
                  onTouchStart={teleportNo}
                  onClick={teleportNo}
                >
                  No, I won&apos;t 😢
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === ACCEPTED_STEP && (
          <motion.div
            key="step-9"
            className={`text-2xl sm:text-3xl md:text-4xl text-center font-semibold flex flex-col justify-center items-center ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="text-red-400 text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-pulse">
              I LOVE YOU 💕
            </span>
            <Image
              src="/radhekrishna.gif"
              alt="Radha Krishna"
              className="rounded-3xl"
              width={200}
              height={200}
              unoptimized
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="fixed inset-0 w-full h-full pointer-events-none">
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
