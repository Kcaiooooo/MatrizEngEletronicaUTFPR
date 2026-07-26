import re
import json

files = {
    'eletronica_906': 'pages/Skill tree M2.html',
    'eletronica_968': 'pages/Skill tree M3.html',
    'eletrica_979': 'pages/Skill tree Eletrica.html',
    'automacao_978': 'pages/Skill tree Automacao.html',
    'mecatronica_973': 'pages/Skill tree Mecatronica.html'
}

templates = {}

for key, path in files.items():
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract allNodesData or main nodes
    nodes = []
    
    # Match objects like { id: '...', name: '...', period: X, cht: Y, dependencies: [...] }
    # Using regex to find items
    matches = re.findall(r"\{\s*id:\s*['\"]([^'\"]+)['\"],\s*name:\s*['\"]([^'\"]+)['\"].*?period:\s*(\d+).*?cht:\s*(\d+)", content, re.DOTALL)
    
    # Let's extract full JS object blocks
    blocks = re.findall(r"\{\s*id:\s*['\"][^'\"]+['\"].*?\}", content, re.DOTALL)
    
    sub_list = []
    seen = set()
    for block in blocks:
        # Extract id
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
                'tabId': 'tab_mandatory'
            })
            
    templates[key] = sub_list
    print(f"Extracted {len(sub_list)} subjects for {key}")

with open('scratch/templates.json', 'w', encoding='utf-8') as out:
    json.dump(templates, out, ensure_ascii=False, indent=2)

print("Saved templates.json")
