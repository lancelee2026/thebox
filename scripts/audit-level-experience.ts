/**
 * 关卡体验审计：把“感觉太简单 / 机关像摆设”的讨论变成可重复的证据。
 *
 * - 最短路与状态空间画像
 * - 关掉本章机关后的反事实求解（机关绕过）
 * - 特殊格在玩家可达决策中的实际触发情况（摆设候选）
 * - 同章节内的难度突变候选（前两关教学豁免）
 *
 * npm run audit-level-experience
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { LEVELS } from '../src/game/levels.ts';
import {
  canMerge,
  mergeBlocks,
  nextCubeState,
  nextState,
  occupiedCells,
  type BlockState,
  type Dir,
} from '../src/game/blockLogic.ts';
import { emptyBridges, emptyCollapsed, type LevelDef } from '../src/game/levelTypes.ts';
import { PAR } from '../src/game/par.ts';
import {
  applyCollapse,
  applySwitches,
  applyTeleport,
  deathCause,
  effectiveCell,
  isWin,
  parseLevel,
  rawCell,
} from '../src/game/rules.ts';

const DIRS: readonly Dir[] = ['left', 'right', 'up', 'down'];
const SPECIALS = ['z', 'f', 'c', 's', 'S', 'p', 'u', 't', 'b'] as const;
type Special = (typeof SPECIALS)[number];
type Mode = 'full' | 'no-switch' | 'no-split' | 'no-teleport' | 'no-layer' | 'no-fragile' | 'no-crumble';
type Severity = 'P0' | 'P1' | 'P2';

type Flags = Record<'switched' | 'bridged' | 'fragile' | 'split' | 'merged' | 'layered' | 'teleported' | 'crumbled', boolean>;
type Node = {
  a: BlockState;
  b: BlockState | null;
  active: 0 | 1;
  bridges: Record<string, boolean>;
  collapsed: Record<string, boolean>;
  layer: number;
  depth: number;
  path: Dir[];
  flags: Flags;
};

export type AuditFinding = {
  severity: Severity;
  code: string;
  message: string;
};

export type LevelExperienceAudit = {
  level: number;
  chapter: string;
  chapterOrder: number;
  par: number;
  solved: boolean;
  minMoves: number | null;
  minTurns: number | null;
  reachableStates: number;
  decisionStates: number;
  deadEndStates: number;
  mainMechanic: string | null;
  mainMechanicUsed: boolean;
  withoutMechanicMinMoves: number | null;
  specialTiles: Partial<Record<Special, { total: number; safeEntries: number; dangerEntries: number; relevant: number }>>;
  findings: AuditFinding[];
};

function clone(s: BlockState): BlockState {
  return { col: s.col, row: s.row, ori: s.ori };
}

function emptyFlags(): Flags {
  return { switched: false, bridged: false, fragile: false, split: false, merged: false, layered: false, teleported: false, crumbled: false };
}

function nodeKey(n: Node): string {
  const bridges = Object.keys(n.bridges).sort().map((id) => `${id}:${n.bridges[id] ? 1 : 0}`).join('|');
  const collapsed = Object.keys(n.collapsed).filter((id) => n.collapsed[id]).sort().join(';');
  const b = n.b ? `${n.b.col},${n.b.row}` : '-';
  return `${n.a.col},${n.a.row},${n.a.ori}|${b}|${n.active}|${n.layer}|${bridges}|${collapsed}`;
}

function startNode(def: LevelDef): Node {
  const parsed = parseLevel(def, 0);
  return {
    a: { col: parsed.startCol, row: parsed.startRow, ori: 'standing' }, b: null, active: 0,
    bridges: emptyBridges(def), collapsed: emptyCollapsed(), layer: 0, depth: 0, path: [], flags: emptyFlags(),
  };
}

function mainMode(chapter: string): Mode | null {
  switch (chapter) {
    case '脆弱': return 'no-fragile';
    case '桥梁': return 'no-switch';
    case '分裂': return 'no-split';
    case '多层': return 'no-layer';
    case '传送': return 'no-teleport';
    case '崩塌': return 'no-crumble';
    default: return null;
  }
}

function mainWasUsed(chapter: string, flags: Flags): boolean {
  switch (chapter) {
    case '脆弱': return flags.fragile;
    case '桥梁': return flags.switched || flags.bridged;
    case '分裂': return flags.split;
    case '多层': return flags.layered;
    case '传送': return flags.teleported;
    case '崩塌': return flags.crumbled;
    default: return true;
  }
}

type Step = { next?: Node; death?: 'fall' | 'hazard'; touched: Array<{ ch: string; col: number; row: number }> };

/** Exact rule transition shared by shortest-path and reachability passes. */
function step(def: LevelDef, cur: Node, dir: Dir, active: 0 | 1, mode: Mode): Step {
  const parsed = parseLevel(def, cur.layer);
  let a = clone(cur.a);
  let b = cur.b ? clone(cur.b) : null;
  const movingCube = !!b;
  const previous = movingCube ? (active === 0 ? cur.a : cur.b!) : cur.a;
  const previousCells = occupiedCells(previous);
  if (movingCube) {
    if (active === 0) a = nextCubeState(a, dir);
    else b = nextCubeState(b!, dir);
  } else {
    a = nextState(a, dir);
  }

  const flags = { ...cur.flags };
  let bridges = { ...cur.bridges };
  const moving = movingCube ? (active === 0 ? a : b!) : a;
  if (mode !== 'no-switch') {
    const afterSwitch = applySwitches(parsed, moving, bridges, movingCube);
    if (afterSwitch !== bridges) flags.switched = true;
    bridges = afterSwitch;
  }

  const touched: Array<{ ch: string; col: number; row: number }> = [];
  for (const cell of occupiedCells(moving)) {
    const raw = rawCell(parsed, cell.col, cell.row);
    touched.push({ ch: raw, col: cell.col, row: cell.row });
    const effective = effectiveCell(parsed, cell.col, cell.row, bridges, cur.collapsed);
    if (raw === 'b' && bridges[parsed.cellToBridge.get(`${cell.col},${cell.row}`) ?? '']) flags.bridged = true;
    if (effective === 'f' || raw === 'f') flags.fragile = true;
  }
  if (mode === 'no-fragile' && flags.fragile && !cur.flags.fragile) return { touched };

  let layer = cur.layer;
  if (!b) {
    const warped = applyTeleport(parsed, a, false);
    if (warped) {
      if (mode === 'no-teleport') return { touched };
      flags.teleported = true;
      a = warped;
      touched.push({ ch: 't', col: a.col, row: a.row });
    }
  }
  if (!b && parsed.splitPads.length) {
    const cells = occupiedCells(a);
    const pad = parsed.splitPads.find((candidate) => cells.some((cell) => cell.col === candidate.col && cell.row === candidate.row));
    if (pad) {
      if (mode === 'no-split') return { touched };
      a = { col: pad.destA[0], row: pad.destA[1], ori: 'standing' };
      b = { col: pad.destB[0], row: pad.destB[1], ori: 'standing' };
      flags.split = true;
    }
  }
  if (b && canMerge(a, b)) {
    a = mergeBlocks(a, b);
    b = null;
    flags.merged = true;
  }
  if (def.layers && def.layers.length > 1 && !b && a.ori === 'standing') {
    if (occupiedCells(a).some((cell) => rawCell(parsed, cell.col, cell.row) === 'u')) {
      if (mode === 'no-layer') return { touched };
      layer = (layer + 1) % def.layers.length;
      flags.layered = true;
    }
  }

  const staying = b ? [...occupiedCells(a), ...occupiedCells(b)] : occupiedCells(a);
  const collapsed = applyCollapse(parsed, previousCells, staying, cur.collapsed);
  if (Object.keys(collapsed).some((id) => collapsed[id] && !cur.collapsed[id])) {
    flags.crumbled = true;
    if (mode === 'no-crumble') return { touched };
  }

  const finalParsed = parseLevel(def, layer);
  if (b) {
    const cubeDeath = (cube: BlockState) => deathCause(finalParsed, cube, bridges, collapsed, true);
    const cause = cubeDeath(a) ?? cubeDeath(b);
    if (cause) return { death: cause, touched };
  } else {
    const cause = deathCause(finalParsed, a, bridges, collapsed);
    if (cause) return { death: cause, touched };
  }
  return {
    next: { a, b, active: b ? active : 0, bridges, collapsed, layer, depth: cur.depth + 1, path: [...cur.path, dir], flags },
    touched,
  };
}

