var db = require('../models');

module.exports = function(sequelize, DataTypes) {
    const Purchase_Movie = sequelize.define('Purchase_Movie', {
        PurchaseId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Purchase,
                key: 'id'
            }
        },
        MovieId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Movie,
                key: 'id'
            }
        }
    });

    return Purchase_Movie;
}

// module.exports = Purchase; ?