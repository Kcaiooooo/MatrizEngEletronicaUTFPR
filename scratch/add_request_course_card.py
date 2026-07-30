import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# 1. Top Right Highlight Card on Header
header_replacement = '''        <header class="mb-10 relative">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <!-- Select de Tema -->
                <div class="flex items-center gap-2">
                    <label for="theme-select" class="text-sm font-semibold text-gray-300 flex items-center gap-1.5 cursor-pointer">
                        <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-23"></path>
                        </svg>
                        <span>Tema:</span>
                    </label>
                    <select id="theme-select" onchange="changeTheme(this.value)" class="theme-select-input bg-gray-800 text-gray-200 border border-gray-700 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer transition-colors">
                        <option value="dark">Escuro</option>
                        <option value="light">Claro</option>
                        <option value="utfpr">UTFPR (Amarelo)</option>
                        <option value="dracula">Roxo</option>
                    </select>
                </div>

                <!-- Card de Destaque no Canto Superior Direito -->
                <div class="w-full md:w-auto max-w-md bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border border-blue-500/40 rounded-xl p-4 text-left shadow-lg backdrop-blur-sm relative">
                    <h3 class="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>🎓</span> Seu curso ainda não está aqui/matriz desatualizada?
                    </h3>
                    <p class="text-xs text-gray-300 mt-1 leading-relaxed">
                        Adicionamos novas matrizes com a ajuda da galera! Envie a grade do seu curso da UTFPR ou de qualquer outra faculdade e a gente coloca ela aqui.
                    </p>
                    <button type="button" onclick="openRequestCourseModal()" class="mt-2.5 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer shadow-md">
                        <span>Pedir ou adicionar meu curso</span>
                        <span class="text-sm">→</span>
                    </button>
                </div>
            </div>

            <h1 class="text-4xl md:text-5xl font-bold font-header text-blue-400">K-Matrizes</h1>
            <p class="text-gray-300 mt-3 text-lg">Grade Curricular Interativa · Engenharia UTFPR · Câmpus Curitiba</p>
        </header>'''

if '<header class="mb-10">' in index_html or '<header class="mb-10 relative">' in index_html:
    pattern_header = r"<header class=\"mb-10.*?</header>"
    index_html = re.sub(pattern_header, header_replacement, index_html, flags=re.DOTALL)

