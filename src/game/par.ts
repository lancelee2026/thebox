/** 各关最少步（由求解器生成；不要手改，改关后跑 check-levels / dump-par） */
export const PAR: readonly number[] = [
  5, 11, 12, 8, 14, 7, 6, 10, 19, 14, 19, 14, 12, 6, 13, 3, 6, 6, 6, 7, 4, 7, 7,
  3, 10, 10, 9, 10, 11, 8, 10, 14, 16, 7, 17, 17, 10, 7, 7, 9, 10, 9, 10, 10, 3,
  8, 6, 7, 6, 6, 6, 6, 7, 8, 7, 5, 6, 10, 6, 15, 6, 9, 6, 14, 5, 6, 6, 6, 3, 3,
  9, 9, 8, 6, 8, 7, 9, 8,
];

export function parForLevel(level1Based: number): number {
  return PAR[level1Based - 1] ?? Number.POSITIVE_INFINITY;
}
