'use client';

import { useEffect } from 'react';

let consoleShown = false;

export default function ConsoleInjector() {
  useEffect(() => {
    if (consoleShown) return;
    consoleShown = true;

    console.info(`
    💘 Developer Shortcuts Available 💘

    skipPhotoPairGame() → Skips photo matching game
    fastForward()       → Move one step forward
    goToProposal()      → Jump to Yes/No proposal page
    acceptDirectly()    → Instantly accept + fireworks

    Type any of these in the console.
`);
  }, []);

  return null;
}
