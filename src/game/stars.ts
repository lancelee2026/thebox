import { LEVEL_COUNT } from './levels';
import { parForLevel } from './par';

export const STAR_CAP = LEVEL_COUNT * 3;

export function starsForMoves(moves: number, level1Based: number): 1 | 2 | 3 {
  const par = parForLevel(level1Based);
  if (moves <= par) return 3;
  if (moves <= par + 3) return 2;
  return 1;
}

export function totalStars(stars: number[]): number {
  return stars.reduce((sum, n) => sum + (Number(n) || 0), 0);
}

export function emptyStars(): number[] {
  return Array.from({ length: LEVEL_COUNT }, () => 0);
}
