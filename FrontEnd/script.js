const galleryElement = document.querySelector('.gallery');
const filtersElement = document.querySelector('.filters');


let works = []
let categories = []

// fetch()
// asynchrone      async await
// appendChild()



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

const createButton= (data) => {
    const buttonElement = document.createElement('filtersjs');

    buttonElement.textContent = data.name;

    if (data.id === 0) {
        buttonElement.classList.add('filter-button')
    } else {
        buttonElement.classList.add('filter-button');
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

const init = async () => {
    try {
        
        await getWorks()
        await getCategories()
        createWorks(works)
        handleFilters(categories)

    } catch(error) {
        console.log(error)
    }
}

init()