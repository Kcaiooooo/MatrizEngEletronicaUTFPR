import { countClasses } from './grade-core.js';
import { parseProgress } from './progress.js';
import { analyzePriority, availableHumanities, humanitiesQuotaProgress } from './priority-core.js';

const catalogUrl = '../data/portal-aluno/source-catalog.json';
const manifestUrl = '../data/portal-aluno/index.json';
const calendarStorageKey = 'k-matrizes:turmas-abertas:calendar:v1';
const matrixOptions = [
    { id: 'm2', label: 'Engenharia Eletrônica · Matriz 906', dataUrl: '../data/m2.js', progressKey: 'skillTreeProgress_M2' },
    { id: 'm3', label: 'Engenharia Eletrônica · Matriz 968', dataUrl: '../data/m3.js', progressKey: 'skillTreeProgress_M3' },
    { id: 'eletrica', label: 'Engenharia Elétrica · Matriz 979', dataUrl: '../data/eletrica.js', progressKey: 'skillTreeProgress_Eletrica' },
    { id: 'automacao', label: 'Engenharia de Controle e Automação · Matriz 978', dataUrl: '../data/automacao.js', progressKey: 'skillTreeProgress_Automacao' },
    { id: 'automacao-matriz-2', label: 'Engenharia de Controle e Automação · Matriz 708', dataUrl: '../data/automacao-matriz-2.js', progressKey: 'skillTreeProgress_Automacao_automacao-matriz-2', legacyProgressKey: 'skillTreeProgress_Automacao' },
    { id: 'mecatronica', label: 'Engenharia Mecatrônica · Matriz 973', dataUrl: '../data/mecatronica.js', progressKey: 'skillTreeProgress_Mecatronica_mecatronica', legacyProgressKey: 'skillTreeProgress_Mecatronica' },
    { id: 'mecanica', label: 'Engenharia Mecânica · Matriz 985', dataUrl: '../data/mecanica.js', progressKey: 'skillTreeProgress_Mecatronica_mecanica', legacyProgressKey: 'skillTreeProgress_Mecatronica' },
    { id: 'engenharia-civil', label: 'Engenharia Civil · Matriz 960', dataUrl: '../data/engenharia-civil.js', progressKey: 'skillTreeProgress_Automacao_engenharia-civil', legacyProgressKey: 'skillTreeProgress_Automacao' },
    { id: 'engenharia-ambiental', label: 'Engenharia Ambiental e Sanitária · Matriz 980', dataUrl: '../data/engenharia-ambiental.js', progressKey: 'skillTreeProgress_Ambiental' },
    { id: 'engenharia-de-producao', label: 'Engenharia de Produção · Matriz 990', dataUrl: '../data/engenharia-de-producao.js', progressKey: 'skillTreeProgress_Producao' },
    { id: 'administracao', label: 'Administração · Matriz 967', dataUrl: '../data/administracao.js', progressKey: 'skillTreeProgress_Mecatronica_administracao', legacyProgressKey: 'skillTreeProgress_Mecatronica' },
    { id: 'radiologia', label: 'Tecnologia em Radiologia · Matriz 920', dataUrl: '../data/radiologia.js', progressKey: 'skillTreeProgress_Radiologia' },
    { id: 'tecnico-automacao-industrial', label: 'Tecnologia em Automação Industrial · Matriz 977', dataUrl: '../data/tecnico-automacao-industrial.js', progressKey: 'skillTreeProgress_TecnAutomacao' },
];
const weekdays = [
    { id: 2, short: 'Seg', name: 'Segunda-feira' },
    { id: 3, short: 'Ter', name: 'Terça-feira' },
    { id: 4, short: 'Qua', name: 'Quarta-feira' },
    { id: 5, short: 'Qui', name: 'Quinta-feira' },
    { id: 6, short: 'Sex', name: 'Sexta-feira' },
    { id: 7, short: 'Sáb', name: 'Sábado' },
];
const periods = [
    { id: 'M', name: 'Manhã' },
    { id: 'T', name: 'Tarde' },
    { id: 'N', name: 'Noite' },
];
const scheduleTimes = {
    M1: ['07h30', '08h20'], M2: ['08h20', '09h10'], M3: ['09h10', '10h00'],
    M4: ['10h20', '11h10'], M5: ['11h10', '12h00'], M6: ['12h00', '12h50'],
    T1: ['13h00', '13h50'], T2: ['13h50', '14h40'], T3: ['14h40', '15h30'],
    T4: ['15h50', '16h40'], T5: ['16h40', '17h30'], T6: ['17h50', '18h40'],
    N1: ['18h40', '19h30'], N2: ['19h30', '20h20'], N3: ['20h20', '21h10'],
    N4: ['21h10', '22h00'], N5: ['22h10', '23h00'],
};
const scheduleRows = periods.flatMap(period => Array.from({ length: period.id === 'N' ? 5 : 6 }, (_, index) => ({
    period: period.id,
    slot: index + 1,
    code: `${period.id}${index + 1}`,
})));
const state = {
    catalog: null,
    manifest: null,
    entry: null,
    snapshot: null,
    filters: { code: '', name: '', schedule: '' },
    searchAllCampus: false,
    campusSnapshotCache: new Map(),
    snapshotCache: new Map(),
    changeLogRequestId: 0,
    equivalenceGroups: null,
    displayedSelections: new Map(),
    crossCampusRequestId: 0,
    autoGradeTrackRequestId: 0,
    autoGradeSearchId: 0,
    autoGradeProfile: null,
    manualSubjectOrder: [],
    manualSubjectCandidates: [],
    automaticGradeResults: [],
    automaticGradeResultsVisible: 0,
    versionId: null,
    selectedClasses: new Map(),
    maxLessons: 40,
    calendarMessage: { text: '', type: '' },
};
const $ = selector => document.querySelector(selector);

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function hydrateSelection(value) {
    if (!value || typeof value !== 'object' || typeof value.key !== 'string' || !Array.isArray(value.horarios)) return null;
    return {
        key: value.key,
        semester: String(value.semester || ''),
        campusId: String(value.campusId || ''),
        campusName: String(value.campusName || ''),
        courseId: String(value.courseId || ''),
        courseName: String(value.courseName || ''),
        disciplineCode: String(value.disciplineCode || ''),
        disciplineName: String(value.disciplineName || ''),
        turmaCode: String(value.turmaCode || ''),
        creditos: Number.isFinite(Number(value.creditos)) ? Number(value.creditos) : 0,
        horarios: value.horarios.filter(horario => horario && typeof horario === 'object').map(horario => ({
            horario: String(horario.horario || ''),
            sala: horario.sala ? String(horario.sala) : null,
            sede: horario.sede ? String(horario.sede) : null,
        })),
        professores: Array.isArray(value.professores) ? value.professores.map(String) : [],
    };
}

function loadPersistedCalendar() {
    const raw = window.KMStorage?.getItem(calendarStorageKey);
    if (!raw) return;
    try {
        const parsed = JSON.parse(raw);
        const items = Array.isArray(parsed) ? parsed : parsed?.items;
        const maxLessons = Number(parsed?.maxLessons);
        if (Number.isFinite(maxLessons) && maxLessons > 0) state.maxLessons = Math.min(Math.round(maxLessons), 200);
        if (!Array.isArray(items)) return;
        items.map(hydrateSelection).filter(Boolean).forEach(selection => state.selectedClasses.set(selection.key, selection));
    } catch {
        // Uma seleção corrompida não deve impedir a consulta das turmas.
    }
}

function persistCalendar() {
    window.KMStorage?.setItem(calendarStorageKey, JSON.stringify({ version: 2, maxLessons: state.maxLessons, items: [...state.selectedClasses.values()] }));
}

function formatDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return value;
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
}

function cleanSourceUpdate(value) {
    return String(value || '').replace(/\s*OBS:\s*este arquivo será atualizado em no máximo 2\s*\(duas\)\s*horas\.?/i, '').trim();
}

function sourceEntryKey(campusId, courseId) {
    return `${state.catalog.semester}/${campusId}/${courseId}`;
}

function campusEntries(campusId) {
    return Object.values(state.manifest.entries).filter(entry => entry.campusId === campusId);
}

function currentCampus() { return state.catalog.campuses.find(campus => campus.id === $('#campus-select').value); }

function updateSourceNote() {
    const url = state.catalog.source.baseUrl || 'https://sistemas2.utfpr.edu.br/portal-aluno';
    $('#source-note').innerHTML = `Fonte oficial única: <a href="${url}" target="_blank" rel="noopener noreferrer">Sistema Acadêmico UTFPR</a>. Os dados são somente para consulta e não fazem matrícula.`;
}

function populateCampuses() {
    $('#campus-select').innerHTML = state.catalog.campuses.map(campus => {
        const available = campusEntries(campus.id).length;
        return `<option value="${escapeHtml(campus.id)}">${escapeHtml(campus.name)}${available ? '' : ' · aguardando captura'}</option>`;
    }).join('');
    const firstWithData = state.catalog.campuses.find(campus => campus.id === 'curitiba' && campusEntries(campus.id).length)
        || state.catalog.campuses.find(campus => campusEntries(campus.id).length);
    $('#campus-select').value = firstWithData?.id || state.catalog.campuses[0]?.id || '';
}

function populateCourses() {
    const campus = currentCampus();
    const entries = campus ? campusEntries(campus.id) : [];
    const courses = campus?.courses || [];
    $('#course-select').innerHTML = courses.map(course => {
        const available = entries.some(entry => entry.courseId === course.id);
        return `<option value="${escapeHtml(course.id)}" ${available ? '' : 'disabled'}>${escapeHtml(course.name)}${available ? '' : ' · sem captura'}</option>`;
    }).join('');
    const firstAvailable = courses.find(course => entries.some(entry => entry.courseId === course.id));
    $('#course-select').value = firstAvailable?.id || courses[0]?.id || '';
    $('#course-select').disabled = !firstAvailable;
    updateEntry();
}

