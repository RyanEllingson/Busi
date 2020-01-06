var db = require("../models");

module.exports = {
  postExampleApi: async function(req, res) {
    const dbExample = await db.Example.create(req.body);
    res.json(dbExample);
  },
  api: function(app) {
    // Get all examples
    app.get("/api/examples", function(req, res) {
      db.Example.findAll({}).then(function(dbExamples) {
        res.json(dbExamples);
      });
    });

    // Get an example
    app.get("/api/examples/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.Example.findAll({ where: { id: req.params.id } }).then(function(
        dbExamples
      ) {
        console.log(dbExamples);
        res.json(dbExamples[0]);
      });
    });

    // Create a new example
    app.post("/api/examples", this.postExampleApi);

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function(
        dbExample
      ) {
        res.json(dbExample);
      });
    });
  }
};
