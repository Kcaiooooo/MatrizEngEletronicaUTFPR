import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const courses = JSON.parse(readFileSync('tests/fixtures/courses.json'));

test.beforeEach(async ({ context, page }) => {
    await context.route(/googletagmanager|google-analytics|fonts\.google/, route => route.abort());
    await page.addInitScript(() => {
        const now = new Date();
        localStorage.setItem('kmatrizes_doacao_seen_date', `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`);
    });
});
for (const course of courses) {
    test(`histórico legado, abas e persistência: ${course.id}`, async ({ page }) => {
        const data = await import('../../'+course.data);
        const fixture = {
            nodesState: data.allNodesData.map((n,i)=>({id:n.id,state:i===0?'subject-completed':i===1?'subject-inprogress':'subject-locked'})),
            humanitiesNodesState: data.allHumanitiesData.map((n,i)=>({id:n.id,state:i===0?'humanities-completed':'humanities-locked'})),
            optionalNodesState: data.allOptionalNodesData.map((n,i)=>({id:n.id,state:i===0?'optional-completed':'optional-locked'})),
            currentPeriod: 4,
            completedAcActivities: [{desc:'Monitoria anterior',hours:15}],
            completedCceActivities: [{desc:'Extensão anterior',hours:30}],
            unknownFutureField: 'preservar',
        };
        const raw=JSON.stringify(fixture);
        await page.goto('/');
        await page.evaluate(({key,raw})=>localStorage.setItem(key,raw),{key:course.legacyProgressKey,raw});
        const errors=[];
        page.on('pageerror',error=>errors.push(error.message));
        await page.goto('/'+course.page);
        await expect(page.locator('#main-container .node').first()).toBeVisible();
        await expect(page.locator('#period-slider')).toHaveValue('4');
        await expect(page.locator(`#main-container [data-id="${data.allNodesData[0].id}"]`)).toHaveClass(/subject-completed/);
        await expect(page.locator(`#main-container [data-id="${data.allNodesData[1].id}"]`)).toHaveClass(/subject-inprogress/);
        if(await page.locator('#ac-list').count()) await expect(page.locator('#ac-list')).toContainText('Monitoria anterior');
        if(await page.locator('#cce-list').count()) await expect(page.locator('#cce-list')).toContainText('Extensão anterior');
        for (const tab of ['humanities','optional','main']) {
            if(await page.locator('#tab-'+tab).count()) {
                await page.locator('#tab-'+tab).click();
                await expect(page.locator('#'+tab+'-container')).toBeVisible();
            }
        }
        await page.locator('#period-slider').fill('5');
        await page.locator('#period-slider').dispatchEvent('input');
        const stored=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),course.progressKey);
        expect(stored.currentPeriod).toBe(5);
        expect(stored.unknownFutureField).toBe('preservar');
        expect(stored.nodesState.find(n=>n.id===data.allNodesData[0].id).state).toBe('subject-completed');
        if(course.progressKey!==course.legacyProgressKey) expect(await page.evaluate(key=>localStorage.getItem(key),course.legacyProgressKey)).toBe(raw);
        expect(await page.evaluate(key=>localStorage.getItem(key+':backup-before-refactor'),course.progressKey)).toBe(raw);
        await page.reload();
        await expect(page.locator('#period-slider')).toHaveValue('5');
        await expect(page.locator(`#main-container [data-id="${data.allNodesData[1].id}"]`)).toHaveClass(/subject-inprogress/);
        await page.locator('#btn-priority-analyzer').click();
        await expect(page.locator('#modal-priority-analyzer')).toBeVisible();
        expect(errors).toEqual([]);
    });
}

test('home, temas e navegação em tela móvel', async ({page}) => {
    await page.setViewportSize({width:390,height:844});
    await page.goto('/');
    await page.locator('#theme-select').selectOption('light');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme','light');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.locator('a[href="pages/Skill tree M3.html"]').click();
    await expect(page.locator('.node').first()).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-theme','light');
});

