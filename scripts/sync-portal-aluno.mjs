import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import {
    canonicalize,
    countClasses,
    diffDisciplineSets,
    normalizePayload,
} from '../assets/js/shared/grade-core.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(root, 'data/portal-aluno/source-catalog.json');
const manifestPath = path.join(root, 'data/portal-aluno/index.json');
const profilePath = path.resolve(process.env.UTFPR_PORTAL_PROFILE || path.join(root, '.local/utfpr-portal-profile'));
const args = new Map(process.argv.slice(2).filter(argument => argument.startsWith('--')).map(argument => {
    const [key, ...rest] = argument.slice(2).split('=');
    return [key, rest.join('=') || true];
}));

const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
const semester = String(args.get('semester') || catalog.semester);
const requestedCampus = args.get('campus');
const requestedCourse = args.get('course');
const runAll = args.has('all');
const headless = args.has('headless');
const discover = runAll || args.has('discover');
const sessionCampusCode = String(args.get('session-campus') || catalog.source.sessionCampusCode || '01').padStart(2, '0');
const now = new Date();

function reportUrl(campus, course) {
    return `${catalog.source.baseUrl}/dpls/sistema/aluno${sessionCampusCode}/mplistahorario.inicioAluno?p_curscodnr=${course.portalId || course.id}`;
}

function versionStamp(date) {
    return date.toISOString().replace(/\.\d{3}Z$/, 'Z').replaceAll(':', '-');
}

function fingerprint(payload) {
    return createHash('sha256').update(canonicalize(normalizePayload(payload).disciplinas)).digest('hex');
}

function selectedCourses() {
    return catalog.campuses
        .filter(campus => !requestedCampus || campus.id === requestedCampus)
        .flatMap(campus => campus.courses
            .filter(course => !requestedCourse || course.id === requestedCourse)
            .map(course => ({ campus, course })))
        .filter(({ campus, course }) => runAll || requestedCampus || requestedCourse
            || (campus.id === 'curitiba' && course.id === '0250'));
}

async function readJson(relativePath) {
    try { return JSON.parse(await readFile(path.join(root, relativePath), 'utf8')); }
    catch { return null; }
}

function parseNumber(value) {
    const number = Number(String(value).replace(/\D+/g, ''));
    return Number.isFinite(number) ? number : 0;
}

function normalizeLines(value) {
    return String(value || '').split(/\r?\n/).map(line => line.replace(/\u00a0/g, ' ').trim()).filter(Boolean);
}

