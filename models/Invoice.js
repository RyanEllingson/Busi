module.exports = function(sequelize, DataTypes) {
  const Invoice = sequelize.define("Invoice", {
    salesorder_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount_paid: {
      type: DataTypes.DECIMAL(10, 2)
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2)
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Invoice;
};
