import express from 'express';
import { Book } from '../models/bookModel.js';
const router = express.Router();
//Route for saving new book
router.post('/',async (req,res)=>{
  try{
    if(!req.body.title || !req.body.author || !req.body.publishYear){
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  }catch(err){
    console.log(err);
    res.status(500).send({message: err.message});
  }
})

//route for getting all books from database
router.get('/',async (req,res)=>{
  try{
    const books = await Book.find({});
    return res.status(200).send({
      count:books.length,
      data:books
    });
  }catch(err){
    console.log(err);
    res.status(500).send({message:err.message});
  }
});

//route for getting book from database by id
router.get('/:id',async (req,res)=>{
  try{
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.status(200).send(book);
  }catch(err){
    console.log(err);
    res.status(500).send({message:err.message});
  }
});

//route for updating book in database
router.put('/:id',async (req,res)=>{
  try{
    if(!req.body.title || !req.body.author || !req.body.publishYear){
      return res.status(400).send({
        message: 'Send all required fields: title, author, publish year',
      });
    }
    const {id} = req.params;
    const result = await Book.findByIdAndUpdate(id,req.body);
    if(!result){
      return res.status(404).json({message:'Book not found'});
    }
    return res.status(200).send({message:'Book updated successfully'});
  }catch(err){
    console.log(err);
    res.status(500).send({message: res.message});
  }
});

//route for deleting a book from database
router.delete('/:id', async (req,res)=>{
  try{
    const {id} = req.params;
    const result = await Book.findByIdAndDelete(id);
    if(!result){
      return res.status(404).json({message:"Book not found"});
    }
    return res.status(200).send({message:"Book deleted successfully"});
  }catch(err){
    console.log(err);
    return res.status(500).send({message: err.message});
  }
});

export default router;