import re

course_files = [
    'pages/Skill tree M3.html',
    'pages/Skill tree M2.html',
    'pages/Skill tree Eletrica.html',
    'pages/Skill tree Automacao.html',
    'pages/Skill tree Mecatronica.html'
]

# 1. Updated Tutorial Modal HTML with exact requested text
tutorial_modal_html = '''
    <!-- Modal de Tutorial / Ajuda para Importação do Histórico (?) -->
    <div id="modal-tutorial-import" class="modal-overlay hidden">
        <div class="modal-box !max-w-lg text-left space-y-4">
            <div class="flex justify-between items-center border-b border-gray-700 pb-3">
                <h3 class="text-lg font-bold font-header text-cyan-400 flex items-center gap-2">
                    <span>📖</span> Como Importar seu Histórico Escolar (PDF)
                </h3>
                <button type="button" onclick="closeImportTutorialModal()" class="text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
            </div>

            <div class="space-y-3 text-sm text-gray-200">
                <div class="flex gap-3 items-start bg-gray-800/80 p-3 rounded-lg border border-gray-700">
                    <span class="bg-cyan-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                    <div>
                        <strong class="text-cyan-300">Acesse o Portal do Aluno</strong>
                        <p class="text-xs text-gray-300 mt-0.5">Entre no Portal do Aluno / Sistema Acadêmico da UTFPR com seu RA e senha.</p>
                    </div>
                </div>

                <div class="flex gap-3 items-start bg-gray-800/80 p-3 rounded-lg border border-gray-700">
                    <span class="bg-cyan-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                    <div>
                        <strong class="text-cyan-300">Clique em Histórico Completo</strong>
                        <p class="text-xs text-gray-300 mt-0.5">Acesse a seção de consultas e selecione o histórico escolar completo.</p>
                    </div>
                </div>

                <div class="flex gap-3 items-start bg-gray-800/80 p-3 rounded-lg border border-gray-700">
                    <span class="bg-cyan-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                    <div>
                        <strong class="text-cyan-300">Imprimir e Salvar em PDF</strong>
                        <p class="text-xs text-gray-300 mt-0.5">Clique no botão <strong>Imprimir</strong> que fica no topo da tela e escolha a opção <strong>"Salvar como PDF"</strong> no seu computador ou celular.</p>
                    </div>
                </div>

                <div class="flex gap-3 items-start bg-gray-800/80 p-3 rounded-lg border border-gray-700">
                    <span class="bg-cyan-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                    <div>
                        <strong class="text-cyan-300">Importar no K-Matrizes</strong>
                        <p class="text-xs text-gray-300 mt-0.5">Clique no botão <strong>"Importar Histórico (PDF)"</strong> nesta página e selecione o arquivo PDF baixado!</p>
                    </div>
                </div>
            </div>

            <div class="pt-2 text-center">
                <button type="button" onclick="closeImportTutorialModal()" class="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm px-6 py-2 rounded-lg transition-colors cursor-pointer">
                    Entendido!
                </button>
            </div>
        </div>
    </div>
'''

share_modal_v2_html = '''
    <!-- Modal de Compartilhamento de Progresso (Badge Viral v2) -->
    <div id="modal-share-badge" class="modal-overlay hidden">
        <div class="modal-box !max-w-2xl text-center space-y-4">
            <div class="flex justify-between items-center border-b border-gray-700 pb-3">
                <h3 class="text-xl font-bold font-header text-emerald-400 flex items-center gap-2">
                    <span>🎓</span> Compartilhar Seu Progresso
                </h3>
                <button type="button" onclick="closeShareModal()" class="text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
            </div>

            <p class="text-xs text-gray-300">
                Imagem gerada com as barras do seu curso para compartilhar direto nas suas redes sociais!
            </p>

            <!-- Preview do Canvas -->
            <div class="relative w-full overflow-hidden rounded-xl border border-gray-700 shadow-2xl bg-gray-900 flex justify-center p-2">
                <canvas id="share-canvas" width="1200" height="675" class="w-full h-auto max-h-[350px] object-contain rounded-lg"></canvas>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button type="button" id="btn-native-share" onclick="handleNativeShare()" class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2 cursor-pointer">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                    <span>🚀 Compartilhar Progresso</span>
                </button>

                <button type="button" id="btn-download-badge" class="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 border border-gray-600 cursor-pointer">
                    <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    <span>📥 Baixar PNG</span>
                </button>
            </div>
        </div>
    </div>
'''

