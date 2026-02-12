'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function OrientationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      // Allow only desktop screens (lg and above)
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  if (!isDesktop) {
    return (
      <div className='fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-center p-8'>
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className='mb-6 text-6xl'>
          🖥️
        </motion.div>

        <h2 className='text-3xl font-bold text-white mb-4'>
          You’re almost there, Radha 💫
        </h2>

        <p className='text-gray-400 text-lg max-w-xs'>
          This treasure reveals itself only on a bigger screen. Grab a{' '}
          <b>laptop or desktop</b> and continue your adventure…
          <br />
          <br />
          <span className='inline-block px-4 py-2 rounded-lg bg-pink-500/10 text-pink-400 font-mono tracking-wide border border-pink-500/30 hover:bg-pink-500/20 transition-all duration-300'>
            my-srisakhi.vercel.app
          </span>
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

/* "use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OrientationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Detects if we're in portrait mode
      const portrait =
        window.innerHeight > window.innerWidth && window.innerWidth < 1024;
      setIsPortrait(portrait);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (isPortrait) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-center p-8">
        <motion.div
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <svg
            className="w-20 h-20 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Rotate your device
        </h2>
        <p className="text-gray-400 text-lg max-w-xs">
          To be able to play correctly, you need to put your phone in{" "}
          <b>landscape mode</b>.
        </p>
      </div>
    );
  }

  return <>{children}</>;
} */
