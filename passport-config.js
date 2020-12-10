const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require ('bcrypt');
const mongoose = require ('mongoose');

//load user models
const User = require('./models/UserSchema');



module.exports = function(passport){
    const authenticateUser = (email,password,done)=>{
        //match user 
        User.findOne({email: email})
        .then(user =>{
            if (user == null){
                return done(null, false, {message: 'Email tidak terdaftar'})//this is failureFlash = true
            }

            //match password 
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if (err) throw err;

                if (isMatch){
                    return done(null,user);
                }else{
                    return done(null,false,{message: 'Password yang anda masukan salah'})//this is failureFlash = true
                }
            });

        })
        .catch(err => console.log(err));
    }
    passport.use(
        new LocalStrategy({usernameField: 'email' },authenticateUser)
    );
    passport.serializeUser((user,done) => done(null,user.id)); // the same as 
    passport.deserializeUser((id,done) => {
        User.findById(id , (err,user)=>{
            done (err, user)
        })
    });

}