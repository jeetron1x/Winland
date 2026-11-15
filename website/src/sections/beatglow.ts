import { audio } from '../lib/audio';
import { store } from '../lib/store';

export function setupBeatGlow(): HTMLElement {
  const glow = document.createElement('div');
  glow.className = 'beat-glow-border';
  glow.id = 'beat-glow-border';

  audio.onBeat(() => {
    if (!store.beatGlowEnabled) return;
    glow.classList.add('pulsing');
    setTimeout(() => {
      glow.classList.remove('pulsing');
    }, 120);
  });

  return glow;
}
