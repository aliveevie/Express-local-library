const BookInstance = require('../models/bookinstance');

const asyncHandler = require('express-async-handler');

const { body, validationResult } = require("express-validator");

const Book = require("../models/book");


//Get request for creating book instance
// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
    const allBooks = await Book.find({}, "title").exec();
  
    res.render("bookinstance_form", {
      title: "Create BookInstance",
      book_list: allBooks,
    });
  });
  
// Post request for creating a book
// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
    // Validate and sanitize fields.
    body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
    body("imprint", "Imprint must be specified")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("status").escape(),
    body("due_back", "Invalid date")
      .optional({ checkFalsy: true })
      .isISO8601()
      .toDate(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a BookInstance object with escaped and trimmed data.
      const bookInstance = new BookInstance({
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back,
      });
  
      if (!errors.isEmpty()) {
        // There are errors.
        // Render form again with sanitized values and error messages.
        const allBooks = await Book.find({}, "title").exec();
  
        res.render("bookinstance_form", {
          title: "Create BookInstance",
          book_list: allBooks,
          selected_book: bookInstance.book._id,
          errors: errors.array(),
          bookinstance: bookInstance,
        });
        return;
      } else {
        // Data from form is valid
        await bookInstance.save();
        res.redirect(bookInstance.url);
      }
    }),
  ];
  
// Get request to delete a bookinstance
exports.bookintance_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: BookInstance delete get!')
});

// Post request to delete a bookinstance
exports.bookintance_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: BookInstance delete post!')
});

// Get request to update a bookinstance
exports.bookintance_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: BookInstance update get!')
});

// Bookinstance to post request update
exports.bookintance_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: BookInstance update post!')
});

// Get instance details
exports.bookintance_details = asyncHandler(async (req, res, next) => {
    // Display detail page for a specific BookInstance.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id)
      .populate("book")
      .exec();
  
    if (bookInstance === null) {
      // No results.
      const err = new Error("Book copy not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("bookinstance_detail", {
      title: "Book:",
      bookinstance: bookInstance,
    });
  });
  
});

// Get instance list
exports.bookintance_list = asyncHandler(async (req, res, next) => {
    const allBookInstances = await BookInstance
            .find()
            .populate("book")
            .exec()
    res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: allBookInstances
    });
});




