import re

# -------------------------------------------------------------
# 1. UPDATE INDEX.HTML WITH HERO IMPORTER & PRIVACY NOTICE
# -------------------------------------------------------------

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Add PDF.js script tag to index.html if missing
if 'pdf.min.js' not in index_html:
    index_html = index_html.replace(
        '<script src="https://cdn.tailwindcss.com"></script>',
        '<script src="https://cdn.tailwindcss.com"></script>\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>'
    )

hero_section = '''        <main>
            <!-- Banner Hero - Destaque do Importador de Histórico -->
            <div class="relative overflow-hidden bg-gradient-to-r from-blue-900/50 via-indigo-900/60 to-purple-900/50 border border-blue-500/40 rounded-2xl p-6 md:p-8 mb-10 shadow-2xl backdrop-blur-sm text-center">
                <div class="max-w-3xl mx-auto space-y-4">
                    <div class="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        ⚡ Importador Instantâneo de Histórico
                    </div>
                    
                    <h2 class="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-header">
                        Cole seu histórico da UTFPR aqui e veja em <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">5 segundos</span> quanto falta para se formar 🎓
                    </h2>
                    
                    <p class="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
                        Envie o arquivo PDF do seu histórico acadêmico da UTFPR. O K-Matrizes lerá suas matérias concluídas e atualizará sua matriz automaticamente!
                    </p>

                    <!-- Botão de Ação -->
                    <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <label for="hero-pdf-upload" class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2.5 text-base cursor-pointer">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                            <span>Importar Histórico (PDF)</span>
                        </label>
                        <input type="file" id="hero-pdf-upload" accept=".pdf" class="hidden">
                    </div>

                    <!-- Status da Importação -->
                    <p id="hero-upload-status" class="text-xs text-amber-300 min-h-[1.25rem] font-medium"></p>

                    <!-- Aviso de Privacidade e Segurança -->
                    <div class="pt-1 flex items-center justify-center gap-2 text-xs text-emerald-400/90 bg-emerald-950/40 border border-emerald-800/40 px-4 py-2 rounded-xl max-w-xl mx-auto text-left sm:text-center">
                        <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        <span><strong>🔒 Privacidade 100% Garantida:</strong> Seu histórico é processado localmente no seu próprio navegador. Nenhum dado é enviado ou salvo em servidores.</span>
                    </div>
                </div>
            </div>

            <p class="mb-8 text-xl font-semibold text-gray-200">Ou selecione manualmente a matriz curricular que você deseja visualizar:</p>'''

if '<!-- Banner Hero - Destaque do Importador de Histórico -->' not in index_html:
    index_html = index_html.replace('<main>\n            <p class="mb-8 text-xl">Selecione a matriz curricular que você deseja visualizar:</p>', hero_section)

# Hero PDF Upload Script logic for index.html
hero_script = '''
    <!-- Script do Importador Hero e PDF.js na Home -->
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        if (window.pdfjsLib) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }

        const heroUpload = document.getElementById('hero-pdf-upload');
        const heroStatus = document.getElementById('hero-upload-status');

        if (heroUpload) {
            heroUpload.addEventListener('change', async function(e) {
                const file = e.target.files[0];
                if (!file || file.type !== 'application/pdf') {
                    if (heroStatus) heroStatus.textContent = 'Por favor, selecione um arquivo PDF válido.';
                    return;
                }

                if (heroStatus) heroStatus.textContent = '⏳ Lendo e processando seu histórico...';

                try {
                    const reader = new FileReader();
                    reader.onload = async function() {
                        try {
                            const typedarray = new Uint8Array(this.result);
                            const pdf = await pdfjsLib.getDocument(typedarray).promise;
                            let fullText = '';
                            for (let i = 1; i <= pdf.numPages; i++) {
                                const page = await pdf.getPage(i);
                                const content = await page.getTextContent();
                                fullText += content.items.map(item => item.str).join('\\n');
                            }

                            // Detect Course Matrix
                            let targetPage = 'pages/Skill tree M3.html';
                            const upper = fullText.toUpperCase();
                            if (upper.includes('906') || (upper.includes('ELETRÔNICA') && upper.includes('2019'))) {
                                targetPage = 'pages/Skill tree M2.html';
                            } else if (upper.includes('ELÉTRICA') || upper.includes('979')) {
                                targetPage = 'pages/Skill tree Eletrica.html';
                            } else if (upper.includes('AUTOMAÇÃO') || upper.includes('978')) {
                                targetPage = 'pages/Skill tree Automacao.html';
                            } else if (upper.includes('MECATRÔNICA') || upper.includes('973')) {
                                targetPage = 'pages/Skill tree Mecatronica.html';
                            }

                            localStorage.setItem('kmatrizes_pending_pdf_import', fullText);
                            if (heroStatus) heroStatus.textContent = '✅ Histórico processado com sucesso! Redirecionando...';
                            setTimeout(() => {
                                window.location.href = targetPage + '?autoImport=true';
                            }, 800);
                        } catch(err) {
                            if (heroStatus) heroStatus.textContent = 'Erro ao ler o PDF: ' + err.message;
                        }
                    };
                    reader.readAsArrayBuffer(file);
                } catch(err) {
                    if (heroStatus) heroStatus.textContent = 'Erro ao carregar arquivo.';
                }
            });
        }
    });
    </script>
'''

if '<!-- Script do Importador Hero e PDF.js na Home -->' not in index_html:
    index_html = index_html.replace('</body>', hero_script + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Updated index.html with Hero Importer, Privacy Guarantee notice, and PDF reader!")
