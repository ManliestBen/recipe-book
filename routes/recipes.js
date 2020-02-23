var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/search', recipesCtrl.search);
router.post('/search', recipesCtrl.apiCall);
router.post('/add', recipesCtrl.addRecipe);
module.exports = router;