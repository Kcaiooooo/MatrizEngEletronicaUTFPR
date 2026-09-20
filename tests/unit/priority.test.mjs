import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzePriority, humanitiesQuotaProgress } from '../../assets/js/shared/priority-core.js';

test('prioriza somente as trilhas escolhidas pelo aluno', () => {
    const ranking = analyzePriority({
        mainNodes: [{ id: 'CORE', type: 'subject', groupId: '[1005]', period: 1, dependencies: [] }],
        optionalNodes: [
            { id: 'TRACK-A', type: 'optional', period: 2, dependencies: [] },
            { id: 'TRACK-B', type: 'optional', period: 2, dependencies: [] },
        ],
        subjectStates: { CORE: 'subject-available', 'TRACK-A': 'optional-available', 'TRACK-B': 'optional-available' },
        tracksConfig: { 'Trilha A': ['TRACK-A'], 'Trilha B': ['TRACK-B'] },
        selectedTracks: ['Trilha B'],
    });

    assert.deepEqual(new Set(ranking.map(item => item.node.id)), new Set(['CORE', 'TRACK-B']));
});

test('limita a cota de humanidades às horas exigidas pela matriz', () => {
    const nodes = [
        { id: 'H1', cht: 60, groupId: '[human]' },
        { id: 'H2', cht: 60, groupId: '[human]' },
        { id: 'E1', cht: 120, groupId: '[employability]' },
        { id: 'G1', cht: 60, groupId: '[management]' },
    ];
    const progress = humanitiesQuotaProgress({
        humanitiesNodes: nodes,
        subjectStates: { H1: 'humanities-completed', H2: 'humanities-completed', E1: 'humanities-completed', G1: 'humanities-completed' },
        requiredHours: 120,
        groupsConfig: {
            '[human]': { name: 'Ciclo de Humanidades' },
            '[employability]': { name: 'Empregabilidade e Empreendedorismo' },
            '[management]': { name: 'Gestão' },
        },
    });

    assert.equal(progress.completedHours, 120);
    assert.equal(progress.remainingHours, 0);
    assert.deepEqual([...progress.quotaNodeIds], ['H1', 'H2']);
});

test('não deixa a pendência de humanidades ficar negativa', () => {
    const progress = humanitiesQuotaProgress({
        humanitiesNodes: [{ id: 'H1', cht: 90 }],
        subjectStates: { H1: 'humanities-completed' },
        requiredHours: 60,
    });

    assert.equal(progress.completedHours, 90);
    assert.equal(progress.remainingHours, 0);
});
