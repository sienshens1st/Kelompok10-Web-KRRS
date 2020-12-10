const express = require('express');
const router = express.Router();
const { isNotLoginAuthenticated } = require('../auth-config');
const Biodata = require('../models/BiodataSchema');
const Matkul = require('../models/MatkulSchema');
const List = require('../models/ListSchema');


//----------------------------------HOME------------------------------------------
//HOME PAGE
router.get('/',isNotLoginAuthenticated,async(req,res)=> {

    const biodata = await Biodata.findOne({"user":req.user._id})
    try {
        res.render('home.ejs',{
            email : req.user.email,
            user_id : req.user._id,
            user_name:biodata.nama,
            user_nim:biodata.nim
        }); 
    } catch (error) {
        res.render('home.ejs',{
            email : req.user.email,
            user_id : req.user._id,
        }); 
    }

});
//----------------X-----------------HOME---------------------X--------------------



//----------------------------------KRRS------------------------------------------

//KRRS ONLINE GET
router.get('/krrs',isNotLoginAuthenticated,async(req,res)=> { // using try catch async
    const biodata = await Biodata.findOne({"user":req.user._id});
    const matkul =  await Matkul.findOne({"user":req.user._id});
    if(matkul){
        res.redirect('/mainPage/cetak')
    }else{
        try {
            let user_beban;
            if (biodata.ips < 2){
                user_beban = 16;
            }
            if(biodata.ips <3 && biodata.ips>=2){
                user_beban = 20;
            }
            if(biodata.ips >= 3 && biodata.ips<3.5){
                user_beban = 22;
            }
            if(biodata.ips>=3.5){
                user_beban = 24;
            }
    
            res.render('krrsOnline.ejs',{
                user_name:biodata.nama,
                user_nim:biodata.nim,
                user_ips:biodata.ips,
                user_beban
                 }
            ); 
        } catch (error) {
            res.render('krrsOnline.ejs'); 
        }
    }

  

});



//KKRS ONLINE POST
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

router.post('/krrs',isNotLoginAuthenticated,(req,res)=>{

    const { mataKuliah } = req.body
    const postMatkul = new Matkul({
        user: req.user._id,
        mataKuliah: mataKuliah,
        kodeRegistrasi:makeid(8)
    })

    Biodata.findOne({"user":req.user._id})
    .then(biodata =>{
        if(!biodata){
            req.flash('error_biodata', 'Silahkan isi profile untuk mengisi krrs.');
            res.redirect('/mainPage/biodata')
        }
        
        if(!biodata && mataKuliah){
            req.flash('error_biodata', 'Silahkan isi profile untuk mengisi krrs.');
            res.redirect('/mainPage/biodata')
        }
        if(!mataKuliah){
            let user_beban;
            if (biodata.ips < 2){
                user_beban = 16;
            }
            if(biodata.ips <3 && biodata.ips>=2){
                user_beban = 20;
            }
            if(biodata.ips >= 3 && biodata.ips<3.5){
                user_beban = 22;
            }
            if(biodata.ips>=3.5){
                user_beban = 24;
            }
    
            res.render('krrsOnline.ejs',{
                user_name:biodata.nama,
                user_nim:biodata.nim,
                user_ips:biodata.ips,
                user_beban
                 }); 
        }else{
            postMatkul.save()
            .then(user =>{
                req.flash('success_krrs', 'KRRS Online 2020 Anda telah berhasil di submit!');
              res.redirect('/mainPage/cetak');
            
            })
            .catch(err => res.json(err));
        }
    })
    .catch(err =>{
        res.render('krrsOnline.ejs'); 
    });
})



router.get('/krrs/edit',isNotLoginAuthenticated,(req,res)=>{
    var user_id = req.user._id;

    Matkul.findOneAndUpdate({"user":user_id},req.body,{new:true},(err,data)=>{
            if(err){
                console.log("Tidak dapat mengambil data karena kesalahan database!")
            }else{
                if(!data){
                    res.render('biodata-not-found.ejs')
                }
                else{
                    Biodata.findOne({user:user_id})
                    .then(biodata=>{
                        let user_beban;
                            if (biodata.ips < 2){
                                user_beban = 16;
                            }
                            if(biodata.ips <3 && biodata.ips>=2){
                                user_beban = 20;
                            }
                            if(biodata.ips >= 3 && biodata.ips<3.5){
                                user_beban = 22;
                            }
                            if(biodata.ips>=3.5){
                                user_beban = 24;
                            }
                        res.render('krrsOnline-edit.ejs',{
                            user:data,
                            user_name:biodata.nama,
                            user_nim:biodata.nim,
                            user_ips:biodata.ips,
                            user_beban
                        })
                    })
                   
                }
            
            }
})

})

router.post('/krrs/edit',isNotLoginAuthenticated,(req,res,next)=>{
    var user_id = req.user._id;
    Matkul.findOneAndUpdate({"user":user_id},req.body,(err,data)=>{
        if(err){
            console.log("something went wrong to update your data.")
            next(err)
        }else{
            Matkul.updateOne( {"user":user_id}, {$set:{kodeRegistrasi:makeid(8)}},(err,data)=>{
                if (err){
                    console.log(err)
                }else{
                    console.log("updated docs:" , data)
                }
            })
            req.flash('success_krrs', 'Krrs Online 2020 Anda telah berhasil diubah!');
            res.redirect('/mainPage/cetak');
         
        }
    })

});


//-------------X--------------------KRRS------------------X-----------------------



//----------------------------------CETAK KRRS------------------------------------------

