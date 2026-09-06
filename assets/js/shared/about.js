function openSobreModal() {
            const modal = document.getElementById('modal-sobre');
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('active');
            }
        }
        function closeSobreModal() {
            const modal = document.getElementById('modal-sobre');
            if (modal) {
                modal.classList.remove('active');
                modal.classList.add('hidden');
            }
        }
