import { ICONS } from '../lib/icons';
import { store } from '../lib/store';

export function renderNav(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'site-nav glass-pill';
  nav.id = 'site-nav';

  nav.innerHTML = `
    <a href="#" class="nav-logo">
      <span class="nav-island-icon"></span>
      <span>Winland</span>
    </a>

    <ul class="nav-links">
      <li><a href="#island" class="nav-link">Island</a></li>
      <li><a href="#spectrum" class="nav-link">Spectrum</a></li>
      <li><a href="#widgets" class="nav-link">Widgets</a></li>
      <li><a href="#taskbar" class="nav-link">Taskbar</a></li>
      <li><a href="#looks" class="nav-link">Looks</a></li>
      <li><a href="#settings" class="nav-link">Settings</a></li>
      <li><a href="#more" class="nav-link">More</a></li>
      <li><a href="#faq" class="nav-link">FAQ</a></li>
    </ul>

    <div class="nav-actions">
      <a href="https://github.com/jeetron1x/Winland" target="_blank" rel="noopener" class="star-badge-btn" title="Star Winland on GitHub">
        ${ICONS.github}
        <span>Star</span>
        <span class="star-count-pill" id="nav-star-count">${store.githubStars}</span>
      </a>

      <button class="btn btn-primary nav-download-btn" id="nav-download-trigger" title="Download Winland Installer">
        ${ICONS.download}
        <span>Installer</span>
      </button>
    </div>

    <div class="nav-progress-bar">
      <div class="nav-progress-indicator" id="nav-progress-indicator"></div>
    </div>
  `;

  // Update star count dynamically when fetched
  store.subscribe('stars', () => {
    const starEl = nav.querySelector('#nav-star-count');
    if (starEl) starEl.textContent = store.githubStars.toString();
  });

  // Open download modal on click
  nav.querySelector('#nav-download-trigger')?.addEventListener('click', () => {
    store.setModal(true);
  });

  // Scroll spy & progress
  window.addEventListener('scroll', () => {
    const winHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = winHeight > 0 ? (window.scrollY / winHeight) * 100 : 0;
    const bar = nav.querySelector('#nav-progress-indicator') as HTMLElement;
    if (bar) bar.style.width = `${progress}%`;

    const sections = document.querySelectorAll('section[id]');
    let currentId = '';
    sections.forEach(sec => {
      const top = (sec as HTMLElement).offsetTop - 180;
      if (window.scrollY >= top) {
        currentId = sec.getAttribute('id') || '';
      }
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  return nav;
}
