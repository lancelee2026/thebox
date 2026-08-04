import type { BlockState } from './blockLogic';
import { occupiedCells } from './blockLogic';
import type { LevelMap } from './levels';

export interface ParsedLevel {
  grid: string[][];
  cols: number;
  rows: number;
  startCol: number;
  startRow: number;
}

/** 将 ASCII 关卡解析为矩形网格（短行右侧补 `.`） */
export function parseLevel(map: LevelMap): ParsedLevel {
  const rows = map.length;
  const cols = Math.max(...map.map((r) => r.length));
  const grid = map.map((row) => {
    const cells = row.split('');
    while (cells.length < cols) cells.push('.');
    return cells;
  });

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

  return { grid, cols, rows, startCol, startRow };
}

export function getCell(level: ParsedLevel, col: number, row: number): string {
  if (col < 0 || row < 0 || col >= level.cols || row >= level.rows) return '.';
  return level.grid[row][col];
}

/** 与游戏一致的死亡判定（含半悬空存活） */
export function isDeath(level: ParsedLevel, state: BlockState): boolean {
  const cells = occupiedCells(state);
  if (cells.length === 1) {
    const t = getCell(level, cells[0].col, cells[0].row);
    return t === '.' || t === 'z';
  }
  const a = getCell(level, cells[0].col, cells[0].row);
  const b = getCell(level, cells[1].col, cells[1].row);
  if (a === 'z' || b === 'z') return true;
  return a === '.' && b === '.';
}

/** 躺倒且两格皆为绿色目标 */
export function isWin(level: ParsedLevel, state: BlockState): boolean {
  const cells = occupiedCells(state);
  if (cells.length !== 2) return false;
  return (
    getCell(level, cells[0].col, cells[0].row) === 'o' &&
    getCell(level, cells[1].col, cells[1].row) === 'o'
  );
}
