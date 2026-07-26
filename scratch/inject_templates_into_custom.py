import json
import re

with open('scratch/templates.json', 'r', encoding='utf-8') as f:
    templates = json.load(f)

templates_js = "const OFFICIAL_TEMPLATES = " + json.dumps(templates, ensure_ascii=False, indent=2) + ";"

with open('pages/Skill tree Custom.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace OFFICIAL_TEMPLATES definition
if 'const OFFICIAL_TEMPLATES =' in html:
    html = re.sub(r"const OFFICIAL_TEMPLATES = \{.*?\};\n", templates_js + "\n", html, flags=re.DOTALL)
else:
    html = html.replace("const PROFILES_LIST_KEY =", templates_js + "\n        const PROFILES_LIST_KEY =")

with open('pages/Skill tree Custom.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Replaced OFFICIAL_TEMPLATES in Skill tree Custom.html with categorized tabId data!")
