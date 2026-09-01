import { strict as assert } from 'node:assert';
import { auditAllLevels, auditLevel } from './audit-level-experience.ts';

const audits = auditAllLevels();
assert.equal(audits.length, 78, '应覆盖全部 78 关');
assert.ok(audits.every((audit) => audit.solved), '当前 78 关都应可解');

const level15 = audits[14];
assert.ok((level15.specialTiles.z?.dangerEntries ?? 0) > 0, '第 15 关红砖应构成可达失败选择，而非摆设');

const level16 = audits[15];
assert.equal(level16.mainMechanic, '脆弱');
assert.equal(level16.mainMechanicUsed, true, '脆弱章节首关应实际使用脆弱砖');
assert.equal(level16.withoutMechanicMinMoves, null, '关闭脆弱规则后不应仍能通关');

const disconnectedRed = auditLevel({ map: ['@oo.....z'], chapter: '基础' }, 999);
assert.ok(disconnectedRed.findings.some((finding) => finding.code === 'decorative-special-tile'), '不可达红砖应被标记为摆设候选');

console.log('关卡体验审计检查通过。');
