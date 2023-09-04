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

const formPhotoElement = document.querySelector('#form-photo');

formPhotoElement.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formPhotoElement);

    try {
        const response = await fetch('/works', {  
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            
        } else {
            console.error('Error submitting form:', response.statusText);
            
        }
    } catch (error) {
        console.error('There was an error:', error);
        
    }
});
// gére la preview des uploads
const imageInput = document.querySelector('#photo-input');
const previewImage = document.querySelector('#preview-image');
const uploadIcon = document.querySelector('.upload-icon');  // select de licon

imageInput.addEventListener('change', function() {
    const file = this.files[0];  // select le file

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function() {
            uploadIcon.style.display = 'none';  // cache l image
            previewImage.setAttribute('src', this.result);
            previewImage.style.display = 'block';  // voir l'image
        });

        reader.readAsDataURL(file);
    } else {
        uploadIcon.style.display = 'block';  // icon si select
        previewImage.style.display = 'none';  // cache image
    }
});








