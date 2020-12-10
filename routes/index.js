const express = require('express');
const router = express.Router();
const { isLoginAuthenticated } = require('../auth-config');

router.get('/',isLoginAuthenticated,(req,res)=> {
    res.render('index.ejs');
});

router.get('/landingPage',isLoginAuthenticated,(req,res)=> {
    res.render('landingPage.ejs')
});


module.exports = router