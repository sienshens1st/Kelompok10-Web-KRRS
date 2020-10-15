const userInfo = document.querySelector('.nam')
const userNim = document.querySelector('.nim');
const localName = localStorage.getItem('userName');
const localNim = localStorage.getItem('userNim');

const div = document.createElement('div');
const nama = document.createElement('h4'); 
const nim = document.createElement('h4');

var textNama = document.createElement('h4');
var textNim = document.createElement('h4');
textNama.innerHTML = "Nama  \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0: " + localName;
textNim.innerHTML = "Nim \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0: "  + localNim;
userInfo.appendChild(textNama);
userNim.appendChild(textNim);


//overlay submit
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}
//overlay submit end

const submit = document.getElementById("submit-ya");
submit.addEventListener("click",()=>{
alert("KRRS Online Submitted!");

});