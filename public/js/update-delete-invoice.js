const subReportSectionContainer = document.getElementById("sub-report-section");
const orderSubReportContainer = document.getElementById("order-sub-report");
const paymentSubReportContainer = document.getElementById("payment-sub-report");

function renderPayments(data, paymentSubReportContainer) {
  // shows the result header which was hidden on page load
  const innerHTML = data.map(function(payment) {
    return `<div class="row sub-report-text sub-report-row py-1">
                  <div class="col-2"> ${payment.id} </div>
                  <div class="col-2"> ${payment.invoice_id} </div>
                  <div class="col-6"> ${payment.createdAt} </div>
                  <div class="col-2 text-right"> ${payment.amount} </div>
              </div>`;
  });
  paymentSubReportContainer.innerHTML = innerHTML.join("\n");
}

function renderSalesOrder(order, orderSubReportContainer) {
  // show sub report section
  subReportSectionContainer.setAttribute("class", "container-fluid");
  // show result the found sales order
  orderSubReportContainer.innerHTML = `<div class="col-3">${order.id}</div>
                                         <div class="col-7"> ${order.description} </div>
                                         <div class="col-2 text-right"> ${order.amount}</div>`;
}
