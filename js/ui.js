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

    const stations = [
        { name: 'Rock Station', url: 'https://stream.zeno.fm/qupiusi3w5puv', element: null }
    ];

    const stationList = document.getElementById('station-list');

    stations.forEach(station => {
        const li = document.createElement('li');
        li.textContent = station.name;
        station.element = li;

        li.addEventListener('click', () => player.playStation(station));
        stationList.appendChild(li);
    });

    // Lógica de compartilhamento
    const shareModal = document.getElementById('shareModal');
    const closeShareModal = document.getElementById('closeShareModal');
    const copyLinkButton = document.getElementById('copyLink');
    const shareFacebookButton = document.getElementById('shareFacebook');
    const shareTwitterButton = document.getElementById('shareTwitter');
    let currentShareUrl = '';

    closeShareModal.addEventListener('click', () => {
        shareModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });

    function openShareModal(url) {
        currentShareUrl = url;
        shareModal.style.display = 'block';
    }

    copyLinkButton.addEventListener('click', () => {
        navigator.clipboard.writeText(currentShareUrl).then(() => {
            alert('Link copiado para a área de transferência.');
        }).catch(err => {
            console.error('Erro ao copiar o link: ', err);
        });
    });

    shareFacebookButton.addEventListener('click', () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentShareUrl)}`;
        window.open(facebookUrl, '_blank');
    });

    shareTwitterButton.addEventListener('click', () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentShareUrl)}`;
        window.open(twitterUrl, '_blank');
    });
});
