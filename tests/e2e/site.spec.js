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

function addSingleDependencyColorTest(course) {
    test(`colore matéria com dependência única pela seta: ${course.id}`, async ({ page }) => {
        const data = await import('../../' + course.data);
        const target = data.allNodesData.find(node => node.dependencies?.length === 1);
        const parentId = target.dependencies[0];

        await page.goto('/');
        await page.evaluate(({ key, parentId }) => {
            localStorage.setItem(key, JSON.stringify({
                currentPeriod: 10,
                nodesState: [{ id: parentId, state: 'subject-completed' }],
            }));
        }, { key: course.progressKey, parentId });
        await page.goto('/' + course.page);

        const targetNode = page.locator(`#main-container [data-id="${target.id}"]`);
        await expect(targetNode).toHaveClass(/subject-available/);
        const arrow = page.locator(`#main-lines path.line-completed[marker-end*="${parentId}"]`).first();
        await expect(arrow).toHaveCount(1);

        const colors = await page.evaluate(({ targetId, parentId }) => {
            const targetElement = document.querySelector(`#main-container [data-id="${targetId}"]`);
            const arrowElement = document.querySelector(`#main-lines path.line-completed[marker-end*="${parentId}"]`);
            const hue = (color) => {
                const [r, g, b] = color.match(/\d+/g).map(Number).map(value => value / 255);
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                const delta = max - min;
                if (delta === 0) return 0;
                let result;
                if (max === r) result = ((g - b) / delta) % 6;
                else if (max === g) result = (b - r) / delta + 2;
                else result = (r - g) / delta + 4;
                return (result * 60 + 360) % 360;
            };
            return {
                targetBackground: getComputedStyle(targetElement).backgroundColor,
                targetBackgroundPriority: targetElement.style.getPropertyPriority('background-color'),
                targetHue: hue(getComputedStyle(targetElement).backgroundColor),
                arrowHue: hue(getComputedStyle(arrowElement).stroke),
            };
        }, { targetId: target.id, parentId });

        expect(colors.targetBackground).not.toBe('rgb(37, 99, 235)');
        expect(colors.targetBackgroundPriority).toBe('important');
        const hueDistance = Math.abs(colors.targetHue - colors.arrowHue);
        expect(Math.min(hueDistance, 360 - hueDistance)).toBeLessThan(1);
    });
}

