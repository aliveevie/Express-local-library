const express = require("express");
const router = express.Router();

const book_controller = require('../controllers/bookController');
const author_controller = require('../controllers/authorController');
const genre_controller = require('../controllers/genreController');
const bookinstance_controller = require('../controllers/bookinstanceController');

// The Home page of all books
router.get("/", book_controller.index);

//Creating a book get request
router.get("/book/create", book_controller.book_create_get);

// Create a book for post request
router.post("/book/create", book_controller.book_create_post);

// Get request to delete book
router.get("/book/:id/delete", book_controller.book_delete_get);

// Post request to delete book
router.post("/book/:id/delete", book_controller.book_delete_post);


// Get request to update book
router.get("/book/:id/update", book_controller.book_update_get);

// Post request to update book
router.get("/book/:id/update", book_controller.book_update_post);

// Get request for one book
router.get("/book/:id", book_controller.book_detail);

// Get request for book list
router.get("/books", book_controller.book_list);

//The Author route
// Get request for creating author
router.get('/author/create', author_controller.author_create_get);

// Post request for creating author
router.post('/author/create', author_controller.author_create_post);

// Get request to delete author
router.get('/author/:id/delete', author_controller.author_delete_get);

// Post request for deleting author
router.post('/author/:id/delete', author_controller.author_delete_get);

// Get request to update author
router.get('/author/:id/update', author_controller.author_update_get);

// Post request to update author
router.post('/author/:id/update', author_controller.author_update_post);

// Get request for one author
router.get('/author/:id', author_controller.author_details);

// Get request for author list
router.get('/authors', author_controller.author_list);

// Genre routes

// Get request for creating genre
router.get('/genre/create', genre_controller.genre_create_get);

// Post request for creating genre
router.post('/genre/create', genre_controller.genre_create_post);

// Get request for updating genre
router.get('/genre/:id/update', genre_controller.genre_update_get);

//Post request for updating genre
router.post('/genre/:id/update', genre_controller.genre_update_post);

// Get request to delete a genre
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// Post request to delete a genre
router.post('/genre/:id/update', genre_controller.genre_update_post);

// Get request for one genre
router.get('/genre/:id', genre_controller.genre_details);

// Get request for genre list
router.get('/genres', genre_controller.genre_lists);

//Book instance routes
// Get request for creating bookinstance
router.get('/bookinstance/create', bookinstance_controller.bookinstance_create_get);

// Post request for creating bookinstance
router.post('/bookinstance/create', bookinstance_controller.bookinstance_create_post);

//Get request for updating bookinstance
router.get('/bookinstance/:id/update', bookinstance_controller.bookintance_update_get);

// Post request for updating bookinstance
router.post('/bookinstance/:id/update', bookinstance_controller.bookintance_update_post);

// Get request for deleting bookinstance
router.get('/bookinstance/:id/delete', bookinstance_controller.bookintance_delete_get);

// Post request for deleting bookinstance
router.post('/bookinstance/:id/', bookinstance_controller.bookintance_delete_post);

// Get request for getting one bookinstance
router.get('/bookinstance/:id', bookinstance_controller.bookintance_details);

// Get request for getting bookinstance list
router.get('/bookinstances', bookinstance_controller.bookintance_list);












module.exports = router;