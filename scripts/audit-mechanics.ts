/**
 * 审计：最短路是否用到本章机关；以及关掉机关后是否仍能过关（捷径）。
 * npm run audit-mechanics
 */
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
import { emptyBridges, emptyCollapsed, type LevelDef } from '../src/game/levelTypes.ts';
import {
  applyCollapse,
  applySwitches,
  applyTeleport,
  effectiveCell,
  isDeath,
  isWin,
  parseLevel,
  rawCell,
} from '../src/game/rules.ts';

const DIRS: Dir[] = ['left', 'right', 'up', 'down'];

type Flags = {
  switched: boolean;
  bridged: boolean;
  fragile: boolean;
  split: boolean;
  merged: boolean;
  layered: boolean;
  teleported: boolean;
  crumbled: boolean;
};

type Mode = 'full' | 'no-switch' | 'no-split' | 'no-teleport' | 'no-layer' | 'no-fragile' | 'no-crumble';

type Node = {
  a: BlockState;
  b: BlockState | null;
  active: 0 | 1;
  bridges: Record<string, boolean>;
  collapsed: Record<string, boolean>;
  layer: number;
  d: number;
  flags: Flags;
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

function emptyFlags(): Flags {
  return {
    switched: false,
    bridged: false,
    fragile: false,
    split: false,
    merged: false,
    layered: false,
    teleported: false,
    crumbled: false,
  };
}

function solve(def: LevelDef, mode: Mode): { moves: number; flags: Flags } | null {
  const startParsed = parseLevel(def, 0);
  const start: Node = {
    a: { col: startParsed.startCol, row: startParsed.startRow, ori: 'standing' },
    b: null,
    active: 0,
    bridges: emptyBridges(def),
    collapsed: emptyCollapsed(),
    layer: 0,
    d: 0,
    flags: emptyFlags(),
  };
  const queue: Node[] = [start];
  const seen = new Set<string>([key(start)]);
  let guard = 0;

  while (queue.length && guard++ < 250000) {
    const cur = queue.shift()!;
    const parsed = parseLevel(def, cur.layer);
    if (!cur.b && isWin(parsed, cur.a, cur.bridges, cur.collapsed)) {
      return { moves: cur.d, flags: cur.flags };
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

        const flags = { ...cur.flags };
        let bridges = { ...cur.bridges };
        const moving = movingCube ? (active === 0 ? a : b!) : a;
        if (mode !== 'no-switch') {
          const nextBridges = applySwitches(parsed, moving, bridges, movingCube);
          if (nextBridges !== bridges) flags.switched = true;
          bridges = nextBridges;
        }

        const movingCells = occupiedCells(moving);
        for (const cell of movingCells) {
          const ch = effectiveCell(parsed, cell.col, cell.row, bridges, cur.collapsed);
          if (rawCell(parsed, cell.col, cell.row) === 'b' && bridges[parsed.cellToBridge.get(`${cell.col},${cell.row}`) ?? '']) {
            flags.bridged = true;
          }
          if (ch === 'f' || rawCell(parsed, cell.col, cell.row) === 'f') flags.fragile = true;
        }
        if (mode === 'no-fragile' && flags.fragile && !cur.flags.fragile) continue;

        let layer = cur.layer;
        if (!b) {
          const warped = applyTeleport(parsed, a, false);
          if (warped) {
            if (mode === 'no-teleport') continue;
            flags.teleported = true;
            a = warped;
          }
        }
        if (!b && parsed.splitPads.length) {
          const cells = occupiedCells(a);
          let didSplit = false;
          for (const pad of parsed.splitPads) {
            if (cells.some((c) => c.col === pad.col && c.row === pad.row)) {
              if (mode === 'no-split') {
                didSplit = true;
                break;
              }
              a = { col: pad.destA[0], row: pad.destA[1], ori: 'standing' };
              b = { col: pad.destB[0], row: pad.destB[1], ori: 'standing' };
              flags.split = true;
              break;
            }
          }
          if (mode === 'no-split' && didSplit) continue;
        }
        if (b && canMerge(a, b)) {
          a = mergeBlocks(a, b);
          b = null;
          flags.merged = true;
        }
        if (def.layers && def.layers.length > 1 && !b && a.ori === 'standing') {
          const cells = occupiedCells(a);
          if (cells.some((c) => rawCell(parsed, c.col, c.row) === 'u')) {
            if (mode === 'no-layer') continue;
            layer = (layer + 1) % def.layers.length;
            flags.layered = true;
          }
        }

        const stay = b ? [...occupiedCells(a), ...occupiedCells(b)] : occupiedCells(a);
        let collapsed = cur.collapsed;
        collapsed = applyCollapse(parsed, prevCells, stay, cur.collapsed);
        if (Object.keys(collapsed).some((k) => collapsed[k] && !cur.collapsed[k])) {
          flags.crumbled = true;
          if (mode === 'no-crumble') continue;
        }

        const layerParsed = parseLevel(def, layer);
        if (b) {
          const bad = (s: BlockState) => {
            const t = effectiveCell(layerParsed, s.col, s.row, bridges, collapsed);
            return t === '.' || t === 'z';
          };
          if (bad(a) || bad(b)) continue;
        } else if (isDeath(layerParsed, a, bridges, collapsed)) {
          continue;
        }

        const next: Node = {
          a,
          b,
          active: b ? active : 0,
          bridges,
          collapsed,
          layer,
          d: cur.d + 1,
          flags,
        };
        const k = key(next);
        if (seen.has(k)) continue;
        seen.add(k);
        if (!b && isWin(layerParsed, a, bridges, collapsed)) {
          return { moves: next.d, flags };
        }
        queue.push(next);
      }
    }
  }
  return null;
}

