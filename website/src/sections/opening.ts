import { audio } from '../lib/audio';

export function renderOpening(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'opening-screen';
  el.id = 'opening-screen';

  // Check if previously skipped in this session
  if (sessionStorage.getItem('winland_visited') === 'true') {
    el.classList.add('hidden');
    return el;
  }

  el.innerHTML = `
    <div class="opening-island" id="opening-pill"></div>
    <div style="text-align:center; margin-bottom:30px;">
      <h2 style="font-size:28px; font-weight:700; margin-bottom:8px; letter-spacing:-0.02em;">Experience Winland</h2>
      <p style="color:#8892b0; font-size:15px;">A fluid dynamic island crafted for Windows</p>
    </div>
    <div class="opening-actions">
      <button class="btn btn-primary" id="start-journey-btn">Start the journey</button>
      <button class="btn btn-ghost" id="skip-journey-btn">Skip</button>
    </div>
  `;

  const dismiss = () => {
    sessionStorage.setItem('winland_visited', 'true');
    el.classList.add('hidden');
  };

  el.querySelector('#start-journey-btn')?.addEventListener('click', async () => {
    await audio.resume();
    dismiss();
  });

  el.querySelector('#skip-journey-btn')?.addEventListener('click', dismiss);

  return el;
}
