const invoiceID = sessionStorage.getItem("id");
console.log(invoiceID);
const orderSubReportContainer = document.getElementById("order-sub-report");
const paymentSubrptContainer = document.getElementById("payment-sub-report");

// variables for invoice footer/summary
let totalInvoiceAmt;
let discount;
let totalPaidAmt = 0;

// show invoice number as heading
document.getElementById("invoice-number").innerHTML =
  "INVOICE No. " + invoiceID;

// render sales order sub report
axios.get(`/api/invoices/${invoiceID}`).then(invoice => {
  console.log(invoice);
  const orderID = invoice.data.salesorder_id;
  console.log(orderID);
  // INVOICE FOOTER
  discount = invoice.data.discount;
  if (discount === null) {
    discount = 0;
  }
  axios.get("/api/salesorders").then(order => {
    console.log("order: ", order);
    // INVOICE FOOTER
    totalInvoiceAmt = order.data[0].amount;
    const results = [];
    for (let i = 0; i < order.data.length; i++) {
      if (order.data[i].id === parseInt(orderID)) {
        results.push(order.data[i]);
        // totalPaidAmt = totalPaidAmt + parseFloat(invoice.data[i].amount);
      }
    }
    console.log(results);
    // console.log("total paid: ", totalPaidAmt);
    renderSalesOrder(results[0], orderSubReportContainer);

    // render payments
    // - get payments from table payment based on invoice ID
    axios.get("/api/payments").then(payment => {
      const results = [];
      console.log(payment);
      for (let i = 0; i < payment.data.length; i++) {
        if (payment.data[i].invoice_id === parseInt(invoiceID)) {
          results.push(payment.data[i]);
          totalPaidAmt = totalPaidAmt + parseFloat(payment.data[i].amount);
        }
      }
      console.log("results: ", results);
      renderPayments(results, paymentSubrptContainer);

      // INVOICE FOOTER/SUMMARY
      showInvoiceFooter();
      async function showInvoiceFooter() {
        const invoiceTotal = document.getElementById("invoice-total");
        const paidAmount = document.getElementById("paid-amount");
        const discountEl = document.getElementById("discounted-amount");
        const balanceDue = document.getElementById("balance-due");

        const totalInvoice = await totalInvoiceAmt;
        const discountAmt = await discount;
        const totalPaid = await totalPaidAmt;

        // show footer
        invoiceTotal.innerHTML = "$" + parseFloat(totalInvoice);
        paidAmount.innerHTML = "$" + totalPaid;
        discountEl.innerHTML = "$" + parseFloat(discountAmt);
        balanceDue.innerHTML =
          "$" + (totalInvoiceAmt - totalPaid - discountAmt);
      }
    });
  });
});

// const subReportSectionContainer = document.getElementById("sub-report-section");
// const orderSubReportContainer = document.getElementById("order-sub-report");
// const paymentSubReportContainer = document.getElementById("payment-sub-report");

function renderPayments(data, paymentSubReportContainer) {
  // shows the result header which was hidden on page load
  const innerHTML = data.map(function(payment) {
    return `<div class="row sub-report-text sub-report-row py-1">
                <div class="col-2 col-sm-2 col-md-2 text-center">${payment.invoice_id}</div>
                <div class="col-4">${payment.createdAt}</div>
                <div class="col-6 text-right"> ${payment.amount} </div>
              </div>`;
  });
  paymentSubReportContainer.innerHTML = innerHTML.join("\n");
}

function renderSalesOrder(order, orderSubReportContainer) {
  // show result the found sales order
  orderSubReportContainer.innerHTML = `<div class="col-2 text-center">${order.id}</div>
                                         <div class="col-8"> ${order.description} </div>
                                         <div class="col-2 text-right"> ${order.amount}</div>`;
}