function populateVersions() {
    const versions = state.entry?.versions || [];
    $('#version-select').innerHTML = versions.slice().reverse().map((version, index) =>
        `<option value="${escapeHtml(version.versionId)}">${index === 0 ? 'Atual · ' : ''}${escapeHtml(formatDate(version.capturedAt))} · ${version.changeCount} alterações</option>`
    ).join('');
    $('#version-select').disabled = !versions.length;
    $('#version-select').value = state.versionId || versions.at(-1)?.versionId || '';
}

function updateEntry() {
    state.calendarMessage = { text: '', type: '' };
    state.entry = state.manifest.entries[sourceEntryKey($('#campus-select').value, $('#course-select').value)] || null;
    state.versionId = state.entry?.latestVersionId || null;
    populateVersions();
    loadSelectedSnapshot();
    const campus = currentCampus();
    $('#selection-note').textContent = state.entry
        ? `${campus.name} · ${state.entry.sourceName || state.entry.courseName} · ${state.entry.versions.length} versão(ões) arquivada(s)`
        : `${campus?.name || 'Câmpus'} · nenhum snapshot disponível para este curso ainda.`;
}

async function loadSelectedSnapshot() {
    const version = state.entry?.versions.find(item => item.versionId === $('#version-select').value);
    if (!version) {
        state.snapshot = null;
        renderEmpty();
        return;
    }
    try {
        state.snapshot = await fetch(`../${version.snapshotPath}`).then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        });
        state.snapshotCache.set(version.snapshotPath, state.snapshot);
        state.versionId = version.versionId;
        renderSnapshot();
    } catch (error) {
        showStatus(`Falha ao carregar a versão: ${error.message}`, true);
        state.snapshot = null;
        renderEmpty();
    }
}

function showStatus(message, error = false) {
    const status = $('#data-status');
    status.textContent = message;
    status.classList.toggle('error', error);
}

function renderEmpty() {
    state.changeLogRequestId++;
    $('#grade-content').hidden = true;
    $('#empty-state').hidden = false;
    $('#auto-grade').disabled = true;
    state.displayedSelections.clear();
    $('#discipline-scope-note').hidden = true;
    $('#history-list').innerHTML = state.entry ? historyMarkup() : '';
    $('#change-log').innerHTML = '';
    renderCalendar();
}

function renderStats(snapshot) {
    const payload = snapshot.payload;
    $('#stat-disciplines').textContent = payload.disciplinas.length;
    $('#stat-classes').textContent = countClasses(payload);
    $('#stat-source-update').textContent = cleanSourceUpdate(payload.ultima_atualizacao) || '—';
    $('#stat-captured').textContent = formatDate(snapshot.capturedAt);
}

function classKey(disciplina, turma, entry = state.entry) {
    return `${state.catalog.semester}/${entry.campusId}/${entry.courseId}/${disciplina.codigo}/${turma.codigo}`;
}

function selectionData(disciplina, turma, context = {}) {
    const entry = context.entry || state.entry;
    const campus = currentCampus();
    return {
        key: classKey(disciplina, turma, entry),
        semester: state.catalog.semester,
        campusId: entry.campusId,
        campusName: context.campusName || campus?.name || entry.campusId,
        courseId: entry.courseId,
        courseName: entry.courseName || entry.sourceName || entry.courseId,
        disciplineCode: disciplina.codigo,
        disciplineName: disciplina.nome,
        turmaCode: turma.codigo,
        creditos: Number.isFinite(Number(disciplina.creditos)) ? Number(disciplina.creditos) : 0,
        horarios: turma.horarios || [],
        professores: turma.professores || [],
    };
}

function classMarkup(turma, disciplina, context = {}) {
    const selection = context.selection || selectionData(disciplina, turma, context);
    state.displayedSelections.set(selection.key, selection);
    const schedule = (turma.horarios || []).map(horario => `${escapeHtml(horario.horario)}${horario.sala ? ` · ${escapeHtml(horario.sala)}` : ''}${horario.sede ? ` · ${escapeHtml(horario.sede)}` : ''}`).join(' · ') || 'Horário a definir';
    const teachers = (turma.professores || []).join(', ') || 'Professor a definir';
    const priorities = (turma.prioridade_cursos || []).flat().join(', ');
    const offeredCourses = context.offerCourses?.length
        ? `<br><strong>Encontrada nos cursos:</strong> ${context.offerCourses.map(escapeHtml).join(', ')}`
        : '';
    const selected = state.selectedClasses.has(selection.key);
    return `<article class="gnh-class${selected ? ' gnh-class-selected' : ''}" data-class-key="${escapeHtml(selection.key)}" role="button" tabindex="0" aria-pressed="${selected}">
        <div class="gnh-class-line"><span class="gnh-class-code">Turma ${escapeHtml(turma.codigo)}</span><span class="gnh-tag">${escapeHtml(turma.enquadramento || 'Modalidade não informada')}</span><span class="gnh-tag">${escapeHtml(turma.vagas_total ?? '—')} vagas</span><span class="gnh-tag">Reserva: ${escapeHtml(turma.reserva || '—')}</span><span class="gnh-class-action">${selected ? 'No calendário' : 'Adicionar ao calendário'}</span></div>
        <p class="gnh-class-detail"><strong>Horários:</strong> ${schedule}<br><strong>Professor(es):</strong> ${escapeHtml(teachers)}${priorities ? `<br><strong>Prioridade:</strong> ${escapeHtml(priorities)}` : ''}${offeredCourses}</p>
    </article>`;
}

