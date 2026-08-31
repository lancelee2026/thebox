import type { BlockState } from '../src/game/blockLogic';
import type { LevelDef } from '../src/game/levelTypes';
import { deathCause, parseLevel, type DeathCause } from '../src/game/rules';

function expectCause(
  name: string,
  def: LevelDef,
  state: BlockState,
  expected: DeathCause | null,
  options: {
    bridges?: Record<string, boolean>;
    collapsed?: Record<string, boolean>;
    isCube?: boolean;
  } = {},
): void {
  const actual = deathCause(
    parseLevel(def),
    state,
    options.bridges,
    options.collapsed,
    options.isCube,
  );
  if (actual !== expected) {
    throw new Error(`${name}: expected ${String(expected)}, got ${String(actual)}`);
  }
}

expectCause('standing outside the board falls', { map: ['@'] }, { col: 1, row: 0, ori: 'standing' }, 'fall');
expectCause('red tile is a hazard', { map: ['@z'] }, { col: 1, row: 0, ori: 'standing' }, 'hazard');
expectCause('standing cuboid breaks fragile tile', { map: ['@f'] }, { col: 1, row: 0, ori: 'standing' }, 'fall');
expectCause(
  'split cube can stand on fragile tile',
  { map: ['@f'] },
  { col: 1, row: 0, ori: 'standing' },
  null,
  { isCube: true },
);
expectCause('half-supported cuboid survives', { map: ['x.'] }, { col: 0, row: 0, ori: 'flatX' }, null);
expectCause('cuboid over two void cells falls', { map: ['...'] }, { col: 1, row: 0, ori: 'flatX' }, 'fall');
expectCause('flat cuboid touching red is a hazard', { map: ['xz'] }, { col: 0, row: 0, ori: 'flatX' }, 'hazard');

const bridgeLevel: LevelDef = {
  map: ['@b'],
  bridges: [{ id: 'gate', cells: [[1, 0]], initiallyOpen: false }],
};
expectCause(
  'closed bridge is a fall',
  bridgeLevel,
  { col: 1, row: 0, ori: 'standing' },
  'fall',
  { bridges: { gate: false } },
);
expectCause(
  'open bridge supports the cuboid',
  bridgeLevel,
  { col: 1, row: 0, ori: 'standing' },
  null,
  { bridges: { gate: true } },
);
expectCause(
  'collapsed crumble tile is a fall',
  { map: ['@c'] },
  { col: 1, row: 0, ori: 'standing' },
  'fall',
  { collapsed: { '1,0': true } },
);

console.log('✓ death feedback classification passed');
