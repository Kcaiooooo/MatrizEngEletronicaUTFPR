document.addEventListener('DOMContentLoaded', () => {
            const modalDoacao = document.getElementById('modal-doacao');
            const btnCloseDoacao = document.getElementById('btn-close-doacao');
            const btnCloseDoacaoX = document.getElementById('btn-close-doacao-x');
            const btnCopyPix = document.getElementById('btn-copy-pix');
            const copyBtnLabel = document.getElementById('copy-btn-label');
            const pixKeyText = 'caiocosta281214@gmail.com';

            const now = new Date();
            const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            const lastSeen = window.KMStorage.getItem('kmatrizes_doacao_seen_date');

            if (modalDoacao && lastSeen !== today) {
                setTimeout(() => {
                    modalDoacao.classList.remove('hidden');
                    modalDoacao.classList.add('active');
                }, 400);
            }

            const closeModal = () => {
                if (modalDoacao) {
                    modalDoacao.classList.remove('active');
                    modalDoacao.classList.add('hidden');
                    window.KMStorage.setItem('kmatrizes_doacao_seen_date', today);
                }
            };

            if (btnCloseDoacao) btnCloseDoacao.addEventListener('click', closeModal);
            if (btnCloseDoacaoX) btnCloseDoacaoX.addEventListener('click', closeModal);
            if (modalDoacao) {
                modalDoacao.addEventListener('click', (e) => {
                    if (e.target === modalDoacao) closeModal();
                });
            }

            if (btnCopyPix) {
                btnCopyPix.addEventListener('click', () => {
                    navigator.clipboard.writeText(pixKeyText).then(() => {
                        if (copyBtnLabel) copyBtnLabel.textContent = 'Copiado!';
                        btnCopyPix.classList.remove('bg-amber-600', 'hover:bg-amber-500');
                        btnCopyPix.classList.add('bg-green-600', 'hover:bg-green-500');
                        setTimeout(() => {
                            if (copyBtnLabel) copyBtnLabel.textContent = 'Copiar';
                            btnCopyPix.classList.remove('bg-green-600', 'hover:bg-green-500');
                            btnCopyPix.classList.add('bg-amber-600', 'hover:bg-amber-500');
                        }, 2000);
                    }).catch(err => {
                        console.error('Erro ao copiar:', err);
                    });
                });
            }
        });
