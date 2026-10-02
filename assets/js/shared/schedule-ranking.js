export function weeklyIdleMetrics(sessions) {
    const sessionsByDay = new Map();
    for (const session of sessions || []) {
        const day = Number(session?.day);
        const start = Number(session?.start);
        const end = Number(session?.end);
        if (!Number.isInteger(day) || !Number.isFinite(start) || !Number.isFinite(end) || end <= start) continue;
        if (!sessionsByDay.has(day)) sessionsByDay.set(day, []);
        sessionsByDay.get(day).push({ start, end });
    }

    let totalMinutes = 0;
    let longestMinutes = 0;
    for (const daySessions of sessionsByDay.values()) {
        daySessions.sort((a, b) => a.start - b.start || a.end - b.end);
        let currentEnd = daySessions[0]?.end;
        for (const session of daySessions.slice(1)) {
            if (session.start > currentEnd) {
                const gap = session.start - currentEnd;
                totalMinutes += gap;
                longestMinutes = Math.max(longestMinutes, gap);
            }
            currentEnd = Math.max(currentEnd, session.end);
        }
    }
    return { totalMinutes, longestMinutes };
}

export function compareWeeklyIdleMetrics(a, b) {
    const totalDifference = (Number(a?.totalMinutes) || 0) - (Number(b?.totalMinutes) || 0);
    if (totalDifference) return totalDifference;
    return (Number(a?.longestMinutes) || 0) - (Number(b?.longestMinutes) || 0);
}
