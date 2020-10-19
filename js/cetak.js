const userInfo = document.querySelector('.nam')
const userNim = document.querySelector('.nim');
const localName = localStorage.getItem('userName');
const localNim = localStorage.getItem('userNim');

const div = document.createElement('div');
const nama = document.createElement('h4'); 
const nim = document.createElement('h4');

var textNama = document.createElement('h4');
var textNim = document.createElement('h4');
textNama.innerHTML = "Nama : " + localName;
textNim.innerHTML = "NIM \xa0\xa0\xa0: "  + localNim;
userInfo.appendChild(textNama);
userNim.appendChild(textNim);