function normalizeFilter(value) {
    return String(value || '').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function scheduleFilterText(horario) {
    const parsed = parseHorario(horario?.horario);
    const day = parsed && weekdays.find(item => item.id === parsed.day);
    const period = parsed && periods.find(item => item.id === parsed.period);
    const times = parsed && scheduleTimes[`${parsed.period}${parsed.slot}`];
    return [
        horario?.horario,
        day?.name,
        day?.short,
        period?.name,
        period?.id,
        ...(times || []),
        horario?.sala,
        horario?.sede,
    ].filter(Boolean).join(' ');
}

function turmaMatchesScheduleFilter(turma, filter) {
    if (filter) {
        return (turma.horarios || []).some(horario => normalizeFilter(scheduleFilterText(horario)).includes(filter));
    }
    return true;
}

function disciplineMatchesFilters(disciplina, context = {}) {
    const filters = context.filters || state.filters;
    const codeFilter = normalizeFilter(filters.code);
    const nameFilter = normalizeFilter(filters.name);
    const equivalenceCodes = context.equivalenceCodes || new Set();
    const equivalenceNames = context.equivalenceNames || new Set();
    const disciplineCode = normalizeFilter(disciplina.codigo);
    const disciplineName = normalizeFilter(disciplina.nome);
    if (codeFilter && !disciplineCode.includes(codeFilter) && !equivalenceCodes.has(disciplineCode)) return false;
    if (nameFilter && !disciplineName.includes(nameFilter) && !equivalenceNames.has(disciplineName) && !equivalenceCodes.has(disciplineCode)) return false;
    return true;
}

function disciplineMarkup(disciplina, context = {}) {
    if (!disciplineMatchesFilters(disciplina, context)) return '';
    const scheduleFilter = normalizeFilter((context.filters || state.filters).schedule);
    const offers = context.offers || (disciplina.turmas || [])
        .filter(turma => turmaMatchesScheduleFilter(turma, scheduleFilter))
        .map(turma => ({ turma, entry: context.entry, courseNames: [] }));
    if (!offers.length) return '';
    const credits = disciplina.creditos === null || disciplina.creditos === undefined ? '—' : `${disciplina.creditos} cr.`;
    const courseCount = new Set(offers.flatMap(offer => offer.courseNames || [])).size;
    const courseLabel = context.crossCampus ? `<span class="gnh-discipline-course">${courseCount} curso(s)</span>` : '';
    return `<details class="gnh-discipline">
        <summary><span class="gnh-discipline-code">${escapeHtml(disciplina.codigo)}</span><span class="gnh-discipline-name">${escapeHtml(disciplina.nome)}</span>${courseLabel}<span class="gnh-discipline-meta">${escapeHtml(credits)} · ${offers.length} turma(s)</span></summary>
        <div class="gnh-class-list">${offers.map(offer => classMarkup(offer.turma, disciplina, {
            ...context,
            entry: offer.entry || context.entry,
            selection: offer.selection,
            offerCourses: offer.courseNames,
        })).join('')}</div>
    </details>`;
}

function crossCampusOfferKey(disciplina, turma) {
    const schedules = (turma.horarios || [])
        .map(item => normalizeFilter(item.horario))
        .sort((a, b) => a.localeCompare(b));
    return JSON.stringify([
        normalizeFilter(disciplina.codigo || disciplina.disciplineCode),
        normalizeFilter(turma.codigo || turma.turmaCode),
        schedules,
    ]);
}

function parseHorario(value) {
    const match = String(value || '').trim().match(/^([2-7])([MTN])(\d+)$/i);
    if (!match) return null;
    const slot = Number(match[3]);
    if (!slot) return null;
    return { day: Number(match[1]), period: match[2].toUpperCase(), slot };
}

function findSelection(key) {
    const displayed = state.displayedSelections.get(key);
    if (displayed) return displayed;
    const disciplines = state.snapshot?.payload?.disciplinas || [];
    for (const disciplina of disciplines) {
        for (const turma of disciplina.turmas || []) {
            const selection = selectionData(disciplina, turma);
            if (selection.key === key) return selection;
        }
    }
    return null;
}

function matrixNodePrefix(node) {
    if (node?.type === 'humanities' || node?.tabId === 'humanities') return 'humanities';
    if (node?.type === 'optional' || node?.tabId === 'optional' || node?.groupId) return 'optional';
    return 'subject';
}

function isCompletedMatrixState(value) {
    return ['completed', 'satisfied', 'subject-completed', 'subject-satisfied', 'humanities-completed', 'humanities-satisfied', 'optional-completed', 'optional-satisfied'].includes(value)
        || String(value || '').endsWith('-completed') || String(value || '').endsWith('-satisfied');
}

function isAvailableMatrixState(value) {
    return ['available', 'inprogress', 'subject-available', 'subject-inprogress', 'humanities-available', 'humanities-inprogress', 'optional-available', 'optional-inprogress'].includes(value)
        || String(value || '').endsWith('-available') || String(value || '').endsWith('-inprogress');
}

function loadMatrixProfile(matrix, data) {
    const mainNodes = Array.isArray(data.allNodesData) ? data.allNodesData.map(node => ({ ...node })) : [];
    const humanitiesNodes = Array.isArray(data.allHumanitiesData) ? data.allHumanitiesData.map(node => ({ ...node })) : [];
    const optionalNodes = Array.isArray(data.allOptionalNodesData) ? data.allOptionalNodesData.map(node => ({ ...node })) : [];
    const allNodes = [...mainNodes, ...humanitiesNodes, ...optionalNodes];
    const maxPeriod = Math.max(1, ...allNodes.map(node => Number(node.period) || 1));
    const raw = window.KMStorage?.getItem(matrix.progressKey) || (matrix.legacyProgressKey && window.KMStorage?.getItem(matrix.legacyProgressKey));
    const progress = parseProgress(raw, maxPeriod) || { nodesState: [], humanitiesNodesState: [], optionalNodesState: [], currentPeriod: 1 };
    const subjectStates = {};
    for (const list of [progress.nodesState, progress.humanitiesNodesState, progress.optionalNodesState]) {
        for (const item of list || []) subjectStates[item.id] = item.state;
    }
    for (const node of allNodes) subjectStates[node.id] ||= node.state || `${matrixNodePrefix(node)}-locked`;

    const byId = new Map(allNodes.map(node => [String(node.id), node]));
    const currentPeriod = Number(progress.currentPeriod) || 1;
    let changed = true;
    while (changed) {
        changed = false;
        for (const node of allNodes) {
            const currentState = subjectStates[node.id];
            if (isCompletedMatrixState(currentState) || isAvailableMatrixState(currentState)) continue;
            const dependenciesMet = (node.dependencies || []).every(dependency => {
                const dependencyId = String(dependency);
                if (dependencyId.startsWith('Periodo:')) return currentPeriod >= Number(dependencyId.split(':')[1]);
                const parent = byId.get(dependencyId);
                return parent && isCompletedMatrixState(subjectStates[parent.id]);
            });
            if (dependenciesMet && (Number(node.period) || 1) <= currentPeriod + 2) {
                subjectStates[node.id] = `${matrixNodePrefix(node)}-available`;
                changed = true;
            }
        }
    }

    return {
        matrix,
        mainNodes,
        humanitiesNodes,
        optionalNodes,
        allNodes,
        subjectStates,
        currentPeriod,
        requiredHumanitiesHours: Number(data.TOTAL_HUMANITIES_HOURS) || 0,
        groupsConfig: data.OPTIONAL_GROUPS_CONFIG || {},
        tracksConfig: data.SPECIALIZATION_TRACKS || data.SPECIALIZATION_TRACKS_M2 || {},
    };
}

async function getMatrixProfile(matrix) {
    const data = await import(matrix.dataUrl);
    return loadMatrixProfile(matrix, data);
}

function nodeCodes(node) {
    return [node?.id, ...(node?.equivalents || []).map(item => typeof item === 'string' ? item : item?.id)].filter(Boolean).map(String);
}

function equivalenceNodeCodes(node) {
    const alternatives = [node?.alternative?.id, ...(node?.equivalents || []).map(item => typeof item === 'string' ? item : item?.id)]
        .filter(Boolean)
        .flatMap(value => String(value).split(/[\/,;]/));
    return [node?.id, ...alternatives].filter(Boolean).map(value => String(value).trim()).filter(Boolean);
}

function disciplineForNode(node) {
    const codes = new Set(nodeCodes(node));
    return (state.snapshot?.payload?.disciplinas || []).find(disciplina => codes.has(String(disciplina.codigo))) || null;
}

function classMatchesAutomaticFilters(selection, filters) {
    const horarios = Array.isArray(selection?.horarios) ? selection.horarios : [];
    if (!horarios.length) return true;
    return horarios.every(horario => {
        const parsed = parseHorario(horario.horario);
        if (!parsed) return false;
        const gridId = filters.campusId === 'curitiba' ? String(horario.sede || '') : filters.singleGridId;
        if (filters.avoidedSlots.has(`${gridId}|${parsed.day}-${parsed.period}-${parsed.slot}`)) return false;
        return true;
    });
}

function automaticClassChoices(candidate, filters) {
    const turmas = Array.isArray(candidate.discipline?.turmas) ? candidate.discipline.turmas : [];
    const reserveRank = turma => turma.reserva === 'Aberta' ? 0 : turma.reserva === 'Sem Reserva' ? 1 : 2;
    return turmas.map(turma => {
        const selection = selectionData(candidate.discipline, turma);
        Object.defineProperty(selection, '_automaticReserveRank', { value: reserveRank(turma) });
        return { selection, reserve: reserveRank(turma) };
    })
        .filter(item => classMatchesAutomaticFilters(item.selection, filters))
        .sort((a, b) => a.reserve - b.reserve || a.selection.turmaCode.localeCompare(b.selection.turmaCode, 'pt-BR'))
        .map(item => item.selection);
}

function classSlotKeys(selection) {
    return (selection.horarios || []).map(horario => {
        const parsed = parseHorario(horario.horario);
        return parsed ? `${parsed.day}-${parsed.period}-${parsed.slot}` : null;
    }).filter(Boolean);
}

function compareAutomaticGrades(a, b, candidates, mode) {
    const priorityCount = grade => grade.items.filter(item => item.kind === 'priority').length;
    if (mode === 'history') {
        const countDifference = priorityCount(b) - priorityCount(a);
        if (countDifference) return countDifference;
        const priorityCandidates = candidates.filter(candidate => candidate.kind === 'priority');
        for (const candidate of priorityCandidates) {
            const aHas = a.nodeIds.has(candidate.id);
            const bHas = b.nodeIds.has(candidate.id);
            if (aHas !== bHas) return bHas ? 1 : -1;
        }
        const aHumanitiesHours = a.items.filter(item => item.kind === 'humanities').reduce((sum, item) => sum + item.hours, 0);
        const bHumanitiesHours = b.items.filter(item => item.kind === 'humanities').reduce((sum, item) => sum + item.hours, 0);
        if (aHumanitiesHours !== bHumanitiesHours) return bHumanitiesHours - aHumanitiesHours;
    } else {
        if (a.items.length !== b.items.length) return b.items.length - a.items.length;
        for (const candidate of candidates) {
            const aHas = a.nodeIds.has(candidate.id);
            const bHas = b.nodeIds.has(candidate.id);
            if (aHas !== bHas) return bHas ? 1 : -1;
        }
    }
    if (a.items.length !== b.items.length) return b.items.length - a.items.length;
    const aLessons = a.items.reduce((sum, item) => sum + item.selection.creditos, 0);
    const bLessons = b.items.reduce((sum, item) => sum + item.selection.creditos, 0);
    if (aLessons !== bLessons) return bLessons - aLessons;
    const aReserve = a.items.reduce((sum, item) => sum + (item.selection._automaticReserveRank || 0), 0);
    const bReserve = b.items.reduce((sum, item) => sum + (item.selection._automaticReserveRank || 0), 0);
    if (aReserve !== bReserve) return aReserve - bReserve;
    const aKeys = a.items.map(item => item.selection.key).sort().join('|');
    const bKeys = b.items.map(item => item.selection.key).sort().join('|');
    return aKeys.localeCompare(bKeys, 'pt-BR');
}

async function buildAutomaticGrade(matrix, filters, selectedTracks = null, mode = 'history', manualOrder = [], reportProgress = () => {}, isCancelled = () => false) {
    if (!state.snapshot) throw new Error('Nenhuma captura de turmas está selecionada.');
    const profile = await getMatrixProfile(matrix);
    const allCandidates = automaticGradeSubjectCandidates(profile, selectedTracks);
    const candidates = mode === 'manual'
        ? manualOrder.map(id => allCandidates.find(candidate => candidate.id === id)).filter(Boolean)
        : [...allCandidates.filter(candidate => candidate.kind === 'priority'), ...allCandidates.filter(candidate => candidate.kind === 'humanities')];
    if (!candidates.length) {
        if (mode === 'manual') throw new Error('Marque ao menos uma matéria disponível e ajuste a ordem de prioridade.');
        throw new Error(`A matriz ${matrix.label} não corresponde às disciplinas da captura atual. Selecione o curso correspondente no campo “Curso” e tente novamente.`);
    }

    const candidateChoices = candidates.map(candidate => automaticClassChoices(candidate, filters));
    const humanitiesProgress = humanitiesQuotaProgress({
        humanitiesNodes: profile.humanitiesNodes,
        subjectStates: profile.subjectStates,
        requiredHours: profile.requiredHumanitiesHours,
        groupsConfig: profile.groupsConfig,
    });
    const chosen = [];
    const chosenIds = new Set();
    const occupied = new Set();
    let lessonCount = 0;
    let humanitiesHours = 0;
    let explored = 0;
    let lastProgressAt = 0;
    const results = [];

    const canAdd = (index, selection) => {
        const candidate = candidates[index];
        if (chosenIds.has(candidate.id) || lessonCount + selection.creditos > state.maxLessons) return false;
        if (candidate.kind === 'humanities' && humanitiesProgress.completedHours + humanitiesHours >= humanitiesProgress.requiredHours) return false;
        const slots = classSlotKeys(selection);
        return new Set(slots).size === slots.length && slots.every(slot => !occupied.has(slot));
    };

    const isMaximal = () => candidates.every((candidate, index) => {
        if (chosenIds.has(candidate.id)) return true;
        if (candidate.kind === 'humanities' && humanitiesProgress.completedHours + humanitiesHours >= humanitiesProgress.requiredHours) return true;
        return !candidateChoices[index].some(selection => canAdd(index, selection));
    });

    const saveResult = () => {
        const items = chosen.map(item => ({ ...item }));
        results.push({ items, nodeIds: new Set(items.map(item => item.id)) });
    };

    const yieldProgress = async () => {
        explored++;
        if (explored - lastProgressAt < 1200) return;
        lastProgressAt = explored;
        reportProgress(`Buscando grades viáveis… ${explored.toLocaleString('pt-BR')} combinações parciais avaliadas, ${results.length.toLocaleString('pt-BR')} alternativas máximas encontradas.`);
        await new Promise(resolve => setTimeout(resolve, 0));
    };

    const search = async index => {
        if (isCancelled()) throw new Error('Busca cancelada.');
        await yieldProgress();
        if (isMaximal()) {
            saveResult();
            return;
        }
        if (index >= candidates.length) {
            return;
        }
        const candidate = candidates[index];
        const choices = candidateChoices[index];
        for (const selection of choices) {
            if (!canAdd(index, selection)) continue;
            const slots = classSlotKeys(selection);
            slots.forEach(slot => occupied.add(slot));
            chosenIds.add(candidate.id);
            lessonCount += selection.creditos;
            const hours = candidate.kind === 'humanities' ? Number(candidate.node.cht) || 0 : 0;
            humanitiesHours += hours;
            chosen.push({ id: candidate.id, kind: candidate.kind, hours, selection });
            await search(index + 1);
            chosen.pop();
            humanitiesHours -= hours;
            lessonCount -= selection.creditos;
            chosenIds.delete(candidate.id);
            slots.forEach(slot => occupied.delete(slot));
        }
        // O ramo sem esta matéria permite gerar alternativas máximas em que ela
        // fica de fora por bloquear disciplinas posteriores.
        await search(index + 1);
    };

    reportProgress('Preparando as opções de turma…');
    await search(0);
    if (!results.length || results.every(result => !result.items.length)) throw new Error('Nenhuma matéria pôde ser encaixada com os horários e limites escolhidos.');
    results.sort((a, b) => compareAutomaticGrades(a, b, candidates, mode));
    reportProgress(`${results.length.toLocaleString('pt-BR')} grades máximas viáveis encontradas.`);
    return { results, profile, mode, candidateCount: candidates.length };
}

function automaticGradeResultMarkup(result, index) {
    const lessons = result.items.reduce((sum, item) => sum + item.selection.creditos, 0);
    const priorityCount = result.items.filter(item => item.kind === 'priority').length;
    const humanitiesCount = result.items.length - priorityCount;
    const subjects = result.items.map(item => {
        const selection = item.selection;
        const schedule = selection.horarios.map(horario => [horario.horario, horario.sede, horario.sala].filter(Boolean).join(' · ')).join(', ') || 'Horário não informado';
        return `<li><strong>${escapeHtml(selection.disciplineCode)} · Turma ${escapeHtml(selection.turmaCode)}</strong> — ${escapeHtml(selection.disciplineName)}<small>${escapeHtml(schedule)}</small></li>`;
    }).join('');
    return `<article class="gnh-auto-grade-result">
        <div class="gnh-auto-grade-result-heading"><strong>Opção ${index + 1}</strong><span>${priorityCount} prioritária(s) · ${humanitiesCount} de humanidades · ${lessons}/${state.maxLessons} aulas</span></div>
        <ul>${subjects || '<li>Nenhuma matéria encaixada</li>'}</ul>
        <button class="gnh-primary-button" type="button" data-auto-grade-apply="${index}">Usar esta grade</button>
    </article>`;
}

function renderAutomaticGradeResults() {
    const section = $('#auto-grade-results');
    const container = $('#auto-grade-result-options');
    const total = state.automaticGradeResults.length;
    const visible = Math.min(state.automaticGradeResultsVisible, total);
    section.hidden = total === 0;
    $('#auto-grade-results-summary').textContent = total
        ? `${total.toLocaleString('pt-BR')} grade(s) máxima(s) viável(eis): nenhuma matéria elegível adicional cabe sem conflito ou violação de limite. Ordenadas por prioridade e preenchimento; exibindo ${visible.toLocaleString('pt-BR')}.`
        : '';
    container.innerHTML = state.automaticGradeResults.slice(0, visible).map(automaticGradeResultMarkup).join('');
    $('#auto-grade-show-more').hidden = visible >= total;
}

function applyAutomaticGradeResult(index) {
    const result = state.automaticGradeResults[index];
    if (!result) return;
    state.selectedClasses.clear();
    result.items.forEach(item => state.selectedClasses.set(item.selection.key, item.selection));
    persistCalendar();
    setCalendarMessage(`Grade automática: opção ${index + 1} de ${state.automaticGradeResults.length} aplicada (${result.items.length} matéria(s)).`, 'success');
    renderCalendar();
    updateClassSelectionUI();
    closeAutomaticGradeModal();
}

function calendarEventMarkup({ selection, horario }, mini = false) {
    const locationText = horario.sede || '';
    const contextText = [selection.campusName, selection.courseName].filter(Boolean).join(' · ');
    const roomSuffix = horario.sala ? ` / ${horario.sala}` : '';
    const eventLabel = `${selection.disciplineName} · ${[locationText, contextText].filter(Boolean).join(' · ')}`;
    const interaction = mini ? ` data-class-key="${escapeHtml(selection.key)}" role="button" tabindex="0"` : '';
    return `<article class="gnh-calendar-event${mini ? ' gnh-calendar-event-clickable' : ''}"${interaction} title="${escapeHtml(eventLabel)}" aria-label="${escapeHtml(eventLabel)}"><span class="gnh-calendar-event-code">${escapeHtml(selection.disciplineCode)}-${escapeHtml(selection.turmaCode)}${escapeHtml(roomSuffix)}</span><strong>${escapeHtml(selection.disciplineName)}</strong>${contextText || locationText ? `<small>${escapeHtml([locationText, contextText].filter(Boolean).join(' · '))}</small>` : ''}</article>`;
}

function selectedLessons() {
    return [...state.selectedClasses.values()].reduce((total, selection) => total + selection.creditos, 0);
}

function occupiedCells(exceptKey = '') {
    const occupied = new Map();
    for (const selection of state.selectedClasses.values()) {
        if (selection.key === exceptKey) continue;
        for (const horario of selection.horarios) {
            const parsed = parseHorario(horario.horario);
            if (parsed) occupied.set(`${parsed.day}-${parsed.period}-${parsed.slot}`, selection);
        }
    }
    return occupied;
}

function findConflict(selection) {
    const occupied = occupiedCells(selection.key);
    for (const horario of selection.horarios) {
        const parsed = parseHorario(horario.horario);
        const conflict = parsed && occupied.get(`${parsed.day}-${parsed.period}-${parsed.slot}`);
        if (conflict) return { selection: conflict, horario };
    }
    return null;
}

function setCalendarMessage(text = '', type = '') {
    state.calendarMessage = { text, type };
}

function cellMarkup(day, row, events, mini = false) {
    const className = mini ? 'gnh-mini-calendar-cell' : 'gnh-calendar-cell';
    return `<div class="${className}" data-calendar-cell="${day.id}-${row.period}-${row.slot}">${events.map(event => calendarEventMarkup(event, mini)).join('')}</div>`;
}

function calendarGridMarkup(cells, mini = false) {
    if (mini) {
        const header = '<div class="gnh-mini-calendar-header"> </div>'
            + weekdays.map(day => `<div class="gnh-mini-calendar-header" title="${day.name}">${day.short[0]}</div>`).join('');
        const rows = scheduleRows.map(row => {
            const timeCell = `<div class="gnh-mini-calendar-time">${row.code}</div>`;
            const dayCells = weekdays.map(day => cellMarkup(day, row, cells.get(`${day.id}-${row.period}-${row.slot}`) || [], true)).join('');
            return timeCell + dayCells;
        }).join('');
        return `<div class="gnh-mini-calendar-grid">${header}${rows}</div>`;
    }

    const header = '<div class="gnh-calendar-header gnh-calendar-time-heading">Turno</div><div class="gnh-calendar-header">Início</div><div class="gnh-calendar-header">Térm.</div>'
        + weekdays.map(day => `<div class="gnh-calendar-header" title="${day.name}">${day.short}</div>`).join('');
    const rows = scheduleRows.map(row => {
        const label = periods.find(period => period.id === row.period)?.name || row.period;
        const [start, end] = scheduleTimes[row.code] || ['—', '—'];
        const timeCell = `<div class="gnh-calendar-time"><strong>${row.code}</strong><span>${label}</span></div><div class="gnh-calendar-clock">${start}</div><div class="gnh-calendar-clock">${end}</div>`;
        const dayCells = weekdays.map(day => cellMarkup(day, row, cells.get(`${day.id}-${row.period}-${row.slot}`) || [])).join('');
        return timeCell + dayCells;
    }).join('');
    return `<div class="gnh-calendar-grid">${header}${rows}</div>`;
}

function clearPreview() {
    document.querySelectorAll('.gnh-calendar-cell-free, .gnh-calendar-cell-conflict').forEach(cell => {
        cell.classList.remove('gnh-calendar-cell-free', 'gnh-calendar-cell-conflict');
    });
}

function previewSelection(key) {
    clearPreview();
    const selection = findSelection(key);
    if (!selection || state.selectedClasses.has(key)) return;
    const occupied = occupiedCells();
    for (const horario of selection.horarios) {
        const parsed = parseHorario(horario.horario);
        if (!parsed) continue;
        const cellKey = `${parsed.day}-${parsed.period}-${parsed.slot}`;
        const className = occupied.has(cellKey) ? 'gnh-calendar-cell-conflict' : 'gnh-calendar-cell-free';
        document.querySelectorAll(`[data-calendar-cell="${cellKey}"]`).forEach(cell => cell.classList.add(className));
    }
}

function renderCalendar() {
    const grid = $('#calendar-grid');
    const miniGrid = $('#mini-calendar-grid');
    const note = $('#calendar-note');
    const validation = $('#calendar-validation');
    const usage = $('#calendar-usage');
    const limit = $('#calendar-limit');
    const clearButton = $('#clear-calendar');
    if (!grid || !miniGrid || !note || !validation || !usage || !limit || !clearButton) return;

    clearButton.disabled = state.selectedClasses.size === 0;
    limit.value = state.maxLessons;

    const cells = new Map();
    const withoutSchedule = [];
    for (const selection of state.selectedClasses.values()) {
        let placed = false;
        const selectionCells = new Set();
        for (const horario of selection.horarios) {
            const parsed = parseHorario(horario.horario);
            if (!parsed) continue;
            placed = true;
            const cellKey = `${parsed.day}-${parsed.period}-${parsed.slot}`;
            if (selectionCells.has(cellKey)) continue;
            selectionCells.add(cellKey);
            if (!cells.has(cellKey)) cells.set(cellKey, []);
            cells.get(cellKey).push({ selection, horario });
        }
        if (!placed) withoutSchedule.push(selection);
    }

    note.textContent = state.selectedClasses.size
        ? `${state.selectedClasses.size} turma(s) selecionada(s). Horários oficiais; seleção salva neste navegador.`
        : 'Selecione uma ou mais turmas na lista de disciplinas para montar sua semana.';
    usage.textContent = `Aulas usadas: ${selectedLessons()} / ${state.maxLessons}`;
    usage.classList.toggle('over-limit', selectedLessons() > state.maxLessons);
    validation.textContent = state.calendarMessage.text || (selectedLessons() > state.maxLessons ? `O limite de ${state.maxLessons} aulas/semana foi ultrapassado.` : '');
    validation.className = `gnh-calendar-validation${state.calendarMessage.type ? ` ${state.calendarMessage.type}` : selectedLessons() > state.maxLessons ? ' warning' : ''}`;
    grid.innerHTML = `<div class="gnh-calendar-scroll">${calendarGridMarkup(cells)}</div>${withoutSchedule.length ? `<p class="gnh-calendar-unplaced"><strong>Sem horário publicado:</strong> ${withoutSchedule.map(selection => `${escapeHtml(selection.disciplineCode)} · T${escapeHtml(selection.turmaCode)}`).join(', ')}</p>` : ''}`;
    miniGrid.innerHTML = calendarGridMarkup(cells, true);
    clearPreview();
}

function historyMarkup() {
    if (!state.entry?.versions?.length) return '<p class="gnh-muted">Nenhuma versão capturada ainda.</p>';
    return state.entry.versions.slice().reverse().map((version, index) => `<button type="button" class="gnh-history-item ${version.versionId === state.versionId ? 'active' : ''}" data-version-id="${escapeHtml(version.versionId)}">
        <strong>${index === 0 ? 'Versão atual' : 'Versão anterior'} · ${escapeHtml(formatDate(version.capturedAt))}</strong>
        <span>${version.changeCount ? `${version.changeCount} alteração(ões)` : 'Primeira captura'}${version.sourceLastUpdatedAt ? ` · fonte: ${escapeHtml(cleanSourceUpdate(version.sourceLastUpdatedAt))}` : ''}</span>
    </button>`).join('');
}

function comparisonText(values) {
    const list = [...new Set((values || []).map(value => String(value || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    return list.length ? list.join('; ') : 'Não informado';
}

function turmaComparisonValues(turma) {
    const horarios = (turma?.horarios || []).map(item => [item.horario, item.sede].filter(Boolean).join(' · '));
    const salas = (turma?.horarios || []).map(item => item.sala ? `${item.horario || 'Horário'}: ${item.sala}` : 'Sala não informada');
    return {
        'Horários': comparisonText(horarios),
        'Salas': comparisonText(salas),
        'Professores': comparisonText(turma?.professores),
    };
}

function changeDetailMarkup(label, before, after) {
    if (before === after) return '';
    return `<li><strong>${escapeHtml(label)}:</strong> <span>De:</span> ${escapeHtml(before)} <span class="gnh-change-arrow">→</span> <span>Para:</span> ${escapeHtml(after)}</li>`;
}

function disciplineChangeMarkup(change, previousDiscipline, currentDiscipline) {
    const changeType = !previousDiscipline ? 'added' : !currentDiscipline ? 'removed' : 'changed';
    const turmasBefore = new Map((previousDiscipline?.turmas || []).map(turma => [String(turma.codigo), turma]));
    const turmasAfter = new Map((currentDiscipline?.turmas || []).map(turma => [String(turma.codigo), turma]));
    const turmaCodes = [...new Set([...turmasBefore.keys(), ...turmasAfter.keys()])].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    const turmaChanges = [];
    for (const code of turmaCodes) {
        const beforeTurma = turmasBefore.get(code);
        const afterTurma = turmasAfter.get(code);
        const beforeValues = turmaComparisonValues(beforeTurma);
        const afterValues = turmaComparisonValues(afterTurma);
        const details = Object.keys(beforeValues).map(key => changeDetailMarkup(key, beforeTurma ? beforeValues[key] : '—', afterTurma ? afterValues[key] : '—')).join('');
        if (details) turmaChanges.push(`<li><strong>Turma ${escapeHtml(code)}:</strong><ul class="gnh-change-details">${details}</ul></li>`);
    }
    if (!turmaChanges.length && changeType === 'changed') return '';
    const name = currentDiscipline?.nome || previousDiscipline?.nome || change.nome || '';
    const transition = changeType === 'added' ? 'disciplina adicionada' : changeType === 'removed' ? 'disciplina removida' : 'turmas atualizadas';
    const details = turmaChanges.length ? `<ul class="gnh-change-details gnh-change-turmas">${turmaChanges.join('')}</ul>` : '';
    return `<li class="gnh-change-${changeType}"><strong>${escapeHtml(change.codigo)}</strong> — ${escapeHtml(name)}: ${transition}${details}</li>`;
}

function changeLogMarkup(snapshot, previousSnapshot) {
    if (!snapshot.previousVersionId && !previousSnapshot) return '<p class="gnh-muted">Esta é a primeira captura; ainda não há comparação anterior.</p>';
    if (!previousSnapshot) return '<p class="gnh-muted">Não foi possível carregar a versão anterior para comparar turmas e horários.</p>';
    const previous = new Map((previousSnapshot.payload?.disciplinas || []).map(discipline => [String(discipline.codigo), discipline]));
    const current = new Map((snapshot.payload?.disciplinas || []).map(discipline => [String(discipline.codigo), discipline]));
    const codes = [...new Set([...previous.keys(), ...current.keys()])].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    const changes = codes.map(code => {
        const before = previous.get(code);
        const after = current.get(code);
        if (before && after) {
            const normalizeTurmas = list => list.map(turma => [turma.codigo, turmaComparisonValues(turma)])
                .sort((a, b) => String(a[0]).localeCompare(String(b[0]), 'pt-BR'));
            const oldTurmas = JSON.stringify(normalizeTurmas(before.turmas || []));
            const newTurmas = JSON.stringify(normalizeTurmas(after.turmas || []));
            if (oldTurmas === newTurmas) return '';
        }
        return disciplineChangeMarkup({ codigo: code, nome: after?.nome || before?.nome }, before, after);
    }).filter(Boolean);
    return changes.length
        ? `<h3>Alterações nesta versão</h3><p class="gnh-muted">Comparação detalhada de turmas, horários, salas e professores em relação à captura anterior.</p><ul class="gnh-change-list">${changes.join('')}</ul>`
        : '<p class="gnh-muted">Nenhuma alteração em turmas, horários, salas ou professores em relação à versão anterior.</p>';
}

async function renderChangeLog() {
    const snapshot = state.snapshot;
    const requestId = ++state.changeLogRequestId;
    const currentVersion = state.entry?.versions?.find(version => version.versionId === state.versionId);
    const previousVersionId = snapshot?.previousVersionId || currentVersion?.previousVersionId;
    if (!snapshot || !previousVersionId) {
        $('#change-log').innerHTML = snapshot ? changeLogMarkup(snapshot, null) : '';
        return;
    }
    const previousVersion = state.entry?.versions?.find(version => version.versionId === previousVersionId);
    if (!previousVersion?.snapshotPath) {
        $('#change-log').innerHTML = '<p class="gnh-muted">Não foi possível localizar a captura anterior.</p>';
        return;
    }
    try {
        let previousSnapshot = state.snapshotCache.get(previousVersion.snapshotPath);
        if (!previousSnapshot) {
            previousSnapshot = await fetch(`../${previousVersion.snapshotPath}`).then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            });
            state.snapshotCache.set(previousVersion.snapshotPath, previousSnapshot);
        }
        if (requestId !== state.changeLogRequestId || snapshot !== state.snapshot) return;
        $('#change-log').innerHTML = changeLogMarkup(snapshot, previousSnapshot);
    } catch {
        if (requestId === state.changeLogRequestId) $('#change-log').innerHTML = changeLogMarkup(snapshot, null);
    }
}

function latestEntryVersion(entry) {
    return entry?.versions?.find(version => version.versionId === entry.latestVersionId) || entry?.versions?.at(-1) || null;
}

async function loadCampusSnapshots(campusId) {
    if (state.campusSnapshotCache.has(campusId)) return state.campusSnapshotCache.get(campusId);
    const snapshots = (await Promise.all(campusEntries(campusId).map(async entry => {
        const version = latestEntryVersion(entry);
        if (!version) return null;
        try {
            const snapshot = await fetch(`../${version.snapshotPath}`).then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            });
            return { entry, snapshot };
        } catch {
            return null;
        }
    }))).filter(Boolean);
    state.campusSnapshotCache.set(campusId, snapshots);
    return snapshots;
}

async function loadEquivalenceGroups() {
    if (state.equivalenceGroups) return state.equivalenceGroups;
    const modules = await Promise.all(matrixOptions.map(matrix => import(matrix.dataUrl)));
    const groups = [];
    const seen = new Set();
    for (const data of modules) {
        const nodes = [...(data.allNodesData || []), ...(data.allHumanitiesData || []), ...(data.allOptionalNodesData || [])];
        for (const node of nodes) {
            const codes = [...new Set(equivalenceNodeCodes(node).map(normalizeFilter).filter(Boolean))];
            if (!codes.length) continue;
            const key = codes.slice().sort().join('|');
            if (seen.has(key)) continue;
            seen.add(key);
            groups.push({ codes, names: [normalizeFilter(node.name)].filter(Boolean) });
        }
    }
    state.equivalenceGroups = groups;
    return groups;
}

function equivalenceSearchSets(filters, groups) {
    const codeFilter = normalizeFilter(filters.code);
    const nameFilter = normalizeFilter(filters.name);
    const codes = new Set();
    const names = new Set();
    for (const group of groups) {
        const codeMatch = codeFilter && group.codes.some(code => code.includes(codeFilter));
        const nameMatch = nameFilter && group.names.some(name => name.includes(nameFilter));
        if (!codeMatch && !nameMatch) continue;
        group.codes.forEach(code => codes.add(code));
        group.names.forEach(name => names.add(name));
    }
    return { equivalenceCodes: codes, equivalenceNames: names };
}

function renderCurrentDisciplineResults(disciplines) {
    state.displayedSelections.clear();
    const markup = disciplines.map(disciplineMarkup).join('');
    $('#disciplines-list').innerHTML = !disciplines.length
        ? '<p class="gnh-muted">A captura oficial não encontrou turmas abertas para este curso.</p>'
        : markup || '<p class="gnh-muted">Nenhuma disciplina corresponde aos filtros.</p>';
    const hasFilters = Object.values(state.filters).some(Boolean);
    $('#discipline-count').textContent = hasFilters ? `${document.querySelectorAll('#disciplines-list .gnh-discipline').length} disciplina(s) encontradas` : `${disciplines.length} disciplinas na captura`;
}

async function renderCrossCampusResults() {
    const requestId = ++state.crossCampusRequestId;
    const subjectFilter = normalizeFilter(state.filters.code) || normalizeFilter(state.filters.name);
    state.displayedSelections.clear();
    $('#discipline-scope-note').hidden = false;
    if (!subjectFilter) {
        $('#disciplines-list').innerHTML = '<p class="gnh-muted">Digite um código ou nome de matéria para pesquisar em todos os cursos do câmpus.</p>';
        $('#discipline-count').textContent = 'Aguardando código ou nome da matéria';
        return;
    }
    $('#disciplines-list').innerHTML = '<p class="gnh-muted">Buscando nos cursos do câmpus…</p>';
    $('#discipline-count').textContent = 'Buscando…';
    try {
        const [courseSnapshots, groups] = await Promise.all([
            loadCampusSnapshots(currentCampus()?.id || ''),
            loadEquivalenceGroups(),
        ]);
        if (requestId !== state.crossCampusRequestId || !state.searchAllCampus) return;
        const equivalences = equivalenceSearchSets(state.filters, groups);
        const contextBase = {
            crossCampus: true,
            filters: state.filters,
            equivalenceCodes: equivalences.equivalenceCodes,
            equivalenceNames: equivalences.equivalenceNames,
            campusName: currentCampus()?.name || '',
        };
        state.displayedSelections.clear();
        const scheduleFilter = normalizeFilter(state.filters.schedule);
        const groupedDisciplines = new Map();
        courseSnapshots
            .sort((a, b) => String(a.entry.courseName || a.entry.sourceName || '').localeCompare(String(b.entry.courseName || b.entry.sourceName || ''), 'pt-BR'))
            .forEach(({ entry, snapshot }) => {
                const courseName = entry.courseName || entry.sourceName || entry.courseId;
                for (const disciplina of snapshot.payload.disciplinas || []) {
                    if (!disciplineMatchesFilters(disciplina, contextBase)) continue;
                    const turmas = (disciplina.turmas || []).filter(turma => turmaMatchesScheduleFilter(turma, scheduleFilter));
                    if (!turmas.length) continue;
                    const disciplineKey = `${normalizeFilter(disciplina.codigo)}|${normalizeFilter(disciplina.nome)}`;
                    let group = groupedDisciplines.get(disciplineKey);
                    if (!group) {
                        group = { disciplina, entry, offers: new Map() };
                        groupedDisciplines.set(disciplineKey, group);
                    }
                    for (const turma of turmas) {
                        const offerKey = crossCampusOfferKey(disciplina, turma);
                        let offer = group.offers.get(offerKey);
                        if (!offer) {
                            offer = { turma, entry, courseNames: new Set() };
                            group.offers.set(offerKey, offer);
                        }
                        offer.courseNames.add(courseName);
                    }
                }
            });
        const disciplineGroups = [...groupedDisciplines.values()];
        const markup = disciplineGroups.map(group => {
            const offers = [...group.offers.values()].map(offer => ({
                ...offer,
                courseNames: [...offer.courseNames].sort((a, b) => a.localeCompare(b, 'pt-BR')),
                selection: [...state.selectedClasses.values()].find(selection => selection.semester === state.catalog.semester
                    && selection.campusId === group.entry.campusId
                    && crossCampusOfferKey(selection, selection) === crossCampusOfferKey(group.disciplina, offer.turma)),
            }));
            return disciplineMarkup(group.disciplina, {
                ...contextBase,
                entry: group.entry,
                offers,
            });
        }).join('');
        $('#disciplines-list').innerHTML = markup || '<p class="gnh-muted">Nenhuma matéria ou equivalente foi encontrada nos cursos deste câmpus.</p>';
        const uniqueClasses = disciplineGroups.reduce((total, group) => total + group.offers.size, 0);
        $('#discipline-count').textContent = `${disciplineGroups.length} matéria(s) · ${uniqueClasses} turma(s) únicas em todos os cursos do câmpus`;
    } catch (error) {
        if (requestId !== state.crossCampusRequestId) return;
        $('#disciplines-list').innerHTML = `<p class="gnh-muted">Não foi possível pesquisar os outros cursos: ${escapeHtml(error.message)}</p>`;
        $('#discipline-count').textContent = 'Falha na pesquisa entre cursos';
    }
}

function renderSnapshot() {
    if (!state.snapshot) return renderEmpty();
    $('#empty-state').hidden = true;
    $('#grade-content').hidden = false;
    $('#auto-grade').disabled = false;
    renderStats(state.snapshot);
    const disciplines = state.snapshot.payload.disciplinas;
    $('#discipline-scope-note').hidden = !state.searchAllCampus;
    if (state.searchAllCampus) renderCrossCampusResults();
    else renderCurrentDisciplineResults(disciplines);
    $('#history-list').innerHTML = historyMarkup();
    renderChangeLog();
    renderCalendar();
    showStatus('Dados carregados');
}

async function loadData() {
    [state.catalog, state.manifest] = await Promise.all([
        fetch(catalogUrl).then(response => response.json()),
        fetch(manifestUrl).then(response => response.json()),
    ]);
    state.entry = null;
    state.snapshot = null;
    state.filters = { code: '', name: '', schedule: '' };
    state.searchAllCampus = false;
    state.crossCampusRequestId++;
    state.displayedSelections.clear();
    state.selectedClasses.clear();
    loadPersistedCalendar();
    $('#discipline-code').value = '';
    $('#discipline-search').value = '';
    $('#discipline-schedule').value = '';
    $('#discipline-campus-scope').checked = false;
    updateSourceNote();
    populateCampuses();
    populateCourses();
    showStatus('Dados carregados');
}

/* Keep startup errors in the page instead of failing silently. */
async function start() {
    try {
        await loadData();
    } catch (error) {
        showStatus(`Não foi possível carregar os dados: ${error.message}`, true);
        $('#empty-state').hidden = false;
        $('#empty-state').querySelector('h2').textContent = 'Dados indisponíveis';
    }
}

$('#campus-select').addEventListener('change', populateCourses);
$('#course-select').addEventListener('change', updateEntry);
$('#version-select').addEventListener('change', () => {
    state.versionId = $('#version-select').value;
    loadSelectedSnapshot();
});
$('#discipline-code').addEventListener('input', event => { state.filters.code = event.target.value; renderSnapshot(); });
$('#discipline-search').addEventListener('input', event => { state.filters.name = event.target.value; renderSnapshot(); });
$('#discipline-schedule').addEventListener('input', event => { state.filters.schedule = event.target.value; renderSnapshot(); });
$('#discipline-campus-scope').addEventListener('change', event => {
    state.searchAllCampus = event.target.checked;
    renderSnapshot();
});
function updateClassSelectionUI() {
    document.querySelectorAll('#disciplines-list .gnh-class[data-class-key]').forEach(card => {
        const selected = state.selectedClasses.has(card.dataset.classKey);
        card.classList.toggle('gnh-class-selected', selected);
        card.setAttribute('aria-pressed', String(selected));
        const action = card.querySelector('.gnh-class-action');
        if (action) action.textContent = selected ? 'No calendário' : 'Adicionar ao calendário';
    });
}

function toggleCalendarSelection(key) {
    if (state.selectedClasses.has(key)) {
        state.selectedClasses.delete(key);
        setCalendarMessage(selectedLessons() > state.maxLessons ? `O limite de ${state.maxLessons} aulas/semana foi ultrapassado.` : '', selectedLessons() > state.maxLessons ? 'warning' : '');
    } else {
        const selection = findSelection(key);
        const conflict = selection && findConflict(selection);
        if (!selection) {
            setCalendarMessage('Não foi possível localizar os horários desta turma.', 'error');
            renderCalendar();
            return;
        }
        if (conflict) {
            setCalendarMessage(`Conflito de horário: ${selection.disciplineCode}-${selection.turmaCode} coincide com ${conflict.selection.disciplineCode}-${conflict.selection.turmaCode} em ${conflict.horario.horario}.`, 'error');
            renderCalendar();
            return;
        }
        state.selectedClasses.set(selection.key, selection);
        setCalendarMessage(selectedLessons() > state.maxLessons ? `O limite de ${state.maxLessons} aulas/semana foi ultrapassado.` : '', selectedLessons() > state.maxLessons ? 'warning' : '');
    }
    persistCalendar();
    renderCalendar();
    updateClassSelectionUI();
}

$('#disciplines-list').addEventListener('click', event => {
    const card = event.target.closest('.gnh-class[data-class-key]');
    if (card) toggleCalendarSelection(card.dataset.classKey);
});
$('#disciplines-list').addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('.gnh-class[data-class-key]');
    if (!card) return;
    event.preventDefault();
    toggleCalendarSelection(card.dataset.classKey);
});
$('#disciplines-list').addEventListener('mouseover', event => {
    const card = event.target.closest('.gnh-class');
    if (!card || (event.relatedTarget && card.contains(event.relatedTarget))) return;
    previewSelection(card.dataset.classKey);
});
$('#disciplines-list').addEventListener('mouseout', event => {
    const card = event.target.closest('.gnh-class');
    if (!card || (event.relatedTarget && card.contains(event.relatedTarget))) return;
    clearPreview();
});
$('#calendar-limit').addEventListener('input', event => {
    const value = Number(event.target.value);
    if (!Number.isFinite(value) || value < 1) return;
    state.maxLessons = Math.min(Math.round(value), 200);
    setCalendarMessage(selectedLessons() > state.maxLessons ? `O limite de ${state.maxLessons} aulas/semana foi ultrapassado.` : '', selectedLessons() > state.maxLessons ? 'warning' : '');
    persistCalendar();
    renderCalendar();
});
function removeCalendarSelection(key) {
    if (!state.selectedClasses.delete(key)) return;
    setCalendarMessage();
    persistCalendar();
    renderSnapshot();
}

