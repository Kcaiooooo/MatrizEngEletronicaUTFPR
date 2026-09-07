import { TOTAL_HUMANITIES_HOURS, TOTAL_OPTIONAL_HOURS, NODE_WIDTH, NODE_HEIGHT, SPECIALIZATION_TRACKS_M2, OPTIONAL_GROUPS_CONFIG, allNodesData, allHumanitiesData, allOptionalNodesData } from '../data/m2.js';
import { parseProgress, renderActivityList as renderSafeActivityList } from '../shared/progress.js';
import { installTreePan } from '../shared/tree-pan.js';
import { setupCourseDetailsModal, showCourseDetails } from '../shared/course-details.js';
const storage = window.KMStorage.forCourse({"progressKey":"skillTreeProgress_M2","legacyProgressKey":"skillTreeProgress_M2","glowKey":"skillTreeGlowEnabled_M2","legacyGlowKey":"skillTreeGlowEnabled_M2"});


setupCourseDetailsModal();
let ppcDetailsPromise;
const loadPpcDetails = () => ppcDetailsPromise ??= import('../data/ppc-m2-details.js').then(module => module.PPC_M2_DETAILS);

            // --- DOM ELEMENTS ---
            const mainContainer = document.getElementById('main-container');
            const humanitiesContainer = document.getElementById('humanities-container');
            const optionalContainer = document.getElementById('optional-container');

            const resetButton = document.getElementById('reset-button');

            const totalProgressBar = document.getElementById('total-progress-bar');
            const totalProgressText = document.getElementById('total-progress-text');
            const periodProgressBar = document.getElementById('period-progress-bar');
            const periodProgressText = document.getElementById('period-progress-text');
            const pendingHoursText = document.getElementById('pending-hours-text');
            const humanitiesProgressBar = document.getElementById('humanities-progress-bar');
            const humanitiesProgressText = document.getElementById('humanities-progress-text');
            const group1015ProgressBar = document.getElementById('group1015-progress-bar');
            const group1015ProgressText = document.getElementById('group1015-progress-text');
            const optionalProgressBar = document.getElementById('optional-progress-bar');
            const optionalProgressText = document.getElementById('optional-progress-text');

            const prerequisiteModal = document.getElementById('prerequisite-modal');
            const confirmOverrideBtn = document.getElementById('confirm-override-btn');
            const cancelOverrideBtn = document.getElementById('cancel-override-btn');
            const modalText = document.getElementById('modal-text');

            const tabMain = document.getElementById('tab-main');
            const tabHumanities = document.getElementById('tab-humanities');
            const tabOptional = document.getElementById('tab-optional');

            const celebrationModal = document.getElementById('celebration-modal');
            const closeCelebrationBtn = document.getElementById('close-celebration-btn');
            const celebrationAudio = document.getElementById('celebration-audio');

            const settingsModal = document.getElementById('settings-modal');
            const settingsBtn = document.getElementById('settings-btn');
            const closeSettingsBtn = document.getElementById('close-settings-btn');
            const glowToggle = document.getElementById('glow-toggle');

            // Navegação compartilhada da matriz.
            const panningContainer = document.querySelector('.tree-wrapper');
            installTreePan(panningContainer);


            // --- STATE ---
            let nodes = [];
            let humanitiesNodes = [];
            let optionalNodes = [];
            let activeTree = 'main';
            let currentPeriod = 1;
            let nodeToOverride = null;
            let celebrationShown = false;

            // --- A* PATHFINDING IMPLEMENTATION (No changes needed) ---
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
                constructor(x, y, weight) { this.x = x; this.y = y; this.weight = weight; this.f = 0; this.g = 0; this.h = 0; this.parent = null; this.penalty = 0; }
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

            function positionTooltip(nodeEl, tooltipEl) {
                const container = document.querySelector('.tree-wrapper');
                const containerRect = container.getBoundingClientRect();

                // --- INÍCIO DA MODIFICAÇÃO ---

                // Primeiro, remove a classe 'below' para recalcular do zero
                tooltipEl.classList.remove('below');

                // Resetar estilos horizontais antes de qualquer cálculo
                tooltipEl.style.left = '50%';
                tooltipEl.style.marginLeft = '-110px';
                tooltipEl.style.right = 'auto';

                let tooltipRect = tooltipEl.getBoundingClientRect();

                // 1. Verificação VERTICAL: Se o topo do tooltip está fora da tela...
                if (tooltipRect.top < containerRect.top) {
                    // ...adicione a classe 'below' para movê-lo para baixo.
                    tooltipEl.classList.add('below');
                    // Recalcula o retângulo após a mudança de classe
                    tooltipRect = tooltipEl.getBoundingClientRect();
                }

                // 2. Verificação HORIZONTAL (lógica que você já tinha)
                if (tooltipRect.left < containerRect.left) {
                    // Tooltip está fora pela esquerda
                    tooltipEl.style.left = '0';
                    tooltipEl.style.marginLeft = '0';
                } else if (tooltipRect.right > containerRect.right) {
                    // Tooltip está fora pela direita
                    tooltipEl.style.left = 'auto';
                    tooltipEl.style.right = '0';
                    tooltipEl.style.marginLeft = '0';
                }
                // --- FIM DA MODIFICAÇÃO ---
            }

            // --- FUNCTIONS ---

            // =======================================================================
            //  NOVO CÓDIGO: FUNÇÕES PARA SALVAR E CARREGAR O PROGRESSO
            // =======================================================================

            /**
             * ## Função `saveState`
             * Reúne todos os dados dinâmicos do progresso do usuário em um único objeto,
             * o converte para uma string JSON e o armazena na localStorage do navegador.
             * Isso garante que o progresso seja salvo entre as sessões.
             */
            function saveState() {
                // Objeto que guardará todo o nosso progresso
                const stateToSave = {
                    // Mapeia cada array de nós para um formato mais simples, salvando apenas o ID e o estado.
                    // Isso economiza espaço e torna o salvamento mais eficiente.
                    nodesState: nodes.map(n => ({ id: n.id, state: n.state })),
                    humanitiesNodesState: humanitiesNodes.map(n => ({ id: n.id, state: n.state })),
                    optionalNodesState: optionalNodes.map(n => ({ id: n.id, state: n.state })),
                    currentPeriod: currentPeriod, // <-- ADICIONE ESTA LINHA

                };

                // Converte o objeto para uma string JSON e armazena na localStorage com uma chave única.
                storage.setItem('skillTreeProgress_M2', JSON.stringify(stateToSave));
                console.log("Estado salvo com sucesso!"); // Um log para ajudar a depurar
            }

            /**
             * ## Função `loadState`
             * Verifica se há dados salvos na storage. Se houver, carrega esses dados,
             * os converte de volta para um objeto JavaScript e atualiza o estado da aplicação
             * para refletir o progresso salvo anteriormente.
             * @returns {boolean} - Retorna `true` se o estado foi carregado com sucesso, `false` caso contrário.
             */
            function loadState() {
                // Tenta obter os dados salvos da localStorage
                const savedStateJSON = storage.getItem('skillTreeProgress_M2');

                // Se não houver nada salvo, interrompe a função.
                if (!savedStateJSON) {
                    console.log("Nenhum estado salvo encontrado.");
                    return false;
                }

                // Converte a string JSON de volta para um objeto
                const savedState = parseProgress(savedStateJSON, Number(document.getElementById('period-slider').max));
            if (!savedState) return false;

                // Função auxiliar para atualizar o estado de um array de nós (matérias)
                const updateNodeStates = (targetNodes, savedStates) => {
                    if (!savedStates) return;
                    savedStates.forEach(savedNode => {
                        const targetNode = targetNodes.find(n => n.id === savedNode.id);
                        if (targetNode) {
                            targetNode.state = savedNode.state;
                        }
                    });
                };

                // Atualiza o estado de todas as árvores de matérias
                updateNodeStates(nodes, savedState.nodesState);
                updateNodeStates(humanitiesNodes, savedState.humanitiesNodesState);
                updateNodeStates(optionalNodes, savedState.optionalNodesState);
                currentPeriod = savedState.currentPeriod || 1;

                console.log("Estado carregado com sucesso!");
                return true;
            }

            /**
             * ## Função `initializeTree` (MODIFICADA)
             * Esta função agora tenta carregar o progresso salvo. Se não encontrar,
             * ela configura o estado inicial padrão do zero.
             */
            function initializeTree() {
            currentPeriod = 1;
                // Inicializa as estruturas de dados base (isso não muda)
                nodes = JSON.parse(JSON.stringify(allNodesData));
                humanitiesNodes = JSON.parse(JSON.stringify(allHumanitiesData));
                optionalNodes = JSON.parse(JSON.stringify(allOptionalNodesData));

                // TENTA CARREGAR O ESTADO SALVO
                
                    nodes.forEach(node => {
                        node.state = node.dependencies.length === 0 ? 'subject-available' : 'subject-locked';
                    });
                    humanitiesNodes.forEach(node => {
                        node.state = 'humanities-locked';
                    });
                    optionalNodes.forEach(node => {
                        node.state = 'optional-locked';
                    });
                
            loadState();

                // Se nenhum estado foi carregado (primeira visita ou após reset),
                // configura o estado inicial padrão.
                

                // O resto da função continua igual
                updateAllSubjectStates();
                renderActiveTree();
                updateAllProgressBars();
                const periodSlider = document.getElementById('period-slider');
                periodSlider.value = currentPeriod; // Garante que o slider inicie no valor correto
                periodSlider.oninput = (e) => {
                    currentPeriod = parseInt(e.target.value, 10);
                    updateAllSubjectStates();
                    renderActiveTree();
                    updateAllProgressBars();
                    saveState();
                };
            }

            function renderActiveTree() {
                if (activeTree === 'main') {
                    renderTree(mainContainer, nodes, 'main-lines', 'arrow-completed', 'arrow-locked');
                } else if (activeTree === 'humanities') {
                    renderTree(humanitiesContainer, humanitiesNodes, 'humanities-lines', 'h-arrow-completed', 'h-arrow-locked');
                } else {
                    renderTree(optionalContainer, optionalNodes, 'optional-lines', 'o-arrow-completed', 'o-arrow-locked');
                    renderOptionalTrackHeaders();
                }
            }

            function renderTree(container, data, svgId, markerCompletedId, markerLockedId) {
                const svgEl = container.querySelector(`#${svgId}`);
                const svgDefs = svgEl.querySelector('defs').outerHTML;
                container.innerHTML = `<svg id="${svgId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none;">${svgDefs}</svg>`;

                renderNodes(container, data);
                setTimeout(() => renderLines(container, data, svgId, markerCompletedId, markerLockedId), 0);
            }

            function renderOptionalTrackHeaders() {
                // Removendo headers antigos para evitar duplicatas ao redimensionar
                optionalContainer.querySelectorAll('.track-header').forEach(h => h.remove());

                // Headers com posicionamento vertical (y) reajustado e comprimido
                const trackPositions = {
                    'Trilha: Telecomunicações': 8,
                    'Trilha: Engenharia Biomédica': 20,
                    'Trilha: Pesquisa Científica': 32,
                    'Trilha: Proc. de Sinais, Imagens e Padrões': 44,
                    'Trilha Eletiva e Optativas': 58,
                };
                Object.entries(trackPositions).forEach(([name, yPos]) => {
                    const header = document.createElement('div');
                    header.className = 'track-header';
                    header.textContent = name;
                    header.style.top = `${yPos}%`;
                    optionalContainer.appendChild(header);
                });
            }

            function getColorForNodeId(id) {
                let hash = 0;
                if (id) {
                    for (let i = 0; i < id.length; i++) {
                        hash = id.charCodeAt(i) + ((hash << 5) - hash);
                    }
                }
                let hue = Math.abs(hash * 137.5) % 360;

                // Prevent dynamic hues from falling into the green spectrum (80-160)
                // to avoid confusing available subjects with completed ones.
                if (hue > 80 && hue < 160) {
                    hue = (hue + 100) % 360;
                }

                const completedColor = `hsl(${hue}, 85%, 55%)`;
                const glowColor = `hsl(${hue}, 90%, 70%)`;
                const lockedColor = `hsl(${hue}, 35%, 50%)`;
                return { completedColor, glowColor, lockedColor, hue };
            }

            if (!window.animatedLines) window.animatedLines = new Set();
            function renderLines(container, data, svgId, markerCompletedId, markerLockedId) {
                const svgEl = container.querySelector(`#${svgId}`);
                if (!svgEl) return;

                const defs = svgEl.querySelector('defs').outerHTML;
                svgEl.innerHTML = defs;

                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                const resolution = 25;
                const gridWidth = Math.floor(containerWidth / resolution);
                const gridHeight = Math.floor(containerHeight / resolution);

                const grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(0));

                data.forEach(node => {
                    if (typeof node.x === 'undefined' || typeof node.y === 'undefined') return;
                    const nodeDocEl = document.getElementById(`node-${node.id}`);
                    const actualWidth = nodeDocEl ? nodeDocEl.offsetWidth : NODE_WIDTH;
                    const actualHeight = nodeDocEl ? nodeDocEl.offsetHeight : NODE_HEIGHT;

                    const nodeLeft = (node.x / 100) * containerWidth - (actualWidth / 2);
                    const nodeTop = (node.y / 100) * containerHeight - (actualHeight / 2);
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

                data.filter(n => n.dependencies && n.dependencies.length > 0).forEach(node => {
                    const totalDeps = node.dependencies.length;
                    node.dependencies.forEach((depId, index) => {
                        const parentNode = data.find(p => p.id === depId);

                        if (parentNode && typeof node.x !== 'undefined' && typeof parentNode.x !== 'undefined') {
                            const targetDocEl = document.getElementById(`node-${node.id}`);
                            const targetHeight = targetDocEl ? targetDocEl.offsetHeight : NODE_HEIGHT;

                            const parentDocEl = document.getElementById(`node-${parentNode.id}`);
                            const parentHeight = parentDocEl ? parentDocEl.offsetHeight : NODE_HEIGHT;

                            const exactStartX = ((parentNode.x / 100) * containerWidth);
                            const exactStartY = ((parentNode.y / 100) * containerHeight) + (parentHeight / 2);

                            // Offset arriving arrows evenly if a node has multiple prerequisites
                            let offsetPx = 0;
                            if (totalDeps > 1) {
                                const spacingPx = resolution; // Snap to distinct grid cells (25px)
                                const totalWidthPx = (totalDeps - 1) * spacingPx;
                                offsetPx = (index * spacingPx) - (totalWidthPx / 2);
                            }

                            const exactEndX = ((node.x / 100) * containerWidth) + offsetPx;
                            const exactEndY = ((node.y / 100) * containerHeight) - (targetHeight / 2);

                            const startX = Math.floor(exactStartX / resolution);
                            const startY = Math.floor(exactStartY / resolution);
                            const endX = Math.floor(exactEndX / resolution);
                            const endY = Math.floor(exactEndY / resolution);

                            if (grid[startY] && grid[startY][startX] !== undefined) graph.grid[startY][startX].weight = 0;
                            if (grid[endY] && grid[endY][endX] !== undefined) graph.grid[endY][endX].weight = 0;

                            const start = graph.grid[startY] ? graph.grid[startY][startX] : null;
                            const end = graph.grid[endY] ? graph.grid[endY][endX] : null;

                            if (start && end) {
                                const resultPath = aStar(graph, start, end);
                                if (resultPath.length > 0) {
                                    // Add penalty to the used path to discourage future paths from overlapping completely
                                    resultPath.forEach(point => {
                                        if (point.x !== startX || point.y !== startY) {
                                            point.penalty = (point.penalty || 0) + 15;
                                        }
                                    });

                                    // The arrow tip ends exactly at the target's top edge.
                                    const adjustedEndY = exactEndY;

                                    let pathString = `M ${exactStartX} ${exactStartY}`;

                                    // Helper function to check if a straight line on the grid is clear
                                    const isLineClear = (x1, y1, x2, y2) => {
                                        const minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
                                        const minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
                                        for (let y = minY; y <= maxY; y++) {
                                            for (let x = minX; x <= maxX; x++) {
                                                if (grid[y] && grid[y][x] === 1) {
                                                    // It's only strictly blocked if it's NOT the start or end node bounds
                                                    if (!((x >= startX - 1 && x <= startX + 1 && y >= startY - 1 && y <= startY + 1) ||
                                                        (x >= endX - 1 && x <= endX + 1 && y >= endY - 1 && y <= endY + 1))) {
                                                        return false;
                                                    }
                                                }
                                            }
                                        }
                                        return true;
                                    };

                                    // Define ideal mid-Y for orthogonal routing (halfway between parent bottom and child top)
                                    const midGridY = Math.floor((startY + endY) / 2);
                                    const exactMidY = (exactStartY + adjustedEndY) / 2;

                                    // Simplification check 1: Perfect Vertical Line
                                    if (startX === endX && offsetPx === 0 && isLineClear(startX, startY, endX, endY)) {
                                        pathString += ` L ${exactStartX} ${adjustedEndY}`;
                                    }
                                    // Simplification check 2: Pristine Orthogonal Z-Shape (Down -> Across -> Down)
                                    else if (isLineClear(startX, startY, startX, midGridY) &&
                                        isLineClear(startX, midGridY, endX, midGridY) &&
                                        isLineClear(endX, midGridY, endX, endY)) {
                                        pathString += ` L ${exactStartX} ${exactMidY}`;
                                        pathString += ` L ${exactEndX} ${exactMidY}`;
                                        pathString += ` L ${exactEndX} ${adjustedEndY}`;
                                    }
                                    // Fallback: A* Algorithm Maze Routing
                                    else if (resultPath.length > 2) {
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
                                        const finalApproachY = Math.min(lastGridY, adjustedEndY - 12);

                                        pathString += ` L ${exactEndX} ${finalApproachY}`;
                                        pathString += ` L ${exactEndX} ${adjustedEndY}`;
                                    } else {
                                        const midY = (exactStartY + adjustedEndY) / 2;
                                        pathString += ` L ${exactStartX} ${midY}`;
                                        pathString += ` L ${exactEndX} ${midY}`;
                                        pathString += ` L ${exactEndX} ${adjustedEndY}`;
                                    }

                                    const isCompleted = parentNode.state.endsWith('-completed') || parentNode.state.endsWith('-satisfied');
                                    const lineId = `line-${depId}-to-${node.id}`;
                                    const colors = getColorForNodeId(depId || "default");

                                    // Create unique markers for this color if they don't exist
                                    const uniqueMarkerCompletedId = `${markerCompletedId}-${depId}`;
                                    const uniqueMarkerLockedId = `${markerLockedId}-${depId}`;

                                    const defsEl = svgEl.querySelector('defs');
                                    if (defsEl && !document.getElementById(uniqueMarkerCompletedId)) {
                                        const markerComp = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
                                        markerComp.setAttribute('id', uniqueMarkerCompletedId);
                                        markerComp.setAttribute('viewBox', '0 0 10 10');
                                        markerComp.setAttribute('refX', '10');
                                        markerComp.setAttribute('refY', '5');
                                        markerComp.setAttribute('markerWidth', '6');
                                        markerComp.setAttribute('markerHeight', '6');
                                        markerComp.setAttribute('orient', 'auto-start-reverse');
                                        markerComp.innerHTML = `<path d="M 0 0 L 10 5 L 0 10 z" fill="${colors.completedColor}" opacity="0.6" filter="drop-shadow(0 0 2px ${colors.glowColor})"></path>`;
                                        defsEl.appendChild(markerComp);

                                        const markerLock = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
                                        markerLock.setAttribute('id', uniqueMarkerLockedId);
                                        markerLock.setAttribute('viewBox', '0 0 10 10');
                                        markerLock.setAttribute('refX', '10');
                                        markerLock.setAttribute('refY', '5');
                                        markerLock.setAttribute('markerWidth', '5');
                                        markerLock.setAttribute('markerHeight', '5');
                                        markerLock.setAttribute('orient', 'auto-start-reverse');
                                        markerLock.innerHTML = `<path d="M 0 0 L 10 5 L 0 10 z" fill="${colors.lockedColor}" opacity="0.6"></path>`;
                                        defsEl.appendChild(markerLock);
                                    }

                                    const casingEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                                    casingEl.setAttribute('d', pathString);
                                    casingEl.setAttribute('fill', 'none');
                                    casingEl.setAttribute('stroke', 'var(--bg-container)');
                                    casingEl.setAttribute('stroke-width', isCompleted ? '7' : '6');
                                    casingEl.setAttribute('stroke-linecap', 'round');
                                    casingEl.setAttribute('stroke-linejoin', 'round');
                                    svgEl.appendChild(casingEl);

                                    const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                                    lineEl.setAttribute('d', pathString);
                                    lineEl.setAttribute('marker-end', isCompleted ? `url(#${uniqueMarkerCompletedId})` : `url(#${uniqueMarkerLockedId})`);
                                    lineEl.setAttribute('class', isCompleted ? 'line-completed' : 'line-locked');

                                    // Apply dynamic distinct color inline to override generic class colors
                                    if (isCompleted) {
                                        lineEl.style.stroke = colors.completedColor;
                                        lineEl.style.filter = `drop-shadow(0 0 3px ${colors.glowColor})`;
                                    } else {
                                        lineEl.style.stroke = colors.lockedColor;
                                        lineEl.style.strokeWidth = "2";
                                        lineEl.style.strokeDasharray = "4, 4";
                                    }

                                    svgEl.appendChild(lineEl);

                                    // --- NEW: PERIODIC ENERGY PULSE ---
                                    // Only pulse if the parent dependency is completed BUT the target node is NOT YET completed
                                    const isTargetCompleted = node.state.endsWith('-completed') || node.state.endsWith('-satisfied');
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

                                            // Small delay to allow element to render and calculate length
                                            setTimeout(() => {
                                                const length = pulseEl.getTotalLength();
                                                if (length > 0) {
                                                    const dashLength = Math.max(15, length * 0.15); // The pulse is 15% of the line length

                                                    // Pattern: dash, massive gap to hide the rest
                                                    pulseEl.style.strokeDasharray = `${dashLength}, ${length * 3}`;

                                                    // Start position: pushed entirely before the start of the path
                                                    pulseEl.style.setProperty('--pulse-start', length + dashLength);

                                                    // End position: pushed entirely past the end of the path
                                                    // Note: negative offset pushes the dash forward along the path
                                                    pulseEl.style.setProperty('--pulse-end', -length);

                                                    // Set initial opacity to 0 so it doesn't show before the animation starts!
                                                    pulseEl.style.opacity = '0';

                                                    // Random delay between 0 and 6 seconds + 2.5s base wait time for the line to draw
                                                    const delay = (2.5 + Math.random() * 6).toFixed(1);
                                                    pulseEl.style.animation = `travelPulse 2.5s ease-in-out infinite ${delay}s`;
                                                }
                                            }, 50);
                                        }
                                    }
                                    // ---------------------------------

                                    if (isCompleted) {
                                        const length = lineEl.getTotalLength();
                                        if (length > 0) {
                                            lineEl.style.strokeDasharray = length;
                                            if (!window.animatedLines.has(lineId)) {
                                                // Define the starting length as a CSS variable for the keyframe
                                                lineEl.style.setProperty('--line-length', length);
                                                // Trigger hardware-accelerated CSS animation
                                                lineEl.style.animation = 'flowLine 2.5s ease-in-out forwards';
                                                window.animatedLines.add(lineId);
                                            } else {
                                                // Already animated in a previous render step
                                                lineEl.style.strokeDashoffset = '0';
                                            }
                                        }
                                    } else {
                                        window.animatedLines.delete(lineId);
                                    }
                                }
                            }

                            if (grid[startY] && grid[startY][startX] !== undefined) graph.grid[startY][startX].weight = 1;
                            if (grid[endY] && grid[endY][endX] !== undefined) graph.grid[endY][endX].weight = 1;
                        }
                    });
                });
            }

            function getGroupProgress(groupId) {
                if (!groupId || !OPTIONAL_GROUPS_CONFIG[groupId]) {
                    return null;
                }
                const groupConfig = OPTIONAL_GROUPS_CONFIG[groupId];
                const subjectsInGroup = nodes.filter(n => n.groupId === groupId);
                const completedHours = subjectsInGroup
                    .filter(n => n.state === 'subject-completed')
                    .reduce((sum, n) => sum + n.cht, 0);

                const requiredHours = groupConfig.requiredHours;
                const percent = requiredHours > 0 ? Math.min((completedHours / requiredHours) * 100, 100) : 0;

                return {
                    completed: completedHours,
                    required: requiredHours,
                    percent: percent
                };
            }

            function renderNodes(container, data) {
                data.forEach(node => {
                    const nodeEl = document.createElement('div');
                    nodeEl.className = `node ${node.state}`;
                    nodeEl.style.left = `${node.x}%`;
                    nodeEl.style.top = `${node.y}%`;
                    nodeEl.dataset.id = node.id;

                                        // --- Dynamic Color Inheritance ---
                if (node.dependencies && node.dependencies.length > 0) {
                    const depColors = node.dependencies.map(depId => getColorForNodeId(depId));
                    const isLocked = node.state.endsWith('-locked');
                    const isAvailable = node.state.endsWith('-available');

                    if (isLocked || isAvailable) {
                        let bgStyle = '';
                        let borderStyle = '';
                        let shadowStyle = '';

                        if (depColors.length === 1) {
                            const hue = depColors[0].hue;
                            if (isLocked) {
                                bgStyle = `hsl(${hue}, 20%, 25%)`;
                                borderStyle = `hsl(${hue}, 35%, 35%)`;
                            } else { // available
                                bgStyle = `hsl(${hue}, 70%, 45%)`;
                                borderStyle = `hsl(${hue}, 85%, 60%)`;
                                shadowStyle = `0 0 15px hsl(${hue}, 80%, 50%)`;
                            }
                        } else {
                            // Multiple dependencies -> Gradient
                            if (isLocked) {
                                const stops = depColors.map(c => `hsl(${c.hue}, 20%, 25%)`).join(', ');
                                bgStyle = `linear-gradient(135deg, ${stops})`;
                                borderStyle = `hsl(${depColors[0].hue}, 35%, 35%)`;
                            } else { // available
                                const stops = depColors.map(c => `hsl(${c.hue}, 70%, 45%)`).join(', ');
                                bgStyle = `linear-gradient(135deg, ${stops})`;
                                borderStyle = `hsl(${depColors[0].hue}, 85%, 60%)`;
                                shadowStyle = `0 0 15px hsl(${depColors[0].hue}, 80%, 50%)`;
                            }
                        }

                        // Theme styles use !important on the state background. Apply
                        // inherited colors with the same priority so a single
                        // dependency is not reset to the generic blue state color.
                        if (bgStyle.startsWith('linear-gradient')) {
                            nodeEl.style.setProperty('background-image', bgStyle, 'important');
                            nodeEl.style.setProperty('background-color', 'transparent', 'important');
                        } else {
                            nodeEl.style.setProperty('background-image', 'none', 'important');
                            nodeEl.style.setProperty('background-color', bgStyle, 'important');
                        }
                        nodeEl.style.setProperty('border-color', borderStyle, 'important');
                        if (shadowStyle) nodeEl.style.setProperty('box-shadow', shadowStyle, 'important');
                    }
                }
                // ---------------------------------

                    const nodeName = document.createElement('span');
                    nodeName.textContent = node.name;
                    nodeName.className = 'text-center font-semibold';

                    let groupProgressHTML = '';
                    if (node.groupId) {
                        const progressData = getGroupProgress(node.groupId);
                        if (progressData) {
                            const groupName = OPTIONAL_GROUPS_CONFIG[node.groupId]?.name || 'Grupo';
                            groupProgressHTML = `
                            <div class="mt-3 border-t border-gray-600 pt-2">
                                <p class="text-xs text-amber-300 font-semibold">${groupName}</p>
                                <div class="w-full bg-gray-700 rounded-full h-2.5 mt-1 border border-gray-600">
                                    <div class="bg-amber-500 h-2 rounded-full" style="width: ${progressData.percent}%"></div>
                                </div>
                                <p class="text-xs text-right text-gray-400">${progressData.completed}/${progressData.required}h (${progressData.percent.toFixed(0)}%)</p>
                            </div>
                        `;
                        }
                    }

                    const tooltip = document.createElement('div');

                    // =========================================================
                    // ==========> AQUI ESTÁ A LINHA QUE FOI CORRIGIDA <==========
                    // =========================================================
                    tooltip.className = node.state === 'subject-satisfied' ? 'tooltip tooltip-satisfied' : 'tooltip';

                    let tooltipHTML = `<strong>${node.id}</strong><p class="text-xs text-gray-300 mt-1">${node.name}</p>`;
                    if (node.state === 'subject-satisfied') {
                        tooltipHTML += `<p class="text-xs text-amber-300 font-bold mt-2">Carga horária deste grupo já foi cumprida!</p>`;
                    }
                    if (node.alternative) {
                        tooltipHTML += `<p class="text-xs text-cyan-400 mt-1">Alternativa: ${node.alternative.name} (${node.alternative.id})</p>`;
                    }
                    let colorClass = 'text-yellow-400';
                    if (node.type === 'humanities') colorClass = 'text-purple-400';
                    else if (node.type === 'optional') colorClass = 'text-red-400';
                    if (node.chs) {
                        tooltipHTML += `<p class="text-xs ${colorClass} mt-2">Período: ${node.period} | CHT: ${node.cht} | CHS: ${node.chs}</p>`;
                    } else {
                        tooltipHTML += `<p class="text-xs ${colorClass} mt-2">Período: ${node.period} | CHT: ${node.cht}</p>`;
                    }
                    tooltipHTML += groupProgressHTML;
                    tooltipHTML += `<button type="button" class="course-more-info" aria-label="Mais informações sobre ${node.name}">Mais informações</button>`;
                    tooltip.innerHTML = tooltipHTML;

                    nodeEl.appendChild(nodeName);
                    nodeEl.appendChild(tooltip);

                    const detailsButton = tooltip.querySelector('.course-more-info');
                    detailsButton?.addEventListener('pointerdown', event => event.stopPropagation());
                    detailsButton?.addEventListener('click', event => {
                        event.preventDefault();
                        event.stopPropagation();
                        loadPpcDetails().then(details => showCourseDetails(node, details[node.id])).catch(() => showCourseDetails(node, null));
                    });

                    // Mantém o card aberto durante o caminho do nó até o botão.
                    let tooltipHideTimer;
                    const cancelTooltipHide = () => {
                        clearTimeout(tooltipHideTimer);
                    };
                    const scheduleTooltipHide = () => {
                        clearTimeout(tooltipHideTimer);
                        tooltipHideTimer = setTimeout(() => {
                            if (!tooltip.matches(':hover')) tooltip.classList.remove('visible');
                        }, 600);
                    };
                    detailsButton?.addEventListener('pointerenter', cancelTooltipHide);

                    // --- NOVOS EVENT LISTENERS ---
                    nodeEl.addEventListener('mouseenter', () => {
                        cancelTooltipHide();
                        document.querySelectorAll('.node .tooltip.visible').forEach(otherTooltip => {
                            if (otherTooltip !== tooltip) otherTooltip.classList.remove('visible');
                        });
                        positionTooltip(nodeEl, tooltip);
                        tooltip.classList.add('visible');
                    });

                    nodeEl.addEventListener('mouseleave', scheduleTooltipHide);
                    tooltip.addEventListener('mouseenter', cancelTooltipHide);
                    tooltip.addEventListener('mouseleave', scheduleTooltipHide);

                    nodeEl.addEventListener('click', () => handleNodeClick(node.id));
                    nodeEl.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        handleNodeRightClick(node.id);
                    });
                    container.appendChild(nodeEl);
                });
            }

            function handleNodeRightClick(nodeId) {
                let data, prefixes;
                if (activeTree === 'main') {
                    data = nodes;
                    prefixes = { available: 'subject-available', completed: 'subject-completed', locked: 'subject-locked', inprogress: 'subject-inprogress' };
                } else if (activeTree === 'humanities') {
                    data = humanitiesNodes;
                    prefixes = { available: 'humanities-available', completed: 'humanities-completed', locked: 'humanities-locked', inprogress: 'humanities-inprogress' };
                } else {
                    data = optionalNodes;
                    prefixes = { available: 'optional-available', completed: 'optional-completed', locked: 'optional-locked', inprogress: 'optional-inprogress' };
                }

                const node = data.find(n => n.id === nodeId);
                if (!node) return;

                const originalState = node.state;

                if (node.state === prefixes.inprogress) {
                    node.state = prefixes.locked;
                    updateAllSubjectStates();
                } else {
                    node.state = prefixes.inprogress;
                    updateAllSubjectStates();
                }

                if (originalState !== node.state) {
                    renderActiveTree();
                    updateAllProgressBars();
                    saveState();
                }
            }

            function handleNodeClick(nodeId) {
                let data, prefixes;
                if (activeTree === 'main') {
                    data = nodes;
                    prefixes = { available: 'subject-available', completed: 'subject-completed', locked: 'subject-locked', inprogress: 'subject-inprogress' };
                } else if (activeTree === 'humanities') {
                    data = humanitiesNodes;
                    prefixes = { available: 'humanities-available', completed: 'humanities-completed', locked: 'humanities-locked', inprogress: 'humanities-inprogress' };
                } else {
                    data = optionalNodes;
                    prefixes = { available: 'optional-available', completed: 'optional-completed', locked: 'optional-locked', inprogress: 'optional-inprogress' };
                }

                const node = data.find(n => n.id === nodeId);
                if (!node) return;

                if (node.state === prefixes.locked) {
                    nodeToOverride = nodeId;
                    const allNodeData = [...nodes, ...humanitiesNodes, ...optionalNodes];
                    const prereqs = node.dependencies
                        .map(depId => {
                            if (depId.startsWith('Periodo:') || depId.startsWith('Período:')) return `atingir o ${depId.split(':')[1]}º período`;
                            return allNodeData.find(n => n.id === depId)?.name || depId
                        })
                        .join(', ');

                    let message = `Esta matéria (${node.name}) está bloqueada.`;
                    if (node.dependencies.length > 0) {
                        message += ` Requer: <strong style="color: var(--text-main); font-weight: 700;">${prereqs}</strong>.`;
                    }
                    message += ` Deseja liberá-la mesmo assim?`
                    modalText.innerHTML = message;
                    prerequisiteModal.classList.remove('hidden');
                    return;
                }

                const originalState = node.state;
                node.state = (node.state === prefixes.completed) ? prefixes.available : prefixes.completed;

                updateAllSubjectStates();

                if (originalState !== node.state) {
                    renderActiveTree();
                    updateAllProgressBars();
                    saveState(); // Salva o estado após a alteração
                }
            }

            function updateAllSubjectStates() {
            window.nodes = typeof nodes !== "undefined" ? nodes : [];
            window.humanitiesNodes = typeof humanitiesNodes !== "undefined" ? humanitiesNodes : [];
            window.optionalNodes = typeof optionalNodes !== "undefined" ? optionalNodes : [];
            const _tracksRef = (typeof SPECIALIZATION_TRACKS !== 'undefined') ? SPECIALIZATION_TRACKS : ((typeof SPECIALIZATION_TRACKS_M2 !== 'undefined') ? SPECIALIZATION_TRACKS_M2 : {});
            window.SPECIALIZATION_TRACKS = _tracksRef;
                // Primeiro, verifica os grupos para reverter o estado 'satisfeito' se a condição não for mais atendida
                for (const groupId in OPTIONAL_GROUPS_CONFIG) {
                    const group = OPTIONAL_GROUPS_CONFIG[groupId];
                    const subjectsInGroup = nodes.filter(n => n.groupId === groupId);
                    const completedHours = subjectsInGroup
                        .filter(n => n.state === 'subject-completed')
                        .reduce((sum, n) => sum + n.cht, 0);

                    if (completedHours < group.requiredHours) {
                        subjectsInGroup.forEach(subject => {
                            if (subject.state === 'subject-satisfied') {
                                subject.state = 'subject-locked'; // Reverte para ser recalculado
                            }
                        });
                    }
                }

                let changedInLoop;
                do {
                    changedInLoop = false;

                    nodes.forEach(subject => {
                        if (subject.override || subject.state === 'subject-completed' || subject.state === 'subject-satisfied' || subject.state === 'subject-inprogress') return;

                        const allDependenciesMet = subject.dependencies.every(depId => {
                            if (depId.startsWith('Periodo:') || depId.startsWith('Período:')) { // Verificação para período
                                const requiredPeriod = parseInt(depId.split(':')[1], 10);
                                return currentPeriod >= requiredPeriod;
                            }
                            const parentNode = nodes.find(p => p.id === depId);
                            return parentNode?.state === 'subject-completed';
                        });

                        const isPeriodAvailable = subject.period <= currentPeriod + 2;
                        const newState = (allDependenciesMet && isPeriodAvailable) ? 'subject-available' : 'subject-locked';

                        if (subject.state !== newState) {
                            subject.state = newState;
                            changedInLoop = true;
                        }
                    });

                    humanitiesNodes.forEach(subject => {
                        if (subject.override || subject.state === 'humanities-completed' || subject.state === 'humanities-inprogress') return;

                        // <<< CORREÇÃO AQUI: Lógica de dependência completa foi adicionada
                        const allDependenciesMet = subject.dependencies.every(depId => {
                            if (depId.startsWith('Periodo:') || depId.startsWith('Período:')) {
                                const requiredPeriod = parseInt(depId.split(':')[1], 10);
                                return currentPeriod >= requiredPeriod;
                            }
                            // Verifica dependências dentro da própria árvore de humanidades
                            const parentNode = humanitiesNodes.find(p => p.id === depId);
                            return parentNode?.state === 'humanities-completed';
                        });

                        const isPeriodAvailable = subject.period <= currentPeriod + 2;
                        const newState = (allDependenciesMet && isPeriodAvailable) ? 'humanities-available' : 'humanities-locked';

                        if (subject.state !== newState) {
                            subject.state = newState;
                            changedInLoop = true;
                        }
                    });

                    optionalNodes.forEach(subject => {
                        if (subject.override || subject.state === 'optional-completed' || subject.state === 'optional-inprogress') return;

                        const allDependenciesMet = subject.dependencies.every(depId => {
                            // <<< CORREÇÃO AQUI: Agora aceita "Periodo" com e sem acento
                            if (depId.startsWith('Periodo:') || depId.startsWith('Período:')) {
                                const requiredPeriod = parseInt(depId.split(':')[1], 10);
                                return currentPeriod >= requiredPeriod;
                            }
                            const parentInMain = nodes.find(p => p.id === depId);
                            if (parentInMain) return parentInMain.state === 'subject-completed';
                            const parentInOptional = optionalNodes.find(p => p.id === depId);
                            if (parentInOptional) return parentInOptional.state === 'optional-completed';
                            return false;
                        });

                        const isPeriodAvailable = subject.period <= currentPeriod + 2;
                        const newState = (allDependenciesMet && isPeriodAvailable) ? 'optional-available' : 'optional-locked';

                        if (subject.state !== newState) {
                            subject.state = newState;
                            changedInLoop = true;
                        }
                    });

                } while (changedInLoop);

                // Aplica o estado 'satisfeito' (lógica inalterada)
                for (const groupId in OPTIONAL_GROUPS_CONFIG) {
                    const group = OPTIONAL_GROUPS_CONFIG[groupId];
                    const subjectsInGroup = nodes.filter(n => n.groupId === groupId);
                    const completedHours = subjectsInGroup
                        .filter(n => n.state === 'subject-completed')
                        .reduce((sum, n) => sum + n.cht, 0);

                    if (completedHours >= group.requiredHours) {
                        subjectsInGroup.forEach(subject => {
                            if (subject.state !== 'subject-completed') {
                                subject.state = 'subject-satisfied';
                            }
                        });
                    }
                }
            }

            function updateAllProgressBars() {
                // Main progress
                const coreNodes = nodes.filter(n => n.groupId !== '[1015]');
                const completedSubjects = coreNodes.filter(s => s.state === 'subject-completed' || s.state === 'subject-satisfied').length;
                const totalProgress = coreNodes.length > 0 ? (completedSubjects / coreNodes.length) * 100 : 0;
                totalProgressBar.style.width = `${totalProgress}%`;
                totalProgressText.textContent = `${totalProgress.toFixed(1)}% (${completedSubjects}/${coreNodes.length})`;

                // Period progress (agora lendo do slider)
                const periodDisplay = document.getElementById('period-display');
                periodDisplay.textContent = `Período ${currentPeriod}`;
                // Opcional: Se quiser manter uma barra de progresso visual para o período
                const periodProgressBar = document.getElementById('period-progress-bar'); // Se você manteve a barra de progresso no HTML
                if (periodProgressBar) {
                    periodProgressBar.style.width = `${(currentPeriod / 10) * 100}%`;
                }

                // Optional/Tracks progress
                const totalCompletedOptional = optionalNodes
                    .filter(n => n.state === 'optional-completed')
                    .reduce((sum, n) => sum + n.cht, 0);
                const optionalProgress = (totalCompletedOptional / TOTAL_OPTIONAL_HOURS) * 100;
                optionalProgressBar.style.width = `${Math.min(optionalProgress, 100)}%`;
                optionalProgressText.textContent = `${totalCompletedOptional}/${TOTAL_OPTIONAL_HOURS}h (${optionalProgress.toFixed(1)}%)`;

                // Humanities progress
                const totalCompletedHumanities = humanitiesNodes
                    .filter(n => n.state === 'humanities-completed')
                    .reduce((sum, n) => sum + n.cht, 0);
                const humanitiesProgress = (totalCompletedHumanities / TOTAL_HUMANITIES_HOURS) * 100;
                humanitiesProgressBar.style.width = `${Math.min(humanitiesProgress, 100)}%`;
                humanitiesProgressText.textContent = `${totalCompletedHumanities}/${TOTAL_HUMANITIES_HOURS}h (${humanitiesProgress.toFixed(1)}%)`;

                // 5. Progresso Grupo 1015 (Administração e Economia)
                if (group1015ProgressBar && group1015ProgressText) {
                    const group1015Nodes = nodes.filter(n => n.groupId === '[1015]' && n.state === 'subject-completed');
                    const group1015Hours = group1015Nodes.reduce((sum, n) => sum + n.cht, 0);
                    const group1015Req = OPTIONAL_GROUPS_CONFIG['[1015]'] ? OPTIONAL_GROUPS_CONFIG['[1015]'].requiredHours : 120;
                    const group1015ProgressVar = group1015Req > 0 ? (group1015Hours / group1015Req) * 100 : 0;
                    group1015ProgressBar.style.width = `${Math.min(group1015ProgressVar, 100)}%`;
                    group1015ProgressText.textContent = `${group1015Hours}/${group1015Req}h (${group1015ProgressVar.toFixed(1)}%)`;
                }
                checkAndCelebrate();
            }
            // --- EVENT LISTENERS ---

            // --- Settings Logic ---
            let isGlowEnabled = storage.getItem('skillTreeGlowEnabled_M2');
            if (isGlowEnabled === null) isGlowEnabled = 'true';
            glowToggle.checked = (isGlowEnabled === 'true');
            if (!glowToggle.checked) document.body.classList.add('disable-glow');

            settingsBtn.addEventListener('click', () => settingsModal.classList.remove('hidden'));
            closeSettingsBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
            glowToggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    document.body.classList.remove('disable-glow');
                    storage.setItem('skillTreeGlowEnabled_M2', 'true');
                } else {
                    document.body.classList.add('disable-glow');
                    storage.setItem('skillTreeGlowEnabled_M2', 'false');
                }
            });

            /**
             * ## Event Listener do Reset (MODIFICADO)
             * Agora, além de chamar a inicialização, também limpa os dados salvos
             * na localStorage para garantir um reset completo.
             */
            resetButton.addEventListener('click', () => {
                // Remove os dados salvos para garantir um reset completo
                storage.removeItem('skillTreeProgress_M2');
                celebrationShown = false; // ADICIONE ESTA LINHA para permitir que a celebração ocorra novamente
                // A função initializeTree irá então rodar e, como não encontrará dados, começará do zero.
                initializeTree();
            });

            // ==============================================================
            // ==== INÍCIO DO NOVO CÓDIGO PARA A TELA DE COMEMORAÇÃO ====
            // ==============================================================

            /**
             * Verifica se todos os requisitos do curso foram atendidos.
             * Se sim, e se a celebração ainda não foi mostrada, exibe o modal e toca a música.
             */

            /**
            * FUNÇÃO DE DEPURAÇÃO: Verifica a conclusão do curso e imprime os valores no console.
            */
            function checkAndCelebrate() {
                // Se já celebrou, não faz nada
                if (celebrationShown) return;

                // --- 1. VERIFICAÇÕES BÁSICAS ---
                const completedSubjects = nodes.filter(s => s.state === 'subject-completed' || s.state === 'subject-satisfied').length;
                const totalCompletedOptional = optionalNodes.filter(n => n.state === 'optional-completed').reduce((sum, n) => sum + n.cht, 0);
                const totalCompletedHumanities = humanitiesNodes.filter(n => n.state === 'humanities-completed').reduce((sum, n) => sum + n.cht, 0);

                // Condições numéricas da M2
                const basicRequirementsMet =
                    completedSubjects >= nodes.length &&
                    totalCompletedOptional >= TOTAL_OPTIONAL_HOURS &&
                    totalCompletedHumanities >= TOTAL_HUMANITIES_HOURS;

                // --- 2. VERIFICAÇÃO DE TRILHA COMPLETA (M2) ---
                let hasCompletedTrack = false;
                let completedTrackName = '';

                // Cria conjunto de IDs completados para verificação rápida
                const completedOptionalIds = new Set(
                    optionalNodes
                        .filter(n => n.state === 'optional-completed')
                        .map(n => n.id)
                );

                // Varre APENAS as trilhas oficiais da M2 (Telecom, Bio, Pesquisa, Sinais)
                for (const [trackName, subjectIds] of Object.entries(SPECIALIZATION_TRACKS_M2)) {
                    const isTrackComplete = subjectIds.every(id => completedOptionalIds.has(id));

                    if (isTrackComplete) {
                        hasCompletedTrack = true;
                        completedTrackName = trackName;
                        break;
                    }
                }

                // Debug no console
                console.log(`Status Curso (M2):
            - Requisitos Básicos: ${basicRequirementsMet ? 'OK' : 'Pendente'}
            - Trilha Completa: ${hasCompletedTrack ? 'OK (' + completedTrackName + ')' : 'Pendente'}`);

                // --- 3. DECISÃO FINAL ---
                if (basicRequirementsMet && hasCompletedTrack) {
                    celebrationModal.classList.remove('hidden');
                    celebrationAudio.play();
                    celebrationShown = true;
                    saveState();
                }
            }

            // Adiciona o evento para o botão de fechar o modal de celebração
            closeCelebrationBtn.addEventListener('click', () => {
                celebrationModal.classList.add('hidden');
                celebrationAudio.pause(); // Pausa a música
                celebrationAudio.currentTime = 0; // Reinicia o áudio para a próxima vez
            });

            // ============================================================
            // ==== FIM DO NOVO CÓDIGO PARA A TELA DE COMEMORAÇÃO ====
            // ============================================================

            function switchTab(newTab) {
                activeTree = newTab;

                mainContainer.classList.toggle('hidden', newTab !== 'main');
                humanitiesContainer.classList.toggle('hidden', newTab !== 'humanities');
                optionalContainer.classList.toggle('hidden', newTab !== 'optional');

                tabMain.classList.toggle('active', newTab === 'main');
                tabHumanities.classList.toggle('active', newTab === 'humanities');
                tabOptional.classList.toggle('active', newTab === 'optional');

                renderActiveTree();
            }

            tabMain.addEventListener('click', () => switchTab('main'));
            tabHumanities.addEventListener('click', () => switchTab('humanities'));
            tabOptional.addEventListener('click', () => switchTab('optional'));

            cancelOverrideBtn.addEventListener('click', () => {
                prerequisiteModal.classList.add('hidden');
                nodeToOverride = null;
            });

            confirmOverrideBtn.addEventListener('click', () => {
                if (nodeToOverride) {
                    let data, availableState;

                    // Determina qual árvore está ativa
                    if (activeTree === 'main') {
                        data = nodes; availableState = 'subject-available';
                    } else if (activeTree === 'humanities') {
                        data = humanitiesNodes; availableState = 'humanities-available';
                    } else {
                        data = optionalNodes; availableState = 'optional-available';
                    }

                    const node = data.find(n => n.id === nodeToOverride);
                    if (node) {
                        // Define o estado como disponível
                        node.state = availableState;

                        // === A MUDANÇA PRINCIPAL ESTÁ AQUI ===
                        // Adicionamos uma "bandeira" para lembrar que esta regra foi quebrada.
                        node.override = true;

                        // Agora, as funções de atualização podem ser chamadas com segurança
                        updateAllSubjectStates();
                        renderActiveTree();
                        updateAllProgressBars();
                        saveState(); // Salva o estado após a alteração
                    }
                }
                prerequisiteModal.classList.add('hidden');
                nodeToOverride = null;
            });

            window.addEventListener('resize', renderActiveTree);

            const pdfUpload = document.getElementById('pdf-upload');
            const uploadStatus = document.getElementById('upload-status');

            // Configura o worker para a biblioteca pdf.js
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

            pdfUpload.addEventListener('change', handleFileSelect, false);

            async function handleFileSelect(event) {
                const file = event.target.files[0];
                if (!file || file.type !== 'application/pdf') {
                    uploadStatus.textContent = 'Por favor, selecione um arquivo PDF.';
                    uploadStatus.className = 'text-center text-red-400 h-4';
                    return;
                }

                uploadStatus.textContent = 'Processando histórico...';
                uploadStatus.className = 'text-center text-yellow-400 h-4';

                try {
                    const fileReader = new FileReader();
                    fileReader.onload = async function () {
                        try {
                            const typedarray = new Uint8Array(this.result);
                            const pdf = await pdfjsLib.getDocument(typedarray).promise;
                            let fullText = '';

                            for (let i = 1; i <= pdf.numPages; i++) {
                                const page = await pdf.getPage(i);
                                const textContent = await page.getTextContent();
                                fullText += textContent.items.map(item => item.str).join('\n');
                            }

                            // =========================================================
                            // AQUI ESTÁ A NOVA REGRA
                            // =========================================================
                            const stopPhrase = "Disciplinas Obrigatórias Faltantes";
                            const stopIndex = fullText.indexOf(stopPhrase);

                            let effectiveText = fullText;
                            if (stopIndex !== -1) {
                                console.log(`Regra de parada encontrada. O texto será lido apenas até a frase: "${stopPhrase}".`);
                                effectiveText = fullText.substring(0, stopIndex);
                            } else {
                                console.log("Regra de parada não encontrada. Lendo o documento inteiro.");
                            }
                            // =========================================================

                            console.log("--- Texto Final a ser Analisado ---", effectiveText);

                            parseHistoryAndUpdate(effectiveText);
                        } catch (e) {
                            uploadStatus.textContent = "Erro ao processar: " + e.message;
                            uploadStatus.className = "text-center text-red-400 h-4";
                            console.error("Erro interno na leitura do PDF:", e);
                        }
                    };
                    fileReader.readAsArrayBuffer(file);
                } catch (error) {
                    console.error('Erro ao processar o PDF:', error);
                    uploadStatus.textContent = 'Erro ao ler o arquivo PDF.';
                    uploadStatus.className = 'text-center text-red-400 h-4';
                }
            }

            function parseHistoryAndUpdate(text) {
                console.log("--- Iniciando Análise do Histórico (Versão Definitiva) ---");

                const approvedCodes = new Set();
                const allSubjects = [...allNodesData, ...allHumanitiesData, ...allOptionalNodesData];
                const allSubjectCodesRegexString = `(${allSubjects.map(s => s.id).join('|')})`;
                const allSubjectCodesRegex = new RegExp(allSubjectCodesRegexString, 'g');
                const firstSubjectCodeRegex = new RegExp(allSubjectCodesRegexString);

                // 1. Análise de Período
                const cleanTextForPeriod = text.replace(/\s/g, '');
                const periodMatch = cleanTextForPeriod.match(/Período:(\d+)/);
                let studentPeriod = null;
                if (periodMatch && periodMatch[1]) {
                    studentPeriod = parseInt(periodMatch[1], 10);
                    console.log('Período do Aluno Encontrado:', studentPeriod);
                } else {
                    console.log('Período do aluno não encontrado no PDF.');
                }

                // 2. Análise por Seções
                const cleanTextForHeaders = text.replace(/(\r\n|\n|\r|\s)/g, '').toLowerCase();
                const findCleanIndex = (str) => cleanTextForHeaders.indexOf(str);
                const sectionsData = [
                    { name: 'Obrigatorias', index: findCleanIndex('disciplinasobrigatóriascursadas'), mode: 'NORMAL' },
                    { name: 'EquivalentesObrigatorias', index: findCleanIndex('detalhesdasequivalentescursadasdedisciplinasobrigatórias'), mode: 'INVERTED' },
                    { name: 'Optativas', index: findCleanIndex('disciplinasoptativascursadas'), mode: 'NORMAL' },
                    { name: 'EquivalentesOptativas', index: findCleanIndex('detalhesdasequivalentescursadasdedisciplinasoptativas'), mode: 'INVERTED' },
                    { name: 'Enriquecimento', index: findCleanIndex('disciplinasdeenriquecimentocurricular'), mode: 'IGNORE' },
                    { name: 'Resumo', index: findCleanIndex('resumooptativas'), mode: 'NORMAL' }
                ];

                const originalTextIndices = {};
                for (let i = 0, cleanIndex = 0; i < text.length; i++) {
                    if (!/\s/.test(text[i])) {
                        originalTextIndices[cleanIndex++] = i;
                    }
                }
                const sections = sectionsData.filter(s => s.index !== -1).sort((a, b) => a.index - b.index);

                // 3. Processamento de cada seção com lógica aprimorada
                for (let i = 0; i < sections.length; i++) {
                    const currentSection = sections[i];
                    if (currentSection.mode === 'STOP') break;
                    if (currentSection.mode === 'IGNORE') continue;

                    const nextSection = sections[i + 1];
                    const startOriginalIndex = originalTextIndices[currentSection.index] || 0;
                    const endOriginalIndex = nextSection ? (originalTextIndices[nextSection.index] || text.length) : text.length;
                    const sectionText = text.substring(startOriginalIndex, endOriginalIndex);

                    console.log(`--- Processando Seção: ${currentSection.name} (Modo: ${currentSection.mode}) ---`);

                    if (currentSection.mode === 'NORMAL') {
                        const anySubjectCodeRegex = /\b[A-Z]{2,6}\d+[A-Z0-9]*\b/g;
                        const codesInSection = [...sectionText.matchAll(anySubjectCodeRegex)];
                        codesInSection.forEach((match, idx) => {
                            const code = match[0];
                            const startIndex = match.index;
                            const endIndex = (idx + 1 < codesInSection.length) ? codesInSection[idx + 1].index : sectionText.length;
                            const analysisBlock = sectionText.substring(startIndex, endIndex);

                            // ======================================================================
                            // <<< CORREÇÃO FINAL APLICADA AQUI >>>
                            // Remove todos os espaços e quebras de linha antes de testar a regex.
                            const cleanAnalysisBlock = analysisBlock.replace(/\s/g, '');
                            if (/Aprovado|CréditoConsignado/i.test(cleanAnalysisBlock)) {
                                // ======================================================================
                                console.log(`[Resultado] ${code} -> APROVADO`);
                                approvedCodes.add(code);
                            } else {
                                console.log(`[Resultado] ${code} -> Reprovado/Outro`);
                            }
                        });
                    } else if (currentSection.mode === 'INVERTED') {
                        const blocks = sectionText.split('=>');
                        if (blocks.length > 1) {
                            for (let j = 1; j < blocks.length; j++) {
                                const precedingBlock = blocks[j - 1];
                                const followingBlock = blocks[j];
                                const cleanPrecedingBlock = precedingBlock.replace(/\s/g, '');
                                if (/Aprovado|CréditoConsignado/i.test(cleanPrecedingBlock)) {
                                    const codeMatch = followingBlock.match(firstSubjectCodeRegex);
                                    if (codeMatch) {
                                        const approvedCode = codeMatch[0];
                                        console.log(`[Invertido] Equivalência Aprovada encontrada para: ${approvedCode}`);
                                        approvedCodes.add(approvedCode);
                                    }
                                }
                            }
                        }
                    }
                }

                console.log('--- Resumo Final ---');
                console.log('Disciplinas Aprovadas (Final):', Array.from(approvedCodes));

                // 4. Atualização da Interface (sem alterações)
                [...nodes, ...humanitiesNodes, ...optionalNodes].forEach(node => {
                    node.override = false;
                    let isApproved = approvedCodes.has(node.id);
                    if (!isApproved && node.alternative) {
                        const alternativeCodes = node.alternative.id.split(/[\/,]/).map(c => c.trim());
                        if (alternativeCodes.some(altCode => approvedCodes.has(altCode))) {
                            isApproved = true;
                        }
                    }
                    if (isApproved) {
                        node.state = node.type === 'subject' ? 'subject-completed' : (node.type === 'humanities' ? 'humanities-completed' : 'optional-completed');
                    } else {
                        node.state = node.type === 'subject' ? (node.dependencies.length === 0 ? 'subject-available' : 'subject-locked') : (node.type === 'humanities' ? 'humanities-locked' : 'optional-locked');
                    }
                });

                if (studentPeriod) {
                    currentPeriod = studentPeriod;
                    document.getElementById('period-slider').value = studentPeriod;
                }

                updateAllSubjectStates();
                renderActiveTree();
                updateAllProgressBars();
                saveState();

                uploadStatus.textContent = 'Histórico importado com sucesso!';
                uploadStatus.className = 'text-center text-green-400 h-4';
                setTimeout(() => { uploadStatus.textContent = ''; }, 5000);
            }

            // --- INITIALIZATION ---
            initializeTree();
