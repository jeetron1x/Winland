// Web Audio API procedural beat generator & analyser
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private step = 0;
  private bpm = 110;
  private freqData: Uint8Array | null = null;
  private timeData: Uint8Array | null = null;
  private beatListeners: Array<(energy: number) => void> = [];
  private customSource: AudioBufferSourceNode | null = null;
  private isCustomAudio = false;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0.82;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
    this.timeData = new Uint8Array(this.analyser.frequencyBinCount);
  }

  public async resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.resume();
    if (this.isPlaying || !this.ctx) return;
    this.isPlaying = true;
    this.step = 0;
    const interval = (60 / this.bpm / 4) * 1000; // 16th note interval in ms
    this.timerId = window.setInterval(() => this.tick(), interval);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.customSource) {
      try { this.customSource.stop(); } catch {}
      this.customSource = null;
    }
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  public onBeat(cb: (energy: number) => void) {
    this.beatListeners.push(cb);
  }

  public getByteFrequencyData(): Uint8Array {
    if (this.analyser && this.freqData) {
      this.analyser.getByteFrequencyData(this.freqData as unknown as Uint8Array<ArrayBuffer>);
      return this.freqData;
    }
    return new Uint8Array(256);
  }

  public getByteTimeDomainData(): Uint8Array {
    if (this.analyser && this.timeData) {
      this.analyser.getByteTimeDomainData(this.timeData as unknown as Uint8Array<ArrayBuffer>);
      return this.timeData;
    }
    return new Uint8Array(256).fill(128);
  }

  public getBassEnergy(): number {
    const data = this.getByteFrequencyData();
    if (!data.length) return 0;
    let sum = 0;
    const count = 12; // sub-bass & bass bins
    for (let i = 0; i < count; i++) {
      sum += data[i];
    }
    return sum / (count * 255);
  }

  public async loadCustomAudio(file: File): Promise<string> {
    await this.resume();
    if (!this.ctx || !this.masterGain) throw new Error('AudioContext not ready');

    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);

    this.pause();
    this.isCustomAudio = true;

    this.customSource = this.ctx.createBufferSource();
    this.customSource.buffer = audioBuffer;
    this.customSource.loop = true;
    this.customSource.connect(this.masterGain);
    this.customSource.start(0);
    this.isPlaying = true;

    return file.name;
  }

  private tick() {
    if (!this.ctx || !this.masterGain || this.isCustomAudio) return;
    const now = this.ctx.currentTime;
    const s = this.step % 16;

    // Kick on steps 0, 4, 8, 12, with a skip on 10
    if (s === 0 || s === 4 || s === 8 || s === 12 || s === 14) {
      this.playKick(now);
      this.emitBeat(0.9);
    }

    // Snare / Clack on steps 4, 12
    if (s === 4 || s === 12) {
      this.playSnare(now);
    }

    // Hi-hats on every odd 16th note, accented on 8ths
    if (s % 2 === 0 || s % 3 === 0) {
      this.playHiHat(now, s % 4 === 2 ? 0.35 : 0.18);
    }

    // Synth Chords progression (Am7 -> Fmaj7 -> Cmaj7 -> G)
    if (s === 0 || s === 8) {
      const chordIndex = Math.floor(this.step / 16) % 4;
      const chords = [
        [220, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
        [174.61, 220, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
        [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
        [196.00, 246.94, 293.66, 392.00]  // G (G3, B3, D4, G4)
      ];
      this.playChords(now, chords[chordIndex]);
    }

    // Sub bass
    if (s === 0 || s === 6 || s === 10) {
      const bassFreqs = [55, 43.65, 65.41, 49]; // A1, F1, C2, G1
      const chordIndex = Math.floor(this.step / 16) % 4;
      this.playBass(now, bassFreqs[chordIndex]);
    }

    this.step++;
  }

  private playKick(t: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.12);

    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  private playSnare(t: number) {
    if (!this.ctx || !this.masterGain) return;
    // Noise buffer for snap
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(900, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start(t);
    whiteNoise.stop(t + 0.18);
  }

  private playHiHat(t: number, vol = 0.2) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7500, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.06);
  }

  private playChords(t: number, freqs: number[]) {
    if (!this.ctx || !this.masterGain) return;
    freqs.forEach(freq => {
      const osc = this.ctx!.createOscillator();
      const filter = this.ctx!.createBiquadFilter();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.frequency.exponentialRampToValueAtTime(600, t + 1.2);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(t);
      osc.stop(t + 1.5);
    });
  }

  private playBass(t: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.75);
  }

  private emitBeat(energy: number) {
    for (const cb of this.beatListeners) {
      cb(energy);
    }
  }
}

export const audio = new AudioEngine();
