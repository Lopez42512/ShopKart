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
<<<<<<< HEAD:models/item.js
    price: DataTypes.INTEGER
   });
=======
    price: DataTypes.FLOAT
  });
>>>>>>> 54fe810d54a1ab2bceaada03da8b97af76b6ab1c:models/item.js

  Item.associate = function (models){
    Item.belongsTo(models.User,{
      foreignKey:{
        allowNull: true
      }
    })
  }

  return Item;
}