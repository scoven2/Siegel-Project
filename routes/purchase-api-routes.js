var db = require('../models');

module.exports = function(app) {
    app.get('/api/purchases', function(req, res) {
        db.Purchase.findAll({
            include: [db.Movie]
        }).then(function(dbPurchase) {
            res.json(dbPurchase);
        });
    });

    app.get('/api/purchase', function(req, res) {
        db.Purchase.findAll({
            where: {
                UserId: req.params.UserId
            },
            include: [db.Movie]
        }).then(function(dbPurchase) {
            res.json(dbPurchase);
        });
    });

    app.post('/api/purchases', function(req, res) {
        dbPurchase.create({
            UserId: req.body.UserId,
            MovieId: req.body.MovieId,
            date: new Date()
        }).then(function(dbPurchase) {
            db.Purchase_Movie.create({
                PurchaseId: dbPurchase.id,
                MovieId: req.body.MovieId
            }).then(function(dbPurchase_Movie) {
                res.json(dbPurchase_Movie)
            });
        });
    });

    app.delete('/api/purchases/:UserId', function(req, res) {
        db.Purchase.destroy({
            where: {
                UserId: req.params.UserId
            }
        }).then(function(dbPurchase) {
            res.json(dbPurchase);
        });
    });

    app.put('/api/purchases', function(req, res) {
        db.Purchase.update(
            req.body, {
                where: {
                    UserId: req.body.UserId
                }
            }).then(function(dbPurchase) {
            res.json(dbPurchase);
        });
    });
};