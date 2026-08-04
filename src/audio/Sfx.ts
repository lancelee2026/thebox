export class Sfx {
  private ctx: AudioContext | null = null;
  muted = false;

  private ensure(): AudioContext | null {
    if (this.muted) return null;
    if (!this.ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

  beep(freq: number, durationMs: number, gain = 0.25): void {
    const ctx = this.ensure();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
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
    this.beep(200 + Math.random() * 20, 50, 0.2);
  }

  fail(): void {
    this.beep(100, 280, 0.3);
  }

  win(): void {
    const notes = [261, 329, 392, 523];
    notes.forEach((n, i) => {
      setTimeout(() => this.beep(n, 120, 0.22), i * 90);
    });
  }
}
