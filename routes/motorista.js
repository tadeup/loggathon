var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('motorista/index', { title: 'Motorista' });
});

router.get('/premios', function(req, res, next) {
    res.render('motorista/premios', { title: 'Motorista' });
});

router.get('/profile', function(req, res, next) {
    res.render('motorista/profile', { title: 'Motorista' });
});

router.get('/corridas', function(req, res, next) {
    res.render('motorista/corridas', { title: 'Motorista' });
});

module.exports = router;
