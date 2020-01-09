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

describe("API - ROUTES", () => {
  let req = {};
  let res = {};
  beforeEach(() => {
    req = {};
    res = {};
  });
  it("should add an Order", async () => {
    req = {
      body: {
        customer_id: 0,
        description: "description",
        amount: 10.2
      }
    };

    res = {
      json: jest.fn()
    };

    await apiRoutes.postOrderApi(req, res);
    expect(res.json.mock.calls[0][0].customer_id).toBe(req.body.customer_id);
  });
});
