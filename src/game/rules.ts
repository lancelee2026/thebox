import type { BlockState } from './blockLogic';
import { occupiedCells } from './blockLogic';
import type { LevelDef, LevelMap, SplitPadDef, SwitchDef, TeleportDef } from './levelTypes';

export interface ParsedLevel {
  def: LevelDef;
  /** 当前用于判定的网格（单层或指定 layer） */
  grid: string[][];
  cols: number;
  rows: number;
  startCol: number;
  startRow: number;
  /** bridgeId -> cells */
  bridgeCells: Map<string, Array<[number, number]>>;
  /** "col,row" -> bridgeId */
  cellToBridge: Map<string, string>;
  /** 已对齐到地图 s/S 的开关 */
  switches: SwitchDef[];
  /** 已对齐到地图 p 的分裂台 */
  splitPads: SplitPadDef[];
  /** 已对齐到地图 t 的传送台 */
  teleports: TeleportDef[];
}

function padGrid(map: LevelMap): { grid: string[][]; cols: number; rows: number } {
  const rows = map.length;
  const cols = Math.max(...map.map((r) => r.length), 1);
  const grid = map.map((row) => {
    const cells = row.split('');
    while (cells.length < cols) cells.push('.');
    return cells;
  });
  return { grid, cols, rows };
}

function collectCells(grid: string[][], ch: string): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === ch) out.push([c, r]);
    }
  }
  return out;
}

export function parseLevel(def: LevelDef, layer = 0): ParsedLevel {
  const map = def.layers?.[layer] ?? def.layers?.[0] ?? def.map;
  if (!map) throw new Error('LevelDef needs map or layers');
  const { grid, cols, rows } = padGrid(map);

  let startCol = 0;
  let startRow = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '@') {
        startCol = c;
        startRow = r;
      }
    }
  }

  const softTiles = collectCells(grid, 's');
  const hardTiles = collectCells(grid, 'S');
  let softI = 0;
  let hardI = 0;
  const switches: SwitchDef[] = (def.switches ?? []).map((sw) => {
    const tile = sw.type === 'hard' ? hardTiles[hardI++] : softTiles[softI++];
    return tile ? { ...sw, col: tile[0], row: tile[1] } : { ...sw };
  });

  const padTiles = collectCells(grid, 'p');
  const splitPads: SplitPadDef[] = (def.splitPads ?? []).map((pad, i) => {
    const tile = padTiles[i];
    return tile ? { ...pad, col: tile[0], row: tile[1] } : { ...pad };
  });

  const teleportTiles = collectCells(grid, 't');
  const teleports: TeleportDef[] = (def.teleports ?? []).map((pad, i) => {
    const tile = teleportTiles[i];
    return tile ? { ...pad, col: tile[0], row: tile[1] } : { ...pad };
  });

  const bridgeCells = new Map<string, Array<[number, number]>>();
  const cellToBridge = new Map<string, string>();
  for (const b of def.bridges ?? []) {
    bridgeCells.set(b.id, b.cells);
    for (const [c, r] of b.cells) {
      cellToBridge.set(`${c},${r}`, b.id);
    }
  }

  return {
    def,
    grid,
    cols,
    rows,
    startCol,
    startRow,
    bridgeCells,
    cellToBridge,
    switches,
    splitPads,
    teleports,
  };
}

/** 原始字符（不含桥开关状态） */
export function rawCell(level: ParsedLevel, col: number, row: number): string {
  if (col < 0 || row < 0 || col >= level.cols || row >= level.rows) return '.';
  return level.grid[row][col];
}

/**
 * 考虑桥开关后的有效格类型。
 * 关闭的桥视为虚空；开关格 s/S 视为可走（等同 x）。
 */
export function effectiveCell(
  level: ParsedLevel,
  col: number,
  row: number,
  bridges: Record<string, boolean>,
): string {
  const ch = rawCell(level, col, row);
  if (ch === 'b') {
    const id = level.cellToBridge.get(`${col},${row}`);
    if (!id || !bridges[id]) return '.';
    return 'x';
  }
  if (ch === 's' || ch === 'S') return 'x';
  if (ch === 'p' || ch === 'u' || ch === 't') return 'x';
  if (ch === '@') return 'x';
  return ch;
}

export function isSupport(ch: string): boolean {
  return ch === 'x' || ch === 'o' || ch === 'f' || ch === 'z';
}

/** 死亡判定：半悬空存活；站立踩 f / z / 空；躺倒踩 z 或双空 */
export function isDeath(
  level: ParsedLevel,
  state: BlockState,
  bridges: Record<string, boolean> = {},
): boolean {
  const cells = occupiedCells(state);
  if (cells.length === 1) {
    const t = effectiveCell(level, cells[0].col, cells[0].row, bridges);
    return t === '.' || t === 'z' || t === 'f';
  }
  const a = effectiveCell(level, cells[0].col, cells[0].row, bridges);
  const b = effectiveCell(level, cells[1].col, cells[1].row, bridges);
  if (a === 'z' || b === 'z') return true;
  return a === '.' && b === '.';
}

/** 小方块（分裂体）死亡：单格，脆弱砖也算支撑 */
export function isDeathCube(
  level: ParsedLevel,
  col: number,
  row: number,
  bridges: Record<string, boolean>,
): boolean {
  const t = effectiveCell(level, col, row, bridges);
  return t === '.' || t === 'z';
}

export function isWin(
  level: ParsedLevel,
  state: BlockState,
  bridges: Record<string, boolean> = {},
): boolean {
  const cells = occupiedCells(state);
  if (cells.length !== 2) return false;
  return (
    effectiveCell(level, cells[0].col, cells[0].row, bridges) === 'o' &&
    effectiveCell(level, cells[1].col, cells[1].row, bridges) === 'o'
  );
}

/** 移动后根据开关更新桥状态，返回新 bridges */
export function applySwitches(
  level: ParsedLevel,
  state: BlockState,
  bridges: Record<string, boolean>,
  isCube = false,
): Record<string, boolean> {
  const switches = level.switches;
  if (!switches.length) return bridges;

  const cells = occupiedCells(state);
  let next = { ...bridges };
  let changed = false;

  for (const sw of switches) {
    const onSwitch = cells.some((c) => c.col === sw.col && c.row === sw.row);
    if (!onSwitch) continue;
    if (sw.type === 'hard') {
      if (isCube || state.ori !== 'standing') continue;
    }
    for (const id of sw.bridgeIds) {
      if (sw.mode === 'toggle') {
        next[id] = !next[id];
        changed = true;
      }
    }
  }
  return changed ? next : bridges;
}

/** 整砖站立踩传送台时，出现在 dest；躺着或小方块不触发。不连环传送。 */
export function applyTeleport(
  level: ParsedLevel,
  state: BlockState,
  isCube = false,
): BlockState | null {
  if (isCube || state.ori !== 'standing' || !level.teleports.length) return null;
  for (const pad of level.teleports) {
    if (state.col !== pad.col || state.row !== pad.row) continue;
    const [col, row] = pad.dest;
    if (col === state.col && row === state.row) return null;
    return { col, row, ori: 'standing' };
  }
  return null;
}

export function cloneBridges(b: Record<string, boolean>): Record<string, boolean> {
  return { ...b };
}
