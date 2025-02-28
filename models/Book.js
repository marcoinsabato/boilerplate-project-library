const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // comments: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Comment'
    //     }
    // ],
    comments : [
        {
            type: String
        }
    ],
    commentcount: {
        type: Number,
        default: 0
    }
});

Schema.pre('save', function(next) {
    if (this.isModified('comments')) {
      this.commentcount = this.comments.length;
    }
    next();
});

const Book = mongoose.model('Book', Schema);

module.exports = Book;