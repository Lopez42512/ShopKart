
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();
const bodyParser = require("body-parser");
const paypal = require("paypal-rest-sdk");
var db = require("./models");

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ATrWQTn1u_taOphdJbsOy0OM18uHITJmcQYLRhwtNlw1-0MnKKq5jPF7S5Z4l37DuAMde7SMcZqgdvCJ',
  'client_secret': 'ED1mU57xZRE4UFtSOre_gqy_xYkVBsp1uqRopVBhvOyox1ELOtlRrEHPxd5-B1U0NcUMYXdf7Asoai99'
});

// support parsing of application/json type post data
app.use(bodyParser.json({limit: '10mb', extended: true}));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
app.use(express.static("Front-end"));
// }

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
// Define API routes here

// require("./app/routes/api-routes.js")(app);

// Send every other request to the React app
// Define any API routes before this runs


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Front-end/index.html"));
});



app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "./Front-end/create.html"))
})

// this route will load login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./Front-end/login.html"))
});

// this route will load registration page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./Front-end/registration.html"))
})

// Login page route
app.get("/access", (req, res) => {
  res.sendFile(path.join(__dirname, "./Front-end/login.html"))
})





db.sequelize.sync( {force: false} ).then(function() {
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
})
