const { Schema, model } = require('mongoose');


const GroupSchema = Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    logo: {
        type: String,
    }
});

module.exports = model('Group', GroupSchema );