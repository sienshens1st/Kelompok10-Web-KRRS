
// function genPDF(){
//     html2canvas(document.body,{
//         onrendered:function(canvas){
//             var img = canvas.toDataURL("image/png")
//             var doc = new jsPDF('p', 'mm', 'a4');
//             doc.addImage(img , 'JPEG',0,0)
//             doc.save();
//         }
//     })
// }

const btn = document.querySelector('#pdfDownloader')

$("#pdfDownloader").click(function(){

    html2canvas(document.getElementById("printDiv"), {
        onrendered: function(canvas) {

            var imgData = canvas.toDataURL('image/png',1.0);
            console.log('Report Image URL: '+imgData);
            var doc = new jsPDF("p", "px", "a4");
            
            doc.addImage(imgData, 'JPEG', 80, 0);
            doc.save('sample.pdf');
        }
    });
    btn.style.display="none";
});



$("#buttonclick").click(function(){

    var doc = new jsPDF('p', 'mm', [297, 210]);
    var kss = "Kartu Studi Sementara (KSS)";
    var ganjil = "Semester Ganjil 2020/2021";
    var increment = 50;
    const result = document.querySelector('.result')

    const URL = 'http://localhost:7777/mainPage/getAll'
    fetch(URL)
  .then(response => response.json())
  .then(data => {
    data.mataKuliah.forEach(data1 => {
        const div = document.createElement('div');
        div.textContent =   doc.text(80,increment,data1)
        increment+=8;
        result.appendChild(div);
    });

    doc.text(80,40,kss);
    doc.text(80,45,ganjil)
    doc.save('sampleple.pdf');
  })




});