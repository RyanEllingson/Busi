var db = require("../models");

module.exports = {
  postCustomerApi: async function(req, res) {
    const dbCustomer = await db.Customer.create(req.body);
    res.json(dbCustomer);
  },
  postOrderApi: async function(req, res) {
    const dbOrder = await db.Order.create(req.body);
    res.json(dbOrder);
  },
  postInvoiceApi: async function(req, res) {
    const dbInvoice = await db.Invoice.create(req.body);
    const salesorderId = dbInvoice.dataValues.salesorder_id;
    db.Order.findAll({ where: { id: salesorderId } }).then(function(dbOrders) {
      const amount = dbOrders[0].amount;
      console.log(dbOrders);
      db.Invoice.update(
        { total_amount: amount },
        { where: { id: dbInvoice.dataValues.id } }
      ).then(function(dbInvoice) {
        res.json(dbInvoice);
      });
    });
  },
  postPaymentApi: async function(req, res) {
    const dbPayment = await db.Payment.create(req.body);
    const invoiceId = dbPayment.invoice_id;
    db.Invoice.findAll({ where: { id: invoiceId } }).then(function(dbInvoices) {
      let paidAmount = dbInvoices[0].amount_paid;
      paidAmount = paidAmount + dbPayment.amount;
      let isPaid;
      if (
        dbInvoices[0].total_amount -
          dbInvoices[0].discount -
          dbInvoices[0].amount_paid >
        0
      ) {
        isPaid = false;
      } else {
        isPaid = true;
      }
      db.Invoice.update(
        { amount_paid: paidAmount, paid: isPaid },
        { where: { id: invoiceId } }
      ).then(function(dbInvoice) {
        res.json(dbPayment);
      });
    });
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
    app.post("/api/customers", this.postCustomerApi);

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
        });
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
        res.json(dbOrders[0]);
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

    // Create a new invoice
    // app.post("/api/invoices", this.postInvoiceApi);

    app.post("/api/payments", this.postPaymentApi);

    // Create a new payment
    app.post("/api/payments", function(request) {
      const invoiceId = request.invoice_id;
      db.Invoice.findAll({ where: { id: invoiceId } }).then(function(
        dbInvoices
      ) {
        let paidAmount = dbInvoices[0].amount_paid;
        paidAmount = paidAmount + request.amount;
        let isPaid;
        if (
          dbInvoices[0].total_amount -
            request.body.discount -
            dbInvoices[0].amount_paid >
          0
        ) {
          isPaid = false;
        } else {
          isPaid = true;
        }
        db.Invoice.update(
          { amount_paid: paidAmount, paid: isPaid },
          { where: { id: invoiceId } }
        ).then(function(dbInvoice) {
          const paymentObj = {
            invoice_id: invoiceId,
            amount: request.amount
          };
          this.postPaymentApi(paymentObj);
        });
      });
    });

    // Update a payment
    app.put("/api/payments/:id", function(req, res) {
      if (req.body.invoice_id) {
        db.Payment.update(
          { invoice_id: req.body.invoice_id },
          { where: { id: req.params.id } }
        ).then(function(dbPayment) {
          if (req.body.amount) {
            db.Payment.update(
              { amount: req.body.amount },
              { where: { id: req.params.id } }
            ).then(function(dbPayment) {
              db.Payment.findAll({ where: { id: req.params.id } }).then(
                function(dbPayments) {
                  const invoiceId = dbPayments[0].invoice_id;
                  db.Payment.findAll({ where: { invoice_id: invoiceId } }).then(
                    function(dbPayments) {
                      let totalPaid;
                      for (let i = 0; i < dbPayments.length; i++) {
                        totalPaid = totalPaid + dbPayments[0].amount;
                      }
                      db.Invoice.findAll({ where: { id: invoiceId } }).then(
                        function(dbInvoices) {
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
                            { amount_paid: totalPaid, paid: isPaid },
                            { where: { id: invoiceId } }
                          ).then(function(dbInvoice) {
                            res.json(dbPayment);
                          });
                        }
                      );
                    }
                  );
                }
              );
            });
          } else {
            res.json(dbPayment);
          }
        });
      } else if (req.body.amount) {
        db.Payment.update(
          { amount: req.body.amount },
          { where: { id: req.params.id } }
        ).then(function(dbPayment) {
          db.Payment.findAll({ where: { id: req.params.id } }).then(function(
            dbPayments
          ) {
            const invoiceId = dbPayments[0].invoice_id;
            db.Payment.findAll({ where: { invoice_id: invoiceId } }).then(
              function(dbPayments) {
                let totalPaid;
                for (let i = 0; i < dbPayments.length; i++) {
                  totalPaid = totalPaid + dbPayments[0].amount;
                }
                db.Invoice.findAll({ where: { id: invoiceId } }).then(function(
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
        dbPayments
      ) {
        const invoiceId = dbPayments[0].invoice_id;
        db.Payment.destroy({ where: { id: req.params.id } }).then(function(
          dbPayment
        ) {
          db.Payment.findAll({ where: { invoice_id: invoiceId } }).then(
            function(dbPayments) {
              let totalPaid;
              for (let i = 0; i < dbPayments.length; i++) {
                totalPaid = totalPaid + dbPayments[0].amount;
              }
              db.Invoice.findAll({ where: { id: invoiceId } }).then(function(
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
