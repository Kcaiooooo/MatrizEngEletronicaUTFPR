(() => {
    const themes = new Set(['dark', 'light', 'utfpr', 'dracula']);
    const normalize = value => themes.has(value) ? value : 'dark';
    function apply(value) {
        const theme = normalize(value);
        document.documentElement.setAttribute('data-theme', theme);
        document.querySelectorAll('.theme-select-input').forEach(select => { select.value = theme; });
    }
    apply(window.KMStorage.getItem('kmatrizes_theme'));
    document.addEventListener('DOMContentLoaded', () => {
        apply(window.KMStorage.getItem('kmatrizes_theme'));
        document.querySelectorAll('.theme-select-input').forEach(select => {
            select.addEventListener('change', () => {
                const theme = normalize(select.value);
                apply(theme);
                window.KMStorage.setItem('kmatrizes_theme', theme);
            });
        });
    });
    window.addEventListener('storage', event => {
        if (event.key === 'kmatrizes_theme') apply(event.newValue);
    });
})();
