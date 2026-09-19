import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { countClasses, diffDisciplineSets, normalizePayload } from '../../assets/js/shared/grade-core.js';

const catalog = JSON.parse(readFileSync('data/portal-aluno/source-catalog.json', 'utf8'));
const manifest = JSON.parse(readFileSync('data/portal-aluno/index.json', 'utf8'));

test('catálogo oficial mantém todos os câmpus em ordem alfabética', () => {
    const names = catalog.campuses.map(campus => campus.name);
    assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b, 'pt-BR')));
    assert.equal(catalog.campuses.length, 13);
    assert.equal(catalog.campuses.reduce((total, campus) => total + campus.courses.length, 0), 223);
    assert.equal(catalog.source.id, 'utfpr-portal-aluno');
});

test('snapshots oficiais têm payload normalizado e versões registradas', () => {
    const entry = manifest.entries['2026-2/curitiba/0250'];
    assert.ok(entry);
    assert.equal(entry.versions.length, 1);
    const snapshot = JSON.parse(readFileSync(entry.versions[0].snapshotPath, 'utf8'));
    assert.equal(snapshot.source.id, 'utfpr-portal-aluno');
    assert.equal(snapshot.payload.disciplinas.length, entry.disciplineCount);
    assert.equal(countClasses(snapshot.payload), entry.classCount);
    assert.deepEqual({ curso: snapshot.payload.curso, disciplinas: snapshot.payload.disciplinas }, normalizePayload(snapshot.payload));
});

test('separa horários e professores e identifica as sedes de Curitiba', () => {
    const entry = manifest.entries['2026-2/curitiba/0250'];
    const snapshot = JSON.parse(readFileSync(entry.versions[0].snapshotPath, 'utf8'));
    assert.deepEqual(snapshot.payload.regras_horarios, {
        marcadores: [
            { marcador: '*', sede: 'Ecoville' },
            { marcador: '**', sede: 'Neoville' },
        ],
        sede_sem_marcador: 'Centro',
    });
    const classes = snapshot.payload.disciplinas.flatMap(disciplina => disciplina.turmas);
    const ecoville = classes.flatMap(turma => turma.horarios).find(horario => horario.sede === 'Ecoville');
    const centro = classes.flatMap(turma => turma.horarios).find(horario => horario.sede === 'Centro');
    assert.ok(ecoville);
    assert.ok(centro);
    assert.match(ecoville.sala, /^[A-Z0-9-]+$/);
    assert.notEqual(ecoville.sala, centro.sala);
    assert.ok(classes.some(turma => turma.professores.some(professor => !/\d[MTN]\d/.test(professor))));
});

test('não inventa sede para câmpus sem regra publicada', () => {
    const entry = manifest.entries['2026-2/cornelio-procopio/0012'];
    const snapshot = JSON.parse(readFileSync(entry.versions[0].snapshotPath, 'utf8'));
    assert.deepEqual(snapshot.payload.regras_horarios, { marcadores: [], sede_sem_marcador: null });
    const horario = snapshot.payload.disciplinas.flatMap(disciplina => disciplina.turmas).flatMap(turma => turma.horarios)[0];
    assert.ok(horario);
    assert.equal(horario.sede, null);
});

test('cada entrada do manifesto aponta para um snapshot existente', () => {
    const entries = Object.values(manifest.entries);
    assert.ok(entries.length > 100);
    for (const entry of entries) {
        assert.ok(entry.versions.length);
        for (const version of entry.versions) assert.equal(existsSync(version.snapshotPath), true, version.snapshotPath);
    }
});

test('diff registra matéria adicionada, removida e campos alterados', () => {
    const before = { curso: 'Teste', disciplinas: [
        { codigo: 'AAA01', nome: 'Antiga', turmas: [{ codigo: 'S01', vagas_total: 10 }] },
        { codigo: 'REM01', nome: 'Saiu', turmas: [] },
    ] };
    const after = { curso: 'Teste', disciplinas: [
        { codigo: 'AAA01', nome: 'Antiga', turmas: [{ codigo: 'S01', vagas_total: 20 }] },
        { codigo: 'ADD01', nome: 'Entrou', turmas: [] },
    ] };
    assert.deepEqual(diffDisciplineSets(before, after), [
        { type: 'changed', codigo: 'AAA01', nome: 'Antiga', fields: ['turmas[0].vagas_total'] },
        { type: 'added', codigo: 'ADD01', nome: 'Entrou' },
        { type: 'removed', codigo: 'REM01', nome: 'Saiu' },
    ]);
});
