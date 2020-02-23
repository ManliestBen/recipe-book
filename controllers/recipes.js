const recipeSearchId = process.env.RECIPE_SEARCH_ID;
const recipeSearchKey = process.env.RECIPE_SEARCH_KEY;
const nutritionalAnalysisId = process.env.NUTRITIONAL_ANALYSIS_ID;
const nutritionalAnalysisKey = process.env.NUTRITIONAL_ANALYSIS_KEY;
const foodDatabaseId = process.env.FOOD_DATABASE_ID;
const foodDatabaseKey = process.env.FOOD_DATABASE_KEY;

const axios = require('axios');
var Recipe = require('../models/recipe');

module.exports = {
    search,
    apiCall
}

function search(req, res) {
    res.render('recipes/search');
}

function apiCall(req, res) {
    let query = req.body.query;
    axios.get(`https://api.edamam.com/search?q=${query}&app_id=${recipeSearchId}&app_key=${recipeSearchKey}&from=0&to=10`)
        .then(response => {
            let searchResults = response.data.hits;
            res.render('recipes/searchresults', {recipes: searchResults})
        })
        .catch(error => {
            console.log(error);
        });
}


