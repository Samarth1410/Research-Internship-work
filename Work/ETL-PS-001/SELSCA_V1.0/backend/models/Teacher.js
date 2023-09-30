const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({

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

module.exports = Teacher = mongoose.model('Teacher' , TeacherSchema);