'use client';

import { motion } from 'framer-motion';

interface SkipTileProps {
  onClick: () => void;
  visible: boolean;
}

export default function SkipTile({ onClick, visible }: SkipTileProps) {
  return (
    <motion.div
      className="w-full h-full bg-gradient-to-br from-pink-600 to-rose-700 rounded-sm lg:rounded-md flex items-center justify-center cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        visible
          ? {
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1.05, 0.95],
            }
          : { opacity: 0, scale: 0.8 }
      }
      transition={
        visible
          ? {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : { duration: 0.3 }
      }
    >
      <span className="text-white font-bold text-[1.8vw] sm:text-[1.4vw] md:text-[1vw] lg:text-xs select-none leading-none text-center px-0.5">
        SKIP ▶
      </span>
    </motion.div>
  );
}
