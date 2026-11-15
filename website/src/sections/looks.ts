import { store, LookTheme } from '../lib/store';

export function renderLooks(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'container';
  section.id = 'looks';

  const looks = [
    {
      id: 'glow',
      name: 'Glow',
      tag: 'Cyberpunk Noir',
      desc: 'Obsidian blacks with electric cyan and neon rose accents. Dynamic night-mode aesthetics.',
      accent: '#00f2fe',
      bg: '#06070a',
      cardBg: 'linear-gradient(135deg, #090a12, #1b0a1d)'
    },
    {
      id: 'zen',
      name: 'Zen',
      tag: 'Crisp Minimalist',
      desc: 'Bright daytime clarity with deep contrast typography, frost-white surfaces and calm cyan tones.',
      accent: '#0284c7',
      bg: '#f3f5f8',
      cardBg: 'linear-gradient(135deg, #eef2f6, #ffffff)'
    },
    {
      id: 'golden',
      name: 'Golden',
      tag: 'Champagne Warmth',
      desc: 'Luxurious dark palette bathed in amber, brass, and warm incandescent highlights.',
      accent: '#f59e0b',
      bg: '#0c0a06',
      cardBg: 'linear-gradient(135deg, #181206, #2a1c07)'
    },
    {
      id: 'cozy',
      name: 'Cozy',
      tag: 'Nordic Forest',
      desc: 'Deep pine greens and calming moss reflections for relaxed reading and coding marathons.',
      accent: '#10b981',
      bg: '#06110d',
      cardBg: 'linear-gradient(135deg, #0a1f18, #0e3025)'
    }
  ];

  section.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Atmosphere Engine</span>
      <h2 class="section-title">One PC, four moods.</h2>
      <p class="section-desc">
        Pick a look and the entire desktop environment follows. Select any card below to re-theme this entire website live.
      </p>
    </div>

    <div class="cards-grid">
      ${looks.map(l => `
        <div class="card look-selector-card ${store.look === l.id ? 'active' : ''}" data-look="${l.id}" style="cursor:pointer; border-radius:24px; position:relative; overflow:hidden; border:2px solid ${store.look === l.id ? l.accent : 'var(--border-color)'};">
          <div style="height:120px; border-radius:14px; background:${l.cardBg}; margin-bottom:20px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,0.08);">
            <!-- Mini Island Preview -->
            <div style="width:110px; height:24px; background:rgba(0,0,0,0.85); border-radius:9999px; border:1px solid ${l.accent}; display:flex; align-items:center; justify-content:center; gap:6px; box-shadow:0 0 15px ${l.accent}40;">
              <span style="width:6px; height:6px; border-radius:50%; background:${l.accent};"></span>
              <span style="font-size:10px; font-family:var(--font-mono); color:#fff;">Winland</span>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <h3 style="font-size:20px; font-weight:700;">${l.name}</h3>
            <span class="badge-mono" style="color:${l.accent};">${l.tag}</span>
          </div>

          <p style="font-size:14px; color:var(--text-muted); line-height:1.5; margin-bottom:18px;">
            ${l.desc}
          </p>

          <button class="btn btn-secondary look-apply-btn" style="width:100%; font-size:13px; padding:8px;">
            ${store.look === l.id ? 'Active Theme ✓' : 'Switch to ' + l.name}
          </button>
        </div>
      `).join('')}
    </div>
  `;

  section.querySelectorAll('.look-selector-card').forEach(card => {
    card.addEventListener('click', () => {
      const l = card.getAttribute('data-look') as LookTheme;
      store.setLook(l);

      section.querySelectorAll('.look-selector-card').forEach(c => {
        const isCurrent = c.getAttribute('data-look') === l;
        const btn = c.querySelector('.look-apply-btn') as HTMLElement;
        const targetLook = looks.find(lk => lk.id === c.getAttribute('data-look'));
        if (isCurrent) {
          c.classList.add('active');
          (c as HTMLElement).style.borderColor = targetLook?.accent || 'var(--accent)';
          if (btn) btn.textContent = 'Active Theme ✓';
        } else {
          c.classList.remove('active');
          (c as HTMLElement).style.borderColor = 'var(--border-color)';
          if (btn) btn.textContent = `Switch to ${targetLook?.name}`;
        }
      });
    });
  });

  return section;
}
