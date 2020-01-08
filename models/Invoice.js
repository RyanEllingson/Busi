module.exports = function(sequelize, DataTypes) {
    const Invoice = sequelize.define("Invoice", {
        salesorder_id: {
            type:DataTypes.INT,
            allowNull: false
          },
          amount_paid: {
            type:DataTypes.DECIMAL(10,2),
          },
          discount: {
            type:DataTypes.DECIMAL(10,2),
          },
          total_amount: {
            type:DataTypes.DECIMAL(10,2),
          },
          paid: {
            type:DataTypes.BOOLEAN,
            defaultValue: false,
          }
    });
    return Invoice;
  };