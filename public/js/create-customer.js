const nameEl = document.getElementById("name");
const addressEl = document.getElementById("address");
const phoneEl = document.getElementById("phone-number");
const msgRow = document.getElementById("msg-row");
const newCustomerContainer = document.getElementById("new-customer-container");
// Numbers with length of 10 digits
// const phoneno = /^\d{10}$/;
// Numbers of any length
const phoneno = /\d+/g;

// Add click event to the button "Create"
document.getElementById("create-btn").addEventListener("click", function() {
  if (
    !phoneEl.value.match(phoneno) ||
    phoneEl.value.length > 10 ||
    nameEl.value === "" ||
    addressEl.value === ""
  ) {
    msgRow.setAttribute("class", "row bg-warning my-3 mx-5 p-2");
    document.getElementById("msg").innerHTML =
      "ERROR: Each field must be filled, and phone number must be number with max length of 10 digits!";
  } else {
    // sends data to server
    axios
      .post("/api/customers", {
        name: nameEl.value,
        phone_number: phoneEl.value,
        address: addressEl.value
      })
      .then(function(res) {
        console.log(res);
        showResultHTML(res.data, newCustomerContainer);
        // clears error message
        msgRow.setAttribute("class", "d-none");
        // resets all inputs
        nameEl.value = "";
        phoneEl.value = "";
        addressEl.value = "";
        nameEl.focus();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

function showResultHTML(data, resultContainer) {
  resultContainer.setAttribute("class", "container-fluid");
  // ## new row to show newly created customer
  const newCustomerEl = document.createElement("div");
  newCustomerEl.setAttribute(
    "class",
    "row sub-report-text sub-report-row py-1"
  );
  newCustomerEl.innerHTML = `<div class="col-2">${data.id}</div>
     <div class="col-7">${data.name}</div>
     <div class="col-3 text-right"> ${data.phone_number} </div>`;
  resultContainer.appendChild(newCustomerEl);
}
