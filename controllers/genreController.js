const Genre = require('../models/genre');
const Book = require('../models/book');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");


// Get request for creating genre
exports.genre_create_get = asyncHandler(async (req, res, next) => {
    res.render("genre_form", {
        title: "Create genre"
    });
});

// Handle Post request for creating genre
exports.genre_create_post = asyncHandler(async (req, res, next) => {
    // Validate and Sanitize the name field
    body("name", "Genre must contain atleast three characters!")
        .trim()
        .isLength({min: 3})
        .escape()

    // Process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        // Extract validation errors from request
        const errors = validationResult(req)
        // Create a genre with escape and trimmed data
        const genre = new Genre({ name: req.body.name })

        if(!errors.isEmpty()){
            // There are errors render the message again with the sanitized values/error messages
            res.render("genre_form", {
                title: "Genre Create",
                errors: errors.array()
            });
            return
        }else{
            // Data from the form is valid
            // check if genre with the same name already exist
            const genreExist = await Genre.findOne({ name: req.body.name }).exec()
            if (genreExist){
                // direct to it's detail page
                res.redirect(genreExist.url)
            }else {
                await genre.save()
                // New genre saved redirect to the details page
                res.redirect(genre.url)
            }

        }

    })
});

// Get request for updating genre
exports.genre_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: Genre update get')
});

// Handle post request for updating post
exports.genre_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: Genre update post')
});

// Get request to delete genre
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: Genre delete get')
});

// Handle post request to delete genre
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: Genre update post')
});

// Get one genre
exports.genre_details = asyncHandler(async (req, res, next) => {

    const [genre, booksInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({ genre: req.params.id }, "title summary").exec()
    ]);
    if(genre === null){
        const err = new Error('Genre not found!')
        err.status = 404
        return next(err)
    };
    res.render("genre_details", {
        title: "Genre Details",
        genre: genre,
        genre_books: booksInGenre
    });
});

// Get Genre list
exports.genre_lists = asyncHandler(async (req, res, next) => {
    const genreAll = await Genre.find().sort({ name: 1}).exec()

    res.render("genre_list", {
        title: "The Genre List",
        genre_list: genreAll
    });
});
