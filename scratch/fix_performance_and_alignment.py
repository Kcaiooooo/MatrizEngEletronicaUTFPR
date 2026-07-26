import re

with open('pages/Skill tree Custom.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace renderConnectionsOnly and dragging logic with ultra-fast centered orthogonal routing
old_code_pattern = r"// --- A\* PATHFINDING IMPLEMENTATION ---.*?function updateProgress\(\)"

new_code = '''function getColorForNodeId(id) {
            let hash = 0;
            if (id) {
                for (let i = 0; i < id.length; i++) {
                    hash = id.charCodeAt(i) + ((hash << 5) - hash);
                }
            }
            let hue = Math.abs(hash * 137.5) % 360;
            if (hue > 80 && hue < 160) {
                hue = (hue + 100) % 360;
            }
            const completedColor = `hsl(${hue}, 85%, 55%)`;
            const glowColor = `hsl(${hue}, 90%, 70%)`;
            const lockedColor = `hsl(${hue}, 35%, 50%)`;
            return { completedColor, glowColor, lockedColor, hue };
        }

        // Drag and Drop State
        let draggingSubjectId = null;
        let dragStartMouseX = 0;
        let dragStartMouseY = 0;
        let dragStartNodeX = 0;
        let dragStartNodeY = 0;
        let isDraggingMoved = false;
        let animFrameId = null;

        function renderConnectionsOnly() {
            const container = document.getElementById('main-container');
            const svgEl = document.getElementById('svg-connections');
            if (!svgEl || !container) return;

            let defsEl = svgEl.querySelector('defs');
            if (!defsEl) {
                defsEl = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                svgEl.appendChild(defsEl);
            }
            const defsOuter = defsEl.outerHTML;
            svgEl.innerHTML = defsOuter;
            defsEl = svgEl.querySelector('defs');

            const currentTabId = activeProfile.activeTabId;
            const tabSubjects = activeProfile.subjects.filter(s => (s.tabId || activeProfile.tabs[0].id) === currentTabId);

            tabSubjects.filter(n => n.dependencies && n.dependencies.length > 0).forEach(node => {
                const totalDeps = node.dependencies.length;
                const targetDocEl = container.querySelector(`.node[data-id="${node.id}"]`);
                if (!targetDocEl) return;

                const targetWidth = targetDocEl.offsetWidth || 130;
                const targetHeight = targetDocEl.offsetHeight || 60;
                const targetLeft = targetDocEl.offsetLeft;
                const targetTop = targetDocEl.offsetTop;

                node.dependencies.forEach((depId, index) => {
                    const parentNode = tabSubjects.find(p => p.id === depId);
                    const parentDocEl = container.querySelector(`.node[data-id="${depId}"]`);
                    if (!parentNode || !parentDocEl) return;

                    const parentWidth = parentDocEl.offsetWidth || 130;
                    const parentHeight = parentDocEl.offsetHeight || 60;
                    const parentLeft = parentDocEl.offsetLeft;
                    const parentTop = parentDocEl.offsetTop;

                    // Exact Bottom-Center of Parent
                    const startX = parentLeft + (parentWidth / 2);
                    const startY = parentTop + parentHeight;

                    // Multi-prerequisite horizontal offset
                    let offsetPx = 0;
                    if (totalDeps > 1) {
                        const spacingPx = 20;
                        const totalWidthPx = (totalDeps - 1) * spacingPx;
                        offsetPx = (index * spacingPx) - (totalWidthPx / 2);
                    }

                    // Exact Top-Center of Child
                    const endX = targetLeft + (targetWidth / 2) + offsetPx;
                    const endY = targetTop - 5; // Slight offset for marker arrowhead

                    // Midpoint channel between rows
                    const midY = (startY + endY) / 2;

                    // Pristine Orthogonal Path: Down -> Across -> Down
                    const pathString = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;

                    const isCompleted = activeProfile.subjectStates[depId] === 'subject-completed';
                    const lineId = `line-${depId}-to-${node.id}`;
                    const colors = getColorForNodeId(depId || "default");

                    const uniqueMarkerCompletedId = `marker-comp-${depId}`;
                    const uniqueMarkerLockedId = `marker-lock-${depId}`;

                    if (defsEl && !document.getElementById(uniqueMarkerCompletedId)) {
                        const markerComp = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
                        markerComp.setAttribute('id', uniqueMarkerCompletedId);
                        markerComp.setAttribute('viewBox', '0 0 10 10');
                        markerComp.setAttribute('refX', '8');
                        markerComp.setAttribute('refY', '5');
                        markerComp.setAttribute('markerWidth', '6');
                        markerComp.setAttribute('markerHeight', '6');
                        markerComp.setAttribute('orient', 'auto-start-reverse');
                        markerComp.innerHTML = `<path d="M 0 0 L 10 5 L 0 10 z" fill="${colors.completedColor}" opacity="0.8" filter="drop-shadow(0 0 2px ${colors.glowColor})"></path>`;
                        defsEl.appendChild(markerComp);

                        const markerLock = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
                        markerLock.setAttribute('id', uniqueMarkerLockedId);
                        markerLock.setAttribute('viewBox', '0 0 10 10');
                        markerLock.setAttribute('refX', '8');
                        markerLock.setAttribute('refY', '5');
                        markerLock.setAttribute('markerWidth', '5');
                        markerLock.setAttribute('markerHeight', '5');
                        markerLock.setAttribute('orient', 'auto-start-reverse');
                        markerLock.innerHTML = `<path d="M 0 0 L 10 5 L 0 10 z" fill="${colors.lockedColor}" opacity="0.6"></path>`;
                        defsEl.appendChild(markerLock);
                    }

                    // Background Casing Stroke (clean separation)
                    const casingEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    casingEl.setAttribute('d', pathString);
                    casingEl.setAttribute('fill', 'none');
                    casingEl.setAttribute('stroke', 'var(--bg-container)');
                    casingEl.setAttribute('stroke-width', isCompleted ? '7' : '6');
                    casingEl.setAttribute('stroke-linecap', 'round');
                    casingEl.setAttribute('stroke-linejoin', 'round');
                    svgEl.appendChild(casingEl);

                    // Forefront Line
                    const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    lineEl.setAttribute('d', pathString);
                    lineEl.setAttribute('fill', 'none');
                    lineEl.setAttribute('marker-end', isCompleted ? `url(#${uniqueMarkerCompletedId})` : `url(#${uniqueMarkerLockedId})`);
                    lineEl.setAttribute('class', isCompleted ? 'line-completed' : 'line-locked');

                    if (isCompleted) {
                        lineEl.style.stroke = colors.completedColor;
                        lineEl.style.filter = `drop-shadow(0 0 3px ${colors.glowColor})`;
                        lineEl.style.strokeWidth = "3";
                    } else {
                        lineEl.style.stroke = colors.lockedColor;
                        lineEl.style.strokeWidth = "2";
                        lineEl.style.strokeDasharray = "4, 4";
                    }

                    svgEl.appendChild(lineEl);

                    // Periodic Energy Pulse Animation along active lines
                    const isTargetCompleted = activeProfile.subjectStates[node.id] === 'subject-completed';
                    if (isCompleted && !isTargetCompleted) {
                        const pulseId = `pulse-${lineId}`;
                        if (!document.getElementById(pulseId)) {
                            const pulseEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                            pulseEl.setAttribute('id', pulseId);
                            pulseEl.setAttribute('d', pathString);
                            pulseEl.setAttribute('fill', 'none');
                            pulseEl.setAttribute('stroke', '#ffffff');
                            pulseEl.setAttribute('stroke-width', '4');
                            pulseEl.setAttribute('stroke-linecap', 'round');
                            pulseEl.setAttribute('stroke-linejoin', 'round');
                            pulseEl.setAttribute('opacity', '0.6');
                            pulseEl.style.filter = `drop-shadow(0 0 4px ${colors.completedColor}) drop-shadow(0 0 8px ${colors.glowColor})`;

                            svgEl.appendChild(pulseEl);

                            setTimeout(() => {
                                const length = pulseEl.getTotalLength();
                                if (length > 0) {
                                    const dashLength = Math.max(15, length * 0.15);
                                    pulseEl.style.strokeDasharray = `${dashLength}, ${length * 3}`;
                                    pulseEl.style.setProperty('--pulse-start', length + dashLength);
                                    pulseEl.style.setProperty('--pulse-end', -length);
                                    pulseEl.style.opacity = '0';
                                    const delay = (2.5 + Math.random() * 6).toFixed(1);
                                    pulseEl.style.animation = `travelPulse 2.5s ease-in-out infinite ${delay}s`;
                                }
                            }, 50);
                        }
                    }
                });
            });
        }

        // Render Tree Canvas for active tab
        function renderTree() {
            const container = document.getElementById('main-container');
            const svgEl = document.getElementById('svg-connections');
            
            container.querySelectorAll('.node, .period-header').forEach(el => el.remove());
            if (svgEl) {
                let defsEl = svgEl.querySelector('defs');
                if (defsEl) svgEl.innerHTML = defsEl.outerHTML;
                else svgEl.innerHTML = '';
            }

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

        // Window Mouse Events for Dragging Nodes (using requestAnimationFrame for smooth 60fps)
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

            if (animFrameId) cancelAnimationFrame(animFrameId);
            animFrameId = requestAnimationFrame(() => {
                renderConnectionsOnly();
            });
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

with open('pages/Skill tree Custom.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Applied centered orthogonal line routing and requestAnimationFrame performance optimizations!")
