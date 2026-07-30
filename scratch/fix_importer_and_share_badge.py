import re

course_files = [
    'pages/Skill tree M3.html',
    'pages/Skill tree M2.html',
    'pages/Skill tree Eletrica.html',
    'pages/Skill tree Automacao.html',
    'pages/Skill tree Mecatronica.html'
]

# 1. Inject window.getCourseProgressStats inside updateAllProgressBars in each course file
for file_path in course_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    helper_fn = '''
            window.getCourseProgressStats = function() {
                let allArr = [];
                if (typeof nodes !== 'undefined' && Array.isArray(nodes)) allArr = allArr.concat(nodes);
                if (typeof humanitiesNodes !== 'undefined' && Array.isArray(humanitiesNodes)) allArr = allArr.concat(humanitiesNodes);
                if (typeof optionalNodes !== 'undefined' && Array.isArray(optionalNodes)) allArr = allArr.concat(optionalNodes);

                let totalSubs = allArr.length;
                let compSubs = 0;
                let totalCht = 0;
                let compCht = 0;

                allArr.forEach(n => {
                    const cht = parseInt(n.cht) || 0;
                    totalCht += cht;
                    const isCompleted = (n.state || '').endsWith('-completed') || (n.state || '').endsWith('-satisfied');
                    if (isCompleted) {
                        compSubs++;
                        compCht += cht;
                    }
                });

                let percentNum = 0;
                if (totalCht > 0) percentNum = (compCht / totalCht) * 100;
                else if (totalSubs > 0) percentNum = (compSubs / totalSubs) * 100;

                return {
                    totalSubs: totalSubs,
                    compSubs: compSubs,
                    totalCht: totalCht,
                    compCht: compCht,
                    percentNum: percentNum
                };
            };
'''
    if 'window.getCourseProgressStats =' not in html:
        html = html.replace('function updateAllProgressBars() {', 'function updateAllProgressBars() {\n' + helper_fn)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)

print("Injected window.getCourseProgressStats inside updateAllProgressBars for all course files!")

# 2. Update Share Script to use window.getCourseProgressStats()
share_js_script = '''
    <!-- Script de Compartilhamento / Badge Viral -->
    <script>
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

        // Dimensions: 1200 x 675 (16:9)
        const width = 1200;
        const height = 675;

        // Fetch stats from global helper
        let pStats = { totalSubs: 0, compSubs: 0, totalCht: 0, compCht: 0, percentNum: 0 };
        if (typeof window.getCourseProgressStats === 'function') {
            pStats = window.getCourseProgressStats();
        }

        const compSubs = pStats.compSubs;
        const totalSubs = pStats.totalSubs;
        const compCht = pStats.compCht;
        const totalCht = pStats.totalCht;
        const percentNum = pStats.percentNum;

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
        ctx.fillText('🎓 K-MATRIZES · UTFPR CÂMPUS CURITIBA', 60, 80);

        // Course Subtitle
        ctx.fillStyle = '#94a3b8';
        ctx.font = '600 20px Inter, sans-serif';
        ctx.fillText(courseTitle.toUpperCase(), 60, 115);

        // Main Percentage Highlight
        const mainGrad = ctx.createLinearGradient(60, 0, 600, 0);
        mainGrad.addColorStop(0, '#fbbf24');
        mainGrad.addColorStop(0.5, '#f59e0b');
        mainGrad.addColorStop(1, '#10b981');
        ctx.fillStyle = mainGrad;
        ctx.font = 'bold 96px "Roboto Slab", serif';
        ctx.fillText(`${percentNum.toFixed(1)}%`, 60, 230);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px Inter, sans-serif';
        ctx.fillText('ENGENHEIRO(A) EM FORMAÇÃO 🎓', 60, 280);

        // Progress Bar Track
        const barX = 60;
        const barY = 320;
        const barW = width - 120;
        const barH = 32;
        ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
        ctx.beginPath();
        ctx.roundRect(barX, barY, barW, barH, 16);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Progress Bar Fill
        const fillW = Math.max(20, (barW * Math.min(100, percentNum)) / 100);
        const barGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
        barGrad.addColorStop(0, '#3b82f6');
        barGrad.addColorStop(0.5, '#8b5cf6');
        barGrad.addColorStop(1, '#10b981');
        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(barX, barY, fillW, barH, 16);
        ctx.fill();

        // Stats Box Grid (2 Balanced Columns)
        const boxY = 390;
        const boxW = (width - 140) / 2;
        const boxH = 140;

        const stats = [
            { label: 'DISCIPLINAS CONCLUÍDAS', val: `${compSubs} / ${totalSubs}`, color: '#38bdf8' },
            { label: 'CARGA HORÁRIA TOTAL (CHT)', val: `${compCht}h / ${totalCht}h`, color: '#10b981' }
        ];

        stats.forEach((st, idx) => {
            const bx = 60 + idx * (boxW + 20);
            ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
            ctx.beginPath();
            ctx.roundRect(bx, boxY, boxW, boxH, 16);
            ctx.fill();
            ctx.strokeStyle = 'rgba(51, 65, 85, 0.8)';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 15px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(st.label, bx + boxW / 2, boxY + 42);

            ctx.fillStyle = st.color;
            ctx.font = 'bold 36px Inter, sans-serif';
            ctx.fillText(st.val, bx + boxW / 2, boxY + 95);
        });

        // Footer Banner
        ctx.fillStyle = '#64748b';
        ctx.font = '500 18px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Acompanhe sua grade interativa e pré-requisitos em: kmatrizesutfpr.com.br', width / 2, 600);
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

        const btnCopy = document.getElementById('btn-copy-share-text');
        if (btnCopy) {
            btnCopy.addEventListener('click', function() {
                let courseTitle = document.title.split('|')[0].trim();
                const shareText = `🎓 Já completei meu progresso no curso de ${courseTitle} na UTFPR! Acompanhe sua grade interativa e pré-requisitos também no K-Matrizes: https://kmatrizesutfpr.com.br`;
                navigator.clipboard.writeText(shareText).then(() => {
                    const label = document.getElementById('label-copy-share');
                    if (label) label.textContent = '✅ Texto Copiado!';
                    setTimeout(() => {
                        if (label) label.textContent = '📋 Copiar Texto para Post';
                    }, 2500);
                });
            });
        }
    });
    </script>
'''

for file_path in course_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Replace share script
    if '<!-- Script de Compartilhamento / Badge Viral -->' in html:
        pattern = r"<!-- Script de Compartilhamento / Badge Viral -->.*?</script>"
        html = re.sub(pattern, share_js_script.strip(), html, flags=re.DOTALL)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)

print("Updated share script across all course files!")
