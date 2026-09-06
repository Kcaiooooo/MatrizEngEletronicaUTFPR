import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync('assets/js/shared/storage.js','utf8');
function setup(seed = {}, fail = () => false) {
    const values = new Map(Object.entries(seed));
    const context = { window: { localStorage: { getItem(key) { if (fail('read',key)) throw Error('blocked'); return values.get(key) ?? null; }, setItem(key,value) { if (fail('write',key)) throw Error('quota'); values.set(key,value); }, removeItem(key) { values.delete(key); } } }, document: { readyState: 'loading', addEventListener() {} } };
    vm.runInNewContext(source,context);
    return { storage: context.window.KMStorage, values };
}
const config = id => ({ progressKey: 'shared_'+id, legacyProgressKey: 'shared', glowKey: 'glow_'+id, legacyGlowKey: 'glow' });

test('separa cursos sem modificar o histórico legado e faz backup exato', () => {
    const raw = '{ "nodesState": [{"id":"A","state":"subject-completed"}], "extra": 7 }';
    const {storage,values} = setup({shared:raw});
    const one = storage.forCourse(config('one')), two = storage.forCourse(config('two'));
    assert.equal(one.getItem('shared'),raw);
    one.setItem('shared', JSON.stringify({nodesState:[{id:'B',state:'subject-inprogress'}]}));
    assert.equal(values.get('shared'),raw);
    assert.equal(values.get('shared_one:backup-before-refactor'),raw);
    assert.equal(two.getItem('shared'),raw);
    const saved = JSON.parse(one.getItem('shared'));
    assert.equal(saved.extra,7);
    assert.deepEqual(saved.nodesState.map(n=>n.id),['A','B']);
    one.removeItem('shared');
    assert.equal(one.getItem('shared'),'{}');
    assert.equal(storage.forCourse(config('one')).getItem('shared'),'{}');
    assert.equal(two.getItem('shared'),raw);
    assert.equal(values.get('shared_one:backup-before-refactor'),raw);
});

test('preserva o registro quando não há espaço para o backup', () => {
    const raw = '{"nodesState":[]}';
    const {storage,values} = setup({shared:raw}, (op,key)=>op==='write' && key.endsWith(':backup-before-refactor'));
    assert.equal(storage.forCourse(config('one')).setItem('shared','{"currentPeriod":3}'),false);
    assert.equal(values.get('shared'),raw);
    assert.equal(values.has('shared_one'),false);
});

test('backup também preserva JSON inválido antes da recuperação', () => {
    const {storage,values} = setup({shared:'{invalid'});
    storage.forCourse(config('one')).setItem('shared','{"nodesState":[]}');
    assert.equal(values.get('shared_one:backup-before-refactor'),'{invalid');
});

test('armazena na memória durante a sessão quando localStorage é bloqueado', () => {
    const {storage} = setup({},()=>true);
    assert.equal(storage.getItem('theme'),null);
    assert.equal(storage.setItem('theme','light'),false);
    assert.equal(storage.getItem('theme'),'light');
});

test('registro novo com entrada nula não interrompe a gravação', () => {
    const {storage} = setup();
    assert.doesNotThrow(()=>storage.forCourse(config('one')).setItem('shared','{"nodesState":[null,{"id":"A","state":"subject-completed"}]}'));
});
