var db = require("../models");

module.exports = {
  postCustomerApi: async function(req, res) {
    const dbCustomer = await db.Customer.create(req.body);
    res.json(dbCustomer);
  },
  api: function(app) {
    // Get all customers
    app.get("/api/customers", function(req, res) {
      db.Customer.findAll({}).then(function(dbCustomers) {
        res.json(dbCustomers);
      });
    });

    // Get a customer
    app.get("/api/customers/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.Customer.findAll({ where: { id: req.params.id } }).then(function(
        dbCustomers
      ) {
        console.log(dbCustomers);
        res.json(dbCustomers[0]);
      });
    });

    // Create a new customer
    app.post("/api/customers", this.postExampleApi);

    // Update a customer
    app.put("/api/customers/:id", function(req, res) {
      if (req.body.name) {
        db.Customer.update(
          { name: req.body.name },
          { where: { id: req.params.id } }
        ).then(function(dbCustomer) {
          if (req.body.address) {
            db.Customer.update(
              { address: req.body.address },
              { where: { id: req.params.id } }
            ).then(function(dbCustomer) {
              if (req.body.phone) {
                db.Customer.update(
                  { phone: req.body.phone },
                  { where: { id: req.params.id } }
                ).then(function(dbCustomer) {
                  res.json(dbCustomer);
                });
              } else {
                res.json(dbCustomer);
              }
            });
          } else if (req.body.phone) {
            db.Customer.update(
              { phone: req.body.phone },
              { where: { id: req.params.id } }
            ).then(function(dbCustomer) {
              res.json(dbCustomer);
            });
          } else {
            res.json(dbCustomer);
          }
        })
      } else if (req.body.address) {
        db.Customer.update(
          { address: req.body.address },
          { where: { id: req.params.id } }
        ).then(function(dbCustomer) {
          if (req.body.phone) {
            db.Customer.update(
              { phone: req.body.phone },
              { where: { id: req.params.id } }
            ).then(function(dbCustomer) {
              res.json(dbCustomer);
            });
          } else {
            res.json(dbCustomer);
          }
        });
      } else if (req.body.phone) {
        db.Customer.update(
          { phone: req.body.phone },
          { where: {id: req.params.id } }
        ).then(function(dbCustomer) {
          res.json(dbCustomer);
        });
      }
    });

    // Delete a customer by id
    app.delete("/api/customers/:id", function(req, res) {
      db.Customer.destroy({ where: { id: req.params.id } }).then(function(
        dbCustomer
      ) {
        res.json(dbCustomer);
      });
    });
  }
};
