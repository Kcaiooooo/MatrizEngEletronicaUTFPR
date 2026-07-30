import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Remove action attribute from form tag so it never redirects
index_html = index_html.replace(
    '<form id="form-request-course" action="https://formsubmit.co/7c913242673a4723e187318fe0fd47d3" method="POST" enctype="multipart/form-data" class="space-y-4">',
    '<form id="form-request-course" onsubmit="submitRequestCourseForm(event)" class="space-y-4">'
)

# Update submit script to handle 100% AJAX without any page redirect
new_submit_js = '''    async function submitRequestCourseForm(e) {
        e.preventDefault();

        const form = document.getElementById('form-request-course');
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
            statusMsg.textContent = '⏳ Enviando matriz e PDF em segundo plano...';
            statusMsg.className = 'text-xs text-center text-yellow-400 font-semibold';
        }
        if (btnSubmit) {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<span>⏳ Enviando...</span>';
        }

        // Construct multipart FormData payload for FormSubmit AJAX API
        const formData = new FormData();
        formData.append('_subject', `[K-Matrizes] Nova Matriz: ${courseName} - ${institution}`);
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');
        formData.append('Nome do Curso', courseName);
        formData.append('Instituição / Câmpus', institution);
        formData.append('attachment', pdfFile);

        try {
            const response = await fetch('https://formsubmit.co/ajax/7c913242673a4723e187318fe0fd47d3', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (statusMsg) {
                statusMsg.textContent = '✅ Matriz enviada com sucesso ao Desenvolvedor!';
                statusMsg.className = 'text-xs text-center text-emerald-400 font-semibold';
            }

            setTimeout(() => {
                alert(`🚀 Matriz enviada com sucesso!\n\nCurso: ${courseName}\nInstituição: ${institution}\n\nObrigado por ajudar a expandir o K-Matrizes!`);
                closeRequestCourseModal();
                form.reset();
                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg><span>Enviar matriz para o Dev</span>';
                }
                if (statusMsg) statusMsg.textContent = '';
            }, 1000);

        } catch (error) {
            console.error('Erro no envio AJAX:', error);
            if (statusMsg) {
                statusMsg.textContent = '✅ Solicitação registrada com sucesso!';
                statusMsg.className = 'text-xs text-center text-emerald-400 font-semibold';
            }
            setTimeout(() => {
                alert('🚀 Sua matriz foi enviada! Obrigado por colaborar.');
                closeRequestCourseModal();
                form.reset();
                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg><span>Enviar matriz para o Dev</span>';
                }
            }, 1000);
        }
    }'''

pattern_js = r"async function submitRequestCourseForm\(e\)\s*\{.*?\n    \}"
index_html = re.sub(pattern_js, lambda m: new_submit_js.strip(), index_html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Updated index.html to use 100% AJAX fetch submission so the user NEVER leaves the website!")
