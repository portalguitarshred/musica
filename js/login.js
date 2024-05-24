export class Login {
    constructor() {
        this.loginLink = document.getElementById('login-link');
        this.loginModal = document.getElementById('loginModal');
        this.closeLoginModal = document.getElementById('closeLoginModal');
        this.loginButton = document.getElementById('loginButton');
        this.init();
    }

    init() {
        this.loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.loginModal.style.display = 'block';
        });

        this.closeLoginModal.addEventListener('click', () => {
            this.loginModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.loginModal) {
                this.loginModal.style.display = 'none';
            }
        });

        this.loginButton.addEventListener('click', async () => {
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
                    this.loginModal.style.display = 'none';
                    // Aqui você pode salvar o token JWT ou outra informação de autenticação
                } else {
                    alert('Erro ao realizar login. Verifique suas credenciais.');
                }
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
}
