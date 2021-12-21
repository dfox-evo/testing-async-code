const chai = require("chai");
const { useFakeXMLHttpRequest } = require("sinon");
const sinon = require("sinon");
const expect = chai.expect;
const test = "hello world";
const test1 = "another test";
const test2 = "another test";

const indexPage = require('/Users/dfox/Projects/testing-async-code/tests/controllers/app.controller.js');

const user = {
  addUser: (name) => {
    this.name = name;
  }
};

describe("AppController", function() {

  describe('getIndexPage', function() {
    it("should send hey when a user is logged in", function () {

      let user = {
        isLoggedIn: function() {}
      }

      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true);

      let req = {
        user: user
      }

      let res = {
        send: function() {}
      }

      const mock = sinon.mock(res);
      mock.expects("send").once().withExactArgs("Hey");

      indexPage.getIndexPage(req, res);
  
      console.log(res.send);
      
      mock.verify();

      expect(isLoggedInStub.calledOnce).to.be.true;
    })

    it('should send something else when user is NOT logged in', function() {
      let user = {
        isLoggedIn: function(){}
      }

      const isLoggedInStub = sinon.stub(user, 'isLoggedIn').returns(false);

      let req = {
        user: user
      }

      let res = {
        send: sinon.spy()
      }

      indexPage.getIndexPage(req, res);

      expect(res.send.calledOnce).to.be.true;
      expect(res.send.firstCall.args[0]).to.equal("Oops. You need to log in to access this page");
      expect(isLoggedInStub.calledOnce).to.be.true;
    })
  })

  describe("User", function() {
    describe("addUser", function() {
      it("should add a user", function() {
        sinon.spy(user, "addUser");
        user.addUser('John Doe');

        console.log(user.addUser);
        expect(user.addUser.calledOnce).to.be.true;
      })
    })
  })
})

