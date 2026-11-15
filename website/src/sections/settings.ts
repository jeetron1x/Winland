import { ICONS } from '../lib/icons';
import { store } from '../lib/store';

export function renderSettings(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'container';
  section.id = 'settings';

  const settingsList = [
    { cat: 'general', key: 'autostart', title: 'Launch on Windows startup', desc: 'Starts Winland automatically in background with low I/O priority', def: true },
    { cat: 'general', key: 'monitors', title: 'Primary Display Pinning', desc: 'Lock the island to your primary gaming or workspace monitor', def: true },
    { cat: 'general', key: 'battery', title: 'Energy Saver Passthrough', desc: 'Reduces animation frame rates when Windows battery saver is active', def: false },
    { cat: 'island', key: 'hover_delay', title: 'Hover Peek Reaction Time', desc: 'Controls responsiveness before expanding the hover preview (default 120ms)', def: true },
    { cat: 'island', key: 'sound_feedback', title: 'Haptic Audio Feedback', desc: 'Subtle mechanical clicks on toggle clicks and widget pin actions', def: false },
    { cat: 'island', key: 'exclusive_fullscreen', title: 'Smart Fullscreen Gaming Hide', desc: 'Completely suspends rendering when DirectX/Vulkan game is focused', def: true },
    { cat: 'island', key: 'auto_collapse', title: 'Auto-Collapse Inactive Island', desc: 'Restores compact pill size after 5 seconds of inactivity', def: true },
    { cat: 'media', key: 'wasapi_loopback', title: 'WASAPI High-Res Audio Loopback', desc: 'Direct kernel streaming of audio frequency without virtual cable drivers', def: true },
    { cat: 'media', key: 'palette_sync', title: 'Adaptive Album Artwork Palette', desc: 'Extracts dominant vibrant colors to illuminate island edges & scrubber', def: true },
    { cat: 'media', key: 'lyriic_sync', title: 'Native Lyriic Real-Time Sync', desc: 'Synchronizes track lyrics and metadata directly with local Lyriic instances', def: true },
    { cat: 'taskbar', key: 'autohide_native', title: 'Auto-hide Windows Native Taskbar', desc: 'Hides system taskbar without modifying Explorer system registries', def: true },
    { cat: 'taskbar', key: 'fail_safe', title: 'Fail-Safe Registry Restoration', desc: 'Instantly unhides Windows taskbar on exit, crash, or shortcut press', def: true },
    { cat: 'appearance', key: 'acrylic_blur', title: 'DirectComposition Glass Material', desc: 'Uses hardware GPU composition shaders for flawless backdrop blur', def: true },
    { cat: 'appearance', key: 'noise_grain', title: 'Subtle Anti-Banding Dither', desc: 'Eliminates 8-bit monitor gradient banding on dark surfaces', def: true },
    { cat: 'appearance', key: 'high_refresh', title: '120 Hz / 240 Hz ProMotion Sync', desc: 'Matches display refresh rate for zero tearing during drag operations', def: true },
    { cat: 'gaming', key: 'process_blacklist', title: 'Process Detection Blacklist', desc: 'Prevents overlay injection in anti-cheat competitive titles (Valorant, EasyAntiCheat)', def: true },
    { cat: 'gaming', key: 'fps_limiter', title: 'Idle Background FPS Cap', desc: 'Caps background island frame rate to 1 FPS when display is idle', def: true }
  ];

  section.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Deep Configuration</span>
      <h2 class="section-title">Everything has a switch.</h2>
      <p class="section-desc">
        Search, tweak, and see it change live. Winland is engineered for power users who demand total control over every pixel and millisecond.
      </p>
    </div>

    <!-- Settings Window Mock -->
    <div class="glass" style="border-radius:24px; overflow:hidden; border:1px solid var(--border-color); box-shadow:0 30px 80px rgba(0,0,0,0.5);">
      
      <!-- Window Titlebar -->
      <div style="background:var(--bg-surface); padding:14px 24px; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <span class="nav-island-icon"></span>
          <span style="font-weight:700; font-size:15px;">Winland Preferences</span>
        </div>

        <!-- Live Search Box -->
        <div style="display:flex; align-items:center; gap:8px; background:rgba(0,0,0,0.3); border:1px solid var(--border-color); padding:6px 14px; border-radius:9999px; width:280px;">
          <span style="color:var(--text-dim);">${ICONS.search}</span>
          <input type="text" id="settings-search-input" placeholder="Search preferences (e.g. wasapi, blur)..." style="background:none; border:none; outline:none; color:var(--text-main); font-size:13px; width:100%; font-family:inherit;" />
        </div>
      </div>

      <!-- Main Body -->
      <div style="display:grid; grid-template-columns:220px 1fr; min-height:480px;">
        
        <!-- Sidebar Navigation -->
        <div style="background:rgba(0,0,0,0.2); border-right:1px solid var(--border-color); padding:20px 14px; display:flex; flex-direction:column; gap:4px;">
          <button class="settings-tab-btn active" data-cat="all" style="text-align:left; padding:8px 14px; border-radius:10px; background:var(--bg-surface-hover); color:var(--text-main); border:none; font-size:13px; cursor:pointer;">
            All Settings
          </button>
          <button class="settings-tab-btn" data-cat="general" style="text-align:left; padding:8px 14px; border-radius:10px; background:transparent; color:var(--text-muted); border:none; font-size:13px; cursor:pointer;">
            General
          </button>
          <button class="settings-tab-btn" data-cat="island" style="text-align:left; padding:8px 14px; border-radius:10px; background:transparent; color:var(--text-muted); border:none; font-size:13px; cursor:pointer;">
            Island Dynamics
          </button>
          <button class="settings-tab-btn" data-cat="media" style="text-align:left; padding:8px 14px; border-radius:10px; background:transparent; color:var(--text-muted); border:none; font-size:13px; cursor:pointer;">
            Audio & WASAPI
          </button>
          <button class="settings-tab-btn" data-cat="taskbar" style="text-align:left; padding:8px 14px; border-radius:10px; background:transparent; color:var(--text-muted); border:none; font-size:13px; cursor:pointer;">
            Taskbar Hider
          </button>
          <button class="settings-tab-btn" data-cat="appearance" style="text-align:left; padding:8px 14px; border-radius:10px; background:transparent; color:var(--text-muted); border:none; font-size:13px; cursor:pointer;">
            Appearance & Shaders
          </button>
          <button class="settings-tab-btn" data-cat="gaming" style="text-align:left; padding:8px 14px; border-radius:10px; background:transparent; color:var(--text-muted); border:none; font-size:13px; cursor:pointer;">
            Gaming Mode
          </button>

          <!-- Interactive Corner Radius Live Tool in Sidebar -->
          <div style="margin-top:auto; padding:14px; background:var(--bg-surface); border-radius:14px; border:1px solid var(--border-color);">
            <div style="font-size:11px; font-family:var(--font-mono); color:var(--text-dim); margin-bottom:8px; text-transform:uppercase;">Live Radius Tweak</div>
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px;">
              <span>Corner Radius:</span>
              <span id="radius-val-label" style="font-weight:700; color:var(--accent);">24px</span>
            </div>
            <input type="range" id="corner-radius-slider" min="6" max="36" value="24" style="width:100%; accent-color:var(--accent); cursor:pointer;" />
          </div>
        </div>

        <!-- Settings List Content Area -->
        <div style="padding:24px 32px; max-height:500px; overflow-y:auto;" id="settings-scroll-container">
          <div style="display:flex; flex-direction:column; gap:16px;" id="settings-items-container">
            ${settingsList.map((item, idx) => `
              <div class="setting-row" data-cat="${item.cat}" data-text="${(item.title + ' ' + item.desc).toLowerCase()}" style="display:flex; justify-content:space-between; align-items:center; padding:14px 18px; border-radius:14px; background:var(--bg-surface); border:1px solid var(--border-color);">
                <div style="max-width:80%;">
                  <div style="font-size:14px; font-weight:600; color:var(--text-main); margin-bottom:2px;">${item.title}</div>
                  <div style="font-size:12px; color:var(--text-muted); line-height:1.4;">${item.desc}</div>
                </div>
                <label style="position:relative; display:inline-block; width:44px; height:24px;">
                  <input type="checkbox" ${item.def ? 'checked' : ''} style="opacity:0; width:0; height:0;" class="setting-toggle-chk" />
                  <span class="setting-slider" style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background:rgba(255,255,255,0.15); transition:.3s; border-radius:34px; border:1px solid var(--border-color);">
                    <span style="position:absolute; content:''; height:18px; width:18px; left:2px; bottom:2px; background:white; transition:.3s; border-radius:50%; transform:${item.def ? 'translateX(20px)' : 'translateX(0)'}; background:${item.def ? 'var(--accent)' : '#fff'};"></span>
                  </span>
                </label>
              </div>
            `).join('')}
          </div>
          <div id="settings-empty-msg" style="display:none; text-align:center; padding:40px 0; color:var(--text-dim); font-size:14px;">
            No preferences match your search query.
          </div>
        </div>

      </div>
    </div>
  `;

  // Corner radius live slider
  const radiusSlider = section.querySelector('#corner-radius-slider') as HTMLInputElement;
  const radiusVal = section.querySelector('#radius-val-label') as HTMLElement;

  radiusSlider?.addEventListener('input', () => {
    const val = parseInt(radiusSlider.value, 10);
    if (radiusVal) radiusVal.textContent = `${val}px`;
    store.setIslandRadius(val);
  });

  // Search filtering
  const searchInput = section.querySelector('#settings-search-input') as HTMLInputElement;
  const rows = section.querySelectorAll('.setting-row');
  const emptyMsg = section.querySelector('#settings-empty-msg') as HTMLElement;
  let activeCategory = 'all';

  const filterSettings = () => {
    const q = (searchInput?.value || '').toLowerCase().trim();
    let visibleCount = 0;

    rows.forEach(r => {
      const el = r as HTMLElement;
      const cat = el.getAttribute('data-cat');
      const text = el.getAttribute('data-text') || '';

      const matchesCat = activeCategory === 'all' || cat === activeCategory;
      const matchesSearch = !q || text.includes(q);

      if (matchesCat && matchesSearch) {
        el.style.display = 'flex';
        visibleCount++;
      } else {
        el.style.display = 'none';
      }
    });

    if (emptyMsg) {
      emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  searchInput?.addEventListener('input', filterSettings);

  // Tab filtering
  section.querySelectorAll('.settings-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      section.querySelectorAll('.settings-tab-btn').forEach(b => {
        (b as HTMLElement).style.background = 'transparent';
        (b as HTMLElement).style.color = 'var(--text-muted)';
      });
      (btn as HTMLElement).style.background = 'var(--bg-surface-hover)';
      (btn as HTMLElement).style.color = 'var(--text-main)';

      activeCategory = btn.getAttribute('data-cat') || 'all';
      filterSettings();
    });
  });

  // Toggle animation
  section.querySelectorAll('.setting-toggle-chk').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const input = e.target as HTMLInputElement;
      const circle = input.nextElementSibling?.firstElementChild as HTMLElement;
      if (circle) {
        circle.style.transform = input.checked ? 'translateX(20px)' : 'translateX(0)';
        circle.style.background = input.checked ? 'var(--accent)' : '#fff';
      }
    });
  });

  return section;
}
