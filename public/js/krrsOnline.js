

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


const b = document.querySelector('.beban2').innerHTML;

$(function(){

$('input[type="checkbox"]').on('change', function() {
    $('input[id="' + this.id + '"]').not(this).prop('checked', false);
});


$("#myvalid").submit(function(){
  var beban = b;
  // let max;
  var total = totalBeban();
  console.log(beban);
  console.log(total);
    // if(beban < .01){
    //   max = 999;
    // }
    // if (beban < 2 && ips >= 0.1){
    //    max = 16;
    // }
    // if(ips <3 && ips>=2){
    //     max = 20;
    // }
    // if(ips >= 3 && ips<3.5){
    //     max = 22;
    // }
    // if( ips>=3.5){
    //     max = 24;
    // }
    if(beban==''){
      return;

    }
    if (total>beban) {
      alert("Melebihi bobot sks!")
        return false;
    } else {
        return true;
    }
});

});



function totalBeban(){
  var bindo= document.querySelectorAll("[id='bindo']");
  var kewirausahaan= document.querySelectorAll("[id='kewirausahaan']");
  var kealaman = document.querySelectorAll("[id='kealaman']");
  var sosial = document.querySelectorAll("[id='sosial']");
  var budha = document.querySelectorAll("[id='budha']");
  var java = document.querySelectorAll("[id='java']");
  var sisterd = document.querySelectorAll("[id='sisterd']");
  var database = document.querySelectorAll("[id='database']");
  var technopreneurship = document.querySelectorAll("[id='technopreneurship']");
  var statistik = document.querySelectorAll("[id='statistik']");
  var basis = document.querySelectorAll("[id='basis']");
  var riset = document.querySelectorAll("[id='riset']");
  var aplikasi = document.querySelectorAll("[id='aplikasi']");
  var lunak = document.querySelectorAll("[id='lunak']");
  var grafika = document.querySelectorAll("[id='grafika']");
  var mikro = document.querySelectorAll("[id='mikro']");
  var mobile = document.querySelectorAll("[id='mobile']");
  var total = 0;
  
  for(var i = 0;i<bindo.length;i++){
 

    if(bindo[i].checked){
      total += 2;
      }
      if (bindo[0].checked && bindo[1].checked){
        return;
      }
     
  }

  for(var i = 0;i<kewirausahaan.length;i++){
    if(kewirausahaan[i].checked){
      total += 2;
      }
  }

  for(var i = 0;i<kealaman.length;i++){
    if(kealaman[i].checked){
      total += 2;
      }
  }

  for(var i = 0;i<sosial.length;i++){
    if(sosial[i].checked){
      total += 2;
      }
  }
  for(var i = 0;i<budha.length;i++){
    if(budha[i].checked){
      total += 2;
      }
  }

  for(var i = 0;i<java.length;i++){
    if(java[i].checked){
      total += 4;
      }
      if (java[0].checked && java[1].checked){
        return;
      }
  }

  for(var i = 0;i<sisterd.length;i++){
    if(sisterd[i].checked){
      total += 4;
      }
      if (sisterd[0].checked && sisterd[1].checked){
        return;
      }
  }

  for(var i = 0;i<database.length;i++){
    if(database[i].checked){
      total += 4;
      }
      if (database[0].checked && database[1].checked){
        return;
      }
  }

  for(var i = 0;i<technopreneurship.length;i++){
    if(technopreneurship[i].checked){
      total += 2;
      }
  }

  for(var i = 0;i<statistik.length;i++){
    if(statistik[i].checked){
      total += 4;
      }
      if (statistik[0].checked && statistik[1].checked){
        return;
      }
  }

  for(var i = 0;i<basis.length;i++){
    if(basis[i].checked){
      total += 2;
      }
      if (basis[0].checked && basis[1].checked){
        return;
      }
  }

  for(var i = 0;i<riset.length;i++){
    if(riset[i].checked){
      total += 2;
      }
  }

  for(var i = 0;i<aplikasi.length;i++){
    if(aplikasi[i].checked){
      total += 6;
      }
      if (aplikasi[0].checked && aplikasi[1].checked){
        return;
      }
  }

  for(var i = 0;i<lunak.length;i++){
    if(lunak[i].checked){
      total += 4;
      }
      if (lunak[0].checked && lunak[1].checked){
        return;
      }
  }

  for(var i = 0;i<grafika.length;i++){
    if(grafika[i].checked){
      total += 2;
      }
  }
  
  for(var i = 0;i<mikro.length;i++){
    if(mikro[i].checked){
      total += 4;
      }
      if (mikro[0].checked && mikro[1].checked){
        return;
      }
  }

  for(var i = 0;i<mobile.length;i++){
    if(mobile[i].checked){
      total += 4;
      }
      if (mobile[0].checked && mobile[1].checked){
        return;
      }
  }


  document.getElementById("total").value = total;
  return total;
}

