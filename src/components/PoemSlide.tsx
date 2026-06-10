'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { type slides } from '@/constants';

interface PoemSlideProps {
  slide: (typeof slides)[number];
  index: number;
  secondsLeft: number;
}

export default function PoemSlide({ slide, index, secondsLeft }: PoemSlideProps) {
  return (
    <motion.div
      key={`step-${index}`}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-16"
      transition={{ duration: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-xl shrink-0"
      >
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 384px"
          unoptimized
        />
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-xl text-center"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 sm:mb-6">
          {slide.title}
        </h3>

        <p className="text-sm sm:text-base md:text-lg leading-loose text-gray-300">
          {slide.content}
        </p>

        <div className="mt-4 sm:mt-6 text-xs text-gray-500 font-mono tracking-wide">
          {secondsLeft > 0 && `${secondsLeft}s`}
        </div>
      </motion.div>
    </motion.div>
  );
}
