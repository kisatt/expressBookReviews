const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {

    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);

    users.push({username: username,password: password,});
    res.status(200).json({ message: "user registered successfully."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify({ books }, null, 4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const book_need = req.params.isbn;
    return res.send(books[book_need]);
    
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const authors = req.params.author;
    const book_arrs =  Object.values(books);
    const book = book_arrs.filter((book) => book.author === authors);
    return res.status(200).json(book);
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const book_arr = Object.values(books);
    const book = book_arr.filter((book) => book.title === title);
    return res.status(200).json(book);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const book_isbn = req.params.isbn;
    const book = books[book_isbn];
    return res.send(book.reviews);
});

module.exports.general = public_users;