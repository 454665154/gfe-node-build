var express = require('express');
var router = express.Router();
var indexController = require('../controllers/project1/indexController.js');

router.get("/project1/index", indexController.gotoIndex);

module.exports = router;