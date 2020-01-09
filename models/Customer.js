const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  // make a class to get attached to the db
  class Customer extends Sequelize.Model {}

  // define the schema
  // updated to include phone_number/address
  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone_number: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      }
    },
    { sequelize, modelName: "Customer" }
  );

  Customer.sync();

  return Customer;
};
