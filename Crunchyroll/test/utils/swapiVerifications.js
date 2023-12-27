const expect = require('chai').expect
const placeholderResponse = require('./../data/placeHolderResponse.json');

function expect200(status, msg = "Unexpected status code") {
    expect(status).to.be.equal(200, msg);
}

function expectDataCountToEqual(count = 0, data, msg = "Data count value does not match expected value") {
    expect(data.count).to.be.equal(count, msg);
}

function expectDataCountToBeAbove(count = 0, data, msg = "Data count value is not above expected value") {
    expect(data.count).to.be.above(count, msg)
}

function expectResultsToEqual(result = placeholderResponse, data, msg = "Expected and actual response values do not match") {
    expect(data.results).to.be.deep.equal(result, msg)
}

// Try catch block because empty doesn't offer a built in error message parameter
function expectAtLeastOneNameInResults(data, msg = "There are no names in the results") {
    try {
        expect(data.results).to.have.nested.property("0.name").not.empty
    } catch (error) {
        throw new Error(msg); // Throw an error with the provided message
    }
}

// Try catch block because empty doesn't offer a built in error message parameter
function expectAtLeastOneTitleInResults(data, msg = "There are no titles in the results") {
    try {
        expect(data.results).to.have.nested.property("0.title").not.empty
    } catch (error) {
        throw new Error(msg); // Throw an error with the provided message
    }
}

// Try catch block because empty doesn't offer a built in error message parameter
function expectResultsToNotBeEmpty(data, msg = "The results are empty") {
    try {
        expect(data.results).to.not.be.empty;
    } catch (error) {
        throw new Error(msg); // Throw an error with the provided message
    }
}

module.exports = { expect200, expectDataCountToEqual, expectDataCountToBeAbove, expectResultsToEqual, expectAtLeastOneNameInResults, expectAtLeastOneTitleInResults, expectResultsToNotBeEmpty  }