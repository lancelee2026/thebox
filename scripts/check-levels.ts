/**
 * 离线关卡可达性检查（BFS）。npm run check-levels
 */
import { LEVELS } from '../src/game/levels.ts';
import { PAR } from '../src/game/par.ts';
import { parseLevel, rawCell } from '../src/game/rules.ts';
import { solveMinMoves } from '../src/game/solve.ts';
import { mechanicSkipErrors } from './audit-mechanics.ts';

function assertTileBindings(): string[] {
  const errors: string[] = [];
  LEVELS.forEach((def, i) => {
    const n = i + 1;
    const parsed = parseLevel(def, 0);
    for (const sw of parsed.switches) {
      const ch = rawCell(parsed, sw.col, sw.row);
      const expect = sw.type === 'hard' ? 'S' : 's';
      if (ch !== expect) {
        errors.push(
          `Level ${n}: ${sw.type} switch at (${sw.col},${sw.row}) is '${ch}', expected '${expect}'`,
        );
      }
    }
    for (const pad of parsed.splitPads) {
      const ch = rawCell(parsed, pad.col, pad.row);
      if (ch !== 'p') {
        errors.push(`Level ${n}: split pad at (${pad.col},${pad.row}) is '${ch}', expected 'p'`);
      }
    }
    for (const pad of parsed.teleports) {
      const ch = rawCell(parsed, pad.col, pad.row);
      if (ch !== 't') {
        errors.push(`Level ${n}: teleport at (${pad.col},${pad.row}) is '${ch}', expected 't'`);
      }
      const [dc, dr] = pad.dest;
      if (dc < 0 || dr < 0 || dc >= parsed.cols || dr >= parsed.rows) {
        errors.push(`Level ${n}: teleport dest (${dc},${dr}) is off the map`);
      }
    }
    const teleportTiles = [];
    for (let r = 0; r < parsed.rows; r++) {
      for (let c = 0; c < parsed.cols; c++) {
        if (parsed.grid[r][c] === 't') teleportTiles.push(`${c},${r}`);
      }
    }
    if (teleportTiles.length !== parsed.teleports.length) {
      errors.push(
        `Level ${n}: map has ${teleportTiles.length} t tiles but ${parsed.teleports.length} teleports`,
      );
    }
    const claimed = new Set<string>();
    for (const [id, cells] of parsed.bridgeCells) {
      for (const [c, r] of cells) {
        claimed.add(`${c},${r}`);
        const ch = rawCell(parsed, c, r);
        if (ch !== 'b') {
          errors.push(`Level ${n}: bridge ${id} cell (${c},${r}) is '${ch}', expected 'b'`);
        }
      }
    }
    for (let r = 0; r < parsed.rows; r++) {
      for (let c = 0; c < parsed.cols; c++) {
        if (parsed.grid[r][c] === 'b' && !claimed.has(`${c},${r}`)) {
          errors.push(`Level ${n}: map b at (${c},${r}) is not bound to any bridge`);
        }
      }
    }
  });
  return errors;
}

function main(): void {
  const bindErrors = assertTileBindings();
  if (bindErrors.length) {
    console.error(bindErrors.join('\n'));
    process.exit(1);
  }

  const skipErrors = mechanicSkipErrors();
  if (skipErrors.length) {
    console.error(skipErrors.join('\n'));
    process.exit(1);
  }

  if (PAR.length !== LEVELS.length) {
    console.error(`PAR length ${PAR.length} != LEVELS ${LEVELS.length}`);
    process.exit(1);
  }

  let failed = 0;
  let parDrift = 0;
  console.log(`Checking ${LEVELS.length} levels...\n`);
  LEVELS.forEach((def, i) => {
    const n = i + 1;
    const moves = solveMinMoves(def);
    if (moves === null) {
      failed++;
      console.log(`Level ${n}: UNSOLVABLE [${def.chapter ?? ''}] ${def.hint ?? ''}`);
      return;
    }
    if (moves !== PAR[i]) {
      parDrift++;
      console.log(`Level ${n}: PAR DRIFT table=${PAR[i]} solved=${moves} [${def.chapter ?? ''}]`);
    } else {
      console.log(`Level ${n}: OK (min ${moves}) [${def.chapter ?? ''}]`);
    }
  });
  console.log('');
  if (failed > 0) {
    console.error(`${failed} level(s) have no solution.`);
    process.exit(1);
  }
  if (parDrift > 0) {
    console.error(`${parDrift} level(s) disagree with src/game/par.ts — regenerate the table.`);
    process.exit(1);
  }
  console.log('All levels solvable. PAR table matches.');
}

main();
