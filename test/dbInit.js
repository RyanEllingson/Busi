var db = require("../models");

beforeAll(async done => {
  await db.sequelize.sync({ force: true });
  done();
});
afterAll(() => {
  db.sequelize.close();
});
