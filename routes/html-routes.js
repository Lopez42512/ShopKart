// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-end/index.html"));
  });

  app.get("/create", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-end/create.html"));
  });

  // this route will load login page
  app.get("/login/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-end/login.html"));
  });

  // this route will load registration page
  app.get("/login/register/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-end/registration.html"));
  });

  app.get("/paypal", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-end/paypal.html"));
  });

  app.get("/success:paymentId", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-end/registration.html"));
  });
};
