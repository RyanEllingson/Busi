import API from "/js/api.js";

// Get references to page elements
const exampleTextEl = document.getElementById("example-text");
const exampleDescriptionEl = document.getElementById("example-description");

// refreshExamples gets new examples from the db and repopulates the list
const refreshExample = function() {
  // get the id to query from the url
  const search = window.location.search.substring(1);
  const params = new URLSearchParams(search);
  const id = params.get("id"); // "foo"

  API.getExample(id).then(function(data) {
    exampleTextEl.innerHTML = data.text;
    exampleDescriptionEl.innerHTML = data.description;
  });
};
refreshExample();