function addArrowGeometryTest(course) {
    test(`mantém setas encostadas e orientadas nas matérias: ${course.id}`, async ({ page }) => {
        await page.goto('/' + course.page);
        const geometry = await page.evaluate(() => {
            const svg = document.querySelector('#main-lines');
            const svgRect = svg.getBoundingClientRect();
            const targetTops = [...document.querySelectorAll('#main-container .node')]
                .map(node => node.getBoundingClientRect().top - svgRect.top);
            const paths = [...svg.querySelectorAll('path.line-locked, path.line-completed')];
            const invalid = [];
            const markerRefs = new Set();

            paths.forEach(path => {
                const values = (path.getAttribute('d').match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
                const points = [];
                for (let index = 0; index < values.length; index += 2) {
                    points.push([values[index], values[index + 1]]);
                }
                const end = points.at(-1);
                const previous = points.at(-2);
                const markerId = path.getAttribute('marker-end')?.match(/#([^)]*)/)?.[1];
                if (markerId) markerRefs.add(document.getElementById(markerId)?.getAttribute('refX'));

                const isVerticalApproach = Math.abs(end[0] - previous[0]) < 0.5 && Math.abs(end[1] - previous[1]) >= 1;
                const reachesTargetTop = targetTops.some(top => Math.abs(top - end[1]) < 1);
                if (!isVerticalApproach || !reachesTargetTop) {
                    invalid.push({ end, previous, isVerticalApproach, reachesTargetTop });
                }
            });

            return { pathCount: paths.length, invalid, markerRefs: [...markerRefs] };
        });

        expect(geometry.pathCount).toBeGreaterThan(0);
        expect(geometry.invalid).toEqual([]);
        expect(geometry.markerRefs).toEqual(['10']);
    });
}

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

for (const course of courses.filter(course => ['m2', 'm3'].includes(course.id))) {
    test(`detalhes da ementa no cartão: ${course.id}`, async ({ page }) => {
        await page.goto('/' + course.page);
        const node = page.locator('#main-container .node').first();
        await expect(node).toBeVisible();
        const stateBeforeDetails = await node.getAttribute('class');
        await node.hover();
        const detailsButton = node.locator('.course-more-info');
        const nodeBox = await node.boundingBox();
        const buttonBox = await detailsButton.boundingBox();
        await page.mouse.move(nodeBox.x + nodeBox.width / 2, nodeBox.y + nodeBox.height / 2);
        await page.mouse.move(buttonBox.x + buttonBox.width / 2, buttonBox.y + buttonBox.height / 2, { steps: 12 });
        await expect(detailsButton).toBeVisible();
        await detailsButton.click();

        const modal = page.locator('#course-details-modal');
        await expect(modal).toBeVisible();
        await expect(modal.locator('#course-details-title')).toContainText('ELB11');
        await expect(modal.locator('.course-details-source')).toContainText(course.id === 'm2' ? 'PPC M906' : 'PPC M968');
        await expect(modal.locator('.course-details-section-title').first()).toBeVisible();
        await expect(modal.locator('.course-details-content')).toContainText('Ementa');
        if (course.id === 'm2') {
            await expect(modal.locator('.course-details-content')).toContainText('Objetivos da disciplina');
            await expect(modal.locator('.course-details-content')).toContainText('Referências bibliográficas');
        }

        await page.keyboard.press('Escape');
        await expect(modal).toBeHidden();
        await expect(node).toHaveAttribute('class', stateBeforeDetails);
    });

    test(`exibe apenas o card da matéria sob o mouse: ${course.id}`, async ({ page }) => {
        await page.goto('/' + course.page);
        const nodes = page.locator('#main-container .node');
        const first = nodes.nth(0);
        const second = nodes.nth(1);
        await first.hover();
        await expect(first.locator('.tooltip')).toHaveClass(/visible/);
        await second.hover();
        await expect(first.locator('.tooltip')).not.toHaveClass(/visible/);
        await expect(second.locator('.tooltip')).toHaveClass(/visible/);
    });
}

test('calcula as trilhas da matriz 978 sem somar alternativas de Formação Complementar', async ({ page }) => {
    const data = await import('../../assets/js/data/automacao.js');
    const nodesByGroup = data.allOptionalNodesData.reduce((groups, node) => {
        (groups[node.groupId] ??= []).push(node);
        return groups;
    }, {});
    const optionalNodesState = [];
    for (const groupId of ['[1139]', '[1138]', '[1146]', '[1147]']) {
        let selectedHours = 0;
        for (const node of nodesByGroup[groupId]) {
            optionalNodesState.push({ id: node.id, state: 'optional-completed' });
            selectedHours += node.cht;
            if (selectedHours >= 135) break;
        }
    }

    await page.goto('/');
    await page.evaluate(({ key, optionalNodesState }) => {
        localStorage.setItem(key, JSON.stringify({ currentPeriod: 10, optionalNodesState }));
    }, { key: 'skillTreeProgress_Automacao_automacao', optionalNodesState });
    await page.goto('/pages/Skill tree Automacao.html');

    await expect(page.locator('#optional-progress-text')).toHaveText('405/405h (100.0%)');
});

test('posiciona todas as optativas da matriz 979 dentro das suas trilhas', async ({ page }) => {
    const data = await import('../../assets/js/data/eletrica.js');

    await page.goto('/pages/Skill tree Eletrica.html');
    await page.locator('#tab-optional').click();

    const layouts = await page.locator('#optional-container .node').evaluateAll(nodes => nodes.map(node => ({
        id: node.dataset.id,
        left: node.style.left,
        top: node.style.top,
    })));

    expect(layouts).toHaveLength(data.allOptionalNodesData.length);
    expect(layouts.every(node => /^\d+(?:\.\d+)?%$/.test(node.left) && /^\d+(?:\.\d+)?%$/.test(node.top))).toBe(true);

    const machinesLevelTwo = layouts.find(node => node.id === 'ELT7FM');
    expect(machinesLevelTwo).toEqual({ id: 'ELT7FM', left: '10%', top: '62%' });
});

for (const course of courses) addSingleDependencyColorTest(course);
for (const course of courses) addArrowGeometryTest(course);

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

test('home e matrizes exibem atalho para turmas abertas', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href="pages/Turmas Abertas.html"]')).not.toHaveCount(0);

    await page.goto('/pages/Skill tree M3.html');
    const shortcut = page.getByRole('link', { name: 'Turmas abertas', exact: true });
    await expect(shortcut).toHaveAttribute('href', 'Turmas Abertas.html');
});

