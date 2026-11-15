import { ICONS } from '../lib/icons';
import { store } from '../lib/store';

export function renderHero(): HTMLElement {
  const hero = document.createElement('section');
  hero.className = 'hero-section container';
  hero.id = 'hero';

  hero.innerHTML = `
    <div class="hero-pill-badge">
      <span class="nav-island-icon"></span>
      <span>Winland v1.0.0 is now live for Windows 10 & 11</span>
    </div>

    <h1 class="hero-title">
      Your PC, with an island.
    </h1>

    <p class="hero-subtitle">
      Music, live widgets, and system status right at the top edge of your desktop. Fluid, private, and out of your way until you need it.
    </p>

    <div class="hero-buttons">
      <button class="btn btn-primary" id="hero-download-btn" style="padding:14px 28px; font-size:16px;">
        ${ICONS.download}
        <span>Download Winland Installer</span>
      </button>

      <a href="https://github.com/jeetron1x/Winland" target="_blank" rel="noopener" class="btn btn-secondary" style="padding:14px 24px; font-size:16px;">
        ${ICONS.github}
        <span>Star on GitHub</span>
        <span class="badge-mono" id="hero-star-badge" style="margin-left:6px;">★ <span id="hero-star-count">${store.githubStars}</span></span>
      </a>

      <a href="#island" class="btn btn-ghost" style="padding:14px 20px; font-size:15px;">
        <span>Explore Island</span>
        ${ICONS.chevronDown}
      </a>
    </div>

    <!-- Desktop Simulator -->
    <div class="desktop-simulator glass" id="hero-simulator">
      <div class="sim-top-bar">
        <!-- Live Island Demo in Hero -->
        <div class="island-ui state-resting surface-glass" id="hero-island-interactive" title="Click or hover to interact with the island">
          <div class="island-content-resting" style="display:flex; align-items:center; width:100%; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="color:var(--accent);">${ICONS.music}</span>
              <span style="font-size:12px; font-weight:500;">Midnight Horizon</span>
            </div>
            <div style="display:flex; gap:2px; align-items:flex-end; height:12px;">
              <span class="hero-bar" style="width:2px; height:8px; background:var(--accent); border-radius:1px;"></span>
              <span class="hero-bar" style="width:2px; height:12px; background:var(--accent); border-radius:1px;"></span>
              <span class="hero-bar" style="width:2px; height:6px; background:var(--accent); border-radius:1px;"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Weather Card -->
      <div class="sim-float-card sim-weather-card glass" id="sim-weather">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted); font-size:13px;">San Francisco</span>
          <span style="color:#fbbf24;">${ICONS.sun}</span>
        </div>
        <div style="font-size:24px; font-weight:700; color:var(--text-main);">72°F</div>
        <div style="font-size:12px; color:var(--text-dim);">Clear sky · 0% rain</div>
      </div>

      <!-- Floating Hardware Stats Card -->
      <div class="sim-float-card sim-hardware-card glass" id="sim-hardware">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
          <span style="font-size:13px; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
            ${ICONS.cpu} System Load
          </span>
          <span class="badge-mono" style="font-size:11px; color:#10b981;">Optimal</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
          <span style="color:var(--text-dim);">CPU 3.8 GHz</span>
          <span style="color:var(--text-main); font-weight:600;">14%</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:12px;">
          <span style="color:var(--text-dim);">Memory (DDR5)</span>
          <span style="color:var(--text-main); font-weight:600;">4.2 / 32 GB</span>
        </div>
      </div>

      <!-- Hint in bottom corner of simulator -->
      <div style="position:absolute; bottom:18px; left:24px; font-size:12px; color:var(--text-dim); font-family:var(--font-mono);">
        Hover or click the island above to preview state transitions
      </div>
    </div>
  `;

  // Hero Download trigger
  hero.querySelector('#hero-download-btn')?.addEventListener('click', () => {
    store.setModal(true);
  });

  // Subscribe to star count changes
  store.subscribe('stars', () => {
    const starCount = hero.querySelector('#hero-star-count');
    if (starCount) starCount.textContent = store.githubStars.toString();
  });

  // Interactive island click cycling: resting -> peek -> expanded -> resting
  const island = hero.querySelector('#hero-island-interactive') as HTMLElement;
  const states: Array<'state-resting' | 'state-peek' | 'state-expanded'> = [
    'state-resting',
    'state-peek',
    'state-expanded'
  ];
  let curStateIdx = 0;

  const updateIslandDisplay = (idx: number) => {
    curStateIdx = idx;
    island.classList.remove('state-resting', 'state-peek', 'state-expanded');
    island.classList.add(states[curStateIdx]);

    if (curStateIdx === 0) {
      island.innerHTML = `
        <div style="display:flex; align-items:center; width:100%; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="color:var(--accent);">${ICONS.music}</span>
            <span style="font-size:12px; font-weight:500;">Midnight Horizon</span>
          </div>
          <div style="display:flex; gap:2px; align-items:flex-end; height:12px;">
            <span class="hero-bar" style="width:2px; height:8px; background:var(--accent); border-radius:1px;"></span>
            <span class="hero-bar" style="width:2px; height:12px; background:var(--accent); border-radius:1px;"></span>
            <span class="hero-bar" style="width:2px; height:6px; background:var(--accent); border-radius:1px;"></span>
          </div>
        </div>
      `;
    } else if (curStateIdx === 1) {
      island.innerHTML = `
        <div style="display:flex; align-items:center; width:100%; justify-content:space-between; gap:12px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:26px; height:26px; border-radius:6px; background:linear-gradient(135deg, #00f2fe, #4facfe); display:flex; align-items:center; justify-content:center; color:#000;">
              ${ICONS.music}
            </div>
            <div>
              <div style="font-size:12px; font-weight:600; line-height:1.2;">Midnight Horizon</div>
              <div style="font-size:11px; color:var(--text-dim); line-height:1;">Jeetron1x · Lyriic</div>
            </div>
          </div>
          <div style="font-size:12px; font-family:var(--font-mono); color:var(--accent);">1:42 / 3:18</div>
        </div>
      `;
    } else {
      island.innerHTML = `
        <div style="display:flex; align-items:center; width:100%; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:48px; height:48px; border-radius:10px; background:linear-gradient(135deg, #00f2fe, #4facfe); display:flex; align-items:center; justify-content:center; color:#000; font-size:22px;">
              ${ICONS.music}
            </div>
            <div>
              <div style="font-size:14px; font-weight:700;">Midnight Horizon</div>
              <div style="font-size:12px; color:var(--text-dim);">Jeetron1x · High-Res WASAPI</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button style="background:none; border:none; color:var(--text-muted); cursor:pointer;">${ICONS.skipForward}</button>
            <button style="width:34px; height:34px; border-radius:50%; background:var(--accent); border:none; color:#000; display:flex; align-items:center; justify-content:center; cursor:pointer;">
              ${ICONS.pause}
            </button>
          </div>
        </div>
        <div style="width:100%;">
          <div style="height:4px; width:100%; background:rgba(255,255,255,0.15); border-radius:2px; overflow:hidden; margin-bottom:6px;">
            <div style="height:100%; width:48%; background:var(--accent); border-radius:2px;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:11px; font-family:var(--font-mono); color:var(--text-dim);">
            <span>1:42</span>
            <span>3:18</span>
          </div>
        </div>
      `;
    }
  };

  island.addEventListener('click', () => {
    updateIslandDisplay((curStateIdx + 1) % states.length);
  });

  // Parallax on mouse movement over simulator
  const sim = hero.querySelector('#hero-simulator') as HTMLElement;
  const weatherCard = hero.querySelector('#sim-weather') as HTMLElement;
  const hardwareCard = hero.querySelector('#sim-hardware') as HTMLElement;

  sim?.addEventListener('mousemove', (e) => {
    const rect = sim.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (weatherCard) {
      weatherCard.style.transform = `translate(${x * 16}px, ${y * 16}px)`;
    }
    if (hardwareCard) {
      hardwareCard.style.transform = `translate(${x * -16}px, ${y * -16}px)`;
    }
  });

  sim?.addEventListener('mouseleave', () => {
    if (weatherCard) weatherCard.style.transform = 'translate(0, 0)';
    if (hardwareCard) hardwareCard.style.transform = 'translate(0, 0)';
  });

  return hero;
}
