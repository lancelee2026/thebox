/**
 * 离线关卡可达性检查（BFS）。npm run check-levels
 */
import {
  canMerge,
  mergeBlocks,
  nextCubeState,
  nextState,
  occupiedCells,
  type BlockState,
  type Dir,
} from '../src/game/blockLogic.ts';
import { LEVELS } from '../src/game/levels.ts';
import { emptyBridges, type LevelDef } from '../src/game/levelTypes.ts';
import {
  applySwitches,
  effectiveCell,
  isDeath,
  isWin,
  parseLevel,
  rawCell,
} from '../src/game/rules.ts';

const DIRS: Dir[] = ['left', 'right', 'up', 'down'];

type Node = {
  a: BlockState;
  b: BlockState | null;
  active: 0 | 1;
  bridges: Record<string, boolean>;
  layer: number;
};

function key(n: Node): string {
  const bk = Object.keys(n.bridges)
    .sort()
    .map((id) => `${id}:${n.bridges[id] ? 1 : 0}`)
    .join('|');
  const b = n.b ? `${n.b.col},${n.b.row}` : '-';
  return `${n.a.col},${n.a.row},${n.a.ori}|${b}|${n.active}|${n.layer}|${bk}`;
}

function cubeDead(def: LevelDef, layer: number, col: number, row: number, bridges: Record<string, boolean>): boolean {
  const parsed = parseLevel(def, layer);
  const t = effectiveCell(parsed, col, row, bridges);
  return t === '.' || t === 'z';
}

export function solveMinMoves(def: LevelDef): number | null {
  const startParsed = parseLevel(def, 0);
  const start: Node = {
    a: { col: startParsed.startCol, row: startParsed.startRow, ori: 'standing' },
    b: null,
    active: 0,
    bridges: emptyBridges(def),
    layer: 0,
  };

  const queue: Node[] = [start];
  const dist = new Map<string, number>([[key(start), 0]]);
  let guard = 0;
  const LIMIT = 200000;

  while (queue.length > 0 && guard++ < LIMIT) {
    const cur = queue.shift()!;
    const d = dist.get(key(cur))!;
    const parsed = parseLevel(def, cur.layer);

    if (!cur.b && isWin(parsed, cur.a, cur.bridges)) return d;

    // swap when split (counts as a move? Bloxorz swap is free with space - we count 0 cost via branching both)
    const actives: Array<0 | 1> = cur.b ? [cur.active, (1 - cur.active) as 0 | 1] : [0];

    for (const active of actives) {
      const base = { ...cur, active, bridges: { ...cur.bridges } };
      for (const dir of DIRS) {
        let a = clone(base.a);
        let b = base.b ? clone(base.b) : null;
        const movingCube = !!b;
        if (movingCube) {
          if (active === 0) a = nextCubeState(a, dir);
          else b = nextCubeState(b!, dir);
        } else {
          a = nextState(a, dir);
        }

        let bridges = { ...base.bridges };
        const moving = movingCube ? (active === 0 ? a : b!) : a;
        bridges = applySwitches(parsed, moving, bridges, movingCube);

        let layer = base.layer;

        // split
        if (!b && def.splitPads?.length) {
          const cells = occupiedCells(a);
          for (const pad of def.splitPads) {
            if (cells.some((c) => c.col === pad.col && c.row === pad.row)) {
              a = { col: pad.destA[0], row: pad.destA[1], ori: 'standing' };
              b = { col: pad.destB[0], row: pad.destB[1], ori: 'standing' };
              break;
            }
          }
        }

        // merge
        if (b && canMerge(a, b)) {
          a = mergeBlocks(a, b);
          b = null;
        }

        // stair
        if (def.layers && def.layers.length > 1 && !b && a.ori === 'standing') {
          const cells = occupiedCells(a);
          if (cells.some((c) => rawCell(parsed, c.col, c.row) === 'u')) {
            layer = (layer + 1) % def.layers.length;
          }
        }

        const layerParsed = parseLevel(def, layer);

        if (b) {
          if (cubeDead(def, layer, a.col, a.row, bridges) || cubeDead(def, layer, b.col, b.row, bridges)) {
            continue;
          }
        } else if (isDeath(layerParsed, a, bridges)) {
          continue;
        }

        const next: Node = { a, b, active: b ? active : 0, bridges, layer };
        const k = key(next);
        if (dist.has(k)) continue;
        if (!b && isWin(layerParsed, a, bridges)) return d + 1;
        dist.set(k, d + 1);
        queue.push(next);
      }
    }
  }
  return null;
}

function clone(s: BlockState): BlockState {
  return { col: s.col, row: s.row, ori: s.ori };
}

function main(): void {
  let failed = 0;
  console.log(`Checking ${LEVELS.length} levels...\n`);
  LEVELS.forEach((def, i) => {
    const n = i + 1;
    const moves = solveMinMoves(def);
    if (moves === null) {
      failed++;
      console.log(`Level ${n}: UNSOLVABLE [${def.chapter ?? ''}] ${def.hint ?? ''}`);
    } else {
      console.log(`Level ${n}: OK (min ${moves}) [${def.chapter ?? ''}]`);
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
