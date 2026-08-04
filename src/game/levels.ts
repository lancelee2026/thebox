/** ASCII 关卡：@ 起点 x 白砖 o 绿区 z 红砖 . 虚空 */

export type LevelMap = string[];

export const LEVELS: LevelMap[] = [
  // 1 教学：直线躺进绿区
  ['@xxxxxxoo'],

  // 2 转弯
  [
    '@xxxxxx',
    '......x',
    '......x',
    '......x',
    '...o..x',
    '...o..x',
    '...xxxx',
  ],

  // 3 断桥入门（半悬空可探）
  [
    '@xxxxxx.x',
    '........x',
    '........x',
    '.ooxx.xxx',
    '.........',
  ],

  // 4 窄道与绿区并排
  [
    '......xx..',
    '..........',
    '@xxxxxxxoo',
  ],

  // 5 短断桥
  [
    '.........xx',
    '@xooxxxxxxx',
  ],

  // 6 极简拐弯
  [
    '@xoo',
    '.xxx',
  ],

  // 7 十字跳跃感
  [
    '..o',
    '@xo',
    'x.x',
  ],

  // 8 红砖初见
  [
    'zz....',
    'xx....',
    'x@.xoo',
  ],

  // 9 长断桥规划
  [
    '....xx.',
    '....xx.',
    '....xx.',
    '....x..',
    '.......',
    '@xxxxxx',
    '.....oo',
  ],

  // 10 点状路径
  [
    '@.x....',
    '.x.x...',
    '....x.x',
    '.o.x.x.',
    '.ox.x.x',
  ],

  // 11 环形
  [
    'xxxxxx',
    'xxx..x',
    'x....x',
    'x.oo.x',
    'x..x.x',
    'x..x.x',
    '@..xxx',
  ],

  // 12 综合迷宫
  [
    '@.x.xxx.x.x',
    'xxx.x.x.x.x',
    '.x..xxx.xxx',
    '...........',
    'x.x..x..xxx',
    'xxx..x..x.o',
    'xxx..x..x.o',
  ],

  // 13 红砖走廊
  [
    '@xxxx',
    'x.z.x',
    'x.z.x',
    'x...x',
    'x.oox',
    'xxxxx',
  ],

  // 14 折返走廊
  [
    '@xxxxx',
    'x...x.',
    'x.x.x.',
    'x.x.oo',
    'x.xxx.',
  ],

  // 15 终章挑战
  [
    '..x..x..',
    '@xxxxxx.',
    '..x..x.x',
    '.....x.x',
    '.z...x.x',
    '.z.oox.x',
    '...xxxx.',
  ],
];

export const LEVEL_COUNT = LEVELS.length;
