var express = require('express');
var {ensureAuthenticated} = require('../middlewares/authenticate');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "Dashboard"});
});

module.exports = router;
