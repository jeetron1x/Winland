import { audio } from '../lib/audio';
import { ICONS } from '../lib/icons';
import { store, PALETTES, VisualizerMode } from '../lib/store';

export function renderSpectrum(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'container';
  section.id = 'spectrum';

  section.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Audio Composition</span>
      <h2 class="section-title">Music you can see.</h2>
      <p class="section-desc">
        Real-time 64-band WASAPI spectrum visualizer directly synced to your PC's audio output. Try the live interactive synthesizer below or drop your own song.
      </p>
    </div>

    <div class="glass" style="border-radius:28px; padding:32px; position:relative; overflow:hidden;">
      <!-- Canvas Visualizer Container -->
      <div style="width:100%; height:320px; position:relative; background:#04060a; border-radius:18px; overflow:hidden; border:1px solid rgba(255,255,255,0.06); margin-bottom:24px;">
        <canvas id="spectrum-canvas" style="width:100%; height:100%; display:block;"></canvas>

        <!-- Drop Zone Overlay -->
        <div id="audio-drop-zone" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.4); opacity:0; pointer-events:none; transition:opacity 0.2s ease; border:2px dashed var(--accent);">
          <span style="font-size:32px; margin-bottom:8px;">🎵</span>
          <span style="font-weight:600; font-size:16px;">Drop your audio file to play locally</span>
        </div>

        <!-- Now Playing Pill Overlay -->
        <div style="position:absolute; top:16px; left:20px; display:flex; align-items:center; gap:10px; background:rgba(10,12,18,0.7); backdrop-filter:blur(12px); padding:6px 14px; border-radius:9999px; border:1px solid var(--border-color);">
          <span style="color:var(--track-accent);">${ICONS.music}</span>
          <span id="spectrum-track-label" style="font-size:13px; font-weight:500;">Midnight Horizon · Jeetron1x</span>
        </div>

        <!-- Play / Pause Center Overlay Button if stopped -->
        <div id="canvas-play-prompt" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none;">
          <button id="big-play-btn" class="btn btn-primary" style="pointer-events:auto; padding:16px 28px; font-size:16px;">
            ${ICONS.play} <span>Start Demo Beat</span>
          </button>
        </div>
      </div>

      <!-- Controls Row -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
        <!-- Left: Audio Playback Toggle -->
        <div style="display:flex; align-items:center; gap:12px;">
          <button id="spectrum-play-toggle" class="btn btn-secondary">
            <span id="spectrum-play-icon">${ICONS.play}</span>
            <span id="spectrum-play-text">Play Beat</span>
          </button>

          <label class="btn btn-ghost" style="cursor:pointer; font-size:13px;">
            📁 Drop / Pick Audio
            <input type="file" id="spectrum-file-input" accept="audio/*" style="display:none;" />
          </label>
        </div>

        <!-- Center: Visualizer Mode Selector -->
        <div style="display:flex; background:var(--bg-surface); padding:4px; border-radius:9999px; border:1px solid var(--border-color);">
          <button class="btn btn-ghost viz-mode-btn active" data-mode="spectrum" style="padding:6px 14px; font-size:13px;">Spectrum</button>
          <button class="btn btn-ghost viz-mode-btn" data-mode="bar" style="padding:6px 14px; font-size:13px;">64-Bar</button>
          <button class="btn btn-ghost viz-mode-btn" data-mode="dot" style="padding:6px 14px; font-size:13px;">Dot Matrix</button>
        </div>

        <!-- Right: Album Palette Toggles -->
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px; color:var(--text-dim);">Palette:</span>
          <div style="display:flex; gap:6px;">
            ${PALETTES.map(p => `
              <button class="palette-chip-btn" data-id="${p.id}" title="${p.name}" style="width:24px; height:24px; border-radius:50%; background:linear-gradient(135deg, ${p.accent}, ${p.accentSecondary}); border:2px solid ${p.id === 'neon' ? '#ffffff' : 'transparent'}; cursor:pointer; transition:transform 0.2s;"></button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = section.querySelector('#spectrum-canvas') as HTMLCanvasElement;
  const ctx = canvas?.getContext('2d');
  const playToggle = section.querySelector('#spectrum-play-toggle') as HTMLButtonElement;
  const bigPlayBtn = section.querySelector('#big-play-btn') as HTMLButtonElement;
  const playIcon = section.querySelector('#spectrum-play-icon') as HTMLElement;
  const playText = section.querySelector('#spectrum-play-text') as HTMLElement;
  const canvasPrompt = section.querySelector('#canvas-play-prompt') as HTMLElement;
  const trackLabel = section.querySelector('#spectrum-track-label') as HTMLElement;

  const updatePlayUI = (playing: boolean) => {
    if (playing) {
      playIcon.innerHTML = ICONS.pause;
      playText.textContent = 'Pause Beat';
      canvasPrompt.style.display = 'none';
    } else {
      playIcon.innerHTML = ICONS.play;
      playText.textContent = 'Play Beat';
      canvasPrompt.style.display = 'flex';
    }
  };

  const toggle = () => {
    const isPlaying = audio.togglePlay();
    updatePlayUI(isPlaying);
  };

  playToggle?.addEventListener('click', toggle);
  bigPlayBtn?.addEventListener('click', toggle);

  // File upload / drag & drop
  const dropZone = section.querySelector('#audio-drop-zone') as HTMLElement;
  const fileInput = section.querySelector('#spectrum-file-input') as HTMLInputElement;

  const handleAudioFile = async (file: File) => {
    try {
      trackLabel.textContent = `Loading ${file.name}...`;
      const name = await audio.loadCustomAudio(file);
      trackLabel.textContent = `${name} · Local File`;
      updatePlayUI(true);
    } catch {
      trackLabel.textContent = 'Failed to load audio';
    }
  };

  fileInput?.addEventListener('change', (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) handleAudioFile(files[0]);
  });

  canvas?.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (dropZone) dropZone.style.opacity = '1';
  });

  canvas?.addEventListener('dragleave', () => {
    if (dropZone) dropZone.style.opacity = '0';
  });

  canvas?.addEventListener('drop', (e) => {
    e.preventDefault();
    if (dropZone) dropZone.style.opacity = '0';
    if (e.dataTransfer && e.dataTransfer.files[0]) {
      handleAudioFile(e.dataTransfer.files[0]);
    }
  });

  // Mode buttons
  section.querySelectorAll('.viz-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      section.querySelectorAll('.viz-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-mode') as VisualizerMode;
      store.setVisualizerMode(mode);
    });
  });

  // Palette buttons
  section.querySelectorAll('.palette-chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      section.querySelectorAll('.palette-chip-btn').forEach(c => (c as HTMLElement).style.borderColor = 'transparent');
      (chip as HTMLElement).style.borderColor = '#ffffff';
      const pid = chip.getAttribute('data-id') || 'neon';
      store.setPalette(pid);
      trackLabel.textContent = `${store.currentPalette.title} · ${store.currentPalette.artist}`;
    });
  });

  // Render loop for canvas
  let animationFrameId: number;
  const renderCanvas = () => {
    animationFrameId = requestAnimationFrame(renderCanvas);
    if (!canvas || !ctx) return;

    if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const freqData = audio.getByteFrequencyData();
    const isPlaying = audio.getPlaying();

    if (store.visualizerMode === 'bar') {
      // 64-band smooth Equalizer bars
      const numBars = 64;
      const barWidth = (w - (numBars * 3)) / numBars;
      for (let i = 0; i < numBars; i++) {
        const val = isPlaying ? freqData[i * 4] : Math.sin(Date.now() * 0.003 + i * 0.2) * 15 + 20;
        const barHeight = Math.max(4, (val / 255) * (h * 0.75));
        const x = i * (barWidth + 3);
        const y = h - barHeight - 10;

        const grad = ctx.createLinearGradient(0, y, 0, h);
        grad.addColorStop(0, store.currentPalette.accent);
        grad.addColorStop(1, store.currentPalette.accentSecondary);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();
      }
    } else if (store.visualizerMode === 'dot') {
      // Orbiting dot matrix
      const cx = w / 2;
      const cy = h / 2;
      const points = 48;
      const radius = Math.min(w, h) * 0.28;

      ctx.save();
      ctx.translate(cx, cy);
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const val = isPlaying ? freqData[i * 5] : 30 + Math.sin(Date.now() * 0.002 + i) * 12;
        const r = radius + (val / 255) * 60;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;

        ctx.fillStyle = store.currentPalette.accent;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(2, (val / 255) * 6), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    } else {
      // Spectrum glowing wave
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      const points = 80;
      for (let i = 0; i < points; i++) {
        const x = (i / (points - 1)) * w;
        const val = isPlaying ? (freqData[i * 3] / 255) : 0.15 * Math.sin(Date.now() * 0.004 + i * 0.15);
        const y = (h / 2) + Math.sin(i * 0.25 + Date.now() * 0.002) * (val * (h * 0.45));
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = store.currentPalette.accent;
      ctx.lineWidth = 3;
      ctx.shadowColor = store.currentPalette.glow;
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  };

  renderCanvas();

  return section;
}
