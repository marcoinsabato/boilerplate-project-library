const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }
});


const Comment = mongoose.model('Comment', Schema);

module.exports = Comment;