'use client';
import { Playfair_Display } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  display: 'swap',
  subsets: ['latin'],
});

export default function TextFooter() {
  return (
    <div className="flex flex-row justify-between items-center w-full max-w-[95vw] mx-auto mt-3 sm:mt-4 md:mt-6 px-2 sm:px-0">
      <h1
        className={`text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight ${playfairDisplay.className}`}
      >
        <span className="text-gray-400">Match</span>
        <br />
        the photos
      </h1>

      <h1
        className={`text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-right ${playfairDisplay.className}`}
      >
        to reveal
        <br />
        <span className="text-gray-400">the Surprise</span>
      </h1>
    </div>
  );
}
