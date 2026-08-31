import type { LevelDef } from './levelTypes';

export type { LevelMap } from './levelTypes';

export const LEVELS: LevelDef[] = [
  // ── 1–15 基础 ──────────────────────────────────────────────
  { map: ['@xxxxxxoo'], chapter: '基础' },
  {
    map: [
      '@xxxxxx',
      '......x',
      '......x',
      '......x',
      '...o..x',
      '...o..x',
      '...xxxx',
    ],
    chapter: '基础',
  },
  {
    map: [
      '@xxxxxx.x',
      '........x',
      '........x',
      '.ooxx.xxx',
      '.........',
    ],
    chapter: '基础',
  },
  {
    map: [
      '......xx..',
      '..........',
      '@xxxxxxxoo',
    ],
    chapter: '基础',
  },
  {
    map: [
      '.........xx',
      '@xooxxxxxxx',
    ],
    chapter: '基础',
  },
  { map: ['@xoo', '.xxx'], chapter: '基础' },
  {
    map: [
      '..o',
      '@xo',
      'x.x',
    ],
    chapter: '基础',
  },
  {
    map: [
      'zz....',
      'xx....',
      'x@.xoo',
    ],
    chapter: '基础',
    hint: '别让砖块落到红色区域。',
  },
  {
    map: [
      '....xx.',
      '....xx.',
      '....xx.',
      '....x..',
      '.......',
      '@xxxxxx',
      '.....oo',
    ],
    chapter: '基础',
  },
  {
    map: [
      '@.x....',
      '.x.x...',
      '....x.x',
      '.o.x.x.',
      '.ox.x.x',
    ],
    chapter: '基础',
  },
  {
    map: [
      'xxxxxx',
      'xxx..x',
      'x....x',
      'x.oo.x',
      'x..x.x',
      'x..x.x',
      '@..xxx',
    ],
    chapter: '基础',
  },
  {
    map: [
      '@.x.xxx.x.x',
      'xxx.x.x.x.x',
      '.x..xxx.xxx',
      '...........',
      'x.x..x..xxx',
      'xxx..x..x.o',
      'xxx..x..x.o',
    ],
    chapter: '基础',
  },
  {
    map: [
      '@xxxx',
      'x.z.x',
      'x.z.x',
      'x...x',
      'x.oox',
      'xxxxx',
    ],
    chapter: '基础',
  },
  {
    map: [
      '@xxxxx',
      'x...x.',
      'x.x.x.',
      'x.x.oo',
      'x.xxx.',
    ],
    chapter: '基础',
  },
  {
    map: [
      '..x..x..',
      '@xxxxxz.',
      '..x..xzx',
      '.....x.x',
      '.....x.x',
      '...oox.x',
      '...xxxx.',
    ],
    chapter: '基础',
  },

  // ── 16–23 脆弱 ─────────────────────────────────────────────
  {
    map: ['@xx', 'xff', '.oo'],
    chapter: '脆弱',
    hint: '橙色砖只能横躺通过；竖着站上去会碎。',
  },
  {
    map: ['@x.x', 'xff.', '..oo'],
    chapter: '脆弱',
  },
  { map: ['@xff', 'x..x', '.xoo'], chapter: '脆弱' },
  { map: ['@xxx', 'xffx', '..oo'], chapter: '脆弱' },
  { map: ['@xxf', 'xf.x', 'x..x', '..oo'], chapter: '脆弱' },
  { map: ['@fxx', 'xff.x', 'x..x', '.xoo'], chapter: '脆弱' },
  { map: ['@xxf', 'xff.x', 'x..x', '..oo'], chapter: '脆弱' },
  { map: ['@xfxx', 'xff.x', 'x..x', '..oo'], chapter: '脆弱' },

  // ── 24–37 桥梁 ─────────────────────────────────────────────
  {
    map: ['@sbboo'],
    chapter: '桥梁',
    hint: '踩上黄色按钮，会开关隐藏的蓝桥。',
    bridges: [{ id: 'A', cells: [[2, 0], [3, 0]], initiallyOpen: false }],
    switches: [{ col: 1, row: 0, type: 'soft', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@xxs', 'xbb.', '..oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[1, 1], [2, 1]], initiallyOpen: false }],
    switches: [{ col: 3, row: 0, type: 'soft', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@xxs', 'bb..', 'xxoo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[0, 1], [1, 1]], initiallyOpen: false }],
    switches: [{ col: 3, row: 0, type: 'soft', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@x.s', 'bb.x', 'x.oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[0, 1], [1, 1]], initiallyOpen: false }],
    switches: [{ col: 3, row: 0, type: 'soft', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@x.s', 'xbb.', 'x.oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[1, 1], [2, 1]], initiallyOpen: false }],
    switches: [{ col: 3, row: 0, type: 'soft', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@xxs', '.bb.', 'x.oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[1, 1], [2, 1]], initiallyOpen: false }],
    switches: [{ col: 3, row: 0, type: 'soft', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@xs.', 'xbb.', '..oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[1, 1], [2, 1]], initiallyOpen: false }],
    switches: [{ col: 2, row: 0, type: 'soft', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@s..', 'xbbx', 'x.oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[1, 1], [2, 1]], initiallyOpen: false }],
    switches: [{ col: 1, row: 0, type: 'soft', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@..x', 'xxSx', 'bb.x', '..oo'],
    chapter: '桥梁',
    hint: '橙色按钮要竖着踩上去，才会开关蓝桥。',
    bridges: [{ id: 'A', cells: [[0, 2], [1, 2]], initiallyOpen: false }],
    switches: [{ col: 2, row: 1, type: 'hard', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@xxx', '..Sx', 'bb.x', '..oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[0, 2], [1, 2]], initiallyOpen: false }],
    switches: [{ col: 2, row: 1, type: 'hard', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@x.x', 'xS..', 'bb.x', '..oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[0, 2], [1, 2]], initiallyOpen: false }],
    switches: [{ col: 1, row: 1, type: 'hard', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    // 右列不能当捷径：起点与终点隔两格空，必须先站上 S 再走桥
    map: ['@xxS', '....', 'bb.x', '..oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[0, 2], [1, 2]], initiallyOpen: false }],
    switches: [{ col: 3, row: 0, type: 'hard', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@x.x', 'x.Sx', 'bb.x', 'x.oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[0, 2], [1, 2]], initiallyOpen: false }],
    switches: [{ col: 2, row: 1, type: 'hard', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@sbb.', 'xxSbb', '...oo'],
    chapter: '桥梁',
    bridges: [
      { id: 'A', cells: [[2, 0], [3, 0]], initiallyOpen: false },
      { id: 'B', cells: [[3, 1], [4, 1]], initiallyOpen: false },
    ],
    switches: [
      { col: 1, row: 0, type: 'soft', bridgeIds: ['A'], mode: 'toggle' },
      { col: 2, row: 1, type: 'hard', bridgeIds: ['B'], mode: 'toggle' },
    ],
  },

  // ── 38–48 分裂（落点必须可走；合并后再躺进 oo）────────────
  {
    map: ['@pxxx', 'x...x', 'xx.oo'],
    chapter: '分裂',
    hint: '碰到紫砖会分成两块。按“切换”换一块控制；两块相遇会合成一块。',
    splitPads: [{ col: 1, row: 0, destA: [0, 1], destB: [4, 1] }],
  },
  {
    map: ['@xpxx', 'x...x', 'xx.oo'],
    chapter: '分裂',
    splitPads: [{ col: 2, row: 0, destA: [0, 1], destB: [4, 1] }],
  },
  {
    map: ['@xxpx', 'x...x', 'xx.oo'],
    chapter: '分裂',
    splitPads: [{ col: 3, row: 0, destA: [0, 1], destB: [4, 1] }],
  },
  {
    map: ['@p.xx', 'x..x.', 'x..x.', 'x.oo.'],
    chapter: '分裂',
    splitPads: [{ col: 1, row: 0, destA: [0, 2], destB: [3, 2] }],
  },
  {
    map: ['@x.px', 'x..x.', 'x..xx', '..oo.'],
    chapter: '分裂',
    splitPads: [{ col: 3, row: 0, destA: [0, 1], destB: [3, 1] }],
  },
  {
    map: ['@xxxp', 'x...x', 'x.z.x', 'xx.oo'],
    chapter: '分裂',
    splitPads: [{ col: 4, row: 0, destA: [0, 1], destB: [4, 1] }],
  },
  {
    map: ['@pxxx', 'x.z.x', 'x...x', 'xx.oo'],
    chapter: '分裂',
    splitPads: [{ col: 1, row: 0, destA: [0, 2], destB: [4, 2] }],
  },
  {
    map: ['@xpx.', 'x..x.', 'x..x.', 'x.oo.'],
    chapter: '分裂',
    splitPads: [{ col: 2, row: 0, destA: [0, 1], destB: [3, 2] }],
  },
  {
    map: ['@x.px', 'xxxxx', 'x...x', 'xx.oo'],
    chapter: '分裂',
    splitPads: [{ col: 3, row: 0, destA: [0, 2], destB: [4, 2] }],
  },
  {
    map: ['@x.px', 'x.z.x', 'xxxxx', 'xx.oo'],
    chapter: '分裂',
    splitPads: [{ col: 3, row: 0, destA: [0, 2], destB: [4, 2] }],
  },
  {
    map: ['@xp.x', 'x.z.x', 'x...x', 'xx.oo'],
    chapter: '分裂',
    splitPads: [{ col: 2, row: 0, destA: [0, 1], destB: [4, 1] }],
  },

  // ── 49–55 多层（u 对齐；目标侧用 oo. 匹配奇偶）──────────────
  {
    layers: [
      ['@xu', 'xxx'],
      ['.xu', 'oo.'],
    ],
    chapter: '多层',
    hint: '竖着踩蓝色砖，会切换到另一层。',
  },
  {
    layers: [
      ['@xux', 'xxxx'],
      ['.xux', 'oo..'],
    ],
    chapter: '多层',
  },
  {
    layers: [
      ['@xuxx', 'xxxxx'],
      ['.xuxx', 'oo...'],
    ],
    chapter: '多层',
  },
  {
    layers: [
      ['@xu.x', 'xxxx.'],
      ['.xu.x', 'oo.x.'],
    ],
    chapter: '多层',
  },
  {
    layers: [
      ['@xux.', 'x.x.x', 'xxxxx'],
      ['.xux.', 'x...x', 'oo...'],
    ],
    chapter: '多层',
  },
  {
    layers: [
      ['@xux.', 'x.x.x', 'zxxxx'],
      ['.xux.', 'x...x', 'oo...'],
    ],
    chapter: '多层',
  },
  {
    layers: [
      ['@xux.', 'xf.xx', 'xxxxx'],
      ['.xux.', 'x...x', 'oo...'],
    ],
    chapter: '多层',
  },

  // ── 56–68 传送（竖着踩青色台，整块出现在另一边）──────────
  // 起点岛与终点岛之间至少两格空，避免半悬空蹭过去。
  {
    map: ['@xxt..xoo'],
    chapter: '传送',
    hint: '竖着踩上青色砖，整块砖会出现在另一边。',
    teleports: [{ dest: [6, 0] }],
  },
  {
    map: [
      '@xx...',
      'x.x...',
      'xxt..xoo',
    ],
    chapter: '传送',
    teleports: [{ dest: [5, 2] }],
  },
  {
    map: [
      '@xx...',
      'xxx...',
      'xxt..xoo',
    ],
    chapter: '传送',
    teleports: [{ dest: [5, 2] }],
  },
  {
    map: [
      '@xx...',
      '.xx...',
      'xxt..xoo',
    ],
    chapter: '传送',
    teleports: [{ dest: [5, 2] }],
  },
  {
    map: [
      '@x.x..',
      'xxx...',
      'xxt..xoo',
    ],
    chapter: '传送',
    teleports: [{ dest: [5, 2] }],
  },
  {
    map: [
      '@xxx..',
      'x.x...',
      'xxt..xoo',
    ],
    chapter: '传送',
    teleports: [{ dest: [5, 2] }],
  },
  {
    map: ['@xxt..xxxt..xoo'],
    chapter: '传送',
    teleports: [{ dest: [6, 0] }, { dest: [12, 0] }],
  },
  {
    map: [
      '@x....',
      'x.xx..',
      'x.t..xoo',
    ],
    chapter: '传送',
    teleports: [{ dest: [5, 2] }],
  },
  {
    map: [
      '@xxx..',
      'x.....',
      'xxt..xoo',
    ],
    chapter: '传送',
    teleports: [{ dest: [5, 2] }],
  },
  {
    map: [
      '@xx...',
      'x..x..',
      'xxt..xoo',
    ],
    chapter: '传送',
    teleports: [{ dest: [5, 2] }],
  },
  {
    map: [
      '@xxz..',
      'x.x...',
      'xxt..xoo',
    ],
    chapter: '传送',
    teleports: [{ dest: [5, 2] }],
  },
  {
    map: [
      '@xx...',
      'x.t..xoo',
      'x...z...',
    ],
    chapter: '传送',
    teleports: [{ dest: [5, 1] }],
  },
  {
    map: [
      '@xx...',
      'x.f...',
      'xxt..xoo',
    ],
    chapter: '传送',
    teleports: [{ dest: [5, 2] }],
  },

  // ── 69–78 崩塌（灰色裂砖离开后塌掉）─────────────────────
  // 横躺在一段路上，再翻滚对齐进 oo；离开的 c 会塌。
  {
    map: [
      '@cc',
      '..x',
      '.oo',
    ],
    chapter: '崩塌',
    hint: '灰色裂砖离开后会塌掉，别把自己堵死。',
  },
  {
    map: [
      '@cc.',
      '.xx.',
      '.oo.',
    ],
    chapter: '崩塌',
  },
  {
    map: [
      '@xcc',
      '.xxx',
      '.xoo',
    ],
    chapter: '崩塌',
  },
  {
    map: [
      '@cccx',
      '.xxx.',
      '.xoo.',
    ],
    chapter: '崩塌',
  },
  {
    map: [
      '@xccc',
      '.xxxx',
      '.xxoo',
    ],
    chapter: '崩塌',
  },
  {
    map: [
      '@cc.c',
      'xx.xx',
      '.xoo.',
    ],
    chapter: '崩塌',
  },
  {
    map: [
      '@cccc',
      'x.xxx',
      '..xoo',
    ],
    chapter: '崩塌',
  },
  {
    map: [
      '@xccx',
      'cxxxx',
      '..xoo',
    ],
    chapter: '崩塌',
  },
  {
    map: [
      '@ccc.',
      '.x.x.',
      '.xoo.',
    ],
    chapter: '崩塌',
  },
  {
    map: [
      '@xccc',
      '.xxxz',
      '.xxoo',
    ],
    chapter: '崩塌',
  },
];

export const LEVEL_COUNT = LEVELS.length;

export function getLevel(i0: number): LevelDef {
  return LEVELS[i0];
}
