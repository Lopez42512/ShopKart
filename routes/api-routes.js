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

  app.post("/paypalInfo", function(req, res) {
    console.log(req.body);
    db.Cart.destroy({
      where: {},
      truncate: true
    });
    db.Cart.create({
      // UserId: req.body.userId,
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      create_at: req.body.create_at
    }).then(function(results) {
      res.end();
    });
  });
  app.get("/api/paypal", function(req, res) {
    db.Cart.findAll({}).then(function(results) {
      const x ={
          name: results[0].name,
          price: results[0].price,
          desc: results[0].description,
          cat: results[0].category}
        
      console.log("==================================")
      console.log(x);
      console.log("==================================")
      res.json(x);
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
        // console.log(user_id_status);
        // console.log("======================================")
        // console.log(result.id);
      res.json(result.id);
      }
    });
  });

  app.post("/pay", (req, res) => {
    // console.log(req.body.price)
    console.log(req.body)
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
                name: "Car Part",
                sku: "001",
                price: 99.99,
                currency: "USD",
                quantity: 1
              }
            ]
          },
          amount: {
            currency: "USD",
            total: 99.99
          },
          description: "Engine Part"
        }
      ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
        throw error;
      } else {
        // console.log(payment)
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
        // console.log(error.response);
        throw error;
      } else {
          // console.log("Get payment Response");
          // console.log(JSON.stringify(payment));
          res.send(payment)
      }
    })
  })

  app.get("/cancel", (req, res) => res.send("cancelled"))
  
};
