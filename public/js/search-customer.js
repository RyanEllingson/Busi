const searchStrEl = document.getElementById("search-term");
const searchByEl = document.getElementById("search-by");
// containers for showing search results
const resultHeaderEl = document.getElementById("result-header");
const resultContainerEl = document.getElementById("result-container");

// adds click event to the button 'search'
document
  .getElementById("search-btn")
  .addEventListener("click", function(event) {
    const searchByValue = searchByEl.value;
    if (searchStrEl.value === "") {
      // do thing if search term is blank
    } else {
      switch (searchByValue) {
        case "Customer name":
          axios
            .get(`/customers/search-by-name/${searchStrEl.value}`)
            .then(res => showResultHTML(res.data, resultContainerEl));
          break;
        case "Account number":
          axios
            .get(`/api/customers/${searchStrEl.value}`)
            .then(res => showResultHTML(res.data, resultContainerEl));
          break;
        // default is 'Phone number'
        default:
          axios
            .get(`/customers/search-by-phone/${searchStrEl.value}`)
            .then(res => showResultHTML(res.data, resultContainerEl));
      }
    }
  });

// function that renders html with the search results
function showResultHTML(data, resultContainer) {
  // shows the result header which was hidden on page load
  resultHeaderEl.setAttribute("class", "container-fluid");
  const innerHTML = data.map(function(customer) {
    return `<div id=${customer.id} class="row sub-report-text sub-report-row py-1 found-customer-js">
                    <div class="col-2">${customer.id}</div>
                    <div class="col-7">${customer.name}</div>
                    <div class="col-3 text-right"> ${customer.phone_number} </div>
                </div>`;
  });
  resultContainer.innerHTML = innerHTML.join("\n");
  // add click event to each record of results
  const foundCustomerEls = document.querySelectorAll(".found-customer-js");
  for (let i = 0; i < foundCustomerEls.length; i++) {
    foundCustomerEls[i].addEventListener("click", function(event) {
      const customerId = event.target.parentElement.getAttribute("id");
      sessionStorage.setItem("customerId", customerId);
      window.location.href = "./update-customer.html";
    });
  }
}
