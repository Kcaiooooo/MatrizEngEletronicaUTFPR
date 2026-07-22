import os
import re

def get_modal_html(pix_path):
    return f"""
    <!-- =====================================================
         MODAL DE DOAÇÃO (POPUP DE ABERTURA)
         ===================================================== -->
    <div id="modal-doacao" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-label="Apoie o K-Matrizes">
        <div class="modal-box text-left relative max-w-md w-[92%] p-6 md:p-7 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl z-[1000]">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-amber-400 font-header flex items-center gap-2">
                    🎓 Apoie o K-Matrizes!
                </h3>
                <button id="btn-close-doacao-x" class="text-gray-400 hover:text-white text-2xl leading-none font-bold px-2 py-1">&times;</button>
            </div>

            <div class="space-y-3 text-gray-300 text-sm leading-relaxed mb-5">
                <p>Olá, colega acadêmico(a)! 👋</p>
                <p>
                    Me chamo <strong class="text-white">Caio</strong>, sou estudante de Engenharia Eletrônica na UTFPR e criei o <strong class="text-white">K-Matrizes</strong> de forma 100% independente no meu tempo livre para facilitar o planejamento de grade de todos nós.
                </p>
                <p>
                    A plataforma é e sempre será <strong class="text-emerald-400">gratuita e de código aberto</strong>. No entanto, manter a ferramenta atualizada, com novas matrizes e hospedagem, exige tempo e dedicação constante.
                </p>
                <p>
                    Se o K-Matrizes te ajudou a organizar o seu semestre, considere fazer uma contribuição de <strong class="text-amber-300 font-semibold">qualquer valor (até mesmo R$ 1,00 ajuda demais!)</strong> via Pix.
                </p>
            </div>

            <div class="bg-gray-900/80 border border-gray-700/80 rounded-xl p-4 text-center mb-5">
                <img src="{pix_path}" alt="QR Code PIX Doação" class="w-36 h-36 mx-auto rounded-lg border border-gray-600 shadow-md mb-3">
                <p class="text-xs text-gray-400 mb-2">Chave PIX (E-mail):</p>
                <div class="flex items-center justify-center gap-2">
                    <span id="pix-key-text" class="text-amber-400 font-mono bg-gray-800 px-3 py-1.5 rounded-lg text-xs md:text-sm border border-gray-700 select-all font-semibold">
                        caiocosta281214@gmail.com
                    </span>
                    <button id="btn-copy-pix" class="bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z"/></svg>
                        <span id="copy-btn-label">Copiar</span>
                    </button>
                </div>
            </div>

            <div class="flex justify-end pt-1">
                <button id="btn-close-doacao" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25">
                    Continuar para o site ➔
                </button>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {{
            const modalDoacao = document.getElementById('modal-doacao');
            const btnCloseDoacao = document.getElementById('btn-close-doacao');
            const btnCloseDoacaoX = document.getElementById('btn-close-doacao-x');
            const btnCopyPix = document.getElementById('btn-copy-pix');
            const copyBtnLabel = document.getElementById('copy-btn-label');
            const pixKeyText = 'caiocosta281214@gmail.com';

            const today = new Date().toISOString().slice(0, 10);
            const lastSeen = localStorage.getItem('kmatrizes_doacao_seen_date');

            if (modalDoacao && lastSeen !== today) {{
                setTimeout(() => {{
                    modalDoacao.classList.remove('hidden');
                    modalDoacao.classList.add('active');
                }}, 400);
            }}

            const closeModal = () => {{
                if (modalDoacao) {{
                    modalDoacao.classList.remove('active');
                    modalDoacao.classList.add('hidden');
                    localStorage.setItem('kmatrizes_doacao_seen_date', today);
                }}
            }};

            if (btnCloseDoacao) btnCloseDoacao.addEventListener('click', closeModal);
            if (btnCloseDoacaoX) btnCloseDoacaoX.addEventListener('click', closeModal);
            if (modalDoacao) {{
                modalDoacao.addEventListener('click', (e) => {{
                    if (e.target === modalDoacao) closeModal();
                }});
            }}

            if (btnCopyPix) {{
                btnCopyPix.addEventListener('click', () => {{
                    navigator.clipboard.writeText(pixKeyText).then(() => {{
                        if (copyBtnLabel) copyBtnLabel.textContent = 'Copiado!';
                        btnCopyPix.classList.remove('bg-amber-600', 'hover:bg-amber-500');
                        btnCopyPix.classList.add('bg-green-600', 'hover:bg-green-500');
                        setTimeout(() => {{
                            if (copyBtnLabel) copyBtnLabel.textContent = 'Copiar';
                            btnCopyPix.classList.remove('bg-green-600', 'hover:bg-green-500');
                            btnCopyPix.classList.add('bg-amber-600', 'hover:bg-amber-500');
                        }}, 2000);
                    }}).catch(err => {{
                        console.error('Erro ao copiar:', err);
                    }});
                }});
            }}
        }});
    </script>
"""

def update_file(filepath, pix_path):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    modal_html = get_modal_html(pix_path)

    # Clean previous modal-doacao if present
    content = re.sub(
        r'<!-- =+.*?MODAL DE DOAÇÃO.*?=+ -->\s*<div id="modal-doacao".*?</script>',
        '',
        content,
        flags=re.DOTALL
    )

    # Add helper CSS rule for modal-overlay active/hidden if missing
    css_extra = """
        .modal-overlay.hidden {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }
        .modal-overlay.active {
            opacity: 1 !important;
            pointer-events: auto !important;
            display: flex !important;
        }
    """
    if ".modal-overlay.hidden" not in content:
        content = content.replace("</style>", css_extra + "\n</style>", 1)

    # Insert before </body>
    if "</body>" in content:
        content = content.replace("</body>", modal_html + "\n</body>")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath} with donation modal.")

def main():
    update_file('index.html', 'assets/imagens/PIX.png')
    
    pages_dir = 'pages'
    for filename in os.listdir(pages_dir):
        if filename.startswith('Skill tree') and filename.endswith('.html'):
            filepath = os.path.join(pages_dir, filename)
            update_file(filepath, '../assets/imagens/PIX.png')

if __name__ == '__main__':
    main()
