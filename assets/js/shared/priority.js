/* =====================================================
           ANALISADOR DE PRIORIDADE DE MATÉRIAS
           ===================================================== */
        function openAnalyzerHelpModal() {
            const modal = document.getElementById('modal-analyzer-help');
            if (modal) modal.classList.remove('hidden');
        }

        function closeAnalyzerHelpModal() {
            const modal = document.getElementById('modal-analyzer-help');
            if (modal) modal.classList.add('hidden');
        }

        function getNodeState(node) {
            if (!node) return 'subject-locked';
            if (typeof activeProfile !== 'undefined' && activeProfile && activeProfile.subjectStates && activeProfile.subjectStates[node.id]) {
                return activeProfile.subjectStates[node.id];
            }
            return node.state || 'subject-locked';
        }

        function isHumanitiesOrGeneral(node) {
            if (!node) return true;
            if (node.type === 'humanities' || node.tabId === 'humanities') return true;
            if (typeof humanitiesNodes !== 'undefined' && Array.isArray(humanitiesNodes) && humanitiesNodes.some(h => h && h.id === node.id)) return true;

            const id = String(node.id || '');
            if (id.startsWith('GEE7') || id === 'ELO91' || id === 'ELO92' || id === 'ELP66' || id.startsWith('CAART') || id.startsWith('LEM7') || id.startsWith('FCH7') || id.startsWith('ELH')) {
                return true;
            }
            return false;
        }

        function getAllNodesList() {
            let allNodes = [];
            if (typeof activeProfile !== 'undefined' && activeProfile && Array.isArray(activeProfile.subjects)) {
                return activeProfile.subjects.filter(s => !isHumanitiesOrGeneral(s));
            }

            const mainNodes = (typeof window !== 'undefined' && window.nodes) || (typeof nodes !== 'undefined' ? nodes : []);
            const optNodes = (typeof window !== 'undefined' && window.optionalNodes) || (typeof optionalNodes !== 'undefined' ? optionalNodes : []);

            if (Array.isArray(mainNodes)) allNodes.push(...mainNodes);
            if (Array.isArray(optNodes)) allNodes.push(...optNodes);

            return allNodes.filter(n => n && !isHumanitiesOrGeneral(n));
        }

        function getAvailableSubjectsAnalysis() {
            const allNodes = getAllNodesList();
            if (!allNodes || allNodes.length === 0) return [];

            // 1. Identificação das Trilhas de Especialização
            // Uses window.SPECIALIZATION_TRACKS (exported from module scope) for cross-script access
            const tracksConfig = (typeof window.SPECIALIZATION_TRACKS !== 'undefined' && Object.keys(window.SPECIALIZATION_TRACKS).length > 0)
                ? window.SPECIALIZATION_TRACKS
                : ((typeof SPECIALIZATION_TRACKS !== 'undefined')
                    ? SPECIALIZATION_TRACKS
                    : ((typeof SPECIALIZATION_TRACKS_M2 !== 'undefined') ? SPECIALIZATION_TRACKS_M2 : {}));

            const subjectToTracksMap = {};
            for (const [trackName, subjectIds] of Object.entries(tracksConfig)) {
                if (Array.isArray(subjectIds)) {
                    subjectIds.forEach(id => {
                        const strId = String(id).trim();
                        if (!subjectToTracksMap[strId]) subjectToTracksMap[strId] = new Set();
                        subjectToTracksMap[strId].add(trackName);
                    });
                }
            }

            // 2. Coleta todos os nós para verificar o histórico do usuário
            const fullCheckNodes = [...allNodes];
            if (typeof optionalNodes !== 'undefined' && Array.isArray(optionalNodes)) {
                optionalNodes.forEach(opt => {
                    if (opt && opt.id && !fullCheckNodes.some(n => n && n.id === opt.id)) {
                        fullCheckNodes.push(opt);
                    }
                });
            }

            function isNodeTaken(n) {
                if (!n) return false;
                const s = getNodeState(n);
                return s && (
                    s.endsWith('-completed') ||
                    s.endsWith('-satisfied') ||
                    s.endsWith('-inprogress') ||
                    s === 'completed' ||
                    s === 'satisfied' ||
                    s === 'inprogress' ||
                    s === 'subject-completed' ||
                    s === 'subject-satisfied' ||
                    s === 'subject-inprogress' ||
                    s === 'optional-completed' ||
                    s === 'optional-inprogress'
                );
            }

            function isOptionalOrTrackNode(n) {
                if (!n) return false;
                if (n.type === 'optional' || n.tabId === 'optional') return true;
                if (n.groupId) return true;
                const strId = String(n.id).trim();
                if (subjectToTracksMap[strId] && subjectToTracksMap[strId].size > 0) return true;
                if (typeof optionalNodes !== 'undefined' && Array.isArray(optionalNodes) && optionalNodes.some(opt => opt && opt.id === n.id)) return true;
                return false;
            }

            // 3. Verifica se o usuário já iniciou alguma matéria de trilha / optativa
            const activeTracks = new Set();
            let hasStartedAnyOptional = false;

            fullCheckNodes.forEach(n => {
                if (!n || !n.id) return;
                if (isNodeTaken(n) && isOptionalOrTrackNode(n)) {
                    hasStartedAnyOptional = true;
                    const strId = String(n.id).trim();
                    if (subjectToTracksMap[strId]) {
                        subjectToTracksMap[strId].forEach(t => activeTracks.add(t));
                    }
                }
            });

            // 4. Filtra as matérias disponíveis respeitando a regra de trilhas/optativas
            const availableNodes = allNodes.filter(n => {
                if (!n || !n.id) return false;
                const s = getNodeState(n);
                const isAvailableOrInProgress = s && (
                    s.endsWith('-available') ||
                    s.endsWith('-inprogress') ||
                    s === 'subject-available' ||
                    s === 'available' ||
                    s === 'inprogress' ||
                    s === 'optional-available' ||
                    s === 'optional-inprogress'
                );
                if (!isAvailableOrInProgress) return false;

                // Regra de Trilhas/Optativas:
                if (isOptionalOrTrackNode(n)) {
                    // Se o usuário NÃO iniciou NENHUMA optativa/trilha ainda -> oculta todas as optativas!
                    if (!hasStartedAnyOptional) {
                        return false;
                    }

                    const strId = String(n.id).trim();
                    const nodeTracks = subjectToTracksMap[strId];

                    // Se pertence a trilha(s) específica(s): só recomenda se a trilha está ativa
                    if (nodeTracks && nodeTracks.size > 0) {
                        let belongsToActiveTrack = false;
                        for (const trackName of nodeTracks) {
                            if (activeTracks.has(trackName)) {
                                belongsToActiveTrack = true;
                                break;
                            }
                        }
                        if (!belongsToActiveTrack) {
                            return false; // Trilha específica ainda não iniciada -> não recomenda
                        }
                    }
                }

                return true;
            });

            function getDirectDependents(nodeId) {
                return allNodes.filter(n => {
                    if (!n || !n.dependencies || !Array.isArray(n.dependencies)) return false;
                    return n.dependencies.some(dep => String(dep) === String(nodeId));
                });
            }

            function getAllDownstreamDependents(nodeId) {
                const visited = new Set();
                const stack = [nodeId];
                while (stack.length > 0) {
                    const curr = stack.pop();
                    const direct = getDirectDependents(curr);
                    for (const dep of direct) {
                        if (dep && dep.id && !visited.has(dep.id)) {
                            visited.add(dep.id);
                            stack.push(dep.id);
                        }
                    }
                }
                return Array.from(visited).map(id => allNodes.find(n => n && String(n.id) === String(id))).filter(Boolean);
            }

            function getMaxChainDepth(nodeId, memo = {}) {
                if (memo[nodeId] !== undefined) return memo[nodeId];
                const direct = getDirectDependents(nodeId);
                if (direct.length === 0) return 1;
                let maxDepth = 0;
                for (const dep of direct) {
                    if (dep && dep.id) {
                        maxDepth = Math.max(maxDepth, getMaxChainDepth(dep.id, memo));
                    }
                }
                memo[nodeId] = 1 + maxDepth;
                return memo[nodeId];
            }

            function getImmediatelyUnlockedSubjects(nodeId) {
                const lockedNodes = allNodes.filter(n => {
                    const s = getNodeState(n);
                    return s && (s.endsWith('-locked') || s === 'subject-locked' || s === 'locked');
                });
                const newlyUnlocked = [];

                for (const locked of lockedNodes) {
                    if (!locked || !locked.dependencies || !Array.isArray(locked.dependencies)) continue;
                    const hasDep = locked.dependencies.some(dep => String(dep) === String(nodeId));
                    if (!hasDep) continue;

                    const remainingDeps = locked.dependencies.filter(depId => String(depId) !== String(nodeId));
                    const allOthersMet = remainingDeps.every(depId => {
                        const depStr = String(depId);
                        if (depStr.startsWith('Periodo:')) return true;
                        const parentNode = allNodes.find(p => p && String(p.id) === depStr);
                        if (!parentNode) return false;
                        const ps = getNodeState(parentNode);
                        return ps && (ps.endsWith('-completed') || ps.endsWith('-satisfied') || ps === 'subject-completed' || ps === 'completed');
                    });

                    if (allOthersMet) {
                        newlyUnlocked.push(locked);
                    }
                }
                return newlyUnlocked;
            }

            const results = availableNodes.map(node => {
                const directDeps = getDirectDependents(node.id);
                const totalDownstream = getAllDownstreamDependents(node.id);
                const immediateUnlocks = getImmediatelyUnlockedSubjects(node.id);
                const chainDepth = getMaxChainDepth(node.id);

                const score = (immediateUnlocks.length * 3.5) + (directDeps.length * 2.0) + (totalDownstream.length * 1.0) + (chainDepth * 1.5);

                return {
                    node,
                    directDeps,
                    totalDownstream,
                    immediateUnlocks,
                    chainDepth,
                    score
                };
            });

            results.sort((a, b) => b.score - a.score);

            results.forEach((item, index) => {
                if (item.score >= 7.0) {
                    item.priority = 'high';
                    item.priorityLabel = '🔴 Alta Prioridade (Gargalo)';
                    item.badgeClass = 'bg-red-500/20 text-red-400 border-red-500/40';
                } else if (item.score >= 3.5) {
                    item.priority = 'medium';
                    item.priorityLabel = '🟡 Média Prioridade';
                    item.badgeClass = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
                } else {
                    item.priority = 'low';
                    item.priorityLabel = '🟢 Flexível';
                    item.badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
                }
            });

            return results;
        }

        function openPriorityAnalyzerModal() {
            const modal = document.getElementById('modal-priority-analyzer');
            if (!modal) return;
            renderPriorityReport();
            modal.classList.remove('hidden');
        }

        function closePriorityAnalyzerModal() {
            const modal = document.getElementById('modal-priority-analyzer');
            if (modal) modal.classList.add('hidden');
        }

        function renderPriorityReport() {
            const summaryBar = document.getElementById('analyzer-summary-bar');
            const listEl = document.getElementById('analyzer-report-list');
            const filterPriority = document.getElementById('analyzer-filter-priority')?.value || 'all';
            const searchTerm = (document.getElementById('analyzer-search-input')?.value || '').toLowerCase().trim();

            if (!listEl || !summaryBar) return;

            const analysisData = getAvailableSubjectsAnalysis();

            // Summary Stats
            const totalAvailable = analysisData.length;
            const highPriorityCount = analysisData.filter(item => item.priority === 'high').length;
            const topSubject = analysisData.length > 0 ? analysisData[0].node.name : 'Nenhuma';

            summaryBar.innerHTML = `
                <div class="bg-gray-900/80 border border-gray-700/80 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-lg shrink-0">
                        ${totalAvailable}
                    </div>
                    <div>
                        <div class="text-xs text-gray-400 font-medium">Matérias Disponíveis</div>
                        <div class="text-sm font-bold text-white">Liberadas para Cursar</div>
                    </div>
                </div>
                <div class="bg-gray-900/80 border border-red-500/30 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 font-bold flex items-center justify-center text-lg shrink-0">
                        ${highPriorityCount}
                    </div>
                    <div>
                        <div class="text-xs text-red-300/80 font-medium">Gargalos de Grade</div>
                        <div class="text-sm font-bold text-red-400">Alta Prioridade</div>
                    </div>
                </div>
                <div class="bg-gray-900/80 border border-cyan-500/30 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-lg shrink-0">
                        ⭐
                    </div>
                    <div class="truncate">
                        <div class="text-xs text-cyan-300/80 font-medium">Prioridade #1 Recomendada</div>
                        <div class="text-xs font-bold text-cyan-300 truncate" title="${topSubject}">${topSubject}</div>
                    </div>
                </div>
            `;

            // Filter & Search
            let filtered = analysisData;
            if (filterPriority !== 'all') {
                filtered = filtered.filter(item => item.priority === filterPriority);
            }
            if (searchTerm) {
                filtered = filtered.filter(item =>
                    item.node.name.toLowerCase().includes(searchTerm) ||
                    (item.node.id && String(item.node.id).toLowerCase().includes(searchTerm))
                );
            }

            if (filtered.length === 0) {
                listEl.innerHTML = `
                    <div class="text-center py-10 bg-gray-900/40 rounded-xl border border-gray-700/50">
                        <p class="text-gray-400 text-sm">Nenhuma matéria encontrada com os filtros selecionados.</p>
                    </div>
                `;
                return;
            }

            listEl.innerHTML = filtered.map((item, idx) => {
                const n = item.node;
                const state = getNodeState(n);
                const isInProgress = state && state.endsWith('-inprogress');

                const unlockedTagsHtml = item.immediateUnlocks.length > 0
                    ? item.immediateUnlocks.map(u => `<span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-medium">${u.name}</span>`).join(' ')
                    : `<span class="text-gray-500 text-xs italic">Nenhuma imediata</span>`;

                return `
                    <div class="bg-gray-900/90 border border-gray-700/80 hover:border-gray-600 rounded-xl p-4 transition-all duration-200 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div class="space-y-1.5 grow">
                            <div class="flex flex-wrap items-center gap-2">
                                <span class="bg-amber-500 text-gray-950 font-black text-xs px-2 py-0.5 rounded-md">#${idx + 1}</span>
                                <h4 class="text-base font-bold text-white">${n.name}</h4>
                                <span class="text-xs px-2 py-0.5 rounded-full border font-semibold ${item.badgeClass}">${item.priorityLabel}</span>
                                ${isInProgress ? `<span class="bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs px-2 py-0.5 rounded-full font-semibold">▶ Cursando</span>` : ''}
                            </div>

                            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                                <span>Período: <strong class="text-gray-200">${n.period || 1}º</strong></span>
                                <span>Carga Horária: <strong class="text-gray-200">${n.cht || 60}h</strong></span>
                                <span>Impacto Longo Prazo: <strong class="text-amber-400 font-bold">${item.totalDownstream.length} matérias</strong></span>
                                <span>Cadeia de Pré-reqs: <strong class="text-gray-200">${item.chainDepth} semestres</strong></span>
                            </div>

                            <div class="pt-1.5 flex flex-wrap items-center gap-1.5">
                                <span class="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                                    🔓 Libera Imediatamente (${item.immediateUnlocks.length}):
                                </span>
                                ${unlockedTagsHtml}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
