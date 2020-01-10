// get session storage of invoice id
// const fs = require("fs");
const invoiceID = sessionStorage.getItem("invoiceId");
const orderSubReportContainer = document.getElementById("order-sub-report");
const paymentSubrptContainer = document.getElementById("payment-sub-report");
// variables for invoice footer/summary
let totalInvoiceAmt;
let discount;
let totalPaidAmt = 0;

// show invoice number
document.getElementById(
  "invoice-number"
).innerHTML = `INVOICE No. ${invoiceID}`;
// # show sub reports 'sales order'
// ## get order id of the invoice
axios.get(`/api/invoices/${invoiceID}`).then(invoice => {
  console.log(invoice);
  console.log("order id: ", invoice.data.salesorder_id);
  // INVOICE FOOTER
  discount = invoice.data.discount;

  console.log("discount: ", discount);
  // .... get order info
  axios.get(`api/salesorders/${invoice.data.salesorder_id}`).then(order => {
    // render order info to html page
    renderSalesOrder(order.data[0], orderSubReportContainer);

    // INVOICE FOOTER
    totalInvoiceAmt = order.data[0].amount;

    console.log("Total Invoice Amt: ", totalInvoiceAmt);

    // # Show sub report 'payments'
    //  - get payment IDs of the invoice
    //  - render payment info
    axios.get("/api/payments").then(res => {
      const results = [];
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].invoice_id === parseInt(invoiceID)) {
          results.push(res.data[i]);
          totalPaidAmt = totalPaidAmt + parseFloat(res.data[i].amount);
        }
      }
      console.log(results);
      console.log("total paid: ", totalPaidAmt);
      renderPaymentSubRpt(results, paymentSubrptContainer);

      // INVOICE FOOTER/SUMMARY
      showInvoiceFooter();
      async function showInvoiceFooter() {
        const invoiceTotal = document.getElementById("invoice-total");
        const paidAmount = document.getElementById("paid-amount");
        const discountEl = document.getElementById("discounted-amount");
        const balanceDue = document.getElementById("balance-due");

        const totalInvoice = await totalInvoiceAmt;
        const discountAmt = await invoice.data.discount;
        const totalPaid = await totalPaidAmt;

        // show footer
        invoiceTotal.innerHTML = "$" + parseFloat(totalInvoice);
        paidAmount.innerHTML = "$" + totalPaid;
        discountEl.innerHTML = "$" + parseFloat(discountAmt);
        balanceDue.innerHTML =
          "$" + (totalInvoiceAmt - totalPaid - discountAmt);
      }

      // PRINT PDF
      document.getElementById("pdf-btn").addEventListener("click", function() {
        // convertToPDF();
        // open in new tap;
        alert("to print PDF");
      });
      // function convertToPDF(htmlStr, pdfFileName) {
      //     convertFactory = require('electron-html-to');

      //     const conversion = convertFactory({
      //         converterPath: convertFactory.converters.PDF
      //     });

      //     conversion({ html: htmlStr  }, function (err, result) {
      //         if (err) {
      //             return console.error(err);
      //         }

      //         console.log(result.numberOfPages);
      //         console.log(result.logs);
      //         result.stream.pipe(fs.createWriteStream("../Assets/pdf-files/" + pdfFileName + ".pdf"));
      //         conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
      //     });
      // }
    });
  });
});

function renderSalesOrder(order, orderSubReportContainer) {
  // show result the found sales order
  orderSubReportContainer.innerHTML = `<div class="col-2 text-center">${order.id}</div>
                                         <div class="col-8"> ${order.description} </div>
                                         <div class="col-2 text-right"> ${order.amount}</div>`;
}

function renderPaymentSubRpt(data, paymentSubrptContainer) {
  const innerHTML = data.map(function(payment) {
    return `<div class="row sub-report-row sub-report-text py-1">
                        <div class="col-2 col-sm-2 col-md-2 text-center">${payment.invoice_id}</div>
                        <div class="col-4">${payment.createdAt}</div>
                        <div class="col-6 text-right"> ${payment.amount} </div>
                  </div>`;
  });
  paymentSubrptContainer.innerHTML = innerHTML.join("\n");
}
