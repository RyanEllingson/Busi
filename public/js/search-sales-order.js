const searchStrEl = document.getElementById("search-term");
const searchByEl = document.getElementById("search-by");
// containers for showing search results
const resultHeaderEl = document.getElementById("result-header");
const resultContainerEl = document.getElementById("result-container");

// adds click event to the button 'search'
document
  .getElementById("search-btn")
  .addEventListener("click", function(event) {
      console.log("clicked");
    const searchByValue = searchByEl.value;
    if (searchStrEl.value === "") {
      // do thing if search term is blank
    } else {
      switch (searchByValue) {
        case "Order Number":
          axios
            .get(`/api/salesorders/${searchStrEl.value}`)
            .then(res => {
                console.log(res);
                showResultHTML(res.data, resultContainerEl);
            });
          break;
        // default is 'Customer Account Number'
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
    const innerHTML = data.map(function(order) {
      return `<div id=${order.id} class="row sub-report-text sub-report-row py-1 results-js">
                      <div class="col-2">${order.id}</div>
                      <div class="col-2">${order.customer_id}</div>
                      <div class="col-6"> ${order.description} </div>
                      <div class="col-2 text-right"> ${order.amount}</div>
                </div>`;
    });
    resultContainer.innerHTML = innerHTML.join("\n");
    // add click event to each record of results
    const resultEls = document.querySelectorAll(".results-js");
    for (let i = 0; i < resultEls.length; i++) {
      resultEls[i].addEventListener("click", function(event) {
        const id = event.target.parentElement.getAttribute("id");
        sessionStorage.setItem("id", id);
        // console.log(sessionStorage.getItem("id"));
        // window.location.href = "./update-sales-order.html";
      });
    }
  }