$('#mini-calendar-grid').addEventListener('click', event => {
    const calendarEvent = event.target.closest('.gnh-calendar-event-clickable');
    if (calendarEvent) removeCalendarSelection(calendarEvent.dataset.classKey);
});
$('#mini-calendar-grid').addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const calendarEvent = event.target.closest('.gnh-calendar-event-clickable');
    if (!calendarEvent) return;
    event.preventDefault();
    removeCalendarSelection(calendarEvent.dataset.classKey);
});
$('#clear-calendar').addEventListener('click', () => {
    state.selectedClasses.clear();
    setCalendarMessage();
    persistCalendar();
    renderSnapshot();
});

function populateMatrixOptions() {
    const select = $('#auto-grade-matrix');
    select.innerHTML = matrixOptions.map(matrix => `<option value="${escapeHtml(matrix.id)}">${escapeHtml(matrix.label)}</option>`).join('');
    select.value = matrixOptions.some(matrix => matrix.id === 'm2') ? 'm2' : matrixOptions[0]?.id || '';
}

function automaticGradeGridIds() {
    const isCuritiba = currentCampus()?.id === 'curitiba';
    if (!isCuritiba) return [{ id: '__campus__', label: currentCampus()?.name || 'Câmpus atual' }];
    const sedes = new Set();
    for (const disciplina of state.snapshot?.payload?.disciplinas || []) {
        for (const turma of disciplina.turmas || []) {
            for (const horario of turma.horarios || []) if (horario.sede) sedes.add(String(horario.sede));
        }
    }
    if (!sedes.size) ['Centro', 'Ecoville', 'Neoville'].forEach(sede => sedes.add(sede));
    return [...sedes].sort((a, b) => a.localeCompare(b, 'pt-BR')).map(sede => ({ id: sede, label: `Sede ${sede}` }));
}

