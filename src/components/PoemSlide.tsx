'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { type slides } from '@/constants';

export const PoemSlide = ({
  slide,
  index,
}: {
  slide: (typeof slides)[number];
  index: number;
}) => {
  const isReverse = index % 2 !== 0;

  return (
    <motion.div
      key={`step-${index}`}
      className={`cursor-pointer max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row ${
        isReverse ? 'md:flex-row-reverse' : ''
      } items-center gap-10 md:gap-16`}
      transition={{ duration: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className='relative w-64 sm:w-72 md:w-96 aspect-square rounded-2xl overflow-hidden shadow-xl'>
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          className='object-cover'
          unoptimized
        />
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className='max-w-xl text-center md:text-left'>
        <h3 className='text-2xl md:text-3xl font-medium mb-6'>{slide.title}</h3>

        <p className='text-base md:text-lg leading-[1.9] md:leading-[2.2] text-gray-300'>
          {slide.content}
        </p>
      </motion.div>
    </motion.div>
  );
};
