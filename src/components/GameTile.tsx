'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface GameTileProps {
  imageSrc: string;
  index: number;
  isFaceUp: boolean;
  onClick: () => void;
}

export default function GameTile({
  imageSrc,
  index,
  isFaceUp,
  onClick,
}: GameTileProps) {
  return (
    <motion.div
      className="relative cursor-pointer w-full h-full"
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      style={{ perspective: '800px' }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFaceUp ? 0 : 180 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0"
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
        </div>

        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 rounded-sm lg:rounded-md" />
        </div>
      </motion.div>
    </motion.div>
  );
}