function solve(def: LevelDef, mode: Mode): Node | null {
  const start = startNode(def);
  const queue: Node[] = [start];
  const seen = new Set([nodeKey(start)]);
  for (let cursor = 0; cursor < queue.length; cursor++) {
    const cur = queue[cursor];
    const parsed = parseLevel(def, cur.layer);
    if (!cur.b && isWin(parsed, cur.a, cur.bridges, cur.collapsed)) return cur;
    const actives: Array<0 | 1> = cur.b ? [cur.active, (1 - cur.active) as 0 | 1] : [0];
    for (const active of actives) for (const dir of DIRS) {
      const result = step(def, cur, dir, active, mode);
      if (!result.next) continue;
      const key = nodeKey(result.next);
      if (seen.has(key)) continue;
      if (!result.next.b && isWin(parseLevel(def, result.next.layer), result.next.a, result.next.bridges, result.next.collapsed)) return result.next;
      seen.add(key);
      queue.push(result.next);
    }
  }
  return null;
}

type Reachability = { states: number; decisions: number; deadEnds: number; safeEntries: Record<Special, number>; dangerEntries: Record<Special, number> };

function emptySpecialRecord(): Record<Special, number> {
  return { z: 0, f: 0, c: 0, s: 0, S: 0, p: 0, u: 0, t: 0, b: 0 };
}

