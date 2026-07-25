import os
import glob

THEME_CSS = """
/* Theme Custom Properties & Global Overrides */
:root, [data-theme="dark"] {
    --bg-main: #111827;
    --bg-sec: #1f2937;
    --bg-card: #1f2937;
    --bg-panel: #1f2937;
    --bg-container: #111827;
    --bg-grid: rgba(255, 255, 255, 0.04);
    --text-main: #f3f4f6;
    --text-sec: #d1d5db;
    --text-muted: #9ca3af;
    --border-main: #374151;
    --border-subtle: #4b5563;
    
    --node-locked-bg: #374151;
    --node-locked-border: #4b5563;
    --node-locked-text: #9ca3af;
    
    --node-avail-bg: #2563eb;
    --node-avail-border: #60a5fa;
    --node-avail-text: #ffffff;
    --node-avail-shadow: rgba(59, 130, 246, 0.5);
    
    --node-comp-bg: #16a34a;
    --node-comp-border: #4ade80;
    --node-comp-text: #ffffff;
    --node-comp-shadow: rgba(74, 222, 128, 0.7);
    
    --node-inprog-bg: #ea580c;
    --node-inprog-border: #f97316;
    --node-inprog-text: #ffffff;
    --node-inprog-shadow: rgba(234, 88, 12, 0.5);
    
    --node-satis-bg: #4a4a28;
    --node-satis-border: #fbbf24;
    --node-satis-text: #fde68a;

    --line-default: #4b5563;
    --line-active: #60a5fa;
}

[data-theme="light"] {
    --bg-main: #f8fafc;
    --bg-sec: #ffffff;
    --bg-card: #ffffff;
    --bg-panel: #f1f5f9;
    --bg-container: #f8fafc;
    --bg-grid: rgba(0, 0, 0, 0.06);
    --text-main: #0f172a;
    --text-sec: #334155;
    --text-muted: #64748b;
    --border-main: #e2e8f0;
    --border-subtle: #cbd5e1;
    
    --node-locked-bg: #e2e8f0;
    --node-locked-border: #94a3b8;
    --node-locked-text: #475569;
    
    --node-avail-bg: #2563eb;
    --node-avail-border: #1d4ed8;
    --node-avail-text: #ffffff;
    --node-avail-shadow: rgba(37, 99, 235, 0.3);
    
    --node-comp-bg: #16a34a;
    --node-comp-border: #15803d;
    --node-comp-text: #ffffff;
    --node-comp-shadow: rgba(22, 163, 74, 0.35);
    
    --node-inprog-bg: #ea580c;
    --node-inprog-border: #c2410c;
    --node-inprog-text: #ffffff;
    --node-inprog-shadow: rgba(234, 88, 12, 0.35);
    
    --node-satis-bg: #fef08a;
    --node-satis-border: #d97706;
    --node-satis-text: #78350f;

    --line-default: #94a3b8;
    --line-active: #2563eb;
}

[data-theme="utfpr"] {
    --bg-main: #0d0d0d;
    --bg-sec: #171717;
    --bg-card: #171717;
    --bg-panel: #262626;
    --bg-container: #0d0d0d;
    --bg-grid: rgba(245, 158, 11, 0.08);
    --text-main: #fffbeb;
    --text-sec: #fef08a;
    --text-muted: #d97706;
    --border-main: #451a03;
    --border-subtle: #78350f;
    
    --node-locked-bg: #262626;
    --node-locked-border: #404040;
    --node-locked-text: #a3a3a3;
    
    --node-avail-bg: #d97706;
    --node-avail-border: #fbbf24;
    --node-avail-text: #ffffff;
    --node-avail-shadow: rgba(245, 158, 11, 0.5);
    
    --node-comp-bg: #15803d;
    --node-comp-border: #4ade80;
    --node-comp-text: #ffffff;
    --node-comp-shadow: rgba(74, 222, 128, 0.5);
    
    --node-inprog-bg: #ea580c;
    --node-inprog-border: #fb923c;
    --node-inprog-text: #ffffff;
    --node-inprog-shadow: rgba(249, 115, 22, 0.5);
    
    --node-satis-bg: #713f12;
    --node-satis-border: #fef08a;
    --node-satis-text: #fef9c3;

    --line-default: #525252;
    --line-active: #f59e0b;
}

[data-theme="dracula"] {
    --bg-main: #181825;
    --bg-sec: #1e1e2e;
    --bg-card: #1e1e2e;
    --bg-panel: #313244;
    --bg-container: #11111b;
    --bg-grid: rgba(203, 166, 247, 0.08);
    --text-main: #cdd6f4;
    --text-sec: #bac2de;
    --text-muted: #a6adc8;
    --border-main: #45475a;
    --border-subtle: #585b70;
    
    --node-locked-bg: #313244;
    --node-locked-border: #45475a;
    --node-locked-text: #6c7086;
    
    --node-avail-bg: #89b4fa;
    --node-avail-border: #b4befe;
    --node-avail-text: #11111b;
    --node-avail-shadow: rgba(137, 180, 250, 0.5);
    
    --node-comp-bg: #a6e3a1;
    --node-comp-border: #94e2d5;
    --node-comp-text: #11111b;
    --node-comp-shadow: rgba(166, 227, 161, 0.6);
    
    --node-inprog-bg: #fab387;
    --node-inprog-border: #f9e2af;
    --node-inprog-text: #11111b;
    --node-inprog-shadow: rgba(250, 179, 135, 0.5);
    
    --node-satis-bg: #585b70;
    --node-satis-border: #f5c2e7;
    --node-satis-text: #cdd6f4;

    --line-default: #585b70;
    --line-active: #cba6f7;
}

/* Theme Global Overrides */
html, body {
    background-color: var(--bg-main) !important;
    color: var(--text-sec) !important;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.selection-card {
    background-color: var(--bg-card) !important;
    border-color: var(--border-main) !important;
}

details {
    background-color: var(--bg-sec) !important;
    border-color: var(--border-main) !important;
    color: var(--text-sec) !important;
}

footer {
    background-color: var(--bg-sec) !important;
    border-color: var(--border-main) !important;
}

.modal-box {
    background-color: var(--bg-card) !important;
    border-color: var(--border-main) !important;
    color: var(--text-sec) !important;
}

#main-container,
#humanities-container,
#optional-container {
    background-color: var(--bg-container) !important;
    background-image:
        linear-gradient(var(--bg-grid) 1px, transparent 1px),
        linear-gradient(90deg, var(--bg-grid) 1px, transparent 1px) !important;
}

#progress-panel,
.bg-gray-700 {
    background-color: var(--bg-panel) !important;
    color: var(--text-main) !important;
    border: 1px solid var(--border-main) !important;
}

.subject-locked, .humanities-locked, .optional-locked {
    background-color: var(--node-locked-bg) !important;
    border-color: var(--node-locked-border) !important;
    color: var(--node-locked-text) !important;
}

.subject-available, .humanities-available, .optional-available {
    background-color: var(--node-avail-bg) !important;
    border-color: var(--node-avail-border) !important;
    color: var(--node-avail-text) !important;
    box-shadow: 0 0 15px var(--node-avail-shadow) !important;
}

.subject-completed, .humanities-completed, .optional-completed {
    background-color: var(--node-comp-bg) !important;
    border-color: var(--node-comp-border) !important;
    color: var(--node-comp-text) !important;
    box-shadow: 0 0 20px var(--node-comp-shadow) !important;
}

.subject-inprogress, .humanities-inprogress, .optional-inprogress {
    background-color: var(--node-inprog-bg) !important;
    border-color: var(--node-inprog-border) !important;
    color: var(--node-inprog-text) !important;
    box-shadow: 0 0 15px var(--node-inprog-shadow) !important;
}

.subject-satisfied, .humanities-satisfied, .optional-satisfied {
    background-color: var(--node-satis-bg) !important;
    border-color: var(--node-satis-border) !important;
    color: var(--node-satis-text) !important;
}

/* Light Mode Specific Utility Overrides */
[data-theme="light"] .text-gray-200,
[data-theme="light"] .text-gray-300 {
    color: #1e293b !important;
}
[data-theme="light"] .text-gray-400 {
    color: #475569 !important;
}
[data-theme="light"] .bg-gray-800 {
    background-color: #f1f5f9 !important;
    color: #0f172a !important;
    border-color: #cbd5e1 !important;
}
[data-theme="light"] .bg-gray-900 {
    background-color: #e2e8f0 !important;
    color: #0f172a !important;
}
[data-theme="light"] .bg-gray-600 {
    background-color: #cbd5e1 !important;
}
[data-theme="light"] .border-gray-600,
[data-theme="light"] .border-gray-700 {
    border-color: #cbd5e1 !important;
}

/* UTFPR Gold Specific Utility Overrides */
[data-theme="utfpr"] .bg-gray-800 {
    background-color: #171717 !important;
    color: #fef08a !important;
    border-color: #451a03 !important;
}
[data-theme="utfpr"] .bg-gray-900 {
    background-color: #0a0a0a !important;
}

/* Roxo Specific Utility Overrides */
[data-theme="dracula"] .bg-gray-800 {
    background-color: #1e1e2e !important;
    color: #cdd6f4 !important;
    border-color: #45475a !important;
}
[data-theme="dracula"] .bg-gray-900 {
    background-color: #11111b !important;
}
"""

