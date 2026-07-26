import re

with open('pages/Skill tree Custom.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace renderTree & dragging logic
old_code_pattern = r"// Drag and Drop State\s*let draggingSubjectId = null;.*?\n        function updateProgress\(\)"

new_code = '''// Drag and Drop State
        let draggingSubjectId = null;
        let dragStartMouseX = 0;
        let dragStartMouseY = 0;
        let dragStartNodeX = 0;
        let dragStartNodeY = 0;
        let isDraggingMoved = false;

        function renderConnectionsOnly() {
            const container = document.getElementById('main-container');
            const svg = document.getElementById('svg-connections');
            if (!svg || !container) return;

            svg.innerHTML = '';
            const currentTabId = activeProfile.activeTabId;
            const tabSubjects = activeProfile.subjects.filter(s => (s.tabId || activeProfile.tabs[0].id) === currentTabId);

            const currentPosMap = {};
            tabSubjects.forEach(sub => {
                const nodeEl = container.querySelector(`.node[data-id="${sub.id}"]`);
                if (nodeEl) {
                    const leftP = parseFloat(nodeEl.style.left) || 50;
                    const topY = parseFloat(nodeEl.style.top) || 100;
                    currentPosMap[sub.id] = { xPercent: leftP, topY: topY };
                }
            });

            tabSubjects.forEach(sub => {
                const targetPos = currentPosMap[sub.id];
                if (!targetPos) return;

                (sub.dependencies || []).forEach(depId => {
                    const sourcePos = currentPosMap[depId];
                    if (!sourcePos) return;

                    const startX = sourcePos.xPercent * (container.offsetWidth / 100);
                    const startY = sourcePos.topY + 45;
                    const endX = targetPos.xPercent * (container.offsetWidth / 100);
                    const endY = targetPos.topY - 45;

                    const midY = (startY + endY) / 2;
                    const pathD = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
                    const isCompleted = activeProfile.subjectStates[depId] === 'subject-completed';

                    // Casing path for clean separation of overlapping lines
                    const casing = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    casing.setAttribute('d', pathD);
                    casing.setAttribute('fill', 'none');
                    casing.setAttribute('stroke', 'var(--bg-container)');
                    casing.setAttribute('stroke-width', '6');
                    casing.setAttribute('stroke-linecap', 'round');
                    casing.setAttribute('stroke-linejoin', 'round');
                    svg.appendChild(casing);

                    // Forefront path
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    line.setAttribute('d', pathD);
                    line.setAttribute('fill', 'none');
                    line.setAttribute('stroke', isCompleted ? '#4ade80' : 'var(--line-default)');
                    line.setAttribute('stroke-width', isCompleted ? '3' : '2');
                    line.setAttribute('stroke-linecap', 'round');
                    line.setAttribute('stroke-linejoin', 'round');
                    if (!isCompleted) {
                        line.setAttribute('stroke-dasharray', '4, 4');
                    }
                    svg.appendChild(line);
                });
            });
        }

        // Render Tree Canvas for active tab
        function renderTree() {
            const container = document.getElementById('main-container');
            const svg = document.getElementById('svg-connections');
            
            container.querySelectorAll('.node, .period-header').forEach(el => el.remove());
            svg.innerHTML = '';

            const currentTabId = activeProfile.activeTabId;
            const tabSubjects = activeProfile.subjects.filter(s => (s.tabId || activeProfile.tabs[0].id) === currentTabId);

            if (tabSubjects.length === 0) {
                const emptyMsg = document.createElement('div');
                emptyMsg.className = 'node text-center p-4 border-dashed border-gray-500 text-gray-400 w-64 h-32 text-sm';
                emptyMsg.style.left = '50%';
                emptyMsg.style.top = '150px';
                emptyMsg.style.cursor = 'default';
                emptyMsg.innerHTML = isEditMode 
                    ? 'Nenhuma disciplina nesta aba.<br><br>Clique em <b>Adicionar Disciplina</b> acima para cadastrar!'
                    : 'Nenhuma disciplina cadastrada nesta aba.<br><br>Clique no botão <b>Editar Estrutura da Matriz</b> no topo para adicionar!';
                container.appendChild(emptyMsg);
                updateProgress();
                return;
            }

            const periodMap = {};
            tabSubjects.forEach(sub => {
                const p = parseInt(sub.period) || 1;
                if (!periodMap[p]) periodMap[p] = [];
                periodMap[p].push(sub);
            });

            const sortedPeriods = Object.keys(periodMap).map(Number).sort((a,b) => a-b);

            let currentTopY = 50;
            const nodePosMap = {};

            sortedPeriods.forEach(p => {
                const subs = periodMap[p];
                const header = document.createElement('div');
                header.className = 'period-header';
                header.innerText = `${p}º PERÍODO`;
                header.style.top = `${currentTopY - 20}px`;
                container.appendChild(header);

                // Auto-wrap into rows of max 6 subjects per row
                const maxPerSubRow = 6;

                subs.forEach((sub, idx) => {
                    if (sub.customX !== undefined && sub.customY !== undefined) {
                        nodePosMap[sub.id] = { xPercent: sub.customX, topY: sub.customY, period: p };
                    } else {
                        const rowIndex = Math.floor(idx / maxPerSubRow);
                        const colIndex = idx % maxPerSubRow;
                        const itemsInThisRow = Math.min(maxPerSubRow, subs.length - rowIndex * maxPerSubRow);

                        let leftPercent;
                        if (itemsInThisRow === 1) leftPercent = 50;
                        else leftPercent = 8 + (colIndex * (84 / (itemsInThisRow - 1)));

                        const rowTopY = currentTopY + 40 + (rowIndex * 115);
                        nodePosMap[sub.id] = { xPercent: leftPercent, topY: rowTopY, period: p };
                    }
                });

                // Calculate vertical space used by this period
                const periodSubRows = Math.ceil(subs.length / maxPerSubRow);
                currentTopY += 40 + (periodSubRows * 115) + 30;
            });

            const containerHeight = Math.max(600, currentTopY + 100);
            container.style.minHeight = `${containerHeight}px`;

            // Render Nodes with Drag and Drop
            tabSubjects.forEach(sub => {
                const pos = nodePosMap[sub.id];
                if (!pos) return;

                const nodeEl = document.createElement('div');
                const currentState = activeProfile.subjectStates[sub.id] || 'subject-available';

                let isLocked = false;
                if (sub.dependencies && sub.dependencies.length > 0) {
                    const allMet = sub.dependencies.every(dId => activeProfile.subjectStates[dId] === 'subject-completed');
                    if (!allMet && currentState !== 'subject-completed') {
                        isLocked = true;
                    }
                }

                const stateClass = isLocked ? 'subject-locked' : currentState;
                nodeEl.className = `node ${stateClass}`;
                nodeEl.setAttribute('data-id', sub.id);
                nodeEl.style.left = `${pos.xPercent}%`;
                nodeEl.style.top = `${pos.topY}px`;
                nodeEl.style.cursor = isEditMode ? 'grab' : 'pointer';

                nodeEl.innerHTML = `
                    <div class="font-bold text-[10px] opacity-80 mb-0.5">${sub.id}</div>
                    <div class="leading-tight font-semibold text-[11px] max-h-10 overflow-hidden text-ellipsis">${sub.name}</div>
                    <div class="text-[9px] mt-1 opacity-70">${sub.cht}h</div>
                `;

                // Dragging handlers
                nodeEl.addEventListener('mousedown', (e) => {
                    if (e.button !== 0) return;
                    draggingSubjectId = sub.id;
                    isDraggingMoved = false;
                    dragStartMouseX = e.clientX;
                    dragStartMouseY = e.clientY;
                    dragStartNodeX = parseFloat(nodeEl.style.left) || pos.xPercent;
                    dragStartNodeY = parseFloat(nodeEl.style.top) || pos.topY;
                    nodeEl.style.cursor = 'grabbing';
                    nodeEl.style.zIndex = '1000';
                });

                nodeEl.addEventListener('click', () => {
                    if (isDraggingMoved) return;

                    if (isLocked) {
                        alert(`Disciplina trancada! Conclua os pré-requisitos: ${sub.dependencies.join(', ')}`);
                        return;
                    }
                    if (currentState === 'subject-available') {
                        activeProfile.subjectStates[sub.id] = 'subject-completed';
                    } else if (activeProfile.subjectStates[sub.id] === 'subject-completed') {
                        activeProfile.subjectStates[sub.id] = 'subject-inprogress';
                    } else {
                        activeProfile.subjectStates[sub.id] = 'subject-available';
                    }
                    saveAppData();
                    renderTree();
                });

                if (isEditMode) {
                    nodeEl.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        openEditModal(sub.id);
                    });
                }

                container.appendChild(nodeEl);
            });

            renderConnectionsOnly();
            updateProgress();
        }

        // Window Mouse Events for Dragging Nodes
        window.addEventListener('mousemove', (e) => {
            if (!draggingSubjectId) return;

            const container = document.getElementById('main-container');
            if (!container) return;

            const deltaX = e.clientX - dragStartMouseX;
            const deltaY = e.clientY - dragStartMouseY;

            if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
                isDraggingMoved = true;
            }

            const containerWidth = container.offsetWidth;
            const deltaXPercent = (deltaX / containerWidth) * 100;

            const newXPercent = Math.max(3, Math.min(97, dragStartNodeX + deltaXPercent));
            const newYPx = Math.max(30, dragStartNodeY + deltaY);

            const nodeEl = container.querySelector(`.node[data-id="${draggingSubjectId}"]`);
            if (nodeEl) {
                nodeEl.style.left = `${newXPercent}%`;
                nodeEl.style.top = `${newYPx}px`;
            }

            const sub = activeProfile.subjects.find(s => s.id === draggingSubjectId);
            if (sub) {
                sub.customX = newXPercent;
                sub.customY = newYPx;
            }

            renderConnectionsOnly();
        });

        window.addEventListener('mouseup', () => {
            if (draggingSubjectId) {
                const container = document.getElementById('main-container');
                if (container) {
                    const nodeEl = container.querySelector(`.node[data-id="${draggingSubjectId}"]`);
                    if (nodeEl) nodeEl.style.zIndex = '10';
                }
                draggingSubjectId = null;
                if (isDraggingMoved) {
                    saveAppData();
                }
            }
        });

        function updateProgress()'''

html = re.sub(old_code_pattern, new_code, html, flags=re.DOTALL)

# Update auto layout button handler to clear customX and customY
old_auto = "delete s.x;\n                            delete s.y;"
new_auto = "delete s.customX;\n                            delete s.customY;\n                            delete s.x;\n                            delete s.y;"
if old_auto in html:
    html = html.replace(old_auto, new_auto)

with open('pages/Skill tree Custom.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated tree renderer to use customX and customY with period-based row wrapping!")
