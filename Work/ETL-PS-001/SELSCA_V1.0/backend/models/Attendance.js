const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    
    name : {
        type : String,
        required : true
    },
    class : {
        type : String,
    },
    month : {
        type : Number,
        min: 1,
        max: 12
    },
    date : {
        type : Date,
        default: Date.now
    },
    status : {
        type : String,
        enum: ['present', 'absent', 'late'],
    }

})

module.exports = Attendance = mongoose.model("Attendance" , AttendanceSchema);