const axios = require('axios');
const swapiUrl = require('./constants').SWAPI_URL


async function getAllCharacters() {
    try {
        const response = await axios.get(`${swapiUrl}/people/`);
        return response
      } catch (error) {
        console.error('Error fetching all characters data from SWAPI:', error);
        throw error;
      }
}

async function getCharacter(characterName) {
    try {
        const response = await axios.get(`${swapiUrl}/people/?search=${characterName}`);
        return response
    } catch (error) {
        console.error(`Error fetching ${characterName} data from SWAPI:`, error);
        throw error;
    }
}

async function getAllFilms() {
    try {
        const response = await axios.get(`${swapiUrl}/films`);
        return response
    } catch (error) {
        console.error('Error fetching all films data from SWAPI:', error);
        throw error;
    }                       
}

async function getFilm(filmName) {
    try {
        const response = await axios.get(`${swapiUrl}/films/?search=${filmName}`);
        return response
    } catch (error) {
        console.error(`Error fetching ${filmName} data from SWAPI:`, error);
        throw error;
    } 
}

module.exports = { getAllCharacters, getCharacter, getAllFilms, getFilm}