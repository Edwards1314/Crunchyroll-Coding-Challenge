const addContext = require('mochawesome/addContext');
const verify = require('./utils/swapiVerifications')
const call = require('./utils/swapiCalls')
// Constants
const aNewHope = require('./utils/constants').A_NEW_HOPE
const lukeSkywalker = require('./utils/constants').LUKE_SKYWALKER
const fifteeenSeconds = require('./utils/constants').FIFTEEN_SECONDS
// Expected Responses
const lukeResponse = require('./data/lukeResponse.json')
const aNewHopeResponse = require('./data/aNewHopeResponse.json');
// Report Variables
let responseBody
let promise

// Test Suite
describe('Star Wars API Tests', function () {
    // This timeout increase is to make sure each test can run successfully and then report
    // I was running into issues with timeouts, but that could have been because of my poor network connection
    this.timeout(fifteeenSeconds)

    // Test Case 1: Retrieve a list of all Star Wars characters
    it('should retrieve a list of all Star Wars characters', function () {
        promise = call.getAllCharacters()
            .then(response => {
                responseBody = response
                verify.expect200(response.status);
                verify.expectResultsToNotBeEmpty(response.data)
                verify.expectDataCountToBeAbove(0, response.data)
                // Spot checking the name of the first object in the results to make sure it's not empty
                verify.expectAtLeastOneNameInResults(response.data)
            })
            .catch(err => {
                // Handle errors
                console.error('Error with getAllCharacters function', err);
            });
    });

    // Test Case 2: Retrieve details for a specific Star Wars character
    it('should retrieve details for a specific Star Wars character', function () {
        promise = call.getCharacter(lukeSkywalker)
            .then(response => {
                responseBody = response
                verify.expect200(response.status);
                verify.expectDataCountToEqual(1, response.data)
                verify.expectResultsToEqual(lukeResponse, response.data)
            })
            .catch(err => {
                // Handle errors
                console.error('Error with getCharacter function', err);
            });
    });

    // Test Case 3: Retrieve a list of all Star Wars films
    it('should retrieve a list of all Star Wars films', function () {
        promise = call.getAllFilms()
            .then(response => {
                responseBody = response
                verify.expect200(response.status);
                verify.expectDataCountToBeAbove(1, response.data)
                // Spot checking the title of the first object in the results to make sure it's not empty
                verify.expectAtLeastOneTitleInResults(response.data)
            })
            .catch(err => {
                // Handle errors
                console.error('Error with getAllFilms function', err);
            });
    });

    // Test Case 4: Retrieve details for a specific Star Wars film
    it('should retrieve details for a specific Star Wars film', function () {
        promise = call.getFilm(aNewHope)
            .then(response => {
                responseBody = response
                verify.expect200(response.status);
                verify.expectResultsToEqual(aNewHopeResponse, response.data)
            })
            .catch(err => {
                // Handle errors
                console.error('Error with getAllFilms function', err);
            });
        
    });

    afterEach(async function() {
        // Wait for the current promise to resolve before using responseBody in afterEach
        await promise;
        addContext(this, {
            title: "Response Body",
            value: responseBody
        });
    });
});

// Run the tests with "npm run test"