for (const course of courses.filter(course => ['eletrica', 'administracao', 'm2'].includes(course.id))) {
    test(`mapa móvel com viewport interno: ${course.id}`, async ({page}) => {
        await page.setViewportSize({width:390,height:844});
        await page.goto('/'+course.page);
        await expect(page.locator('#main-container .node').first()).toBeVisible();

        const metrics = await page.evaluate(() => {
            const viewport = document.querySelector('.tree-wrapper');
            const map = document.querySelector('#main-container');
            return {
                documentWidth: document.documentElement.scrollWidth,
                viewportWidth: viewport.clientWidth,
                viewportHeight: viewport.clientHeight,
                mapWidth: map.clientWidth,
                mapHeight: map.clientHeight,
                mapScrollWidth: viewport.scrollWidth,
                mapScrollHeight: viewport.scrollHeight,
                touchAction: getComputedStyle(viewport).touchAction,
            };
        });

        expect(metrics.documentWidth).toBe(390);
        expect(metrics.mapWidth).toBeGreaterThan(metrics.viewportWidth);
        expect(metrics.mapHeight).toBeGreaterThan(metrics.viewportHeight);
        expect(metrics.mapScrollWidth).toBeGreaterThan(metrics.viewportWidth);
        expect(metrics.mapScrollHeight).toBeGreaterThan(metrics.viewportHeight);
        expect(metrics.touchAction).toBe('none');

        const zoomControls = page.locator('.tree-zoom-controls');
        await expect(zoomControls).toBeVisible();
        await expect(zoomControls.locator('[data-zoom-level]')).toHaveText('100%');
        const initialStageWidth = await page.locator('.tree-stage').evaluate(element => element.clientWidth);
        await zoomControls.getByRole('button', {name: 'Aumentar zoom'}).click();
        await expect(zoomControls.locator('[data-zoom-level]')).toHaveText('110%');
        await expect.poll(() => page.locator('.tree-stage').evaluate(element => element.clientWidth)).toBeGreaterThan(initialStageWidth);
        await zoomControls.getByRole('button', {name: 'Redefinir zoom'}).click();
        await expect(zoomControls.locator('[data-zoom-level]')).toHaveText('100%');

        const viewport = page.locator('.tree-wrapper');
        await viewport.scrollIntoViewIfNeeded();
        const blankPoint = await page.evaluate(() => {
            const viewport = document.querySelector('.tree-wrapper');
            const rect = viewport.getBoundingClientRect();
            for (let y = 8; y < rect.height - 8; y += 16) {
                for (let x = 8; x < rect.width - 8; x += 16) {
                    const element = document.elementFromPoint(rect.left + x, rect.top + y);
                    if (element && !element.closest('.node')) return {x: rect.left + x, y: rect.top + y};
                }
            }
            return {x: rect.left + rect.width - 8, y: rect.top + rect.height - 8};
        });
        await page.mouse.move(blankPoint.x, blankPoint.y);
        await page.mouse.down();
        await page.mouse.move(blankPoint.x - 180, blankPoint.y, {steps: 8});
        await page.mouse.up();

        await expect.poll(() => viewport.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
    });
}

test('pinça amplia a matriz pelo ponto central do gesto', async ({page}) => {
    await page.setViewportSize({width:390,height:844});
    await page.goto('/pages/Skill tree Eletrica.html');
    const viewport = page.locator('.tree-wrapper');
    await expect(viewport.locator('.tree-zoom-controls')).toBeVisible();

    await page.evaluate(() => {
        const element = document.querySelector('.tree-wrapper');
        const dispatch = (type, pointerId, clientX, clientY) => element.dispatchEvent(new PointerEvent(type, {
            bubbles: true,
            cancelable: true,
            pointerId,
            pointerType: 'touch',
            clientX,
            clientY,
        }));
        dispatch('pointerdown', 1, 80, 220);
        dispatch('pointerdown', 2, 280, 220);
        dispatch('pointermove', 2, 360, 220);
        dispatch('pointerup', 1, 80, 220);
        dispatch('pointerup', 2, 360, 220);
    });

    await expect(viewport.locator('[data-zoom-level]')).toHaveText('140%');
});

test('JSON inválido não impede o carregamento', async ({page}) => {
    await page.goto('/');
    await page.evaluate(()=>localStorage.setItem('skillTreeProgress_Eletrica','{invalid'));
    await page.goto('/pages/Skill tree Eletrica.html');
    await expect(page.locator('.node').first()).toBeVisible();
    expect(await page.evaluate(()=>localStorage.getItem('skillTreeProgress_Eletrica'))).toBe('{invalid');
});

test('atividade digitada é texto e pode ser removida', async ({page}) => {
    await page.goto('/pages/Skill tree Eletrica.html');
    const payload='<img src=x onerror="window.injected=true">';
    await page.locator('#ac-form input[type=text]').fill(payload);
    await page.locator('#ac-form input[type=number]').fill('15');
    await page.locator('#ac-form button').click();
    await expect(page.locator('#ac-list')).toContainText(payload);
    await expect(page.locator('#ac-list img')).toHaveCount(0);
    expect(await page.evaluate(()=>window.injected)).toBeUndefined();
    await page.reload();
    await expect(page.locator('#ac-list')).toContainText(payload);
    await page.locator('#ac-list button').click();
    await expect(page.locator('#ac-list li')).toHaveCount(0);
});

test('reset não reimporta o legado nem apaga o histórico de outro curso', async ({page}) => {
    const first = courses.find(c=>c.id==='mecanica');
    const second = courses.find(c=>c.id==='administracao');
    const data=await import('../../'+first.data);
    const raw=JSON.stringify({nodesState:[{id:data.allNodesData[0].id,state:'subject-completed'}],currentPeriod:3});
    await page.goto('/');
    await page.evaluate(({key,raw})=>localStorage.setItem(key,raw),{key:first.legacyProgressKey,raw});
    await page.goto('/'+first.page);
    await expect(page.locator('.node.subject-completed').first()).toBeVisible();
    await page.locator('#reset-button').click();
    await page.reload();
    await expect(page.locator('.node.subject-completed')).toHaveCount(0);
    expect(await page.evaluate(key=>localStorage.getItem(key),first.legacyProgressKey)).toBe(raw);
    await page.goto('/'+second.page);
    await expect(page.locator('#period-slider')).toHaveValue('3');
    await page.locator('#period-slider').fill('4');
    await page.locator('#period-slider').dispatchEvent('input');
    expect(await page.evaluate(key=>localStorage.getItem(key),first.progressKey)).toBe('{}');
});

test('armazenamento bloqueado mantém o site utilizável e informa o usuário', async ({page}) => {
    await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}}));
    await page.goto('/pages/Skill tree Eletrica.html');
    await expect(page.locator('.node').first()).toBeVisible();
    await expect(page.locator('.storage-notice')).toBeVisible();
});

