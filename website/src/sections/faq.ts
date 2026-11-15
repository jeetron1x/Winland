import { ICONS } from '../lib/icons';

export function renderFAQ(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'container';
  section.id = 'faq';

  const faqs = [
    {
      q: 'Which media players and browsers are supported?',
      a: 'Winland hooks directly into Windows System Media Transport Controls (SMTC) and WASAPI loopback. It seamlessly detects Spotify, Apple Music, YouTube Music, Chrome, Edge, Firefox, Tidal, VLC, and our native Lyriic companion app with real-time waveform and album art extraction.'
    },
    {
      q: 'Will Winland affect my gaming performance or FPS?',
      a: 'Zero FPS impact. Winland features intelligent full-screen game detection. The moment a full-screen 3D DirectX, Vulkan, or OpenGL game is launched or focused, Winland suspends all composition rendering loops and drops its CPU/GPU usage to 0.0%.'
    },
    {
      q: 'What are the minimum system requirements?',
      a: 'Windows 10 (version 2004 or later) or Windows 11 on 64-bit architecture (x64). Hardware-accelerated DirectX composition is recommended for 120 FPS high-refresh rate spring animations.'
    },
    {
      q: 'How does the Taskbar swap work, and is it safe?',
      a: 'Yes, 100% safe. Winland uses safe Win32 window-state messaging (`SW_HIDE` / `SW_SHOW`) rather than modifying Explorer system registry keys or patching DLLs. When you exit Winland or toggle the option off, the native Windows taskbar restores immediately.'
    },
    {
      q: 'Is Winland open-source and free?',
      a: 'Winland is free and open-source under the MIT license. The full codebase, installer scripts, and security signatures are available publicly on GitHub.'
    }
  ];

  section.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Frequently Answered</span>
      <h2 class="section-title">Common questions.</h2>
      <p class="section-desc">
        Real answers about compatibility, resource consumption, and Windows system integration.
      </p>
    </div>

    <div style="max-width:800px; margin:0 auto; display:flex; flex-direction:column; gap:14px;">
      ${faqs.map((f, idx) => `
        <div class="card faq-item" style="cursor:pointer; padding:22px 28px; border-radius:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:16px;">
            <h4 style="font-size:16px; font-weight:600; color:var(--text-main);">${f.q}</h4>
            <span class="faq-icon" style="color:var(--accent); transition:transform 0.3s ease;">${ICONS.chevronDown}</span>
          </div>
          <div class="faq-answer" style="max-height:0; overflow:hidden; transition:max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease; opacity:0;">
            <p style="font-size:14px; color:var(--text-muted); line-height:1.6; padding-top:14px;">
              ${f.a}
            </p>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  section.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const ans = item.querySelector('.faq-answer') as HTMLElement;
      const icon = item.querySelector('.faq-icon') as HTMLElement;
      const isOpen = ans.style.maxHeight && ans.style.maxHeight !== '0px';

      section.querySelectorAll('.faq-answer').forEach(a => {
        (a as HTMLElement).style.maxHeight = '0px';
        (a as HTMLElement).style.opacity = '0';
      });
      section.querySelectorAll('.faq-icon').forEach(ic => {
        (ic as HTMLElement).style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        ans.style.maxHeight = `${ans.scrollHeight + 30}px`;
        ans.style.opacity = '1';
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  return section;
}
