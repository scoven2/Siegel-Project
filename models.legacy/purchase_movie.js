var db = require('../models');

module.exports = function(sequelize, DataTypes) {
    const Purchase_Movie = sequelize.define('Purchase_Movie', {
        PurchaseId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Purchase,
                key: 'id',
                primaryKey: true
            }
        },
        MovieId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Movie,
                key: 'id',
                primaryKey: true
            }
        }
    });

    return Purchase_Movie;
}