test('gera o cartão de compartilhamento sem enviar dados', async ({page}) => {
    await page.goto('/pages/Skill tree Eletrica.html');
    await page.locator('#btn-share-progress').click();
    await expect(page.locator('#share-canvas')).toBeVisible();
    expect(await page.locator('#share-canvas').evaluate(canvas=>canvas.toDataURL().length)).toBeGreaterThan(1000);
});

test('importa histórico PDF sintético pelo leitor real', async ({page}) => {
    await page.goto('/pages/Skill tree Eletrica.html');
    await page.locator('#pdf-upload').setInputFiles('tests/fixtures/history.pdf');
    await expect(page.locator('#upload-status')).toHaveText('Histórico importado com sucesso!',{timeout:15000});
    await expect(page.locator('#period-slider')).toHaveValue('3');
    await expect(page.locator('[data-id="ELT71A"]')).toHaveClass(/subject-completed/);
    await page.reload();
    await expect(page.locator('[data-id="ELT71A"]')).toHaveClass(/subject-completed/);
});

test('grupo satisfeito preserva disciplina em andamento', async ({page}) => {
    const course=courses.find(c=>c.id==='mecanica');
    const data=await import('../../'+course.data);
    const group=Object.entries(data.OPTIONAL_GROUPS_CONFIG).map(([id,config])=>({id,...config,nodes:data.allOptionalNodesData.filter(n=>n.groupId===id)})).find(g=>g.nodes.slice(1).reduce((sum,n)=>sum+n.cht,0)>=g.requiredHours && g.nodes.length>1);
    expect(group).toBeTruthy();
    const raw=JSON.stringify({currentPeriod:10,optionalNodesState:group.nodes.map((n,i)=>({id:n.id,state:i===0?'optional-inprogress':'optional-completed'}))});
    await page.goto('/');
    await page.evaluate(({key,raw})=>localStorage.setItem(key,raw),{key:course.legacyProgressKey,raw});
    await page.goto('/'+course.page);
    await page.locator('#tab-optional').click();
    await expect(page.locator(`[data-id="${group.nodes[0].id}"]`)).toHaveClass(/optional-inprogress/);
    await page.locator('#period-slider').dispatchEvent('input');
    await page.reload();
    await page.locator('#tab-optional').click();
    await expect(page.locator(`[data-id="${group.nodes[0].id}"]`)).toHaveClass(/optional-inprogress/);
});

