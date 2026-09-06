const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, summary, .node';
const DRAG_THRESHOLD = 5;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.1;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const getDimension = (element, property, fallback) => {
    const rectValue = element.getBoundingClientRect()[property];
    if (rectValue > 0) return rectValue;
    const styleValue = Number.parseFloat(getComputedStyle(element)[property]);
    return Number.isFinite(styleValue) && styleValue > 0 ? styleValue : fallback;
};

const createStage = (container) => {
    const existingStage = container.querySelector(':scope > .tree-stage');
    if (existingStage) {
        return {
            stage: existingStage,
            maps: [...existingStage.querySelectorAll(':scope > #main-container, :scope > #humanities-container, :scope > #optional-container')],
            baseWidth: Number.parseFloat(existingStage.dataset.baseWidth),
            baseHeight: Number.parseFloat(existingStage.dataset.baseHeight),
        };
    }

    const maps = [...container.querySelectorAll(':scope > #main-container, :scope > #humanities-container, :scope > #optional-container')];
    if (!maps.length) return { stage: container, maps: [], baseWidth: container.clientWidth, baseHeight: container.clientHeight };

    const baseWidth = Math.max(...maps.map(map => getDimension(map, 'width', 1000)));
    const baseHeight = Math.max(...maps.map(map => getDimension(map, 'height', 1200)));
    const stage = document.createElement('div');
    stage.className = 'tree-stage';
    stage.dataset.baseWidth = String(baseWidth);
    stage.dataset.baseHeight = String(baseHeight);
    stage.style.position = 'relative';
    stage.style.width = `${baseWidth}px`;
    stage.style.height = `${baseHeight}px`;
    container.insertBefore(stage, maps[0]);
    maps.forEach(map => stage.appendChild(map));

    return { stage, maps, baseWidth, baseHeight };
};

const createControls = (container, onZoom) => {
    const existing = container.querySelector(':scope > .tree-zoom-controls');
    if (existing) return existing;

    const controls = document.createElement('div');
    controls.className = 'tree-zoom-controls';
    controls.setAttribute('aria-label', 'Controles de zoom da matriz');
    controls.innerHTML = `
        <button type="button" data-zoom-action="out" aria-label="Diminuir zoom" title="Diminuir zoom">−</button>
        <output data-zoom-level aria-live="polite">100%</output>
        <button type="button" data-zoom-action="in" aria-label="Aumentar zoom" title="Aumentar zoom">+</button>
        <button type="button" data-zoom-action="reset" aria-label="Redefinir zoom" title="Redefinir zoom">1:1</button>
    `;
    controls.addEventListener('click', event => {
        const action = event.target.closest('[data-zoom-action]')?.dataset.zoomAction;
        if (action) onZoom(action);
    });
    container.prepend(controls);
    return controls;
};

/**
 * Installs pointer based panning and pinch/button zoom on a curriculum viewport.
 * Interactive controls keep their normal click/tap behavior.
 */