function automaticGradeGridMarkup(grid) {
    const header = `<div class="gnh-auto-grade-grid-heading">Horário</div>${weekdays.map(day => `<div class="gnh-auto-grade-grid-heading" title="${escapeHtml(day.name)}">${escapeHtml(day.short)}</div>`).join('')}`;
    const rows = scheduleRows.map(row => {
        const [start, end] = scheduleTimes[row.code] || ['—', '—'];
        const timeCell = `<div class="gnh-auto-grade-grid-time"><strong>${row.code}</strong><span>${start}–${end}</span></div>`;
        const slots = weekdays.map(day => {
            const slotKey = `${day.id}-${row.period}-${row.slot}`;
            const label = `${day.name}, ${row.code}, das ${start} às ${end}`;
            return `<button type="button" class="gnh-auto-grade-slot" data-auto-grade-slot="${escapeHtml(grid.id)}|${slotKey}" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}" aria-pressed="false"></button>`;
        }).join('');
        return timeCell + slots;
    }).join('');
    return `<section class="gnh-auto-grade-availability" data-auto-grade-grid="${escapeHtml(grid.id)}"><h3>${escapeHtml(grid.label)}</h3><div class="gnh-auto-grade-availability-grid">${header}${rows}</div></section>`;
}

function renderAutomaticGradeGrids() {
    $('#auto-grade-availability-grids').innerHTML = automaticGradeGridIds().map(automaticGradeGridMarkup).join('');
}