/** Traverse all player-reachable, non-terminal states; winning states stop the traversal. */
function explore(def: LevelDef): Reachability {
  const start = startNode(def);
  const queue: Node[] = [start];
  const seen = new Set([nodeKey(start)]);
  const safeEntries = emptySpecialRecord();
  const dangerEntries = emptySpecialRecord();
  let decisions = 0;
  let deadEnds = 0;
  for (let cursor = 0; cursor < queue.length; cursor++) {
    const cur = queue[cursor];
    const parsed = parseLevel(def, cur.layer);
    if (!cur.b && isWin(parsed, cur.a, cur.bridges, cur.collapsed)) continue;
    const actives: Array<0 | 1> = cur.b ? [cur.active, (1 - cur.active) as 0 | 1] : [0];
    let safeChoices = 0;
    for (const active of actives) for (const dir of DIRS) {
      const result = step(def, cur, dir, active, 'full');
      for (const cell of result.touched) {
        if (!SPECIALS.includes(cell.ch as Special)) continue;
        if (result.death) dangerEntries[cell.ch as Special]++;
        else if (result.next) safeEntries[cell.ch as Special]++;
      }
      if (!result.next) continue;
      safeChoices++;
      const key = nodeKey(result.next);
      if (!seen.has(key)) {
        seen.add(key);
        queue.push(result.next);
      }
    }
    if (safeChoices >= 2) decisions++;
    if (safeChoices === 0) deadEnds++;
  }
  return { states: seen.size, decisions, deadEnds, safeEntries, dangerEntries };
}

function countSpecialTiles(def: LevelDef): Record<Special, number> {
  const totals = emptySpecialRecord();
  const maps = def.layers?.length ? def.layers : def.map ? [def.map] : [];
  for (const map of maps) for (const row of map) for (const ch of row) if (SPECIALS.includes(ch as Special)) totals[ch as Special]++;
  return totals;
}