export function installTreePan(container) {
    if (!container) return () => {};

    const { stage, maps, baseWidth, baseHeight } = createStage(container);
    let zoom = 1;
    const pointers = new Map();
    let panPointerId = null;
    let panStartX = 0;
    let panStartY = 0;
    let panStartScrollLeft = 0;
    let panStartScrollTop = 0;
    let hasMoved = false;
    let suppressClick = false;
    let pinchStartDistance = 0;
    let pinchStartZoom = 1;

    const controls = createControls(container, action => {
        if (action === 'reset') {
            setZoom(1, container.clientWidth / 2, container.clientHeight / 2);
        } else {
            const direction = action === 'in' ? 1 : -1;
            setZoom(zoom + direction * ZOOM_STEP, container.clientWidth / 2, container.clientHeight / 2);
        }
    });
    const level = controls.querySelector('[data-zoom-level]');

    const updateZoomLayout = () => {
        stage.style.width = `${baseWidth * zoom}px`;
        stage.style.height = `${baseHeight * zoom}px`;
        maps.forEach(map => {
            map.style.transformOrigin = '0 0';
            map.style.transform = `scale(${zoom})`;
        });
        level.textContent = `${Math.round(zoom * 100)}%`;
    };

    function setZoom(nextZoom, focalX, focalY) {
        const previousZoom = zoom;
        zoom = clamp(Math.round(nextZoom * 100) / 100, MIN_ZOOM, MAX_ZOOM);
        if (zoom === previousZoom) return;

        const mapX = (container.scrollLeft + focalX - stage.offsetLeft) / previousZoom;
        const mapY = (container.scrollTop + focalY - stage.offsetTop) / previousZoom;
        updateZoomLayout();
        requestAnimationFrame(() => {
            container.scrollLeft = Math.max(0, stage.offsetLeft + mapX * zoom - focalX);
            container.scrollTop = Math.max(0, stage.offsetTop + mapY * zoom - focalY);
        });
    }

    const distanceBetween = (first, second) => Math.hypot(second.x - first.x, second.y - first.y);
    const midpoint = (first, second) => ({ x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 });
    const releasePointerCapture = pointerId => {
        if (container.hasPointerCapture?.(pointerId)) container.releasePointerCapture(pointerId);
    };

    const onPointerDown = event => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        if (event.target.closest(INTERACTIVE_SELECTOR)) return;

        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        try { container.setPointerCapture?.(event.pointerId); } catch { /* pointer may already be released */ }

        if (pointers.size === 1) {
            panPointerId = event.pointerId;
            panStartX = event.clientX;
            panStartY = event.clientY;
            panStartScrollLeft = container.scrollLeft;
            panStartScrollTop = container.scrollTop;
            hasMoved = false;
            container.classList.add('is-panning');
            container.style.userSelect = 'none';
        } else if (pointers.size === 2) {
            const [first, second] = [...pointers.values()];
            pinchStartDistance = distanceBetween(first, second);
            pinchStartZoom = zoom;
            hasMoved = false;
            container.classList.add('is-panning');
        }
    };

    const onPointerMove = event => {
        if (!pointers.has(event.pointerId)) return;
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

        if (pointers.size >= 2) {
            const [first, second] = [...pointers.values()];
            if (!pinchStartDistance) return;
            const distanceRatio = distanceBetween(first, second) / pinchStartDistance;
            const center = midpoint(first, second);
            const wrapperRect = container.getBoundingClientRect();
            setZoom(pinchStartZoom * distanceRatio, center.x - wrapperRect.left, center.y - wrapperRect.top);
            hasMoved = true;
            event.preventDefault();
            return;
        }

        if (event.pointerId !== panPointerId) return;
        const deltaX = event.clientX - panStartX;
        const deltaY = event.clientY - panStartY;
        if (!hasMoved && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) return;

        hasMoved = true;
        event.preventDefault();
        container.scrollLeft = Math.max(0, panStartScrollLeft - deltaX);
        container.scrollTop = Math.max(0, panStartScrollTop - deltaY);
    };

    const onPointerEnd = event => {
        if (!pointers.has(event.pointerId)) return;
        pointers.delete(event.pointerId);
        releasePointerCapture(event.pointerId);

        if (pointers.size === 0) {
            panPointerId = null;
            pinchStartDistance = 0;
            container.classList.remove('is-panning');
            container.style.userSelect = '';
            if (hasMoved) suppressClick = true;
            hasMoved = false;
        } else if (pointers.size === 1) {
            const [remainingId, remaining] = [...pointers.entries()][0];
            panPointerId = remainingId;
            panStartX = remaining.x;
            panStartY = remaining.y;
            panStartScrollLeft = container.scrollLeft;
            panStartScrollTop = container.scrollTop;
            pinchStartDistance = 0;
        }
    };

    const onClick = event => {
        if (!suppressClick) return;
        suppressClick = false;
        event.preventDefault();
        event.stopPropagation();
    };

    updateZoomLayout();
    container.addEventListener('pointerdown', onPointerDown, { passive: false });
    container.addEventListener('pointermove', onPointerMove, { passive: false });
    container.addEventListener('pointerup', onPointerEnd);
    container.addEventListener('pointercancel', onPointerEnd);
    container.addEventListener('lostpointercapture', onPointerEnd);
    container.addEventListener('click', onClick, true);

    return () => {
        container.removeEventListener('pointerdown', onPointerDown);
        container.removeEventListener('pointermove', onPointerMove);
        container.removeEventListener('pointerup', onPointerEnd);
        container.removeEventListener('pointercancel', onPointerEnd);
        container.removeEventListener('lostpointercapture', onPointerEnd);
        container.removeEventListener('click', onClick, true);
    };
}
