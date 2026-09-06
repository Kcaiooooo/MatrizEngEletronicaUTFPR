import test from 'node:test';
import assert from 'node:assert/strict';
import { PPC_M2_DETAILS } from '../../assets/js/data/ppc-m2-details.js';
import { PPC_M3_DETAILS } from '../../assets/js/data/ppc-m3-details.js';

test('fichas do PPC M906 têm conteúdo e carga horária completos', () => {
    assert.equal(Object.keys(PPC_M2_DETAILS).length, 87);

    for (const details of Object.values(PPC_M2_DETAILS)) {
        assert.ok(details.totalHours != null, details.code);
        assert.ok(details.syllabus?.[0]?.content, details.code);
        assert.doesNotMatch(details.syllabus[0].content, /\p{L}-\s+\p{L}/u, details.code);
    }
});

test('fichas do PPC M968 preservam texto sem hifenização de quebra de linha', () => {
    assert.equal(Object.keys(PPC_M3_DETAILS).length, 183);

    const withoutEmenta = Object.values(PPC_M3_DETAILS)
        .filter(details => !details.ementa)
        .map(details => details.code);

    assert.deepEqual(withoutEmenta, ['ELSC02', 'ELSP02', 'ELTE13']);
    for (const details of Object.values(PPC_M3_DETAILS)) {
        const text = [details.name, details.area, details.ementa, details.objective].filter(Boolean).join(' ');
        assert.doesNotMatch(text, /\p{L}-\s+\p{L}/u, details.code);
    }
    for (const code of withoutEmenta) assert.ok(PPC_M3_DETAILS[code].objective, code);
});
