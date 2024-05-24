<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guitar Radio</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <i class="fas fa-bars menu-toggle"></i>
        <img src="assets/logo.png" alt="Guitar Radio Logo" class="logo">
        <span class="clock-icon" id="clock-icon">&#128339;</span>
        <nav class="menu">
            <a href="#" id="login-link"><i class="fas fa-sign-in-alt"></i> Login</a>
            <a href="#" id="register-link"><i class="fas fa-user"></i> Registro</a>
            <a href="https://guitarshred.com.br" target="_blank"><i class="fas fa-newspaper"></i> Notícias</a>
            <a href="https://guitarshredacademy.com.br" target="_blank"><i class="fas fa-guitar"></i> Cursos de Guitarra</a>
            <a href="https://www.youtube.com/guitarshredofficial" target="_blank"><i class="fab fa-youtube"></i> Canal do YouTube</a>
            <a href="https://www.instagram.com/portalguitarshred" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
        </nav>
    </header>
    <img src="assets/capa1.jpg" alt="Esta imagem ainda não foi carregada" class="cover-image">
    <div class="descript">
        <h3>Nome da Música</h3>
        <i>Nome do artista</i>
    </div>
    <main>
        <section id="stations">
            <div class="equalizer-container">
                <p class="equalizer-text">Equalizador digital</p>
                <i class="fas fa-sliders-h equalizer-icon"></i>
            </div>
            <ul id="station-list"></ul>
        </section>
        <section id="player">
            <audio id="audio-player" controls>Your browser does not support the audio element.</audio>
            <div id="volume-container">
                <label for="volume-control">Volume:</label>
                <input type="range" id="volume-control" min="0" max="1" step="0.01" value="1">
            </div>
        </section>
    </main>
    <!-- Modals for login, register, timer, and share functionalities -->
    <div id="loginModal" class="modal-register">
        <div class="modal-content-register">
            <span class="close-register" id="closeLoginModal">&times;</span>
            <h3>Faça seu login</h3>
            <label for="login-email">Email:</label>
            <input type="email" id="login-email" required>
            <label for="login-password">Senha:</label>
            <input type="password" id="login-password" required>
            <button class="login-button" id="loginButton">Login</button>
        </div>
    </div>
    <div id="registerModal" class="modal-register">
        <div class="modal-content-register">
            <span class="close-register" id="closeRegisterModal">&times;</span>
            <h3>Registro de Usuário</h3>
            <label for="username">Nome de Usuário:</label>
            <input type="text" id="username" required>
            <label for="email">Email:</label>
            <input type="email" id="email" required>
            <label for="password">Senha:</label>
            <input type="password" id="password" required>
            <button class="register-button" id="registerButton">Registrar</button>
        </div>
    </div>
    <div id="timerModal" class="modal">
        <div class="modal-content">
            <span class="close" id="closeModal">&times;</span>
            <h3>Hora de dormir</h3>
            <label for="timer">Desligar após (minutos):</label>
            <input type="number" id="timer" min="1" max="120" value="30">
            <button class="timer-button" id="setTimer">Definir o tempo</button>
        </div>
    </div>
    <div id="shareModal" class="modal">
        <div class="modal-content">
            <span class="close" id="closeShareModal">&times;</span>
            <h3>Compartilhar estação</h3>
            <div class="share-options">
                <button id="copyLink">Copiar link</button>
                <button id="shareFacebook">Compartilhar no Facebook</button>
                <button id="shareTwitter">Compartilhar no Twitter</button>
            </div>
        </div>
    </div>
    <div id="equalizerModal" class="modal">
        <div class="modal-content">
            <span id="closeEqualizerModal" class="close">&times;</span>
            <h2>Equalizador</h2>
            <div class="equalizer-control">
                <label for="bass">Graves</label>
                <input type="range" id="bass" min="-10" max="10" value="0">
            </div>
            <div class="equalizer-control">
                <label for="mid">Médios</label>
                <input type="range" id="mid" min="-10" max="10" value="0">
            </div>
            <div class="equalizer-control">
                <label for="treble">Agudos</label>
                <input type="range" id="treble" min="-10" max="10" value="0">
            </div>
            <div class="equalizer-control">
                <button id="resetEqualizer">Resetar</button>
            </div>
        </div>
    </div>
    <script src="js/main.js"></script>
</body>
</html>
