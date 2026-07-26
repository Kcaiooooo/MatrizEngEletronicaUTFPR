import json
import re

with open('scratch/templates.json', 'r', encoding='utf-8') as f:
    templates = json.load(f)

templates_js = "const OFFICIAL_TEMPLATES = " + json.dumps(templates, ensure_ascii=False, indent=2) + ";\n"

with open('pages/Skill tree Custom.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Inject OFFICIAL_TEMPLATES before script logic
if 'const OFFICIAL_TEMPLATES =' not in html:
    html = html.replace("const PROFILES_LIST_KEY =", templates_js + "\n        const PROFILES_LIST_KEY =")

# 2. Update modal-prompt HTML to include template selector
old_modal_prompt = '''    <!-- Modal Generico para Prompt de Input (Nova Matriz / Renomear) -->
    <div id="modal-prompt" class="modal-overlay">
        <div class="modal-box text-left relative max-w-md">
            <h3 id="prompt-modal-title" class="text-xl font-bold text-cyan-400 mb-3">Nova Matriz</h3>
            <form id="form-prompt" class="space-y-4">
                <input type="hidden" id="prompt-action-type">
                <div>
                    <label id="prompt-label" class="block text-xs font-semibold text-gray-300 uppercase mb-1">Nome:</label>
                    <input type="text" id="prompt-input" required class="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-500">
                </div>
                <div class="flex justify-end gap-2 pt-2">
                    <button type="button" id="btn-cancel-prompt" class="bg-gray-700 hover:bg-gray-600 text-white text-xs px-4 py-2 rounded-lg">Cancelar</button>
                    <button type="submit" class="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-5 py-2 rounded-lg shadow">Confirmar</button>
                </div>
            </form>
        </div>
    </div>'''

new_modal_prompt = '''    <!-- Modal Generico para Prompt de Input (Nova Matriz / Renomear) -->
    <div id="modal-prompt" class="modal-overlay">
        <div class="modal-box text-left relative max-w-md">
            <h3 id="prompt-modal-title" class="text-xl font-bold text-cyan-400 mb-3">Nova Matriz</h3>
            <form id="form-prompt" class="space-y-4">
                <input type="hidden" id="prompt-action-type">
                <div>
                    <label id="prompt-label" class="block text-xs font-semibold text-gray-300 uppercase mb-1">Nome da Matriz:</label>
                    <input type="text" id="prompt-input" required class="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-500">
                </div>

                <div id="prompt-template-container" class="space-y-1">
                    <label class="block text-xs font-semibold text-gray-300 uppercase mb-1">Matriz de Modelo / Base:</label>
                    <select id="prompt-template-select" class="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-500">
                        <option value="eletronica_968">Engenharia Eletrônica (Matriz 968)</option>
                        <option value="eletronica_906">Engenharia Eletrônica (Matriz 906)</option>
                        <option value="eletrica_979">Engenharia Elétrica (Matriz 979)</option>
                        <option value="automacao_978">Controle e Automação (Matriz 978)</option>
                        <option value="mecatronica_973">Engenharia Mecatrônica (Matriz 973)</option>
                        <option value="blank">Matriz em Branco (Do Zero)</option>
                    </select>
                    <p class="text-[11px] text-gray-400 pt-0.5">Todas as disciplinas e requisitos da matriz selecionada serão carregados como base.</p>
                </div>

                <div class="flex justify-end gap-2 pt-2">
                    <button type="button" id="btn-cancel-prompt" class="bg-gray-700 hover:bg-gray-600 text-white text-xs px-4 py-2 rounded-lg">Cancelar</button>
                    <button type="submit" class="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-5 py-2 rounded-lg shadow">Confirmar</button>
                </div>
            </form>
        </div>
    </div>'''

if old_modal_prompt in html:
    html = html.replace(old_modal_prompt, new_modal_prompt)

# 3. Update openPromptModal to show/hide template container
old_open_prompt = '''        function openPromptModal(actionType, title, defaultVal = '', targetId = '') {
            document.getElementById('prompt-action-type').value = actionType;
            document.getElementById('prompt-modal-title').innerText = title;
            document.getElementById('prompt-input').value = defaultVal;
            modalPrompt.setAttribute('data-target-id', targetId);
            modalPrompt.classList.add('active');
            setTimeout(() => document.getElementById('prompt-input').focus(), 50);
        }'''

new_open_prompt = '''        function openPromptModal(actionType, title, defaultVal = '', targetId = '') {
            document.getElementById('prompt-action-type').value = actionType;
            document.getElementById('prompt-modal-title').innerText = title;
            document.getElementById('prompt-input').value = defaultVal;
            modalPrompt.setAttribute('data-target-id', targetId);

            const tmplContainer = document.getElementById('prompt-template-container');
            if (actionType === 'new-profile') {
                tmplContainer.classList.remove('hidden');
            } else {
                tmplContainer.classList.add('hidden');
            }

            modalPrompt.classList.add('active');
            setTimeout(() => document.getElementById('prompt-input').focus(), 50);
        }'''

if old_open_prompt in html:
    html = html.replace(old_open_prompt, new_open_prompt)

# 4. Update form-prompt submit handler
old_submit_prompt = '''            if (actionType === 'new-profile') {
                const newProf = createDefaultProfile('prof_' + Date.now(), val);
                profilesList.push(newProf);
                activeProfile = newProf;
                saveAppData();
                renderProfileSelector();
                renderTabsBar();
                renderHourTrackers();
                renderTree();
            }'''

new_submit_prompt = '''            if (actionType === 'new-profile') {
                const templateKey = document.getElementById('prompt-template-select').value;
                let newSubs = [];
                if (templateKey && OFFICIAL_TEMPLATES[templateKey]) {
                    newSubs = OFFICIAL_TEMPLATES[templateKey].map(s => Object.assign({}, s));
                } else {
                    newSubs = [
                        { id: 'MAT1', name: 'CÁLCULO 1', period: 1, cht: 60, dependencies: [], tabId: 'tab_mandatory' },
                        { id: 'FIS1', name: 'FÍSICA 1', period: 1, cht: 60, dependencies: [], tabId: 'tab_mandatory' }
                    ];
                }

                const initialStates = {};
                newSubs.forEach(s => {
                    if (!s.dependencies || s.dependencies.length === 0) {
                        initialStates[s.id] = 'subject-available';
                    } else {
                        initialStates[s.id] = 'subject-locked';
                    }
                });

                const newProf = {
                    id: 'prof_' + Date.now(),
                    name: val,
                    activeTabId: 'tab_mandatory',
                    tabs: [
                        { id: 'tab_mandatory', name: 'Obrigatórias' },
                        { id: 'tab_optional', name: 'Optativas / Trilhas' },
                        { id: 'tab_humanities', name: 'Humanidades & Extensão' }
                    ],
                    subjects: newSubs,
                    subjectStates: initialStates,
                    hourTrackers: [
                        { id: 'tracker_cce', name: 'Horas de Extensão (CCE)', targetHours: 420, entries: [] },
                        { id: 'tracker_ac', name: 'Horas Complementares (AC)', targetHours: 15, entries: [] }
                    ]
                };

                profilesList.push(newProf);
                activeProfile = newProf;
                saveAppData();
                renderProfileSelector();
                renderTabsBar();
                renderHourTrackers();
                renderTree();
            }'''

if old_submit_prompt in html:
    html = html.replace(old_submit_prompt, new_submit_prompt)

with open('pages/Skill tree Custom.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated Skill tree Custom.html with official template options!")
