const recipeSearchId = process.env.RECIPE_SEARCH_ID;
const recipeSearchKey = process.env.RECIPE_SEARCH_KEY;
const nutritionalAnalysisId = process.env.NUTRITIONAL_ANALYSIS_ID;
const nutritionalAnalysisKey = process.env.NUTRITIONAL_ANALYSIS_KEY;
const foodDatabaseId = process.env.FOOD_DATABASE_ID;
const foodDatabaseKey = process.env.FOOD_DATABASE_KEY;

var Recipe = require('../models/recipe');

module.exports = {
    search,
}

function search(req, res) {
    res.render('recipes/search');
}