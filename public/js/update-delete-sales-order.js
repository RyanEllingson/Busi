// get session storage from the page search-sales-order.html
let orderId = sessionStorage.getItem("id");
const accountEl = document.getElementById("account");
const orderEl = document.getElementById("order");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
// containers for showing search results
const resultHeaderEl = document.getElementById("result-header");
const resultContainerEl = document.getElementById("result-container");

// get data from db based on the id then show data in the form
axios.get(`/api/salesorders/${orderId}`).then(res => {
  console.log(res);
  orderEl.value = orderId;
  accountEl.value = res.data[0].customer_id;
  descriptionEl.value = res.data[0].description;
  amountEl.value = res.data[0].amount;
});

// Update sales order
document.getElementById("update-btn").addEventListener("click", function() {
  // Do not update db if the new customer_id doesn't exist in the db
  axios.get(`/api/customers/${accountEl.value}`).then(res => {
    console.log("length: ", res.data.length);
    if (res.data.length === 0) {
      alert("Customer account number you entered DOES NOT EXIST!");
      accountEl.focus();
    } else {
      axios
        .put(`/api/salesorders/${orderId}`, {
          customer_id: accountEl.value,
          description: descriptionEl.value,
          amount: amountEl.value
        })
        .then(data => {
          alert(`The sales order is updated successfully!`);
        });
    }
  });
});

// Delete sales order
document.getElementById("delete-btn").addEventListener("click", function() {
  // eslint-disable-next-line no-restricted-globals
  const userAnswer = confirm(
    `Are you about to delete the sales order with ID: ${orderId}. Are you sure???`
  );
  if (userAnswer === true) {
    axios.delete(`/api/salesorders/${orderId}`).then(res => {
      alert(`The customer with ID: ${orderId} is deleted successfully!`);
      window.location.href = "./search-sales-order.html";
    });
  } else {
    // do nothing when user cancelled deletion
  }
});
