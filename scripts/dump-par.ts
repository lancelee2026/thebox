import { LEVELS } from '../src/game/levels.ts';
import { solveMinMoves } from '../src/game/solve.ts';

const pars: Array<number | null> = [];
for (let i = 0; i < LEVELS.length; i++) {
  const moves = solveMinMoves(LEVELS[i]);
  pars.push(moves);
  const label = i >= 55 ? 'NEW' : '';
  console.log(`${i + 1}: ${moves === null ? 'UNSOLVABLE' : moves} ${label}`.trim());
}
console.log('\nexport const PAR: readonly number[] = [');
const nums = pars.map((m) => (m === null ? -1 : m));
const lines: string[] = [];
for (let i = 0; i < nums.length; i += 12) {
  lines.push('  ' + nums.slice(i, i + 12).join(', ') + ',');
}
console.log(lines.join('\n'));
console.log('];');
