'use client';

import { useEffect } from 'react';

export default function ConsoleInjector() {
  useEffect(() => {
    // Prevent multiple logs (in case of fast refresh)
    if ((window as any).__valentineConsoleShown) return;

    console.info(`
    💘 Developer Shortcuts Available 💘

    skipPhotoPairGame() → Skips photo matching game
    fastForward()       → Move one step forward
    goToProposal()      → Jump to Yes/No proposal page
    acceptDirectly()    → Instantly accept + fireworks

    Type any of these in the console.
`);

    (window as any).__valentineConsoleShown = true;
  }, []);

  return null;
}
