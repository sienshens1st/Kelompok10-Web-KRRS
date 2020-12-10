const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoginAuthenticated } = require('../auth-config');

//login page
router.get('/login',isLoginAuthenticated,(req,res)=> {
    res.render('login.ejs');
});

router.post('/login',isLoginAuthenticated,(req,res,next)=>{
passport.authenticate('local',{
    successRedirect: '/mainPage',
    failureRedirect: '/users/login',
    failureFlash: true
})(req,res,next);

});




//register
router.get('/register',isLoginAuthenticated,(req,res)=> {
    res.render('register.ejs')
});

//REGISTER HANDLE
router.post('/register',isLoginAuthenticated, (req,res)=>{
    const { email , password} = req.body;
    console.log(email);
    console.log(password);
    let errors = [];
    if (!email || !password){
        errors.push({msg:'Harap isi semua Kolom!'})
    }

    if(password.length < 6){
        errors.push({msg:'Kata sandi minimal harus 6 karakter'})
    }
    
    if(errors.length > 0){
        res.render('register.ejs',{
            errors,
            email,
            password
        })
        console.log(errors);
    }else{
        User.findOne({email: email})
        .then(user =>{
            if(user){
                //user exist
                errors.push({msg: 'Email sudah terdaftar!'})
                res.render('register.ejs',{
                    errors,
                    email,
                    password
                });
            }else{
                const newUser = new User({
                   email,
                   password
                })
                //hash the password
                bcrypt.genSalt(10,(err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err) throw err;
                        //set passwrod to hash
                        newUser.password = hash;
                        // save user 
                        newUser.save()
                        .then(user =>{
                            req.flash('success_msg', 'Anda telah terdaftar dan dapat log in ');
                            res.redirect('/users/login')
                        })
                        .catch(err => console.log(err))

                    });
                });
            }
        })
    }
});

//logout handle
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','Anda telah keluar')
    res.redirect('/users/login');
})


module.exports = router