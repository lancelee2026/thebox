/** Shared motion budget for Cuboid-like shell + block */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function animDuration(baseMs: number): number {
  if (prefersReducedMotion()) return Math.min(70, baseMs);
  return baseMs;
}

/** Cuboid-weight flip tip: accelerates into the fall */
export const EASE_FLIP = 'cubic-in' as const;
/** Soft arrivals / land / UI */
export const EASE_OUT = 'cubic-out' as const;
