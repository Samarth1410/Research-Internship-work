const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GradesDueDateSchema  = new Schema({
    testName : {
        type : String,
        required : true
    },
    date : {
        type : Date
    },
    subject : {
        type : String,
        required : true
    }
})

module.exports = GradesDueDate = mongoose.model('GradesDueDate' , GradesDueDateSchema);