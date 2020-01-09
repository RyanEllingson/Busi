const accountEl = document.getElementById("account");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
// const msgRow = document.getElementById("msg-row");
// const salesOrderContainer = document.getElementById("new-customer-container");

// Add click event to the button "Create"
document.getElementById("create-btn").addEventListener("click", function() {
  if (
    accountEl.value === "" ||
    descriptionEl.value === "" ||
    amountEl.value === "" ||
    !parseInt(amountEl.value)
  ) {
    // msgRow.setAttribute("class", "row bg-warning my-3 mx-5 p-2");
    // document.getElementById("msg").innerHTML = "ERROR: Each field must be filled, and phone number must be number with max length of 10 digits!";
    alert("Every field must be filled. Amount must be number!");
  } else {
    // check if customer Id exists
    axios.get(`/api/customers/${accountEl.value}`).then(res => {
      console.log("length: ", res.data.length);
      if (res.data.length === 0) {
        alert("Customer account number you entered DOES NOT EXIST!");
        accountEl.focus();
      } else {
        // sends data to server
        axios
          .post("/api/salesorders", {
            customer_id: accountEl.value,
            description: descriptionEl.value,
            amount: amountEl.value
          })
          .then(function(res) {
            console.log(res);
            // showResultHTML(res.data, newCustomerContainer);
            // // clears error message
            // msgRow.setAttribute("class", "d-none");
            // // resets all inputs
            alert("order is created successfully!");
            accountEl.value = "";
            descriptionEl.value = "";
            amountEl.value = "";
            accountEl.focus();
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    });
  }
});
