const Book = require('../models/book');
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

const { body, validationResult } = require("express-validator");

const asyncHandler = require('express-async-handler');



exports.index = asyncHandler(async (req, res, next) => {
    // Get all the number of books stored in the collection
    const [
        numBooks,
        numBookInstances,
        numBookInstancesAvailable,
        numAuthors,
        numGenres
    ] = await Promise.all([
        Book.countDocuments({}).exec(),
        BookInstance.countDocuments({}).exec(),
        BookInstance.countDocuments({ status: "Available"} ).exec(),
        Author.countDocuments({}).exec(),
        Genre.countDocuments({}).exec()
    ]);

    res.render("index", {
        title: "Local Library Home",
        book_count: numBooks,
        numBook_instance_count: numBookInstances,
        numBook_instance_count_available: numBookInstancesAvailable,
        author_count: numAuthors,
        genre_count: numGenres
    });

});



//Display the detail page for creating a get post
// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
    // Get all authors and genres, which we can use for adding to our book.
    const [allAuthors, allGenres] = await Promise.all([
      Author.find().exec(),
      Genre.find().exec(),
    ]);
  
    res.render("book_form", {
      title: "Create Book",
      authors: allAuthors,
      genres: allGenres,
    });
  });
  
// Display a details page for displaying a post get
// Handle book create on POST.
exports.book_create_post = [
    // Convert the genre to an array.
    (req, res, next) => {
      if (!(req.body.genre instanceof Array)) {
        if (typeof req.body.genre === "undefined") req.body.genre = [];
        else req.body.genre = new Array(req.body.genre);
      }
      next();
    },
  
    // Validate and sanitize fields.
    body("title", "Title must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("author", "Author must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("summary", "Summary must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
    body("genre.*").escape(),
    // Process request after validation and sanitization.
  
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a Book object with escaped and trimmed data.
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: req.body.genre,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
  
        // Get all authors and genres for form.
        const [allAuthors, allGenres] = await Promise.all([
          Author.find().exec(),
          Genre.find().exec(),
        ]);
  
        // Mark our selected genres as checked.
        for (const genre of allGenres) {
          if (book.genre.indexOf(genre._id) > -1) {
            genre.checked = "true";
          }
        }
        res.render("book_form", {
          title: "Create Book",
          authors: allAuthors,
          genres: allGenres,
          book: book,
          errors: errors.array(),
        });
      } else {
        // Data from form is valid. Save book.
        await book.save();
        res.redirect(book.url);
      }
    }),
  ];
  

// Display details for book get
exports.book_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Book delete get")
});

// Display details for a book post
exports.book_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Book delete post")
});

// Display book update on get
exports.book_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Book update on get")
});

// Handle book update on post
exports.book_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Book update on post")
});

// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
    // Get details of books, book instances for specific book
    const [book, bookInstances] = await Promise.all([
      Book.findById(req.params.id).populate("author").populate("genre").exec(),
      BookInstance.find({ book: req.params.id }).exec(),
    ]);
  
    if (book === null) {
      // No results.
      const err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("book_detail", {
      title: book.title,
      book: book,
      book_instances: bookInstances,
    });
  });
  

exports.book_list = asyncHandler(async (req, res, next) => {
    const allBooks = await Book.find({}, "title author")
    .sort({title: 1})
    .populate("author")
    .exec()

    res.render("book_list", { title: "Book List", book_list: allBooks})
});



