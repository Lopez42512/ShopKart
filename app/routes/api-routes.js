// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Item = require("../models/item");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all items
  app.get("/api/all", function(req, res) {
    Item.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Get all items of a specific category
  app.get("/api/category/:category", function(req, res) {
    Item.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/new", function(req, res) {
    console.log(req.body);

    Item.create({
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      create_at: req.body.create_at
    }).then(function(results){
      res.end()
    });
  });

  // // Get a specific book
  // app.get("/api/:book", function(req, res) {
  //   Book.findAll({
  //     where: {
  //       title: req.params.book
  //     }
  //   }).then(function(results) {
  //     res.json(results);
  //   });
  // });

  // Get all books from a specific author
  //   app.get("/api/author/:author", function(req, res) {
  //     Book.findAll({
  //       where: {
  //         author: req.params.author
  //       }
  //     }).then(function(results) {
  //       res.json(results);
  //     });
  //   });

  //   // Get all "long" books (books 150 pages or more)
  //   app.get("/api/books/long", function(req, res) {
  //     Book.findAll({
  //       where: {
  //         pages: {
  //           $gte: 150
  //         }
  //       },
  //       order: [["pages", "DESC"]]
  //     }).then(function(results) {
  //       res.json(results);
  //     });
  //   });

  //   // Get all "short" books (books 150 pages or less)
  //   app.get("/api/books/short", function(req, res) {
  //     Book.findAll({
  //       where: {
  //         pages: {
  //           $lte: 150
  //         }
  //       },
  //       order: [["pages", "ASC"]]
  //     }).then(function(results) {
  //       res.json(results);
  //     });
  //   });

  //   // Add a book
  //   app.post("/api/new", function(req, res) {
  //     console.log("Book Data:");
  //     console.log(req.body);
  //     Book.create({
  //       title: req.body.title,
  //       author: req.body.author,
  //       genre: req.body.genre,
  //       pages: req.body.pages
  //     }).then(function(results) {
  //       res.json(results);
  //     });
  //   });

  //   // Delete a book
  //   app.delete("/api/book/:id", function(req, res) {
  //     console.log("Book ID:");
  //     console.log(req.params.id);
  //     Book.destroy({
  //       where: {
  //         id: req.params.id
  //       }
  //     }).then(function() {
  //       res.end();
  //     });
  //   });
};
