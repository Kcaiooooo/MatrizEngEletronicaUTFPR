const MODAL_ID = 'course-details-modal';

function text(value) {
    return value == null ? '' : String(value);
}

function createSection(title, content, className = '') {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;

    const section = document.createElement('section');
    section.className = `course-details-section ${className}`.trim();

    const heading = document.createElement('h4');
    heading.className = 'course-details-section-title';
    heading.textContent = title;
    section.appendChild(heading);

    if (Array.isArray(content)) {
        const list = document.createElement('ul');
        list.className = 'course-details-list';
        content.forEach(item => {
            const li = document.createElement('li');
            li.textContent = text(item);
            list.appendChild(li);
        });
        section.appendChild(list);
    } else {
        const paragraph = document.createElement('p');
        paragraph.className = 'course-details-text';
        paragraph.textContent = text(content);
        section.appendChild(paragraph);
    }

    return section;
}

function createModal() {
    let modal = document.getElementById(MODAL_ID);
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = MODAL_ID;
    modal.className = 'course-details-overlay';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'course-details-title');
    modal.innerHTML = `
        <div class="course-details-dialog" role="document">
            <header class="course-details-header">
                <div>
                    <p id="course-details-source" class="course-details-source"></p>
                    <h3 id="course-details-title" class="course-details-title"></h3>
                </div>
                <button type="button" class="course-details-close" data-course-details-close aria-label="Fechar detalhes">&times;</button>
            </header>
            <div id="course-details-meta" class="course-details-meta"></div>
            <div id="course-details-content" class="course-details-content"></div>
            <footer class="course-details-footer">
                <span>Informações transcritas do PPC da matriz selecionada.</span>
                <button type="button" class="course-details-close-button" data-course-details-close>Fechar</button>
            </footer>
        </div>
    `;
    document.body.appendChild(modal);

    const close = () => closeCourseDetails();
    modal.querySelectorAll('[data-course-details-close]').forEach(button => button.addEventListener('click', close));
    modal.addEventListener('click', event => {
        if (event.target === modal) close();
    });
    return modal;
}

let lastTrigger = null;

export function setupCourseDetailsModal() {
    createModal();
    if (!window.__courseDetailsEscapeHandler) {
        window.__courseDetailsEscapeHandler = event => {
            if (event.key === 'Escape') closeCourseDetails();
        };
        document.addEventListener('keydown', window.__courseDetailsEscapeHandler);
    }
}

function addMeta(meta, label, value) {
    if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) return;
    const item = document.createElement('div');
    item.className = 'course-details-meta-item';
    const labelEl = document.createElement('dt');
    labelEl.textContent = label;
    const valueEl = document.createElement('dd');
    valueEl.textContent = Array.isArray(value) ? value.join('; ') : text(value);
    item.append(labelEl, valueEl);
    meta.appendChild(item);
}

function renderSyllabus(content, syllabus) {
    if (!syllabus?.length) return;
    const section = document.createElement('section');
    section.className = 'course-details-section';
    const heading = document.createElement('h4');
    heading.className = 'course-details-section-title';
    heading.textContent = 'Ementa e conteúdo programático';
    section.appendChild(heading);

    const list = document.createElement('div');
    list.className = 'course-details-syllabus';
    syllabus.forEach(item => {
        const article = document.createElement('article');
        article.className = 'course-details-syllabus-item';
        const topic = document.createElement('h5');
        topic.textContent = text(item.topic);
        const description = document.createElement('p');
        description.textContent = text(item.content);
        article.append(topic, description);
        list.appendChild(article);
    });
    section.appendChild(list);
    content.appendChild(section);
}

export function showCourseDetails(node, details) {
    setupCourseDetailsModal();
    const modal = document.getElementById(MODAL_ID);
    const source = modal.querySelector('#course-details-source');
    const title = modal.querySelector('#course-details-title');
    const meta = modal.querySelector('#course-details-meta');
    const content = modal.querySelector('#course-details-content');

    source.textContent = details?.source || 'Ficha curricular';
    title.textContent = `${text(node.id)} · ${text(node.name)}`;
    meta.replaceChildren();
    content.replaceChildren();

    addMeta(meta, 'Código', node.id);
    addMeta(meta, 'Período', details?.period ?? node.period);
    addMeta(meta, 'Área de conhecimento', details?.area);
    addMeta(meta, 'Idioma de execução', details?.language);
    addMeta(meta, 'Pré-requisitos', details?.prerequisites);

    if (details?.totalHours != null) {
        const workload = [];
        if (details.theoryHours != null) workload.push(`Teórica: ${details.theoryHours} h`);
        if (details.practiceHours != null) workload.push(`Prática: ${details.practiceHours} h`);
        workload.push(`Total: ${details.totalHours} h`);
        addMeta(meta, 'Carga horária', workload.join(' · '));
    } else if (node.cht != null) {
        addMeta(meta, 'Carga horária', `${node.cht} h`);
    }
    if (details && Object.hasOwn(details, 'eadHours')) addMeta(meta, 'EAD', `${details.eadHours} h`);
    if (details && Object.hasOwn(details, 'aaeHours')) addMeta(meta, 'AAE / extensão', `${details.aaeHours} h`);
    if (details && Object.hasOwn(details, 'apccHours')) addMeta(meta, 'APCC', `${details.apccHours} h`);
    addMeta(meta, 'Horas semanais de estudo', details?.weeklyStudyHours ? `${details.weeklyStudyHours} h` : null);

    if (!details) {
        const missing = createSection('Disponibilidade da ficha', 'O PPC carregado não possui uma ficha detalhada para este código. A disciplina continua disponível na matriz e mantém os dados exibidos no card.');
        content.appendChild(missing);
    } else {
        if (details.objective) content.appendChild(createSection('Objetivos da disciplina', details.objective));
        if (details.ementa) content.appendChild(createSection('Ementa', details.ementa));
        renderSyllabus(content, details.syllabus);
        if (details.references) content.appendChild(createSection('Referências bibliográficas', details.references));
        if (details.assessment) content.appendChild(createSection('Tipos de avaliação', details.assessment));
        if (details.notes) content.appendChild(createSection('Observações do PPC', details.notes));
    }

    lastTrigger = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('course-details-open');
    modal.querySelector('[data-course-details-close]').focus();
}

export function closeCourseDetails() {
    const modal = document.getElementById(MODAL_ID);
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('course-details-open');
    if (lastTrigger?.focus) lastTrigger.focus();
    lastTrigger = null;
}
