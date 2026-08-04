const KEY = 'fan-zhuan-kuai-progress-v1';

export interface Progress {
  /** 已通关最高关卡号（1-based）；0 表示尚未通关 */
  maxCleared: number;
  lastPlayed: number;
  muted: boolean;
}

const DEFAULT: Progress = {
  maxCleared: 0,
  lastPlayed: 1,
  muted: false,
};

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      maxCleared: Number(parsed.maxCleared) || 0,
      lastPlayed: Number(parsed.lastPlayed) || 1,
      muted: Boolean(parsed.muted),
    };
  } catch {
    return { ...DEFAULT };
  }
}

export function saveProgress(p: Progress): void {
  localStorage.setItem(KEY, JSON.stringify(p));
}

/** 关卡号 i（1-based）是否可选 */
export function isLevelPlayable(i: number, maxCleared: number): boolean {
  return i <= maxCleared || i === maxCleared + 1;
}

export function isLevelLocked(i: number, maxCleared: number): boolean {
  return !isLevelPlayable(i, maxCleared);
}
