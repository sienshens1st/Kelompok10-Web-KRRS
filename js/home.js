const userInfo = document.querySelector('.userInfo');
const localName = localStorage.getItem('userName');
const localNim = localStorage.getItem('userNim');


const div = document.createElement('div');
const name = document.createElement('h2');
const nim = document.createElement('h2');
name.textContent = localName;
nim.textContent = localNim;
div.appendChild(name);
div.appendChild(nim);
userInfo.appendChild(div);