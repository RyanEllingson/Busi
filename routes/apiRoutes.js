const db = require("../models");
const _ = require("underscore");
const Op = db.Sequelize.Op;

module.exports = {
  // function for creating a new customer
  postCustomerApi: async function(req, res) {
    const dbCustomer = await db.Customer.create(req.body);
    res.json(dbCustomer);
  },
  // function for creating a new sales order
  postOrderApi: async function(req, res) {
    const dbOrder = await db.Order.create(req.body);
    res.json(dbOrder);
  },
  // function for creating a new invoice
  postInvoiceApi: async function(req, res) {
    const dbInvoice = await db.Invoice.create(req.body);
    const salesorderId = dbInvoice.dataValues.salesorder_id;
    // automatically assign the amount of the invoice based on the amount of the given sales order
    const dbOrders = await db.Order.findAll({ where: { id: salesorderId } });
    const amount = dbOrders[0].amount;
    const dbInvoice2 = await db.Invoice.update(
      { total_amount: amount },
      { where: { id: dbInvoice.dataValues.id } }
    );
    res.json(dbInvoice);
  },
  // function for creating a new payment
  postPaymentApi: async function(req, res) {
    const dbPayment = await db.Payment.create(req.body);
    const invoiceId = dbPayment.dataValues.invoice_id;
    // after a new payment is created, grab all the payments for the given invoice and calculate how much has been paid toward that invoice
    const dbPayments = await db.Payment.findAll({
      where: { invoice_id: invoiceId }
    });
    let totalPaid = 0;
    for (let i = 0; i < dbPayments.length; i++) {
      const amount = parseFloat(dbPayments[i].amount);
      totalPaid = totalPaid + amount;
    }
    const dbInvoices = await db.Invoice.findAll({ where: { id: invoiceId } });
    // evaluate whether the invoice has been paid in full
    let isPaid;
    if (dbInvoices[0].total_amount - req.body.discount - totalPaid > 0) {
      isPaid = false;
    } else {
      isPaid = true;
    }
    const dbInvoice = await db.Invoice.update(
      { amount_paid: totalPaid, paid: isPaid },
      { where: { id: invoiceId } }
    );
    res.json(dbPayment);
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
        res.json(dbCustomers);
      });
    });

    // Get all customers that have name like the searched term
    app.get("/customers/search-by-name/:name", (req, res) => {
      db.Customer.findAll({
        where: { name: { [Op.like]: "%" + req.params.name + "%" } }
      })
        .then(results => {
          res.json(results);
        })
        .catch(err => console.log(err));
    });
    // Get all customers with phone number that matches the searched term
    app.get("/customers/search-by-phone/:phone", (req, res) => {
      db.Customer.findAll({ where: { phone_number: req.params.phone } })
        .then(results => res.json(results))
        .catch(err => console.log(err));
    });

    // Create a new customer
    app.post("/api/customers", this.postCustomerApi);

    // Update a customer
    app.put("/api/customers/:id", function(req, res) {
      // using the isNull function from the Underscore javascript library
      if (!_.isNull(req.body.name)) {
        db.Customer.update(
          { name: req.body.name },
          { where: { id: req.params.id } }
        ).then(function(dbCustomer) {
          if (req.body.address) {
            db.Customer.update(
              { address: req.body.address },
              { where: { id: req.params.id } }
            ).then(function(dbCustomer) {
              if (req.body.phone_number) {
                db.Customer.update(
                  { phone_number: req.body.phone_number },
                  { where: { id: req.params.id } }
                ).then(function(dbCustomer) {
                  res.json(dbCustomer);
                });
              } else {
                res.json(dbCustomer);
              }
            });
          } else if (req.body.phone_number) {
            db.Customer.update(
              { phone_number: req.body.phone_number },
              { where: { id: req.params.id } }
            ).then(function(dbCustomer) {
              res.json(dbCustomer);
            });
          } else {
            res.json(dbCustomer);
          }
        });
      } else if (req.body.address) {
        db.Customer.update(
          { address: req.body.address },
          { where: { id: req.params.id } }
        ).then(function(dbCustomer) {
          if (req.body.phone_number) {
            db.Customer.update(
              { phone_number: req.body.phone_number },
              { where: { id: req.params.id } }
            ).then(function(dbCustomer) {
              res.json(dbCustomer);
            });
          } else {
            res.json(dbCustomer);
          }
        });
      } else if (req.body.phone_number) {
        db.Customer.update(
          { phone_number: req.body.phone_number },
          { where: { id: req.params.id } }
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

    // Get all sales orders
    app.get("/api/salesorders", function(req, res) {
      db.Order.findAll({}).then(function(dbOrder) {
        res.json(dbOrder);
      });
    });

    // Get a sales order
    app.get("/api/salesorders/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.Order.findAll({ where: { id: req.params.id } }).then(function(
        dbOrders
      ) {
        console.log(dbOrders);
        res.json(dbOrders);
      });
    });

    // Create a new sales order
    app.post("/api/salesorders", this.postOrderApi);

    // Update a sales order
    app.put("/api/salesorders/:id", function(req, res) {
      if (req.body.customer_id) {
        db.Order.update(
          { customer_id: req.body.customer_id },
          { where: { id: req.params.id } }
        ).then(function(dbOrder) {
          if (req.body.description) {
            db.Order.update(
              { description: req.body.description },
              { where: { id: req.params.id } }
            ).then(function(dbOrder) {
              if (req.body.amount) {
                db.Order.update(
                  { amount: req.body.amount },
                  { where: { id: req.params.id } }
                ).then(function(dbOrder) {
                  res.json(dbOrder);
                });
              } else {
                res.json(dbOrder);
              }
            });
          } else if (req.body.amount) {
            db.Order.update(
              { amount: req.body.amount },
              { where: { id: req.params.id } }
            ).then(function(dbOrder) {
              res.json(dbOrder);
            });
          } else {
            res.json(dbOrder);
          }
        });
      } else if (req.body.description) {
        db.Order.update(
          { description: req.body.description },
          { where: { id: req.params.id } }
        ).then(function(dbOrder) {
          if (req.body.amount) {
            db.Order.update(
              { amount: req.body.amount },
              { where: { id: req.params.id } }
            ).then(function(dbOrder) {
              res.json(dbOrder);
            });
          } else {
            res.json(dbOrder);
          }
        });
      } else if (req.body.amount) {
        db.Order.update(
          { amount: req.body.amount },
          { where: { id: req.params.id } }
        ).then(function(dbOrder) {
          res.json(dbOrder);
        });
      }
    });

    // Delete a sales order by id
    app.delete("/api/salesorders/:id", function(req, res) {
      db.Order.destroy({ where: { id: req.params.id } }).then(function(
        dbOrder
      ) {
        res.json(dbOrder);
      });
    });

    // Get all invoices
    app.get("/api/invoices", function(req, res) {
      db.Invoice.findAll({}).then(function(dbInvoice) {
        res.json(dbInvoice);
      });
    });

    // Get an invoice
    app.get("/api/invoices/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.Invoice.findAll({ where: { id: req.params.id } }).then(function(
        dbInvoices
      ) {
        console.log(dbInvoices);
        res.json(dbInvoices[0]);
      });
    });

    // Create a new invoice
    app.post("/api/invoices", this.postInvoiceApi);

    // Update an invoice
    app.put("/api/invoices/:id", function(req, res) {
      if (req.body.salesorder_id) {
        db.Invoice.update(
          { salesorder_id: req.body.salesorder_id },
          { where: { id: req.params.id } }
        ).then(function(dbInvoice) {
          if (req.body.discount) {
            // if we are updating the discount, we have to reevaluate whether the invoice has been paid in full
            db.Invoice.findAll({ where: { id: req.params.id } }).then(function(
              dbInvoices
            ) {
              let isPaid;
              if (
                dbInvoices[0].total_amount -
                  req.body.discount -
                  dbInvoices[0].amount_paid >
                0
              ) {
                isPaid = false;
              } else {
                isPaid = true;
              }
              db.Invoice.update(
                { discount: req.body.discount, paid: isPaid },
                { where: { id: req.params.id } }
              ).then(function(dbInvoice) {
                res.json(dbInvoice);
              });
            });
          } else {
            res.json(dbInvoice);
          }
        });
      } else if (req.body.discount) {
        db.Invoice.findAll({ where: { id: req.params.id } }).then(function(
          dbInvoices
        ) {
          // if we are updating the discount, we have to reevaluate whether the invoice has been paid in full
          let isPaid;
          if (
            dbInvoices[0].total_amount -
              req.body.discount -
              dbInvoices[0].amount_paid >
            0
          ) {
            isPaid = false;
          } else {
            isPaid = true;
          }
          db.Invoice.update(
            { discount: req.body.discount, paid: isPaid },
            { where: { id: req.params.id } }
          ).then(function(dbInvoice) {
            res.json(dbInvoice);
          });
        });
      }
    });

    // Delete an invoice by id
    app.delete("/api/invoices/:id", function(req, res) {
      db.Invoice.destroy({ where: { id: req.params.id } }).then(function(
        dbInvoice
      ) {
        res.json(dbInvoice);
      });
    });

    // Get all payments
    app.get("/api/payments", function(req, res) {
      db.Payment.findAll({}).then(function(dbPayment) {
        res.json(dbPayment);
      });
    });

    // Get a payment
    app.get("/api/payments/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.Payment.findAll({ where: { id: req.params.id } }).then(function(
        dbPayments
      ) {
        console.log(dbPayments);
        res.json(dbPayments[0]);
      });
    });

    // Create a new payment
    app.post("/api/payments", this.postPaymentApi);

    // Update a payment
    app.put("/api/payments/:id", function(req, res) {
      if (req.body.invoice_id) {
        db.Payment.findAll({ where: { id: req.params.id } }).then(function(
          dbPayment
        ) {
          // if we are changing the invoice to which a payment is applied, we have to recalculate how much has been paid on the original invoice as well as the new one, as well as determine whether they both have been paid in full
          const oldInvoiceId = dbPayment[0].invoice_id;
          db.Payment.update(
            { invoice_id: req.body.invoice_id },
            { where: { id: req.params.id } }
          ).then(function(dbPayment) {
            db.Payment.findAll({ where: { invoice_id: oldInvoiceId } }).then(
              function(dbPayments) {
                let totalPaid = 0;
                for (let i = 0; i < dbPayments.length; i++) {
                  const amount = parseFloat(dbPayments[i].amount);
                  totalPaid = totalPaid + amount;
                }
                db.Invoice.findAll({ where: { id: oldInvoiceId } }).then(
                  function(dbInvoices) {
                    let isPaid;
                    if (
                      dbInvoices[0].total_amount -
                        dbInvoices[0].discount -
                        totalPaid >
                      0
                    ) {
                      isPaid = false;
                    } else {
                      isPaid = true;
                    }
                    console.log(isPaid);
                    db.Invoice.update(
                      { amount_paid: totalPaid, paid: isPaid },
                      { where: { id: oldInvoiceId } }
                    ).then(function(dbInvoice) {
                      db.Payment.findAll({
                        where: { invoice_id: req.body.invoice_id }
                      }).then(function(dbPayments) {
                        let totalPaid = 0;
                        for (let i = 0; i < dbPayments.length; i++) {
                          const amount = parseFloat(dbPayments[i].amount);
                          totalPaid = totalPaid + amount;
                        }
                        db.Invoice.findAll({
                          where: { id: req.body.invoice_id }
                        }).then(function(dbInvoices) {
                          let isPaid;
                          if (
                            dbInvoices[0].total_amount -
                              dbInvoices[0].discount -
                              totalPaid >
                            0
                          ) {
                            isPaid = false;
                          } else {
                            isPaid = true;
                          }
                          db.Invoice.update(
                            { amount_paid: totalPaid, paid: isPaid },
                            { where: { id: req.body.invoice_id } }
                          ).then(function(dbInvoice) {
                            if (req.body.amount) {
                              // if changing the amount of a payment, reevaluate how much has been paid toward that invoice and whether it has been paid in full
                              db.Payment.update(
                                { amount: req.body.amount },
                                { where: { id: req.params.id } }
                              ).then(function(dbPayment) {
                                db.Payment.findAll({
                                  where: { id: req.params.id }
                                }).then(function(dbPayment) {
                                  const invoiceId = dbPayment[0].invoice_id;
                                  db.Payment.findAll({
                                    where: { invoice_id: invoiceId }
                                  }).then(function(dbPayments) {
                                    let totalPaid = 0;
                                    for (
                                      let i = 0;
                                      i < dbPayments.length;
                                      i++
                                    ) {
                                      const amount = parseFloat(
                                        dbPayments[i].amount
                                      );
                                      totalPaid = totalPaid + amount;
                                    }
                                    db.Invoice.findAll({
                                      where: { id: invoiceId }
                                    }).then(function(dbInvoices) {
                                      let isPaid;
                                      if (
                                        dbInvoices[0].total_amount -
                                          dbInvoices[0].discount -
                                          totalPaid >
                                        0
                                      ) {
                                        isPaid = false;
                                      } else {
                                        isPaid = true;
                                      }
                                      db.Invoice.update(
                                        {
                                          amount_paid: totalPaid,
                                          paid: isPaid
                                        },
                                        { where: { id: invoiceId } }
                                      ).then(function(dbInvoice) {
                                        res.json(dbPayment);
                                      });
                                    });
                                  });
                                });
                              });
                            } else {
                              res.json(dbPayment);
                            }
                          });
                        });
                      });
                    });
                  }
                );
              }
            );
          });
        });
      } else if (req.body.amount) {
        // if changing the amount of a payment, reevaluate how much has been paid toward that invoice and whether it has been paid in full
        db.Payment.update(
          { amount: req.body.amount },
          { where: { id: req.params.id } }
        ).then(function(dbPayment) {
          db.Payment.findAll({ where: { id: req.params.id } }).then(function(
            dbPayment
          ) {
            const invoiceId = dbPayment[0].invoice_id;
            db.Payment.findAll({ where: { invoice_id: invoiceId } }).then(
              function(dbPayments) {
                let totalPaid = 0;
                for (let i = 0; i < dbPayments.length; i++) {
                  const amount = parseFloat(dbPayments[i].amount);
                  totalPaid = totalPaid + amount;
                }
                db.Invoice.findAll({ where: { id: invoiceId } }).then(function(
                  dbInvoices
                ) {
                  let isPaid;
                  if (
                    dbInvoices[0].total_amount -
                      dbInvoices[0].discount -
                      totalPaid >
                    0
                  ) {
                    isPaid = false;
                  } else {
                    isPaid = true;
                  }
                  db.Invoice.update(
                    { amount_paid: totalPaid, paid: isPaid },
                    { where: { id: invoiceId } }
                  ).then(function(dbInvoice) {
                    res.json(dbPayment);
                  });
                });
              }
            );
          });
        });
      }
    });

    // Delete a payment by id
    app.delete("/api/payments/:id", function(req, res) {
      db.Payment.findAll({ where: { id: req.params.id } }).then(function(
        dbPayment
      ) {
        // after deleting a payment, we have to reevaluate how much has been paid toward an invoice and whether it has been paid in full
        const invoiceId = dbPayment[0].invoice_id;
        db.Payment.destroy({ where: { id: req.params.id } }).then(function(
          dbPayment
        ) {
          db.Payment.findAll({ where: { invoice_id: invoiceId } }).then(
            function(dbPayments) {
              let totalPaid = 0;
              for (let i = 0; i < dbPayments.length; i++) {
                const amount = parseFloat(dbPayments[i].amount);
                totalPaid = totalPaid + amount;
              }
              db.Invoice.findAll({ where: { id: invoiceId } }).then(function(
                dbInvoices
              ) {
                let isPaid;
                if (
                  dbInvoices[0].total_amount - req.body.discount - totalPaid >
                  0
                ) {
                  isPaid = false;
                } else {
                  isPaid = true;
                }
                db.Invoice.update(
                  { amount_paid: totalPaid, paid: isPaid },
                  { where: { id: invoiceId } }
                ).then(function(dbInvoice) {
                  res.json(dbPayment);
                });
              });
            }
          );
        });
      });
    });
  }
};
