/* Loaded before theme/application scripts; legacy keys remain readable. */
(() => {
    const memory = new Map();
    let warned = false;

    function warn() {
        if (warned) return;
        warned = true;
        const show = () => {
            const notice = document.createElement('p');
            notice.setAttribute('role', 'alert');
            notice.className = 'storage-notice';
            notice.textContent = 'Não foi possível salvar neste navegador. As alterações desta sessão podem ser perdidas ao fechar a página. Verifique as permissões e o espaço de armazenamento.';
            document.body.prepend(notice);
        };
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show, { once: true });
        else show();
    }

    function getItem(key) {
        if (memory.has(key)) return memory.get(key);
        try { return window.localStorage.getItem(key); }
        catch { warn(); return null; }
    }

    function setItem(key, value) {
        const text = String(value);
        try {
            window.localStorage.setItem(key, text);
            memory.delete(key);
            return true;
        } catch {
            memory.set(key, text);
            warn();
            return false;
        }
    }

    function removeItem(key) {
        try { window.localStorage.removeItem(key); memory.delete(key); return true; }
        catch { memory.set(key, null); warn(); return false; }
    }

    function parseObject(raw) {
        try {
            const value = JSON.parse(raw);
            return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
        } catch { return {}; }
    }

    // Keep fields and subjects unknown to this version when saving an existing record.
    function mergeProgress(previous, next) {
        const old = parseObject(previous);
        const current = parseObject(next);
        const result = { ...old, ...current };
        for (const key of ['nodesState', 'humanitiesNodesState', 'optionalNodesState']) {
            if (!Array.isArray(current[key])) continue;
            const ids = new Set(current[key].map(node => node?.id));
            const unknown = Array.isArray(old[key]) ? old[key].filter(node => node && !ids.has(node.id)) : [];
            result[key] = [...unknown, ...current[key]];
        }
        return JSON.stringify(result);
    }

    function forCourse({ progressKey, legacyProgressKey, glowKey, legacyGlowKey }) {
        const resolve = key => key === legacyProgressKey ? progressKey : key === legacyGlowKey ? glowKey : key;
        const read = key => {
            const resolved = resolve(key);
            const saved = getItem(resolved);
            return saved !== null || resolved === key ? saved : getItem(key);
        };
        // The original string is backed up once, before any write or explicit reset.
        function backup(raw) {
            const key = `${progressKey}:backup-before-refactor`;
            if (raw === null) return true;
            try {
                if (window.localStorage.getItem(key) === null) window.localStorage.setItem(key, raw);
                return true;
            } catch { warn(); return false; }
        }
        return {
            getItem: read,
            setItem(key, value) {
                const resolved = resolve(key);
                if (resolved !== progressKey) return setItem(resolved, value);
                const old = read(key);
                const merged = mergeProgress(old, value);
                if (!backup(old)) { memory.set(resolved, merged); return false; }
                return setItem(resolved, merged);
            },
            removeItem(key) {
                const resolved = resolve(key);
                if (resolved !== progressKey) return removeItem(resolved);
                if (!backup(read(key))) { memory.set(resolved, '{}'); return false; }
                // An empty record prevents re-importing the legacy history after reset.
                return setItem(resolved, '{}');
            },
        };
    }

    window.KMStorage = Object.freeze({ getItem, setItem, removeItem, forCourse });
})();
