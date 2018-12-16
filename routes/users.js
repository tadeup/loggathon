var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('users/index', { title: 'Users' , layout: 'users'});
});

router.get('/enviar', function(req, res, next) {
    res.render('users/enviar', { title: 'Users' , layout: 'users'});
});

router.get('/profile', function(req, res, next) {
    res.render('users/profile', { title: 'Users', layout: 'users' });
});

module.exports = router;
