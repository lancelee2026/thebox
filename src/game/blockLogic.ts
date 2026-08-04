export type Ori = 'standing' | 'flatX' | 'flatZ';
export type Dir = 'left' | 'right' | 'up' | 'down';

/** flatX: (col,row)+(col+1,row)；flatZ: (col,row)+(col,row+1) */
export interface BlockState {
  col: number;
  row: number;
  ori: Ori;
}

export interface Cell {
  col: number;
  row: number;
}

export function cloneState(s: BlockState): BlockState {
  return { col: s.col, row: s.row, ori: s.ori };
}

export function occupiedCells(s: BlockState): Cell[] {
  if (s.ori === 'standing') return [{ col: s.col, row: s.row }];
  if (s.ori === 'flatX') {
    return [
      { col: s.col, row: s.row },
      { col: s.col + 1, row: s.row },
    ];
  }
  return [
    { col: s.col, row: s.row },
    { col: s.col, row: s.row + 1 },
  ];
}

/** 标准 Bloxorz / Cuboid 翻边转移 */
export function nextState(s: BlockState, dir: Dir): BlockState {
  const { col, row, ori } = s;

  if (ori === 'standing') {
    if (dir === 'left') return { col: col - 2, row, ori: 'flatX' };
    if (dir === 'right') return { col: col + 1, row, ori: 'flatX' };
    if (dir === 'up') return { col, row: row - 2, ori: 'flatZ' };
    return { col, row: row + 1, ori: 'flatZ' };
  }

  if (ori === 'flatX') {
    if (dir === 'left') return { col: col - 1, row, ori: 'standing' };
    if (dir === 'right') return { col: col + 2, row, ori: 'standing' };
    if (dir === 'up') return { col, row: row - 1, ori: 'flatX' };
    return { col, row: row + 1, ori: 'flatX' };
  }

  // flatZ
  if (dir === 'up') return { col, row: row - 1, ori: 'standing' };
  if (dir === 'down') return { col, row: row + 2, ori: 'standing' };
  if (dir === 'left') return { col: col - 1, row, ori: 'flatZ' };
  return { col: col + 1, row, ori: 'flatZ' };
}

/** 1×1 小方块：每次只移一格，始终站立 */
export function nextCubeState(s: BlockState, dir: Dir): BlockState {
  const { col, row } = s;
  if (dir === 'left') return { col: col - 1, row, ori: 'standing' };
  if (dir === 'right') return { col: col + 1, row, ori: 'standing' };
  if (dir === 'up') return { col, row: row - 1, ori: 'standing' };
  return { col, row: row + 1, ori: 'standing' };
}

/** 两颗站立小方块是否相邻可合并 */
export function canMerge(a: BlockState, b: BlockState): boolean {
  if (a.ori !== 'standing' || b.ori !== 'standing') return false;
  const dc = Math.abs(a.col - b.col);
  const dr = Math.abs(a.row - b.row);
  return (dc === 1 && dr === 0) || (dc === 0 && dr === 1);
}

/** 合并为长砖：以较小 col/row 为锚点 */
export function mergeBlocks(a: BlockState, b: BlockState): BlockState {
  if (a.row === b.row) {
    return { col: Math.min(a.col, b.col), row: a.row, ori: 'flatX' };
  }
  return { col: a.col, row: Math.min(a.row, b.row), ori: 'flatZ' };
}

/** 世界坐标：砖块几何中心（y 为底部之上的中心高度） */
export function worldCenter(s: BlockState): { x: number; y: number; z: number } {
  if (s.ori === 'standing') return { x: s.col, y: 1, z: s.row };
  if (s.ori === 'flatX') return { x: s.col + 0.5, y: 0.5, z: s.row };
  return { x: s.col, y: 0.5, z: s.row + 0.5 };
}

export function blockSize(s: BlockState): { sx: number; sy: number; sz: number } {
  if (s.ori === 'standing') return { sx: 1, sy: 2, sz: 1 };
  if (s.ori === 'flatX') return { sx: 2, sy: 1, sz: 1 };
  return { sx: 1, sy: 1, sz: 2 };
}