test('falha na imagem restaura o botão de compartilhamento', async ({page}) => {
    await page.goto('/pages/Skill tree Eletrica.html');
    await page.locator('#btn-share-progress').click();
    await page.evaluate(()=>HTMLCanvasElement.prototype.toBlob=function(callback){callback(null);});
    await page.locator('#btn-native-share').click();
    await expect(page.locator('#btn-native-share')).not.toContainText('Preparando');
});

test('resposta do formulário não é apresentada como confirmação de entrega', async ({page,context}) => {
    // Intercept before submitting: this test never sends a request to the external service.
    await context.route('https://formsubmit.co/**',route=>route.fulfill({status:500,contentType:'text/html',body:'Serviço indisponível'}));
    await page.goto('/');
    await page.getByRole('button',{name:/Pedir curso \/ Reportar/}).click();
    await page.locator('#req-course-name').fill('Curso de teste');
    await page.locator('#req-institution').fill('Instituição fictícia');
    await page.locator('#req-description').fill('Teste automático, sem envio externo.');
    await page.locator('#btn-submit-req').click();
    await expect(page.locator('#req-status-msg')).toContainText('não pode ser confirmada');
    await expect(page.locator('#req-course-name')).toHaveValue('Curso de teste');
    await expect(page.locator('#modal-request-course')).toBeVisible();
    await expect(page.locator('#btn-submit-req')).toBeEnabled();
});

test('redimensionar M3 não duplica cabeçalhos das trilhas', async ({page}) => {
    await page.goto('/pages/Skill tree M3.html');
    await page.locator('#tab-optional').click();
    const headers=page.locator('#optional-container .track-header');
    const count=await headers.count();
    expect(count).toBeGreaterThan(0);
    await page.setViewportSize({width:1300,height:900});
    await expect(headers).toHaveCount(count);
    await page.setViewportSize({width:1440,height:900});
    await expect(headers).toHaveCount(count);
});

test('normalização mantém optativas de Mecânica dentro da área', async ({page}) => {
    await page.goto('/pages/Skill tree Mecanica.html');
    await page.locator('#tab-optional').click();
    const maxY=await page.locator('#optional-container .node').evaluateAll(nodes=>Math.max(...nodes.map(node=>parseFloat(node.style.top))));
    expect(maxY).toBeLessThanOrEqual(92);
});
