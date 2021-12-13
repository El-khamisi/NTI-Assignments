const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const taskModel = mongoose.model('taskSchema', taskSchema);
module.exports = taskModel;