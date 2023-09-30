const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SyllabusSchema = new Schema({
    subject : {
        type : String,
        required: true
    },
    testName : {
        type : String,
        required : true
    },
    syllabus : {
        type : String,
    }
})

module.exports = Syllabus = mongoose.model("Syllabus" , SyllabusSchema);