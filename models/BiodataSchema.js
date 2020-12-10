const mongoose = require('mongoose');

const BiodataSchema =new mongoose.Schema({
    user:{
        type:String
    },
    nama: {
        type:String,
        required:true
    },
    nim: {
        type:String,
        required:true
    },
    lahir: {
        type:Date,
        required:true
    },
    ips: {
        type:String,
        required:true
    },
    alamat: {
        type:String,
        required:true
    },
    telp: {
        type:String,
        required:true
    },
    created: {
        type:Date,
        default:Date.now
    }
});
const Biodata = mongoose.model('Biodata',BiodataSchema);
module.exports = Biodata; 