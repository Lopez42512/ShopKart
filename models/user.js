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
<<<<<<< HEAD:models/user.js
    password: DataTypes.STRING
    // UserId:DataTypes.STRING
=======
    password: DataTypes.STRING,
>>>>>>> 54fe810d54a1ab2bceaada03da8b97af76b6ab1c:models/user.js
  });

  User.associate = function(models){
    User.hasMany(models.Item,{
      onDelete: "cascade"
    });
  }

  return User;
}