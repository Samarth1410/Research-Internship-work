const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeadmasterSchema = new Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    studentID: {
        type : String,
    },
    DOB :{
        type: Date,
    },
    address : {
        type : String
    },
    gender : {
        type : String,
    }
})

module.exports = Headmaster = mongoose.model('Headmaster' , HeadmasterSchema);