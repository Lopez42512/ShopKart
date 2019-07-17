// Dependencies
// =============================================================

// // Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references my connection to the DB.
// var sequelize = require("../config/connection.js");

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    name: DataTypes.STRING,
    image: DataTypes.TEXT('medium'),
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER
   });

  Item.associate = function (models){
    Item.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    })
  }

  return Item;
}