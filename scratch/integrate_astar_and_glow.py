import re

with open('pages/Skill tree Custom.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Inject CSS Keyframes for pulse animation if not present
pulse_css = '''
        @keyframes travelPulse {
            0% {
                stroke-dashoffset: var(--pulse-start);
                opacity: 0;
            }
            5% { opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            95% { opacity: 0; }
            100% {
                stroke-dashoffset: var(--pulse-end);
                opacity: 0;
            }
        }
        .line-completed {
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
        }
        .line-locked {
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
        }
'''

if '@keyframes travelPulse' not in html:
    html = html.replace('</style>', pulse_css + '\n    </style>')

# Replace renderConnectionsOnly and renderTree with fill="none" fix
old_render_code_pattern = r"// --- A\* PATHFINDING IMPLEMENTATION ---.*?function updateProgress\(\)"

new_render_code = '''// --- A* PATHFINDING IMPLEMENTATION ---
        function aStar(graph, start, end) {
            const openHeap = [start];
            const closedNodes = {};
            while (openHeap.length > 0) {
                openHeap.sort((a, b) => a.f - b.f);
                const currentNode = openHeap.shift();
                if (currentNode.x === end.x && currentNode.y === end.y) {
                    let curr = currentNode; const ret = [];
                    while (curr.parent) { ret.push(curr); curr = curr.parent; }
                    return ret.reverse();
                }
                closedNodes[`${currentNode.x}-${currentNode.y}`] = true;
                const neighbors = graph.neighbors(currentNode);
                for (let i = 0; i < neighbors.length; i++) {
                    const neighbor = neighbors[i];
                    const key = `${neighbor.x}-${neighbor.y}`;
                    if (closedNodes[key] || neighbor.isWall()) { continue; }
                    const gScore = currentNode.g + 1 + (neighbor.penalty || 0);
                    let gScoreIsBest = false;
                    if (!openHeap.includes(neighbor)) {
                        gScoreIsBest = true;
                        neighbor.h = Math.abs(neighbor.x - end.x) + Math.abs(neighbor.y - end.y);
                        openHeap.push(neighbor);
                    } else if (gScore < neighbor.g) { gScoreIsBest = true; }
                    if (gScoreIsBest) {
                        neighbor.parent = currentNode;
                        neighbor.g = gScore;
                        neighbor.f = neighbor.g + neighbor.h;
                    }
                }
            }
            return [];
        }

        class GridNode {
            constructor(x, y, weight) {
                this.x = x; this.y = y; this.weight = weight;
                this.f = 0; this.g = 0; this.h = 0;
                this.parent = null; this.penalty = 0;
            }
            isWall() { return this.weight === 1; }
        }

        class Graph {
            constructor(gridIn) {
                this.nodes = []; this.grid = [];
                for (let y = 0; y < gridIn.length; y++) {
                    this.grid[y] = [];
                    for (let x = 0; x < gridIn[y].length; x++) {
                        const node = new GridNode(x, y, gridIn[y][x]);
                        this.grid[y][x] = node;
                        this.nodes.push(node);
                    }
                }
            }
            neighbors(node) {
                const ret = []; const x = node.x; const y = node.y;
                if (this.grid[y - 1] && this.grid[y - 1][x]) ret.push(this.grid[y - 1][x]);
                if (this.grid[y + 1] && this.grid[y + 1][x]) ret.push(this.grid[y + 1][x]);
                if (this.grid[y] && this.grid[y][x - 1]) ret.push(this.grid[y][x - 1]);
                if (this.grid[y] && this.grid[y][x + 1]) ret.push(this.grid[y][x + 1]);
                return ret;
            }
        }

        function getColorForNodeId(id) {
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

            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const resolution = 25;
            const gridWidth = Math.max(1, Math.floor(containerWidth / resolution));
            const gridHeight = Math.max(1, Math.floor(containerHeight / resolution));

            const grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(0));

            const currentTabId = activeProfile.activeTabId;
            const tabSubjects = activeProfile.subjects.filter(s => (s.tabId || activeProfile.tabs[0].id) === currentTabId);

            // Mark node obstacles on grid
            tabSubjects.forEach(sub => {
                const nodeDocEl = container.querySelector(`.node[data-id="${sub.id}"]`);
                if (!nodeDocEl) return;
                const actualWidth = nodeDocEl.offsetWidth || 130;
                const actualHeight = nodeDocEl.offsetHeight || 60;
                const nodeLeft = nodeDocEl.offsetLeft;
                const nodeTop = nodeDocEl.offsetTop;

                const startX = Math.max(0, Math.floor(nodeLeft / resolution));
                const endX = Math.min(gridWidth - 1, Math.floor((nodeLeft + actualWidth) / resolution));
                const startY = Math.max(0, Math.floor(nodeTop / resolution));
                const endY = Math.min(gridHeight - 1, Math.floor((nodeTop + actualHeight) / resolution));

                for (let y = startY; y <= endY; y++) {
                    for (let x = startX; x <= endX; x++) {
                        if (grid[y] && grid[y][x] !== undefined) grid[y][x] = 1;
                    }
                }
            });

            const graph = new Graph(grid);

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

                    const exactStartX = parentLeft + (parentWidth / 2);
                    const exactStartY = parentTop + parentHeight;

                    let offsetPx = 0;
                    if (totalDeps > 1) {
                        const spacingPx = resolution;
                        const totalWidthPx = (totalDeps - 1) * spacingPx;
                        offsetPx = (index * spacingPx) - (totalWidthPx / 2);
                    }

                    const exactEndX = targetLeft + (targetWidth / 2) + offsetPx;
                    const exactEndY = targetTop;

                    const startX = Math.max(0, Math.min(gridWidth - 1, Math.floor(exactStartX / resolution)));
                    const startY = Math.max(0, Math.min(gridHeight - 1, Math.floor(exactStartY / resolution)));
                    const endX = Math.max(0, Math.min(gridWidth - 1, Math.floor(exactEndX / resolution)));
                    const endY = Math.max(0, Math.min(gridHeight - 1, Math.floor(exactEndY / resolution)));

                    if (grid[startY] && grid[startY][startX] !== undefined) graph.grid[startY][startX].weight = 0;
                    if (grid[endY] && grid[endY][endX] !== undefined) graph.grid[endY][endX].weight = 0;

                    const start = graph.grid[startY] ? graph.grid[startY][startX] : null;
                    const end = graph.grid[endY] ? graph.grid[endY][endX] : null;

                    if (start && end) {
                        const resultPath = aStar(graph, start, end);
                        if (resultPath.length > 0) {
                            resultPath.forEach(point => {
                                if (point.x !== startX || point.y !== startY) {
                                    point.penalty = (point.penalty || 0) + 15;
                                }
                            });

                            const adjustedEndY = exactEndY - 5;
                            let pathString = `M ${exactStartX} ${exactStartY}`;

                            const isLineClear = (x1, y1, x2, y2) => {
                                const minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
                                const minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
                                for (let y = minY; y <= maxY; y++) {
                                    for (let x = minX; x <= maxX; x++) {
                                        if (grid[y] && grid[y][x] === 1) {
                                            if (!((x >= startX - 1 && x <= startX + 1 && y >= startY - 1 && y <= startY + 1) ||
                                                (x >= endX - 1 && x <= endX + 1 && y >= endY - 1 && y <= endY + 1))) {
                                                return false;
                                            }
                                        }
                                    }
                                }
                                return true;
                            };

                            const midGridY = Math.floor((startY + endY) / 2);
                            const exactMidY = (exactStartY + adjustedEndY) / 2;

                            if (startX === endX && offsetPx === 0 && isLineClear(startX, startY, endX, endY)) {
                                pathString += ` L ${exactStartX} ${adjustedEndY}`;
                            } else if (isLineClear(startX, startY, startX, midGridY) &&
                                       isLineClear(startX, midGridY, endX, midGridY) &&
                                       isLineClear(endX, midGridY, endX, endY)) {
                                pathString += ` L ${exactStartX} ${exactMidY}`;
                                pathString += ` L ${exactEndX} ${exactMidY}`;
                                pathString += ` L ${exactEndX} ${adjustedEndY}`;
                            } else if (resultPath.length > 2) {
                                const firstGrid = resultPath[1];
                                const firstGridX = firstGrid.x * resolution + resolution / 2;
                                const firstGridY = firstGrid.y * resolution + resolution / 2;

                                pathString += ` L ${exactStartX} ${firstGridY}`;
                                pathString += ` L ${firstGridX} ${firstGridY}`;

                                for (let i = 2; i < resultPath.length - 1; i++) {
                                    const point = resultPath[i];
                                    pathString += ` L ${point.x * resolution + resolution / 2} ${point.y * resolution + resolution / 2}`;
                                }

                                const lastGrid = resultPath[resultPath.length - 2];
                                const lastGridY = lastGrid.y * resolution + resolution / 2;

                                pathString += ` L ${exactEndX} ${lastGridY}`;
                                pathString += ` L ${exactEndX} ${adjustedEndY}`;
                            } else {
                                const midY = (exactStartY + adjustedEndY) / 2;
                                pathString += ` L ${exactStartX} ${midY}`;
                                pathString += ` L ${exactEndX} ${midY}`;
                                pathString += ` L ${exactEndX} ${adjustedEndY}`;
                            }

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
                                markerComp.innerHTML = `<path d="M 0 0 L 10 5 L 0 10 z" fill="${colors.completedColor}" opacity="0.6" filter="drop-shadow(0 0 2px ${colors.glowColor})"></path>`;
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

                            // Background Casing stroke
                            const casingEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                            casingEl.setAttribute('d', pathString);
                            casingEl.setAttribute('fill', 'none');
                            casingEl.setAttribute('stroke', 'var(--bg-container)');
                            casingEl.setAttribute('stroke-width', isCompleted ? '7' : '6');
                            casingEl.setAttribute('stroke-linecap', 'round');
                            casingEl.setAttribute('stroke-linejoin', 'round');
                            svgEl.appendChild(casingEl);

                            // Forefront line
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

            setTimeout(() => {
                renderConnectionsOnly();
            }, 10);

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

html = re.sub(old_render_code_pattern, new_render_code, html, flags=re.DOTALL)

with open('pages/Skill tree Custom.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated Skill tree Custom.html with fill='none' fix, A* pathfinding, glow filters, and energy pulses!")
