var db = require('../models-notworking');

module.exports = function(app) {
    app.get('.api/movies', function(req, res) {
        db.Movie.findAll({}).then(function(dbMovie) {
            res.json(dbMovie);
        });
    });

    app.get('/api/movies/:id', function(req, res) {
        db.Movie.findOne({
            where: {
                id: req.params.id
            },
        }).then(function(dbMovie) {
            res.json(dbMovie);
        });
    });

    app.get('/api/movies/category/:category', function(req, res) {
        db.Movie.findAll({
            where: {
                categories: req.params.category
            },
        }).then(function(dbMovie) {
            res.json(dbMovie);
        });
    });

    app.post('/api/movies', function(res, res) {
        db.Move.create(req.body).then(function(dbMovie) {
            res.json(dbMovie);
        });
    });

    app.delete('/api/movies/:id', function(req, res) {
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbMovie) {
            res.json(dbMovie);
        });
    });

    app.put('/api/movies', function(req, res) {
        db.Movie.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbMovie) {
            res.json(dbMovie);
        });
    });
};