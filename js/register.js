export class Register {
    constructor() {
        this.registerLink = document.getElementById('register-link');
        this.registerModal = document.getElementById('registerModal');
        this.closeRegisterModal = document.getElementById('closeRegisterModal');
        this.registerButton = document.getElementById('registerButton');
        this.init();
    }

    init() {
        this.registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.registerModal.style.display = 'block';
        });

        this.closeRegisterModal.addEventListener('click', () => {
            this.registerModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.registerModal) {
                this.registerModal.style.display = 'none';
            }
        });

        this.registerButton.addEventListener('click', async () => {
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
                    this.registerModal.style.display = 'none';
                } else {
                    alert('Erro ao registrar usuário. Tente novamente.');
                }
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
}
