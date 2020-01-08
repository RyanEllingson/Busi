module.exports = function(sequelize, DataTypes) {
    const Order = sequelize.define("Order", {
        customer_id: {
            type:DataTypes.INT,
            allowNull: false
          },
          description: {
            type:DataTypes.STRING,
            allowNull: false
          },
          amount: {
            type:DataTypes.DECIMAL(10,2),
            allowNull: false
          },
    });
    return Order;
  };