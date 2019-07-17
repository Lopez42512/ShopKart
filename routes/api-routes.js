// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");

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
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      create_at: req.body.create_at,
      UserId: req.body.UserId
      
    }).then(function(results){
      res.end()
    });
  });


  //============== create a new user ====================================

  app.post("/api/new/user", function(req, res) {
    console.log(req.body);

    db.User.create({
      username: req.body.email,
      password: req.body.password
      
    }).then(function(results){

      res.send({
        status: "added",
        message:"Your account created"});
    });
  });

  //==============================++=======================+==+=====+=+=+====
  var user_id_status;
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
      // console.log(result);
      
      if(result === null){
        user_id_status = false;
       res.json(result);
        
      } else{
        user_id_status = true;
        console.log(user_id_status);
      res.json(result.id);
      }
    });
  });
console.log("============================================================================================");
console.log(user_id_status);
  

  
};
