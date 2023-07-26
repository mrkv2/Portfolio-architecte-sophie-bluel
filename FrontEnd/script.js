const galleryElement = document.querySelector('.gallery');
const categories =document.querySelector('.categories')

let works = []
let categories = []

// fetch()
// asynchrone      async await
// appendChild()



const getWorks = async () => {
    const response = await fetch('http://localhost:5678/api/works')
    const data = await response.json()
    // if (response.status === 404) {
    //     throw new Error({message: `Ca n'existe pas bordel`})
    // }
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

}

const handleFilters = (data) => {
    // appeller la fonction createButton()
}

const init = async () => {
    try {
        console.log(works)
        await getWorks()
        console.log(works)
        createWorks(works)

    } catch(error) {
        console.log(error)
    }
}

init()