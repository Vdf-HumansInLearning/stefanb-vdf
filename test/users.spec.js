const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
let api = require("../app");

chai.use(chaiHttp);

describe("Validate get for users", function () {
  it("Get all users", (done) => {
    chai
      .request(api)
      .get("/users")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Get user by id", (done) => {
    chai
      .request(api)
      .get("/users/2")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(
          "id",
          "name",
          "username",
          "email",
          "password",
          "address",
          "phone",
          "website",
          "company"
        );
        done();
      });
  });
});
