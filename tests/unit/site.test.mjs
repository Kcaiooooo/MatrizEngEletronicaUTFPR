import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { parse } from 'acorn';
const courses = JSON.parse(readFileSync('tests/fixtures/courses.json'));
for (const course of courses) {
    test(`dados curriculares preservados: ${course.id}`, async () => {
        const {allNodesData,allHumanitiesData,allOptionalNodesData,OPTIONAL_GROUPS_CONFIG}=await import('../../'+course.data);
        const hash=createHash('sha256').update(JSON.stringify({allNodesData,allHumanitiesData,allOptionalNodesData,OPTIONAL_GROUPS_CONFIG})).digest('hex');
        assert.equal(hash,course.dataHash);
    });
}
test('todos os JavaScripts têm sintaxe válida', () => {
    for (const file of readdirSync('assets/js',{recursive:true}).filter(f=>f.endsWith('.js'))) {
        assert.doesNotThrow(()=>parse(readFileSync('assets/js/'+file,'utf8'),{ecmaVersion:'latest',sourceType:'module'}),file);
    }
});
test('páginas sem blocos inline e com arquivos locais existentes', () => {
    for (const file of ['index.html',...readdirSync('pages').map(f=>'pages/'+f)]) {
        const html=readFileSync(file,'utf8');
        assert.doesNotMatch(html,/<style\b|<script\b(?![^>]*\bsrc\s*=)[^>]*>/i);
        for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
            if (/^(https?:|mailto:|data:)/.test(match[1])) continue;
            assert.ok(existsSync(path.resolve(path.dirname(file),decodeURIComponent(match[1]))),file+': '+match[1]);
        }
    }
});
