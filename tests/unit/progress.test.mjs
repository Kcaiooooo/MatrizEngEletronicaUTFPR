import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseProgress } from '../../assets/js/shared/progress.js';

test('ignora JSON corrompido e tipos inválidos sem quebrar o site', () => {
    for (const raw of ['{', 'null', '[]', '42', '{}']) assert.equal(parseProgress(raw), null);
    const saved = parseProgress(JSON.stringify({ nodesState: {}, optionalNodesState: [null, { id: 'A', state: 'invalid' }], currentPeriod: 999, completedAcActivities: [null, { desc: 'A', hours: -2 }] }), 6);
    assert.deepEqual(saved.nodesState, []);
    assert.deepEqual(saved.optionalNodesState, []);
    assert.deepEqual(saved.completedAcActivities, []);
    assert.equal(saved.currentPeriod, 6);
});

test('mantém estados históricos válidos, atividades e campos adicionais', () => {
    const saved = { nodesState: [{ id: 'A', state: 'subject-completed' }, { id: 'B', state: 'subject-inprogress' }], humanitiesNodesState: [{ id: 'C', state: 'humanities-completed' }], optionalNodesState: [{ id: 'D', state: 'optional-inprogress' }], completedAcActivities: [{ desc: '<b>Monitoria</b>', hours: 15 }], completedCceActivities: [{ desc: 'Extensão', hours: 30 }], currentPeriod: 4, extra: 'preservado' };
    assert.deepEqual(parseProgress(JSON.stringify(saved)), saved);
});

test('pré-requisito de período aceita grafia com ou sem acento', async () => {
    const {parsePeriodDependency}=await import('../../assets/js/shared/progress.js');
    assert.equal(parsePeriodDependency('Periodo:7'),7);
    assert.equal(parsePeriodDependency('Período:7'),7);
    for(const value of ['ELT71A','Periodo:7abc',null]) assert.equal(parsePeriodDependency(value),null);
});
