const User = require('../routes/models/user');
const Vehicle = require('../routes/models/vehicle');

module.exports = function (app, passport) {
    var newUser = new User();

    // HOME PAGE (with login links) ========
    // Requisições feitas no URL "/" irão renderizar o index
    app.get('/', (req, res) => {
        res.render('index', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // LOGIN ===============================
    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // SIGNUP ==============================
    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // CARS ==============================
    app.get('/cars', (req, res) => {
        res.render('cars', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/api/v1/car', (req, res) => {
        res.send({car: 'HR-V'});
    });

    app.get('/api/v2/car', (req, res) => {
        res.send({car: 'Sport Onix'});
    });

    // PROFILE ==============================
    app.get('/profile', (req, res) => {
        if (req.user) {
            res.render('profile', {
                user: req.user // get the user out of session and pass to template
            });
        } else {
            res.redirect('/login');
        }
    });

    // LOGOUT ==============================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};