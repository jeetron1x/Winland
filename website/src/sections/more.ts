import { ICONS } from '../lib/icons';

export function renderMore(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'container';
  section.id = 'more';

  section.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Utility Ecosystem</span>
      <h2 class="section-title">Small things, done well.</h2>
      <p class="section-desc">
        Clipboard history, file shelf, instant mic mute, and quick phone sharing. Everything integrated into your daily workflow.
      </p>
    </div>

    <div class="cards-grid" style="grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));">
      
      <!-- Card 1: Clipboard History -->
      <div class="card tilt-card" id="card-clipboard">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h4 style="font-size:16px; font-weight:700;">📋 Clipboard History</h4>
          <span class="badge-mono">Win + V</span>
        </div>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">
          Click any snippet to copy it directly into your clipboard:
        </p>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div class="clip-snippet" style="background:var(--bg-surface); padding:8px 12px; border-radius:10px; font-size:12px; font-family:var(--font-mono); border:1px solid var(--border-color); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>git clone https://...</span>
            <span class="clip-copied-badge" style="color:#10b981; font-size:11px; display:none;">Copied!</span>
          </div>
          <div class="clip-snippet" style="background:var(--bg-surface); padding:8px 12px; border-radius:10px; font-size:12px; font-family:var(--font-mono); border:1px solid var(--border-color); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>#00f2fe (Vibrant Cyan)</span>
            <span class="clip-copied-badge" style="color:#10b981; font-size:11px; display:none;">Copied!</span>
          </div>
        </div>
      </div>

      <!-- Card 2: Instant Mic Mute -->
      <div class="card tilt-card" id="card-mic">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h4 style="font-size:16px; font-weight:700;">🎙️ Global Mic Mute</h4>
          <span class="badge-mono">Press 'M'</span>
        </div>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">
          Hardware-level microphone toggle. Press the <strong>M</strong> key on this page or click below:
        </p>
        <button id="mic-toggle-btn" class="btn btn-secondary" style="width:100%; display:flex; gap:8px; justify-content:center; align-items:center;">
          <span id="mic-icon">${ICONS.mic}</span>
          <span id="mic-text">Microphone Unmuted</span>
        </button>
      </div>

      <!-- Card 3: File Shelf -->
      <div class="card tilt-card" id="card-shelf">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h4 style="font-size:16px; font-weight:700;">📦 File Shelf</h4>
          <span class="badge-mono">Drag & Drop</span>
        </div>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">
          Stash files in the island while switching full-screen apps or virtual desktops.
        </p>
        <div style="background:var(--bg-surface); border:2px dashed var(--border-color); border-radius:12px; padding:16px; text-align:center;">
          <div style="font-size:24px; margin-bottom:4px;">📁</div>
          <div style="font-size:12px; color:var(--text-muted);">Winland-Setup.exe (Stashed)</div>
        </div>
      </div>

      <!-- Card 4: Send to Phone -->
      <div class="card tilt-card" id="card-phone">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h4 style="font-size:16px; font-weight:700;">📱 Send to Phone</h4>
          <span class="badge-mono">Local Wi-Fi</span>
        </div>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">
          Peer-to-peer file transfer without internet or cloud storage intermediaries.
        </p>
        <div style="display:flex; align-items:center; gap:12px; background:var(--bg-surface); padding:10px; border-radius:12px;">
          <div style="width:40px; height:40px; background:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px;">
            ▦
          </div>
          <div>
            <div style="font-size:12px; font-weight:600;">iPhone 16 Pro</div>
            <div style="font-size:11px; color:#10b981;">Connected (Direct Wi-Fi)</div>
          </div>
        </div>
      </div>

    </div>
  `;

  // Clipboard copy interaction
  section.querySelectorAll('.clip-snippet').forEach(snip => {
    snip.addEventListener('click', () => {
      const text = snip.querySelector('span')?.textContent || '';
      navigator.clipboard?.writeText(text);
      const badge = snip.querySelector('.clip-copied-badge') as HTMLElement;
      if (badge) {
        badge.style.display = 'inline';
        setTimeout(() => { badge.style.display = 'none'; }, 1500);
      }
    });
  });

  // Global mic mute with 'M' key or button click
  const micBtn = section.querySelector('#mic-toggle-btn') as HTMLButtonElement;
  const micIcon = section.querySelector('#mic-icon') as HTMLElement;
  const micText = section.querySelector('#mic-text') as HTMLElement;
  let isMuted = false;

  const toggleMic = () => {
    isMuted = !isMuted;
    if (isMuted) {
      micIcon.innerHTML = ICONS.micOff;
      micText.textContent = 'Microphone Muted';
      micBtn.style.color = '#ef4444';
      micBtn.style.borderColor = '#ef4444';
    } else {
      micIcon.innerHTML = ICONS.mic;
      micText.textContent = 'Microphone Unmuted';
      micBtn.style.color = 'var(--text-main)';
      micBtn.style.borderColor = 'var(--border-color)';
    }
  };

  micBtn?.addEventListener('click', toggleMic);
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm' && (e.target as HTMLElement).tagName !== 'INPUT') {
      toggleMic();
    }
  });

  // Subtle 3D tilt effect on card hover
  section.querySelectorAll('.tilt-card').forEach(card => {
    const el = card as HTMLElement;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  });

  return section;
}
