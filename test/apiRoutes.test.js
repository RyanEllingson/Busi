require("./dbInit");
const apiRoutes = require("../routes/apiRoutes");

describe("API - ROUTES", () => {
  let req = {};
  let res = {};
  beforeEach(() => {
    req = {};
    res = {};
  });
  it("should add a customer", async () => {
    req = {
      body: {
        name: "name"
      }
    };

    res = {
      json: jest.fn()
    };

    await apiRoutes.postCustomerApi(req, res);
    expect(res.json.mock.calls[0][0].name).toBe(req.body.name);
  });
});
