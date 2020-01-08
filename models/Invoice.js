module.exports = function(sequelize, DataTypes) {
    const Invoice = sequelize.define("Invoice", {
        salesorder_id: {
            type:DataTypes.INTEGER,
            allowNull: false
          },
          amount_paid: {
            type:DataTypes.DECIMAL(10,2),
          },
          discount: {
            type:DataTypes.DECIMAL(10,2),
          },
          amount_remaining: {
            type:DataTypes.DECIMAL(10,2),
          },
          paid: {
            type:DataTypes.BOOLEAN,
            defaultValue: false,
          }
    });
    return Invoice;
  };