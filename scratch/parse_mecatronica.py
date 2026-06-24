import re
import json

def parse_matrix(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    subjects = []
    current_sub = None
    
    # List of all extracted codes to validate codes
    all_known_codes = {
        'ARQ7DH', 'ARQ7EA', 'ARQ7EB', 'ARQ7EC', 'CAART01', 'CAART02', 'CAART03', 'CAART04', 'CAART05', 'CAART06', 'CAART07', 'CAART08', 'CAART09', 'CAART10', 'CAART11', 'CAART12', 'CAART13', 'CAART14', 'CAART15', 'CAART16', 'CAART17', 'CAART21', 'CAART22', 'CAART23', 'CAART24', 'CAART25', 'COE70A', 'CSD41', 'CSV30', 'CSW41', 'DIN7HU', 'EDU70I', 'EDU70J', 'EDU70K', 'EDU7AG', 'EDU7AH', 'EDU7AI', 'ELB11', 'ELB21', 'ELB23', 'ELE13', 'ELE21', 'ELEB30', 'ELEC20', 'ELEE30', 'ELEE31', 'ELEF20', 'ELEW31', 'ELEW32', 'ELEW40', 'ELEW41', 'ELEY42', 'ELF41', 'ELF52', 'ELF62', 'ELF72', 'ELF74', 'ELF75', 'ELF81', 'ELF84', 'ELH01', 'ELH02', 'ELH04', 'ELH05', 'ELN70A', 'ELN70B', 'ELN70C', 'ELN71A', 'ELN71B', 'ELN72A', 'ELN73A', 'ELN73B', 'ELN73D', 'ELN74A', 'ELN74B', 'ELN75A', 'ELN75B', 'ELN75C', 'ELN76A', 'ELN76B', 'ELN77A', 'ELN77B', 'ELN77C', 'ELN78A', 'ELN78B', 'ELN78C', 'ELN78D', 'ELN78E', 'ELN79A', 'ELN7AA', 'ELN7AB', 'ELN7AC', 'ELN7AD', 'ELN7AE', 'ELN7AF', 'ELN7AG', 'ELN7AH', 'ELN7AI', 'ELN7AJ', 'ELN7AK', 'ELN7AL', 'ELN7AM', 'ELN7AN', 'ELN7AO', 'ELN7AP', 'ELN7AQ', 'ELN7AR', 'ELN7AS', 'ELN8BD', 'ELN8CA', 'ELN8CC', 'ELN8CD', 'ELN8DD', 'ELN8DG', 'ELN8DH', 'ELN8DI', 'ELN8DJ', 'ELN8DK', 'ELN8EB', 'ELN8EC', 'ELO91', 'ELO92', 'ELP31T', 'ELP31TP', 'ELP42P', 'ELP61', 'ELP63', 'ELT72B', 'ELT72C', 'ELT73A', 'ELT73B', 'ELT74A', 'ELT74B', 'ELT74E', 'ELT75E', 'ELT75H', 'ELT76A', 'ELT77A', 'ELT77D', 'ELT77H', 'ELT77J', 'ELT7AH', 'ELT7EF', 'ELT82F', 'ELT83B', 'ELT84B', 'ELT84D', 'ELT85C', 'ELT85D', 'ELT85E', 'ELT86C', 'ELTA2', 'ELTC1', 'ELTD1', 'ELTD2', 'ELTD4', 'ELTD6', 'ELTD7', 'ELTE1', 'ELTE10', 'ELTE13', 'ELTE2', 'ELTE6', 'ELTE8', 'ELTE9', 'ELW41', 'ELW52', 'ELW62', 'ELW72', 'ELW81', 'ELW84', 'EST70A', 'EST70C', 'FCH7AA', 'FCH7AB', 'FCH7FA', 'FCH7FB', 'FCH7FC', 'FCH7GA', 'FCH7HA', 'FCH7HB', 'FCH7HC', 'FCH7PA', 'FCH7PB', 'FCH7PC', 'FCH7SA', 'FCH7SB', 'FCH7SC', 'FCH7SD', 'FCH7SE', 'FCH7SF', 'FCH7XA', 'FCH7XB', 'FCH7XC', 'FCH7XD', 'FCH7XE', 'FCH7XF', 'FCH7XG', 'FIS76B', 'FIS7E1', 'FIS7F1', 'FIS7F2', 'GEE72H', 'GEE73C', 'GEE75D', 'GEE76A', 'GEE7A1', 'GEE7AA', 'GEE7E1', 'GEE7E3', 'GEE7E5', 'GEE7F1', 'GEE7F2', 'GEE7G1', 'GEE7G5', 'GEE7M1', 'LEM7SM', 'LICOM7AA', 'LICOM7AB', 'MAT7AL', 'MAT7C1', 'MAT7C2', 'MAT7ED', 'MAT7FZ', 'MAT7GA', 'MAT7PC', 'MEC71A', 'MEC72A', 'MEC72B', 'MEC73A', 'MEC73B', 'MEC73C', 'MEC73D', 'MEC74A', 'MEC74B', 'MEC74C', 'MEC74D', 'MEC74E', 'MEC74F', 'MEC75A', 'MEC75B', 'MEC75C', 'MEC75D', 'MEC75E', 'MEC75G', 'MEC76A', 'MEC76B', 'MEC76C', 'MEC76D', 'MEC76F', 'MEC77A', 'MEC77B', 'MEC77C', 'MEC78A', 'MEC78B', 'MEC78D', 'MEC78E', 'MEC78G', 'MEC79A', 'MEC79B', 'MEC79C', 'MEC79D', 'MEC79E', 'MEC7AA', 'MEC7AC', 'MEC7AD', 'MEC7AE', 'MEC7AF', 'MEC7AG', 'MEC7AH', 'MEC7AI', 'MEC7AJ', 'MEC7AK', 'MEC7AL', 'MEC7AM', 'MEC7AN', 'MEC7AO', 'MEC7AP', 'MEC7AQ', 'MEC7AR', 'MEC7AS', 'MEC7AT', 'MEC7AU', 'MEC7AV', 'MEC7AX', 'MEC7AZ', 'MEC7CO', 'MEC7EE', 'MEC7GF', 'MECP71A', 'MECP71B', 'MECP72A', 'MECP72B', 'MECP72C', 'MECP72D', 'MECP72E', 'MECP73A', 'MECP73B', 'MECP75A', 'MECP77B', 'MECP78A', 'QBI7CA'
    }
    
    num_pattern = re.compile(r'(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)')
    code_regex = re.compile(r'\b([A-Z]{3,5}\d{1,2}[A-Z0-9]{0,3})\b')
    
    for line_idx, line in enumerate(lines):
        line = line.rstrip('\n')
        if len(line) < 200:
            line = line + ' ' * (200 - len(line))
            
        code_part = line[20:36].strip()
        left_part = line[0:20].strip()
        
        # Detect subject code
        code = None
        words = code_part.split()
        for w in words:
            if w in all_known_codes or w.startswith('ENADE'):
                code = w
                break
                
        is_new = False
        if code:
            period_match = re.search(r'\b(10|[1-9]|OPT)\b', left_part)
            group_match_any = re.search(r'\[\d{4}\]', line[0:40])
            if period_match or 'OPT' in left_part or group_match_any:
                is_new = True
                
        # Terminate current subject if we hit status info or page breaks
        if current_sub:
            line_text_upper = line.upper()
            if any(k in line_text_upper for k in ['CÂMPUS:', 'CAMPUS:', 'MATRIZ:', 'STATUS:', 'CURSO:', 'SOMACH', 'CHTOTAL', 'LEGENDA DAS OPTATIVAS']):
                current_sub = None
                    
        if is_new:
            period_str = None
            group_id = None
            
            period_m = re.search(r'\b(10|[1-9])\b', left_part)
            if period_m:
                period_str = period_m.group(1)
                
            group_m = re.search(r'\[(\d{4})\]', line[0:40])
            if group_m:
                group_id = f"[{group_m.group(1)}]"
                
            name_part = line[36:58].strip()
            
            # Find the sequence of 9 numbers for hours details
            m_nums = num_pattern.search(line)
            chs = 0
            cht = 0
            boundary_idx = 159 # default fallback
            
            if m_nums:
                # lectures total is group 3
                try:
                    chs = int(m_nums.group(3))
                except:
                    chs = 0
                # CHT is group 9
                try:
                    cht = int(m_nums.group(9))
                except:
                    cht = 0
                boundary_idx = m_nums.end() + 10
                
            # Find prereqs and equivalents using the boundary index
            prereqs = []
            equivs = []
            
            # Search for codes starting after the subject code itself
            code_matches = code_regex.finditer(line)
            for cm in code_matches:
                start_pos = cm.start()
                # Must be after index 36 to avoid matching period, group or subject code itself
                if start_pos < 36:
                    continue
                c_code = cm.group(0)
                if c_code in all_known_codes and c_code != code:
                    if start_pos < boundary_idx:
                        prereqs.append(c_code)
                    else:
                        # Find if there is a number after it (for equivalent hours)
                        # e.g. MECP71B 90
                        eq_hours = None
                        post_str = line[cm.end():cm.end()+15].strip()
                        post_m = re.match(r'^\s*(\d+)\b', post_str)
                        if post_m:
                            eq_hours = int(post_m.group(1))
                        equivs.append({'id': c_code, 'cht': eq_hours} if eq_hours else {'id': c_code})
                        
            # Check for Period prerequisite
            p_m = re.search(r'Per[íi]odo:(\d+)', line[145:], re.IGNORECASE)
            if p_m:
                prereqs.append(f"Periodo:{p_m.group(1)}")
            
            current_sub = {
                'id': code,
                'name_lines': [name_part] if name_part else [],
                'period': int(period_str) if period_str else None,
                'group_id': group_id,
                'chs': chs,
                'cht': cht,
                'boundary_idx': boundary_idx,
                'prereqs': prereqs,
                'equivs': equivs,
                'line_no': line_idx + 1
            }
            subjects.append(current_sub)
        else:
            if current_sub:
                name_part = line[36:58].strip()
                if name_part and not name_part.startswith('Turmas') and not name_part.startswith('Modelo de') and name_part != 'Disciplina':
                    if not any(cat in name_part for cat in ['FORMAÇÃO BÁSICA', 'FORMAÇÃO PROFISSIONAL', 'FORMAÇÃO HUMANISTICA', 'ATIVIDADES', 'ENADE', 'OPTATIVA', 'E CIENTÍFICA']):
                        if not any(k in name_part.upper() for k in ['CONSULTA CURSO', 'CÂMPUS CURITIBA', 'HTTPS://', 'OF 10', 'PAGE', 'LEGENDA']):
                            current_sub['name_lines'].append(name_part)
                
                # Check for CHT if it was 0 and we find a CHT later on
                if current_sub['cht'] == 0:
                    m_nums = num_pattern.search(line)
                    if m_nums:
                        try:
                            current_sub['cht'] = int(m_nums.group(9))
                        except:
                            pass
                        current_sub['boundary_idx'] = m_nums.end() + 10
                        
                # Find prereqs and equivs on continuation lines
                boundary_idx = current_sub['boundary_idx']
                code_matches = code_regex.finditer(line)
                for cm in code_matches:
                    start_pos = cm.start()
                    # Must be after index 36 to avoid matching names, etc.
                    if start_pos < 36:
                        continue
                    c_code = cm.group(0)
                    if c_code in all_known_codes and c_code != current_sub['id']:
                        if start_pos < boundary_idx:
                            current_sub['prereqs'].append(c_code)
                        else:
                            eq_hours = None
                            post_str = line[cm.end():cm.end()+15].strip()
                            post_m = re.match(r'^\s*(\d+)\b', post_str)
                            if post_m:
                                eq_hours = int(post_m.group(1))
                            current_sub['equivs'].append({'id': c_code, 'cht': eq_hours} if eq_hours else {'id': c_code})
                            
                p_m = re.search(r'Per[íi]odo:(\d+)', line[145:], re.IGNORECASE)
                if p_m:
                    current_sub['prereqs'].append(f"Periodo:{p_m.group(1)}")
                    
    # Clean and structure final list
    cleaned = []
    for s in subjects:
        name = " ".join(s['name_lines']).replace('  ', ' ').strip()
        for suffix in ['FORMAÇÃO BÁSICA', 'FORMAÇÃO PROFISSIONAL', 'FORMAÇÃO HUMANISTICA', 'E CIENTÍFICA', 'HUMANISTICA', 'PROFISSIONAL']:
            if name.endswith(suffix):
                name = name[:-len(suffix)].strip()
                
        cleaned.append({
            'id': s['id'],
            'name': name,
            'period': s['period'],
            'group_id': s['group_id'],
            'chs': s['chs'],
            'cht': s['cht'],
            'dependencies': sorted(list(set(s['prereqs']))),
            'equivalents': s['equivs'],
            'line_no': s['line_no']
        })
        
    return cleaned

cleaned_subjects = parse_matrix('docs/Matrizes/Matrizes em PDF/Matriz_eng_Mecatronica_layout.txt')
print(f"Parsed {len(cleaned_subjects)} subjects.")

with open('docs/Matrizes/Matrizes em PDF/parsed_subjects.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_subjects, f, ensure_ascii=False, indent=4)

print("Saved to parsed_subjects.json")