router.get('/cetak',isNotLoginAuthenticated,async(req,res)=> {
    const matkul =  await Matkul.findOne({"user":req.user._id});
    const biodata =  await Biodata.findOne({"user":req.user._id});
    const list = await List.find();
    try{
        if(matkul){
            res.render('cetakKrrs.ejs',{
                user_name: biodata.nama,
                user_nim:biodata.nim,
                user_kode:matkul.kodeRegistrasi,
                user_id:req.user._id,
                list,
                user_matkul:matkul.mataKuliah,
                user_total_beban:0
            })
        }else{
            res.render('cetakKrrs.ejs',{
                user_name: biodata.nama,
                user_nim:biodata.nim,
                user_id:req.user._id,
                user_matkul: ''
            })
        }

    }
    catch(error){
        res.render('cetakKrrs.ejs',{
            user_id:req.user._id,
            user_matkul: ''
        })
    }
 
});



router.get('/cetak/:user_id',isNotLoginAuthenticated,(req,res)=>{
    var user_id = req.params.user_id;

    res.render('kode-registrasi.ejs',{
        user_id:user_id
    });

})

router.post('/cetak/:user_id',isNotLoginAuthenticated,(req,res)=>{
    var user_id = req.params.user_id;
    const kode_registrasi = req.body.kode;
    
       Matkul.findOne({"user":user_id})
       .then(user =>{
           if(user.kodeRegistrasi == kode_registrasi){
            res.redirect('/mainPage/krrs/edit')
           }
           else{
            res.render('biodata-not-found.ejs');
           }
       })
       .catch(err=>{
           res.render('biodata-not-found.ejs');
       })

})

router.get('/cetak/:user_id/preview',isNotLoginAuthenticated,async(req,res)=>{
    const matkul =  await Matkul.findOne({"user":req.user._id});
    const biodata =  await Biodata.findOne({"user":req.user._id});
    const list = await List.find();
    try{
        let user_beban;
        if (biodata.ips < 2){
            user_beban = 16;
        }
        if(biodata.ips <3 && biodata.ips>=2){
            user_beban = 20;
        }
        if(biodata.ips >= 3 && biodata.ips<3.5){
            user_beban = 22;
        }
        if(biodata.ips>=3.5){
            user_beban = 24;
        }
        res.render('cetak-preview.ejs',{
            user_name: biodata.nama,
            user_nim:biodata.nim,
            user_ips:biodata.ips,
            user_beban,
            matkul,
            user_kode:matkul.kodeRegistrasi,
            user_id:req.user._id,
            list,
            user_matkul:matkul.mataKuliah,
            user_total_beban:0
        });
    }
    catch(err){
        res.render('biodata-not-found.ejs')
    }
   
})


//-------------X--------------------CETAK KRRS------------------X-----------------------


//PANDUAN KRRS
router.get('/panduan',isNotLoginAuthenticated,(req,res)=> {
    res.render('panduanKrrs.ejs'); 
});



//----------------------------------BIODATA------------------------------------------

router.get('/biodata',isNotLoginAuthenticated,async (req,res)=> {
    const biodata = await Biodata.findOne({"user":req.user._id})
    try{
        if(!biodata){
            res.render('biodata-form.ejs',{
                user_id :req.user._id
            }); 
        }
        else{
           
            res.render('biodata-profile.ejs',{
                user_id :req.user._id,
                user_name:biodata.nama,
                user_nim:biodata.nim,
                user_lahir:biodata.lahir.toDateString().slice(4, biodata.lahir.length),
                user_ips:biodata.ips,
                user_alamat:biodata.alamat,
                user_telp:biodata.telp,
            }); 
        }
    }
    catch(error){
       res.json(error);  
    }

   
});

router.post('/biodata',isNotLoginAuthenticated,(req,res)=>{

  const postBiodata = new Biodata({
    user: req.user._id,
    nama: req.body.nama,
    nim: req.body.nim,
    lahir: req.body.lahir,
    ips: req.body.ips,
    alamat:req.body.alamat,
    telp:req.body.telp,
  });
console.log(req.user._id);
postBiodata.save()
.then(user =>{
  req.flash('success_biodata', 'Profil Anda telah disimpan');
  res.redirect('/mainPage/biodata')
})
.catch(err => res.json(err));

});


//GET EDIT USER BIODATA
router.get('/biodata/:user_id',isNotLoginAuthenticated,(req,res)=>{
    var user_id = req.params.user_id;

    Biodata.findOneAndUpdate({"user":user_id},req.body,{new:true},(err,data)=>{
            if(err){
                console.log("cant retrieve data because of database error!")
            }else{
                if(!data){
                    res.render('biodata-not-found.ejs')
                }
                else{
                    res.render('biodata-edit.ejs',{
                        user:data
                    })
                }
            
            }
    })

  
});
//POST EDIT USER BIODATA
router.post('/biodata/:user_id',isNotLoginAuthenticated,(req,res,next)=>{
    var user_id = req.params.user_id;
    Biodata.findOneAndUpdate({"user":user_id},req.body,(err,data)=>{
        if(err){
            res.json("Terjadi kesalahan saat memperbarui data Anda.")
            next(err)
        }else{
            req.flash('success_biodata', 'Profil Anda telah disimpan');
            res.redirect('/mainPage/biodata');
        }
    })

});

//-------------X--------------------BIODATA---------------------X--------------------

router.get('/getAll',isNotLoginAuthenticated,(req,res)=>{
    Matkul.findOne({"user":req.user._id})
    .then(result=>{
        res.json(result);
    })
})






module.exports = router;