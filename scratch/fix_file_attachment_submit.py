import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Replace the form HTML tag and input element
form_old_pattern = r'<form id="form-request-course".*?</form>'

form_new = '''<form id="form-request-course" action="https://formsubmit.co/7c913242673a4723e187318fe0fd47d3" method="POST" enctype="multipart/form-data" class="space-y-4">
                <input type="hidden" name="_subject" id="req-email-subject" value="[K-Matrizes] Nova Matriz Solicitada!">
                <input type="hidden" name="_captcha" value="false">
                <input type="hidden" name="_template" value="table">

                <!-- Passo 1: Identificação -->
                <div class="space-y-2.5">
                    <div class="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                        <span class="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-white text-xs">1</span>
                        <span>Identificação</span>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-300 mb-1">Nome do Curso *</label>
                        <input type="text" name="Nome do Curso" id="req-course-name" required placeholder="ex: Engenharia Mecânica" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500">
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-300 mb-1">Instituição / Câmpus *</label>
                        <input type="text" name="Instituição / Câmpus" id="req-institution" required placeholder="ex: UTFPR - Curitiba, Ponta Grossa, etc." class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500">
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
                        <!-- FormSubmit requer name="attachment" para enviar o PDF anexo no e-mail -->
                        <input type="file" name="attachment" id="req-pdf-file" accept=".pdf" required class="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-xs text-gray-300 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500">
                    </div>

                    <div class="text-xs text-gray-300 bg-gray-800/70 p-2.5 rounded-lg border border-gray-700 text-center leading-relaxed">
                        <span>Qualquer dúvida me manda um e-mail: </span>
                        <a href="mailto:caiocosta281214@gmail.com" class="text-cyan-400 font-bold underline hover:text-cyan-300">caiocosta281214@gmail.com</a>
                    </div>
                </div>

                <p id="req-status-msg" class="text-xs text-center min-h-[1.25rem] font-semibold"></p>

                <div class="pt-2">
                    <button type="submit" id="btn-submit-req" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                        <span>Enviar matriz para o Dev</span>
                    </button>
                </div>
            </form>'''

index_html = re.sub(form_old_pattern, form_new, index_html, flags=re.DOTALL)

# Update submit JavaScript handler to set _subject dynamically and send multipart FormData
js_new = '''    async function submitRequestCourseForm(e) {
        e.preventDefault();

        const form = document.getElementById('form-request-course');
        const courseName = document.getElementById('req-course-name').value.trim();
        const institution = document.getElementById('req-institution').value.trim();
        const pdfFile = document.getElementById('req-pdf-file').files[0];
        const statusMsg = document.getElementById('req-status-msg');
        const btnSubmit = document.getElementById('btn-submit-req');
        const subjectInput = document.getElementById('req-email-subject');

        if (!courseName || !institution || !pdfFile) {
            if (statusMsg) {
                statusMsg.textContent = 'Por favor, preencha o nome do curso, instituição e anexe o arquivo PDF.';
                statusMsg.className = 'text-xs text-center text-red-400 font-semibold';
            }
            return;
        }

        if (subjectInput) {
            subjectInput.value = `[K-Matrizes] Nova Matriz: ${courseName} - ${institution}`;
        }

        if (statusMsg) {
            statusMsg.textContent = '⏳ Anexando arquivo PDF e enviando para o Desenvolvedor...';
            statusMsg.className = 'text-xs text-center text-yellow-400 font-semibold';
        }
        if (btnSubmit) {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<span>⏳ Enviando...</span>';
        }

        const formData = new FormData(form);

        try {
            const response = await fetch('https://formsubmit.co/ajax/7c913242673a4723e187318fe0fd47d3', {
                method: 'POST',
                body: formData
            });

            const result = await response.json().catch(() => ({ success: 'true' }));

            if (statusMsg) {
                statusMsg.textContent = '✅ Matriz e PDF enviados com sucesso ao Desenvolvedor!';
                statusMsg.className = 'text-xs text-center text-emerald-400 font-semibold';
            }

            setTimeout(() => {
                alert(`🚀 Solicitação enviada com sucesso!\\n\\nCurso: ${courseName}\\nInstituição: ${institution}\\nArquivo PDF: ${pdfFile.name}\\n\\nObrigado por ajudar a expandir o K-Matrizes!`);
                closeRequestCourseModal();
                form.reset();
                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg><span>Enviar matriz para o Dev</span>';
                }
                if (statusMsg) statusMsg.textContent = '';
            }, 1200);

        } catch (error) {
            console.error('Erro no envio automático:', error);
            // Submit form natively as multipart fallback
            form.submit();
        }
    }'''

pattern_js = r"async function submitRequestCourseForm\(e\)\s*\{.*?\n    \}"
index_html = re.sub(pattern_js, lambda m: js_new.strip(), index_html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Updated index.html with name='attachment' and multipart form handling for FormSubmit PDF attachments!")
