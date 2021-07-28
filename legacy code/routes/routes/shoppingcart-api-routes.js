var db = require('../models');

module.exports = function(app) {
    app.get('/api/shoppingcarts', function(req, res) {
        db.Shoppingcart.findAll({
            include: [db.Movie]
        }).then(function(dbShoppingcart) {
            res.json(dbShoppingcart);
        });
    });

    app.get('/api/shoppingcart/:UserId', function(req, res) {
        db.Shoppingcart.findOne({
            where: {
                UserId: req.params.UserId
            },
        }).then(function(dbShoppingcart) {
            res.json(dbShoppingcart);
        });
    });

    app.post('/api.shoppingcarts', function(req, res) {
        db.Shoppingcart.create({
            UserId: req.body.UserId,
            MovieId: req.body.MovieId
        }).then(function(dbShoppingcart) {
            db.Shoppingcart_Movie.create({
                ShoppingcartId: dbShoppingcart.id,
                MovieId: req.body.MovieId
            }).then(function(dbShoppingcart_Movie) {
                res.json(dbShoppingcart_Movie);
            });
        });
    });

    app.delete('/api/shoppingcarts/:UserId', function(req, res) {
        db.Shoppingcart.destroy({
            where: {
                UserId: req.params.UserId
            }
        }).then(function(dbShoppingcart) {
            res.json(dbShoppingcart);
        });
    });

    app.put('/api/shoppingcarts', function(req, res) {
        db.ShoppingCart.update(
            req.body, {
                where: {
                    UserId: req.body.UserId
                }
            }).then(function(dbShoppingcart) {
            res.json(dbShoppingcart);
        });
    });
};