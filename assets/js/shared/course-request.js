function openRequestCourseModal() {
        const modal = document.getElementById('modal-request-course');
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('active');
    }

    function closeRequestCourseModal() {
        const modal = document.getElementById('modal-request-course');
        if (modal) {
            modal.classList.remove('active');
            modal.classList.add('hidden');
        }
    }

    let requestPending = false;

    function handleRequestSubmit(e) {
        const form = document.getElementById('form-request-course');
        const iframe = document.getElementById('form-target-iframe');
        if (!form || !iframe || requestPending) {
            e.preventDefault();
            return false;
        }
        const courseName = form.querySelector('#req-course-name')?.value.trim();
        const institution = form.querySelector('#req-institution')?.value.trim();
        const description = form.querySelector('#req-description')?.value.trim();
        const status = document.getElementById('req-status-msg');
        const button = document.getElementById('btn-submit-req');
        const subject = document.getElementById('req-email-subject');
        const showStatus = message => {
            if (status) status.textContent = message;
        };
        if (!courseName || !institution || !description) {
            showStatus('Por favor, preencha os campos obrigatórios (*).');
            e.preventDefault();
            return false;
        }
        if (subject) subject.value = `[K-Matrizes] Form: ${courseName} - ${institution}`;
        requestPending = true;
        if (button) button.disabled = true;
        showStatus('Enviando solicitação ao serviço de formulários...');

        let timer;
        const finish = message => {
            if (!requestPending) return;
            requestPending = false;
            clearTimeout(timer);
            iframe.removeEventListener('load', onLoad);
            iframe.removeEventListener('error', onError);
            if (button) button.disabled = false;
            showStatus(message);
        };
        // A cross-origin iframe load is not proof of email delivery or HTTP success.
        // Keep the entered data and modal available even when the response arrives.
        const onLoad = () => finish('O serviço respondeu. A entrega da solicitação não pode ser confirmada automaticamente; seus dados foram mantidos no formulário.');
        const onError = () => finish('Não foi possível acessar o serviço. Seus dados foram mantidos para tentar novamente.');
        iframe.addEventListener('load', onLoad);
        iframe.addEventListener('error', onError);
        timer = setTimeout(() => finish('Não foi possível confirmar uma resposta do serviço. Seus dados foram mantidos; verifique antes de reenviar.'), 15000);
        return true;
    }