share_js_v2_script = '''
    <!-- Script do Tutorial (?) e Compartilhamento Nativo v2 -->
    <script>
    window.getCourseProgressStats = function() {
        let coreNodes = (typeof nodes !== 'undefined' && Array.isArray(nodes)) ? nodes.filter(n => n.groupId !== '[1177]') : [];
        let completedCore = coreNodes.filter(s => (s.state || '').endsWith('-completed') || (s.state || '').endsWith('-satisfied')).length;
        let coreTotal = coreNodes.length;
        let corePercent = coreTotal > 0 ? (completedCore / coreTotal) * 100 : 0;

        let totalCompletedOptional = (typeof optionalNodes !== 'undefined' && Array.isArray(optionalNodes)) ? optionalNodes
            .filter(n => (n.state || '').endsWith('-completed'))
            .reduce((sum, n) => sum + (n.cht || 0), 0) : 0;
        let optionalReq = typeof TOTAL_OPTIONAL_HOURS !== 'undefined' ? TOTAL_OPTIONAL_HOURS : 300;
        let optionalPercent = optionalReq > 0 ? Math.min(100, (totalCompletedOptional / optionalReq) * 100) : 0;

        let totalCompletedHumanities = (typeof humanitiesNodes !== 'undefined' && Array.isArray(humanitiesNodes)) ? humanitiesNodes
            .filter(n => (n.state || '').endsWith('-completed'))
            .reduce((sum, n) => sum + (n.cht || 0), 0) : 0;
        let humanitiesReq = typeof TOTAL_HUMANITIES_HOURS !== 'undefined' ? TOTAL_HUMANITIES_HOURS : 210;
        let humanitiesPercent = humanitiesReq > 0 ? Math.min(100, (totalCompletedHumanities / humanitiesReq) * 100) : 0;

        let completedCompHours = (typeof completedAcActivities !== 'undefined' && Array.isArray(completedAcActivities)) ? completedAcActivities.reduce((sum, a) => sum + (a.hours || 0), 0) : 0;
        let compReq = typeof TOTAL_COMPLEMENTARY_HOURS !== 'undefined' ? TOTAL_COMPLEMENTARY_HOURS : 15;
        let compPercent = compReq > 0 ? Math.min(100, (completedCompHours / compReq) * 100) : 0;

        let completedExtHours = (typeof completedCceActivities !== 'undefined' && Array.isArray(completedCceActivities)) ? completedCceActivities.reduce((sum, a) => sum + (a.hours || 0), 0) : 0;
        let extReq = typeof TOTAL_EXTENSION_HOURS !== 'undefined' ? TOTAL_EXTENSION_HOURS : 465;
        let extPercent = extReq > 0 ? Math.min(100, (completedExtHours / extReq) * 100) : 0;

        return {
            mainPercent: corePercent,
            completedCore: completedCore,
            totalCore: coreTotal,
            optionalComp: totalCompletedOptional,
            optionalReq: optionalReq,
            optionalPercent: optionalPercent,
            humanitiesComp: totalCompletedHumanities,
            humanitiesReq: humanitiesReq,
            humanitiesPercent: humanitiesPercent,
            acComp: completedCompHours,
            acReq: compReq,
            acPercent: compPercent,
            cceComp: completedExtHours,
            cceReq: extReq,
            ccePercent: extPercent
        };
    };

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

        // Fetch stats from top panel calculation helper
        let pStats = {
            mainPercent: 0, completedCore: 0, totalCore: 0,
            optionalComp: 0, optionalReq: 300, optionalPercent: 0,
            humanitiesComp: 0, humanitiesReq: 210, humanitiesPercent: 0,
            acComp: 0, acReq: 15, acPercent: 0,
            cceComp: 0, cceReq: 465, ccePercent: 0
        };

        if (typeof window.getCourseProgressStats === 'function') {
            pStats = window.getCourseProgressStats();
        }

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
        if (btnShare) btnShare.innerHTML = '<span>⏳ Compartilhando...</span>';

        let courseTitle = document.title.split('|')[0].trim();
        courseTitle = courseTitle.replace('Skill Tree', '').replace('Grade Interativa', '').replace('Matriz Curricular -', '').trim();
        
        let pStats = { mainPercent: 0, completedCore: 0, totalCore: 0 };
        if (typeof window.getCourseProgressStats === 'function') {
            pStats = window.getCourseProgressStats();
        }

        const shareText = `🎓 Concluí ${pStats.mainPercent.toFixed(1)}% (${pStats.completedCore}/${pStats.totalCore}) das disciplinas de ${courseTitle} na UTFPR! Acompanhe sua grade no K-Matrizes: https://kmatrizesutfpr.com.br`;

        try {
            canvas.toBlob(async (blob) => {
                if (!blob) return;
                const file = new File([blob], 'meu_progresso_utfpr.png', { type: 'image/png' });

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            title: 'Meu Progresso na UTFPR - K-Matrizes',
                            text: shareText,
                            files: [file]
                        });
                        if (btnShare) btnShare.innerHTML = '<span>✅ Compartilhado!</span>';
                        setTimeout(() => { if (btnShare) btnShare.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg><span>🚀 Compartilhar Progresso</span>'; }, 2500);
                    } catch (err) {
                        if (err.name !== 'AbortError') {
                            fallbackDownloadAndCopy(canvas, shareText);
                        }
                        if (btnShare) btnShare.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg><span>🚀 Compartilhar Progresso</span>';
                    }
                } else if (navigator.share) {
                    try {
                        await navigator.share({
                            title: 'Meu Progresso na UTFPR - K-Matrizes',
                            text: shareText,
                            url: 'https://kmatrizesutfpr.com.br'
                        });
                    } catch(e) {
                        fallbackDownloadAndCopy(canvas, shareText);
                    }
                } else {
                    fallbackDownloadAndCopy(canvas, shareText);
                }
            }, 'image/png');
        } catch(err) {
            fallbackDownloadAndCopy(canvas, shareText);
        }
    }

    function fallbackDownloadAndCopy(canvas, shareText) {
        const link = document.createElement('a');
        link.download = 'meu_progresso_utfpr.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText);
        }
        alert('✅ Imagem do progresso baixada e legenda copiada! Você já pode colar no seu app favorito.');
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

    # 1. Help button (?)
    if 'openImportTutorialModal()' not in html:
        help_btn_html = '''
                <button type="button" onclick="openImportTutorialModal()"
                    class="w-9 h-9 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/60 text-cyan-300 font-extrabold border border-cyan-500/50 flex items-center justify-center transition-all cursor-pointer text-base shrink-0 shadow-md"
                    title="Como importar seu histórico escolar (PDF)?">
                    ?
                </button>'''
        html = html.replace('</label>\n                <input type="file" id="pdf-upload" accept=".pdf" class="hidden">', '</label>\n                <input type="file" id="pdf-upload" accept=".pdf" class="hidden">\n' + help_btn_html)

    # 2. Share button
    if 'btn-share-progress' not in html:
        share_btn_html = '''
                <button id="btn-share-progress" onclick="openShareModal()"
                    class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                    <span>Compartilhar Progresso</span>
                </button>'''
        html = html.replace('<button id="reset-button"', share_btn_html + '\n                <button id="reset-button"')

    # 3. Append modals and JS script cleanly before </body>
    if 'modal-tutorial-import' not in html:
        html = html.replace('</body>', tutorial_modal_html + '\n' + share_modal_v2_html + '\n' + share_js_v2_script + '\n</body>')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)

print("Applied clean features cleanly without breaking updateAllProgressBars!")
