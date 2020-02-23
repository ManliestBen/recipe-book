var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');


router.get('/search', recipesCtrl.search);
router.post('/search', recipesCtrl.apiCall);
module.exports = router;