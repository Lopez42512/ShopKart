// Dependencies
// =============================================================

// // Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references my connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = function(models){
    User.hasMany(models.Item,{
      onDelete: "cascade"
    });
  }

  return User;
}