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
mkdir models controllers views/recipes config
touch models/recipe.js controllers/recipes.js views/recipes/index.ejs views/recipes/show.ejs views/recipes/search.ejs config/database.js
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
### <br>
### Step 6:  Configure the database connection in the server and configure the connection in the database file:
### In the server file, require the database:
```js
require('./config/database');
```
### In the database file, configure the connection to your local MongoDB database:
```js
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipebook',
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

var db = mongoose.connection;
 
db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
```
### <br>
### Step 7:  Define a model in models/recipe.js:
### Before defining a model, examine the data coming back in the response by using an application like Postman to make a GET request.  Searching for 'chicken' yields the following object:
```JSON
{   // This shows the query specifics, specified in the GET request:
  "q": "chicken",
  "from": 0,
  "to": 20,
  "more": true,
  "count": 168103,
  "hits": [
    // This is the start of the first recipe returned:
    {
      "recipe": {
        "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b8e5b838ad6cfd9576b30b6",
        "label": "Chicken Vesuvio",
        "image": "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
        "source": "Serious Eats",
        "url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
        "shareAs": "http://www.edamam.com/recipe/chicken-vesuvio-b79327d05b8e5b838ad6cfd9576b30b6/chicken",
        "yield": 4.0,
        "dietLabels": [
          "Low-Carb"
        ],
        "healthLabels": [
          "Sugar-Conscious",
          "Peanut-Free",
          "Tree-Nut-Free"
        ],
        "cautions": [
          "Sulfites"
        ],
        "ingredientLines": [
          "1/2 cup olive oil",
          "5 cloves garlic, peeled",
          "2 large russet potatoes, peeled and cut into chunks",
          "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
          "3/4 cup white wine",
          "3/4 cup chicken stock",
          "3 tablespoons chopped parsley",
          "1 tablespoon dried oregano",
          "Salt and pepper",
          "1 cup frozen peas, thawed"
        ],
        "ingredients": [
          {
            "text": "1/2 cup olive oil",
            "weight": 108.0
          },
          {
            "text": "5 cloves garlic, peeled",
            "weight": 15.0
          },
          {
            "text": "2 large russet potatoes, peeled and cut into chunks",
            "weight": 532.5
          },
          {
            "text": "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
            "weight": 1587.5732950000001
          },
          {
            "text": "3/4 cup white wine",
            "weight": 169.5
          },
          {
            "text": "3/4 cup chicken stock",
            "weight": 180.0
          },
          {
            "text": "3 tablespoons chopped parsley",
            "weight": 11.399999999999999
          },
          {
            "text": "1 tablespoon dried oregano",
            "weight": 5.9999999998985585
          },
          {
            "text": "Salt and pepper",
            "weight": 16.463839769999392
          },
          {
            "text": "Salt and pepper",
            "weight": 8.231919884999696
          },
          {
            "text": "1 cup frozen peas, thawed",
            "weight": 134.0
          }
        ],
        "calories": 4055.7632762010808,
        "totalWeight": 2765.5901364771207,
        "totalTime": 60.0,
        "totalNutrients": {
          "ENERC_KCAL": {
            "label": "Energy",
            "quantity": 4055.7632762010808,
            "unit": "kcal"
          },
          "FAT": {
            "label": "Fat",
            "quantity": 274.44567658260667,
            "unit": "g"
          },
          "FASAT": {
            "label": "Saturated",
            "quantity": 62.48197445465762,
            "unit": "g"
          },
          "FATRN": {
            "label": "Trans",
            "quantity": 1.047163345382,
            "unit": "g"
          },
          "FAMS": {
            "label": "Monounsaturated",
            "quantity": 147.4033339413894,
            "unit": "g"
          },
          "FAPU": {
            "label": "Polyunsaturated",
            "quantity": 47.29695541183091,
            "unit": "g"
          },
          "CHOCDF": {
            "label": "Carbs",
            "quantity": 137.1196827663874,
            "unit": "g"
          },
          "FIBTG": {
            "label": "Fiber",
            "quantity": 23.068875730861816,
            "unit": "g"
          },
          "SUGAR": {
            "label": "Sugars",
            "quantity": 15.869684287259851,
            "unit": "g"
          },
          "PROCNT": {
            "label": "Protein",
            "quantity": 225.89009682764237,
            "unit": "g"
          },
          "CHOLE": {
            "label": "Cholesterol",
            "quantity": 815.06238045,
            "unit": "mg"
          },
          "NA": {
            "label": "Sodium",
            "quantity": 6400.198183110535,
            "unit": "mg"
          },
          "CA": {
            "label": "Calcium",
            "quantity": 412.247268737062,
            "unit": "mg"
          },
          "MG": {
            "label": "Magnesium",
            "quantity": 437.2354003389978,
            "unit": "mg"
          },
          "K": {
            "label": "Potassium",
            "quantity": 5106.998207731746,
            "unit": "mg"
          },
          "FE": {
            "label": "Iron",
            "quantity": 21.373388227450473,
            "unit": "mg"
          },
          "ZN": {
            "label": "Zinc",
            "quantity": 17.809277680080992,
            "unit": "mg"
          },
          "P": {
            "label": "Phosphorus",
            "quantity": 2130.9016991001495,
            "unit": "mg"
          },
          "VITA_RAE": {
            "label": "Vitamin A",
            "quantity": 637.7520530148637,
            "unit": "µg"
          },
          "VITC": {
            "label": "Vitamin C",
            "quantity": 166.6352974495977,
            "unit": "mg"
          },
          "THIA": {
            "label": "Thiamin (B1)",
            "quantity": 1.5515793778356204,
            "unit": "mg"
          },
          "RIBF": {
            "label": "Riboflavin (B2)",
            "quantity": 1.8524542645124638,
            "unit": "mg"
          },
          "NIA": {
            "label": "Niacin (B3)",
            "quantity": 85.00298750348684,
            "unit": "mg"
          },
          "VITB6A": {
            "label": "Vitamin B6",
            "quantity": 5.937174328964289,
            "unit": "mg"
          },
          "FOLDFE": {
            "label": "Folate equivalent (total)",
            "quantity": 265.08541681620954,
            "unit": "µg"
          },
          "FOLFD": {
            "label": "Folate (food)",
            "quantity": 265.08541681620954,
            "unit": "µg"
          },
          "VITB12": {
            "label": "Vitamin B12",
            "quantity": 3.34660450586,
            "unit": "µg"
          },
          "VITD": {
            "label": "Vitamin D",
            "quantity": 107.95498406,
            "unit": "IU"
          },
          "TOCPHA": {
            "label": "Vitamin E",
            "quantity": 20.149411488585475,
            "unit": "mg"
          },
          "VITK1": {
            "label": "Vitamin K",
            "quantity": 367.74340046011383,
            "unit": "µg"
          },
          "WATER": {
            "label": "Water",
            "quantity": 1575.5855468727848,
            "unit": "g"
          }
        },
        "totalDaily": {
          "ENERC_KCAL": {
            "label": "Energy",
            "quantity": 202.78816381005404,
            "unit": "%"
          },
          "FAT": {
            "label": "Fat",
            "quantity": 422.2241178193949,
            "unit": "%"
          },
          "FASAT": {
            "label": "Saturated",
            "quantity": 312.4098722732881,
            "unit": "%"
          },
          "CHOCDF": {
            "label": "Carbs",
            "quantity": 45.706560922129135,
            "unit": "%"
          },
          "FIBTG": {
            "label": "Fiber",
            "quantity": 92.27550292344726,
            "unit": "%"
          },
          "PROCNT": {
            "label": "Protein",
            "quantity": 451.78019365528473,
            "unit": "%"
          },
          "CHOLE": {
            "label": "Cholesterol",
            "quantity": 271.68746015,
            "unit": "%"
          },
          "NA": {
            "label": "Sodium",
            "quantity": 266.67492429627225,
            "unit": "%"
          },
          "CA": {
            "label": "Calcium",
            "quantity": 41.224726873706196,
            "unit": "%"
          },
          "MG": {
            "label": "Magnesium",
            "quantity": 104.10366674738043,
            "unit": "%"
          },
          "K": {
            "label": "Potassium",
            "quantity": 108.65953633471801,
            "unit": "%"
          },
          "FE": {
            "label": "Iron",
            "quantity": 118.74104570805818,
            "unit": "%"
          },
          "ZN": {
            "label": "Zinc",
            "quantity": 161.90252436437265,
            "unit": "%"
          },
          "P": {
            "label": "Phosphorus",
            "quantity": 304.4145284428785,
            "unit": "%"
          },
          "VITA_RAE": {
            "label": "Vitamin A",
            "quantity": 70.86133922387374,
            "unit": "%"
          },
          "VITC": {
            "label": "Vitamin C",
            "quantity": 185.15033049955298,
            "unit": "%"
          },
          "THIA": {
            "label": "Thiamin (B1)",
            "quantity": 129.2982814863017,
            "unit": "%"
          },
          "RIBF": {
            "label": "Riboflavin (B2)",
            "quantity": 142.49648188557413,
            "unit": "%"
          },
          "NIA": {
            "label": "Niacin (B3)",
            "quantity": 531.2686718967927,
            "unit": "%"
          },
          "VITB6A": {
            "label": "Vitamin B6",
            "quantity": 456.7057176126376,
            "unit": "%"
          },
          "FOLDFE": {
            "label": "Folate equivalent (total)",
            "quantity": 66.27135420405239,
            "unit": "%"
          },
          "VITB12": {
            "label": "Vitamin B12",
            "quantity": 139.44185441083332,
            "unit": "%"
          },
          "VITD": {
            "label": "Vitamin D",
            "quantity": 719.6998937333334,
            "unit": "%"
          },
          "TOCPHA": {
            "label": "Vitamin E",
            "quantity": 134.32940992390317,
            "unit": "%"
          },
          "VITK1": {
            "label": "Vitamin K",
            "quantity": 306.4528337167615,
            "unit": "%"
          }
        },
        "digest": [
          {
            "label": "Fat",
            "tag": "FAT",
            "schemaOrgTag": "fatContent",
            "total": 274.44567658260667,
            "hasRDI": true,
            "daily": 422.2241178193949,
            "unit": "g",
            "sub": [
              {
                "label": "Saturated",
                "tag": "FASAT",
                "schemaOrgTag": "saturatedFatContent",
                "total": 62.48197445465762,
                "hasRDI": true,
                "daily": 312.4098722732881,
                "unit": "g"
              },
              {
                "label": "Trans",
                "tag": "FATRN",
                "schemaOrgTag": "transFatContent",
                "total": 1.047163345382,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              },
              {
                "label": "Monounsaturated",
                "tag": "FAMS",
                "schemaOrgTag": null,
                "total": 147.4033339413894,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              },
              {
                "label": "Polyunsaturated",
                "tag": "FAPU",
                "schemaOrgTag": null,
                "total": 47.29695541183091,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              }
            ]
          },
          {
            "label": "Carbs",
            "tag": "CHOCDF",
            "schemaOrgTag": "carbohydrateContent",
            "total": 137.1196827663874,
            "hasRDI": true,
            "daily": 45.706560922129135,
            "unit": "g",
            "sub": [
              {
                "label": "Carbs (net)",
                "tag": "CHOCDF.net",
                "schemaOrgTag": null,
                "total": 114.05080703552558,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              },
              {
                "label": "Fiber",
                "tag": "FIBTG",
                "schemaOrgTag": "fiberContent",
                "total": 23.068875730861816,
                "hasRDI": true,
                "daily": 92.27550292344726,
                "unit": "g"
              },
              {
                "label": "Sugars",
                "tag": "SUGAR",
                "schemaOrgTag": "sugarContent",
                "total": 15.869684287259851,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              },
              {
                "label": "Sugars, added",
                "tag": "SUGAR.added",
                "schemaOrgTag": null,
                "total": 0.0,
                "hasRDI": false,
                "daily": 0.0,
                "unit": "g"
              }
            ]
          },
          {
            "label": "Protein",
            "tag": "PROCNT",
            "schemaOrgTag": "proteinContent",
            "total": 225.89009682764237,
            "hasRDI": true,
            "daily": 451.78019365528473,
            "unit": "g"
          },
          {
            "label": "Cholesterol",
            "tag": "CHOLE",
            "schemaOrgTag": "cholesterolContent",
            "total": 815.06238045,
            "hasRDI": true,
            "daily": 271.68746015,
            "unit": "mg"
          },
          {
            "label": "Sodium",
            "tag": "NA",
            "schemaOrgTag": "sodiumContent",
            "total": 6400.198183110535,
            "hasRDI": true,
            "daily": 266.67492429627225,
            "unit": "mg"
          },
          {
            "label": "Calcium",
            "tag": "CA",
            "schemaOrgTag": null,
            "total": 412.247268737062,
            "hasRDI": true,
            "daily": 41.224726873706196,
            "unit": "mg"
          },
          {
            "label": "Magnesium",
            "tag": "MG",
            "schemaOrgTag": null,
            "total": 437.2354003389978,
            "hasRDI": true,
            "daily": 104.10366674738043,
            "unit": "mg"
          },
          {
            "label": "Potassium",
            "tag": "K",
            "schemaOrgTag": null,
            "total": 5106.998207731746,
            "hasRDI": true,
            "daily": 108.65953633471801,
            "unit": "mg"
          },
          {
            "label": "Iron",
            "tag": "FE",
            "schemaOrgTag": null,
            "total": 21.373388227450473,
            "hasRDI": true,
            "daily": 118.74104570805818,
            "unit": "mg"
          },
          {
            "label": "Zinc",
            "tag": "ZN",
            "schemaOrgTag": null,
            "total": 17.809277680080992,
            "hasRDI": true,
            "daily": 161.90252436437265,
            "unit": "mg"
          },
          {
            "label": "Phosphorus",
            "tag": "P",
            "schemaOrgTag": null,
            "total": 2130.9016991001495,
            "hasRDI": true,
            "daily": 304.4145284428785,
            "unit": "mg"
          },
          {
            "label": "Vitamin A",
            "tag": "VITA_RAE",
            "schemaOrgTag": null,
            "total": 637.7520530148637,
            "hasRDI": true,
            "daily": 70.86133922387374,
            "unit": "µg"
          },
          {
            "label": "Vitamin C",
            "tag": "VITC",
            "schemaOrgTag": null,
            "total": 166.6352974495977,
            "hasRDI": true,
            "daily": 185.15033049955298,
            "unit": "mg"
          },
          {
            "label": "Thiamin (B1)",
            "tag": "THIA",
            "schemaOrgTag": null,
            "total": 1.5515793778356204,
            "hasRDI": true,
            "daily": 129.2982814863017,
            "unit": "mg"
          },
          {
            "label": "Riboflavin (B2)",
            "tag": "RIBF",
            "schemaOrgTag": null,
            "total": 1.8524542645124638,
            "hasRDI": true,
            "daily": 142.49648188557413,
            "unit": "mg"
          },
          {
            "label": "Niacin (B3)",
            "tag": "NIA",
            "schemaOrgTag": null,
            "total": 85.00298750348684,
            "hasRDI": true,
            "daily": 531.2686718967927,
            "unit": "mg"
          },
          {
            "label": "Vitamin B6",
            "tag": "VITB6A",
            "schemaOrgTag": null,
            "total": 5.937174328964289,
            "hasRDI": true,
            "daily": 456.7057176126376,
            "unit": "mg"
          },
          {
            "label": "Folate equivalent (total)",
            "tag": "FOLDFE",
            "schemaOrgTag": null,
            "total": 265.08541681620954,
            "hasRDI": true,
            "daily": 66.27135420405239,
            "unit": "µg"
          },
          {
            "label": "Folate (food)",
            "tag": "FOLFD",
            "schemaOrgTag": null,
            "total": 265.08541681620954,
            "hasRDI": false,
            "daily": 0.0,
            "unit": "µg"
          },
          {
            "label": "Folic acid",
            "tag": "FOLAC",
            "schemaOrgTag": null,
            "total": 0.0,
            "hasRDI": false,
            "daily": 0.0,
            "unit": "µg"
          },
          {
            "label": "Vitamin B12",
            "tag": "VITB12",
            "schemaOrgTag": null,
            "total": 3.34660450586,
            "hasRDI": true,
            "daily": 139.44185441083332,
            "unit": "µg"
          },
          {
            "label": "Vitamin D",
            "tag": "VITD",
            "schemaOrgTag": null,
            "total": 107.95498406,
            "hasRDI": true,
            "daily": 719.6998937333334,
            "unit": "µg"
          },
          {
            "label": "Vitamin E",
            "tag": "TOCPHA",
            "schemaOrgTag": null,
            "total": 20.149411488585475,
            "hasRDI": true,
            "daily": 134.32940992390317,
            "unit": "mg"
          },
          {
            "label": "Vitamin K",
            "tag": "VITK1",
            "schemaOrgTag": null,
            "total": 367.74340046011383,
            "hasRDI": true,
            "daily": 306.4528337167615,
            "unit": "µg"
          },
          {
            "label": "Sugar alcohols",
            "tag": "Sugar.alcohol",
            "schemaOrgTag": null,
            "total": 0.0,
            "hasRDI": false,
            "daily": 0.0,
            "unit": "g"
          },
          {
            "label": "Water",
            "tag": "WATER",
            "schemaOrgTag": null,
            "total": 1575.5855468727848,
            "hasRDI": false,
            "daily": 0.0,
            "unit": "g"
          }
        ]
      },
      "bookmarked": false,
      "bought": false
    }
    ...
    ...
    ...

```
### Phew... That was just ONE of the JSON objects returned.  Set up the model to store only the data by recipe name.  Save all the data received from the API for later potential manipulation/display.  In models/recipe.js:
```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let recipeSchema = new Schema({
    recipeName: {type: String, required: true},
    personalRating: {type: Number, min:1, max:10},
    comments: {type: String},
    recipeDetails: Schema.Types.Mixed
},  {
    timestamps: true
    }
);

module.exports = mongoose.model('Recipe', recipeSchema);
```
### <br>

