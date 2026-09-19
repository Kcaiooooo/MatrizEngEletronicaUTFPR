const objectKeys = value => Object.keys(value).sort();

export function canonicalize(value) {
    if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
    if (value && typeof value === 'object') {
        return `{${objectKeys(value).map(key => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(',')}}`;
    }
    return JSON.stringify(value);
}

export function normalizePayload(payload) {
    const disciplinas = Array.isArray(payload?.disciplinas) ? payload.disciplinas : [];
    return {
        curso: String(payload?.curso || '').trim(),
        disciplinas: disciplinas
            .filter(disciplina => disciplina && disciplina.codigo)
            .map(disciplina => ({
                ...disciplina,
                codigo: String(disciplina.codigo).trim(),
                nome: String(disciplina.nome || '').trim(),
                turmas: Array.isArray(disciplina.turmas)
                    ? [...disciplina.turmas].sort((a, b) => String(a?.codigo || '').localeCompare(String(b?.codigo || '')))
                    : [],
            }))
            .sort((a, b) => a.codigo.localeCompare(b.codigo)),
    };
}

export async function sha256(value) {
    const text = new TextEncoder().encode(typeof value === 'string' ? value : canonicalize(value));
    if (globalThis.crypto?.subtle) {
        const digest = await globalThis.crypto.subtle.digest('SHA-256', text);
        return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
    }
    throw new Error('SHA-256 não disponível neste ambiente');
}

export function disciplineMap(payload) {
    return new Map(normalizePayload(payload).disciplinas.map(disciplina => [disciplina.codigo, disciplina]));
}

function changedPaths(before, after, prefix = '') {
    if (canonicalize(before) === canonicalize(after)) return [];
    if (Array.isArray(before) && Array.isArray(after)) {
        const length = Math.max(before.length, after.length);
        return [...Array(length).keys()].flatMap(index => changedPaths(before[index], after[index], `${prefix}[${index}]`));
    }
    if (!before || !after || typeof before !== 'object' || typeof after !== 'object' || Array.isArray(before) || Array.isArray(after)) {
        return [prefix || 'valor'];
    }
    const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
    return [...keys].sort().flatMap(key => changedPaths(before[key], after[key], prefix ? `${prefix}.${key}` : key));
}

export function diffDisciplineSets(previousPayload, currentPayload) {
    const previous = disciplineMap(previousPayload);
    const current = disciplineMap(currentPayload);
    const changes = [];
    for (const codigo of [...new Set([...previous.keys(), ...current.keys()])].sort()) {
        const before = previous.get(codigo);
        const after = current.get(codigo);
        if (!before) changes.push({ type: 'added', codigo, nome: after.nome });
        else if (!after) changes.push({ type: 'removed', codigo, nome: before.nome });
        else {
            const fields = changedPaths(before, after);
            if (fields.length) changes.push({ type: 'changed', codigo, nome: after.nome, fields });
        }
    }
    return changes;
}

export function countClasses(payload) {
    return normalizePayload(payload).disciplinas.reduce((total, disciplina) => total + disciplina.turmas.length, 0);
}
