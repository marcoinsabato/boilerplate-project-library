/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const connectDB = require('../db/db'); 
const Book = require('../models/Book');
const Comment = require('../models/Comment');

connectDB();

module.exports = function (app) {



  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      const books = await Book.find().exec();
      res.json(books);
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      if (!title) {
        return res.send('missing required field title');
      }

      const book = new Book({
        title: title
      })

      const createdBook = await book.save();

      res.json(createdBook);
    })
    
    .delete(async function(req, res){
      const deletedBooks = await Book.deleteMany({});

      res.send(`complete delete successful`);
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      try {
        const book = await Book.findById(bookid);
        if (!book) {
          return res.send('no book exists');
        }

        res.json(book);
      } catch (err) {
        return res.send('no book exists');
      }
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;

      if (!comment) {
        return res.send('missing required field comment');
      }



      try {
        const book = await Book.findById(bookid);

        if (!book) {
          return res.send('no book exists');
        }

        book.comments.push(comment);
        await book.save();

        const updatedBook = await Book.findById(bookid);

        res.json(updatedBook);
      } catch (err) {
        return res.send('no book exists');
      }
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      try {
        const deletedBook = await Book.findByIdAndDelete(bookid);
        if (!deletedBook) {
          return res.send('no book exists');
        }

        res.send('delete successful');
      } catch (err) {
        return res.send('no book exists');
      }
    });
  
};
