import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compareWeeklyIdleMetrics, weeklyIdleMetrics } from '../../assets/js/shared/schedule-ranking.js';

test('soma os intervalos vagos entre a primeira e a última aula de cada dia', () => {
    const metrics = weeklyIdleMetrics([
        { day: 2, start: 450, end: 500 },
        { day: 2, start: 550, end: 600 },
        { day: 3, start: 600, end: 650 },
        { day: 3, start: 830, end: 880 },
    ]);

    assert.deepEqual(metrics, { totalMinutes: 230, longestMinutes: 180 });
});

test('não conta intervalos antes da primeira aula, depois da última, nem sobreposição', () => {
    const metrics = weeklyIdleMetrics([
        { day: 2, start: 450, end: 550 },
        { day: 2, start: 500, end: 600 },
        { day: 2, start: 650, end: 700 },
    ]);

    assert.deepEqual(metrics, { totalMinutes: 50, longestMinutes: 50 });
});

test('desempata grades pela menor soma de intervalos e depois pelo maior vão', () => {
    assert.ok(compareWeeklyIdleMetrics({ totalMinutes: 50, longestMinutes: 50 }, { totalMinutes: 180, longestMinutes: 180 }) < 0);
    assert.ok(compareWeeklyIdleMetrics({ totalMinutes: 100, longestMinutes: 50 }, { totalMinutes: 100, longestMinutes: 75 }) < 0);
    assert.equal(compareWeeklyIdleMetrics({ totalMinutes: 100, longestMinutes: 50 }, { totalMinutes: 100, longestMinutes: 50 }), 0);
});
