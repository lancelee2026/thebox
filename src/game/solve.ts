import {
  canMerge,
  mergeBlocks,
  nextCubeState,
  nextState,
  occupiedCells,
  type BlockState,
  type Dir,
} from './blockLogic';
import { emptyBridges, emptyCollapsed, type LevelDef } from './levelTypes';
import {
  applyCollapse,
  applySwitches,
  applyTeleport,
  effectiveCell,
  isDeath,
  isWin,
  parseLevel,
  rawCell,
} from './rules';

const DIRS: Dir[] = ['left', 'right', 'up', 'down'];

type Node = {
  a: BlockState;
  b: BlockState | null;
  active: 0 | 1;
  bridges: Record<string, boolean>;
  collapsed: Record<string, boolean>;
  layer: number;
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

function cubeDead(
  def: LevelDef,
  layer: number,
  col: number,
  row: number,
  bridges: Record<string, boolean>,
  collapsed: Record<string, boolean>,
): boolean {
  const parsed = parseLevel(def, layer);
  const t = effectiveCell(parsed, col, row, bridges, collapsed);
  return t === '.' || t === 'z';
}

function clone(s: BlockState): BlockState {
  return { col: s.col, row: s.row, ori: s.ori };
}

/** BFS 最少步；无解返回 null */
export function solveMinMoves(def: LevelDef): number | null {
  const startParsed = parseLevel(def, 0);
  const start: Node = {
    a: { col: startParsed.startCol, row: startParsed.startRow, ori: 'standing' },
    b: null,
    active: 0,
    bridges: emptyBridges(def),
    collapsed: emptyCollapsed(),
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

    if (!cur.b && isWin(parsed, cur.a, cur.bridges, cur.collapsed)) return d;

    const actives: Array<0 | 1> = cur.b ? [cur.active, (1 - cur.active) as 0 | 1] : [0];

    for (const active of actives) {
      const base = { ...cur, active, bridges: { ...cur.bridges }, collapsed: { ...cur.collapsed } };
      for (const dir of DIRS) {
        let a = clone(base.a);
        let b = base.b ? clone(base.b) : null;
        const movingCube = !!b;
        const prevMoving = movingCube ? (active === 0 ? base.a : base.b!) : base.a;
        const prevCells = occupiedCells(prevMoving);

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

        const stay = b
          ? [...occupiedCells(a), ...occupiedCells(b)]
          : occupiedCells(a);
        const collapsed = applyCollapse(parsed, prevCells, stay, base.collapsed);

        const layerParsed = parseLevel(def, layer);

        if (b) {
          if (
            cubeDead(def, layer, a.col, a.row, bridges, collapsed) ||
            cubeDead(def, layer, b.col, b.row, bridges, collapsed)
          ) {
            continue;
          }
        } else if (isDeath(layerParsed, a, bridges, collapsed)) {
          continue;
        }

        const next: Node = { a, b, active: b ? active : 0, bridges, collapsed, layer };
        const k = key(next);
        if (dist.has(k)) continue;
        if (!b && isWin(layerParsed, a, bridges, collapsed)) return d + 1;
        dist.set(k, d + 1);
        queue.push(next);
      }
    }
  }
  return null;
}
