const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        default: 'DEFAULT TITLE'
    },
    description: {
        type: String,
        default: 'default description'
    },
    dateOfCreated: {
        type: Date,
        default: Date.now
    }, 
    byReporter: {
        type: mongoose.Types.ObjectId,
        ref: 'reporter',
        required: true
    },
    thumbnails: {
        type: Buffer
    }
});




module.exports = mongoose.model('news', newsSchema);