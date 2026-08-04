export function animDuration(baseMs: number): number {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return Math.min(80, baseMs);
  }
  return baseMs;
}
