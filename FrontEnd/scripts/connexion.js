const formLoginElement = document.querySelector('#login');
const errorElement = document.querySelector('.error');

const login = async (data) => {
    const user = {
        email: data.get('username'),
        password: data.get('password'),
    }

    return await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
}

formLoginElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    // console.log(document.querySelector('#username').value) 
    const data = new FormData(formLoginElement)
    const response = await login(data)
    // recuperer le body de la response
    console.log(response)

    if (response.status === 404 || response.status === 401) {
        errorElement.style.display = 'block';
        errorElement.textContent = 'Connexion échouée, veuillez recommencer'
        setTimeout(() => {
            errorElement.style.display ='none';
        }, 3000)
    }

    if (response.status === 200) {
        // webstorage || sessionStorage
        // redirection en JS ==> window.location
        window.location.href = '/dashboard'; 

    }
})