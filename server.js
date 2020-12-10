if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose= require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

//passport config
require('./passport-config')(passport);

app.use(express.static("public"));
app.use('/users',express.static("public"));
app.use('/mainPage',express.static("public"));
app.use('/mainPage/biodata',express.static("public"));
app.use('/mainPage/cetak',express.static("public"));


//Body Parser
app.use(express.urlencoded({ extended: false }));


//express flash & session // session used for storing data in the session , can be use for redirecting
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());



//global vars
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.success_biodata = req.flash('success_biodata');
    res.locals.success_krrs = req.flash('success_krrs');
    res.locals.error_biodata = req.flash('error_biodata');
    next();
})


//ROUTES
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/mainPage',require('./routes/mainpage'));

//buat masukin matkul ke database biar cepet
// app.use(express.json());

// const List = require('./models/ListSchema');

// app.get('/test',async(req,res)=>{
//     const list = await List.find()
//     try{
//         res.json(list)
//     }catch(err){
//         res.status(422); // Unprocessable Entity
//         res.json(err);
//     }
// })

// app.post('/test',(req,res)=>{
//     const list = new List({
//         matkul:req.body.matkul,
//         kode:req.body.kode,
//         mataKuliah: req.body.mataKuliah,
//         hari:req.body.hari,
//         jam:req.body.jam,
//         beban:req.body.beban
//     });
    
//     list.save()
//     .then(data=>{
//         res.json(data)
//     })
//     .catch(err=>{
//         res.json({msg:err})
//     })
// })


//connect to db
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser:true,  useUnifiedTopology: true  })
.then(()=>{
    console.log('MongoDB Connected!');
})
.catch(err =>{
    console.log(err);
});

const PORT = process.env.PORT || 7777
app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
})