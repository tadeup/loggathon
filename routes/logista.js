var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('logista/index', { title: 'Logista' });
});

router.get('/descontos', function(req, res, next) {
    res.render('logista/descontos', { title: 'Logista' });
});

router.get('/controle', function(req, res, next) {
    res.render('logista/controle', { title: 'Logista' });
});

module.exports = router;
