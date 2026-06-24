import re

def main():
    # Read the base Automacao HTML
    with open('pages/Skill tree Automacao.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Read the generated JS array files
    with open('scratch/js_mandatory.js', 'r', encoding='utf-8') as f:
        js_mandatory = f.read()
    with open('scratch/js_humanities.js', 'r', encoding='utf-8') as f:
        js_humanities = f.read()
    with open('scratch/js_optional.js', 'r', encoding='utf-8') as f:
        js_optional = f.read()

    # 1. Replace Title and Header Texts
    html = html.replace(
        '<title>Matriz Curricular - Engenharia de Controle e Automacao UTFPR</title>',
        '<title>Matriz Curricular - Engenharia Mecatrônica UTFPR</title>'
    )
    html = html.replace(
        'Matriz Curricular - Engenharia de Controle e Automação',
        'Matriz Curricular - Engenharia Mecatrônica'
    )
    html = html.replace(
        'UTFPR - Câmpus Curitiba (Matriz 978)',
        'UTFPR - Câmpus Curitiba (Matriz 973 - Matriz 2)'
    )
    html = html.replace(
        'id="period-slider" type="range" min="1" max="9"',
        'id="period-slider" type="range" min="1" max="10"'
    )

    # 2. Replace LocalStorage Keys
    html = html.replace('_Automacao', '_Mecatronica')

    # 3. Remove/Hide Empregabilidade (Group 1142) from the HTML progress bars
    # Use robust regex matching for the HTML block before modifying hour text
    html_pattern = re.compile(
        r'<div>\s*<div[^>]*>\s*<span[^>]*>\s*Empregabilidade\s+e\s+Empreendedorismo\s*</span>\s*<span id="group1142-progress-text"[^>]*>.*?</span>\s*</div>\s*<div[^>]*>\s*<div id="group1142-progress-bar"[^>]*>\s*</div>\s*</div>\s*</div>',
        re.DOTALL
    )
    html = html_pattern.sub("", html)

    # 4. Replace Hour Constants in the JS
    html = html.replace('const TOTAL_HUMANITIES_HOURS = 135;', 'const TOTAL_HUMANITIES_HOURS = 120;')
    html = html.replace('const TOTAL_OPTIONAL_HOURS = 540;', 'const TOTAL_OPTIONAL_HOURS = 240;')

    # 5. Replace Hour placeholders in HTML (e.g. 0/540h, 0/135h)
    html = html.replace('0/540h (0.0%)', '0/240h (0.0%)')
    html = html.replace('0/135h (0.0%)', '0/120h (0.0%)')

    # 6. Remove/Comment JS variables and update block for group1142
    html = re.sub(
        r'const\s+group1142ProgressBar\s*=\s*document\.getElementById\([\'"]group1142-progress-bar[\'"]\);',
        '// const group1142ProgressBar = document.getElementById(\'group1142-progress-bar\');',
        html
    )
    html = re.sub(
        r'const\s+group1142ProgressText\s*=\s*document\.getElementById\([\'"]group1142-progress-text[\'"]\);',
        '// const group1142ProgressText = document.getElementById(\'group1142-progress-text\');',
        html
    )
    
    js_block_pattern = re.compile(
        r'if\s*\(\s*group1142ProgressBar\s*&&\s*group1142ProgressText\s*\)\s*\{.+?group1142ProgressText\.textContent\s*=\s*`[^`]+?`;\s*\}',
        re.DOTALL
    )
    html = js_block_pattern.sub("", html)

    # 7. Replace Specialization Tracks and Groups Config
    tracks_pattern = re.compile(r'const SPECIALIZATION_TRACKS = \{.*?\};', re.DOTALL)
    new_tracks = """const SPECIALIZATION_TRACKS = {
            'Trilha Formativa em Eletrônica': [
                'ELE13', 'ELF74', 'ELF75', 'ELN7AA', 'ELN7AB', 'ELN7AC', 'ELN7AD', 'ELN7AE', 'ELN7AF', 'ELN7AG', 'ELN7AH', 'ELN7AI', 'ELN7AJ', 'ELN7AK', 'ELN7AL', 'ELN7AM', 'ELN7AN', 'ELN7AO', 'ELTA2', 'ELTD1', 'ELTD2', 'ELTD4', 'ELTD6', 'ELTD7', 'ELTE10', 'ELTE13', 'ELTE2', 'ELTE6', 'ELTE8', 'ELTE9'
            ],
            'Trilha Formativa em Mecânica': [
                'MEC78B', 'MEC7AA', 'MEC7AC', 'MEC7AD', 'MEC7AE', 'MEC7AF', 'MEC7AG', 'MEC7AH', 'MEC7AI', 'MEC7AJ', 'MEC7AK', 'MEC7AL', 'MEC7AM', 'MEC7AN', 'MEC7AO', 'MEC7AP', 'MEC7AQ', 'MEC7AR', 'MEC7CO', 'MEC7EE', 'MEC7GF'
            ],
            'Unidades Curriculares Extensionistas': [
                'ARQ7DH', 'ARQ7EC', 'CAART01', 'CAART02', 'CAART03', 'CAART04', 'CAART05', 'CAART06', 'CAART07', 'CAART08', 'CAART09', 'CAART10', 'CAART11', 'CAART12', 'CAART13', 'CAART14', 'CAART15', 'CAART16', 'CAART17', 'CAART21', 'CAART22', 'CAART23', 'CAART24', 'CAART25', 'DIN7HU', 'ELN7AP', 'ELN7AQ', 'ELN7AR', 'ELN7AS', 'ELN8BD', 'ELN8CD', 'ELN8DI', 'ELN8DJ', 'ELN8DK', 'ELN8EC', 'FCH7AB', 'FCH7PC', 'FCH7SF', 'FCH7XB', 'GEE72H', 'GEE73C', 'GEE76A', 'LICOM7AA', 'LICOM7AB'
            ]
        };"""
    html = tracks_pattern.sub(new_tracks, html)

    groups_pattern = re.compile(r'const OPTIONAL_GROUPS_CONFIG = \{.*?\};', re.DOTALL)
    new_groups = """const OPTIONAL_GROUPS_CONFIG = {
            '[1120]': { requiredHours: 120, name: 'Trilha Formativa em Eletrônica' },
            '[1121]': { requiredHours: 120, name: 'Trilha Formativa em Mecânica' },
            '[1122]': { requiredHours: 60, name: 'Ciclo de Humanidades' },
            '[1135]': { requiredHours: 30, name: 'Ciências Humanas' },
            '[1222]': { requiredHours: 30, name: 'Ciclo de Humanidades' },
            '[1224]': { requiredHours: 0, name: 'Unidades Curriculares Extensionistas' }
        };"""
    html = groups_pattern.sub(new_groups, html)

    # 8. Replace Subject Data Arrays
    mandatory_pattern = re.compile(r'const allNodesData = \[.*?\];', re.DOTALL)
    html = mandatory_pattern.sub(js_mandatory, html)

    humanities_pattern = re.compile(r'const allHumanitiesData = \[.*?\];', re.DOTALL)
    html = humanities_pattern.sub(js_humanities, html)

    optional_pattern = re.compile(r'const allOptionalNodesData = \[.*?\];', re.DOTALL)
    html = optional_pattern.sub(js_optional, html)

    # Write the new HTML page
    with open('pages/Skill tree Mecatronica.html', 'w', encoding='utf-8') as f:
        f.write(html)

    print("Successfully built pages/Skill tree Mecatronica.html")

if __name__ == '__main__':
    main()
