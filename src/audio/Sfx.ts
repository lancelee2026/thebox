export class Sfx {
  private ctx: AudioContext | null = null;
  private unavailable = false;
  muted = false;

  private ensure(): AudioContext | null {
    if (this.muted || this.unavailable) return null;
    if (!this.ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      // 部分离线容器会屏蔽 Web Audio；静音降级而非阻断游戏输入。
      if (!AC) {
        this.unavailable = true;
        return null;
      }
      try {
        this.ctx = new AC();
      } catch {
        this.unavailable = true;
        return null;
      }
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume().catch(() => undefined);
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

  /** 高空失足的克制风压声：纯 Web Audio 合成，不依赖外部音频资源。 */
  fallWind(durationMs = 900): void {
    const ctx = this.ensure();
    if (!ctx) return;
    const duration = Math.max(0.2, durationMs / 1000);
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = buffer;
    filter.type = 'bandpass';
    filter.frequency.value = 620;
    filter.Q.value = 0.72;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    const t0 = ctx.currentTime;
    gain.gain.setValueAtTime(0.001, t0);
    gain.gain.exponentialRampToValueAtTime(0.042, t0 + duration * 0.58);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
    filter.frequency.setValueAtTime(430, t0);
    filter.frequency.exponentialRampToValueAtTime(860, t0 + duration * 0.82);
    source.start(t0);
    source.stop(t0 + duration);
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
