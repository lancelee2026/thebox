export class Sfx {
  private ctx: AudioContext | null = null;
  muted = false;

  private ensure(): AudioContext | null {
    if (this.muted) return null;
    if (!this.ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  unlock(): void {
    this.ensure();
  }

  setMuted(m: boolean): void {
    this.muted = m;
  }

  beep(freq: number, durationMs: number, gain = 0.25, type: OscillatorType = 'sine'): void {
    const ctx = this.ensure();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g);
    g.connect(ctx.destination);
    const t0 = ctx.currentTime;
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + durationMs / 1000);
    osc.start(t0);
    osc.stop(t0 + durationMs / 1000);
  }

  move(): void {
    this.beep(190 + Math.random() * 25, 45, 0.16, 'triangle');
  }

  /** 落地轻顿 */
  land(): void {
    this.beep(120, 35, 0.14, 'sine');
  }

  fail(): void {
    this.beep(140, 80, 0.22, 'sawtooth');
    setTimeout(() => this.beep(90, 200, 0.2, 'sine'), 70);
  }

  win(): void {
    const notes = [262, 330, 392, 523, 659];
    notes.forEach((n, i) => {
      setTimeout(() => this.beep(n, 140, 0.18, 'triangle'), i * 85);
    });
  }

  clearLevel(): void {
    this.beep(440, 60, 0.14, 'sine');
    setTimeout(() => this.beep(554, 90, 0.16, 'sine'), 70);
  }
}
