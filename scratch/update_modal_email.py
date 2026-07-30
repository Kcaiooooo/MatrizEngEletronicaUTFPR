import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Replace Passo 3 section
step3_old = '''                <!-- Passo 3: Envio -->
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
                </div>'''

step3_new = '''                <!-- Passo 3: Envio -->
                <div class="space-y-2.5 pt-1 border-t border-gray-800">
                    <div class="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        <span class="w-5 h-5 rounded-full bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-white text-xs">3</span>
                        <span>Envio da Matriz</span>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-300 mb-1">Faça o upload da sua matriz (PDF) *</label>
                        <input type="file" id="req-pdf-file" accept=".pdf" required class="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-xs text-gray-300 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500">
                    </div>

                    <div class="text-xs text-gray-300 bg-gray-800/70 p-2.5 rounded-lg border border-gray-700 text-center leading-relaxed">
                        <span>Qualquer dúvida me manda um e-mail: </span>
                        <a href="mailto:caiocosta281214@gmail.com" class="text-cyan-400 font-bold underline hover:text-cyan-300">caiocosta281214@gmail.com</a>
                    </div>
                </div>'''

index_html = index_html.replace(step3_old, step3_new)

# Update submit script to send to caiocosta281214@gmail.com
old_submit_js = '''        const courseName = document.getElementById('req-course-name').value.trim();
        const institution = document.getElementById('req-institution').value.trim();
        const pdfFile = document.getElementById('req-pdf-file').files[0];
        const contactInfo = document.getElementById('req-contact-info').value.trim();
        const statusMsg = document.getElementById('req-status-msg');
        const btnSubmit = document.getElementById('btn-submit-req');'''

new_submit_js = '''        const courseName = document.getElementById('req-course-name').value.trim();
        const institution = document.getElementById('req-institution').value.trim();
        const pdfFile = document.getElementById('req-pdf-file').files[0];
        const statusMsg = document.getElementById('req-status-msg');
        const btnSubmit = document.getElementById('btn-submit-req');'''

index_html = index_html.replace(old_submit_js, new_submit_js)
index_html = index_html.replace('- Contato do Aluno: ${contactInfo || \'Não informado\'}\n\n', '')
index_html = index_html.replace('mailto:caio.utfpr@gmail.com', 'mailto:caiocosta281214@gmail.com')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Updated modal with developer email caiocosta281214@gmail.com and removed optional contact field.")
