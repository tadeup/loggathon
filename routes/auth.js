var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const {User} = require('../models/Users');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.getUserByEmail(email, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Unknown User' });
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('auth/login');
});

router.get('/login', function(req, res, next) {
    res.render('auth/login', { title: 'Auth page' , layout: 'index'});
});
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/users/',
        failureRedirect: '/auth/login',
        failureFlash: true}),
    function(req, res) {
        res.redirect('/');
    });

router.post('/register', function(req, res, next) {
    var {body: {
        name,
        email,
        password,
        password2
    }} = req;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors){
        res.render('register', {
            errors
        });
    } else {
        var newUser = new User({
            name, email, password
        });

        User.createUser(newUser, function (err, user) {
            if(err) {
                req.flash('error_msg', 'User or email not unique');
                res.redirect('back');
            } else {
                req.flash('success_msg', 'You are registered and can now login');
                res.redirect('/auth/login');
            }
        });
    }
});
router.get('/register', function(req, res, next) {
    res.render('auth/register', { title: 'Auth page' });
});

router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});


module.exports = router;
