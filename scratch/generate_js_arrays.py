import json
import os

def generate_arrays():
    with open('docs/Matrizes/Matrizes em PDF/parsed_subjects.json', 'r', encoding='utf-8') as f:
        subs = json.load(f)
        
    mandatory = []
    humanities = []
    optional = []
    
    humanities_groups = {'[1122]', '[1135]', '[1222]'}
    optional_groups = {'[1120]', '[1121]', '[1224]'}
    
    for s in subs:
        if not s['group_id']:
            mandatory.append(s)
        elif s['group_id'] in humanities_groups:
            humanities.append(s)
        elif s['group_id'] in optional_groups:
            optional.append(s)
            
    print(f"Mandatory count: {len(mandatory)}")
    print(f"Humanities count: {len(humanities)}")
    print(f"Optional count: {len(optional)}")
    
    # 1. Coordinate generation for Mandatory subjects
    # Group by period
    by_period = {}
    for s in mandatory:
        p = s['period'] or 10  # fallback to 10
        by_period.setdefault(p, []).append(s)
        
    for p in sorted(by_period.keys()):
        p_subs = by_period[p]
        # Sort by ID to keep it deterministic
        p_subs.sort(key=lambda x: x['id'])
        n = len(p_subs)
        min_x = 5.5
        max_x = 94.5
        
        y_val = 2 + (p - 1) * 10.5
        
        for idx, s in enumerate(p_subs):
            if n > 1:
                x_val = min_x + idx * (max_x - min_x) / (n - 1)
            else:
                x_val = (min_x + max_x) / 2
            
            s['x'] = round(x_val, 1)
            s['y'] = round(y_val, 1)
            s['type'] = 'subject'
            
    # 2. Coordinate generation for Humanities
    # Sort by group, then by ID
    humanities.sort(key=lambda x: (x['group_id'], x['id']))
    cols = 5
    x_coords = [10, 30, 50, 70, 90]
    
    for idx, s in enumerate(humanities):
        row = idx // cols
        col = idx % cols
        s['x'] = x_coords[col]
        s['y'] = 10 + row * 12
        s['type'] = 'humanities'
        
    # 3. Coordinate generation for Optional (Trilhas)
    # Group by track (group_id)
    by_opt_group = {}
    for s in optional:
        by_opt_group.setdefault(s['group_id'], []).append(s)
        
    y_start = 10
    for g in sorted(by_opt_group.keys()):
        g_subs = by_opt_group[g]
        g_subs.sort(key=lambda x: x['id'])
        print(f"Track {g} has {len(g_subs)} subjects.")
        
        # Grid layout for this track
        cols = 6
        x_coords = [10, 26, 42, 58, 74, 90]
        for idx, s in enumerate(g_subs):
            row = idx // cols
            col = idx % cols
            s['x'] = x_coords[col]
            s['y'] = y_start + row * 8
            s['type'] = 'optional'
            
        # Advance y_start for the next group
        rows_used = (len(g_subs) + cols - 1) // cols
        y_start += rows_used * 8 + 6
        
    # Build JS outputs
    def to_js_obj(s):
        equivs_js = []
        for eq in s['equivalents']:
            if 'cht' in eq:
                equivs_js.append(f"{{ id: '{eq['id']}', cht: {eq['cht']} }}")
            else:
                equivs_js.append(f"{{ id: '{eq['id']}' }}")
        equivs_str = f"equivalents: [{', '.join(equivs_js)}], " if equivs_js else ""
        
        group_str = f"groupId: '{s['group_id']}', " if s.get('group_id') else ""
        deps_str = f"dependencies: {json.dumps(s['dependencies'])}, "
        
        return (f"{{ id: '{s['id']}', name: '{s['name']}', {deps_str}{equivs_str}{group_str}"
                f"period: {s['period']}, chs: {s['chs']}, cht: {s['cht']}, "
                f"x: {s['x']}, y: {s['y']}, type: '{s['type']}' }}")
                
    js_mandatory = "const allNodesData = [\n"
    for p in sorted(by_period.keys()):
        js_mandatory += f"            // --- Período {p} ---\n"
        for s in by_period[p]:
            js_mandatory += f"            {to_js_obj(s)},\n"
        js_mandatory += "\n"
    js_mandatory += "        ];"
    
    js_humanities = "const allHumanitiesData = [\n"
    current_g = None
    for s in humanities:
        if s['group_id'] != current_g:
            current_g = s['group_id']
            js_humanities += f"            // --- Grupo {current_g} ---\n"
        js_humanities += f"            {to_js_obj(s)},\n"
    js_humanities += "        ];"
    
    js_optional = "const allOptionalNodesData = [\n"
    for g in sorted(by_opt_group.keys()):
        js_optional += f"            // --- Trilha {g} ---\n"
        for s in by_opt_group[g]:
            js_optional += f"            {to_js_obj(s)},\n"
        js_optional += "\n"
    js_optional += "        ];"
    
    # Save code to files in scratch
    os.makedirs('scratch', exist_ok=True)
    with open('scratch/js_mandatory.js', 'w', encoding='utf-8') as f:
        f.write(js_mandatory)
    with open('scratch/js_humanities.js', 'w', encoding='utf-8') as f:
        f.write(js_humanities)
    with open('scratch/js_optional.js', 'w', encoding='utf-8') as f:
        f.write(js_optional)
        
    print("Javascript arrays saved to scratch/ directory.")

if __name__ == '__main__':
    generate_arrays()