function turns(path: Dir[]): number {
  return path.reduce((total, dir, index) => total + Number(index > 0 && path[index - 1] !== dir), 0);
}

function issue(level: number, severity: Severity, code: string, message: string): AuditFinding {
  return { severity, code, message: `第 ${level} 关：${message}` };
}

export function auditLevel(def: LevelDef, level: number, chapterOrder = 1): LevelExperienceAudit {
  const chapter = def.chapter ?? '未分章';
  const shortest = solve(def, 'full');
  const exploreResult = explore(def);
  const mode = mainMode(chapter);
  const without = mode ? solve(def, mode) : null;
  const totals = countSpecialTiles(def);
  const specialTiles: LevelExperienceAudit['specialTiles'] = {};
  const findings: AuditFinding[] = [];
  for (const special of SPECIALS) {
    if (!totals[special]) continue;
    const safeEntries = exploreResult.safeEntries[special];
    const dangerEntries = exploreResult.dangerEntries[special];
    const relevant = safeEntries + dangerEntries;
    specialTiles[special] = { total: totals[special], safeEntries, dangerEntries, relevant };
    if (relevant === 0) {
      findings.push(issue(level, 'P1', 'decorative-special-tile', `${special} 格未出现在任一可达决策中，疑似摆设。`));
    }
  }
  if (!shortest) {
    findings.push(issue(level, 'P0', 'unsolvable', '未找到通关路径。'));
  } else if (mode && without && without.depth <= shortest.depth + 1) {
    findings.push(issue(level, 'P1', 'near-equal-mechanic-bypass', `${chapter} 机关关闭后仍可在 ${without.depth} 步过关（正常最短 ${shortest.depth} 步）。`));
  } else if (mode && !mainWasUsed(chapter, shortest.flags)) {
    findings.push(issue(level, 'P1', 'main-mechanic-unused', `最短路径没有实际触发本章的${chapter}机关。`));
  }
  return {
    level, chapter, chapterOrder, par: PAR[level - 1] ?? -1, solved: !!shortest,
    minMoves: shortest?.depth ?? null, minTurns: shortest ? turns(shortest.path) : null,
    reachableStates: exploreResult.states, decisionStates: exploreResult.decisions, deadEndStates: exploreResult.deadEnds,
    mainMechanic: mode ? chapter : null, mainMechanicUsed: shortest ? mainWasUsed(chapter, shortest.flags) : false,
    withoutMechanicMinMoves: without?.depth ?? null, specialTiles, findings,
  };
}

function addDifficultyFindings(audits: LevelExperienceAudit[]): void {
  let chapter = '';
  let previous: LevelExperienceAudit | null = null;
  for (const audit of audits) {
    if (audit.chapter !== chapter) {
      chapter = audit.chapter;
      previous = null;
    }
    if (previous && audit.chapterOrder > 2 && audit.minMoves !== null && previous.minMoves !== null) {
      const delta = audit.minMoves - previous.minMoves;
      const ratio = Math.abs(delta) / Math.max(1, previous.minMoves);
      if (delta <= -4 && ratio >= 0.35) {
        audit.findings.push(issue(audit.level, 'P2', 'difficulty-drop-candidate', `同章节最短步从 ${previous.minMoves} 降至 ${audit.minMoves}（${Math.round(ratio * 100)}%），需人工确认是否过度降难。`));
      }
      if (delta >= 6 && ratio >= 0.5) {
        audit.findings.push(issue(audit.level, 'P2', 'difficulty-spike-candidate', `同章节最短步从 ${previous.minMoves} 升至 ${audit.minMoves}（${Math.round(ratio * 100)}%），需人工确认是否突增。`));
      }
    }
    previous = audit;
  }
}

