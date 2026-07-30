import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

new_submit_func = '''    async function submitRequestCourseForm(e) {
        e.preventDefault();

        const courseName = document.getElementById('req-course-name').value.trim();
        const institution = document.getElementById('req-institution').value.trim();
        const pdfFile = document.getElementById('req-pdf-file').files[0];
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
            statusMsg.textContent = '⏳ Enviando matriz diretamente para o Desenvolvedor...';
            statusMsg.className = 'text-xs text-center text-yellow-400 font-semibold';
        }
        if (btnSubmit) {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<span>⏳ Enviando...</span>';
        }

        // Prepare AJAX FormData for automatic background delivery without opening email client
        const formData = new FormData();
        formData.append('_subject', `[K-Matrizes] Nova Matriz Solicitada: ${courseName} - ${institution}`);
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');
        formData.append('Curso', courseName);
        formData.append('Instituição / Câmpus', institution);
        formData.append('Arquivo Matriz PDF', pdfFile);

        try {
            const response = await fetch('https://formsubmit.co/ajax/caiocosta281214@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json().catch(() => ({ success: 'true' }));

            if (statusMsg) {
                statusMsg.textContent = '✅ Matriz enviada com sucesso ao Desenvolvedor!';
                statusMsg.className = 'text-xs text-center text-emerald-400 font-semibold';
            }

            setTimeout(() => {
                alert(`🚀 Solicitação enviada com sucesso!\\n\\nCurso: ${courseName}\\nInstituição: ${institution}\\n\\nObrigado por ajudar a expandir o K-Matrizes!`);
                closeRequestCourseModal();
                document.getElementById('form-request-course').reset();
                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg><span>Enviar matriz para o Dev</span>';
                }
                if (statusMsg) statusMsg.textContent = '';
            }, 1200);

        } catch (error) {
            console.error('Erro no envio automático via Fetch:', error);

            // Fallback for offline/adblockers: use mailto link
            const emailSubject = encodeURIComponent(`[K-Matrizes] Nova Matriz: ${courseName} - ${institution}`);
            const emailBody = encodeURIComponent(`Olá Dev!\\n\\nNova solicitação de matriz:\\n- Curso: ${courseName}\\n- Instituição: ${institution}\\n- Arquivo: ${pdfFile.name}`);
            window.location.href = `mailto:caiocosta281214@gmail.com?subject=${emailSubject}&body=${emailBody}`;

            if (btnSubmit) {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg><span>Enviar matriz para o Dev</span>';
            }
            if (statusMsg) statusMsg.textContent = '';
            closeRequestCourseModal();
        }
    }'''

pattern_func = r"function submitRequestCourseForm\(e\)\s*\{.*?\n    \}"
index_html = re.sub(pattern_func, new_submit_func, index_html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Configured automatic background email submission for request course modal on index.html!")
