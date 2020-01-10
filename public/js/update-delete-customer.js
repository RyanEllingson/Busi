// get session storage from the page search-customer.html
let customerId = sessionStorage.getItem("id");
const accountEl = document.getElementById("account");
const nameEl = document.getElementById("name");
const addressEl = document.getElementById("address");
const phoneEl = document.getElementById("phone");
// get data from db based on the id then show data in the form
axios.get(`/api/customers/${customerId}`).then(res => {
  console.log(res);
  accountEl.value = customerId;
  nameEl.value = res.data[0].name;
  addressEl.value = res.data[0].address;
  phoneEl.value = res.data[0].phone_number;
});

// Update customer
document.getElementById("update-btn").addEventListener("click", function() {
  axios
    .put(`/api/customers/${customerId}`, {
      name: nameEl.value,
      phone_number: phoneEl.value,
      address: addressEl.value
    })
    .then(res =>
      alert(`The customer with ID: ${customerId} is updated successfully!`)
    );
});

// Delete customer
document.getElementById("delete-btn").addEventListener("click", function() {
  // eslint-disable-next-line no-restricted-globals
  const userAnswer = confirm(
    `Are you about to delete the customer with ID: ${customerId}. Are you sure???`
  );
  if (userAnswer === true) {
    axios.delete(`/api/customers/${customerId}`).then(res => {
      alert(`The customer with ID: ${customerId} is deleted successfully!`);
      window.location.href = "./search-customer.html";
    });
  } else {
    // do nothing when user cancelled deletion
  }
});