function trackWasStarted(profile, nodeIds) {
    return nodeIds.some(nodeId => {
        const stateValue = profile.subjectStates[String(nodeId)];
        return isCompletedMatrixState(stateValue) || String(stateValue || '').endsWith('-inprogress') || stateValue === 'inprogress';
    });
}

async function renderAutomaticGradeTracks() {
    const section = $('#auto-grade-tracks');
    const options = $('#auto-grade-track-options');
    const requestId = ++state.autoGradeTrackRequestId;
    const matrix = matrixOptions.find(item => item.id === $('#auto-grade-matrix').value);
    section.hidden = true;
    options.innerHTML = '';
    if (!matrix) return;

    try {
        const profile = await getMatrixProfile(matrix);
        if (requestId !== state.autoGradeTrackRequestId) return;
        state.autoGradeProfile = profile;
        const nodesById = new Map(profile.allNodes.map(node => [String(node.id), node]));
        const tracks = Object.entries(profile.tracksConfig || {}).map(([name, nodeIds]) => {
            const ids = Array.isArray(nodeIds) ? nodeIds.map(String) : [];
            const availableNodes = ids
                .map(nodeId => nodesById.get(nodeId))
                .filter(node => node && isAvailableMatrixState(profile.subjectStates[node.id]))
                .filter(node => {
                    const disciplina = disciplineForNode(node);
                    return disciplina && Array.isArray(disciplina.turmas) && disciplina.turmas.length > 0;
                });
            return { name, ids, availableNodes, started: trackWasStarted(profile, ids) };
        }).filter(track => track.availableNodes.length);

        if (tracks.length) {
            section.hidden = false;
            options.innerHTML = tracks.map(track => `<label class="gnh-auto-grade-track-option">
                <input type="checkbox" data-auto-grade-track="${escapeHtml(track.name)}" value="${escapeHtml(track.name)}" ${track.started ? 'checked' : ''}>
                <span><strong>${escapeHtml(track.name)}</strong><small>${track.availableNodes.length} matéria(s) disponível(eis) nesta captura</small></span>
            </label>`).join('');
        }
        renderAutomaticGradeManualSubjects(matrix, profile);
    } catch {
        if (requestId === state.autoGradeTrackRequestId) options.innerHTML = '';
    }
}

