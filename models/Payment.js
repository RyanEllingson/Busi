module.exports = function(sequelize, DataTypes) {
    const Payment = sequelize.define("Payment", {
        invoice_id: {
            type:DataTypes.INTEGER,
            allowNull: false
          },
          amount: {
            type:DataTypes.DECIMAL(10,2),
            allowNull: false
          },
    });
    return Payment;
  };