export function auditAllLevels(levels: readonly LevelDef[] = LEVELS): LevelExperienceAudit[] {
  let chapter = '';
  let chapterOrder = 0;
  const audits = levels.map((def, index) => {
    const current = def.chapter ?? '未分章';
    chapterOrder = current === chapter ? chapterOrder + 1 : 1;
    chapter = current;
    return auditLevel(def, index + 1, chapterOrder);
  });
  addDifficultyFindings(audits);
  return audits;
}

function specialsSummary(audit: LevelExperienceAudit): string {
  const entries = Object.entries(audit.specialTiles).map(([tile, data]) => `${tile}:${data!.relevant}/${data!.total}`);
  return entries.length ? entries.join('，') : '—';
}

export function markdownReport(audits: LevelExperienceAudit[]): string {
  const findings = audits.flatMap((audit) => audit.findings);
  const severityCount = (severity: Severity) => findings.filter((finding) => finding.severity === severity).length;
  const rows = audits.map((audit) => {
    const notes = audit.findings.map((finding) => finding.code).join('<br>') || '—';
    const bypass = audit.mainMechanic ? (audit.withoutMechanicMinMoves === null ? '不可过' : String(audit.withoutMechanicMinMoves)) : '—';
    return `| ${audit.level} | ${audit.chapter} ${audit.chapterOrder} | ${audit.minMoves ?? '—'} | ${audit.minTurns ?? '—'} | ${audit.reachableStates} | ${audit.decisionStates} | ${audit.mainMechanicUsed ? '是' : '—'} / ${bypass} | ${specialsSummary(audit)} | ${notes} |`;
  });
  const findingsText = findings.length
    ? findings.map((finding) => `- **${finding.severity} · ${finding.code}**：${finding.message}`).join('\n')
    : '- 当前自动规则未发现 P0–P2 候选。';
  return `# 78 关体验审计\n\n本报告由 \`npm run audit-level-experience\` 生成；它筛选候选，不替代逐关手动试玩。前两关属于章节教学，难度下降不计入突变。\n\n## 结论摘要\n\n- 共 ${audits.length} 关；P0 ${severityCount('P0')} 个，P1 ${severityCount('P1')} 个，P2 ${severityCount('P2')} 个候选。\n- “机关绕过”仅在关闭本章机关后仍可于正常最短步数 +1 内通关时标为 P1。\n- 特殊格采用“可达决策”标准：在所有玩家可达、未通关状态中，格子至少要被安全踏入或作为一次失败选择触及；否则标为疑似摆设。\n\n## 待人工复核\n\n${findingsText}\n\n## 全关量化画像\n\n| 关 | 章节 | 最短步 | 转向 | 可达状态 | 决策状态 | 主机关 / 关闭后 | 特殊格（触发/总数） | 自动候选 |\n| --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |\n${rows.join('\n')}\n\n## 判定口径\n\n- **P0**：无解或规则/内容致使关卡不可完成。\n- **P1**：主机关可近似等价绕过，或特殊格从未进入可达决策。\n- **P2**：同章节第三关起，最短步相对上一关下降至少 4 步且 35%，或上升至少 6 步且 50%。\n- 表中的“关闭后”是反事实求解结果，\`不可过\` 说明该关无法跳过本章节的核心规则。\n`;
}

function main(): void {
  const audits = auditAllLevels();
  const report = markdownReport(audits);
  const shouldWrite = process.argv.includes('--write');
  if (shouldWrite) {
    mkdirSync(resolve('reports'), { recursive: true });
    writeFileSync(resolve('docs/level-design-audit.md'), report);
    writeFileSync(resolve('reports/level-experience-audit.json'), `${JSON.stringify(audits, null, 2)}\n`);
  }
  const findings = audits.flatMap((audit) => audit.findings);
  console.log(`审计完成：${audits.length} 关，P0 ${findings.filter((x) => x.severity === 'P0').length}，P1 ${findings.filter((x) => x.severity === 'P1').length}，P2 ${findings.filter((x) => x.severity === 'P2').length}${shouldWrite ? '；已写入报告。' : ''}`);
}

if (process.argv[1]?.includes('audit-level-experience')) main();
