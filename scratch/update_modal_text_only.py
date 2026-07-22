import os

def main():
    files = ['index.html']
    pages_dir = 'pages'
    for f in os.listdir(pages_dir):
        if f.startswith('Skill tree') and f.endswith('.html'):
            files.append(os.path.join(pages_dir, f))

    for filepath in files:
        if not os.path.exists(filepath):
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        content = content.replace('Olá, acadêmico(a)! 👋', 'Olá, colega acadêmico(a)! 👋')
        content = content.replace(
            'A plataforma é e sempre será <strong class="text-emerald-400">gratuita</strong>.',
            'A plataforma é e sempre será <strong class="text-emerald-400">gratuita e de código aberto</strong>.'
        )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Safely updated modal text in {filepath}")

if __name__ == '__main__':
    main()
