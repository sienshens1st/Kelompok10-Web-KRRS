const login = document.querySelector('.kotak_login');
login.style.display = 'none';
const button = document.querySelector('.button_daftar');

const openForm = () =>{
    login.style.display = '';
    button.style.display = 'none';
}


const checkingFields = document.querySelector('.checking');
checkingFields.style.display = 'none';
const form = document.querySelector('form');

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
  }

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('nama');
    const nim = formData.get('nim');
    
    if (myTrim(name).length == 0 || myTrim(nim).length == 0){
        checkingFields.style.display = '';
    }

    if (myTrim(name).length > 0 && myTrim(nim).length > 0){
        checkingFields.style.display = 'none';
    }

});