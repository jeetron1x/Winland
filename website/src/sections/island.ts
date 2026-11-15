import { ICONS } from '../lib/icons';
import { store, IslandShape, IslandSurface } from '../lib/store';

export function renderIsland(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'container';
  section.id = 'island';

  section.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Interactive Architecture</span>
      <h2 class="section-title">Hang it from the top edge.</h2>
      <p class="section-desc">Hover to peek, click to expand. Sub-millisecond spring dynamics designed natively for Windows 10 and 11.</p>
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(360px, 1fr)); gap:48px; align-items:center;">
      <!-- Left: Step Explainer -->
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div class="card island-step-card active" data-step="0" style="cursor:pointer; border-left:4px solid var(--accent);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <h4 style="font-size:17px; font-weight:700;">1. Resting Pill</h4>
            <span class="badge-mono">Idle State</span>
          </div>
          <p style="font-size:14px; color:var(--text-muted);">
            Sits gracefully at the top center. Ultra-minimal 32px height that leaves your app titlebars clean and accessible.
          </p>
        </div>

        <div class="card island-step-card" data-step="1" style="cursor:pointer;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <h4 style="font-size:17px; font-weight:700;">2. Hover Peek</h4>
            <span class="badge-mono">Quick Glance</span>
          </div>
          <p style="font-size:14px; color:var(--text-muted);">
            Brings active track info, incoming notifications, or download progress into view with a smooth 120 FPS spring.
          </p>
        </div>

        <div class="card island-step-card" data-step="2" style="cursor:pointer;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <h4 style="font-size:17px; font-weight:700;">3. Expanded Media & Visualizer</h4>
            <span class="badge-mono">Full Player</span>
          </div>
          <p style="font-size:14px; color:var(--text-muted);">
            Unfolds high-res album artwork, interactive timeline scrubber, and real-time WASAPI audio frequency spectrum.
          </p>
        </div>

        <div class="card island-step-card" data-step="3" style="cursor:pointer;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <h4 style="font-size:17px; font-weight:700;">4. Quick Controls & Status</h4>
            <span class="badge-mono">Control Hub</span>
          </div>
          <p style="font-size:14px; color:var(--text-muted);">
            Instant toggles for system volume, microphone mute, focus session, and brightness sliders.
          </p>
        </div>
      </div>

      <!-- Right: Live Island Component & Material Controls -->
      <div style="display:flex; flex-direction:column; align-items:center;">
        <div class="glass" style="width:100%; min-height:360px; border-radius:24px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px; position:relative; overflow:hidden; background:radial-gradient(circle at 50% 0%, rgba(0,242,254,0.08) 0%, rgba(0,0,0,0.5) 75%);">
          <!-- The Island -->
          <div class="island-ui state-resting surface-glass" id="island-demo-interactive" style="margin-bottom:20px;">
            <!-- Rendered dynamically -->
          </div>

          <div style="font-size:12px; color:var(--text-dim); font-family:var(--font-mono); margin-top:20px;">
            Try switching shape & surface materials below:
          </div>
        </div>

        <!-- Material & Shape Toggles -->
        <div style="display:flex; gap:20px; margin-top:24px; flex-wrap:wrap; justify-content:center; width:100%;">
          <!-- Shape Switcher -->
          <div style="display:flex; align-items:center; gap:8px; background:var(--bg-surface); padding:4px 8px; border-radius:9999px; border:1px solid var(--border-color);">
            <span style="font-size:12px; color:var(--text-dim); padding-left:6px;">Shape:</span>
            <button class="btn btn-ghost shape-btn active" data-shape="island" style="padding:4px 12px; font-size:13px;">Island</button>
            <button class="btn btn-ghost shape-btn" data-shape="notch" style="padding:4px 12px; font-size:13px;">Notch</button>
          </div>

          <!-- Surface Switcher -->
          <div style="display:flex; align-items:center; gap:8px; background:var(--bg-surface); padding:4px 8px; border-radius:9999px; border:1px solid var(--border-color);">
            <span style="font-size:12px; color:var(--text-dim); padding-left:6px;">Surface:</span>
            <button class="btn btn-ghost surface-btn active" data-surface="glass" style="padding:4px 10px; font-size:13px;">Glass</button>
            <button class="btn btn-ghost surface-btn" data-surface="graphite" style="padding:4px 10px; font-size:13px;">Graphite</button>
            <button class="btn btn-ghost surface-btn" data-surface="acrylic" style="padding:4px 10px; font-size:13px;">Acrylic</button>
            <button class="btn btn-ghost surface-btn" data-surface="black" style="padding:4px 10px; font-size:13px;">Black</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const islandEl = section.querySelector('#island-demo-interactive') as HTMLElement;
  let activeStep = 0;

  const renderStepContent = (step: number) => {
    activeStep = step;
    islandEl.className = `island-ui surface-${store.islandSurface} ${store.islandShape === 'notch' ? 'notch' : ''}`;

    if (step === 0) {
      islandEl.classList.add('state-resting');
      islandEl.innerHTML = `
        <div style="display:flex; align-items:center; width:100%; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="color:var(--accent); font-size:12px;">●</span>
            <span style="font-size:12px; font-weight:500;">Winland Idle</span>
          </div>
          <span style="font-size:11px; font-family:var(--font-mono); color:var(--text-dim);">18°C</span>
        </div>
      `;
    } else if (step === 1) {
      islandEl.classList.add('state-peek');
      islandEl.innerHTML = `
        <div style="display:flex; align-items:center; width:100%; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:24px; height:24px; border-radius:6px; background:var(--accent); display:flex; align-items:center; justify-content:center; color:#000;">
              ${ICONS.music}
            </div>
            <div style="font-size:12px; font-weight:600;">Midnight Horizon</div>
          </div>
          <span class="badge-mono" style="font-size:11px;">Lyriic</span>
        </div>
      `;
    } else if (step === 2) {
      islandEl.classList.add('state-expanded');
      islandEl.innerHTML = `
        <div style="display:flex; align-items:center; width:100%; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:46px; height:46px; border-radius:8px; background:linear-gradient(135deg, var(--accent), var(--accent-secondary)); display:flex; align-items:center; justify-content:center; color:#000;">
              ${ICONS.music}
            </div>
            <div>
              <div style="font-size:14px; font-weight:700;">Midnight Horizon</div>
              <div style="font-size:11px; color:var(--text-dim);">Jeetron1x · WASAPI 64-band</div>
            </div>
          </div>
          <div style="display:flex; gap:6px;">
            <button style="width:32px; height:32px; border-radius:50%; background:var(--accent); border:none; color:#000; display:flex; align-items:center; justify-content:center; cursor:pointer;">
              ${ICONS.pause}
            </button>
          </div>
        </div>
        <div style="width:100%;">
          <div style="height:4px; width:100%; background:rgba(255,255,255,0.15); border-radius:2px; overflow:hidden; margin-bottom:6px;">
            <div style="height:100%; width:62%; background:var(--accent);"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:11px; font-family:var(--font-mono); color:var(--text-dim);">
            <span>2:08</span>
            <span>3:18</span>
          </div>
        </div>
      `;
    } else if (step === 3) {
      islandEl.classList.add('state-expanded');
      islandEl.innerHTML = `
        <div style="display:flex; width:100%; justify-content:space-between; align-items:center;">
          <div style="font-size:13px; font-weight:600; display:flex; align-items:center; gap:6px;">
            ${ICONS.sparkles} Quick Controls
          </div>
          <span class="badge-mono">Desktop Hub</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; width:100%;">
          <div style="background:var(--bg-surface); padding:8px 12px; border-radius:10px; display:flex; align-items:center; justify-content:space-between;">
            <span style="font-size:12px; color:var(--text-muted);">Mic</span>
            <span style="color:#10b981; font-size:12px;">Active</span>
          </div>
          <div style="background:var(--bg-surface); padding:8px 12px; border-radius:10px; display:flex; align-items:center; justify-content:space-between;">
            <span style="font-size:12px; color:var(--text-muted);">Volume</span>
            <span style="font-size:12px; font-family:var(--font-mono);">70%</span>
          </div>
        </div>
      `;
    }

    // Update active step card on left
    section.querySelectorAll('.island-step-card').forEach((card, idx) => {
      if (idx === step) {
        card.classList.add('active');
        (card as HTMLElement).style.borderLeft = '4px solid var(--accent)';
      } else {
        card.classList.remove('active');
        (card as HTMLElement).style.borderLeft = '1px solid var(--border-color)';
      }
    });
  };

  renderStepContent(0);

  // Click on left step cards
  section.querySelectorAll('.island-step-card').forEach(card => {
    card.addEventListener('click', () => {
      const s = parseInt(card.getAttribute('data-step') || '0', 10);
      renderStepContent(s);
    });
  });

  // Shape toggles
  section.querySelectorAll('.shape-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      section.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const shape = btn.getAttribute('data-shape') as IslandShape;
      store.setIslandShape(shape);
      renderStepContent(activeStep);
    });
  });

  // Surface toggles
  section.querySelectorAll('.surface-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      section.querySelectorAll('.surface-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const surf = btn.getAttribute('data-surface') as IslandSurface;
      store.setIslandSurface(surf);
      renderStepContent(activeStep);
    });
  });

  return section;
}
