import cloudFarUrl from '../assets/cloud-far.png';
import cloudMidUrl from '../assets/cloud-mid.png';
import cloudNearUrl from '../assets/cloud-near.png';

type CloudDepth = 'far' | 'mid' | 'near';

interface CloudProfile {
  width: [number, number];
  opacity: [number, number];
  duration: [number, number];
  y: [number, number];
  blur: number;
}

const PROFILES: Record<CloudDepth, CloudProfile> = {
  far: {
    width: [0.34, 0.48],
    opacity: [0.2, 0.32],
    duration: [18_000, 24_000],
    y: [0.02, 0.5],
    blur: 0.8,
  },
  mid: {
    width: [0.52, 0.7],
    opacity: [0.42, 0.58],
    duration: [13_000, 18_000],
    y: [0.08, 0.58],
    blur: 0.25,
  },
  near: {
    width: [0.78, 1.02],
    opacity: [0.58, 0.74],
    duration: [9_000, 13_000],
    y: [0.12, 0.64],
    blur: 1.4,
  },
};

const CLOUD_ASSETS = [cloudFarUrl, cloudMidUrl, cloudNearUrl] as const;

function between(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * 高空云雾挑战：同一透明云带裁出三种轮廓，并以远、中、近三层随机穿场。
 * 远云位于 WebGL 画布后方，近云位于前方，形成真实遮挡层级而非单纯缩放。
 */
export class CloudField {
  private sprites: HTMLElement[];
  private timers: Array<number | null> = [];
  private animations: Array<Animation | null> = [];
  private shapeIndexes: number[];
  private active = false;
  private reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  constructor() {
    this.sprites = Array.from(document.querySelectorAll<HTMLElement>('[data-cloud-depth]'));
    const shapeRotation = Math.floor(Math.random() * CLOUD_ASSETS.length);
    this.shapeIndexes = this.sprites.map(
      (_, index) => (index + shapeRotation) % CLOUD_ASSETS.length,
    );
    this.reducedMotion.addEventListener('change', this.refresh);
    document.addEventListener('visibilitychange', this.refresh);
  }

  setActive(active: boolean): void {
    if (this.active === active) return;
    this.active = active;
    this.refresh();
  }

  private refresh = (): void => {
    this.stop();
    if (!this.active || document.hidden) return;
    if (this.reducedMotion.matches) {
      this.showReducedMotionComposition();
      return;
    }
    this.sprites.forEach((_, index) => {
      const initialDelay = index * 2_400 + between(200, 1_600);
      this.queue(index, initialDelay);
    });
  };

  private stop(): void {
    this.timers.forEach((timer) => {
      if (timer !== null) window.clearTimeout(timer);
    });
    this.animations.forEach((animation) => animation?.cancel());
    this.timers = this.sprites.map(() => null);
    this.animations = this.sprites.map(() => null);
    this.sprites.forEach((sprite) => {
      sprite.style.opacity = '0';
      sprite.style.removeProperty('transform');
    });
  }

  private queue(index: number, delay: number): void {
    this.timers[index] = window.setTimeout(() => this.launch(index), delay);
  }

  private launch(index: number): void {
    if (!this.active || this.reducedMotion.matches || document.hidden) return;
    const sprite = this.sprites[index];
    const depth = sprite.dataset.cloudDepth as CloudDepth;
    const profile = PROFILES[depth];
    const field = sprite.parentElement;
    if (!profile || !field) return;

    const fieldWidth = Math.max(240, field.clientWidth);
    const fieldHeight = Math.max(240, field.clientHeight);
    const width = fieldWidth * between(...profile.width);
    // 方形舞台槽完整承载带透明留白的云图，避免任何方向发生硬裁切。
    const height = width;
    const direction = Math.random() < 0.5 ? 1 : -1;
    const startX = direction === 1 ? -width * 1.08 : fieldWidth + width * 0.08;
    const endX = direction === 1 ? fieldWidth + width * 0.08 : -width * 1.08;
    const startY = fieldHeight * between(...profile.y) - height * 0.3;
    const endY = startY + between(-fieldHeight * 0.12, fieldHeight * 0.12);
    const opacity = between(...profile.opacity);
    const duration = between(...profile.duration);
    const flip = Math.random() < 0.5 ? -1 : 1;

    sprite.style.width = `${width}px`;
    sprite.style.height = `${height}px`;
    const shapeIndex = this.shapeIndexes[index];
    sprite.style.backgroundImage = `url("${CLOUD_ASSETS[shapeIndex]}")`;
    // Each depth starts with a different cloud and must switch shape next time.
    this.shapeIndexes[index] = (shapeIndex + (Math.random() < 0.5 ? 1 : 2)) % CLOUD_ASSETS.length;
    sprite.style.filter = `blur(${profile.blur}px)`;
    sprite.style.zIndex = depth === 'far' ? '0' : depth === 'mid' ? '1' : '2';

    const transform = (x: number, y: number, rotation: number) =>
      `translate3d(${x}px, ${y}px, 0) scaleX(${flip}) rotate(${rotation}deg)`;
    const animation = sprite.animate(
      [
        { opacity: 0, transform: transform(startX, startY, direction * -1.2) },
        { opacity: opacity * 0.72, offset: 0.12 },
        { opacity, offset: 0.42 },
        { opacity: opacity * 0.88, offset: 0.82 },
        { opacity: 0, transform: transform(endX, endY, direction * 1.2) },
      ],
      { duration, easing: 'linear', fill: 'forwards' },
    );
    this.animations[index] = animation;
    animation.onfinish = () => {
      this.animations[index] = null;
      sprite.style.opacity = '0';
      if (this.active) this.queue(index, between(1_800, 5_800));
    };
  }

  private showReducedMotionComposition(): void {
    this.sprites.forEach((sprite, index) => {
      const depth = sprite.dataset.cloudDepth as CloudDepth;
      const field = sprite.parentElement;
      if (!field) return;
      const width = field.clientWidth * (depth === 'far' ? 0.38 : depth === 'mid' ? 0.58 : 0.82);
      sprite.style.width = `${width}px`;
      sprite.style.height = `${width}px`;
      sprite.style.backgroundImage = `url("${CLOUD_ASSETS[this.shapeIndexes[index]]}")`;
      sprite.style.filter = `blur(${PROFILES[depth].blur}px)`;
      sprite.style.opacity = depth === 'near' ? '0' : depth === 'far' ? '0.22' : '0.4';
      sprite.style.transform = depth === 'far'
        ? 'translate3d(112%, 12%, 0)'
        : 'translate3d(-16%, 118%, 0)';
    });
  }
}
