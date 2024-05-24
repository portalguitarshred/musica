export class Timer {
    constructor() {
        this.clockIcon = document.getElementById('clock-icon');
        this.timerModal = document.getElementById('timerModal');
        this.closeModal = document.getElementById('closeModal');
        this.setTimerButton = document.getElementById('setTimer');
        this.timerInput = document.getElementById('timer');
        this.audioPlayer = document.getElementById('audio-player');
        this.init();
    }

    init() {
        this.clockIcon.addEventListener('click', () => {
            this.timerModal.style.display = 'block';
        });

        this.closeModal.addEventListener('click', () => {
            this.timerModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.timerModal) {
                this.timerModal.style.display = 'none';
            }
        });

        this.setTimerButton.addEventListener('click', () => {
            const minutes = parseInt(this.timerInput.value, 10);
            if (isNaN(minutes) || minutes <= 0) {
                alert('Por favor, insira um valor válido de minutos.');
                return;
            }

            const milliseconds = minutes * 60 * 1000;
            setTimeout(() => {
                this.audioPlayer.pause();
                this.audioPlayer.currentTime = 0; // Reinicia o áudio
                alert('O temporizador desligou a rádio.');
            }, milliseconds);

            this.timerModal.style.display = 'none';
            alert(`Temporizador definido para ${minutes} minutos.`);
        });
    }
}
