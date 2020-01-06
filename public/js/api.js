// The API object contains methods for each kind of request we'll make
export default {
  saveExample: function(example) {
    return fetch("/api/examples", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(example)
    }).then(res => res.json());
  },
  getExamples: function() {
    return fetch("/api/examples").then(res => res.json());
  },
  getExample: function(id) {
    return fetch(`/api/examples/${id}`).then(res => res.json());
  },
  deleteExample: function(id) {
    return fetch("/api/examples/" + id, {
      method: "DELETE"
    }).then(res => res.json);
  }
};
