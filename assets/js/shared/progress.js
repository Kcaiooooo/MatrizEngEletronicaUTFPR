const validState = /^(subject|humanities|optional)-(locked|available|completed|inprogress|satisfied)$/;

export function parsePeriodDependency(value) {
    const match = typeof value === 'string' && /^Per[ií]odo:(\d+)$/.exec(value);
    return match ? Number(match[1]) : null;
}

export function parseProgress(raw, maxPeriod = 10) {
    let saved;
    try { saved = JSON.parse(raw); } catch { return null; }
    if (!saved || typeof saved !== 'object' || Array.isArray(saved) || !Object.keys(saved).length) return null;
    const result = { ...saved };
    for (const key of ['nodesState', 'humanitiesNodesState', 'optionalNodesState']) {
        result[key] = Array.isArray(saved[key]) ? saved[key].filter(node =>
            node && typeof node.id === 'string' && typeof node.state === 'string' && validState.test(node.state)
        ) : [];
    }
    for (const key of ['completedAcActivities', 'completedCceActivities']) {
        result[key] = Array.isArray(saved[key]) ? saved[key].filter(activity =>
            activity && typeof activity.desc === 'string' && Number.isFinite(activity.hours) && activity.hours > 0
        ) : [];
    }
    const period = Number(saved.currentPeriod);
    result.currentPeriod = Number.isInteger(period) ? Math.min(Math.max(period, 1), maxPeriod) : 1;
    return result;
}

export function renderActivityList(list, activities, type) {
    if (!list) return;
    const items = activities.map((activity, index) => {
        const item = document.createElement('li');
        item.className = 'flex justify-between items-center text-gray-300';
        const label = document.createElement('span');
        label.className = 'truncate pr-2';
        label.textContent = `${activity.desc} (${activity.hours}h)`;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'remove-btn flex-shrink-0';
        remove.dataset.type = type;
        remove.dataset.index = String(index);
        remove.textContent = '×';
        remove.setAttribute('aria-label', `Remover atividade: ${activity.desc}`);
        item.append(label, remove);
        return item;
    });
    list.replaceChildren(...items);
}
