// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");
const paypal = require("paypal-rest-sdk");



// Routes
// =============================================================
module.exports = function(app) {
  // Get all items
  app.get("/api/all", function(req, res) {
    db.Item.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Get all items of a specific category
  app.get("/api/category/:category", function(req, res) {
    db.Item.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/new", function(req, res) {
    console.log(req.body);

    db.Item.create({
      // UserId: req.body.userId,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      create_at: req.body.create_at
    }).then(function(results) {
      res.end();
    });
  });

  // create a new user
  app.post("/api/new/user", function(req, res) {
    console.log(req.body);

    db.User.create({
      username: req.body.email,
      password: req.body.password
    }).then(function(results) {
      res.send({
        status: "added",
        message:"Your account created"});
    });
  });

  //========================== User login route ============================
  app.get("/api/username:n/Password:p", function(req, res) {
    console.log(req.params);
    // Find one user with the username and password 
    db.User.findOne({
      where: {
        username: req.params.n,
        password: req.params.p
      }
    }).then(function(result) {
    
       if(result === null){
        user_id_status = false;
       res.json(result);

      } else if (result !== null){
        user_id_status = true;
        console.log(user_id_status);
        console.log("======================================")
        console.log(result.id);
      res.json(result.id);
      }
    });
  });


  app.post("/pay", (req, res) => {
    console.log(res)
    var create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url: "http://localhost:3002/success",
        cancel_url: "http://localhost:3002/cancel"
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "whatever",
                sku: "001",
                price: "25.00",
                currency: "USD",
                quantity: 1
              }
            ]
          },
          amount: {
            currency: "USD",
            total: "25.00"
          },
          description: "This is the payment description."
        }
      ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
        throw error;
      } else {
        for(var i = 0; i < payment.links.length; i++){
          if(payment.links[i].rel === "approval_url"){
            res.redirect(payment.links[i].href)
          }
        }
      }
    });
  });

  app.get("/success", (req,res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [{
        amount: {
          currency: "USD",
          total: "25.00"
        }
      }]
    }

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment){
      if(error){
        console.log(error.response);
        throw error;
      } else {
          console.log("Get payment Response");
          console.log(JSON.stringify(payment));
          res.send(payment)
      }
    })
  })

  app.get("/cancel", (req, res) => res.send("cancelled"))
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
