const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = require('./Test');

const GradesSchema = new Schema({

    studentName: {
        type: String,
        required: true,
    },
    studentID: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    tests: {
        type: [TestSchema],
    },
    finalGrade: {
        type: String,
    },

})

module.exports = Grades = mongoose.model('Grades' , GradesSchema);