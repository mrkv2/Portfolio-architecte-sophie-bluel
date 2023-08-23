const myModalElement = document.querySelector('#myModal');


modalButtonOneElement.addEventListener('click', (event) => {
    event.preventDefault()
    myModalElement.style.display = 'flex';
})

myModalElement.addEventListener('click', (e) => {
    myModalElement.style.display = 'none';
})

myModalElement.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation()
})
