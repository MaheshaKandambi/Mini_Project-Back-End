const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    task: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });


module.exports = mongoose.model('Todo', todoSchema);