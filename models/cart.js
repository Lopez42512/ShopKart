module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("Cart", {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT
    });
  
    
  
    return Cart;
  }