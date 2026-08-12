import { LEVELS } from '../src/game/levels.ts';
import { solveMinMoves } from '../src/game/solve.ts';
import { parseLevel, effectiveCell, applyCollapse } from '../src/game/rules.ts';
import { nextState, occupiedCells } from '../src/game/blockLogic.ts';
import { emptyBridges, emptyCollapsed } from '../src/game/levelTypes.ts';

const i = Number(process.argv[2] ?? '70') - 1;
const def = LEVELS[i];
console.log('level', i + 1, def.chapter);
console.log(def.map);
console.log('solve', solveMinMoves(def));

const parsed = parseLevel(def, 0);
let state = { col: parsed.startCol, row: parsed.startRow, ori: 'standing' as const };
let collapsed = emptyCollapsed();
const bridges = emptyBridges(def);
const path: Array<'left' | 'right' | 'up' | 'down'> = ['right', 'right', 'down', 'down', 'left'];
for (const dir of path) {
  const prev = occupiedCells(state);
  state = nextState(state, dir);
  const stay = occupiedCells(state);
  collapsed = applyCollapse(parsed, prev, stay, collapsed);
  const dead = stay.every((c) => {
    const t = effectiveCell(parsed, c.col, c.row, bridges, collapsed);
    return false;
  });
  console.log(dir, state, 'collapsed', Object.keys(collapsed).filter((k) => collapsed[k]), 'cells', stay.map((c) => {
    const t = effectiveCell(parsed, c.col, c.row, bridges, collapsed);
    return `${c.col},${c.row}:${t}`;
  }));
}