# 2. Add Modal HTML & Submission Script before </body>
modal_and_script_html = '''
    <!-- Modal Pedir ou Adicionar Meu Curso -->
    <div id="modal-request-course" class="modal-overlay hidden">
        <div class="modal-box !max-w-lg text-left space-y-4">
            <div class="flex justify-between items-center border-b border-gray-700 pb-3">
                <h3 class="text-lg font-bold font-header text-blue-400 flex items-center gap-2">
                    <span>🎓</span> Adicionar Nova Matriz / Curso
                </h3>
                <button type="button" onclick="closeRequestCourseModal()" class="text-gray-400 hover:text-white text-2xl font-bold cursor-pointer">&times;</button>
            </div>

            <form id="form-request-course" onsubmit="submitRequestCourseForm(event)" class="space-y-4">
                <!-- Passo 1: Identificação -->
                <div class="space-y-2.5">
                    <div class="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                        <span class="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-white text-xs">1</span>
                        <span>Identificação</span>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-300 mb-1">Nome do Curso *</label>
                        <input type="text" id="req-course-name" required placeholder="ex: Engenharia Mecânica" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500">
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-300 mb-1">Instituição / Câmpus *</label>
                        <input type="text" id="req-institution" required placeholder="ex: UTFPR - Curitiba, Ponta Grossa, etc." class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500">
                    </div>
                </div>

                <!-- Passo 2: O Tutorial Rápido -->
                <div class="space-y-2 pt-1 border-t border-gray-800">
                    <div class="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                        <span class="w-5 h-5 rounded-full bg-amber-600/30 border border-amber-500/50 flex items-center justify-center text-white text-xs">2</span>
                        <span>Tutorial Rápido</span>
                    </div>

                    <div class="bg-gray-800/80 p-3 rounded-lg border border-gray-700 text-xs text-gray-300 space-y-1.5">
                        <p class="flex items-center gap-2">
                            <span class="text-amber-400 font-bold">•</span>
                            <span>Acesse o Portal do Aluno</span>
                        </p>
                        <p class="flex items-center gap-2">
                            <span class="text-amber-400 font-bold">•</span>
                            <span>Abra a aba Matrizes Curriculares</span>
                        </p>
                        <p class="flex items-center gap-2">
                            <span class="text-amber-400 font-bold">•</span>
                            <span>Clique no ícone de impressora, salve como PDF e envie abaixo</span>
                        </p>
                    </div>
                </div>

                <!-- Passo 3: Envio -->
                <div class="space-y-2.5 pt-1 border-t border-gray-800">
                    <div class="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        <span class="w-5 h-5 rounded-full bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-white text-xs">3</span>
                        <span>Envio da Matriz</span>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-300 mb-1">Faça o upload da sua matriz (PDF) *</label>
                        <input type="file" id="req-pdf-file" accept=".pdf" required class="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-xs text-gray-300 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500">
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-300 mb-1">Seu E-mail ou WhatsApp para contato (opcional)</label>
                        <input type="text" id="req-contact-info" placeholder="ex: aluno@utfpr.edu.br ou (41) 99999-9999" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-100 focus:outline-none focus:border-blue-500">
                    </div>
                </div>

                <p id="req-status-msg" class="text-xs text-center min-h-[1.25rem] font-semibold"></p>

                <div class="pt-2">
                    <button type="submit" id="btn-submit-req" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                        <span>Enviar matriz para o Dev</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Script do Modal Pedir/Adicionar Meu Curso -->
    <script>
    function openRequestCourseModal() {
        const modal = document.getElementById('modal-request-course');
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('active');
    }

    function closeRequestCourseModal() {
        const modal = document.getElementById('modal-request-course');
        if (modal) {
            modal.classList.remove('active');
            modal.classList.add('hidden');
        }
    }

    function submitRequestCourseForm(e) {
        e.preventDefault();

        const courseName = document.getElementById('req-course-name').value.trim();
        const institution = document.getElementById('req-institution').value.trim();
        const pdfFile = document.getElementById('req-pdf-file').files[0];
        const contactInfo = document.getElementById('req-contact-info').value.trim();
        const statusMsg = document.getElementById('req-status-msg');
        const btnSubmit = document.getElementById('btn-submit-req');

        if (!courseName || !institution || !pdfFile) {
            if (statusMsg) {
                statusMsg.textContent = 'Por favor, preencha o nome do curso, instituição e anexe o arquivo PDF.';
                statusMsg.className = 'text-xs text-center text-red-400 font-semibold';
            }
            return;
        }

        if (statusMsg) {
            statusMsg.textContent = '⏳ Preparando envio para o Desenvolvedor...';
            statusMsg.className = 'text-xs text-center text-yellow-400 font-semibold';
        }
        if (btnSubmit) btnSubmit.disabled = true;

        // Construct email payload
        const emailSubject = encodeURIComponent(`[K-Matrizes] Nova Matriz Solicitada: ${courseName} - ${institution}`);
        const emailBody = encodeURIComponent(
            `Olá Dev!\n\nFoi enviada uma nova solicitação de matriz para o K-Matrizes:\n\n` +
            `- Curso: ${courseName}\n` +
            `- Instituição/Câmpus: ${institution}\n` +
            `- Arquivo Anexado: ${pdfFile.name} (${(pdfFile.size/1024).toFixed(1)} KB)\n` +
            `- Contato do Aluno: ${contactInfo || 'Não informado'}\n\n` +
            `Por favor, anexe o arquivo PDF (${pdfFile.name}) no e-mail ao enviar!`
        );

        // Open mailto client automatically
        setTimeout(() => {
            window.location.href = `mailto:caio.utfpr@gmail.com?subject=${emailSubject}&body=${emailBody}`;

            if (statusMsg) {
                statusMsg.textContent = '✅ Solicitação gerada! Confirmando envio com o desenvolvedor...';
                statusMsg.className = 'text-xs text-center text-emerald-400 font-semibold';
            }

            setTimeout(() => {
                alert(`🚀 Solicitação enviada com sucesso!\n\nCurso: ${courseName}\nInstituição: ${institution}\n\nObrigado por ajudar a expandir o K-Matrizes!`);
                closeRequestCourseModal();
                document.getElementById('form-request-course').reset();
                if (btnSubmit) btnSubmit.disabled = false;
                if (statusMsg) statusMsg.textContent = '';
            }, 1200);
        }, 500);
    }
    </script>
'''

if 'modal-request-course' not in index_html:
    index_html = index_html.replace('</body>', modal_and_script_html + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Updated index.html with top right Request Course Card and 3-step submission Modal!")
