import { ICONS } from '../lib/icons';

export function renderPrivacy(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'container';
  section.id = 'privacy';

  section.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Privacy Architecture</span>
      <h2 class="section-title">Free. No account. No tracking.</h2>
      <p class="section-desc">
        Your desktop belongs to you. Winland has zero analytics, zero telemetry servers, and runs entirely in local user space.
      </p>
    </div>

    <div class="cards-grid" style="grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));">
      
      <div class="card" style="border-top:3px solid #10b981;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
          <span style="color:#10b981;">${ICONS.shield}</span>
          <h3 style="font-size:18px; font-weight:700;">100% Offline Audio Processing</h3>
        </div>
        <p style="font-size:14px; color:var(--text-muted); line-height:1.6;">
          Audio frequency spectrum extraction uses native Windows WASAPI loopback directly on your GPU/CPU. No audio buffers or microphone streams ever leave your computer.
        </p>
      </div>

      <div class="card" style="border-top:3px solid var(--accent);">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
          <span style="color:var(--accent);">${ICONS.sparkles}</span>
          <h3 style="font-size:18px; font-weight:700;">Zero Cloud Accounts or Telemetry</h3>
        </div>
        <p style="font-size:14px; color:var(--text-muted); line-height:1.6;">
          No email registration, no sign-in modals, no Google Analytics, and no background crash reporting pings. All configuration is stored locally in <code class="badge-mono">%LOCALAPPDATA%</code>.
        </p>
      </div>

      <div class="card" style="border-top:3px solid var(--accent-secondary);">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
          <span style="color:var(--accent-secondary);">${ICONS.check}</span>
          <h3 style="font-size:18px; font-weight:700;">Clean One-Click Uninstall</h3>
        </div>
        <p style="font-size:14px; color:var(--text-muted); line-height:1.6;">
          No hidden services or registry hooks left behind. Standard Windows Settings &gt; Installed Apps or direct <code class="badge-mono">Uninstall.exe</code> uninstalls everything cleanly.
        </p>
      </div>

    </div>
  `;

  return section;
}
