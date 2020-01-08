const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  // make a class to get attached to the db
  class Customer extends Sequelize.Model {}

  // define the schema
  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { sequelize, modelName: "Customer" }
  );

  Customer.sync();

  return Customer;
};
