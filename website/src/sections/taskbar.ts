import { ICONS } from '../lib/icons';

export function renderTaskbar(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'container';
  section.id = 'taskbar';

  section.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Desktop Integration</span>
      <h2 class="section-title">Swap the taskbar. Swap it back.</h2>
      <p class="section-desc">
        Replace the legacy Windows taskbar with an ultra-thin glass dock, or keep both. Windows’ own taskbar always restores with zero system registry corruption.
      </p>
    </div>

    <div class="glass" style="border-radius:28px; padding:32px; position:relative; overflow:hidden;">
      <!-- Toggle and Status Row -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <button id="taskbar-swap-btn" class="btn btn-primary" style="padding:8px 18px; font-size:14px;">
            ${ICONS.windows} <span id="taskbar-mode-label">Switch to Winland Glass Taskbar</span>
          </button>
          <button id="taskbar-maximize-btn" class="btn btn-secondary" style="font-size:13px; padding:8px 14px;">
            Toggle Maximize Window
          </button>
        </div>

        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px; color:var(--text-dim);">Auto-hide behavior:</span>
          <span class="badge-mono" style="color:#10b981;">Spring Dynamics (120 FPS)</span>
        </div>
      </div>

      <!-- Interactive Desktop Display Screen -->
      <div id="taskbar-desktop-screen" style="width:100%; height:380px; background:radial-gradient(ellipse at 50% 30%, #151b2e 0%, #060810 80%); border-radius:18px; border:1px solid var(--border-color); position:relative; overflow:hidden;">
        
        <!-- Mock Window Application -->
        <div id="mock-window-app" style="position:absolute; top:40px; left:60px; right:60px; height:240px; background:rgba(20, 24, 35, 0.75); backdrop-filter:blur(16px); border-radius:14px; border:1px solid rgba(255,255,255,0.12); box-shadow:0 15px 35px rgba(0,0,0,0.4); display:flex; flex-direction:column; transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
          <!-- Window Titlebar -->
          <div style="padding:10px 16px; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="width:10px; height:10px; border-radius:50%; background:#ef4444;"></span>
              <span style="width:10px; height:10px; border-radius:50%; background:#f59e0b;"></span>
              <span style="width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
              <span style="font-size:12px; color:var(--text-muted); margin-left:8px;">Winland Studio — Canvas</span>
            </div>
            <span style="font-size:11px; font-family:var(--font-mono); color:var(--text-dim);">Active Window</span>
          </div>
          <!-- Window Body Content -->
          <div style="padding:24px; flex:1; display:flex; align-items:center; justify-content:center; color:var(--text-dim); font-size:13px;">
            Click "Toggle Maximize Window" to preview auto-hide screen real estate savings
          </div>
        </div>

        <!-- Default Windows Taskbar Mock -->
        <div id="taskbar-default-windows" style="position:absolute; bottom:0; left:0; right:0; height:46px; background:#10141f; border-top:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; gap:16px; transition:transform 0.35s ease;">
          <div style="color:#00a4ef;">${ICONS.windows}</div>
          <div style="width:24px; height:24px; border-radius:6px; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:12px;">📁</div>
          <div style="width:24px; height:24px; border-radius:6px; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:12px;">🌐</div>
          <div style="width:24px; height:24px; border-radius:6px; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:12px;">⚙️</div>
        </div>

        <!-- Winland Glass Notch Taskbar Mock -->
        <div id="taskbar-winland-glass" style="position:absolute; bottom:12px; left:50%; transform:translateX(-50%) translateY(70px); height:48px; background:rgba(20,25,38,0.7); backdrop-filter:blur(24px); border:1px solid var(--border-color); border-radius:9999px; display:flex; align-items:center; gap:14px; padding:0 20px; box-shadow:0 12px 30px rgba(0,0,0,0.5); transition:transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); z-index:20;">
          <div style="color:var(--accent); font-weight:700; font-size:15px; cursor:pointer;" title="Winland Quick Launcher">❖</div>
          <div style="width:1px; height:18px; background:rgba(255,255,255,0.15);"></div>
          <div style="color:var(--text-main); font-size:13px; cursor:pointer;" title="Music Player">${ICONS.music}</div>
          <div style="color:var(--text-main); font-size:13px; cursor:pointer;" title="Hardware">${ICONS.cpu}</div>
          <div style="color:var(--text-main); font-size:13px; cursor:pointer;" title="Weather">${ICONS.sun}</div>
          <div style="width:1px; height:18px; background:rgba(255,255,255,0.15);"></div>
          <span style="font-size:12px; font-family:var(--font-mono); color:var(--text-dim);">12:45</span>
        </div>

        <!-- Bottom Edge Hover Trigger for Auto-Hide -->
        <div id="taskbar-edge-sensor" style="position:absolute; bottom:0; left:0; right:0; height:16px; z-index:30; cursor:pointer;"></div>
      </div>

      <div style="margin-top:18px; display:flex; align-items:center; gap:8px; font-size:13px; color:var(--text-dim);">
        <span style="color:#10b981;">✓</span>
        <span>Windows Explorer taskbar returns instantly without restart when toggled off.</span>
      </div>
    </div>
  `;

  let isWinlandTaskbar = false;
  let isMaximized = false;

  const swapBtn = section.querySelector('#taskbar-swap-btn') as HTMLButtonElement;
  const maxBtn = section.querySelector('#taskbar-maximize-btn') as HTMLButtonElement;
  const modeLabel = section.querySelector('#taskbar-mode-label') as HTMLElement;
  const defTaskbar = section.querySelector('#taskbar-default-windows') as HTMLElement;
  const winTaskbar = section.querySelector('#taskbar-winland-glass') as HTMLElement;
  const mockWindow = section.querySelector('#mock-window-app') as HTMLElement;
  const edgeSensor = section.querySelector('#taskbar-edge-sensor') as HTMLElement;

  const updateTaskbarMode = () => {
    if (isWinlandTaskbar) {
      defTaskbar.style.transform = 'translateY(100%)';
      winTaskbar.style.transform = isMaximized ? 'translateX(-50%) translateY(70px)' : 'translateX(-50%) translateY(0)';
      modeLabel.textContent = 'Switch to Default Windows Taskbar';
    } else {
      defTaskbar.style.transform = 'translateY(0)';
      winTaskbar.style.transform = 'translateX(-50%) translateY(70px)';
      modeLabel.textContent = 'Switch to Winland Glass Taskbar';
    }
  };

  swapBtn?.addEventListener('click', () => {
    isWinlandTaskbar = !isWinlandTaskbar;
    updateTaskbarMode();
  });

  maxBtn?.addEventListener('click', () => {
    isMaximized = !isMaximized;
    if (isMaximized) {
      mockWindow.style.top = '10px';
      mockWindow.style.left = '10px';
      mockWindow.style.right = '10px';
      mockWindow.style.height = '360px';
      maxBtn.textContent = 'Restore Window Size';
      if (isWinlandTaskbar) {
        winTaskbar.style.transform = 'translateX(-50%) translateY(70px)';
      }
    } else {
      mockWindow.style.top = '40px';
      mockWindow.style.left = '60px';
      mockWindow.style.right = '60px';
      mockWindow.style.height = '240px';
      maxBtn.textContent = 'Toggle Maximize Window';
      if (isWinlandTaskbar) {
        winTaskbar.style.transform = 'translateX(-50%) translateY(0)';
      }
    }
  });

  // Hover near bottom edge reveals taskbar when maximized
  edgeSensor?.addEventListener('mouseenter', () => {
    if (isWinlandTaskbar && isMaximized) {
      winTaskbar.style.transform = 'translateX(-50%) translateY(0)';
    }
  });

  section.querySelector('#taskbar-desktop-screen')?.addEventListener('mouseleave', () => {
    if (isWinlandTaskbar && isMaximized) {
      winTaskbar.style.transform = 'translateX(-50%) translateY(70px)';
    }
  });

  return section;
}
