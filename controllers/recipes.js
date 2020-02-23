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
    apiCall,
    addRecipe,
    index,
    showRecipe,
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

function addRecipe(req, res) {
    let edamam_id = req.body.edamam_id;
    axios.get(`https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${edamam_id}&app_id=${recipeSearchId}&app_key=${recipeSearchKey}`)
    .then(response => {
        req.body.recipeDetails = response.data[0];
        req.body.recipeName = response.data[0].label;
        console.log(req.body)
        var recipe = new Recipe(req.body);
        recipe.save(function(err) {
            if (err) return console.log(err);
            // if (err) return res.render('recipes/search');
        })
        console.log('Added recipe to database: ' + recipe);
        res.redirect('/recipes/search')
    })
    .catch(error => {
        console.log(error);
    });
}

function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/index', {recipes: recipes});
        }
    });
}

function showRecipe(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/show', {recipe: recipe})
        }
    });
}
