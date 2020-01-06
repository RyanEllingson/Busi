require("./dbInit");
const apiRoutes = require("../routes/apiRoutes");

describe("API - ROUTES", () => {
  let req = {};
  let res = {};
  beforeEach(() => {
    req = {};
    res = {};
  });
  it("should add an example", async () => {
    req = {
      body: {
        text: "text",
        description: "description"
      }
    };

    res = {
      json: jest.fn()
    };

    await apiRoutes.postExampleApi(req, res);
    expect(res.json.mock.calls[0][0].text).toBe(req.body.text);
    expect(res.json.mock.calls[0][0].description).toBe(req.body.description);
  });
});
