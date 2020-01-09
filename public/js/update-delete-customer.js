// get session storage from the page search-customer.html
let customerId = sessionStorage.getItem("customerId");
const accountEl = document.getElementById("account");
const nameEl = document.getElementById("name");
const addressEl = document.getElementById("address");
const phoneEl = document.getElementById("phone");
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
      phone: phoneEl.value,
      address: addressEl.value
    })
    .then(res => console.log("Updated!"));
});

// Delete customer
document.getElementById("delete-btn").addEventListener("click", function() {
  axios.delete(`/api/customers/${customerId}`).then(res => {
    console.log("Deleted!");
    accountEl.value = "";
    nameEl.value = "";
    addressEl.value = "";
    phoneEl.value = "";
    document.getElementById("update-btn").disabled = true;
    document.getElementById("delete-btn").disabled = true;
  });
});