function automaticGradeMode() {
    return document.querySelector('[name="auto-grade-priority-mode"]:checked')?.value || 'history';
}

function automaticGradeSubjectCandidates(profile, selectedTracks) {
    const priorityItems = analyzePriority({ ...profile, selectedTracks });
    const humanitiesProgress = humanitiesQuotaProgress({
        humanitiesNodes: profile.humanitiesNodes,
        subjectStates: profile.subjectStates,
        requiredHours: profile.requiredHumanitiesHours,
        groupsConfig: profile.groupsConfig,
    });
    const candidates = [
        ...priorityItems.map((item, index) => ({ node: item.node, kind: 'priority', score: item.score, baseOrder: index })),
        ...availableHumanities(profile)
            .filter(node => humanitiesProgress.quotaNodeIds.has(String(node.id)))
            .map((node, index) => ({ node, kind: 'humanities', score: 0, baseOrder: index })),
    ];
    const byDiscipline = new Map();
    for (const candidate of candidates) {
        const discipline = disciplineForNode(candidate.node);
        if (!discipline || !Array.isArray(discipline.turmas) || !discipline.turmas.length) continue;
        const code = String(discipline.codigo);
        if (!byDiscipline.has(code)) byDiscipline.set(code, { ...candidate, discipline, id: String(candidate.node.id) });
    }
    return [...byDiscipline.values()];
}

