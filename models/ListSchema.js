const mongoose = require('mongoose');

const ListSchema =new mongoose.Schema({
    matkul:{
        type:String
    },
    kode:{
        type:String
    },
    mataKuliah: {
        type:String,
    },
    hari:{
        type:String
    },
    jam:{
        type:String
    },
    beban:{
        type:String
    }
});
const List = mongoose.model('List',ListSchema);
module.exports = List; 