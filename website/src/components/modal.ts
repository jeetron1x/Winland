import { ICONS } from '../lib/icons';
import { store } from '../lib/store';

export function renderDownloadModal(): HTMLElement {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.id = 'download-modal';

  modal.innerHTML = `
    <div class="modal-card">
      <button class="modal-close-btn" id="modal-close" aria-label="Close modal">✕</button>

      <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
        <span class="nav-island-icon" style="width:28px; height:12px;"></span>
        <h3 style="font-size:22px; font-weight:700;">Download Winland Installer</h3>
      </div>

      <p style="color:var(--text-muted); font-size:15px; margin-bottom:24px;">
        Official release <strong>v1.0.0</strong> for Windows 10 (2004+) and Windows 11. Hardware-accelerated, sub-millisecond spring dynamics.
      </p>

      <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:24px;">
        <a href="https://github.com/jeetron1x/Winland/releases/download/v1.0.0/Winland-Setup.exe" 
           class="btn btn-primary" 
           style="width:100%; font-size:16px; padding:14px; text-decoration:none;" 
           download>
          ${ICONS.download}
          <span>Download Winland-Setup.exe (v1.0.0)</span>
        </a>

        <div style="display:flex; gap:10px;">
          <a href="https://github.com/jeetron1x/Winland/releases/download/v1.0.0/Winland.msix" 
             class="btn btn-secondary" 
             style="flex:1; font-size:13px; text-decoration:none;" 
             download>
            ${ICONS.windows} MSIX Package
          </a>
          <a href="https://github.com/jeetron1x/Winland/releases/latest" 
             target="_blank" 
             rel="noopener" 
             class="btn btn-secondary" 
             style="flex:1; font-size:13px; text-decoration:none;">
            GitHub Releases ↗
          </a>
        </div>
      </div>

      <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:14px; padding:16px; margin-bottom:20px;">
        <div style="font-size:12px; font-family:var(--font-mono); color:var(--text-dim); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.1em;">Quick Verification</div>
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
          <span style="color:var(--text-muted);">Publisher:</span>
          <span style="color:var(--text-main); font-weight:600;">Jeetron1x (Verified)</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
          <span style="color:var(--text-muted);">Architecture:</span>
          <span class="badge-mono">x64 ReadyToRun</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:13px;">
          <span style="color:var(--text-muted);">Signature:</span>
          <span style="color:var(--accent);">${ICONS.check} Authenticode SHA-256</span>
        </div>
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; padding-top:14px; border-top:1px solid var(--border-color);">
        <span style="font-size:13px; color:var(--text-muted);">Open source on GitHub</span>
        <a href="https://github.com/jeetron1x/Winland" target="_blank" rel="noopener" class="star-badge-btn" style="padding:6px 12px;">
          ${ICONS.star} Star Project (<span id="modal-star-count">${store.githubStars}</span>)
        </a>
      </div>
    </div>
  `;

  // Wire up close events
  modal.querySelector('#modal-close')?.addEventListener('click', () => {
    store.setModal(false);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) store.setModal(false);
  });

  store.subscribe('modal', () => {
    if (store.isModalOpen) {
      modal.classList.add('active');
    } else {
      modal.classList.remove('active');
    }
  });

  store.subscribe('stars', () => {
    const starEl = modal.querySelector('#modal-star-count');
    if (starEl) starEl.textContent = store.githubStars.toString();
  });

  return modal;
}