HEAD_SCRIPT = """    <script>
      (function() {
        var t = localStorage.getItem('kmatrizes_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', t);
      })();
    </script>
"""

JS_THEME_MANAGER = """
<script>
function changeTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('kmatrizes_theme', themeName);
    var selects = document.querySelectorAll('.theme-select-input');
    selects.forEach(function(s) { s.value = themeName; });
}
document.addEventListener('DOMContentLoaded', function() {
    var currentTheme = localStorage.getItem('kmatrizes_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    var selects = document.querySelectorAll('.theme-select-input');
    selects.forEach(function(s) { s.value = currentTheme; });
});
</script>
"""

INDEX_THEME_SELECTOR = """
        <div class="flex justify-center items-center gap-2 mb-6">
            <label for="theme-select" class="text-sm font-semibold text-gray-300 flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-23"></path>
                </svg>
                <span>Tema:</span>
            </label>
            <select id="theme-select" onchange="changeTheme(this.value)" class="theme-select-input bg-gray-800 text-gray-200 border border-gray-700 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer transition-colors">
                <option value="dark">Escuro</option>
                <option value="light">Claro</option>
                <option value="utfpr">UTFPR (Amarelo)</option>
                <option value="dracula">Roxo</option>
            </select>
        </div>
"""

PAGE_THEME_SELECTOR = """
                <div class="flex items-center gap-2 bg-gray-800 border border-gray-600 px-3 py-1.5 rounded-lg">
                    <span class="text-xs font-semibold text-gray-300 hidden sm:inline">Tema:</span>
                    <select onchange="changeTheme(this.value)" class="theme-select-input bg-gray-700 text-white border border-gray-600 text-xs sm:text-sm rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer">
                        <option value="dark">Escuro</option>
                        <option value="light">Claro</option>
                        <option value="utfpr">UTFPR (Amarelo)</option>
                        <option value="dracula">Roxo</option>
                    </select>
                </div>
"""

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
html_files = [os.path.join(root_dir, "index.html")] + glob.glob(os.path.join(root_dir, "pages", "*.html"))

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace SVG casingEl stroke with dynamic CSS variable
    content = content.replace("casingEl.setAttribute('stroke', '#111827');", "casingEl.setAttribute('stroke', 'var(--bg-container)');")

    # 1. Add HEAD_SCRIPT and THEME_CSS inside <head>
    style_block = f"<style>\n{THEME_CSS}\n</style>\n{HEAD_SCRIPT}"
    if "</head>" in content:
        content = content.replace("</head>", f"{style_block}\n</head>", 1)

    # 2. Add Theme Manager JS before </body>
    if "</body>" in content:
        content = content.replace("</body>", f"{JS_THEME_MANAGER}\n</body>", 1)

    # 3. Add Theme selector UI
    is_index = "index.html" in os.path.basename(filepath)
    if is_index:
        if '<header class="mb-10">' in content:
            content = content.replace('<header class="mb-10">', f'<header class="mb-10">\n{INDEX_THEME_SELECTOR}', 1)
    else:
        if '<button id="settings-btn"' in content:
            content = content.replace('<button id="settings-btn"', f'{PAGE_THEME_SELECTOR}\n                <button id="settings-btn"', 1)
        elif '<div class="mb-4 flex justify-start">' in content:
            content = content.replace('<div class="mb-4 flex justify-start">', f'<div class="mb-4 flex justify-between items-center">\n{PAGE_THEME_SELECTOR}', 1)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Successfully processed {os.path.basename(filepath)}")
