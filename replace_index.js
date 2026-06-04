const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const regexToReplace = /<main>[\s\S]*?<\/main>/;

const newMain = `<main>
            <p class="mb-6 text-xl">Selecione a matriz curricular que você deseja visualizar:</p>

            <div class="flex justify-center mb-8 gap-4">
                <button id="tab-official" class="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold transition-colors">Oficiais</button>
                <button id="tab-community" class="px-6 py-2 rounded-full bg-slate-700 text-gray-300 font-semibold hover:bg-slate-600 transition-colors">Comunidade</button>
            </div>

            <!-- Matrizes Oficiais -->
            <div id="grid-official" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
                
                <div class="selection-card border-cyan-500/30">
                    <h2 class="text-2xl font-bold font-header text-cyan-400 mb-3">Engenharia Eletrônica (906)</h2>
                    <p class="mb-6 text-gray-400 flex-1">Matriz curricular do curso de Engenharia Eletrônica para ingressantes antes de 2023 (Matriz 906).</p>
                    <a href="pages/Skill tree M2.html" class="selection-button !bg-cyan-600 hover:!bg-cyan-700 mt-auto">
                        Acessar Eletrônica (906)
                    </a>
                </div>

                <div class="selection-card border-blue-500/30">
                    <h2 class="text-2xl font-bold font-header text-blue-400 mb-3">Engenharia Eletrônica (968)</h2>
                    <p class="mb-6 text-gray-400 flex-1">Matriz curricular do curso de Engenharia Eletrônica para ingressantes a partir de 2023 (Matriz 968).</p>
                    <a href="pages/Skill tree M3.html" class="selection-button !bg-blue-600 hover:!bg-blue-700 mt-auto">
                        Acessar Eletrônica (968)
                    </a>
                </div>

                <div class="selection-card border-amber-500/30">
                    <h2 class="text-2xl font-bold font-header text-amber-400 mb-3">Engenharia Elétrica (979)</h2>
                    <p class="mb-6 text-gray-400 flex-1">Matriz curricular do curso de Engenharia Elétrica (Matriz 979).</p>
                    <a href="pages/Skill tree Eletrica.html" class="selection-button bg-amber-600 hover:bg-amber-700 mt-auto">
                        Acessar Elétrica
                    </a>
                </div>

                <div class="selection-card border-emerald-500/30">
                    <h2 class="text-2xl font-bold font-header text-emerald-400 mb-3">Controle e Automação (978)</h2>
                    <p class="mb-6 text-gray-400 flex-1">Matriz curricular do curso de Engenharia de Controle e Automação (Matriz 978).</p>
                    <a href="pages/Skill tree Automacao.html" class="selection-button bg-emerald-600 hover:bg-emerald-700 mt-auto">
                        Acessar Controle e Automação
                    </a>
                </div>

            </div>

            <!-- Matrizes da Comunidade -->
            <div id="grid-community" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 hidden">
                <div class="selection-card border-dashed border-2 border-slate-500 justify-center items-center hover:border-cyan-400 hover:bg-slate-800 cursor-pointer transition-all group" onclick="window.location.href='pages/Editor.html'">
                    <svg class="w-12 h-12 text-slate-400 group-hover:text-cyan-400 mb-4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    <h2 class="text-xl font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">Criar Nova Matriz</h2>
                    <p class="text-sm text-slate-500 mt-2 text-center">Construa sua própria árvore de habilidades e publique na comunidade.</p>
                </div>
                <!-- Container para injetar matrizes carregadas via JS -->
            </div>
        </main>
        
        <script type="module">
            import { getMatricesList } from './assets/firebase-config.js';

            const tabOfficial = document.getElementById('tab-official');
            const tabCommunity = document.getElementById('tab-community');
            const gridOfficial = document.getElementById('grid-official');
            const gridCommunity = document.getElementById('grid-community');

            function switchTab(tab) {
                if (tab === 'official') {
                    gridOfficial.classList.remove('hidden');
                    gridCommunity.classList.add('hidden');
                    tabOfficial.classList.replace('bg-slate-700', 'bg-blue-600');
                    tabOfficial.classList.replace('text-gray-300', 'text-white');
                    tabCommunity.classList.replace('bg-blue-600', 'bg-slate-700');
                    tabCommunity.classList.replace('text-white', 'text-gray-300');
                } else {
                    gridOfficial.classList.add('hidden');
                    gridCommunity.classList.remove('hidden');
                    tabCommunity.classList.replace('bg-slate-700', 'bg-blue-600');
                    tabCommunity.classList.replace('text-gray-300', 'text-white');
                    tabOfficial.classList.replace('bg-blue-600', 'bg-slate-700');
                    tabOfficial.classList.replace('text-white', 'text-gray-300');
                    loadCommunityMatrices();
                }
            }

            tabOfficial.addEventListener('click', () => switchTab('official'));
            tabCommunity.addEventListener('click', () => switchTab('community'));

            let communityLoaded = false;
            async function loadCommunityMatrices() {
                if (communityLoaded) return;
                
                try {
                    const matrices = await getMatricesList();
                    matrices.forEach(matrix => {
                        const card = document.createElement('div');
                        card.className = "selection-card border-purple-500/30";
                        const desc = matrix.nodes ? \`\${matrix.nodes.length} disciplinas cadastradas.\` : "Matriz customizada.";
                        card.innerHTML = \`
                            <h2 class="text-2xl font-bold font-header text-purple-400 mb-3">\${matrix.name}</h2>
                            <p class="mb-6 text-gray-400 flex-1">\${desc}</p>
                            <a href="pages/Skill tree Custom.html?id=\${matrix.id}" class="selection-button bg-purple-600 hover:bg-purple-700 mt-auto">
                                Acessar Matriz
                            </a>
                        \`;
                        gridCommunity.appendChild(card);
                    });
                    communityLoaded = true;
                } catch (e) {
                    console.error("Erro ao carregar matrizes da comunidade", e);
                }
            }
        </script>`;

content = content.replace(regexToReplace, newMain);
fs.writeFileSync('index.html', content);