for (const course of courses) {
    test(`atalho para turmas abertas na matriz: ${course.id}`, async ({ page }) => {
        await page.goto('/' + course.page);
        await expect(page.getByRole('link', { name: 'Turmas abertas', exact: true })).toHaveCount(1);
    });
}

test('turmas abertas exibem a captura oficial, filtram disciplinas e listam o histórico', async ({ page }) => {
    await page.goto('/pages/Turmas Abertas.html');
    await expect(page.locator('#grade-content')).toBeVisible();
    await expect(page.locator('#source-note')).toContainText('Sistema Acadêmico UTFPR');
    await expect(page.locator('#campus-select')).toHaveValue('curitiba');
    await page.locator('#course-select').selectOption('0250');
    await expect(page.locator('#stat-disciplines')).toHaveText('150');
    await expect(page.locator('#history-list .gnh-history-item')).toHaveCount(1);
    await page.locator('#discipline-code').fill('MAT7AL');
    await expect(page.locator('#disciplines-list .gnh-discipline')).toHaveCount(1);
    await expect(page.locator('#disciplines-list')).toContainText('Álgebra Linear');
    await expect(page.locator('#disciplines-list')).toContainText('Ecoville');
    await expect(page.locator('#disciplines-list')).toContainText('Willian Goulart Gomes Velasco');
});

test('disciplinas ofertadas filtram por código, nome e horário', async ({ page }) => {
    await page.goto('/pages/Turmas Abertas.html');
    await page.locator('#course-select').selectOption('0250');
    await page.locator('#discipline-code').fill('MAT7AL');
    await page.locator('#discipline-search').fill('álgebra linear');
    await page.locator('#discipline-schedule').fill('2T2');

    await expect(page.locator('#disciplines-list .gnh-discipline')).toHaveCount(1);
    await expect(page.locator('#disciplines-list .gnh-discipline-name')).toHaveText('Álgebra Linear');
    await expect(page.locator('#disciplines-list .gnh-class')).toHaveCount(1);
    await expect(page.locator('#disciplines-list')).toContainText('Turma S51');
    await expect(page.locator('#disciplines-list')).toContainText('2T2');
});

test('busca matéria equivalente em todos os cursos do câmpus', async ({ page }) => {
    await page.goto('/pages/Turmas Abertas.html');
    await page.locator('#course-select').selectOption('0250');
    await page.locator('#discipline-code').fill('MATZAL');
    await page.locator('#discipline-campus-scope').check();

    await expect(page.locator('#discipline-scope-note')).toBeVisible();
    await expect(page.locator('#disciplines-list .gnh-discipline')).not.toHaveCount(0);
    await expect(page.locator('#disciplines-list .gnh-discipline-course')).not.toHaveCount(0);
    await expect(page.locator('#disciplines-list .gnh-discipline-code').first()).toHaveText('MAT7GA');

    await page.locator('#disciplines-list .gnh-discipline').first().locator('summary').click();
    await page.locator('#disciplines-list .gnh-class').first().click();
    await expect(page.locator('#calendar-note')).toContainText('1 turma(s) selecionada(s)');
});

