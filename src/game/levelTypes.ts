import type { BlockState } from './blockLogic';

export type LevelMap = string[];

export type SwitchType = 'soft' | 'hard';

export interface BridgeDef {
  id: string;
  /** [col, row] cells that appear when open */
  cells: Array<[number, number]>;
  initiallyOpen: boolean;
}

export interface SwitchDef {
  col: number;
  row: number;
  type: SwitchType;
  bridgeIds: string[];
  mode: 'toggle';
}

export interface SplitPadDef {
  col: number;
  row: number;
  destA: [number, number];
  destB: [number, number];
}

export interface TeleportDef {
  /** 由地图 `t` 格按扫描序绑定；手写时可省略 */
  col?: number;
  row?: number;
  dest: [number, number];
}

export interface LevelDef {
  /** 单层地图；有 layers 时可省略 */
  map?: LevelMap;
  /** 多层时优先用 layers[layer] */
  layers?: LevelMap[];
  hint?: string;
  chapter?: string;
  bridges?: BridgeDef[];
  switches?: SwitchDef[];
  splitPads?: SplitPadDef[];
  teleports?: TeleportDef[];
}

/** 撤销 / 求解器用的世界快照（一期仅 block） */
export interface WorldSnapshot {
  block: BlockState;
  /** 分裂时第二块；未分裂为 null */
  blockB: BlockState | null;
  active: 0 | 1;
  bridges: Record<string, boolean>;
  /** "col,row" -> 已塌掉的裂砖 */
  collapsed: Record<string, boolean>;
  layer: number;
}

export function emptyBridges(def: LevelDef): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const b of def.bridges ?? []) {
    out[b.id] = b.initiallyOpen;
  }
  return out;
}

export function emptyCollapsed(): Record<string, boolean> {
  return {};
}

export function cloneCollapsed(c: Record<string, boolean>): Record<string, boolean> {
  return { ...c };
}

export function initialSnapshot(def: LevelDef, startCol: number, startRow: number): WorldSnapshot {
  return {
    block: { col: startCol, row: startRow, ori: 'standing' },
    blockB: null,
    active: 0,
    bridges: emptyBridges(def),
    collapsed: emptyCollapsed(),
    layer: 0,
  };
}