function courseFromOption(option) {
    const text = String(option.text || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
    const match = text.match(/^(\d+)\s*-\s*(.+)$/);
    if (!match || !option.value) return null;
    return {
        id: match[1].padStart(4, '0'),
        portalId: String(option.value),
        name: match[2].trim(),
    };
}

async function discoverCatalog(page) {
    const seed = catalog.campuses.find(campus => campus.id === 'curitiba') || catalog.campuses[0];
    const seedCourse = seed?.courses?.find(course => course.id === '0250') || seed?.courses?.[0];
    if (!seed || !seedCourse) throw new Error('Catálogo sem curso-piloto para descobrir os cursos do Portal do Aluno.');

    await page.goto(reportUrl(seed, seedCourse), { waitUntil: 'domcontentloaded' });
    await page.locator('#p_unidcodnr').waitFor({ state: 'attached', timeout: 30000 });
    const campusOptions = await page.locator('#p_unidcodnr option').evaluateAll(options => options.map(option => ({
        value: option.value,
        name: option.textContent?.trim() || '',
    })));
    const campusesByCode = new Map(catalog.campuses.map(campus => [String(Number(campus.code)), campus]));
    let totalCourses = 0;
    for (const option of campusOptions) {
        const campus = campusesByCode.get(String(Number(option.value)));
        if (!campus) continue;
        await page.locator('#p_unidcodnr').selectOption(option.value);
        await page.waitForTimeout(250);
        const courseOptions = await page.locator('#p_curscodnr option').evaluateAll(options => options.map(course => ({
            value: course.value,
            text: course.textContent || '',
        })));
        campus.courses = courseOptions.map(courseFromOption).filter(Boolean);
        totalCourses += campus.courses.length;
    }
    await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
    console.log(`[portal-aluno] catálogo descoberto: ${catalog.campuses.length} câmpus, ${totalCourses} cursos`);
}

function extractReport({ semester, campusId }) {
    const parseNumberInPage = value => {
        const number = Number(String(value).replace(/\D+/g, ''));
        return Number.isFinite(number) ? number : 0;
    };
    const normalizeLinesInPage = value => String(value || '')
        .split(/\r?\n/)
        .map(line => line.replace(/\u00a0/g, ' ').trim())
        .filter(Boolean);
    const tables = [...document.querySelectorAll('table')];
    const sourceName = document.body.innerText.match(/Disciplinas da Matriz do Curso\s+([^\n]+)/i)?.[1]?.trim() || '';
    const generated = document.body.innerText.match(/Arquivo gerado em\s+([^\n]+)/i)?.[1]?.trim() || null;
    const semesterMatch = document.body.innerText.match(/(\d)º\s+Semestre de\s+(\d{4})/i);
    const scheduleRules = [...document.body.innerText.matchAll(/Horários marcados com\s+(\*{1,2})\s+.*?(?:à|a)\s+(?:sede|unidade)\s+([^!\n.]+)/gi)]
        .map(match => ({ marcador: match[1], sede: match[2].trim() }));
    const rulesByMarker = new Map(scheduleRules.map(rule => [rule.marcador, rule.sede]));
    const defaultSite = campusId === 'curitiba' && rulesByMarker.has('*') ? 'Centro' : null;
    const table = tables.find(candidate => {
        const rows = [...candidate.querySelectorAll('tr')];
        return rows.length > 3 && rows.some(row => /^[A-Z0-9]+\s+-\s+.+\(\d+\s+Aulas semanais/i
            .test(row.innerText.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()));
    });
    if (!table) {
        const reportLoaded = /Turmas Abertas[\s\S]*Disciplinas da Matriz do Curso[\s\S]*Arquivo gerado em/i.test(document.body.innerText);
        if (!reportLoaded) throw new Error('Tabela de turmas não encontrada no Portal do Aluno');
        return {
            curso: sourceName,
            ultima_atualizacao: generated,
            semestre: semesterMatch ? `${semesterMatch[2]}-${semesterMatch[1]}` : semester,
            regras_horarios: { marcadores: scheduleRules, sede_sem_marcador: defaultSite },
            disciplinas: [],
        };
    }

    const disciplines = [];
    let current = null;

    for (const row of table.querySelectorAll(':scope > tbody > tr, :scope > tr')) {
        const cells = [...row.children].filter(element => ['TD', 'TH'].includes(element.tagName)
            && !element.classList.contains('dn'));
        const text = row.innerText.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
        if (cells.length === 1) {
            const header = text.match(/^([A-Z0-9]+)\s+-\s+(.+?)\s+\((.+)\)$/);
            if (header && !/^Turmas Abertas|^Disciplinas da Matriz/i.test(header[1])) {
                const details = header[3];
                current = {
                    codigo: header[1],
                    nome: header[2].trim(),
                    creditos: Number(details.match(/(\d+)\s+Aulas semanais presenciais/i)?.[1] || 0),
                    creditos_assincronos: Number(details.match(/(\d+)\s+Aulas semanais assíncronas/i)?.[1] || 0),
                    horas_extensionistas: Number(details.match(/(\d+)\s+horas semestrais extensionistas/i)?.[1] || 0),
                    turmas: [],
                };
                disciplines.push(current);
                continue;
            }
        }
        if (!current || cells.length < 9) continue;
        const values = cells.map(cell => cell.innerText.replace(/\u00a0/g, ' ').trim());
        if (!/^[A-Z0-9][A-Z0-9-]*$/i.test(values[0]) || /^Turma$/i.test(values[0])) continue;
        const priorityGroups = new Map();
        for (const line of normalizeLinesInPage(values[5])) {
            const priority = line.match(/^(\d+)\s*-\s*(.+)$/);
            if (!priority) continue;
            const group = Number(priority[1]);
            (priorityGroups.get(group) || priorityGroups.set(group, []).get(group)).push(priority[2].trim());
        }
        const horarios = normalizeLinesInPage(values[6]).join(' ').split(/\s+-\s+/).filter(Boolean).map(schedule => {
            const match = schedule.match(/^(.*?)\(\s*(.*?)\s*\)$/);
            const rawRoom = (match?.[2] || '').trim();
            const marker = rawRoom.match(/^(\*{1,2})/)?.[1] || null;
            return {
                horario: (match?.[1] || schedule).trim(),
                sala: rawRoom.replace(/^\*{1,2}/, '').trim(),
                sede: marker ? (rulesByMarker.get(marker) || `Marcador ${marker}`) : defaultSite,
            };
        });
        const optativa = normalizeLinesInPage(values[8]);
        current.turmas.push({
            codigo: values[0],
            enquadramento: values[1],
            vagas_total: parseNumberInPage(values[2]),
            vagas_calouros: parseNumberInPage(values[3]),
            reserva: values[4],
            prioridade_cursos: [...priorityGroups.entries()].sort(([a], [b]) => a - b).map(([, names]) => names),
            horarios,
            professores: normalizeLinesInPage(values[7]),
            optativa_matrizes: optativa.length === 1 && /^(não|nao)$/i.test(optativa[0]) ? [] : optativa,
        });
    }

    if (!disciplines.length) throw new Error('Nenhuma disciplina foi encontrada no relatório do Portal do Aluno');
    return {
        curso: sourceName,
        ultima_atualizacao: generated,
        semestre: semesterMatch ? `${semesterMatch[2]}-${semesterMatch[1]}` : semester,
        regras_horarios: { marcadores: scheduleRules, sede_sem_marcador: defaultSite },
        disciplinas: disciplines,
    };
}

async function waitForReportFrame(page) {
    await page.waitForFunction(() => [...document.querySelectorAll('iframe')].some(frame => {
        if (!frame.src.includes('mpListaHorario.pcExibirTurmas')) return false;
        const text = frame.contentDocument?.body?.innerText || '';
        return /Turmas Abertas[\s\S]*Disciplinas da Matriz do Curso[\s\S]*Arquivo gerado em/i.test(text);
    }), { timeout: 30000 });
    const frame = page.frames().find(candidate => candidate !== page.mainFrame()
        && candidate.url().includes('mpListaHorario.pcExibirTurmas'));
    if (!frame) throw new Error('Iframe do relatório não encontrado');
    return frame;
}

async function ensureLoggedIn(page, campus, course) {
    await page.goto(reportUrl(campus, course), { waitUntil: 'domcontentloaded' });
    if (await page.locator('#p_unidcodnr').count()
        || await page.locator('#logoutButton').count()
        || /\/dpls\/sistema\/aluno\d+\/mpmenu\.inicio/.test(page.url())) {
        console.log(`[portal-aluno] sessão autenticada (${page.url()})`);
        return;
    }
    console.log('Faça login manualmente nesta janela. A senha não será lida nem armazenada pelo script.');
    await page.waitForFunction(() => Boolean(document.querySelector('#p_unidcodnr'))
        || Boolean(document.querySelector('#logoutButton'))
        || /\/dpls\/sistema\/aluno\d+\/mpmenu\.inicio/.test(location.pathname), { timeout: 300000 });
    console.log(`[portal-aluno] login detectado (${page.url()})`);
}

async function selectReport(page, campus, course) {
    await page.goto(reportUrl(campus, course), { waitUntil: 'domcontentloaded' });
    await page.locator('#p_unidcodnr').selectOption({ label: campus.name }).catch(() => page.locator('#p_unidcodnr').selectOption(campus.code));
    const courseSelect = page.locator('#p_curscodnr');
    const option = courseSelect.locator('option').filter({ hasText: new RegExp(`^${course.id}\\s*-`, 'i') }).first();
    const value = await option.getAttribute('value');
    if (!value) throw new Error(`Curso ${course.id} não apareceu no câmpus ${campus.name}`);
    await courseSelect.selectOption(value);
    await page.getByRole('button', { name: /Confirmar/i }).click();
    return waitForReportFrame(page);
}

async function persistSnapshot(manifest, campus, course, payload, url) {
    const normalized = normalizePayload(payload);
    const entryId = `${semester}/${campus.id}/${course.id}`;
    const previousEntry = manifest.entries[entryId];
    const previousVersion = previousEntry?.versions?.at(-1);
    const previousSnapshot = previousVersion ? await readJson(previousVersion.snapshotPath) : null;
    const currentFingerprint = fingerprint(payload);
    const changes = previousSnapshot ? diffDisciplineSets(previousSnapshot.payload, payload) : [];
    if (previousVersion && (previousVersion.fingerprint === currentFingerprint || changes.length === 0)) {
        previousEntry.lastCheckedAt = now.toISOString();
        previousEntry.latestSourceUpdatedAt = payload.ultima_atualizacao;
        return { status: 'unchanged', id: entryId };
    }
    const versionId = versionStamp(now);
    const snapshotPath = `data/portal-aluno/snapshots/${semester}/${campus.id}/${course.id}/${versionId}.json`;
    const snapshot = {
        schemaVersion: 1,
        versionId,
        capturedAt: now.toISOString(),
        sourceLastUpdatedAt: payload.ultima_atualizacao,
        semester,
        campus: { id: campus.id, name: campus.name, code: campus.code },
        course: { id: course.id, name: course.name, sourceName: normalized.curso },
        source: { ...catalog.source, url },
        fingerprint: currentFingerprint,
        previousVersionId: previousVersion?.versionId || null,
        changes,
        payload: {
            curso: normalized.curso,
            ultima_atualizacao: payload.ultima_atualizacao,
            regras_horarios: payload.regras_horarios || { marcadores: [], sede_sem_marcador: null },
            disciplinas: normalized.disciplinas,
        },
    };
    await mkdir(path.join(root, path.dirname(snapshotPath)), { recursive: true });
    await writeFile(path.join(root, snapshotPath), `${JSON.stringify(snapshot, null, 2)}\n`);
    const version = {
        versionId,
        capturedAt: snapshot.capturedAt,
        sourceLastUpdatedAt: snapshot.sourceLastUpdatedAt,
        fingerprint: currentFingerprint,
        snapshotPath,
        previousVersionId: snapshot.previousVersionId,
        changeCount: changes.length,
        changes,
    };
    manifest.entries[entryId] = {
        semester,
        campusId: campus.id,
        campusName: campus.name,
        courseId: course.id,
        courseName: course.name,
        sourceName: normalized.curso,
        lastCheckedAt: now.toISOString(),
        latestSourceUpdatedAt: snapshot.sourceLastUpdatedAt,
        latestVersionId: versionId,
        disciplineCount: normalized.disciplinas.length,
        classCount: countClasses(payload),
        versions: [...(previousEntry?.versions || []), version],
    };
    return { status: previousVersion ? 'changed' : 'created', id: entryId, changes: changes.length };
}

const manifest = await readJson('data/portal-aluno/index.json') || { schemaVersion: 1, generatedAt: null, source: catalog.source, entries: {} };
const initialSelections = selectedCourses();
if (!initialSelections.length) throw new Error('Use --campus=<id> --course=<id>, --all ou deixe sem argumentos para o piloto Curitiba/0250.');

await mkdir(profilePath, { recursive: true });
const context = await chromium.launchPersistentContext(profilePath, { headless, viewport: { width: 1440, height: 1000 } });
const page = context.pages()[0] || await context.newPage();
const results = [];
try {
    const seed = initialSelections.find(({ campus, course }) => campus.id === 'curitiba' && course.id === '0250') || initialSelections[0];
    await ensureLoggedIn(page, seed.campus, seed.course);
    if (discover) await discoverCatalog(page);
    const selections = selectedCourses();
    if (!selections.length) throw new Error('Nenhum curso encontrado para a seleção informada.');
    for (const { campus, course } of selections) {
        try {
            const url = reportUrl(campus, course);
            console.log(`[portal-aluno] coletando ${campus.name}/${course.name}`);
            const frame = await selectReport(page, campus, course);
            const payload = await frame.evaluate(extractReport, { semester, campusId: campus.id });
            results.push(await persistSnapshot(manifest, campus, course, payload, url));
        } catch (error) {
            console.error(`[portal-aluno] falha em ${campus.name}/${course.name}: ${error.message}`);
            results.push({ status: 'error', id: `${semester}/${campus.id}/${course.id}`, reason: error.message });
        }
    }
} finally {
    await context.close();
}

manifest.generatedAt = now.toISOString();
manifest.source = catalog.source;
manifest.schemaVersion = 1;
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
for (const result of results) console.log(`[portal-aluno] ${result.status}: ${result.id}${result.changes === undefined ? '' : ` (${result.changes} alterações)`}`);
if (results.some(result => result.status === 'error')) process.exitCode = 1;
