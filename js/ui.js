import { Equalizer } from './equalizer.js';
import { Player } from './player.js';
import { Login } from './login.js';
import { Register } from './register.js';
import { Timer } from './timer.js';

document.addEventListener('DOMContentLoaded', () => {
    const player = new Player();
    const equalizer = new Equalizer();
    const login = new Login();
    const register = new Register();
    const timer = new Timer();

    // Inicialização da "Rock Station"
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