function renderAutomaticGradeManualSubjects(matrix, profile = null) {
    const section = $('#auto-grade-manual-subjects');
    const options = $('#auto-grade-manual-options');
    if (automaticGradeMode() !== 'manual') {
        section.hidden = true;
        return;
    }
    section.hidden = false;
    if (!profile) {
        if (state.autoGradeProfile && state.autoGradeProfile.matrix?.id === matrix.id) {
            renderAutomaticGradeManualSubjects(matrix, state.autoGradeProfile);
            return;
        }
        getMatrixProfile(matrix).then(loaded => renderAutomaticGradeManualSubjects(matrix, loaded)).catch(() => {
            options.innerHTML = '<p class="gnh-muted">Não foi possível carregar as matérias desta matriz.</p>';
        });
        return;
    }

    const candidates = automaticGradeSubjectCandidates(profile, readAutomaticGradeTracks());
    const candidateIds = new Set(candidates.map(candidate => candidate.id));
    state.manualSubjectCandidates = candidates;
    state.manualSubjectOrder = state.manualSubjectOrder.filter(id => candidateIds.has(id));
    const selectedPosition = new Map(state.manualSubjectOrder.map((id, index) => [id, index]));
    const ordered = [...candidates].sort((a, b) => {
        const aPosition = selectedPosition.get(a.id);
        const bPosition = selectedPosition.get(b.id);
        if (aPosition !== undefined || bPosition !== undefined) {
            if (aPosition === undefined) return 1;
            if (bPosition === undefined) return -1;
            return aPosition - bPosition;
        }
        return a.kind === b.kind ? a.baseOrder - b.baseOrder : a.kind === 'priority' ? -1 : 1;
    });
    options.innerHTML = ordered.length ? ordered.map(candidate => {
        const selectedIndex = selectedPosition.get(candidate.id);
        const selected = selectedIndex !== undefined;
        const label = candidate.node.name || candidate.node.nome || candidate.node.title || candidate.discipline.nome;
        const category = candidate.kind === 'humanities' ? 'Humanidades' : `Prioritária${candidate.score ? ` · peso ${candidate.score}` : ''}`;
        return `<div class="gnh-auto-grade-manual-option${selected ? ' is-selected' : ''}" data-manual-subject-row="${escapeHtml(candidate.id)}">
            <label><input type="checkbox" data-manual-subject="${escapeHtml(candidate.id)}" ${selected ? 'checked' : ''}>
                <span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(candidate.discipline.codigo)} · ${escapeHtml(category)} · ${(candidate.discipline.turmas || []).length} turma(s)</small></span>
            </label>
            <span class="gnh-auto-grade-manual-order">${selected ? `#${selectedIndex + 1}` : ''}</span>
            <span class="gnh-auto-grade-manual-move">
                <button type="button" data-manual-subject-move="up" data-manual-subject-id="${escapeHtml(candidate.id)}" aria-label="Aumentar prioridade de ${escapeHtml(label)}" ${!selected || selectedIndex === 0 ? 'disabled' : ''}>↑</button>
                <button type="button" data-manual-subject-move="down" data-manual-subject-id="${escapeHtml(candidate.id)}" aria-label="Reduzir prioridade de ${escapeHtml(label)}" ${!selected || selectedIndex === state.manualSubjectOrder.length - 1 ? 'disabled' : ''}>↓</button>
            </span>
        </div>`;
    }).join('') : '<p class="gnh-muted">Não há matérias disponíveis desta matriz na captura atual. Confira o curso selecionado e as trilhas.</p>';
}

function readAutomaticGradeFilters() {
    const campusId = currentCampus()?.id || '';
    const grids = automaticGradeGridIds();
    const avoidedSlots = new Set([...document.querySelectorAll('[data-auto-grade-slot][aria-pressed="true"]')].map(button => button.dataset.autoGradeSlot));
    return { campusId, singleGridId: grids[0]?.id || '__campus__', avoidedSlots };
}

function readAutomaticGradeTracks() {
    if ($('#auto-grade-tracks').hidden) return null;
    return [...document.querySelectorAll('[data-auto-grade-track]:checked')].map(input => input.value);
}

function resetAutomaticGradeResults() {
    state.autoGradeSearchId++;
    $('#auto-grade-submit').disabled = false;
    state.automaticGradeResults = [];
    state.automaticGradeResultsVisible = 0;
    $('#auto-grade-results').hidden = true;
    $('#auto-grade-result-options').innerHTML = '';
    if ($('#auto-grade-submit').disabled) {
        $('#auto-grade-status').textContent = '';
        $('#auto-grade-status').className = 'gnh-calendar-validation';
    }
}

function closeAutomaticGradeModal() {
    $('#auto-grade-modal').hidden = true;
    $('#auto-grade-status').textContent = '';
    $('#auto-grade-status').className = 'gnh-calendar-validation';
    resetAutomaticGradeResults();
}

$('#auto-grade').addEventListener('click', () => {
    if (!state.snapshot) return;
    populateMatrixOptions();
    state.manualSubjectOrder = [];
    state.autoGradeProfile = null;
    resetAutomaticGradeResults();
    renderAutomaticGradeGrids();
    $('#auto-grade-modal').hidden = false;
    renderAutomaticGradeTracks();
    $('#auto-grade-matrix').focus();
});
$('#auto-grade-matrix').addEventListener('change', () => {
    state.manualSubjectOrder = [];
    state.autoGradeProfile = null;
    resetAutomaticGradeResults();
    renderAutomaticGradeTracks();
});
document.querySelectorAll('[name="auto-grade-priority-mode"]').forEach(input => input.addEventListener('change', () => {
    resetAutomaticGradeResults();
    $('#auto-grade-status').textContent = '';
    renderAutomaticGradeManualSubjects(matrixOptions.find(item => item.id === $('#auto-grade-matrix').value), state.autoGradeProfile);
}));
$('#auto-grade-track-options').addEventListener('change', () => {
    resetAutomaticGradeResults();
    renderAutomaticGradeManualSubjects(matrixOptions.find(item => item.id === $('#auto-grade-matrix').value), state.autoGradeProfile);
});
$('#auto-grade-manual-options').addEventListener('change', event => {
    const checkbox = event.target.closest('[data-manual-subject]');
    if (!checkbox) return;
    const id = checkbox.dataset.manualSubject;
    state.manualSubjectOrder = checkbox.checked
        ? [...state.manualSubjectOrder, id]
        : state.manualSubjectOrder.filter(item => item !== id);
    resetAutomaticGradeResults();
    renderAutomaticGradeManualSubjects(matrixOptions.find(item => item.id === $('#auto-grade-matrix').value), state.autoGradeProfile);
});
$('#auto-grade-manual-options').addEventListener('click', event => {
    const button = event.target.closest('[data-manual-subject-move]');
    if (!button) return;
    const index = state.manualSubjectOrder.indexOf(button.dataset.manualSubjectId);
    const next = index + (button.dataset.manualSubjectMove === 'up' ? -1 : 1);
    if (index < 0 || next < 0 || next >= state.manualSubjectOrder.length) return;
    [state.manualSubjectOrder[index], state.manualSubjectOrder[next]] = [state.manualSubjectOrder[next], state.manualSubjectOrder[index]];
    resetAutomaticGradeResults();
    renderAutomaticGradeManualSubjects(matrixOptions.find(item => item.id === $('#auto-grade-matrix').value), state.autoGradeProfile);
});
$('#auto-grade-availability-grids').addEventListener('click', event => {
    const slot = event.target.closest('[data-auto-grade-slot]');
    if (!slot) return;
    const selected = slot.getAttribute('aria-pressed') === 'true';
    slot.setAttribute('aria-pressed', String(!selected));
    resetAutomaticGradeResults();
});
$('#auto-grade-close').addEventListener('click', closeAutomaticGradeModal);
$('#auto-grade-cancel').addEventListener('click', closeAutomaticGradeModal);
$('#auto-grade-form').addEventListener('submit', async event => {
    event.preventDefault();
    const matrix = matrixOptions.find(item => item.id === $('#auto-grade-matrix').value);
    const submit = $('#auto-grade-submit');
    const status = $('#auto-grade-status');
    if (!matrix) return;
    resetAutomaticGradeResults();
    const searchId = state.autoGradeSearchId;
    submit.disabled = true;
    status.className = 'gnh-calendar-validation';
    status.textContent = 'Preparando a busca por grades máximas viáveis…';
    try {
        const filters = readAutomaticGradeFilters();
        const mode = automaticGradeMode();
        const generated = await buildAutomaticGrade(matrix, filters, readAutomaticGradeTracks(), mode, state.manualSubjectOrder, message => {
            status.textContent = message;
        }, () => searchId !== state.autoGradeSearchId);
        if (searchId !== state.autoGradeSearchId) return;
        state.automaticGradeResults = generated.results;
        state.automaticGradeResultsVisible = Math.min(10, generated.results.length);
        renderAutomaticGradeResults();
        status.className = 'gnh-calendar-validation success';
        status.textContent = `${generated.results.length.toLocaleString('pt-BR')} grade(s) máxima(s) viável(eis) encontradas. Escolha uma para aplicar.`;
    } catch (error) {
        if ($('#auto-grade-modal').hidden || error.message === 'Busca cancelada.') return;
        status.className = 'gnh-calendar-validation error';
        status.textContent = `Não foi possível montar a grade: ${error.message}`;
    } finally {
        if (searchId === state.autoGradeSearchId) submit.disabled = false;
    }
});
$('#auto-grade-show-more').addEventListener('click', () => {
    state.automaticGradeResultsVisible = Math.min(state.automaticGradeResultsVisible + 10, state.automaticGradeResults.length);
    renderAutomaticGradeResults();
});
$('#auto-grade-result-options').addEventListener('click', event => {
    const button = event.target.closest('[data-auto-grade-apply]');
    if (button) applyAutomaticGradeResult(Number(button.dataset.autoGradeApply));
});
$('#history-list').addEventListener('click', event => {
    const button = event.target.closest('[data-version-id]');
    if (!button) return;
    $('#version-select').value = button.dataset.versionId;
    state.versionId = button.dataset.versionId;
    loadSelectedSnapshot();
});

populateMatrixOptions();
start();
