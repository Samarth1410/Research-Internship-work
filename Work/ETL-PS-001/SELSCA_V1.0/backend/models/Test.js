const mongoose   = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    testName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    score: {
        type: Number,
    },
});

module.exports = TestSchema