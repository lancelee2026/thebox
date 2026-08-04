/**
 * 离线关卡可达性检查（BFS）。
 * 仅本地 / CI 使用：npm run check-levels
 * 不参与 Vite 构建，不会进入 Cloudflare Pages 产物。
 */
import { nextState, type BlockState, type Dir } from '../src/game/blockLogic.ts';
import { LEVELS } from '../src/game/levels.ts';
import { isDeath, isWin, parseLevel } from '../src/game/rules.ts';

const DIRS: Dir[] = ['left', 'right', 'up', 'down'];

function stateKey(s: BlockState): string {
  return `${s.col},${s.row},${s.ori}`;
}

/** 最短步数；无解返回 null */
export function solveMinMoves(map: string[]): number | null {
  const level = parseLevel(map);
  const start: BlockState = {
    col: level.startCol,
    row: level.startRow,
    ori: 'standing',
  };

  if (isWin(level, start)) return 0;
  if (isDeath(level, start)) return null;

  const queue: BlockState[] = [start];
  const dist = new Map<string, number>([[stateKey(start), 0]]);

  while (queue.length > 0) {
    const cur = queue.shift()!;
    const d = dist.get(stateKey(cur))!;

    for (const dir of DIRS) {
      const next = nextState(cur, dir);
      const key = stateKey(next);
      if (dist.has(key)) continue;
      if (isDeath(level, next)) continue;
      if (isWin(level, next)) return d + 1;
      dist.set(key, d + 1);
      queue.push(next);
    }
  }

  return null;
}

function main(): void {
  let failed = 0;
  console.log(`Checking ${LEVELS.length} levels...\n`);

  LEVELS.forEach((map, i) => {
    const n = i + 1;
    const moves = solveMinMoves(map);
    if (moves === null) {
      failed++;
      console.log(`Level ${n}: UNSOLVABLE`);
    } else {
      console.log(`Level ${n}: OK (min ${moves} moves)`);
    }
  });

  console.log('');
  if (failed > 0) {
    console.error(`${failed} level(s) have no solution.`);
    process.exit(1);
  }
  console.log('All levels solvable.');
}

main();
