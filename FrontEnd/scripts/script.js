//let isConnected = false; // test pour gérer le logout du site
const galleryElement = document.querySelector('.gallery');
const filtersElement = document.querySelector('.filters');
const firstModalContent = document.querySelector('.first-modal-content');
const adminPanelElement = document.querySelector('.admin-panel');
const modalButtonOneElement = document.querySelector('#button-modal-1');
const authButton = document.getElementById('authButton');//login logout


let works = []
let categories = []
const isLogged = sessionStorage.getItem('token')

console.log(isLogged)
// login vs logout
//mise à jour de co et deco mode 2 
function codecoauthaction() {
    const authButton = document.getElementById('authButton');
    if (isConnected){
        isConnected=false;
        authButton.textContent="Login";

    } else { openSecondModalElement('modal-1');
    }
}
console.log(isLogged)
// test logique login logout
const token = sessionStorage.getItem('token');
if (token) {
    authButton.textContent = "Logout";
} else {
    authButton.textContent = "Login";
}
// gere le clic login logout
authButton.addEventListener('click', () => {
    if (authButton.textContent === "Logout") {
        sessionStorage.removeItem('token');
        authButton.textContent = "Login";
    }
});
document.getElementById('authButton').addEventListener('click',codecoauthaction);
console.log ('login ok')


// début des works
const getWorks = async () => {
    const response = await fetch('http://localhost:5678/api/works')
    const data = await response.json()
    works.push(...data)
}

const getCategories = async () => {
   const response= await fetch('http://localhost:5678/api/categories')
  const data = await response.json()
  categories.push(...data)
}

const createWorks = (data) => {
    data.forEach(work => {
        const figureElement = document.createElement('figure')
        const imgElement = document.createElement('img')
        const figCaptionElement = document.createElement('figcaption')

        imgElement.src = work.imageUrl
        imgElement.alt = work.title

        figCaptionElement.textContent = work.title

        figureElement.appendChild(imgElement)
        figureElement.appendChild(figCaptionElement)

        galleryElement.appendChild(figureElement)
    })
}

const createModalWorks = (data) => {
    data.forEach(work => {
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const figCaptionElement = document.createElement('figcaption');
        const deleteIconElement = document.createElement('i');  // Cree icone (;)
        const button = document.createElement('button')

        imgElement.src = work.imageUrl;
        imgElement.alt = work.title;

        figCaptionElement.textContent = 'editer';

        // detelet de l icon
        deleteIconElement.className = 'fa fa-trash delete-icon';
        deleteIconElement.setAttribute('data-work-id', work.id);  // work id
        deleteIconElement.title = 'Supprimer cette photo';

        button.appendChild(deleteIconElement)
        button.className = "trashIcon";


        button.addEventListener('click', async () => {
            const response = await deleteWork(work.id)
            console.log(response);

            if (response.status === 204) {
                updateDOM()
            }
        })

        figureElement.appendChild(imgElement);
        figureElement.appendChild(figCaptionElement);
        figureElement.appendChild(button);  // suppr l'icon

        firstModalContent.appendChild(figureElement);
    });
}

const deleteWork = async (id) => {
    return await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${isLogged}`
        }
    })
}

const createButton= (data) => {
    const buttonElement = document.createElement('filtersjs');

    buttonElement.textContent = data.name;
    buttonElement.classList.add('filter-button')

    if (data.id === 0) {
        buttonElement.classList.add('filtersjs')
    }

    buttonElement.addEventListener('click', () => {
        const allFilters = document.querySelectorAll('filtersjs');
       
        allFilters.forEach(button => button.classList.remove('filtersjs'))
        buttonElement.classList.add('filtersjs')

        if (data.id === 0) {
            galleryElement.innerHTML = ""
            return createWorks(works)
        }

        const filteredWorks = works.filter(work => work.categoryId === data.id)
        galleryElement.innerHTML = ""
        createWorks(filteredWorks)

    })

    filtersElement.appendChild(buttonElement)
}

const handleFilters = (data) => {
    createButton({name: 'Tous', id: 0})
    data.forEach(category => createButton(category))
}

const updateDOM = async () => {
    works = [];
    galleryElement.innerHTML = ""
    firstModalContent.innerHTML = ""

    await getWorks();
    createWorks(works)
    createModalWorks(works)
}

const init = async () => {
    try {
        
        await getWorks()
        await getCategories()
        createWorks(works)
        handleFilters(categories)
        createModalWorks(works)

    } catch(error) {
        console.log(error)
    }
}

init()


// comment recuperer le token, pour afficher la partie admin
if (isLogged !== null) {
    console.log('partie admin ici');
    adminPanelElement.style.display = 'flex';
    modalButtonOneElement.style.display = 'inline-block';
    filtersElement.style.display = 'none';
}


// URL.createObjectUrl(tonInputFile)
// modif pour la validation
