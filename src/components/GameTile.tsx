'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface GameTileProps {
  imageSrc: string;
  index: number;
  isFaceUp: boolean;
  isIncorrect: boolean;
  onClick: () => void;
}

export default function GameTile({
  imageSrc,
  index,
  isFaceUp,
  isIncorrect,
  onClick,
}: GameTileProps) {
  return (
    <motion.div
      className="relative cursor-pointer w-full h-full"
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      style={{ perspective: '800px' }}
    >
      {!isFaceUp && (
        <motion.div
          className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 rounded-sm lg:rounded-md absolute inset-0 z-10"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFaceUp ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ backfaceVisibility: 'hidden' }}
        />
      )}

      {isFaceUp && (
        <motion.div
          className="w-full h-full absolute inset-0"
          initial={{ rotateY: -180 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 0.4 }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image
            src={imageSrc}
            alt={`Photo ${index + 1}`}
            fill
            sizes="(max-width: 640px) 8vw, (max-width: 768px) 7vw, (max-width: 1024px) 6vw, 80px"
            className="rounded-sm lg:rounded-md object-cover"
            unoptimized
          />
        </motion.div>
      )}

      {isIncorrect && (
        <motion.div
          className="absolute inset-0 z-20 rounded-sm lg:rounded-md bg-red-500/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.div>
  );
}
