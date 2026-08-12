import { LEVELS } from '../src/game/levels.ts';
import {
  canMerge,
  mergeBlocks,
  nextCubeState,
  nextState,
  occupiedCells,
  type BlockState,
  type Dir,
} from '../src/game/blockLogic.ts';
import { emptyBridges, emptyCollapsed } from '../src/game/levelTypes.ts';
import {
  applyCollapse,
  applySwitches,
  applyTeleport,
  isDeath,
  isWin,
  parseLevel,
  rawCell,
} from '../src/game/rules.ts';

const DIRS: Dir[] = ['left', 'right', 'up', 'down'];
const i = Number(process.argv[2] ?? '69') - 1;
const def = LEVELS[i];

type Node = {
  a: BlockState;
  b: BlockState | null;
  active: 0 | 1;
  bridges: Record<string, boolean>;
  collapsed: Record<string, boolean>;
  layer: number;
  path: Dir[];
};

function key(n: Node): string {
  const bk = Object.keys(n.bridges)
    .sort()
    .map((id) => `${id}:${n.bridges[id] ? 1 : 0}`)
    .join('|');
  const ck = Object.keys(n.collapsed)
    .filter((k) => n.collapsed[k])
    .sort()
    .join(';');
  const b = n.b ? `${n.b.col},${n.b.row}` : '-';
  return `${n.a.col},${n.a.row},${n.a.ori}|${b}|${n.active}|${n.layer}|${bk}|${ck}`;
}

function clone(s: BlockState): BlockState {
  return { col: s.col, row: s.row, ori: s.ori };
}

const startParsed = parseLevel(def, 0);
const start: Node = {
  a: { col: startParsed.startCol, row: startParsed.startRow, ori: 'standing' },
  b: null,
  active: 0,
  bridges: emptyBridges(def),
  collapsed: emptyCollapsed(),
  layer: 0,
  path: [],
};

const queue: Node[] = [start];
const seen = new Set<string>([key(start)]);
let found: Node | null = null;
let guard = 0;
while (queue.length && guard++ < 200000) {
  const cur = queue.shift()!;
  const parsed = parseLevel(def, cur.layer);
  if (!cur.b && isWin(parsed, cur.a, cur.bridges, cur.collapsed)) {
    found = cur;
    break;
  }
  const actives: Array<0 | 1> = cur.b ? [cur.active, (1 - cur.active) as 0 | 1] : [0];
  for (const active of actives) {
    for (const dir of DIRS) {
      let a = clone(cur.a);
      let b = cur.b ? clone(cur.b) : null;
      const movingCube = !!b;
      const prevMoving = movingCube ? (active === 0 ? cur.a : cur.b!) : cur.a;
      const prevCells = occupiedCells(prevMoving);
      if (movingCube) {
        if (active === 0) a = nextCubeState(a, dir);
        else b = nextCubeState(b!, dir);
      } else a = nextState(a, dir);

      let bridges = { ...cur.bridges };
      const moving = movingCube ? (active === 0 ? a : b!) : a;
      bridges = applySwitches(parsed, moving, bridges, movingCube);
      let layer = cur.layer;
      if (!b) {
        const warped = applyTeleport(parsed, a, false);
        if (warped) a = warped;
      }
      if (!b && parsed.splitPads.length) {
        const cells = occupiedCells(a);
        for (const pad of parsed.splitPads) {
          if (cells.some((c) => c.col === pad.col && c.row === pad.row)) {
            a = { col: pad.destA[0], row: pad.destA[1], ori: 'standing' };
            b = { col: pad.destB[0], row: pad.destB[1], ori: 'standing' };
            break;
          }
        }
      }
      if (b && canMerge(a, b)) {
        a = mergeBlocks(a, b);
        b = null;
      }
      if (def.layers && def.layers.length > 1 && !b && a.ori === 'standing') {
        const cells = occupiedCells(a);
        if (cells.some((c) => rawCell(parsed, c.col, c.row) === 'u')) {
          layer = (layer + 1) % def.layers.length;
        }
      }
      const stay = b ? [...occupiedCells(a), ...occupiedCells(b)] : occupiedCells(a);
      const collapsed = applyCollapse(parsed, prevCells, stay, cur.collapsed);
      const layerParsed = parseLevel(def, layer);
      if (b) continue;
      if (isDeath(layerParsed, a, bridges, collapsed)) continue;
      const next: Node = {
        a,
        b,
        active: 0,
        bridges,
        collapsed,
        layer,
        path: [...cur.path, dir],
      };
      const k = key(next);
      if (seen.has(k)) continue;
      seen.add(k);
      if (isWin(layerParsed, a, bridges, collapsed)) {
        found = next;
        queue.length = 0;
        break;
      }
      queue.push(next);
    }
  }
}

console.log('map', def.map);
console.log(found ? `path (${found.path.length}): ${found.path.join(' ')}` : 'none');
