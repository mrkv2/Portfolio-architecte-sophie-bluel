const myModalElement = document.querySelector('#myModal');
const secondModal = document.querySelector('#myModal_2');
const closeFirstModalElement = document.querySelector('#close-first-modal');
const closeSecondModalElement = document.querySelector('#close-second-modal');
const openSecondModalElement = document.querySelector('#button-modal-2');
const returnFirstModalElement = document.querySelector('#return-first-modal');
const titleInput= document.querySelector('#title'); // gére la validation du form
const categoryInput = document.querySelector('#categorie'); // gére la validation du form
const imageinput = document.querySelector('#photo-input');// gére la validation du form
const submitbutton = document.querySelector('#validerajoutphoto');// gére la validation du form

// token pour mes works

const token = sessionStorage.getItem('token');

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
    cleanForm()
    secondModal.style.display = 'none';
})

returnFirstModalElement.addEventListener('click', () => {
    myModalElement.style.display = 'flex';
    cleanForm()
    secondModal.style.display = 'none';

})

const formPhotoElement = document.querySelector('#form-photo');

const postWork = async (formData) => {
    
   return await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
}

formPhotoElement.addEventListener('submit', async (event) => {
    console.log("Form submitted");
    event.preventDefault();

    const formData = new FormData(formPhotoElement);
    const response = await postWork(formData)

        console.log(response)

        if (response.status === 201) {
            cleanForm()
            updateDOM()
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
            document.querySelector('.file-label').style.display = "none"
            previewImage.setAttribute('src', this.result);
            previewImage.style.display = 'block';  // voir l'image
        });

        reader.readAsDataURL(file);
    } else {
        uploadIcon.style.display = 'block';  // icon si select
        previewImage.style.display = 'none';  // cache image
    }
});
//gere le disable de valider if 3entree on
const photoInput = document.querySelector('#photo-input');
const titreInput = document.querySelector('#titre');
const categorieSelect = document.querySelector('#categorie');
const validerButton = document.querySelector('.validerajoutphoto');

function checkFormInputs() {
    // Vérifie si tous les champs sont remplis
    if (photoInput.files.length > 0 && titreInput.value && categorieSelect.value) {
        validerButton.removeAttribute('disabled');
    } else {
        validerButton.setAttribute('disabled', 'disabled');
    }
}
// mes ecouteurs
photoInput.addEventListener('change', checkFormInputs);
titreInput.addEventListener('input', checkFormInputs);
categorieSelect.addEventListener('change', checkFormInputs);

const cleanForm = () => {
    formPhotoElement.reset()
    previewImage.style.display = 'none';
    document.querySelector('.file-label').style.display = "flex"
    uploadIcon.style.display = 'block';
}
// Gestion du passage en vert du bouton valider modal2
const checkRequiredFields = () => {
    titleInput.addEventListener('input', checkRequiredFields);
categoryInput.addEventListener('change', checkRequiredFields);
imageInput.addEventListener('input', checkRequiredFields);
    console.log("verif condition valider");
    let categoryValue = parseInt(categoryInput.value, 10);

    if (titleInput.value && categoryValue > 0 && categoryValue <= 20 && imageInput.files.length > 0) {
        submitButton.style.backgroundColor = '#1D6154';  // change couleur
        submitButton.disabled = false;  // Enable the button
        submitButton.classList.remove('invalid');
    } else {
        submitButton.style.backgroundColor = ''; // enleve la couleur origine
        submitButton.disabled = true;  // desactive le bouton
        submitButton.classList.add('invalid');
    }
};
        titleInput.addEventListener('input', checkRequiredFields);
        categoryInput.addEventListener('input', checkRequiredFields);
        imageInput.addEventListener('input', checkRequiredFields);


// if (token) {
//     fetch('http://localhost:5678/api/works', {
//         headers: {
            
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(works),
//     });
// } else {
//     console.log ('pas bon toto')
// }  


