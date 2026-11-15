import { ICONS } from '../lib/icons';
import { store } from '../lib/store';

export function renderFooter(): HTMLElement {
  const footerSec = document.createElement('footer');
  footerSec.id = 'download';
  footerSec.style.paddingTop = '100px';
  footerSec.style.paddingBottom = '60px';
  footerSec.style.position = 'relative';

  footerSec.innerHTML = `
    <div class="container">
      
      <!-- Big CTA Banner Grid: Download & GitHub Community -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:28px; margin-bottom:90px;">
        
        <!-- Card 1: Download Winland Installer -->
        <div class="glass" style="border-radius:28px; padding:36px; border:1px solid var(--border-color); display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
          <div style="position:absolute; top:-40px; right:-40px; width:150px; height:150px; background:var(--accent-glow); filter:blur(60px); border-radius:50%; pointer-events:none;"></div>

          <div>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
              <span class="nav-island-icon"></span>
              <span class="badge-mono">Official Installer v1.0.0</span>
            </div>
            <h3 style="font-size:28px; font-weight:800; line-height:1.2; margin-bottom:12px;">
              Ready to elevate your desktop?
            </h3>
            <p style="font-size:15px; color:var(--text-muted); line-height:1.6; margin-bottom:28px;">
              Download the digitally certified, ReadyToRun executable for Windows 10 and 11. One-click setup with automatic shortcut creation.
            </p>
          </div>

          <div>
            <a href="https://github.com/jeetron1x/Winland/releases/download/v1.0.0/Winland-Setup.exe" 
               class="btn btn-primary" 
               style="width:100%; padding:16px; font-size:16px; text-decoration:none; margin-bottom:12px;" 
               download>
              ${ICONS.download}
              <span>Download Winland Installer (.exe)</span>
            </a>

            <div style="display:flex; gap:12px; margin-bottom:20px;">
              <a href="https://github.com/jeetron1x/Winland/releases/download/v1.0.0/Winland.msix" 
                 class="btn btn-secondary" 
                 style="flex:1; font-size:13px; text-decoration:none; padding:10px;" 
                 download>
                ${ICONS.windows} MSIX Package
              </a>
              <a href="https://github.com/jeetron1x/Winland/releases/latest" 
                 target="_blank" 
                 rel="noopener" 
                 class="btn btn-secondary" 
                 style="flex:1; font-size:13px; text-decoration:none; padding:10px;">
                All Releases ↗
              </a>
            </div>

            <!-- 3-Step Setup Walkthrough -->
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; border-top:1px solid var(--border-color); padding-top:16px;">
              <div style="font-size:11px; color:var(--text-dim);">
                <strong style="color:var(--text-main); display:block; margin-bottom:2px;">1. Download</strong>
                Grab Winland-Setup.exe
              </div>
              <div style="font-size:11px; color:var(--text-dim);">
                <strong style="color:var(--text-main); display:block; margin-bottom:2px;">2. Run</strong>
                Certified by Jeetron1x
              </div>
              <div style="font-size:11px; color:var(--text-dim);">
                <strong style="color:var(--text-main); display:block; margin-bottom:2px;">3. Enjoy</strong>
                Instant Island launch
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: Star Winland on GitHub -->
        <div class="glass" style="border-radius:28px; padding:36px; border:1px solid var(--border-color); display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
          <div style="position:absolute; top:-40px; right:-40px; width:150px; height:150px; background:rgba(245,158,11,0.25); filter:blur(60px); border-radius:50%; pointer-events:none;"></div>

          <div>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
              <span style="color:#fbbf24;">${ICONS.star}</span>
              <span class="badge-mono">Open Source Community</span>
            </div>
            <h3 style="font-size:28px; font-weight:800; line-height:1.2; margin-bottom:12px;">
              Star the project on GitHub.
            </h3>
            <p style="font-size:15px; color:var(--text-muted); line-height:1.6; margin-bottom:28px;">
              Winland is free and open-source. Starring the repository helps us grow, supports independent Windows software development, and keeps you notified of upcoming updates.
            </p>
          </div>

          <div>
            <a href="https://github.com/jeetron1x/Winland" 
               target="_blank" 
               rel="noopener" 
               class="btn btn-secondary" 
               style="width:100%; padding:16px; font-size:16px; text-decoration:none; margin-bottom:16px; justify-content:center; gap:10px; border-color:rgba(251,191,36,0.35);">
              ${ICONS.github}
              <span>Star Winland on GitHub</span>
              <span class="star-count-pill" id="footer-star-count" style="font-size:13px; padding:3px 8px; background:rgba(251,191,36,0.2); color:#fbbf24;">★ ${store.githubStars}</span>
            </a>

            <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:14px; padding:14px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">
              <span style="color:var(--text-dim);">Repository:</span>
              <a href="https://github.com/jeetron1x/Winland" target="_blank" rel="noopener" style="color:var(--accent); text-decoration:none; font-family:var(--font-mono);">
                github.com/jeetron1x/Winland
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Links and Copyright -->
      <div style="border-top:1px solid var(--border-color); padding-top:40px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="nav-island-icon"></span>
          <span style="font-weight:700; font-size:16px;">Winland</span>
          <span style="color:var(--text-dim); font-size:13px; margin-left:8px;">Crafted by <strong>Jeetron1x</strong></span>
        </div>

        <div style="display:flex; gap:24px; font-size:13px; color:var(--text-muted);">
          <a href="https://github.com/jeetron1x/Winland/blob/main/LICENSE" target="_blank" rel="noopener" style="color:inherit; text-decoration:none;">MIT License</a>
          <a href="#privacy" style="color:inherit; text-decoration:none;">Privacy Policy</a>
          <a href="https://github.com/jeetron1x/Winland/releases" target="_blank" rel="noopener" style="color:inherit; text-decoration:none;">Changelog</a>
          <a href="https://github.com/jeetron1x/Winland" target="_blank" rel="noopener" style="color:var(--accent); text-decoration:none;">Star on GitHub ★</a>
        </div>
      </div>

      <div style="margin-top:20px; font-size:12px; color:var(--text-dim); text-align:center;">
        Designed for Windows 10 (2004+) and Windows 11. Winland is an independent project and is not affiliated with Microsoft Corporation.
      </div>
    </div>
  `;

  store.subscribe('stars', () => {
    const starEl = footerSec.querySelector('#footer-star-count');
    if (starEl) starEl.textContent = `★ ${store.githubStars}`;
  });

  return footerSec;
}
