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
    hint: '不要触碰红色区域，危险',
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
      '@xxxxxx.',
      '..x..x.x',
      '.....x.x',
      '.z...x.x',
      '.z.oox.x',
      '...xxxx.',
    ],
    chapter: '基础',
  },

  // ── 16–23 脆弱 ─────────────────────────────────────────────
  {
    map: ['@xx', 'xff', '.oo'],
    chapter: '脆弱',
    hint: '橙色脆弱砖：只能躺着经过，站上去会碎裂',
  },
  {
    map: ['@x.x', 'xff.', '..oo'],
    chapter: '脆弱',
    hint: '这条没法躲开橙砖，躺着压过去就安全',
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
    hint: '桥梁·轻开关 黄色按钮控制蓝桥开闭，砖块压上即可触发',
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
    hint: '桥梁·重开关 橙色按钮同样控制蓝桥，必须站上才可触发',
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
    map: ['@x.x', 'xS.x', 'bb.x', '..oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[0, 2], [1, 2]], initiallyOpen: false }],
    switches: [{ col: 1, row: 1, type: 'hard', bridgeIds: ['A'], mode: 'toggle' }],
  },
  {
    map: ['@x.x', 'x.Sx', 'bb.x', '..oo'],
    chapter: '桥梁',
    bridges: [{ id: 'A', cells: [[0, 2], [1, 2]], initiallyOpen: false }],
    switches: [{ col: 2, row: 1, type: 'hard', bridgeIds: ['A'], mode: 'toggle' }],
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
    hint: '分身术 踩到紫色分裂台会变成两颗小方砖，「切换」或空格可分别控制，相遇可重新合并',
    splitPads: [{ col: 1, row: 0, destA: [0, 1], destB: [4, 1] }],
  },
  {
    map: ['@xpxx', 'x...x', 'xx.oo'],
    chapter: '分裂',
    splitPads: [{ col: 2, row: 0, destA: [0, 1], destB: [4, 1] }],
  },
  {
    map: ['@xxpx', 'x...x', '.xoo.x'],
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
    map: ['@xpx.', 'x..x.', 'x..x.', 'xoo.x'],
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
    map: ['@xp.x', 'x.z.x', 'xx.xx', '..oo.'],
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
    hint: '多层 蓝色楼梯：竖着踩会换层，两层楼梯要对齐',
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
];

export const LEVEL_COUNT = LEVELS.length;

export function getLevel(i0: number): LevelDef {
  return LEVELS[i0];
}
