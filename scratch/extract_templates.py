import re
import json

files = {
    'eletronica_906': 'pages/Skill tree M2.html',
    'eletronica_968': 'pages/Skill tree M3.html',
    'eletrica_979': 'pages/Skill tree Eletrica.html',
    'automacao_978': 'pages/Skill tree Automacao.html',
    'mecatronica_973': 'pages/Skill tree Mecatronica.html'
}

def extract_array_content(var_name, text):
    pattern = rf"const\s+{var_name}\s*=\s*\["
    match = re.search(pattern, text)
    if not match:
        return ""
    start_idx = match.end() - 1
    bracket_count = 0
    end_idx = start_idx
    for i in range(start_idx, len(text)):
        if text[i] == '[':
            bracket_count += 1
        elif text[i] == ']':
            bracket_count -= 1
            if bracket_count == 0:
                end_idx = i
                break
    return text[start_idx+1:end_idx]

def parse_subject_blocks(code_snippet, default_tab_id):
    if not code_snippet:
        return []
    blocks = re.findall(r"\{\s*id:\s*['\"][^'\"]+['\"].*?\}", code_snippet, re.DOTALL)
    sub_list = []
    seen = set()
    for block in blocks:
        m_id = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
        m_name = re.search(r"name:\s*['\"]([^'\"]+)['\"]", block)
        m_period = re.search(r"period:\s*(\d+)", block)
        m_cht = re.search(r"cht:\s*(\d+)", block)
        m_deps = re.search(r"dependencies:\s*\[(.*?)\]", block, re.DOTALL)
        
        if m_id and m_name and m_period and m_cht:
            s_id = m_id.group(1).strip()
            if s_id in seen or len(s_id) > 15 or 'http' in s_id:
                continue
            seen.add(s_id)
            
            s_name = m_name.group(1).strip()
            s_period = int(m_period.group(1))
            s_cht = int(m_cht.group(1))
            
            deps = []
            if m_deps:
                raw_deps = m_deps.group(1)
                deps = [d.strip().strip("'\"") for d in raw_deps.split(',') if d.strip().strip("'\"")]
                deps = [d for d in deps if not d.startswith('Periodo:')]
                
            sub_list.append({
                'id': s_id,
                'name': s_name,
                'period': s_period,
                'cht': s_cht,
                'dependencies': deps,
                'tabId': default_tab_id
            })
    return sub_list

templates = {}

for key, path in files.items():
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    mandatory_txt = extract_array_content('allNodesData', content)
    humanities_txt = extract_array_content('allHumanitiesData', content)
    
    optional_txt = extract_array_content('allOptionalNodesData', content) or \
                   extract_array_content('optionalNodesData', content) or \
                   extract_array_content('allOptionalData', content)
    
    mandatory_subs = parse_subject_blocks(mandatory_txt, 'tab_mandatory')
    humanities_subs = parse_subject_blocks(humanities_txt, 'tab_humanities')
    optional_subs = parse_subject_blocks(optional_txt, 'tab_optional')
    
    combined = mandatory_subs + humanities_subs + optional_subs
    templates[key] = combined
    print(f"{key}: {len(mandatory_subs)} mandatory (tab_mandatory), {len(optional_subs)} optional (tab_optional), {len(humanities_subs)} humanities (tab_humanities) -> total {len(combined)}")

with open('scratch/templates.json', 'w', encoding='utf-8') as out:
    json.dump(templates, out, ensure_ascii=False, indent=2)

print("Saved updated templates.json with exact bracket matching!")
