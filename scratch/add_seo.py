import os
import glob

SEO_CONTENT = """
    <!-- =====================================================
         SEÇÃO DE CONTEÚDO PARA SEO / ADSENSE
         ===================================================== -->
    <section class="max-w-7xl mx-auto px-4 mt-12 mb-8 text-gray-400 text-sm leading-relaxed text-justify bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
        <h2 class="text-lg font-bold text-gray-300 mb-3 text-center">Sobre o curso e a grade curricular interativa</h2>
        <p class="mb-3">
            O <strong>K-Matrizes</strong> oferece uma visualização interativa e completa da grade curricular dos cursos de Engenharia da <strong>Universidade Tecnológica Federal do Paraná (UTFPR)</strong> - Câmpus Curitiba. Esta página funciona como um mapa visual (ou <em>skill tree</em>) das disciplinas, permitindo aos alunos acompanhar o progresso acadêmico, identificar pré-requisitos e planejar os próximos semestres de forma estratégica.
        </p>
        <p class="mb-3">
            Através da nossa plataforma, os estudantes podem interagir diretamente com o fluxograma, marcando disciplinas aprovadas e visualizando instantaneamente quais matérias foram desbloqueadas. O sistema leva em consideração a carga horária de atividades complementares, disciplinas optativas e estágios obrigatórios, ajudando a evitar atrasos na formação e garantindo uma melhor gestão do tempo durante o curso de engenharia.
        </p>
        <p>
            Além de facilitar a organização pessoal, o uso de uma matriz curricular interativa reduz a confusão comum com as quebras de pré-requisitos e co-requisitos. A ferramenta foi projetada para ser leve, responsiva e intuitiva, sendo uma alternativa moderna e eficiente aos tradicionais fluxogramas em PDF distribuídos pela universidade. Aproveite todos os recursos para otimizar sua jornada acadêmica rumo à formatura!
        </p>
    </section>
"""

def main():
    pages_dir = 'pages'
    files = glob.glob(os.path.join(pages_dir, 'Skill tree *.html'))
    
    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if "SEÇÃO DE CONTEÚDO PARA SEO" in content:
            print(f"Skipping {filepath}, already has SEO content.")
            continue
            
        # Insert before the footer
        footer_tag = '<footer class="bg-gray-900'
        if footer_tag in content:
            content = content.replace(footer_tag, SEO_CONTENT + '\n' + footer_tag)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
        else:
            print(f"Could not find footer tag in {filepath}")

if __name__ == '__main__':
    main()
