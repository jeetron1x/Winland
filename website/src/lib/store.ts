export type LookTheme = 'zen' | 'golden' | 'cozy' | 'glow';
export type VisualizerMode = 'spectrum' | 'dot' | 'bar';
export type IslandShape = 'island' | 'notch';
export type IslandSurface = 'glass' | 'graphite' | 'acrylic' | 'black';

export interface AlbumPalette {
  id: string;
  name: string;
  artist: string;
  title: string;
  accent: string;
  accentSecondary: string;
  glow: string;
  bgDark: string;
}

export const PALETTES: AlbumPalette[] = [
  {
    id: 'neon',
    name: 'Cyber Neon',
    title: 'Midnight Horizon',
    artist: 'Jeetron1x',
    accent: '#00f2fe',
    accentSecondary: '#4facfe',
    glow: 'rgba(0, 242, 254, 0.4)',
    bgDark: '#080d1a'
  },
  {
    id: 'golden',
    name: 'Golden Hour',
    title: 'Solar Radiance',
    artist: 'Aura Collective',
    accent: '#f59e0b',
    accentSecondary: '#fbbf24',
    glow: 'rgba(245, 158, 11, 0.4)',
    bgDark: '#1a1306'
  },
  {
    id: 'emerald',
    name: 'Emerald Drift',
    title: 'Boreal Echoes',
    artist: 'Nordic Forest',
    accent: '#10b981',
    accentSecondary: '#34d399',
    glow: 'rgba(16, 185, 129, 0.4)',
    bgDark: '#071813'
  },
  {
    id: 'velvet',
    name: 'Velvet Glow',
    title: 'Tokyo Twilight',
    artist: 'Synthwave Dreams',
    accent: '#ec4899',
    accentSecondary: '#f43f5e',
    glow: 'rgba(236, 72, 153, 0.4)',
    bgDark: '#1b0816'
  }
];

class AppStore {
  public look: LookTheme = 'glow';
  public visualizerMode: VisualizerMode = 'spectrum';
  public currentPalette: AlbumPalette = PALETTES[0];
  public islandShape: IslandShape = 'island';
  public islandSurface: IslandSurface = 'glass';
  public islandRadius: number = 24;
  public beatGlowEnabled: boolean = true;
  public isModalOpen: boolean = false;
  public githubStars: number = 42; // Fallback count, will fetch live

  private listeners: Map<string, Array<() => void>> = new Map();

  constructor() {
    const savedLook = localStorage.getItem('winland_look') as LookTheme;
    if (savedLook && ['zen', 'golden', 'cozy', 'glow'].includes(savedLook)) {
      this.look = savedLook;
    }
    this.fetchGitHubStars();
  }

  public setLook(look: LookTheme) {
    this.look = look;
    localStorage.setItem('winland_look', look);
    document.documentElement.setAttribute('data-theme', look);
    this.emit('look');
  }

  public setVisualizerMode(mode: VisualizerMode) {
    this.visualizerMode = mode;
    this.emit('visualizer');
  }

  public setPalette(paletteId: string) {
    const pal = PALETTES.find(p => p.id === paletteId);
    if (pal) {
      this.currentPalette = pal;
      document.documentElement.style.setProperty('--track-accent', pal.accent);
      document.documentElement.style.setProperty('--track-glow', pal.glow);
      this.emit('palette');
    }
  }

  public setIslandShape(shape: IslandShape) {
    this.islandShape = shape;
    this.emit('island');
  }

  public setIslandSurface(surface: IslandSurface) {
    this.islandSurface = surface;
    this.emit('island');
  }

  public setIslandRadius(radius: number) {
    this.islandRadius = radius;
    document.documentElement.style.setProperty('--island-radius', `${radius}px`);
    this.emit('radius');
  }

  public toggleBeatGlow() {
    this.beatGlowEnabled = !this.beatGlowEnabled;
    this.emit('beatglow');
  }

  public setModal(open: boolean) {
    this.isModalOpen = open;
    this.emit('modal');
  }

  public subscribe(key: string, cb: () => void) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key)!.push(cb);
  }

  private emit(key: string) {
    const cbs = this.listeners.get(key);
    if (cbs) {
      for (const cb of cbs) cb();
    }
  }

  private async fetchGitHubStars() {
    try {
      const res = await fetch('https://api.github.com/repos/jeetron1x/Winland');
      if (res.ok) {
        const data = await res.json();
        if (typeof data.stargazers_count === 'number') {
          this.githubStars = data.stargazers_count;
          this.emit('stars');
        }
      }
    } catch {
      // Offline or rate-limited; fallback remains
    }
  }
}

export const store = new AppStore();
