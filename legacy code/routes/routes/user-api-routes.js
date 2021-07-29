var db = require('../models');

var passport = require('../config/passport');

module.exports = function(app) {
    app.post('/api/login', passport.authenticate('local'), function(req, res) {
        res.json(req.user);
    });

    app.post('/api/signup', function(req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect(307, '/api/login');
        }).catch(function(err) {
            res.status(401).json(err);
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/user_data', function(req, res) {
        if (!req.user) {
            res.json({});
        } else {
            res.json({
                email: req.use.email,
                id: req.user.id
            });
        }
    });

    app.get('/api/users', function(req, res) {
        db.User.findAll({
            include: [{
                model: db.Shopingcart,
                include: db.Movie
            }, {
                model: db.Purchase,
                include: db.Movie
            }]
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.get('/api/users/:id', function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Shopingcart,
                include: [db.Shoppingcart_Movie]
            }, {
                model: db.Purchase,
                include: [db.Purchase_Movie]
            }]
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.post('/api/users', function(req, res) {
        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.put('/api/users', function(req, res) {
        db.User.update(
            req.body, {
                where: {
                    id: req.body.id,
                }
            }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.delete('api/users/:id', function(req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });
};