const COMPLETED_STATES = new Set([
    'completed', 'satisfied', 'subject-completed', 'subject-satisfied',
    'optional-completed', 'optional-satisfied', 'humanities-completed', 'humanities-satisfied',
]);

const AVAILABLE_STATES = new Set([
    'available', 'inprogress', 'subject-available', 'subject-inprogress',
    'optional-available', 'optional-inprogress', 'humanities-available', 'humanities-inprogress',
]);

const isCompleted = state => COMPLETED_STATES.has(state) || String(state || '').endsWith('-completed') || String(state || '').endsWith('-satisfied');
const isAvailable = state => AVAILABLE_STATES.has(state) || String(state || '').endsWith('-available') || String(state || '').endsWith('-inprogress');

function isHumanitiesOrGeneral(node) {
    if (!node) return true;
    if (node.type === 'humanities' || node.tabId === 'humanities') return true;
    const id = String(node.id || '');
    return id.startsWith('GEE7') || id === 'ELO91' || id === 'ELO92' || id === 'ELP66'
        || id.startsWith('CAART') || id.startsWith('LEM7') || id.startsWith('FCH7') || id.startsWith('ELH');
}

function stateOf(node, subjectStates) {
    return subjectStates?.[node.id] || node.state || 'subject-locked';
}

/**
 * Shared implementation of the priority score used by the matrix analyzer.
 * Keeping it independent from the DOM lets the automatic grade use the same
 * ranking without opening a matrix page in another tab.
 */
export function analyzePriority({ mainNodes = [], optionalNodes = [], subjectStates = {}, tracksConfig = {} } = {}) {
    const allNodes = [...mainNodes, ...optionalNodes].filter(node => node && node.id && !isHumanitiesOrGeneral(node));
    if (!allNodes.length) return [];

    const subjectToTracksMap = {};
    for (const [trackName, subjectIds] of Object.entries(tracksConfig || {})) {
        if (!Array.isArray(subjectIds)) continue;
        for (const id of subjectIds) {
            const normalized = String(id).trim();
            if (!subjectToTracksMap[normalized]) subjectToTracksMap[normalized] = new Set();
            subjectToTracksMap[normalized].add(trackName);
        }
    }

    const isOptionalOrTrackNode = node => {
        if (!node) return false;
        if (node.type === 'optional' || node.tabId === 'optional' || node.groupId) return true;
        const tracks = subjectToTracksMap[String(node.id).trim()];
        return Boolean(tracks?.size);
    };

    const activeTracks = new Set();
    let hasStartedAnyOptional = false;
    for (const node of allNodes) {
        const state = stateOf(node, subjectStates);
        const isTaken = isCompleted(state) || String(state || '').endsWith('-inprogress') || state === 'inprogress';
        if (!isTaken) continue;
        if (!isOptionalOrTrackNode(node)) continue;
        hasStartedAnyOptional = true;
        for (const trackName of subjectToTracksMap[String(node.id).trim()] || []) activeTracks.add(trackName);
    }

    const availableNodes = allNodes.filter(node => {
        const state = stateOf(node, subjectStates);
        if (!isAvailable(state)) return false;
        if (!isOptionalOrTrackNode(node)) return true;
        if (!hasStartedAnyOptional) return false;
        const tracks = subjectToTracksMap[String(node.id).trim()];
        return !tracks?.size || [...tracks].some(track => activeTracks.has(track));
    });

    const getDirectDependents = nodeId => allNodes.filter(node =>
        Array.isArray(node.dependencies) && node.dependencies.some(dep => String(dep) === String(nodeId))
    );

    function getAllDownstreamDependents(nodeId) {
        const visited = new Set();
        const stack = [nodeId];
        while (stack.length) {
            const current = stack.pop();
            for (const dependent of getDirectDependents(current)) {
                if (!dependent?.id || visited.has(dependent.id)) continue;
                visited.add(dependent.id);
                stack.push(dependent.id);
            }
        }
        return [...visited].map(id => allNodes.find(node => String(node.id) === String(id))).filter(Boolean);
    }

    function getMaxChainDepth(nodeId, memo = {}) {
        if (memo[nodeId] !== undefined) return memo[nodeId];
        const direct = getDirectDependents(nodeId);
        if (!direct.length) return 1;
        memo[nodeId] = 1 + Math.max(...direct.map(node => getMaxChainDepth(node.id, memo)));
        return memo[nodeId];
    }

    function getImmediatelyUnlockedSubjects(nodeId) {
        return allNodes.filter(locked => {
            if (!locked || isAvailable(stateOf(locked, subjectStates)) || isCompleted(stateOf(locked, subjectStates))) return false;
            if (!Array.isArray(locked.dependencies) || !locked.dependencies.some(dep => String(dep) === String(nodeId))) return false;
            return locked.dependencies.filter(dep => String(dep) !== String(nodeId)).every(depId => {
                if (String(depId).startsWith('Periodo:')) return true;
                const parent = allNodes.find(node => String(node.id) === String(depId));
                return parent && isCompleted(stateOf(parent, subjectStates));
            });
        });
    }

    return availableNodes.map(node => {
        const directDeps = getDirectDependents(node.id);
        const totalDownstream = getAllDownstreamDependents(node.id);
        const immediateUnlocks = getImmediatelyUnlockedSubjects(node.id);
        const chainDepth = getMaxChainDepth(node.id);
        const score = (immediateUnlocks.length * 3.5) + (directDeps.length * 2.0) + (totalDownstream.length * 1.0) + (chainDepth * 1.5);
        const priority = score >= 7 ? 'high' : score >= 3.5 ? 'medium' : 'low';
        return { node, directDeps, totalDownstream, immediateUnlocks, chainDepth, score, priority };
    }).sort((a, b) => b.score - a.score || (a.node.period || 0) - (b.node.period || 0) || String(a.node.id).localeCompare(String(b.node.id)));
}

export function availableHumanities({ humanitiesNodes = [], allNodes = [], subjectStates = {} } = {}) {
    const all = [...allNodes, ...humanitiesNodes];
    return humanitiesNodes.filter(node => {
        const state = stateOf(node, subjectStates);
        if (!isAvailable(state)) return false;
        return (node.dependencies || []).every(depId => {
            if (String(depId).startsWith('Periodo:')) return true;
            const parent = all.find(candidate => String(candidate.id) === String(depId));
            return parent && isCompleted(stateOf(parent, subjectStates));
        });
    }).sort((a, b) => (a.period || 0) - (b.period || 0) || String(a.id).localeCompare(String(b.id)));
}
