const mongoose = require('mongoose');

const Schema = mongoose.Schema

const entrySchema = new Schema({
    company_name: {
        type: String,
        required: true
    },
    contractor_name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time_in: {
        type: String,
        required: true
    },
    time_out: {
        type: String
    },
    work: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    },
    initials: {
        type: String,
        required: true
    },
    comments: {
        type: String
    }
});

module.exports = mongoose.model('Entry', entrySchema)