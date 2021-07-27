var db = require('../models');

module.exports = function(sequelize, DataTypes) {
    const Shoppingcart_Movie = sequelize.define('Shoppingcart_Movie', {
        shoppingcartId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.shoppingcart,
                key: 'id'
            }
        },
        BookId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Movie,
                key: 'id'
            }
        }
    });

    return Shoppingcart_Movie;
}