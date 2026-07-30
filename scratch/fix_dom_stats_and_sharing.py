import re

course_files = [
    'pages/Skill tree M3.html',
    'pages/Skill tree M2.html',
    'pages/Skill tree Eletrica.html',
    'pages/Skill tree Automacao.html',
    'pages/Skill tree Mecatronica.html'
]

share_js_v3_script = r'''
    <!-- Script do Tutorial (?) e Compartilhamento Nativo v3 (DOM Stats Reader) -->
    <script>
    function getStatsFromDOM() {
        let mainPercent = 0, completedCore = 0, totalCore = 0;
        let optionalComp = 0, optionalReq = 300, optionalPercent = 0;
        let humanitiesComp = 0, humanitiesReq = 210, humanitiesPercent = 0;
        let acComp = 0, acReq = 15, acPercent = 0;
        let cceComp = 0, cceReq = 465, ccePercent = 0;

        // 1. Core / Obrigatórias
        const elCore = document.querySelector('#total-progress-text, [id*="total-progress"]');
        if (elCore && elCore.textContent) {
            const m = elCore.textContent.match(/([\d\.]+)\%\s*\((?:(\d+)\/(\d+))?\)/);
            if (m) {
                mainPercent = parseFloat(m[1]) || 0;
                if (m[2]) completedCore = parseInt(m[2]);
                if (m[3]) totalCore = parseInt(m[3]);
            }
        }

        // 2. Humanidades
        const elHum = document.querySelector('#humanities-progress-text, [id*="humanities-progress"]');
        if (elHum && elHum.textContent) {
            const m = elHum.textContent.match(/(\d+)\/(\d+)h\s*\(([\d\.]+)\%\)/);
            if (m) {
                humanitiesComp = parseInt(m[1]);
                humanitiesReq = parseInt(m[2]);
                humanitiesPercent = parseFloat(m[3]);
            }
        }

        // 3. Trilhas / Optativas
        const elOpt = document.querySelector('#optional-progress-text, [id*="optional-progress"]');
        if (elOpt && elOpt.textContent) {
            const m = elOpt.textContent.match(/(\d+)\/(\d+)h\s*\(([\d\.]+)\%\)/);
            if (m) {
                optionalComp = parseInt(m[1]);
                optionalReq = parseInt(m[2]);
                optionalPercent = parseFloat(m[3]);
            }
        }

        // 4. Extensão (CCE)
        const elCce = document.querySelector('#ext-progress-text, [id*="ext-progress"]');
        if (elCce && elCce.textContent) {
            const m = elCce.textContent.match(/(\d+)\/(\d+)h\s*\(([\d\.]+)\%\)/);
            if (m) {
                cceComp = parseInt(m[1]);
                cceReq = parseInt(m[2]);
                ccePercent = parseFloat(m[3]);
            }
        }

        // 5. Complementares (AC)
        const elAc = document.querySelector('#comp-progress-text, [id*="comp-progress"]');
        if (elAc && elAc.textContent) {
            const m = elAc.textContent.match(/(\d+)\/(\d+)h\s*\(([\d\.]+)\%\)/);
            if (m) {
                acComp = parseInt(m[1]);
                acReq = parseInt(m[2]);
                acPercent = parseFloat(m[3]);
            }
        }

        return {
            mainPercent, completedCore, totalCore,
            optionalComp, optionalReq, optionalPercent,
            humanitiesComp, humanitiesReq, humanitiesPercent,
            acComp, acReq, acPercent,
            cceComp, cceReq, ccePercent
        };
    }

    function openImportTutorialModal() {
        const modal = document.getElementById('modal-tutorial-import');
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('active');
    }

    function closeImportTutorialModal() {
        const modal = document.getElementById('modal-tutorial-import');
        if (modal) {
            modal.classList.remove('active');
            modal.classList.add('hidden');
        }
    }

    function openShareModal() {
        const modal = document.getElementById('modal-share-badge');
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('active');
        setTimeout(() => {
            generateShareBadgeCanvas();
        }, 80);
    }

    function closeShareModal() {
        const modal = document.getElementById('modal-share-badge');
        if (modal) {
            modal.classList.remove('active');
            modal.classList.add('hidden');
        }
    }

    function generateShareBadgeCanvas() {
        const canvas = document.getElementById('share-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const width = 1200;
        const height = 675;

        // Read exact rendered stats directly from DOM elements
        const pStats = getStatsFromDOM();

        // Get course title from page
        let courseTitle = document.title.split('|')[0].trim();
        courseTitle = courseTitle.replace('Skill Tree', '').replace('Grade Interativa', '').replace('Matriz Curricular -', '').trim();
        if (!courseTitle) courseTitle = "Engenharia UTFPR";

        // Background Gradient
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(0.5, '#1e1b4b');
        bgGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Grid overlay
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 40) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += 40) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }

        // Outer Border
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, width - 40, height - 40);

        // Header Brand Badge
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('🎓 K-MATRIZES · UTFPR CÂMPUS CURITIBA', 60, 75);

        // Course Subtitle
        ctx.fillStyle = '#94a3b8';
        ctx.font = '600 20px Inter, sans-serif';
        ctx.fillText(courseTitle.toUpperCase(), 60, 110);

        // Main Hero Metric (Obrigatórias)
        const mainGrad = ctx.createLinearGradient(60, 0, 600, 0);
        mainGrad.addColorStop(0, '#fbbf24');
        mainGrad.addColorStop(0.5, '#f59e0b');
        mainGrad.addColorStop(1, '#10b981');
        ctx.fillStyle = mainGrad;
        ctx.font = 'bold 84px "Roboto Slab", serif';
        ctx.fillText(`${pStats.mainPercent.toFixed(1)}%`, 60, 205);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 26px Inter, sans-serif';
        ctx.fillText(`PROGRESSO DE OBRIGATÓRIAS (${pStats.completedCore}/${pStats.totalCore} MATÉRIAS)`, 60, 250);

        // Main Hero Progress Bar Track
        const mainBarX = 60;
        const mainBarY = 270;
        const mainBarW = width - 120;
        const mainBarH = 26;
        ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
        ctx.beginPath();
        ctx.roundRect(mainBarX, mainBarY, mainBarW, mainBarH, 13);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Main Hero Progress Bar Fill
        const mainFillW = Math.max(16, (mainBarW * Math.min(100, pStats.mainPercent)) / 100);
        const barGrad = ctx.createLinearGradient(mainBarX, 0, mainBarX + mainBarW, 0);
        barGrad.addColorStop(0, '#3b82f6');
        barGrad.addColorStop(0.5, '#8b5cf6');
        barGrad.addColorStop(1, '#10b981');
        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(mainBarX, mainBarY, mainFillW, mainBarH, 13);
        ctx.fill();

        // Sub Category Progress Bars (Re-using exact top panel bars)
        const categories = [
            { label: 'CICLO DE HUMANIDADES', comp: pStats.humanitiesComp, req: pStats.humanitiesReq, percent: pStats.humanitiesPercent, unit: 'h', color: '#a855f7' },
            { label: 'TRILHAS / OPTATIVAS', comp: pStats.optionalComp, req: pStats.optionalReq, percent: pStats.optionalPercent, unit: 'h', color: '#ec4899' },
            { label: 'HORAS DE EXTENSÃO (CCE)', comp: pStats.cceComp, req: pStats.cceReq, percent: pStats.ccePercent, unit: 'h', color: '#eab308' },
            { label: 'HORAS COMPLEMENTARES (AC)', comp: pStats.acComp, req: pStats.acReq, percent: pStats.acPercent, unit: 'h', color: '#06b6d4' }
        ];

        const gridY = 330;
        const colW = (width - 160) / 2;
        const rowH = 100;

        categories.forEach((cat, idx) => {
            const col = idx % 2;
            const row = Math.floor(idx / 2);
            const bx = 60 + col * (colW + 40);
            const by = gridY + row * (rowH + 15);

            // Container Box
            ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
            ctx.beginPath();
            ctx.roundRect(bx, by, colW, rowH, 14);
            ctx.fill();
            ctx.strokeStyle = 'rgba(51, 65, 85, 0.8)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Label + Value
            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 14px Inter, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(cat.label, bx + 20, by + 32);

            ctx.fillStyle = cat.color;
            ctx.font = 'bold 15px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(`${cat.comp}/${cat.req}${cat.unit} (${cat.percent.toFixed(1)}%)`, bx + colW - 20, by + 32);

            // Track
            const trackX = bx + 20;
            const trackY = by + 52;
            const trackW = colW - 40;
            const trackH = 18;
            ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
            ctx.beginPath();
            ctx.roundRect(trackX, trackY, trackW, trackH, 9);
            ctx.fill();

            // Fill
            const catFillW = Math.max(10, (trackW * Math.min(100, cat.percent)) / 100);
            ctx.fillStyle = cat.color;
            ctx.beginPath();
            ctx.roundRect(trackX, trackY, catFillW, trackH, 9);
            ctx.fill();
        });

        // Footer Banner
        ctx.fillStyle = '#64748b';
        ctx.font = '500 17px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Acompanhe sua grade interativa e pré-requisitos em: kmatrizesutfpr.com.br', width / 2, 615);
    }

    async function handleNativeShare() {
        const canvas = document.getElementById('share-canvas');
        if (!canvas) return;

        const btnShare = document.getElementById('btn-native-share');
        if (btnShare) btnShare.innerHTML = '<span>⏳ Preparando...</span>';

        let courseTitle = document.title.split('|')[0].trim();
        courseTitle = courseTitle.replace('Skill Tree', '').replace('Grade Interativa', '').replace('Matriz Curricular -', '').trim();
        
        let pStats = getStatsFromDOM();

        const shareText = `🎓 Concluí ${pStats.mainPercent.toFixed(1)}% (${pStats.completedCore}/${pStats.totalCore}) das disciplinas de ${courseTitle} na UTFPR! Acompanhe sua grade no K-Matrizes: https://kmatrizesutfpr.com.br`;

        canvas.toBlob(async (blob) => {
            if (!blob) return;

            // 1. Try Web Share API with File
            try {
                const file = new File([blob], 'meu_progresso_utfpr.png', { type: 'image/png' });
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: 'Meu Progresso na UTFPR - K-Matrizes',
                        text: shareText,
                        files: [file]
                    });
                    if (btnShare) btnShare.innerHTML = '<span>✅ Compartilhado!</span>';
                    setTimeout(() => { resetShareBtn(); }, 2500);
                    return;
                }
            } catch(e) {
                console.log('Web share file failed, trying fallback...', e);
            }

            // 2. Try Web Share API text/url
            try {
                if (navigator.share) {
                    await navigator.share({
                        title: 'Meu Progresso na UTFPR - K-Matrizes',
                        text: shareText,
                        url: 'https://kmatrizesutfpr.com.br'
                    });
                    if (btnShare) btnShare.innerHTML = '<span>✅ Compartilhado!</span>';
                    setTimeout(() => { resetShareBtn(); }, 2500);
                    return;
                }
            } catch(e) {
                console.log('Web share text failed...', e);
            }

            // 3. Fallback: Download & Clipboard copy
            fallbackDownloadAndCopy(canvas, blob, shareText);
            resetShareBtn();
        }, 'image/png');
    }

    function resetShareBtn() {
        const btnShare = document.getElementById('btn-native-share');
        if (btnShare) {
            btnShare.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg><span>🚀 Compartilhar Progresso</span>';
        }
    }

    async function fallbackDownloadAndCopy(canvas, blob, shareText) {
        // Download PNG file
        const link = document.createElement('a');
        link.download = 'meu_progresso_utfpr.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Copy Image directly to clipboard if supported
        let imageCopied = false;
        if (navigator.clipboard && window.ClipboardItem && blob) {
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                imageCopied = true;
            } catch(e) {
                console.log('Clipboard image copy not allowed:', e);
            }
        }

        if (!imageCopied && navigator.clipboard) {
            navigator.clipboard.writeText(shareText);
        }

        alert(imageCopied 
            ? '✨ Imagem copiada para a área de transferência e baixada! Você já pode colar (Ctrl+V) no WhatsApp ou Instagram.' 
            : '✨ Imagem do progresso baixada e legenda copiada! Você já pode colar no seu aplicativo favorito.');
    }

    document.addEventListener('DOMContentLoaded', function() {
        const btnDownload = document.getElementById('btn-download-badge');
        if (btnDownload) {
            btnDownload.addEventListener('click', function() {
                const canvas = document.getElementById('share-canvas');
                if (!canvas) return;
                const link = document.createElement('a');
                link.download = 'meu_progresso_utfpr.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    });
    </script>
'''

for file_path in course_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Replace share script with DOM reader script
    pattern_js = r"<!-- Script do Tutorial \(\?\) e Compartilhamento Nativo v\d.*?</script>"
    if re.search(pattern_js, html, flags=re.DOTALL):
        html = re.sub(pattern_js, lambda m: share_js_v3_script.strip(), html, flags=re.DOTALL)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)

print("Updated DOM Stats Reader across all course files successfully!")
