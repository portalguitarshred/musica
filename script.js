document.addEventListener('DOMContentLoaded', () => {
    setupLogin();
    setupRegister();
    setupStations();
    setupVolumeControl();
    setupTimer();
    setupShare();
    setupEqualizer();
});

// Função para configurar o login
function setupLogin() {
    const loginLink = document.getElementById('login-link');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginButton = document.getElementById('loginButton');

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
    });

    closeLoginModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    loginButton.addEventListener('click', async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email && password) {
            const response = await fetch('http://musica.guitarshred.com.br/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    email: email,
                    password: password
                })
            });

            const data = await response.text();
            alert(data);

            if (response.ok) {
                loginModal.style.display = 'none';
                // Aqui você pode salvar o token JWT ou outra informação de autenticação
            } else {
                alert('Erro ao realizar login. Verifique suas credenciais.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
}

// Função para configurar o registro
function setupRegister() {
    const registerLink = document.getElementById('register-link');
    const registerModal = document.getElementById('registerModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const registerButton = document.getElementById('registerButton');

    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'block';
    });

    closeRegisterModal.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    registerButton.addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (username && email && password) {
            const response = await fetch('http://musica.guitarshred.com.br/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username: username,
                    email: email,
                    password: password
                })
            });

            const data = await response.text();
            alert(data);

            if (response.ok) {
                registerModal.style.display = 'none';
            } else {
                alert('Erro ao registrar usuário. Tente novamente.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
}

// Função para configurar as estações
function setupStations() {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');
    const statusMessage = document.createElement('div'); // Elemento para mensagens de status
    statusMessage.id = 'status-message';
    document.body.appendChild(statusMessage); // Adiciona o elemento de status ao corpo do documento
    let currentPlaying = null;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Carrega favoritos do localStorage

    const stations = [
        { name: 'Rock Station', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
    ];

    stations.forEach(station => {
        const li = document.createElement('li');
        li.textContent = station.name;

        // Adiciona ícone de coração
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa', 'fa-heart', 'heart-icon');
        if (favorites.includes(station.url)) {
            heartIcon.classList.add('favorited');
        }
        heartIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            heartIcon.classList.toggle('favorited');
            if (heartIcon.classList.contains('favorited')) {
                favorites.push(station.url);
            } else {
                favorites = favorites.filter(fav => fav !== station.url);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
        li.appendChild(heartIcon);

        // Adiciona ícone de compartilhamento
        const shareIcon = document.createElement('i');
        shareIcon.classList.add('fa', 'fa-share-alt', 'share-icon');
        shareIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            openShareModal(station.url);
        });
        li.appendChild(shareIcon);

        // Adiciona barras do espectro de áudio
        const spectrum = document.createElement('div');
        spectrum.classList.add('spectrum');
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            spectrum.appendChild(bar);
        }
        li.appendChild(spectrum);

        li.addEventListener('click', () => {
            console.log(`Playing: ${station.name} - URL: ${station.url}`);
            audioPlayer.src = station.url;
            statusMessage.textContent = 'Carregando...'; // Mensagem de carregamento
            statusMessage.classList.add('show'); // Mostrar mensagem de status

            audioPlayer.play().then(() => {
                statusMessage.textContent = ''; // Limpa a mensagem de carregamento
                statusMessage.classList.remove('show'); // Esconde a mensagem de status
            }).catch(error => {
                console.error('Playback failed', error);
                statusMessage.textContent = 'Erro ao carregar a estação. Tente novamente.'; // Mensagem de erro
            });

            audioPlayer.oncanplay = () => {
                statusMessage.textContent = ''; // Limpa a mensagem de carregamento
                statusMessage.classList.remove('show'); // Esconde a mensagem de status
            };

            audioPlayer.onerror = () => {
                statusMessage.textContent = 'Erro ao carregar a estação. Tente novamente.'; // Mensagem de erro
            };

            if (currentPlaying) {
                currentPlaying.classList.remove('playing'); // Remove a classe 'playing' da estação anterior
            }
            li.classList.add('playing'); // Adiciona a classe 'playing' à estação atual
            currentPlaying = li; // Atualiza a estação atual
        });

        stationList.appendChild(li);
    });
}

// Função para configurar o controle de volume
function setupVolumeControl() {
    const audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.getElementById('volume-control');

    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
        console.log(`Volume: ${audioPlayer.volume}`);
    });
}

// Função para configurar o temporizador
function setupTimer() {
    const clockIcon = document.getElementById('clock-icon');
    const timerModal = document.getElementById('timerModal');
    const closeModal = document.getElementById('closeModal');
    const setTimerButton = document.getElementById('setTimer');
    const timerInput = document.getElementById('timer');

    clockIcon.addEventListener('click', () => {
        timerModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        timerModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === timerModal) {
            timerModal.style.display = 'none';
        }
    });

    setTimerButton.addEventListener('click', () => {
        const minutes = parseInt(timerInput.value, 10);
        if (isNaN(minutes) || minutes <= 0) {
            alert('Por favor, insira um valor válido de minutos.');
            return;
        }

        const milliseconds = minutes * 60 * 1000;
        setTimeout(() => {
            const audioPlayer = document.getElementById('audio-player');
            audioPlayer.pause();
            audioPlayer.currentTime = 0; // Reinicia o áudio
            alert('O temporizador desligou a rádio.');
        }, milliseconds);

        timerModal.style.display = 'none';
        alert(`Temporizador definido para ${minutes} minutos.`);
    });
}

// Função para configurar o compartilhamento
function setupShare() {
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
}

// Função para configurar o equalizador
function setupEqualizer() {
    const equalizerIcon = document.querySelector('.equalizer-icon');
    const equalizerModal = document.getElementById('equalizerModal');
    const closeEqualizerModal = document.getElementById('closeEqualizerModal');
    const bassControl = document.getElementById('bass');
    const midControl = document.getElementById('mid');
    const trebleControl = document.getElementById('treble');
    const resetEqualizerButton = document.getElementById('resetEqualizer');

    equalizerIcon.addEventListener('click', () => {
        equalizerModal.style.display = 'block';
    });

    closeEqualizerModal.addEventListener('click', () => {
        equalizerModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === equalizerModal) {
            equalizerModal.style.display = 'none';
        }
    });

    bassControl.addEventListener('input', (e) => {
        adjustEqualizer('bass', e.target.value);
    });

    midControl.addEventListener('input', (e) => {
        adjustEqualizer('mid', e.target.value);
    });

    trebleControl.addEventListener('input', (e) => {
        adjustEqualizer('treble', e.target.value);
    });

    resetEqualizerButton.addEventListener('click', () => {
        bassControl.value = 0;
        midControl.value = 0;
        trebleControl.value = 0;
        adjustEqualizer('bass', 0);
        adjustEqualizer('mid', 0);
        adjustEqualizer('treble', 0);
    });
}

// Função para ajustar o equalizador (a ser implementada)
function adjustEqualizer(type, value) {
    console.log(`${type} set to ${value}`);
    // Implementar lógica para ajustar o equalizador
}
});
