const myModalElement = document.querySelector('#myModal');
const secondModal = document.querySelector('#myModal_2');
const closeFirstModalElement = document.querySelector('#close-first-modal');
const closeSecondModalElement = document.querySelector('#close-second-modal');
const openSecondModalElement = document.querySelector('#button-modal-2');
const returnFirstModalElement = document.querySelector('#return-first-modal');

modalButtonOneElement.addEventListener('click', (event) => {
    event.preventDefault()
    myModalElement.style.display = 'flex';
})

myModalElement.addEventListener('click', (e) => {
    myModalElement.style.display = 'none';
})

myModalElement.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
})

closeFirstModalElement.addEventListener('click', () => {
    myModalElement.style.display = 'none';
})

openSecondModalElement.addEventListener('click', (event) => {
    event.preventDefault()
    myModalElement.style.display = 'none';
    secondModal.style.display = 'flex';

})

closeSecondModalElement.addEventListener('click', () => {
    secondModal.style.display = 'none';
})

returnFirstModalElement.addEventListener('click', () => {
    myModalElement.style.display = 'flex';
    secondModal.style.display = 'none';

})
/* fonction delete work*/
function deleteWork(workId) {

}

