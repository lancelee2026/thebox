import { LEVEL_COUNT } from './levels';
import { emptyStars } from './stars';

const KEY = 'fan-zhuan-kuai-progress-v3';
const LEGACY_KEYS = ['fan-zhuan-kuai-progress-v2', 'fan-zhuan-kuai-progress-v1'];

export interface Progress {
  /** 已通关最高关卡号（1-based）；0 表示尚未通关 */
  maxCleared: number;
  lastPlayed: number;
  muted: boolean;
  /** 每关历史最高星 0–3，下标 = 关卡-1 */
  stars: number[];
}

const DEFAULT: Progress = {
  maxCleared: 0,
  lastPlayed: 1,
  muted: false,
  stars: emptyStars(),
};

function clampStars(raw: unknown, maxCleared: number): number[] {
  const stars = emptyStars();
  if (Array.isArray(raw)) {
    for (let i = 0; i < LEVEL_COUNT; i++) {
      const v = Math.floor(Number(raw[i]) || 0);
      stars[i] = Math.min(3, Math.max(0, v));
    }
    return stars;
  }
  for (let i = 0; i < maxCleared; i++) stars[i] = 1;
  return stars;
}

export function loadProgress(): Progress {
  try {
    let raw = localStorage.getItem(KEY);
    for (const legacy of LEGACY_KEYS) {
      if (raw) break;
      raw = localStorage.getItem(legacy);
    }
    if (!raw) return { ...DEFAULT, stars: emptyStars() };
    const parsed = JSON.parse(raw) as Partial<Progress>;
    const maxCleared = Number(parsed.maxCleared) || 0;
    return {
      maxCleared,
      lastPlayed: Number(parsed.lastPlayed) || 1,
      muted: Boolean(parsed.muted),
      stars: clampStars(parsed.stars, maxCleared),
    };
  } catch {
    return { ...DEFAULT, stars: emptyStars() };
  }
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* 隐私模式 / 配额满时忽略 */
  }
}

export function recordStars(p: Progress, level1Based: number, earned: number): Progress {
  const next = { ...p, stars: p.stars.slice() };
  const i = level1Based - 1;
  if (i < 0 || i >= LEVEL_COUNT) return next;
  next.stars[i] = Math.max(next.stars[i] ?? 0, earned);
  return next;
}

export function isLevelPlayable(i: number, maxCleared: number): boolean {
  return i <= maxCleared || i === maxCleared + 1;
}

export function isLevelLocked(i: number, maxCleared: number): boolean {
  return !isLevelPlayable(i, maxCleared);
}
