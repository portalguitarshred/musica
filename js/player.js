export class Player {
    constructor() {
        this.audioPlayer = document.getElementById('audio-player');
        this.volumeControl = document.getElementById('volume-control');
        this.currentPlaying = null;
        this.statusMessage = document.createElement('div');
        this.statusMessage.id = 'status-message';
        document.body.appendChild(this.statusMessage);
        this.init();
    }

    init() {
        this.volumeControl.addEventListener('input', (e) => this.adjustVolume(e.target.value));
    }

    playStation(station) {
        console.log(`Playing: ${station.name} - URL: ${station.url}`);
        this.audioPlayer.src = station.url;
        this.statusMessage.textContent = 'Carregando...';
        this.statusMessage.classList.add('show');

        this.audioPlayer.play().then(() => {
            this.statusMessage.textContent = '';
            this.statusMessage.classList.remove('show');
        }).catch(error => {
            console.error('Playback failed', error);
            this.statusMessage.textContent = 'Erro ao carregar a estação. Tente novamente.';
        });

        this.audioPlayer.oncanplay = () => {
            this.statusMessage.textContent = '';
            this.statusMessage.classList.remove('show');
        };

        this.audioPlayer.onerror = () => {
            this.statusMessage.textContent = 'Erro ao carregar a estação. Tente novamente.';
        };

        if (this.currentPlaying) {
            this.currentPlaying.classList.remove('playing');
        }
        station.element.classList.add('playing');
        this.currentPlaying = station.element;
    }

    adjustVolume(value) {
        this.audioPlayer.volume = value;
        console.log(`Volume: ${this.audioPlayer.volume}`);
    }
}
