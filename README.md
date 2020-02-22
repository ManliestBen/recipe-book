# Recipe Book
### The purpose of this application is to demonstrate full CRUD in a MEN-stack application, providing a step-by-step guide for those who want to code along and get some repetitions coding such applications.
### <br>
### Step 1:  Inside of the parent directory that will hold the application, run the express generator.  Be sure to use -e to indicate we'll be using ejs as the template default.
```
express -e recipe-book
```
### <br>
### Step 2:  Rename app.js --> server.js:
```
mv app.js server.js
```
### ...don't forget to adjust the www file in /bin:
```js
// var app = require('../app');
// changes to:
var app = require('../server');
```
### <br>
### Step 3:  Install and require all the packages we'll be using via npm:
```
npm i method-override dotenv mongoose axios
```
### method-override will be used for writing routes for delete/put appropriately in the controllers, dotenv will be used to safely store API keys in a .env file, mongoose will be used for interacting with the MongoDB database, and axios will be used to send requests to the Edamam API.
### <br>
### Step 4:  Create additional directories for the models, controllers, and recipe views, then create the appropriate files within them:
```
mkdir models controllers views/recipes
touch models/recipe.js controllers/recipes.js views/recipes/index.ejs views/recipes/show.ejs views/recipes/search.ejs
```
### <br>
### Step 5:  Require and configure method-override and dotenv in server.js:
```js
// Near the top:
var methodOverride = require('method-override');
require('dotenv').config();
// In the middleware:
app.use(methodOverride('_method'));
```
### ...then create the .env file and put each of the Edamam API keys inside to keep them secure.  With the intention of expanding the application further, store each of 3 sets of ID/Key pairs so they're all accessible without needing to visit the Edamam site to get them later:
```
touch .env
```
### 
```
RECIPE_SEARCH_ID=xxxxxxxx
RECIPE_SEARCH_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NUTRITIONAL_ANALYSIS_ID=xxxxxxxx
NUTRITIONAL_ANALYSIS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FOOD_DATABASE_ID=xxxxxxxx
FOOD_DATABASE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
### Be sure not to use any punctuation when inputting your keys, as shown above.
### Create variables in the controller for use later:
```js
const recipeSearchId = process.env.RECIPE_SEARCH_ID;
const recipeSearchKey = process.env.RECIPE_SEARCH_KEY;
const nutritionalAnalysisId = process.env.NUTRITIONAL_ANALYSIS_ID;
const nutritionalAnalysisKey = process.env.NUTRITIONAL_ANALYSIS_KEY;
const foodDatabaseId = process.env.FOOD_DATABASE_ID;
const foodDatabaseKey = process.env.FOOD_DATABASE_KEY;
```

