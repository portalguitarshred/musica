import './ui.js';
import './equalizer.js';
import './player.js';
import './login.js';
import './register.js';
import './timer.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicativo iniciado');

    // Inicialização da "Rock Station"
    const player = new Player();
    const stations = [
        { name: 'Rock Station', url: 'https://stream.zeno.fm/qupiusi3w5puv', element: null }
    ];

    const stationList = document.getElementById('station-list');
    if (!stationList) {
        console.error('Elemento station-list não encontrado');
        return;
    }

    stations.forEach(station => {
        const li = document.createElement('li');
        li.textContent = station.name;
        station.element = li;

        li.addEventListener('click', () => player.playStation(station));
        stationList.appendChild(li);
    });
});
