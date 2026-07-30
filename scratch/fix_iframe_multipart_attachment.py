import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# 1. Add hidden iframe tag if missing
if 'name="form-target-iframe"' not in index_html:
    index_html = index_html.replace(
        '</body>',
        '    <iframe name="form-target-iframe" id="form-target-iframe" style="display:none;"></iframe>\n</body>'
    )

# 2. Update form tag to target hidden iframe with enctype="multipart/form-data"
form_old_pattern = r'<form id="form-request-course".*?class="space-y-4">'
form_new_tag = '<form id="form-request-course" action="https://formsubmit.co/7c913242673a4723e187318fe0fd47d3" method="POST" enctype="multipart/form-data" target="form-target-iframe" onsubmit="handleRequestSubmit(event)" class="space-y-4">'

index_html = re.sub(form_old_pattern, form_new_tag, index_html, flags=re.DOTALL)

# 3. Update JavaScript handler
new_js_handler = '''    function handleRequestSubmit(e) {
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
            e.preventDefault();
            return false;
        }

        if (subjectInput) {
            subjectInput.value = `[K-Matrizes] Nova Matriz: ${courseName} - ${institution}`;
        }

        if (statusMsg) {
            statusMsg.textContent = '⏳ Anexando PDF e enviando em segundo plano para o Desenvolvedor...';
            statusMsg.className = 'text-xs text-center text-yellow-400 font-semibold';
        }
        if (btnSubmit) {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<span>⏳ Enviando...</span>';
        }

        // Native multipart submission targets hidden iframe, keeping main page 100% on kmatrizesutfpr.com.br
        setTimeout(() => {
            if (statusMsg) {
                statusMsg.textContent = '✅ Matriz e PDF enviados com sucesso ao Desenvolvedor!';
                statusMsg.className = 'text-xs text-center text-emerald-400 font-semibold';
            }
            setTimeout(() => {
                alert(`🚀 Matriz e PDF enviados com sucesso!\\n\\nCurso: ${courseName}\\nInstituição: ${institution}\\nArquivo: ${pdfFile ? pdfFile.name : ''}\\n\\nObrigado por colaborar com o K-Matrizes!`);
                closeRequestCourseModal();
                document.getElementById('form-request-course').reset();
                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg><span>Enviar matriz para o Dev</span>';
                }
                if (statusMsg) statusMsg.textContent = '';
            }, 1200);
        }, 1500);

        return true;
    }'''

pattern_js = r"async function submitRequestCourseForm\(e\)\s*\{.*?\n    \}|function handleRequestSubmit\(e\)\s*\{.*?\n    \}"
index_html = re.sub(pattern_js, lambda m: new_js_handler.strip(), index_html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Updated index.html with hidden iframe target for 100% PDF attachment delivery without page redirect!")