test('turmas abertas montam um calendário com as turmas selecionadas', async ({ page }) => {
    await page.goto('/pages/Turmas Abertas.html');
    await page.locator('#course-select').selectOption('0250');
    await page.locator('#discipline-code').fill('MAT7AL');
    await page.locator('#disciplines-list .gnh-discipline').first().locator('summary').click();
    const turma = page.locator('.gnh-class').first();
    await expect(page.locator('.gnh-calendar-checkbox')).toHaveCount(0);
    await turma.click();
    await expect(turma).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#calendar-note')).toContainText('1 turma(s) selecionada(s)');
    await expect(page.locator('#calendar-grid')).toContainText('Início');
    await expect(page.locator('#calendar-grid')).toContainText('07h30');
    await expect(page.locator('#calendar-grid .gnh-calendar-header')).toHaveText(['Turno', 'Início', 'Térm.', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']);
    const calendarMetrics = await page.locator('.gnh-calendar-scroll').evaluate(element => ({
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        clientHeight: element.clientHeight,
        scrollHeight: element.scrollHeight,
    }));
    expect(calendarMetrics.scrollWidth).toBe(calendarMetrics.clientWidth);
    expect(calendarMetrics.scrollHeight).toBe(calendarMetrics.clientHeight);
    await expect(page.locator('.gnh-calendar-event').first()).toBeVisible();
    await expect(page.locator('#clear-calendar')).toBeEnabled();
    await page.locator('#clear-calendar').click();
    await expect(page.locator('#calendar-note')).toContainText('Selecione uma ou mais turmas');
    await expect(page.locator('#clear-calendar')).toBeDisabled();
});

test('calendário persiste e mantém turmas ao trocar de curso', async ({ page }) => {
    await page.goto('/pages/Turmas Abertas.html');
    await page.locator('#course-select').selectOption('0250');
    await page.locator('#discipline-code').fill('MAT7AL');
    await page.locator('#disciplines-list .gnh-discipline').first().locator('summary').click();
    await page.locator('.gnh-class').first().click();
    await expect(page.locator('#calendar-note')).toContainText('1 turma(s) selecionada(s)');

    await page.locator('#course-select').selectOption('0002');
    await expect(page.locator('#selection-note')).toContainText('ENG.IND.ELETRÔNICA');
    await expect(page.locator('#calendar-note')).toContainText('1 turma(s) selecionada(s)');
    await expect(page.locator('.gnh-calendar-event').first()).toBeVisible();
    await page.reload();
    await expect(page.locator('#calendar-note')).toContainText('1 turma(s) selecionada(s)');
    await expect(page.locator('.gnh-calendar-event').first()).toBeVisible();
});

test('calendário compacto não cria rolagem em tela móvel', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/pages/Turmas Abertas.html');
    await page.locator('#course-select').selectOption('0250');
    await page.locator('#discipline-code').fill('MAT7AL');
    await page.locator('#disciplines-list .gnh-discipline').first().locator('summary').click();
    await page.locator('.gnh-class').first().click();
    const metrics = await page.evaluate(() => {
        const calendar = document.querySelector('.gnh-calendar-scroll');
        return {
            documentWidth: document.documentElement.scrollWidth,
            viewportWidth: window.innerWidth,
            calendarWidth: calendar.clientWidth,
            calendarScrollWidth: calendar.scrollWidth,
            calendarHeight: calendar.clientHeight,
        };
    });
    expect(metrics.documentWidth).toBe(metrics.viewportWidth);
    expect(metrics.calendarScrollWidth).toBe(metrics.calendarWidth);
    expect(metrics.calendarHeight).toBeLessThan(500);
});

test('calendário bloqueia conflitos, sinaliza o limite e pré-visualiza horários', async ({ page }) => {
    await page.goto('/pages/Turmas Abertas.html');
    await page.locator('#course-select').selectOption('0250');
    await page.locator('#discipline-code').fill('MAT7AL');
    await page.locator('#disciplines-list .gnh-discipline').first().locator('summary').click();
    const classes = page.locator('#disciplines-list .gnh-class');
    const first = classes.nth(0);
    const second = classes.nth(1);
    await first.click();

    await second.hover();
    await expect(page.locator('.gnh-calendar-cell-conflict').first()).toBeVisible();
    await second.click();
    await expect(second).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#calendar-validation')).toContainText('Conflito de horário');

    await page.locator('#calendar-limit').fill('1');
    await expect(page.locator('#calendar-usage')).toHaveText('Aulas usadas: 4 / 1');
    await expect(page.locator('#calendar-validation')).toContainText('limite de 1 aulas/semana');
    await expect(page.locator('.gnh-mini-calendar-card')).toHaveCSS('position', 'sticky');
});

test('minicalendário acompanha a rolagem e remove uma turma ao clicar nela', async ({ page }) => {
    await page.goto('/pages/Turmas Abertas.html');
    await page.locator('#course-select').selectOption('0250');
    await page.locator('#discipline-code').fill('MAT7AL');
    await page.locator('#disciplines-list .gnh-discipline').first().locator('summary').click();
    const turma = page.locator('.gnh-class').first();
    await turma.click();
    const miniEvent = page.locator('.gnh-mini-calendar-grid .gnh-calendar-event-clickable').first();
    await expect(miniEvent).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, document.querySelector('.gnh-layout').offsetTop + 450));
    const stickyTop = await page.locator('.gnh-mini-calendar-card').evaluate(element => element.getBoundingClientRect().top);
    expect(stickyTop).toBeGreaterThanOrEqual(0);
    expect(stickyTop).toBeLessThan(40);
    const sidebarBoxes = await page.evaluate(() => {
        const mini = document.querySelector('.gnh-mini-calendar-card').getBoundingClientRect();
        const history = document.querySelector('.gnh-history-card').getBoundingClientRect();
        return { miniHeight: mini.height, miniBottom: mini.bottom, historyTop: history.top };
    });
    expect(sidebarBoxes.miniHeight).toBeLessThan(600);
    expect(sidebarBoxes.historyTop).toBeGreaterThanOrEqual(sidebarBoxes.miniBottom);

    await miniEvent.click();
    await expect(turma).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#calendar-note')).toContainText('Selecione uma ou mais turmas');
});

