"use strict";

var chai = require("chai"),
    expect = chai.expect;

var middleWares = require("../index");

describe("Validations", function() {

    beforeEach(function () {

    });

    afterEach(function() {

    });

    describe("Should pass for every it...", function () {
        it("undefined query params", function (done) {
            var req = {};
            middleWares.param_object(req, {}, function(){
                expect(Object.keys(req.getInputObject()).length).to.equal(0);
                done();
            });
        });
        it("one query params", function (done) {
            var req = {params: {a: "a"}};
            middleWares.param_object(req, {}, function(){
                var inputObject = req.getInputObject();
                expect(Object.keys(inputObject).length).to.equal(1);
                expect(inputObject.a).to.equal("a");
                expect(inputObject.b).to.equal(undefined);
                done();
            });
        });
        it("one body", function (done) {
            var req = {body: {a: "a"}};
            middleWares.param_object(req, {}, function(){
                var inputObject = req.getInputObject();
                expect(Object.keys(inputObject).length).to.equal(1);
                expect(inputObject.a).to.equal("a");
                expect(inputObject.b).to.equal(undefined);
                done();
            });
        });
    });
});
