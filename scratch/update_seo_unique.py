import re
import os

SEO_DATA = {
    "Skill tree Automacao.html": {
        "title": "Sobre o curso de Engenharia de Controle e Automação (Matriz 978 - UTFPR)",
        "paragraphs": [
            "A grade curricular de <strong>Engenharia de Controle e Automação (Matriz 978)</strong> da UTFPR Câmpus Curitiba é estruturada para capacitar o estudante na integração de sistemas mecânicos, eletrônicos e de computação para a automação de processos industriais. Esta ferramenta interativa permite visualizar a progressão por períodos, mapeando desde o ciclo básico em Matemática e Física até disciplinas específicas como Sistemas de Controle, Controladores Lógicos Programáveis (CLP), Robótica Industrial e Instrumentação.",
            "Com o mapa interativo do K-Matrizes, os acadêmicos de Automação conseguem marcar matérias concluídas e checar em tempo real o desbloqueio das próximas disciplinas da grade, além de contabilizar as horas de Atividades Complementares (AC) e Unidades Curriculares Extensionistas (CCE). A plataforma também facilita a importação do histórico em PDF do sistema acadêmico oficial da universidade.",
            "O planejamento visual antecipado minimiza a ocorrência de quebras de pré-requisitos e apoia a montagem da grade horária semestral de maneira eficiente e sem surpresas."
        ]
    },
    "Skill tree Eletrica.html": {
        "title": "Sobre o curso de Engenharia Elétrica (Matriz 979 - UTFPR)",
        "paragraphs": [
            "O curso de <strong>Engenharia Elétrica (Matriz 979)</strong> da UTFPR Curitiba aborda a geração, transmissão, distribuição e utilização da energia elétrica, além de sistemas de potência, eletromagnetismo e automação de sistemas elétricos. O mapa de disciplinas do K-Matrizes organiza a trajetória do estudante ao longo dos períodos letivos, destacando os encadeamentos críticos entre matérias como Circuitos Elétricos, Conversão de Energia e Instalações Elétricas.",
            "Utilizando a interface gráfica do K-Matrizes, o estudante de Engenharia Elétrica pode acompanhar seu progresso individual, simular o cumprimento de requisitos para matrículas futuras e gerenciar os requisitos de extensão e atividades complementares obrigatórias.",
            "A ferramenta visa simplificar a vida acadêmica e garantir que a jornada até a colação de grau ocorra com clareza e previsibilidade."
        ]
    },
    "Skill tree M2.html": {
        "title": "Sobre o curso de Engenharia Eletrônica (Matriz 906 - Ingressantes até 2022)",
        "paragraphs": [
            "A <strong>Matriz 906 de Engenharia Eletrônica</strong> da UTFPR Câmpus Curitiba atende os acadêmicos que ingressaram até o segundo semestre de 2022. Esta matriz contempla uma sólida formação em eletrônica analógica e digital, processamento de sinais, sistemas embarcados, microcontroladores e telecomunicações.",
            "Nesta página, os alunos da Matriz 906 podem interagir diretamente com a grade curricular em formato de árvore de habilidades, identificando disciplinas pendentes, co-requisitos e liberando visualmente as matérias disponíveis para o próximo período após o envio do histórico escolar em PDF.",
            "O K-Matrizes ajuda o estudante a gerenciar a carga horária de optativas e horas de extensão, mantendo o controle total da sua trajetória acadêmica na UTFPR."
        ]
    },
    "Skill tree M3.html": {
        "title": "Sobre a nova grade de Engenharia Eletrônica (Matriz 968 - Ingressantes 2023+)",
        "paragraphs": [
            "A <strong>Matriz 968 de Engenharia Eletrônica</strong> é a grade curricular atualizada da UTFPR Curitiba para ingressantes a partir de 2023. Ela incorporou novas diretrizes curriculares nacionais, incluindo as Unidades Curriculares Extensionistas (CCE) e novas trilhas de especialização em microeletrônica, redes de computadores e sistemas inteligentes.",
            "Através desta ferramenta, os alunos acompanham seu avanço perante os novos requisitos curriculares, consultando quais disciplinas estão liberadas e calculando o saldo de horas de extensão e atividades complementares pendentes para conclusão do curso.",
            "A navegação dinâmica facilita o entendimento da dependência entre matérias, prevenindo atrasos na formação superior."
        ]
    },
    "Skill tree Mecatronica.html": {
        "title": "Sobre o curso de Engenharia Mecatrônica (Matriz 973 - UTFPR)",
        "paragraphs": [
            "A <strong>Engenharia Mecatrônica (Matriz 973 - Matriz 2)</strong> da UTFPR Câmpus Curitiba combina conceitos avançados de engenharia mecânica, eletrônica, programação e sistemas de controle. A grade abrange desde a mecânica dos sólidos e termodinâmica até circuitos eletrônicos, acionamentos hidráulicos/pneumáticos e robótica.",
            "O K-Matrizes oferece uma visão clara e intuitiva dos 10 períodos do curso de Mecatrônica, permitindo ao estudante marcar disciplinas concluídas, visualizar trilhas formativas de especialização e gerenciar o cumprimento das horas extensionistas exigidas.",
            "Com a importação automática do histórico acadêmico em PDF, o aluno obtém o diagnóstico exato de sua situação no curso em poucos segundos."
        ]
    }
}

def generate_html_block(title, paragraphs):
    p_tags = "\n".join([f'            <p>{p}</p>' for p in paragraphs])
    return f"""    <!-- =====================================================
         SEÇÃO DE CONTEÚDO PARA SEO / ADSENSE (RECOLHIDO)
         ===================================================== -->
    <details class="max-w-7xl mx-auto px-4 mt-12 mb-8 bg-gray-800/40 border border-gray-700/60 rounded-xl group" aria-label="{title}">
        <summary class="flex items-center justify-between cursor-pointer p-5 list-none select-none text-gray-300 font-semibold hover:text-white transition-colors">
            <span>{title}</span>
            <svg class="w-5 h-5 text-gray-400 transition-transform duration-300 group-open:rotate-180 shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
        </summary>
        <div class="px-5 pb-6 space-y-4 text-gray-400 text-sm leading-relaxed text-justify border-t border-gray-700/50 pt-4">
{p_tags}
        </div>
    </details>"""

def main():
    pages_dir = 'pages'
    
    # Matches old section or details block inserted before footer
    section_regex = re.compile(
        r'(?:<!-- =+.*?SEÇÃO DE CONTEÚDO PARA SEO.*?=+ -->\s*)?(?:<section[^>]*>.*?<\/section>|<details[^>]*>.*?<\/details>)',
        re.DOTALL
    )

    for filename, data in SEO_DATA.items():
        filepath = os.path.join(pages_dir, filename)
        if not os.path.exists(filepath):
            print(f"File not found: {filepath}")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_block = generate_html_block(data["title"], data["paragraphs"])

        # Check if old section exists
        if "SEÇÃO DE CONTEÚDO PARA SEO" in content or "<details" in content:
            content = section_regex.sub(new_block, content, count=1)
        else:
            footer_tag = '<footer class="bg-gray-900'
            if footer_tag in content:
                content = content.replace(footer_tag, new_block + '\n\n' + footer_tag)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully updated {filepath} with unique collapsed SEO section.")

if __name__ == '__main__':
    main()