test('grade automática usa a matriz selecionada e encaixa turmas sem conflito', async ({ page }) => {
    await page.goto('/pages/Turmas Abertas.html');
    await page.locator('#course-select').selectOption('0250');
    await expect(page.locator('#stat-disciplines')).toHaveText('150');
    await page.getByRole('button', { name: 'Grade automática' }).click();
    await expect(page.locator('#auto-grade-modal')).toBeVisible();
    await expect(page.locator('#auto-grade-matrix option')).toHaveCount(13);
    await page.locator('#auto-grade-matrix').selectOption('m2');
    await page.getByRole('button', { name: 'Montar grade' }).click();
    await expect(page.locator('#auto-grade-modal')).toBeHidden();
    await expect(page.locator('#calendar-validation')).toContainText('Grade automática');
    await expect(page.locator('.gnh-class-selected')).not.toHaveCount(0);
    await expect(page.locator('.gnh-calendar-cell-conflict')).toHaveCount(0);
});

test('grade automática respeita dias, turnos e sede disponíveis em Curitiba', async ({ page }) => {
    await page.goto('/pages/Turmas Abertas.html');
    await page.locator('#course-select').selectOption('0250');
    await page.getByRole('button', { name: 'Grade automática' }).click();
    await expect(page.locator('[data-auto-grade-grid]')).toHaveCount(2);
    await expect(page.locator('[data-auto-grade-grid="Centro"]')).toBeVisible();
    await expect(page.locator('[data-auto-grade-grid="Ecoville"]')).toBeVisible();
    await expect(page.locator('[data-auto-grade-slot]')).toHaveCount(204);

    const centroSlot = page.locator('[data-auto-grade-slot="Centro|7-M-1"]');
    const ecovilleSlot = page.locator('[data-auto-grade-slot="Ecoville|7-M-1"]');
    const avoidedClassSlot = page.locator('[data-auto-grade-slot="Centro|2-T-2"]');
    await centroSlot.click();
    await ecovilleSlot.click();
    await avoidedClassSlot.click();
    await expect(centroSlot).toHaveAttribute('aria-pressed', 'true');
    await expect(ecovilleSlot).toHaveAttribute('aria-pressed', 'true');
    await expect(avoidedClassSlot).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: 'Montar grade' }).click();

    await expect(page.locator('#auto-grade-modal')).toBeHidden();
    await expect(page.locator('.gnh-class-selected')).not.toHaveCount(0);
    expect((await page.locator('.gnh-class-selected').allTextContents()).join('\n')).not.toContain('2T2');
});

test('grade automática usa uma única grade para os demais câmpus', async ({ page }) => {
    await page.goto('/pages/Turmas Abertas.html');
    await page.locator('#campus-select').selectOption('apucarana');
    await expect(page.locator('#auto-grade')).toBeEnabled();
    await page.getByRole('button', { name: 'Grade automática' }).click();
    await expect(page.locator('[data-auto-grade-grid]')).toHaveCount(1);
    await expect(page.locator('[data-auto-grade-grid="__campus__"]')).toBeVisible();
    await expect(page.locator('[data-auto-grade-grid="Centro"]')).toHaveCount(0);
});

test('grade automática avisa quando a matriz não corresponde ao curso selecionado', async ({ page }) => {
    await page.goto('/pages/Turmas Abertas.html');
    await page.getByRole('button', { name: 'Grade automática' }).click();
    await page.locator('#auto-grade-matrix').selectOption('m2');
    await page.getByRole('button', { name: 'Montar grade' }).click();
    await expect(page.locator('#auto-grade-modal')).toBeVisible();
    await expect(page.locator('#auto-grade-status')).toContainText('não corresponde');
    await expect(page.locator('#calendar-note')).toContainText('Selecione uma ou mais turmas');
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