function expectedMode(chapter: string | undefined): Mode | null {
  switch (chapter) {
    case '脆弱':
      return 'no-fragile';
    case '桥梁':
      return 'no-switch';
    case '分裂':
      return 'no-split';
    case '多层':
      return 'no-layer';
    case '传送':
      return 'no-teleport';
    case '崩塌':
      return 'no-crumble';
    default:
      return null;
  }
}

function usedMain(chapter: string | undefined, flags: Flags): boolean {
  switch (chapter) {
    case '脆弱':
      return flags.fragile;
    case '桥梁':
      return flags.switched || flags.bridged;
    case '分裂':
      return flags.split;
    case '多层':
      return flags.layered;
    case '传送':
      return flags.teleported;
    case '崩塌':
      return flags.crumbled;
    default:
      return true;
  }
}

export function mechanicSkipErrors(): string[] {
  const errors: string[] = [];
  LEVELS.forEach((def, i) => {
    const n = i + 1;
    const ch = def.chapter ?? '';
    if (ch === '基础' || !ch) return;
    const full = solve(def, 'full');
    if (!full) {
      errors.push(`Level ${n} [${ch}]: UNSOLVABLE`);
      return;
    }
    if (!usedMain(ch, full.flags)) {
      errors.push(`Level ${n} [${ch}]: shortest path never uses the chapter mechanic`);
    }
    const mode = expectedMode(ch);
    if (mode) {
      const alt = solve(def, mode);
      if (alt) {
        errors.push(
          `Level ${n} [${ch}]: can skip mechanic in ${alt.moves} moves (min ${full.moves})`,
        );
      }
    }
  });
  return errors;
}

function main(): void {
  const rows: string[] = [];
  let skipMin = 0;
  let bypass = 0;
  console.log(
    'Lv  ch     par  used  bypass  flags',
  );
  LEVELS.forEach((def, i) => {
    const n = i + 1;
    const ch = def.chapter ?? '';
    const full = solve(def, 'full');
    if (!full) {
      console.log(`${String(n).padStart(2)}  ${ch.padEnd(4)}  UNSOLVABLE`);
      return;
    }
    const used = usedMain(ch, full.flags);
    const mode = expectedMode(ch);
    const alt = mode ? solve(def, mode) : null;
    const canBypass = !!alt;
    const flagStr = Object.entries(full.flags)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(',') || '-';
    const mark = !used || canBypass ? ' ←' : '';
    if (!used) skipMin++;
    if (canBypass && ch !== '基础') bypass++;
    const line = `${String(n).padStart(2)}  ${ch.padEnd(4)}  ${String(full.moves).padStart(3)}  ${used ? 'yes ' : 'NO  '}  ${canBypass ? `YES(${alt.moves})` : 'no      '}  ${flagStr}${mark}`;
    console.log(line);
    rows.push(line);
  });
  console.log('');
  console.log(`最短路没用本章机关: ${skipMin}`);
  console.log(`关掉机关仍能过: ${bypass}`);
}

const isDirect = process.argv[1]?.includes('audit-mechanics');
if (isDirect) main();
