var express = require('express');
var router = express.Router();
var indexController = require('../controller/project2/indexController.js');

router.get("/project2/index", indexController.gotoIndex);

module.exports = router;