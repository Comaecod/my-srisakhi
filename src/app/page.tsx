'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoPairGame from '@/components/PhotoPairGame';
import ValentinesProposal from '@/components/ValentinesProposal';
import TextFooter from '@/components/TextFooter';
import OrientationGuard from '@/components/OrientationGuard';
import ConsoleInjector from '@/components/ConsoleInjector';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  const [showProposal, setShowProposal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleShowProposal = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => setShowProposal(true), 1000);
  }, []);

  return (
    <OrientationGuard>
      <main className="flex items-center justify-center min-h-screen min-h-dvh bg-black overflow-hidden relative">
        <AnimatePresence mode="wait">
          {!showProposal ? (
            <motion.div
              key="game"
              initial={{ opacity: 1 }}
              animate={{ opacity: isTransitioning ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center justify-center w-full px-2 sm:px-4"
            >
              <PhotoPairGame handleShowProposal={handleShowProposal} />
              <TextFooter />
            </motion.div>
          ) : (
            <motion.div
              key="proposal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-full"
            >
              <ValentinesProposal />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <MusicPlayer />
      <ConsoleInjector />
    </OrientationGuard>
  );
}
