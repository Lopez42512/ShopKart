// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
var Item = sequelize.define("item", {
  name: Sequelize.STRING,
  image: Sequelize.TEXT,
  category: Sequelize.STRING,
  description: Sequelize.STRING,
  price: Sequelize.INTEGER
});

// Syncs with DB
Item.sync();

// Makes the Book Model available for other files (will also create a table)
module.exports = Item;
