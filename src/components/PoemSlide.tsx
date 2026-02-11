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
      className={`max-w-7xl mx-auto px-6 flex flex-col md:flex-row ${
        isReverse ? 'md:flex-row-reverse' : ''
      } items-center gap-16`}
      transition={{ duration: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {/* Image */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className='relative w-72 md:w-96 aspect-square rounded-2xl overflow-hidden shadow-2xl'>
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          className='object-cover'
          unoptimized
        />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className='max-w-xl'>
        <h3 className='text-3xl font-semibold mb-8'>{slide.title}</h3>

        <p className='text-lg leading-loose text-gray-700'>{slide.content}</p>
      </motion.div>
    </motion.div>
  );
};
