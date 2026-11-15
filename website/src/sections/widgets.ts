import { ICONS } from '../lib/icons';

export function renderWidgets(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'container';
  section.id = 'widgets';

  section.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Modular Canvas</span>
      <h2 class="section-title">Drag it onto your desktop.</h2>
      <p class="section-desc">
        Pull any widget out of the island and pin it anywhere on your multi-monitor space. Adjust sizes, toggle layouts, and track system health.
      </p>
    </div>

    <!-- Interactive Desktop Canvas -->
    <div class="glass" style="border-radius:28px; padding:32px; position:relative; min-height:480px; overflow:hidden; background:radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.6) 80%);">
      
      <!-- Controls Topbar -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px; flex-wrap:wrap; gap:16px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <span class="badge-mono">Interactive Desktop Canvas</span>
          <span style="font-size:13px; color:var(--text-dim);">Drag tiles around the grid</span>
        </div>

        <div style="display:flex; align-items:center; gap:14px;">
          <label style="font-size:13px; color:var(--text-muted); display:flex; align-items:center; gap:8px;">
            <span>Clock Scale:</span>
            <input type="range" id="clock-scale-slider" min="36" max="96" value="64" style="accent-color:var(--accent); width:110px; cursor:pointer;" />
          </label>

          <button id="reset-widgets-btn" class="btn btn-secondary" style="font-size:12px; padding:4px 12px;">
            Reset Positions
          </button>
        </div>
      </div>

      <!-- Widgets Area -->
      <div id="widgets-drop-area" style="position:relative; width:100%; min-height:360px;">
        
        <!-- Widget 1: Big Day Clock -->
        <div class="glass widget-tile" id="widget-clock" style="position:absolute; top:20px; left:30px; padding:20px 28px; border-radius:20px; cursor:grab; user-select:none; z-index:10;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:12px; font-family:var(--font-mono); color:var(--accent); text-transform:uppercase; letter-spacing:0.1em;" id="clock-day-label">Sunday</span>
            <span style="font-size:12px; color:var(--text-dim);" id="clock-date-label">Nov 15</span>
          </div>
          <div id="clock-time-display" style="font-size:64px; font-weight:800; line-height:1; letter-spacing:-0.03em; color:var(--text-main);">
            12:45
          </div>
        </div>

        <!-- Widget 2: Focus Timer -->
        <div class="glass widget-tile" id="widget-timer" style="position:absolute; top:20px; right:40px; padding:20px 24px; border-radius:20px; width:220px; cursor:grab; user-select:none; z-index:10;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:13px; font-weight:600; display:flex; align-items:center; gap:6px;">
              ${ICONS.clock} Focus Timer
            </span>
            <span class="badge-mono" id="timer-status">Ready</span>
          </div>
          <div id="timer-display" style="font-size:36px; font-weight:700; font-family:var(--font-mono); color:var(--text-main); margin-bottom:14px; text-align:center;">
            25:00
          </div>
          <div style="display:flex; gap:8px;">
            <button id="timer-start-btn" class="btn btn-primary" style="flex:1; padding:6px; font-size:12px;">Start</button>
            <button id="timer-reset-btn" class="btn btn-secondary" style="padding:6px 10px; font-size:12px;">Reset</button>
          </div>
        </div>

        <!-- Widget 3: Live Hardware Stats Sparklines -->
        <div class="glass widget-tile" id="widget-hw" style="position:absolute; bottom:20px; left:30px; padding:18px 24px; border-radius:20px; width:280px; cursor:grab; user-select:none; z-index:10;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:13px; font-weight:600; display:flex; align-items:center; gap:6px;">
              ${ICONS.cpu} Hardware Pulse
            </span>
            <span class="badge-mono" style="font-size:10px; color:#10b981;">DirectX 12</span>
          </div>
          <div style="margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
              <span style="color:var(--text-dim);">CPU Utilization</span>
              <span id="hw-cpu-val" style="font-family:var(--font-mono); font-weight:600;">14%</span>
            </div>
            <div style="height:6px; width:100%; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden;">
              <div id="hw-cpu-bar" style="height:100%; width:14%; background:var(--accent); transition:width 0.4s ease;"></div>
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
              <span style="color:var(--text-dim);">RAM Allocated</span>
              <span id="hw-ram-val" style="font-family:var(--font-mono); font-weight:600;">4.1 GB</span>
            </div>
            <div style="height:6px; width:100%; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden;">
              <div id="hw-ram-bar" style="height:100%; width:26%; background:var(--accent-secondary); transition:width 0.4s ease;"></div>
            </div>
          </div>
        </div>

        <!-- Widget 4: Weather Overview -->
        <div class="glass widget-tile" id="widget-weather" style="position:absolute; bottom:20px; right:40px; padding:18px 24px; border-radius:20px; width:240px; cursor:grab; user-select:none; z-index:10;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:13px; font-weight:600;">Weather Radar</span>
            <span style="color:#fbbf24;">${ICONS.sun}</span>
          </div>
          <div style="display:flex; align-items:baseline; gap:8px;">
            <span style="font-size:32px; font-weight:700;">22°C</span>
            <span style="font-size:13px; color:var(--text-dim);">Sunny</span>
          </div>
          <div style="font-size:12px; color:var(--text-dim); margin-top:4px;">
            Humidity: 48% · Wind: 7 km/h
          </div>
        </div>

      </div>
    </div>
  `;

  // Realtime clock updates
  const timeDisplay = section.querySelector('#clock-time-display') as HTMLElement;
  const dayLabel = section.querySelector('#clock-day-label') as HTMLElement;
  const dateLabel = section.querySelector('#clock-date-label') as HTMLElement;

  const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    if (timeDisplay) timeDisplay.textContent = `${hours}:${mins}`;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (dayLabel) dayLabel.textContent = days[now.getDay()];
    if (dateLabel) dateLabel.textContent = `${months[now.getMonth()]} ${now.getDate()}`;
  };

  updateClock();
  setInterval(updateClock, 1000);

  // Clock scale slider
  const clockSlider = section.querySelector('#clock-scale-slider') as HTMLInputElement;
  clockSlider?.addEventListener('input', () => {
    if (timeDisplay) {
      timeDisplay.style.fontSize = `${clockSlider.value}px`;
    }
  });

  // Focus timer functionality
  const timerDisplay = section.querySelector('#timer-display') as HTMLElement;
  const timerStartBtn = section.querySelector('#timer-start-btn') as HTMLButtonElement;
  const timerResetBtn = section.querySelector('#timer-reset-btn') as HTMLButtonElement;
  const timerStatus = section.querySelector('#timer-status') as HTMLElement;

  let timerSecs = 25 * 60;
  let timerInterval: number | null = null;

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  timerStartBtn?.addEventListener('click', () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerStartBtn.textContent = 'Resume';
      timerStatus.textContent = 'Paused';
    } else {
      timerInterval = window.setInterval(() => {
        if (timerSecs > 0) {
          timerSecs--;
          timerDisplay.textContent = formatTimer(timerSecs);
        } else {
          clearInterval(timerInterval!);
          timerInterval = null;
          timerStatus.textContent = 'Completed!';
        }
      }, 1000);
      timerStartBtn.textContent = 'Pause';
      timerStatus.textContent = 'Focusing';
    }
  });

  timerResetBtn?.addEventListener('click', () => {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    timerSecs = 25 * 60;
    timerDisplay.textContent = '25:00';
    timerStartBtn.textContent = 'Start';
    timerStatus.textContent = 'Ready';
  });

  // Live Hardware sparkline simulation
  const cpuVal = section.querySelector('#hw-cpu-val') as HTMLElement;
  const cpuBar = section.querySelector('#hw-cpu-bar') as HTMLElement;
  const ramVal = section.querySelector('#hw-ram-val') as HTMLElement;
  const ramBar = section.querySelector('#hw-ram-bar') as HTMLElement;

  setInterval(() => {
    const c = Math.floor(12 + Math.random() * 8);
    if (cpuVal) cpuVal.textContent = `${c}%`;
    if (cpuBar) cpuBar.style.width = `${c}%`;

    const r = (4.1 + Math.random() * 0.4).toFixed(1);
    if (ramVal) ramVal.textContent = `${r} GB`;
    if (ramBar) ramBar.style.width = `${Math.floor((parseFloat(r) / 16) * 100)}%`;
  }, 2200);

  // Drag and drop for widgets
  const container = section.querySelector('#widgets-drop-area') as HTMLElement;
  const tiles = section.querySelectorAll('.widget-tile');

  tiles.forEach(tile => {
    const el = tile as HTMLElement;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    el.addEventListener('mousedown', (e) => {
      // Don't drag if clicking buttons or inputs
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'INPUT') return;
      isDragging = true;
      el.style.cursor = 'grabbing';
      el.style.zIndex = '100';
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = el.offsetLeft;
      initialTop = el.offsetTop;

      const onMouseMove = (ev: MouseEvent) => {
        if (!isDragging) return;
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        const maxL = container.clientWidth - el.offsetWidth;
        const maxT = container.clientHeight - el.offsetHeight;
        el.style.left = `${Math.max(0, Math.min(maxL, initialLeft + dx))}px`;
        el.style.top = `${Math.max(0, Math.min(maxT, initialTop + dy))}px`;
        el.style.right = 'auto';
        el.style.bottom = 'auto';
      };

      const onMouseUp = () => {
        isDragging = false;
        el.style.cursor = 'grab';
        el.style.zIndex = '10';
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  });

  // Reset positions button
  section.querySelector('#reset-widgets-btn')?.addEventListener('click', () => {
    const wClock = section.querySelector('#widget-clock') as HTMLElement;
    const wTimer = section.querySelector('#widget-timer') as HTMLElement;
    const wHw = section.querySelector('#widget-hw') as HTMLElement;
    const wWeather = section.querySelector('#widget-weather') as HTMLElement;

    if (wClock) { wClock.style.top = '20px'; wClock.style.left = '30px'; wClock.style.right = 'auto'; }
    if (wTimer) { wTimer.style.top = '20px'; wTimer.style.right = '40px'; wTimer.style.left = 'auto'; }
    if (wHw) { wHw.style.top = 'auto'; wHw.style.bottom = '20px'; wHw.style.left = '30px'; }
    if (wWeather) { wWeather.style.top = 'auto'; wWeather.style.bottom = '20px'; wWeather.style.right = '40px'; wWeather.style.left = 'auto'; }
  });

  return section;
}
