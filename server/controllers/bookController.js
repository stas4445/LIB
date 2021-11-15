const {Book} = require('../models/models')
const ApiError = require('../error/ApiError');
const { models } = require('../db');

class BookController {
   async create(req, res, next) {
      try{
       const {title, author, publisher, ISBN, year_of_publication} = req.body
       const book = await Book.create({title, author, publisher, ISBN, year_of_publication})

       return res.json(book)
      } catch (e) {
         //console.log(e)
         next(ApiError.badRequest(e.message))
     }
   }

   async getAll(req, res) {
      try{
     // const books = await Book.findAll()
     let {title, author} = req.body
     let books;
     if (!title && !author) {
        books = await Book.findAndCountAll()
     }
     if (title && !author) {
        books = await Book.findOne({where:{title}})
     }
     if (!title && author) {
        books = await Book.findOne({where:{author}})
     }
     if (title && author) {
        books = await Book.findOne({where:{title, author}})
     }

      return res.json(books)
   } catch (e){
      next(ApiError.badRequest(e.message))
   }
   }

   
   async getOne(req, res) {
      const {id} = req.params
      const book = await Book.findOne({where: {id}})
      return res.json(book)  
   }


   async deleteBook(req, res) {
      const {id} = req.params
      const book = await Book.destroy({where: {id}})
      return res.json(book)  
   }
}

module.exports = new BookController()