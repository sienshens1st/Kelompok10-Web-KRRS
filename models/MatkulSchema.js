const mongoose = require('mongoose');

const MatkulSchema =new mongoose.Schema({
    user:{
        type:String
    },
    mataKuliah: [{
        type:String,
    }],
    kodeRegistrasi:{
        type:String
    },
    created: {
        type:Date,
        default:Date.now
    }
});
const Matkul = mongoose.model('Matkul',MatkulSchema);
module.exports = Matkul; 