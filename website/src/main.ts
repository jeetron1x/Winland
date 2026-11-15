import './style.css';
import { setupBeatGlow } from './sections/beatglow';
import { renderOpening } from './sections/opening';
import { renderNav } from './components/nav';
import { renderHero } from './sections/hero';
import { renderIsland } from './sections/island';
import { renderSpectrum } from './sections/spectrum';
import { renderWidgets } from './sections/widgets';
import { renderTaskbar } from './sections/taskbar';
import { renderLooks } from './sections/looks';
import { renderSettings } from './sections/settings';
import { renderMore } from './sections/more';
import { renderPrivacy } from './sections/privacy';
import { renderFAQ } from './sections/faq';
import { renderFooter } from './sections/footer';
import { renderDownloadModal } from './components/modal';
import { store } from './lib/store';

function initApp() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  // Set initial theme
  document.documentElement.setAttribute('data-theme', store.look);

  // Background noise overlay
  const noise = document.createElement('div');
  noise.className = 'noise-overlay';
  document.body.appendChild(noise);

  // Beat glow border
  const beatGlow = setupBeatGlow();
  document.body.appendChild(beatGlow);

  // Opening sequence
  const opening = renderOpening();
  document.body.appendChild(opening);

  // Sticky navigation
  const nav = renderNav();
  document.body.appendChild(nav);

  // Main page sections
  app.appendChild(renderHero());
  app.appendChild(renderIsland());
  app.appendChild(renderSpectrum());
  app.appendChild(renderWidgets());
  app.appendChild(renderTaskbar());
  app.appendChild(renderLooks());
  app.appendChild(renderSettings());
  app.appendChild(renderMore());
  app.appendChild(renderPrivacy());
  app.appendChild(renderFAQ());
  app.appendChild(renderFooter());

  // Download modal
  const modal = renderDownloadModal();
  document.body.appendChild(modal);
}

document.addEventListener('DOMContentLoaded', initApp);
