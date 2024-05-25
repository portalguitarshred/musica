export class Equalizer {
    constructor() {
        this.bassControl = document.getElementById('bass');
        this.midControl = document.getElementById('mid');
        this.trebleControl = document.getElementById('treble');
        this.init();
    }

    init() {
        if (!this.bassControl || !this.midControl || !this.trebleControl) {
            console.error('Elementos do equalizador não encontrados');
            return;
        }

        this.bassControl.addEventListener('input', (e) => this.adjustEqualizer('bass', e.target.value));
        this.midControl.addEventListener('input', (e) => this.adjustEqualizer('mid', e.target.value));
        this.trebleControl.addEventListener('input', (e) => this.adjustEqualizer('treble', e.target.value));
        document.getElementById('resetEqualizer').addEventListener('click', () => this.resetEqualizer());
    }

    adjustEqualizer(type, value) {
        console.log(`${type} set to ${value}`);
    }

    resetEqualizer() {
        this.bassControl.value = 0;
        this.midControl.value = 0;
        this.trebleControl.value = 0;
        this.adjustEqualizer('bass', 0);
        this.adjustEqualizer('mid', 0);
        this.adjustEqualizer('treble', 0);
    }
}
